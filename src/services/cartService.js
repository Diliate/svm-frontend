import axios from "axios";
import https from "https";

// Set API_BASE_URL to the root API path
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://localhost:5000/api";

// Create an Axios instance with httpsAgent to handle SSL in development
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies in requests
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Skip SSL verification in dev
  }),
});

// Fetch the cart for a user
export const fetchCart = async (userId) => {
  try {
    const response = await axiosInstance.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Add product to cart
export const addToCart = async (userId, productId, quantity) => {
  if (!userId || !productId || quantity <= 0) {
    console.error("Invalid input parameters for addToCart:", {
      userId,
      productId,
      quantity,
    });
    throw new Error("Invalid input parameters.");
  }

  try {
    const response = await axiosInstance.post(`/cart`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding to cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await axiosInstance.put(`/cart/item`, {
      cartItemId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating cart item:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Remove product from cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete(`/cart/item`, {
      data: { cartItemId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error removing from cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Clear cart
export const clearCart = async (userId) => {
  try {
    const response = await axiosInstance.post(`/cart/clear`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error clearing cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};
