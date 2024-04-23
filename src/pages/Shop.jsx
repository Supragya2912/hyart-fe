import React, { useState, useEffect } from "react";
import ProductBanner from "../components/ShopPage/ProductBanner";
import { useSelector } from 'react-redux';
import { axiosClient } from "../utils/axiosClient";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const categories = useSelector((state) => state.productReducer.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  async function getProductsCategory(categoryId) {
    try {
      const response = await axiosClient.post('/api/hyart/products', {
        category_id: categoryId
      });
      setProducts(response?.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectedCategoryId !== null) {
      getProductsCategory(selectedCategoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  const filteredCategories = categories.filter(category => category.products.length > 0);
  
  return (
    <div className="grid lg:grid-cols-4 gap-4">
      <div className="col-span-3 lg:col-span-1 p-5">
        {filteredCategories.map((category, index) => (
          <div key={index} className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-1 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="flexRadioDefault"
              id={`radioDefault${index}`}
              onChange={() => setSelectedCategoryId(category._id)}
            />
            <label
              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor={`radioDefault${index}`}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
      <div className="col-span-3">
        <ProductBanner products={products} />
      </div>
    </div>
  );
};

export default Shop;