// services/razorpayService.js
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const createRazorpayOrder = async (
  amount,
  currency,
  receipt,
  userId
) => {
  try {
    // amount in paise, e.g. 50000 = ₹500
    const response = await axios.post(`${API_BASE_URL}/razorpay/create-order`, {
      amount,
      currency,
      receipt,
      userId,
    });
    return response.data; // Should contain { order, newOrder } if you coded your backend that way
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    throw error;
  }
};

export const verifyRazorpayPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/razorpay/verify-payment`,
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }
    );
    return response.data; // { status: 'success' } or { status: 'failure', ... }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error.message);
    throw error;
  }
};
