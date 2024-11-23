import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Fetch all products
export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/featured`);
  return response.data;
};

// Fetch limited-offer products
export const fetchLimitedOfferProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/limited-offers`);
  return response.data;
};

// Fetch discounted products
export const fetchDiscountedProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/discounted`);
  return response.data;
};

// Add or update a product
export const saveProduct = async (productData, isEditing, id) => {
  const endpoint = isEditing
    ? `${API_BASE_URL}/products/${id}`
    : `${API_BASE_URL}/products`;
  const method = isEditing ? "put" : "post";
  const response = await axios[method](endpoint, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// get searched products
export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/products/search`, {
    params: { query },
  });
  return response.data;
};
