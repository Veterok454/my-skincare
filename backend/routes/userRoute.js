import express from 'express';
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserCart,
  updateUserCart,
  addToCart,
  removeFromCart,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

userRouter.get('/cart', authMiddleware, getUserCart);
userRouter.put('/cart', authMiddleware, updateUserCart);
userRouter.post('/cart/add', authMiddleware, addToCart);
userRouter.post('/cart/remove', authMiddleware, removeFromCart);

export default userRouter;
