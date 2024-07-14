import mongoose from "mongoose"; 

export type TActivity = {
    _id: string,
    name: string;
    user: mongoose.Types.ObjectId;
    status: "pending" | "completed" | "ongoing" | "paused";
    totalActiveDuration: Date;
    lastResumedAt: Date;
    logs: {
        action: "pending" | "completed" | "ongoing" | "paused";
        timestamp: Date;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
} & mongoose.Document;