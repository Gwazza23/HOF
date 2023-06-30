import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUserCart = createAsyncThunk("cart/fetchUserCart", async (id) => {
  const response = await axios.get(`https://house-of-fashion.onrender.com/cart/${id}`);
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    status: "idle",
    error: null,
  },
  reducers: {
    removeItemFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.status = "completed";
        state.cartData = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export { fetchUserCart };

export const { removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state) => state.cart;
