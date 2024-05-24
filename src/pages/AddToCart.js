import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartData } from '../Apis/getCartDataApis';
import { deleteCartProducts } from '../Apis/deleteCartproductApis';
import { loadStripe } from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const userData = useSelector((state) => state.users);
  const userId = userData._id;

  useEffect(() => {
    if (userId) {
      fetchCartData(userId);
    }
  }, [userId]);

  const fetchCartData = async (userId) => {
    try {
      const cartData = await getCartData(userId);
      setCart(cartData.cartProduct);
    } catch (error) {
      setError(error);
    }
  };

  const handleRemove = async (id) => {
    await deleteCartProducts(id);
    if (userId) {
      fetchCartData(userId);
    }
    setModalVisible(false);
  };

  const calculateTotalPrice = () => {
    let itemTotal = 0; 
    cart.forEach((cartItem) => {
      itemTotal += parseFloat(cartItem.productId.productPrice.replace(/[^0-9.-]+/g, "")) * parseInt(cartItem.quantity, 10);
    });
    return itemTotal.toFixed(2); 
  };

  const calculateTotalWithDelivery = () => {
    const totalPrice = parseFloat(calculateTotalPrice());
    const deliveryFee = 5;
    return (totalPrice + deliveryFee).toFixed(2);
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PJd7tA91s3iRYXSSClj5tq3WSPwH80GRIHsIVxbnto1TSUKKnR82j3F81hF0U8CAoptUtsB203AHG3eZatLPrU800u4eKbsox");
    const body = {
      products: cart
    };
    const headers = {
      "Content-Type": "application/json"
    };
    const response = await fetch(`http://localhost:5000/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <>
      <div className="container" style={{ overflow: "scroll", height: "300px", width:"auto" }}>
        <div className="row m-2">
          {error ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((cartItem, index) => (
                <div key={index} className="row mt-5">
                  <div className="row mb-2">
                    {cartItem.productId.image && cartItem.productId.image.url ? (
                      <img
                        className="col-md-2"
                        src={cartItem.productId.image.url}
                        alt="Product"
                        style={{ width: '200px', height: '50px', objectFit: 'contain' }}
                      />
                    ) : (
                      <div>No image available</div>
                    )}
                    <div className="card-body d-flex flex-row row col-md-2">
                      <h5 className="admin-card-title card-title admin-card-content col-md-2">{cartItem.productId.productName}</h5>
                      <p className="admin-card-price card-text admin-card-content col-md-2">Price: {cartItem.productId.productPrice}</p>
                      <div className="stock-quntity admin-card-content col-md-2">
                        <span className="admin-stock stock card-text col-md-2">Quantity: {cartItem.quantity}</span>
                      </div>
                      <p className="admin-card-price card-text admin-card-content col-md-2">
                        Total $: {parseFloat(cartItem.productId.productPrice.replace(/[^0-9.-]+/g, "")) * parseInt(cartItem.quantity, 10)}
                      </p>
                    </div>
                    <button onClick={() => { setItemToRemove(cartItem._id); setModalVisible(true); }} className="border-0 col-md-2 cart-remove-btn">
                      <i className="bi bi-trash-fill"></i>
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

      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this item from the cart?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => handleRemove(itemToRemove)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
