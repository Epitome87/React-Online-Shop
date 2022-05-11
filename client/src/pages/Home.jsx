import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Row, Text } from '@nextui-org/react';
import axios from 'axios';
import ProductPreview from '../components/ProductPreview';

/* Home Screen
This screen will be a mini-landing page of sorts. The latest products and the top-reviewed products will be showcased here.
Some information about the site will also be provided, and perhaps a nice (but small) hero section.
*/
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products`);
      setProducts(data);
    }

    fetchProducts();
  }, []);

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
          {products.map((product, index) => (
            <Grid xs={12} sm={6} md={4} lg={3}>
              <ProductPreview
                id={product._id}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                averageRating={product.averageRating}
                numberOfReviews={product.numberOfReviews}
              />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </main>
  );
}

export default Home;
