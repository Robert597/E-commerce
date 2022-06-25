import React, { useState, useEffect } from "react"
import { PaystackButton } from "react-paystack";
import { useStateContext } from "../Context/datacontext";
import { useRouter } from "next/router";
import {toast} from "react-hot-toast";

const Payment = () => {
  const router = useRouter();
    const {paymentDetail, setPaymentDetail, setSuccessPayment} = useStateContext();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    if(!paymentDetail?.items?.length){
      router.push("/");
    }else{
      setLoading(false);
    }
    }, []);
    
  const publicKey = 'pk_live_1b5845f3a7690307f4c06e0f1770993cb967b68e'
  const amount = paymentDetail?.Amount
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
   {
    toast.success("purchase was succesful");
   
    setSuccessPayment(true);
    router.push("/success");
   },
    onClose: () => toast.error("don't leave :)"),
  }

  
  return (
    <div className="App">
      {loading && (
        <p>loading...</p>
      )}
      {!loading && (
      <div className="container">
        <div className="item">
          <img />
          <div className="item-details">
            {paymentDetail?.items[0]?.map((name) => (
                <p>{name}</p>
            ))}
            <p>Total Amount: &#8358;{amount/100}</p>
          </div>
        </div>
        <div className="checkout-form">
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
      )}
    </div>
  )
}
export default Payment