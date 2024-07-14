import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async (url: string): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Unable to connect to MongoDB");
    }
};

export default connectDB;
