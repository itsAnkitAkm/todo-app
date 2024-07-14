import mongoose from "mongoose";
export type TUser = {
    _id: string,
    name: string;
    email: string;
    password: string;
    activity: mongoose.Types.ObjectId[];
    createJWT: () => string;
    comparePassword: (givenPassword: string) => Promise<boolean>;
    createdAt?: Date;
    updatedAt?: Date;
} & mongoose.Document;