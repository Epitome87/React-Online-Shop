import express from 'express';
import { auth } from '../middleware/auth.js';
import { createProductReview, getProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter
  .route('/')
  .get(getProducts)
  .post(auth, () => console.log('TODO'));
productRouter
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(auth, () => console.log('TODO'));
productRouter.route('/:id/reviews').post(auth, createProductReview);

export default productRouter;
