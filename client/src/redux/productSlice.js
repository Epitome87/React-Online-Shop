import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsServices from '../services/productsServices';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (dispatch, getState) => {
  return await productsServices.getAllProducts();
});

export const createProduct = createAsyncThunk('products/createProduct', async ({ authToken, product }) => {
  // TODO: Where do I retrieve this from -- can it be done inside this slice without passing it as argument?
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  return await productsServices.createProduct(authToken, product);
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (initialProduct) => {
  return await productsServices.updateProductByID(initialProduct);
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async ({ authToken, product }) => {
  return await productsServices.deleteProduct(authToken, product);
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
