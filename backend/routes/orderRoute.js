import express from 'express';
import {
  placeOrder,
  placeOrderStripe,
  placeOrderPaypal,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyPaypal,
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authMiddleware from '../middleware/authMiddleware.js';

const orderRouter = express.Router();

//Admin Routes
orderRouter.get('/admin/list', adminAuth, allOrders);
orderRouter.put('/admin/:orderId/status', adminAuth, updateStatus);

//User Routes
orderRouter.get('/user/orders', authMiddleware, userOrders);

//Payment Routes
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/stripe', authMiddleware, placeOrderStripe);
orderRouter.post('/paypal', authMiddleware, placeOrderPaypal);

//Verification Routes
orderRouter.post('/verifyStripe', authMiddleware, verifyStripe);
orderRouter.post('/verifyPaypal', authMiddleware, verifyPaypal);

export default orderRouter;
