import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartData } from '../Apis/getCartDataApis';
import { deleteCartProducts } from '../Apis/deleteCartproductApis';

import {loadStripe} from '@stripe/stripe-js';

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const userData = useSelector((state) => state.users);
  const userId = userData._id;

  useEffect(() => {
    if (userId) {
      fetchCartData(userId);
    }
  }, [userId]);

  const handleRemove = async (id) => {
    await deleteCartProducts(id);
    if (userId) {
      fetchCartData(userId);
    }
  };

  const fetchCartData = async (userId) => {
    try {
      const cartData = await getCartData(userId);
      setCart(cartData.cartProduct);
    } catch (error) {
      setError(error);
    }
  };

  const calculateTotalPrice = () => {
    let itemTotal = 0; 
    cart.map((cartItem) => {
      itemTotal += parseFloat(cartItem.productId.productPrice.replace(/[^0-9.-]+/g, "")) * parseInt(cartItem.quantity, 10);
    });
    return itemTotal.toFixed(2); 
  };
  const calculateTotalWithDelivery = () => {
    const totalPrice = parseFloat(calculateTotalPrice());
    const deliveryFee = 5;
    return (totalPrice + deliveryFee).toFixed(2);
  };

  const makePayment=async()=>{
const stripe = await loadStripe("pk_test_51PJd7tA91s3iRYXSSClj5tq3WSPwH80GRIHsIVxbnto1TSUKKnR82j3F81hF0U8CAoptUtsB203AHG3eZatLPrU800u4eKbsox");
const body={
  products:cart
}
const headers={
  "Content-Type":"application/json"
}
const response = await fetch(`http://localhost:5000/create-checkout-session`,{
  method:"POST",
  headers:headers,
  body:JSON.stringify(body)
})
const session= await response.json();

const result = stripe.redirectToCheckout({sessionId:session.id})
  }
  console.log('cart', cart)

  return (
    <>
      <div className="container" style={{ overflow: "scroll", height: "300px" }}>
        <div className="row m-2">
          {error ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((cartItem, index) => (
                <div key={index} className="row">
                  <div className="cart-product-card card admin-product-card card mb-2">
                    {cartItem.productId.image && cartItem.productId.image.url ? (
                      <img
                        className="card-img-top cart-card-img"
                        src={cartItem.productId.image.url}
                        alt="Product"
                        style={{ width: '200px', height: '50px', objectFit: 'contain' }}
                      />
                    ) : (
                      <div>No image available</div>
                    )}
                    <div className="card-body d-flex flex-row">
                      <h5 className="admin-card-title card-title admin-card-content">{cartItem.productId.productName}</h5>
                      <p className="admin-card-price card-text admin-card-content">Price: {cartItem.productId.productPrice}</p>
                      <div className="stock-quntity admin-card-content">
                        <span className="admin-stock stock card-text">Quantity: {cartItem.quantity}</span>
                      </div>
                      <p className="admin-card-price card-text admin-card-content">
                        Total $: {parseFloat(cartItem.productId.productPrice.replace(/[^0-9.-]+/g, "")) * parseInt(cartItem.quantity, 10)}
                      </p>
                    </div>
                    <button onClick={() => handleRemove(cartItem._id)} className="border-0">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>


      <div className='cart-totalls-section'>
        <div className='inner-cart-totalls-section'>
        <h2>Cart Totals</h2>
        <div className='cart-totalls-content'><span>Subtotals</span><span> ${calculateTotalPrice()}</span></div>
        <div className='cart-totalls-content'><span>Delivery Fee</span><span> $5</span></div>
        <div className='cart-totalls-content'><span>Totals</span><span> ${calculateTotalWithDelivery()}</span></div>
        <button className='cart-totalls-btn' onClick={makePayment}>Proceed To Checkout</button>
        </div>
       
      </div>
    </>
  );
};

export default AddToCart;
