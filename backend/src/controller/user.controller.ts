import catchAsyncError from "../lib/asyncHandler";
import ErrorHandler from "../lib/errorHandler";
import User from "../model/user.model";
import { sendApiResponse } from "../lib/generateToken";
import Activity from "../model/activity.model";
import bcrypt from 'bcryptjs';
import { otpGenerator, sendOTP } from "../lib/OTP";

export const signUpUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please provide all required information", 400));
    }

    // Generate OTP
    // const otp = otpGenerator();

    // // Save OTP and its expiration in user's session or database for verification
    // // For demonstration, we're assuming saving it in session
    // req.session.otp = {
    //     email,
    //     otp,
    //     expiresAt: Date.now() + 5 * 60 * 1000 // OTP expires in 5 minutes
    // };

    // // Send OTP via email
    // try {
    //     await sendOTP(email, otp);
    // } catch (error) {
    //     console.error("Error sending OTP:", error);
    //     return next(new ErrorHandler("Failed to send OTP via email", 500));
    // }

    // Respond to the client with a success message indicating OTP sent
   
        const user = await User.create({ name, email, password });
    
        // Respond with success message and user data
        sendApiResponse(user, 200, res);
});

// // Actual user creation after OTP verification
// export const createUserAfterVerification = catchAsyncError(async (req, res, next) => {
//     const { name, email, password } = req.body;

//     // Check if email already exists
//     const emailExists = await User.findOne({ email });

//     if (emailExists) {
//         return next(new ErrorHandler("User already exists with this email", 400));
//     }

//     // Create new user
//     const user = await User.create({ name, email, password });

//     // Respond with success message and user data
//     sendApiResponse(user, 200, res);
// });

export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("please provide email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }
    const verifyPassword = await user.comparePassword(password);

    if (!verifyPassword) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }

    sendApiResponse(user, 200, res);
})

export const logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
})

export const currentUser = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("User not found", 401))
    }

    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

export const getUserActivities = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("You are not Authenticated ", 401));
    }
    const { id: userId } = req.params;
    if (!userId || userId !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not Authenticated ", 401));
    };


    const activities = await Activity.find({ user: userId });

    res.status(200).json({
        success: true,
        activities,
    });
}
);

// export const forgotPassword = catchAsyncError(async (req, res, next) => {
//     const { email } = req.body;

//     if (!email) {
//         return next(new ErrorHandler("Please provide your email address.", 400));
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//         return next(new ErrorHandler("User not found.", 404));
//     }

//     // Generate OTP
//     const otp = otpGenerator(); // Replace with your OTP generation logic

//     // Store OTP in memory (you can also store it in database or Redis for persistence)
//     req.session!.otp = otp; // Assuming you are using session-based OTP storage

//     // Send OTP to user via email
//     const message = `Your OTP for password reset is ${otp}`;
//     try {
//         await sendOTP(email, message); // Implement sendOTP function to send email
//         res.status(200).json({ success: true, message: "OTP sent to your email." });
//     } catch (error) {
//         return next(new ErrorHandler("Failed to send OTP. Please try again later.", 500));
//     }
// });

// // Route to verify OTP and reset password
// export const resetPassword = catchAsyncError(async (req, res, next) => {
//     const { email, otp, newPassword } = req.body;

//     if (!email || !otp || !newPassword) {
//         return next(new ErrorHandler("Please provide email, OTP, and new password.", 400));
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//         return next(new ErrorHandler("User not found.", 404));
//     }

//     // Check if OTP matches
//     const storedOTP = req.session!.otp; // Retrieve stored OTP from session (or database/Redis)
//     if (otp !== storedOTP) {
//         return next(new ErrorHandler("Invalid OTP.", 400));
//     }

//     // Update password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     // Clear OTP from session (or database/Redis)
//     req.session!.otp = undefined;

//     res.status(200).json({ success: true, message: "Password reset successful." });
// });
