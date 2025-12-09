import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import reviewRoutes from './routes/reviewRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Initialize services silently
const initializeServices = async () => {
  try {
    await connectDB();
    connectCloudinary();
    console.log('DB Connected');
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
};

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: [
      'https://my-skincare.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/reviews', reviewRoutes);

// Main route
app.get('/', (req, res) => {
  res.json({
    message: 'API Working',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// Handling non-existent routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
});

await initializeServices();
export default app;
