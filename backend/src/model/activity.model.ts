import mongoose, { Schema } from 'mongoose';
import { TActivity } from '../types/activity';

const activitySchema = new Schema<TActivity>({
    name: {
        type: String,
        required: [true, 'Activity name is required'],
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'ongoing', 'paused'],
        default: 'pending',
    },
    totalActiveDuration: {
        type: Date,
        default: new Date(0),
    },
    lastResumedAt: {
        type: Date,
        default: new Date(0),
    },
    logs: [
        {
            action: {
                type: String,
                enum: ['pending', 'completed', 'ongoing', 'paused'],
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

export default mongoose.model<TActivity>('Activity', activitySchema);
