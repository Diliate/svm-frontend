// services/razorpayService.js
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5000/api";

/**
 * Create a Razorpay order
 * @param {number} amount - Amount in paise
 * @param {string} currency - Currency code, e.g., "INR"
 * @param {string} receipt - Unique receipt identifier
 * @param {string} userId - User ID
 */
export const createRazorpayOrder = async (
  amount,
  currency,
  receipt,
  userId
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/razorpay/create-order`, {
      amount,
      currency,
      receipt,
      userId,
    });
    return response.data; // { order, newOrder }
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    throw error;
  }
};

/**
 * Verify Razorpay payment
 * @param {Object} payload - Payment verification payload
 */
export const verifyRazorpayPayment = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/razorpay/verify-payment`,
      payload
    );
    return response.data; // { status, message, order, shiprocket }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error.message);
    throw error;
  }
};
