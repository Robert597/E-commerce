import React from 'react';
import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai';
import { useStateContext } from '../Context/datacontext';

const Footer = () => {
  const {theme} = useStateContext();
  return (
    <div className={theme ? "footer-container-dark" : "footer-container"}>
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