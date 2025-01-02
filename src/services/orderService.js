import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Get orders for user
export const getUserOrders = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${userId}`);
  return response.data.orders; // { success: true, orders: [...] }
};

// Optionally cancel an order
export const cancelUserOrder = async (orderId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/orders/${orderId}/cancel`
  );
  return response.data.order;
};
