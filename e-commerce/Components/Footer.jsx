import React from 'react';
import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
        <p>&copy;2022, Robert Headphones. All Rights Reserved.</p>
        <p className='icons'>
          <AiFillInstagram/>
          <AiOutlineTwitter/>
          <AiFillFacebook/>
        </p>
    </div>
  )
}

export default Footer