import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const ProductBanner = (props) => {
  const myProducts = useSelector((state) => props.products || state.productReducer.myProducts);

  return (
    <div className='grid grid-cols-3 gap-2 p-4'>
      {
        myProducts.map((product, index) => (
          <div key={index} className='w-full'>
            <Product
              id={product._id}
              img={product.image.url}
              productName={product.name}
              price={product.price}
              badge={true}
              des={product.description}
            />
          </div>
        ))
      }
    </div>
  )
}

export default ProductBanner;