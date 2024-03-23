import React from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/jewellery3.png"

const Banner2 = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full bg-gradient-to-b overflow-hidden mt-[200px] lg:mt-[30px] lg:p-16">
      <div className="px-5 xl:px-0 max-w-3xl lg:max-w-5xl xl:max-w-5xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex flex-col justify-center gap-3">
            <div>
              <h1 className="text-[#13183f] font-bold text-[42px]">
                Jewellery to make an Impression for all the Occasions
              </h1>
            </div>
            <div>
              <p className="text-[#83869a] mb-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, tempora vero expedita nemo harum veritatis? Itaque laborum rem consequuntur velit error.
              </p>
            </div>
            <div>
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={Img}
              alt="Home"
              className="h-auto max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner2;