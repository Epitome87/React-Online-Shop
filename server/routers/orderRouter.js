import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import { createOrder, getOrder, getOrders, getOwnOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.route('/').get(auth, isAdmin, getOrders).post(auth, createOrder);
orderRouter.route('/:id').get(auth, getOrder);
orderRouter.route('/myorders').get(auth, getOwnOrders);

export default orderRouter;
