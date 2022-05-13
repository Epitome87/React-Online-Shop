import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Divider, Grid, Image, Row, Spacer, Text } from '@nextui-org/react';
import { addToCart, removeFromCart, selectCartItems } from '../redux/cartSlice';

function ShoppingCart() {
  const { id: productID } = useParams();
  const [searchParams] = useSearchParams();
  const quantity = searchParams.get('qty') ? searchParams.get('qty') : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  console.log('CART ID', productID);

  useEffect(() => {
    console.log('cart effect');
    if (productID) {
      dispatch(addToCart({ productID, quantity }));
    }
  }, [dispatch, productID, quantity]);

  const removeFromCartHandler = (id) => {
    console.log('Removing from cart', id);
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = (event) => {
    console.log('Checkout)');
  };

  let renderedContent = '';

  let subTotal = cartItems.reduce((previous, current) => {
    return previous + Number(current.quantity);
  }, 0);

  let totalPrice = cartItems
    .reduce((previous, current) => {
      return previous + current.quantity * Number(current.price);
    }, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    renderedContent = <div>Your cart is empty!</div>;
  } else {
    renderedContent = cartItems.map((cartItem) => {
      return (
        <Card css={{ my: '$5' }}>
          <Card.Body>
            <Row justify='center'>
              <Col span={2}>
                <Image width={100} src={cartItem.image} alt={cartItem.name} objectFit='contain' showSkeleton />
              </Col>
              <Col span={2}>
                <Link to={`/products/${cartItem._id}`}>{cartItem.name}</Link>
              </Col>
              <Col span={2}>
                <Text>${cartItem.price}</Text>
              </Col>
              <Col span={2}>
                <select
                  style={{ color: '#111', backgroundColor: '#fff', padding: '0.5rem 1rem', borderRadius: '10px' }}
                  name=''
                  id=''
                  value={cartItem.quantity}
                  onChange={(event) => {
                    console.log('Changing quantity to', Number(event.target.value));
                    dispatch(addToCart({ productID: cartItem._id, quantity: Number(event.target.value) }));
                  }}
                >
                  {[...Array(cartItem.numberOfStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </Col>
              <Col span={2}>
                <Button type='button' onClick={() => removeFromCartHandler(cartItem._id)} shadow color='gradient' auto>
                  Remove
                </Button>
              </Col>
              {/* <Spacer y={8} /> */}
            </Row>
          </Card.Body>
        </Card>
      );
    });
  }

  return (
    <React.Fragment>
      <Container gap={2}>
        <Text h1 size={60} css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%', lineHeight: 1.6 }} weight='bold'>
          Shopping Cart
        </Text>
        <Row gap={2} justify='center' wrap='wrap' css={{ mt: '$20' }}>
          <Col span={9}>{renderedContent}</Col>
          <Col span={3}>
            <Card bordered>
              <Card.Body>
                <h3>({subTotal}) items</h3>
                <h4>Total: ${totalPrice}</h4>
                <Button
                  type='button'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  shadow
                  bordered
                  color='gradient'
                  auto
                  ghost
                >
                  Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ShoppingCart;
