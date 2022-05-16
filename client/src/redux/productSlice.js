import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products`);

  return data;
});

export const createProduct = createAsyncThunk('products/createProduct', async ({ authToken, product }) => {
  // TODO: Where do I retrieve this from -- can it be done inside this slice without passing it as argument?
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  const { data } = await axios.post(`/api/products`, product, axiosConfig);

  return data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (initialProduct) => {
  const { _id } = initialProduct;

  // TODO: Do we want to allow editing of _id? Probably not? So let's remove it for now
  delete initialProduct._id;
  const { data } = await axios.put(`/api/products/${_id}`, initialProduct);

  return data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async ({ authToken, product }) => {
  const { _id: id } = product;

  // TODO: Where do I retrieve this from -- can it be done inside this slice without passing it as argument?
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  console.log('Attempting to delete product with ID, with Auth, with Product', id, authToken, product);

  const response = await axios.delete(`/api/products/${id}`, axiosConfig);

  console.log('DELETE PRODUCT RESPONSE', response);

  if (response && response.status === 200) return product;

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

      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        if (!action.payload.id) {
          return;
        }
        state.products.push(action.payload);
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (!action.payload.id) {
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
