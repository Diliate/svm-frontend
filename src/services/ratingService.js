import axios from "axios";
import https from "https";

// Set API_BASE_URL to the root API path
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5000/api";

// Create an Axios instance with httpsAgent to handle SSL in development
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies in requests
  httpsAgent: new https.Agent({
    rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false, // Skip SSL verification in dev
  }),
});

// Add a new rating
export const addRating = async (ratingData) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/ratings`,
    ratingData
  );
  return response.data;
};

// Get all ratings for a product
export const fetchProductRatings = async (productId) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/ratings/${productId}`
  );
  return response.data;
};

// Update a rating
export const updateRating = async (id, updatedData) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/ratings/${id}`,
    updatedData
  );
  return response.data;
};

// Delete a rating
export const deleteRating = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/ratings/${id}`);
  return response.data;
};
