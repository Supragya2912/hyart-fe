import React from "react";
import Slider from "react-slick";
import Product from "../../ShopPage/Product";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { useSelector } from 'react-redux';

const NewArrivals = () => {
  const myProducts = useSelector((state) =>state.productReducer.myProducts);
  console.log("yoyo", myProducts)

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
    <div className="w-full pb-16">
      <div className="text-3xl font-semibold pb-6">New Arrivals</div>
      <Slider {...settings}>
      {
        myProducts?.allProducts?.map((product, index) => (
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

export default NewArrivals;