import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import logger from './utils/logger.js';
import errorHandler from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Connect to MongoDB
connectDB();

// Routes
app.use('/categories', categoryRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
