import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/user.route.ts';
import activityRouter from './routes/activity.route.ts';
import error from './middleware/error.middleware.ts';



const app= express();

app.use(cors({ origin: process.env.CROS_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/activity", activityRouter);

// error middleware
app.use(error);

export {app}