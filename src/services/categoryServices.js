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

// Fetch all categories
export const fetchAllCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchAllCategories:", error.message); // Log errors
    throw error;
  }
};

// Add a new category
export const addCategory = async (name) => {
  try {
    const response = await axiosInstance.post(`/categories`, { name });
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error.message); // Log errors
    throw error;
  }
};

// Update an existing category
export const updateCategory = async (id, name) => {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, {
      name,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.message); // Log errors
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.message); // Log errors
    throw error;
  }
};

// Get searched categories
export const searchCategory = async (query) => {
  try {
    const response = await axiosInstance.get(`/categories/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching category:", error.message); // Log errors
    throw error;
  }
};
