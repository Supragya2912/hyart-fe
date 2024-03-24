import React from "react";
import Banner1 from "../components/home/Banner1";
import Banner2 from "../components/home/Banner2";
import BestSellers from "../components/home/BestSellers/BestSellers";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import Section1 from "../components/home/Section1";
import Section2 from "../components/home/Section2";
import Section3 from "../components/home/Section3";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner1 />
      <div className="max-w-container mx-auto px-8">
        <Banner2 />
        <NewArrivals />
        <Section1 />
        <BestSellers />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
};

export default Home;