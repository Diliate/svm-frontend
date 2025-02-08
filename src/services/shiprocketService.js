// services/shiprocketService.js
import axios from "axios";

const API_BASE_URL =
  process.env.process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api";

/**
 * Track a shipment
 * @param {string} shipmentId - Shipment ID to track
 */
export const trackShipment = async (shipmentId) => {
  try {
    const response = await axios.get(
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
    const response = await axios.post(`${API_BASE_URL}/shiprocket/cancel`, {
      shipmentId,
    });
    return response.data; // { status, message, cancellation }
  } catch (error) {
    console.error("Error cancelling shipment:", error.message);
    throw error;
  }
};
