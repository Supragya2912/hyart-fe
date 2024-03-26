import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {axiosClient} from '../utils/axiosClient';

const SingleProduct = () => {
  const [product, setProduct] = React.useState({});
  const { id } = useParams();
  console.log("Product", product);

  async function getSingleProduct(){
    try{
      const response = await axiosClient.post('/api/hyart/product', {
        product_id: id
      });
      setProduct(response?.result);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-2 flex justify-center items-center'>
        <div className='max-w-sm rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800'>
          <img className='w-auto h-auto' src={product?.image?.url} alt='product' />
        </div>
      </div>

      <div className='col-span-2'>

      </div>
    </div>
  )
}

export default SingleProduct;