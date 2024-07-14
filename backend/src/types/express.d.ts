

import { Session } from 'express-session';
import { User } from './types';
import{otp} from './types' // Import your User type definition

declare module 'express' {
    interface Request {
        session: Session & Partial<SessionData> & { user: User } & {user: otp}; // Customize as per your session configuration
    }
}
