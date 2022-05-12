import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getProducts = createAsyncThunk("products/getProducts", async (dispatch, getState) => {
  console.log("SIGH");
  const { data } = await axios.get(`/api/products`);
  return data;
});

const initialState = {
  products: [],
  status: null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    retrieve: async (state) => {
        const { data } = await axios.get(`/api/products`);
        state.products = data;

        console.log("Setting state", data)
    },
    extraReducers: {
      [getProducts.pending]: (state, action) => {
        console.log("PENDING");
        state.status = "loading";
      },
      [getProducts.fulfilled]: (state, action) => {
        state.status = "success";
        console.log("Setting products to", action.payload);
        state.products = action.payload;
      },
      [getProducts.rejected]: (state, action) => {
        state.status = "failed";
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { retrieve, add, remove } = productsSlice.actions;



export default productsSlice.reducer;