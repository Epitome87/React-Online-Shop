import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Import our Page components and Layout components
import {
  FAQ,
  Home,
  Login,
  Orders,
  Product,
  ProductEdit,
  Products,
  Profile,
  Registration,
  ShoppingCart,
  UserEdit,
  Users,
} from './pages';
import { Footer, Header } from './components/layout';

// Import our Reducers
import productsReducer from './redux/productSlice';
import productDetailsReducer from './redux/productDetailsSlice';
import cartReducer from './redux/cartSlice';
import userReducer from './redux/userSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  },
});

function App() {
  return (
    <Provider store={store}>
      <NextUIProvider theme={darkTheme}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<Product />} />
            <Route path='/cart/' element={<ShoppingCart />} />
            <Route path='/cart/:id' element={<ShoppingCart />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin/orders' element={<p>Come back soon!</p>} />
            <Route path='/products' element={<Products />} />
            <Route path='/admin/products/:id' element={<ProductEdit />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/users/:id' element={<UserEdit />} />
            <Route path='/admin/orders' element={<Orders />} />
          </Routes>
          <Footer />
        </Router>
      </NextUIProvider>
    </Provider>
  );
}

export default App;
