import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Grid, Input, Link, Textarea } from '@nextui-org/react';
import { updateProduct } from '../redux/productSlice';
import {
  fetchProductDetails,
  selectProductDetailsStatus,
  selectProductDetailsError,
  selectProductDetails,
} from '../redux/productDetailsSlice';

function ProductEdit() {
  const navigate = useNavigate();
  //   const { id: productID } = useParams();
  const productID = '627ea864f55996a552305fbf';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const product = useSelector(selectProductDetails);
  const status = useSelector(selectProductDetailsStatus);
  const error = useSelector(selectProductDetailsError);

  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [numberOfStock, setNumberOfStock] = useState(1);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      return navigate('/login');
    }

    console.log('PRODUCT IS', product);

    // if (!product || product._id !== productID) {
    if (Object.keys(product).length === 0) {
      console.log('Dispatching fetch product');
      dispatch(fetchProductDetails(productID));
    } else {
      console.log('Setting Inputs');
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
      setCategory(product.category);
      setNumberOfStock(product.numberOfStock);
    }
  }, [dispatch, productID, product]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPriceChange = (event) => {
    setPrice(event.target.value);
  };

  const onImageChange = (event) => {
    setImage(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onNumberOfStockChange = (event) => {
    setNumberOfStock(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // TODO: Use Modal instead
    if (window.confirm('Are you sure you want to update this Product?')) {
      dispatch(updateProduct({_id: productID, name, price, image, description, category, numberOfStock}));

      // TODO: Assume success for now
      setMessage('Product successfully updated!');
    }
  };

  return (
    <React.Fragment>
      <h1>Product Edit</h1>
      {error && <p>{error}</p>}
      {status === 'loading' && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <Grid.Container gap={4}>
          <Grid>
            <Input
              onChange={onNameChange}
              type='text'
              bordered
              animated={true}
              labelPlaceholder='Name'
              color='secondary'
              value={name}
            />
          </Grid>
          <Grid>
            <Input
              onChange={onPriceChange}
              type='text'
              bordered
              animated={true}
              labelPlaceholder='Price'
              color='secondary'
              value={price}
            />
          </Grid>
          <Grid>
            <Input
              onChange={onImageChange}
              type='text'
              bordered
              animated={true}
              labelPlaceholder='Image'
              color='secondary'
              value={image}
            />
          </Grid>
          <Grid>
            <Input
              onChange={onCategoryChange}
              type='text'
              bordered
              animated={true}
              labelPlaceholder='Category'
              color='secondary'
              value={category}
            />
          </Grid>
          <Grid>
            <Input
              onChange={onNumberOfStockChange}
              type='text'
              bordered
              animated={true}
              labelPlaceholder='Stock'
              color='secondary'
              value={numberOfStock}
            />
          </Grid>
          <Grid>
            <Textarea
              bordered
              rows={6}
              cols={75}
              color='primary'
              status='primary'
              helperColor='primary'
              helperText='Enter a larger description'
              label='Description'
              placeholder='Description'
              onChange={onDescriptionChange}
              value={description}
            />
          </Grid>
          <Grid>
            <Button type='submit'>Update</Button>
          </Grid>
        </Grid.Container>
      </form>
    </React.Fragment>
  );
}

export default ProductEdit;
