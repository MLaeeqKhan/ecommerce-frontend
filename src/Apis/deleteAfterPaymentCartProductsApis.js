// deleteAfterSuccessPaymentCartProducts.js
import axios from 'axios';

// Delete a cart products
export const deleteCartProductsAfterPayment = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteCartProducts/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
