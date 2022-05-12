import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { FAQ, Home, Product } from './pages';
import { Footer, Header } from './components/layout';

import productsReducer from './redux/productsReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})

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
            <Route path='/faq' element={<FAQ />} />
          </Routes>
          <Footer />
        </Router>
      </NextUIProvider>
    </Provider>
  );
}

export default App;
