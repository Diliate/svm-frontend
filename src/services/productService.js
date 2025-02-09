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

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch products."
    );
  }
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/products/featured`);
  return response.data;
};

// Fetch limited-offer products
export const fetchLimitedOfferProducts = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/products/limited-offers`
  );
  return response.data;
};

// Fetch discounted products
export const fetchDiscountedProducts = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/products/discounted`
  );
  return response.data;
};

// Add or update a product
export const saveProduct = async (productData, isEditing, id) => {
  try {
    const endpoint = isEditing
      ? `${API_BASE_URL}/products/${id}`
      : `${API_BASE_URL}/products`;
    const method = isEditing ? "put" : "post";

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: productData,
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the correct content type
      },
    });

    return response.data; // Return the response data if successful
  } catch (error) {
    console.error(
      "Error saving product:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error to be caught in the calling code
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// Get product from ID
export const fetchProductById = async (id, userId) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/products/${id}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get filtered products
export const fetchFilteredProducts = async (filters) => {
  // Ensure categoryId is converted into a comma-separated string if it's an array
  if (filters.categoryId && Array.isArray(filters.categoryId)) {
    filters.categoryId = filters.categoryId.join(",");
  }

  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/products/filtered`,
      {
        params: filters,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/categories/${categoryId}/products`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in getProductsByCategory:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error to handle it in the component
  }
};
