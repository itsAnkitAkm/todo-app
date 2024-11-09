import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import userRouter from './routes/user.route';
import activityRouter from './routes/activity.route';
import error from './middleware/error.middleware';

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CROS_URL || 'http://localhost:5173', // Dynamic origin for different environments
    credentials: true, // Enable cookies/headers sharing
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable detailed logging only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/activity', activityRouter);

// Health check route (optional)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('API is healthy');
});

// Error middleware (should always come after other routes/middleware)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

// Custom error handler from middleware
app.use(error);

export default app;
