import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.middleware.ts';
import { createActivity, getActivity, changeStatus, deleteActivity } from '../controller/activity.controller.ts';

const activityRouter = express.Router();

// Authentication middleware
activityRouter.use(isAuthenticatedUser);

// Routes
activityRouter.route('/')
    .post(createActivity);

activityRouter.route('/:id')
    .get(getActivity)
    .patch(changeStatus)
    .delete(deleteActivity);

export default activityRouter;
