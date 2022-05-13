import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import ProductPreview from '../components/ProductPreview';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { selectAllProducts, getProductsStatus, getProductsError } from '../redux/productSlice';

/* Home Screen
This screen will be a mini-landing page of sorts. The latest products and the top-reviewed products will be showcased here.
Some information about the site will also be provided, and perhaps a nice (but small) hero section.
*/
function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    if (productStatus === 'idle') {
      console.log('Dispatching fetch products');
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  let renderedContent = '';

  if (productStatus === 'loading') {
    renderedContent = <Loading size='xl'>Loading</Loading>;
  }

  if (productStatus === 'failed') {
    renderedContent = <p>Failed to retrieve product listing: {error}</p>;
  }

  if (productStatus === 'success') {
    renderedContent = products.map((product, index) => (
      <Grid key={product._id} xs={12} sm={6} md={4} lg={3}>
        <ProductPreview
          id={product._id}
          name={product.name}
          // description={product.description}
          image={product.image}
          price={product.price}
          averageRating={product.averageRating}
          numberOfReviews={product.numberOfReviews}
        />
      </Grid>
    ));
  }

  return (
    <main>
      <Container>
        <Text
          h1
          size={60}
          css={{ textGradient: '45deg, $blue500 -20%, $pink500 80%', textAlign: 'center' }}
          weight='bold'
        >
          Welcome to the Home Page!
        </Text>
        <Text size={20}>Check out our newest arrivals</Text>
        <Grid.Container gap={2} justify='flex-start'>
          {renderedContent}
        </Grid.Container>
      </Container>
    </main>
  );
}

export default Home;
