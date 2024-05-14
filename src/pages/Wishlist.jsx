import React, { useState, useEffect } from 'react';
import { axiosClient } from '../utils/axiosClient'
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  }

  async function getWishlist() {
    try {
      const response = await axiosClient.post(`/api/user/get-wishlist`);
      setWishlist(response.result);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      await axiosClient.post(`/api/user/remove-from-wishlist`, { product_id: productId });
      setWishlist(wishlist.filter(item => item._id !== productId));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-10">My Wishlist</h1>
      {wishlist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-gray-600">Your wishlist is empty.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {wishlist.map((item) => (
          <div key={item?._id} className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105">
            <div className='w-[270px] h-[270px] mx-auto'>
              <img
                alt="Product"
                className="w-full h-full cursor-pointer"
                src={item?.image?.url}
                onClick={() => handleProductDetails(item?._id)}
              />
            </div>
            <h2 className="text-lg font-bold mt-2">{item?.name}</h2>
            <p className="text-gray-500">Rs {item?.price}</p>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                type="button"
                className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                onClick={() => dispatch(addToCart({
                  _id: item._id,
                  name: item.name,
                  quantity: 1,
                  image: item.image.url,
                  price: item.price,
                }))}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
                onClick={() => removeFromWishlist(item?._id)}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default Wishlist;