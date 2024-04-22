import React, { useEffect, useState } from "react";
import Product from "../../ShopPage/Product";
import {axiosClient} from "../../../utils/axiosClient";
import Slider from "react-slick";
import NextArrow from "../NewArrivals/NextArrow";
import PrevArrow from "../NewArrivals/PrevArrow";

const BestSellers = () => {
  const [getProduct, setGetProduct] = useState([]);

  async function getAllProduct(){
    try{
        const response = await axiosClient.post('/api/hyart/all-products', {trending: true});
        setGetProduct(response.result.trendingProducts);
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-20">
      <div className="space-y-2 text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
        <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Discover our most popular and newest jewellery items, handpicked for their exceptional quality and design.
        </p>
      </div>
      <Slider {...settings}>
      {
        getProduct?.map((product, index) => (
          <div key={index} className='w-full'>
            <div className="px-2">
              <Product
                id={product._id}
                img={product.image.url}
                productName={product.name}
                price={product.price}
                des={product.description}
              />
            </div>
          </div>
        ))
      }
      </Slider>
    </div>
  );
};

export default BestSellers;