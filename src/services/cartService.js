import axios from "axios";

// Set API_BASE_URL to the root API path
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000/api";

// Fetch the cart for a user
export const fetchCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
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
    console.log("Payload sent to addToCart:", { userId, productId, quantity });
    const response = await axios.post(`${API_BASE_URL}/cart`, {
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
    const response = await axios.put(`${API_BASE_URL}/cart/item`, {
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
    const response = await axios.delete(`${API_BASE_URL}/cart/item`, {
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
