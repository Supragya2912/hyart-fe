import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {axiosClient} from '../utils/axiosClient';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const [product, setProduct] = React.useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  async function getSingleProduct(){
    try{
      const response = await axiosClient.post('/api/hyart/product', {
        product_id: id
      });
      setProduct(response?.result);
    }catch(error){
      console.log(error);
    }
  }

  async function addToWishlist(productId) {
    try {
      await axiosClient.post(`/api/user/add-to-wishlist`, { product_id: productId });
      toast.success('Product added to wishlist');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      quantity: 1,
      image: product.image.url,
      price: product.price,
    }));
  };

  const handleAddToWishlist = () => {
    addToWishlist(product._id);
  }

  return (
    <section className="py-8 bg-white md:py-16 xl:py-24 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="w-[330px] lg:w-[400px] ;g:h-[400px] mx-auto">
            <img className="w-full h-full cursor-pointer object-cover" src={product?.image?.url} alt="" />
          </div>

          <div className="mt-4 sm:mt-8 lg:mt-0">
            <h1 className="text-3xl font-semibold mb-4">
              {product?.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl text-gray-600 font-bold mb-3">
                Rs. {product?.price}
              </p>
            </div>

            <div className='flex gap-2'>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    type="button"
                    className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
                    onClick={handleAddToWishlist}
                  >
                    Add to Wishlist
                  </button>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct;