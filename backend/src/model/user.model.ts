import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
import { TUser } from '../types/user';
import Activity from './activity.model';

dotenv.config();



const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    activity: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity',
        },
    ],
}, { timestamps: true });

userSchema.pre<TUser>('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined.');
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

userSchema.methods.comparePassword = async function (givenPassword: string) {
    const isMatch = await bcrypt.compare(givenPassword, this.password);
    return isMatch;
};

const User = mongoose.model<TUser>('User', userSchema);

export default User;
