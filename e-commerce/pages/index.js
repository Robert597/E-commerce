import React, {useEffect, useState} from 'react';
import { Product, FooterBanner, HeroBanner } from '../Components';
import { useStateContext } from '../Context/datacontext';

const Home = () => {
  const {productDatas, loading, bannerDatas} = useStateContext();
  const [number, setNumber] = useState(Math.floor(Math.random() * ((productDatas.length-1) - 0 + 1)) + 0)
 
  return (
    <>
      <>
    <HeroBanner banner={bannerDatas}/>
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>
    <div className='products-container'>
      {productDatas?.map((product) => (
        <Product key={product._id} product={product}/>
      )
      )}
    </div>

   <FooterBanner product={productDatas[number]}/>
   </>
    </>
  )
}

export default Home;
