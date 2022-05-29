import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BannerImg from "../public/earphones_a_1.webp";

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>
                SMALL TEXT
            </p>
            <h3>MID TEXT</h3>
            <div className='hero-banner-image'>
            <Image 
        src={BannerImg}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      </div>
            <div>
                <Link href={"/product/ID"}>
                    <button type='button'>BUTTON TEXT </button>
                </Link>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>DEscription</p> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner