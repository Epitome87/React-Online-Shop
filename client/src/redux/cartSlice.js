import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productID, quantity }, thunkAPI) => {
  const { data } = await axios.get(`/api/products/${productID}`);

  // TODO: Do we need to payload all of Product's properties?!
  return { ...data, quantity };
});

// export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productID, thunkAPI) => {});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item._id !== itemToRemove;
      });
    },
    // addItem: (state, action) => {
    //   const item = action.payload;
    //   const itemExists = state.cartItems.find((x) => x.product === item.product);
    //   if (itemExists) {
    //     state.cartItems.map((x) => {
    //       return x.product === itemExists.product ? item : x;
    //     });
    //   } else {
    //     state.cartItems.push(item);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'success';

        // TODO: Do we want all of a Product's properties?

        const item = action.payload;
        const itemExists = state.cartItems.find((cartItem) => cartItem._id === item._id);

        if (itemExists) {
          console.error('This item already exists in cart');
          state.cartItems = state.cartItems.map((cartItem) => {
            return cartItem._id === itemExists._id ? item : cartItem;
          });
        } else {
          state.cartItems.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        // state.error = error.response && error.response.data.message ? error.response.data.message : error.message;
      });
  },
});

export const { addItem, removeFromCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;

export default cartSlice.reducer;
