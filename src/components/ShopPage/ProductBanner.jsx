import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const ProductBanner = (props) => {
  const myProducts = useSelector((state) => {
    if (props.products && props.products.length > 0)
      return props.products;
    else
      return state.productReducer.myProducts.allProducts;
  });

  return (
    <div className='grid grid-cols-3 gap-2 p-4'>
      {
        myProducts?.map((product, index) => (
          <div key={index} className='w-full'>
            <Product
              id={product._id}
              img={product.image.url}
              productName={product.name}
              price={product.price}
              des={product.description}
              quantity={product.quantity}
            />
          </div>
        ))
      }
    </div>
  )
}

export default ProductBanner;