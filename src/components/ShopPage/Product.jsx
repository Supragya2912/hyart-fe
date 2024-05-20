import React, {useState} from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {axiosClient} from '../../utils/axiosClient';
import { toast } from "react-toastify";
import { KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem(KEY_ACCESS_TOKEN);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const _id = props.id;
  
  const handleProductDetails = () => {
    if(props.quantity > 0)
      navigate(`/product/${_id}`);
  };

  async function addToWishlist(productId) {
    try {
      if(!token){
        setShowLoginPrompt(true);
        return;
      }

      await axiosClient.post(`/api/user/add-to-wishlist`, { product_id: productId });
      toast.success('Product added to wishlist');
    } catch (error) {
      console.log(error);
    }
  }

  const redirectToPayment = () => {
    dispatch(
      addToCart({
        _id: props.id,
        name: props.productName,
        quantity: 1,
        image: props.img,
        price: props.price,
      })
    );
    navigate('/cart');
  }

  const handleAddToWishlist = () => {
    addToWishlist(props.id);
  }

  return (
    <div className="w-full relative group">
      <div className="max-w-80 h-72 relative overflow-y-hidden">
        <div className="w-[270px] h-[270px] mx-auto" onClick={handleProductDetails}>
          <img className="w-full h-full cursor-pointer" src={props.img} alt="logo" />
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
        <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            {props.quantity === 0 ? (
              <li className="text-red-500 text-sm font-normal pb-1 w-full text-center">
                Out of Stock
              </li>
            ) : (
              <>
                <li onClick={redirectToPayment} className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Buy Now
                  <span>
                    <BsSuitHeartFill />
                  </span>
                </li>
                <li onClick={() => dispatch(addToCart({
                    _id: props.id,
                    name: props.productName,
                    quantity: 1,
                    image: props.img,
                    price: props.price,
                  }))} className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Add to Cart
                  <span>
                    <FaShoppingCart />
                  </span>
                </li>
                <li onClick={handleProductDetails} className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  View Details
                  <span className="text-lg">
                    <MdOutlineLabelImportant />
                  </span>
                </li>
                <li onClick={handleAddToWishlist} className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Add to Wish List
                  <span>
                    <BsSuitHeartFill />
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor">
            {props.productName}
          </h2>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">Rs {props.price}</p>
        </div>
      </div>

      {showLoginPrompt && (
      <TEModal show={showLoginPrompt} setShow={setShowLoginPrompt}>
      <TEModalDialog>
        <TEModalContent>
          <TEModalHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              Login Required
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={() => setShowLoginPrompt(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>
          <TEModalBody>
            You need to login first before adding this product to wishlist.
          </TEModalBody>
          <TEModalFooter>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={() => setShowLoginPrompt(false)}
              >
                Cancel
              </button>
            </TERipple>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
      )}
    </div>
  );
};

export default Product;