import React, { useEffect, useState } from "react";
import Product from "../../ShopPage/Product";
import {axiosClient} from "../../../utils/axiosClient";


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

  return (
    <div className="w-full pb-20">
      <div className="text-3xl font-semibold pb-6">Our BestSellers</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4">
      {
        getProduct.map((product, index) => (
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
      </div>
    </div>
  );
};

export default BestSellers;