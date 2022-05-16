import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.route('/').get(getProducts).post(auth, isAdmin, createProduct);
productRouter.route('/:id').get(getProduct).put(updateProduct).delete(auth, isAdmin, deleteProduct);
productRouter.route('/:id/reviews').post(auth, createProductReview);

export default productRouter;
