import express from 'express';
import {
  getProductReviews,
  getAllReviews,
  approveReview,
  addReview,
} from '../controllers/reviewController.js';
import adminAuth from '../middleware/adminAuth.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addReview);
router.get('/:productId', getProductReviews);

router.get('/admin/all', adminAuth, getAllReviews);
router.post('/admin/approve', adminAuth, approveReview);

export default router;
