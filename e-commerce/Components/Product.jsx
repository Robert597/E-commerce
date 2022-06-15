import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../Context/datacontext';

const Product = ({product}) => {
  const {filterProducts} = useStateContext();
  return (
    <div className="product">
      <div onClick={() => {{filterProducts(product?._id)}}}>
          <div className='product-card'>
            <img src={product?.image[0]} alt="Picture of the products" 
            width={250}
            height={250}
            className="product-image"/>
            <p className='product-name'>{product?.name}</p>
            <p className='product-price'>&#8358;{product?.price}</p>
          </div>
      </div>
    </div>
  )
}

export default Product;