import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider, createTheme } from '@nextui-org/react';

import { FAQ, Home, Product } from './pages';
import { Footer, Header } from './components/layout';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  },
});

function App() {
  return (
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
  );
}

export default App;
