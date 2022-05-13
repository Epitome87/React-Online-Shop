import express from 'express';
import { authenticateUser, getUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser);
userRouter.route('/login').post(authenticateUser);

export default userRouter;
