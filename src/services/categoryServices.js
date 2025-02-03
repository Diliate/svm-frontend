import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Fetch all categories
export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchAllCategories:", error.message); // Log errors
    throw error;
  }
};

// Add a new category
export const addCategory = async (name) => {
  const response = await axios.post(`${API_BASE_URL}/categories`, { name });
  return response.data;
};

// Update an existing category
export const updateCategory = async (id, name) => {
  const response = await axios.put(`${API_BASE_URL}/categories/${id}`, {
    name,
  });
  return response.data;
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
  return response.data;
};

// get searched products
export const searchCategory = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/categories/search`, {
    params: { query },
  });
  return response.data;
};
