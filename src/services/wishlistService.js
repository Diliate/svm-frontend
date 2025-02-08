import axios from "axios";

// Set API_BASE_URL to the root API path
const API_BASE_URL =
  process.env.process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
  "http://localhost:5000/api";

// Fetch the wishlist for a user
export const fetchWishlist = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wishlist/${userId}`);
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
    const response = await axios.post(`${API_BASE_URL}/wishlist`, {
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
    const response = await axios.delete(`${API_BASE_URL}/wishlist`, {
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
    const response = await axios.delete(`${API_BASE_URL}/wishlist/clear`, {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error clearing wishlist:",
      error.response?.data || error.message
    );
    throw error;
  }
};
