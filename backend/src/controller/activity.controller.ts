import catchAsyncError from "../lib/asyncHandler";
import ErrorHandler from "../lib/errorHandler";
import Activity from "../model/activity.model";



export const createActivity = catchAsyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Authentication failed. Please log in.", 401));
    }

    const { name } = req.body;
    if (!name) {
        return next(new ErrorHandler("Please provide a name for the activity.", 400));
    }

    const logs = [{
        action: "pending",
        timestamp: new Date(),
    }];

    const activity = await Activity.create({ name, user: req.user._id, logs });

    res.status(201).json({
        success: true,
        activity,
    });
});

export const changeStatus = catchAsyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Authentication failed. Please log in.", 401));
    }

    const { status } = req.body;
    const { id: activityId } = req.params;

    if (!status) {
        return next(new ErrorHandler("Please provide a status for the activity.", 400));
    }

    const activity = await Activity.findById(activityId);

    if (!activity) {
        return next(new ErrorHandler("Activity not found.", 404));
    }

    if (status === "paused" || status === "completed") {
        if (activity.status !== "ongoing") {
            return next(new ErrorHandler("You can only pause or complete an ongoing activity.", 400));
        }
        const lastResumedAt = new Date(activity.lastResumedAt).getTime();
        const duration = Date.now() - lastResumedAt;
        activity.totalActiveDuration.setTime(activity.totalActiveDuration.getTime() + duration);
    }

    if (status === "ongoing") {
        const existingActivity = await Activity.findOne({ user: req.user._id, status: "ongoing" });
        if (existingActivity) {
            return next(new ErrorHandler("Please pause or complete the current ongoing activity.", 400));
        }
        activity.lastResumedAt = new Date();
    }

    activity.status = status;
    activity.logs.push({ action: status, timestamp: new Date() });

    const updatedActivity = await activity.save();

    res.status(200).json({
        success: true,
        activity: updatedActivity,
    });
});

export const getActivity = catchAsyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Authentication failed. Please log in.", 401));
    }

    const { id: activityId } = req.params;
    const activity = await Activity.findById(activityId);

    if (!activity) {
        return next(new ErrorHandler("Activity not found.", 404));
    }

    res.status(200).json({
        success: true,
        activity,
    });
});

export const deleteActivity = catchAsyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Authentication failed. Please log in.", 401));
    }

    const { id: activityId } = req.params;
    await Activity.findByIdAndDelete(activityId);

    res.status(200).json({
        success: true,
        message: "Activity deleted successfully.",
    });
});



