import axios from "axios";

const API_BASE_URL =
  process.env.process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api";

// Add a new rating
export const addRating = async (ratingData) => {
  const response = await axios.post(`${API_BASE_URL}/ratings`, ratingData);
  return response.data;
};

// Get all ratings for a product
export const fetchProductRatings = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/ratings/${productId}`);
  return response.data;
};

// Update a rating
export const updateRating = async (id, updatedData) => {
  const response = await axios.put(
    `${API_BASE_URL}/ratings/${id}`,
    updatedData
  );
  return response.data;
};

// Delete a rating
export const deleteRating = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/ratings/${id}`);
  return response.data;
};
