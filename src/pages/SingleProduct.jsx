import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {axiosClient} from '../utils/axiosClient';

const SingleProduct = () => {
  const { id } = useParams();
  console.log("Nancy", id);

  async function getSingleProduct(){
    try{
      const response = await axiosClient.post('/api/hyart/product', {
        product_id: id
      });
      console.log("Single", response);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, [id])

  return (
    <div>
      <h1>Single Product</h1>
    </div>
  )
}

export default SingleProduct;