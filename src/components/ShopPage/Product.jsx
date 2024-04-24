import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {axiosClient} from '../../utils/axiosClient';

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = props.id;
  
  const handleProductDetails = () => {
    if(props.quantity > 0)
      navigate(`/product/${_id}`);
  };

  async function addToWishlist(productId) {
    try {
      await axiosClient.post(`/api/user/add-to-wishlist`, { product_id: productId });
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
    </div>
  );
};

export default Product;