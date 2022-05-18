import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ordersServices from '../services/ordersServices';

const initialState = {
  orders: [],
};

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (authToken, thunkAPI) => {
  return await ordersServices.getAllOrders(authToken);
});

export const createOrder = createAsyncThunk('orders/createOrder', async ({ authToken }, thunkAPI) => {
  // TODO: Create via API call
  // Once Order is made, we don't want to store our cart items locally
  localStorage.removeItem('cartItems');
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async ({ authToken }, thunkAPI) => {
  return await ordersServices.getAllOrders(authToken);
});

const orderSlice = createSlice({
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

export const { resetOwnOrder } = orderSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const getOrderStatus = (state) => state.orders.status;
export const getOrderError = (state) => state.orders.error;

export default orderSlice.reducer;
