// import { Request, Response, NextFunction } from 'express';
// import  ErrorHandler  from '../lib/errorHandler.ts';
// import session from 'express-session';

// declare module 'express-session' {
//     export interface SessionData {
//         otp?: { email: string; otp: string; expiresAt: number }; // Define OTP property as an object with email, otp, and expiresAt
//         // Other session properties as needed
//     }
// }

// export const verifyOtp = (req: Request, res: Response, next: NextFunction) => {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//         return next(new ErrorHandler("Please provide email and OTP", 400));
//     }

//     // Set OTP object in session
//     req.session!.otp = {
//         email,
//         otp,
//         expiresAt: Date.now() + (10 * 60 * 1000), // Example: OTP expires in 10 minutes
//     };

//     // Retrieve OTP object from session
//     const storedOtp = req.session!.otp;

//     if (!storedOtp || storedOtp.otp !== otp || storedOtp.expiresAt < Date.now()) {
//         return next(new ErrorHandler("Invalid OTP or OTP expired", 400));
//     }

//     // Clear OTP object from session after verification
//     delete req.session!.otp;

//     // Continue with your logic
//     next();
// };