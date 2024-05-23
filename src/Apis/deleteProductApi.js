// threadDeleteApis.js
import axios from 'axios';

// Delete a product
export const deleteProducts = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteProducts/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
