import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Container, Grid, Row, Text } from '@nextui-org/react';

function ProductPreview({ id, name, description, image, price, averageRating, numberOfReviews }) {
  return (
    <Card hoverable clickable>
      <Link to={`/products/${id}`}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image objectFit='cover' src={image} width='100%' height={140} alt={name} />
          <Text b>{name}</Text>
          <Text css={{ color: '$accents4', fontWeight: '$semibold' }}>${price}</Text>
        </Card.Body>
        <Card.Footer justify='flex-start'>
          <Row wrap='wrap' justify='space-between'>
            <Text b>{averageRating}</Text>
            <Text css={{ color: '$accents4', fontWeight: '$semibold' }}>{numberOfReviews} reviews</Text>
          </Row>
        </Card.Footer>
      </Link>
    </Card>
  );
}

ProductPreview.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  numberOfReviews: PropTypes.number.isRequired,
};

export default ProductPreview;
