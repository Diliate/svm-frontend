// services/orderService.js

import axios from "axios";

const API_BASE_URL =
  process.env.process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api";

/**
 * Get details of a specific order by ID
 * @param {string} orderId - The ID of the order to retrieve
 * @returns {Promise<Object>} - The order details
 */
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`); // Updated route
    return response.data.order; // Return only the order object
  } catch (error) {
    console.error(
      "Error fetching order details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get orders for a specific user with optional filter
 * @param {string|number} userId - The ID of the user
 * @param {string} [filter] - Optional filter: 'week', 'month', 'year'
 * @returns {Promise<Array>} - An array of orders
 */
export const getUserOrders = async (userId, filter) => {
  try {
    const params = {};
    if (filter && filter.toLowerCase() !== "all") {
      params.filter = filter.toLowerCase(); // Ensure lowercase for backend compatibility
    }

    const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`, {
      params,
    });
    return response.data.orders; // Array of orders
  } catch (error) {
    console.error(
      "Error fetching user orders:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Cancel a specific order
 * @param {string} orderId - The ID of the order to cancel
 * @returns {Promise<Object>} - The updated order
 */
export const cancelUserOrder = async (orderId) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/orders/${orderId}/cancel`
    );
    return response.data.order;
  } catch (error) {
    console.error(
      "Error cancelling user order:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * (Optional) Create a new order record
 * @param {Object} orderData - The order data
 * @returns {Promise<Object>} - The newly created order
 */
export const createOrderRecord = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data.order;
  } catch (error) {
    console.error(
      "Error creating order record:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default {
  getOrderDetails,
  getUserOrders,
  cancelUserOrder,
  createOrderRecord,
  // Add other exports if necessary
};
