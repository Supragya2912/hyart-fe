import React, { useState } from "react";
import ProductBanner from "../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  console.log(itemsPerPage);

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
