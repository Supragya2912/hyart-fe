import React from "react";
import Product from "../Products/Product";
import Product1 from "../../../assets/jewellery1.png";
import Product2 from "../../../assets/jewellery2.png";
import Product3 from "../../../assets/jewellery3.png";

const BestSellers = () => {
  return (
    <div className="w-full pb-20">
      <div className="text-3xl font-semibold pb-6">Our BestSellers</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-8">
        <Product
          _id="1011"
          img={Product1}
          productName="Flower Base"
          price="35.00"
          color="Blank and White"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1012"
          img={Product2}
          productName="New Backpack"
          price="180.00"
          color="Gray"
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1013"
          img={Product3}
          productName="Household materials"
          price="25.00"
          color="Mixed"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1014"
          img={Product1}
          productName="Travel Bag"
          price="220.00"
          color="Black"
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
      </div>
    </div>
  );
};

export default BestSellers;