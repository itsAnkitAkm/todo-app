import { Request } from 'express';
import nodemailer from "nodemailer";

// In-memory store for OTPs (replace with your database or caching solution in production)
const otpStore: { [email: string]: string } = {};

export const otpGenerator = () => {
    // Generate a 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); 
};


// Function to send OTP via email (as you have implemented in your application)
export const sendOTP = async (email: string, otp: string) => {
    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465, // Ensure port is parsed as an integer
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Setup email data
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is ${otp}`,
        };

        otpStore[email] = otp;

        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send OTP via email");
    }
};

// Function to verify OTP
export const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    const storedOtp = otpStore[email];

    if (!storedOtp) {
        return false; 
    }

    // Compare the stored OTP with the OTP entered by the user
    if (storedOtp === otp) {
        delete otpStore[email]; 
        return true; // OTP is valid
    }

    return false; // Invalid OTP
};
