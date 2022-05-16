import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails = createAsyncThunk('productDetails/fetchProductDetails', async (id, thunkAPI) => {
  console.log('FETCHING PRODUCT DETAILS');
  const { data } = await axios.get(`/api/products/${id}`);

  return data;
});

const initialState = {
  product: {}, // TODO: Should this be null instead? Which is more preferable?
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
export const selectProductDetailsStatus = (state) => state.productDetails.status;
export const selectProductDetailsError = (state) => state.productDetails.error;

export default productDetailsSlice.reducer;
