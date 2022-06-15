import React, {useRef} from 'react';
import Link from 'next/link';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import {TiDeleteOutline} from "react-icons/ti";
import { useRouter } from 'next/router';
import { useStateContext } from '../Context/datacontext';


const Cart = () => {
    const cartRef = useRef();
    const router = useRouter();
    const {totalPrice, totalQuantities, cartItems, setShowCart, setPaymentDetail, toggleCartItemQuantity, onRemove} = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
    <div className="cart-container">
      <button
      type="button"
      className="cart-heading"
      onClick={() => setShowCart(false)}>
        <AiOutlineLeft />
        <span className="heading">Your Cart</span>
        <span className="cart-num-items">({totalQuantities} items)</span>
      </button>

      {cartItems.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link href="/">
            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="btn"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="product-container">
        {cartItems.length >= 1 && cartItems.map((item) => (
          <div className="product" key={item._id}>
            <img src={(item?.image[0])} className="cart-product-image" />
            <div className="item-desc">
              <div className="flex top">
                <h5>{item.name}</h5>
                <h4>&#8358;{item.price}</h4>
              </div>
              <div className="flex bottom">
                <div>
                <p className="quantity-desc">
                  <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'desc') }>
                  <AiOutlineMinus />
                  </span>
                  <span className="num">{item.quantity}</span>
                  <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc') }><AiOutlinePlus /></span>
                </p>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length >= 1 && (
        <div className="cart-bottom">
          <div className="total">
            <h3>Subtotal:</h3>
            <h3>${totalPrice}</h3>
          </div>
          <div className="btn-container">
            <button type="button" className="btn" onClick={()=> {
              setPaymentDetail({
                Amount: totalPrice * 100,
                items: [
                  cartItems.map((item) => { return item.name })
                ]
              });
              router.push("/payment");
              setShowCart(false);
            }}>
              Pay with Paystack
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default Cart