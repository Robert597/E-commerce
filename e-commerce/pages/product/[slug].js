import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../../Context/datacontext';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar} from 'react-icons/ai';
import Product from '../../Components/Product';

 
const ProductDetails = () => {
    const router = useRouter();
    const {productDatas, setPaymentDetail, decQty, incQty, qty, onAdd, product} = useStateContext();
    const[index, setIndex] = useState(0);
  

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                   <img src={product?.image[index]} alt="product image"
                   className='product-detail-image'/>
                </div>
               { <div className='small-images-container'>
                    {
                        product?.image.map((item, i) => (
                            <img key={i} src={item}
                            alt="small images"
                            className={i === index ? 'small-image selected-image': 'small-image'}
                            onMouseEnter={() => {
                                setIndex(i);
                            }}
                           />
                        ))
                    }
                </div>}
            </div>
            <div className='product-detail-desc'>
                <h1>{product.name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                        <p>
                            (20)
                        </p>
                </div>
                <h4>Details: </h4>
                <p>{product.details}</p>
                <p className='price'>
                &#8358;{product.price}
                </p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}>
                            <AiOutlineMinus/>
                        </span>
                        <span className='num'>
                          {qty}
                        </span>
                        <span className='plus' onClick={incQty}>
                            <AiOutlinePlus/>
                        </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart'
                    onClick={() => onAdd(product, qty)}>Add to cart</button>
                    <button type='button' className='buy-now'
                    onClick={() =>{
                        setPaymentDetail(
                            {
                                Amount: product.price * 100 * qty,
                                items:[[product.name]]
                            }
                        )
                        router.push("/payment");
                    }}>Buy Now</button>
                </div>
            </div>

            
        </div>
        
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='track'>
                    <div className='maylike-products-container'>
                    {productDatas.map((item, i) => (
                        <Product key={i} product={item}/>
                    ))}
                    </div>
                    </div>
                </div>
            </div>


    </div>
  )
}

export default ProductDetails