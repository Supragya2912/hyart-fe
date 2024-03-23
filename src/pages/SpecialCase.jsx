import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const SpecialCase = () => {
  const products = useSelector((state) => state.cartReducer.products);
  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Line className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            <RiShoppingCart2Line className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-titleFont">Buy Now</p>
          {products.length > 0 && (
            <p className="absolute top-2 right-3 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {products.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;