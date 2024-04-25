import React from "react";
import Slider from "react-slick";
import Product from "../../ShopPage/Product";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { useSelector } from 'react-redux';

const NewArrivals = () => {
  const myProducts = useSelector((state) =>state.productReducer.myProducts);

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
      <div className="space-y-2 text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our Collections</h2>
        <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          From classic elegance to modern sophistication, our jewellery collections offer something for every
          style and occasion.
        </p>
      </div>
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
                quantity={product.quantity}
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