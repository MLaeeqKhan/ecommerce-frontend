import React from 'react'
import { deleteCartProductsAfterPayment } from '../Apis/deleteAfterPaymentCartProductsApis';
import { useSelector } from 'react-redux';



const PaymentSuccess = () => {
  const userData = useSelector((state) => state.users);
  const userId = userData._id;
  const handleRemove = async (userId) => {
    await deleteCartProductsAfterPayment(userId);
    
  };
  handleRemove(userId);
  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess