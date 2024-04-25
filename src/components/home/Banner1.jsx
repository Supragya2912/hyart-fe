import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Banner_img1 from "../../assets/jewellery1.png";
import Banner_img2 from "../../assets/jewellery1.png";
import Banner_img3 from "../../assets/jewellery1.png";

const CustomSlide = ({ Subtext, imgSrc, text, buttonText }) => (
  <div
    style={{
      position: "relative",
      backgroundColor: "#F6f6f6", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center", 
    }}
  >
    <div
      style={{
        maxWidth: "450px",
        marginRight: "100px",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          fontSize: "2.5rem", 
          color: "#000",
          fontWeight: "700",
          marginTop: "15px",
        }}
      >
        {text}
      </h1>
      <p
        style={{
          marginBottom: "25px",
          fontSize: "1.5rem",
          color: "#666",
        }}
      >
        {Subtext}
      </p>

      <Link to="/shop">
        <button
            type="button"
            className="mb-6 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
            {buttonText}
        </button>
      </Link>
    </div>
    <div style={{ marginLeft: "30px" }}>
      <img
        src={imgSrc}
        className="h-auto max-w-sm"
        alt="" 
      />
    </div>
  </div>
);

const Banner1 = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: Banner_img1,
      text: "Discover Our Exquisite Jewellery Collection",
      Subtext:
        "Explore our stunning range of handcrafted jewellery, each piece a unique work of art.",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
    {
      imgSrc: Banner_img2,
      text: "Elevate Your Style with Our Luxury Accessories",
      Subtext:
        "Discover our exclusive collection of high-end jewellery and accessories that will make you stand out.",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
    {
      imgSrc: Banner_img3,
      text: "Timeless Elegance, Crafted to Perfection",
      Subtext:
        "Explore our collection of meticulously designed jewellery that combines classic styles with modern flair.",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
  ];

  return (
    <div className="lg:block hidden">
      <div className="w-full bg-white">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <CustomSlide key={index} {...slide} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner1;