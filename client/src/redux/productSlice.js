import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products`);

  return data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (initialProduct) => {
  const { data } = await axios.post(`/api/products`, initialProduct);
  return data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (initialProduct) => {
  const { id } = initialProduct;

  const { data } = await axios.put(`/api/products/${id}`, initialProduct);
  return data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (initialProduct) => {
  const { id } = initialProduct;

  const response = await axios.delete(`/api/products`);

  if (response && response.status === 200) return initialProduct;

  return `${response.status}: ${response.statusText}`;
});

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';

        const loadedProducts = action.payload.map((product) => {
          return product;
        });

        state.products = state.products.concat(loadedProducts);
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        // state.error = error.response && error.response.data.message ? error.response.data.message : error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        state.products.push(action.payload);
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.products = state.products.filter((product) => {
          return product._id !== id;
        });
      });
  },
});

// Action creators are generated for each case reducer function
export const { productAdded } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const selectProductById = (state, productId) => {
  state.products.products.find((product) => product._id === productId);
};

export default productsSlice.reducer;
