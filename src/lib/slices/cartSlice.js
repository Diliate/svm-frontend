"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartService from "@/services/cartService";

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const response = await cartService.fetchCart(userId);
      return response; // Assumes response contains cart object
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart."
      );
    }
  }
);

// Add Product to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, thunkAPI) => {
    if (!userId || !productId || quantity <= 0) {
      console.error("Invalid parameters for addToCart thunk:", {
        userId,
        productId,
        quantity,
      });
      return thunkAPI.rejectWithValue("Invalid input parameters.");
    }

    try {
      console.log("Dispatching addToCart with:", {
        userId,
        productId,
        quantity,
      });
      const response = await cartService.addToCart(userId, productId, quantity);
      return response; // Use response data as needed
    } catch (error) {
      console.error(
        "Error in Redux Thunk addToCart:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart."
      );
    }
  }
);

// Update Cart Item Quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      const response = await cartService.updateCartItem(cartItemId, quantity);
      return { cartItemId, quantity }; // Adjust if backend returns updated cart item
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart item."
      );
    }
  }
);

// Remove Product from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, thunkAPI) => {
    try {
      const response = await cartService.removeFromCart(cartItemId);
      return cartItemId; // Adjust if backend returns updated cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product from cart."
      );
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, thunkAPI) => {
    try {
      const response = await cartService.clearCart(userId);
      return response; // Assumes response contains confirmation or updated cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear the cart."
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    addLoading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || []; // Default to empty array
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addLoading = false;
        const existingItem = state.items.find(
          (item) => item.productId === action.payload.productId
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push({
            id: action.payload.productId, // Adjust if backend provides full item details
            productId: action.payload.productId,
            quantity: action.payload.quantity,
          });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.updateLoading = false;
        const item = state.items.find(
          (item) => item.id === action.payload.cartItemId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Clear from cart
      .addCase(clearCart.pending, (state) => {
        state.clearLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.clearLoading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.clearLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
