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

/**
 * Track a shipment
 * @param {string} shipmentId - Shipment ID to track
 */
export const trackShipment = async (shipmentId) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/shiprocket/track/${shipmentId}`
    );
    return response.data; // { status, tracking }
  } catch (error) {
    console.error("Error tracking shipment:", error.message);
    throw error;
  }
};

/**
 * Cancel a shipment
 * @param {string} shipmentId - Shipment ID to cancel
 */
export const cancelShipment = async (shipmentId) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/shiprocket/cancel`,
      {
        shipmentId,
      }
    );
    return response.data; // { status, message, cancellation }
  } catch (error) {
    console.error("Error cancelling shipment:", error.message);
    throw error;
  }
};
