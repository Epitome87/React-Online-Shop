import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails = createAsyncThunk('productDetails/fetchProductDetails', async (id, thunkAPI) => {
  const { data } = await axios.get(`/api/products/${id}`);

  return data;
});

const initialState = {
  product: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'success';
        console.log('Setting product to', action.payload);
        state.product = action.payload;
      })

      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        // state.error = error.response && error.response.data.message ? error.response.data.message : error.message;
      });
  },
});

// Selectors
export const selectProductDetails = (state) => state.productDetails.product;
export const getProductDetailsStatus = (state) => state.productDetails.status;
export const getProductDetailsError = (state) => state.productDetails.error;

export default productDetailsSlice.reducer;
