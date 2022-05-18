import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Footer, Header } from './components/layout';
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
