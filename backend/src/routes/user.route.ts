import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.middleware.ts';
//import { verifyOtp } from '../middleware/otp.middleware.ts';
import { signUpUser, loginUser, logoutUser, currentUser, getUserActivities } from '../controller/user.controller.ts';

const userRouter = express.Router();

// Authentication routes
userRouter.post('/auth/signup', signUpUser); // Route with OTP verification middleware
userRouter.post('/auth/login', loginUser);
userRouter.get('/auth/logout', logoutUser);

// User routes
userRouter.get('/me', isAuthenticatedUser, currentUser);
userRouter.get('/activity/:id', isAuthenticatedUser, getUserActivities);

// // Password management routes
// userRouter.post('/auth/forgot-password', forgotPassword); // Initiates password reset process
// userRouter.post('/auth/reset-password', resetPassword); // Resets password after OTP verification



export default userRouter;
