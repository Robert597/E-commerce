import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from '../Context/datacontext';
import { runFireworks } from '../lib/util';
import Loading from '../Components/rotateLoader';

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities, successPayment, setSuccessPayment, setPaymentDetail} = useStateContext();
    const router = useRouter();
    //PROTECTING ROUTES
    useEffect(() => {
        if(!successPayment){
            router.push("/");
        }else{
        let items = ["cart", "product", "totalQuantities", "totalPrice"]
        items.forEach(k => localStorage.removeItem(k));
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        setPaymentDetail(
            {
              Amount: 0,
              item: []
             }
          );
        runFireworks();
        }
    }, [])
  return (
    <>
    {!successPayment && (
        <Loading/>
    )}
    {successPayment && (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>
                if you have any questions, please email.
                <a className='email' href='mailto:robertseun1@gmail.com'>
                    robertseun1@gmail.com
                </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn" onClick={() => setSuccessPayment(false)}>
                        Continue Shopping
                        </button>
                </Link>
        </div>
    </div>
    )}
    </>
  )
}

export default Success;