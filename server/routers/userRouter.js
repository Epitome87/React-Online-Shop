import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import {
  authenticateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/').get(auth, isAdmin, getUsers).post(registerUser);
userRouter.route('/:id').get(auth, isAdmin, getUser).put(auth, isAdmin, updateUser).delete(auth, isAdmin, deleteUser);
userRouter.route('/login').post(authenticateUser);
userRouter.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default userRouter;
