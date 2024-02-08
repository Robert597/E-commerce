import React, {useState, useEffect} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from '../Components/PaymentForm';

const PUBLIC_KEY = "pk_test_51NAi90KJgU8Jtmfpdg2Mz8VdKjnfxh2cinQZK4aXkhYrqWDEwW2vPwTyRUoOfk1P869VIVylojgMQ319FZU5eqMU00ajusW56P"

const stripeTextPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
 
const appearance = {
    theme: 'stripe',
  };
 
  const options = {
    mode: 'subscription',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance
  };
  return (
   
   <Elements stripe={stripeTextPromise} options={options}>
      <PaymentForm/>
   </Elements>

  )
}

export default StripeContainer