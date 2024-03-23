import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-10 rounded-full text-white bg-primary bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default PrevArrow;