import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.model.ts';
import ErrorHandler from '../lib/errorHandler.ts';
import asyncHandler from '../lib/asyncHandler.ts';
import { TUser } from '../types/user';

dotenv.config();

interface CustomJwtPayload extends JwtPayload {
    id: string;
    accessToken: string;
}

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: TUser;
        }
    }
}

export const isAuthenticatedUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Authorization failed: Please log in to access this service", 401));
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined.");
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
        console.log(decodedData);

        const user = await User.findOne({ _id: decodedData.id });

        if (!user) {
            return next(new ErrorHandler("Authorization failed: User not found", 401));
        }

        req.user = user as TUser;
        next();
    } catch (error) {
        return next(new ErrorHandler("Authorization failed: Invalid token", 401));
    }
});
