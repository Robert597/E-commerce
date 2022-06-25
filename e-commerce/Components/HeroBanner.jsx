import React from 'react';
import { useStateContext } from '../Context/datacontext';

const HeroBanner = ({banner}) => {
   const {sendBannerProduct, theme} = useStateContext();
  return (
    <div className={theme ? "hero-banner-container-dark": "hero-banner-container"}>
        <div>
            <p className='beats-solo'>
            {banner[0]?.name} 
            </p>
            <h3>{banner[0]?.Large}</h3>
            <h1>{banner[0]?.small}</h1>
        
                   <img src={banner[0]?.image[0]}    alt="Picture of the products" 
                   className='hero-banner-image'/>
      
           
            <div>
                <div onClick={() => {sendBannerProduct(banner[0])}}>
                    <button type='button'>Buy Now </button>
                </div>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>{banner[0]?.details} </p> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner