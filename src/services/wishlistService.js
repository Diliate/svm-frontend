import axios from "axios";
import https from "https"; // Import https for handling SSL

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5000/api";

// Create an Axios instance with httpsAgent to handle SSL in development
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies in requests
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Skip SSL verification in dev
  }),
});

// Fetch the wishlist for a user
export const fetchWishlist = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/wishlist/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Add a product to the wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/wishlist`, {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding to wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await axiosInstance.delete(`${API_BASE_URL}/wishlist`, {
      data: { userId, productId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error removing from wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Clear the wishlist
export const clearWishlist = async (userId) => {
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/wishlist/clear`,
      {
        data: { userId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error clearing wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
};
