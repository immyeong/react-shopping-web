import axios from 'axios';

const checkProductExistence = async (productId) => {
    try {
        // Send a GET request to fetch all products from the server
        const res = await axios.get(`http://localhost:3001/products/${productId}`);

        return res.data;
    } catch (error) {
        console.error('Error checking product existence:', error);
        return false; // Return false indicating product doesn't exist (due to error)
    }
};

export default checkProductExistence;