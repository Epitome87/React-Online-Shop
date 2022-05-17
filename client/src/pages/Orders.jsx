import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import ProductPreview from '../components/ProductPreview';
import { deleteProduct, createProduct, updateProduct, fetchProducts } from '../redux/productSlice';
import { selectAllProducts, getProductsStatus, getProductsError } from '../redux/productSlice';

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(fetchProducts());
    } else {
      navigate('/login');
    }
  }, [dispatch, user, navigate]);

  const onProductDelete = (authToken, product, event) => {
    // TODO: Use Modal instead
    if (window.confirm("Are you sure you want to remove this Product? This can't be undone")) {
      dispatch(deleteProduct({ authToken, product }));
    }
  };

  const onProductCreate = (authToken, product, event) => {
    console.log('EVENT', event);
    // TODO: Use Modal instead
    if (window.confirm("Are you sure you want to remove this Product? This can't be undone")) {
      dispatch(createProduct({ authToken, product }));
    }
  };

  const renderedProducts = products.map((product) => {
    return (
      <li key={product._id}>
        <Card>
          <p>ID: {product._id}</p>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.numberOfStock}</p>
          <p>Rating: {product.averageRating}</p>
          <Link to={`/admin/products/${product._id}`}>Edit</Link>
          <Button type='button' onClick={() => onProductDelete(user.token, product)} color='gradient'>
            Delete
          </Button>
        </Card>
      </li>
    );
  });

  if (!products) return <p>Fetching Products...</p>;

  return (
    <React.Fragment>
      <h1>Products</h1>
      <ul>{renderedProducts}</ul>
      {/* <Button type='button' onClick={() => onProductCreate(user.token, product)} color='gradient'>
        Add Product
      </Button> */}
    </React.Fragment>
  );
}

export default Orders;
