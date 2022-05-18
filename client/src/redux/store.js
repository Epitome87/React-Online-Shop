// Import our Reducers
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import productDetailsReducer from './productDetailsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
