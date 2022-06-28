import React from 'react';
import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai';
import { useStateContext } from '../Context/datacontext';

const Footer = () => {
  const {theme} = useStateContext();
  return (
    <div className={theme ? "footer-container-dark" : "footer-container"}>
        <p>&copy;2022, Robert Store. All Rights Reserved.</p>
        <p className='icons'>
          <AiFillInstagram className='innerIcon'/>
          <AiOutlineTwitter className='innerIcon'/>
          <AiFillFacebook className='innerIcon'/>
        </p>
    </div>
  )
}

export default Footer