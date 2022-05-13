import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Divider, Grid, Image, Row, Text } from '@nextui-org/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import productDetailsReducer from '../redux/productDetailsSlice';
import {
  fetchProductDetails,
  getProductDetailsStatus,
  getProductDetailsError,
  selectProductDetails,
} from '../redux/productDetailsSlice';

function Product() {
  const [quantity, setQuantity] = useState(1);

  const { id: productID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProductDetails);
  const status = useSelector(getProductDetailsStatus);
  const error = useSelector(getProductDetailsError);

  useEffect(() => {
    dispatch(fetchProductDetails(productID));
  }, [dispatch, productID]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const addToCartHandler = (event) => {
    navigate(`/cart/${productID}?qty=${quantity}`);
  };

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
              <Row justify='space-between'>
                <Text>Availability:</Text>
                <Text b>{product.numberOfStock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
              </Row>
              <Divider css={{ my: '$5' }} />
              {product.numberOfStock > 0 && (
                <Row justify='space-between' css={{ mb: '$5 ' }}>
                  <Text>Quantity</Text>
                  <select
                    style={{ color: '#111', backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '10px' }}
                    name=''
                    id=''
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  >
                    {[...Array(product.numberOfStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </Row>
              )}
              <Row justify='center'>
                <Button onClick={addToCartHandler} size='sm' color='secondary' disabled={product.numberOfStock <= 0}>
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
