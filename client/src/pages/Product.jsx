import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Divider, Grid, Image, Row, Text } from '@nextui-org/react';
import axios from 'axios';

function Product() {
  const [product, setProduct] = useState({});
  const { id : productID } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productID}`);
      setProduct(data);
    }

    fetchProduct();
  }, []);

  return (
    <Container>
      <Row gap={2} align='center' wrap='wrap' css={{ mt: '$20' }}>
        <Col span={4}>
          <Image height={500} src={product.image} alt={product.name} objectFit='cover' />
        </Col>
        <Col span={5}>
          <Text h1 size={60} css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%', lineHeight: 1 }} weight='bold'>
            {product.name}
          </Text>
          <p>
            {product.averageRating} from {product.numberOfReviews} reviews
          </p>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </Col>
        <Col span={3}>
          <Card bordered>
            <Card.Body css={{ py: '$10' }}>
              <Row justify='space-between'>
                <Text>Price:</Text>
                <Text b>${product.price}</Text>
              </Row>
              <Divider css={{ my: '$5' }} />
              <Row justify='space-between' css={{ mb: '$5 ' }}>
                <Text>Availability:</Text>
                <Text b>{product.numberOfStock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
              </Row>
              <Row justify='center'>
                <Button size='sm' color='secondary' disabled={product.numberOfStock <= 0}>
                  ADD TO CART
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Product;
