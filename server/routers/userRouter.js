import express from 'express';
import { auth } from '../middleware/auth.js';
import { authenticateUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/').post(registerUser);
userRouter.route('/login').post(authenticateUser);
userRouter.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default userRouter;
