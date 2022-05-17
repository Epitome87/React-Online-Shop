import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
};

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async ({ authToken }, thunkAPI) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const { data } = await axios.get(`/api/orders`, axiosConfig);

  return data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async ({ authToken }, thunkAPI) => {
  // Once Order is made, we don't want to store our cart items locally
  localStorage.removeItem('cartItems');
});

const cartSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOwnOrder: (state, action) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'success';
        state.orders = action.payload;
      })

      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addItem, resetOwnOrder } = cartSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.cart.cartItems;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;

export default cartSlice.reducer;
