import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5000/api";

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);

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
  try {
    const endpoint = isEditing
      ? `${API_BASE_URL}/products/${id}`
      : `${API_BASE_URL}/products`;
    const method = isEditing ? "put" : "post";

    const response = await axios({
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
// export const saveProduct = async (productData, isEditing, id) => {
//   try {
//     const endpoint = isEditing
//       ? `${API_BASE_URL}/products/${id}`
//       : `${API_BASE_URL}/products`;
//     const method = isEditing ? "put" : "post";

//     const formData = new FormData();

//     // Append text fields to FormData
//     for (const key in productData) {
//       if (key !== "images") {
//         formData.append(key, productData[key]);
//       }
//     }

//     // Append images (assuming productData.images is an array of File objects)
//     if (productData.images && productData.images.length > 0) {
//       productData.images.forEach((image) => {
//         formData.append("images", image);
//       });
//     }

//     const response = await axios({
//       method,
//       url: endpoint,
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error saving product:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// get product from id
export const fetchProductById = async (id, userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
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
// get filtered products
export const fetchFilteredProducts = async (filters) => {
  // Ensure categoryId is converted into a comma-separated string if it's an array
  if (filters.categoryId && Array.isArray(filters.categoryId)) {
    filters.categoryId = filters.categoryId.join(",");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/products/filtered`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

// get products by categiry
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
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
