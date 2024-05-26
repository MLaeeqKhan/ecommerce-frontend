// deleteCartProductsApis.js
import axios from 'axios';

// Delete a product
export const deleteCartProducts = async (cartProductId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteCartProducts/${cartProductId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
