import axios from 'axios';

export const getCartData = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/getCartData/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
};
