import express from 'express';
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
} from '../controllers/productController.js';
import { reorderProducts } from '../controllers/productController.js';
import { productUpload } from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add product route
productRouter.post('/add', adminAuth, productUpload, addProduct);

// Update product route
productRouter.put('/update/:id', adminAuth, productUpload, updateProduct);

// Remove product route (keeping POST as in original code)
productRouter.post('/remove', adminAuth, removeProduct);

// Get single product route (keeping POST as in original code)
productRouter.post('/single', singleProduct);

// List products route
productRouter.get('/list', listProducts);
productRouter.post('/reorder', adminAuth, reorderProducts);

export default productRouter;
