import React, {useEffect} from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlinePlus } from 'react-icons/ai';
import Cart from './Cart';
import { useStateContext } from '../Context/datacontext';
import { useRouter } from 'next/router';



const Navbar = () => {
  const router = useRouter();
  const {showCart, setShowCart, totalQuantities, user, setUser} = useStateContext();
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [router.query.slug])
  console.log(user);
  return (
    <div className='navbar-container'>
      <p className='logo'>
       <Link href="/">
        ROBERT
       </Link>
      </p>
<div>

<Link href="/Form">
          <AiOutlinePlus className="cart-icon"/>
  </Link>
  
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
  </div>
  {showCart && (
    <Cart/>
  )}
  
    </div>
  )
}

export default Navbar