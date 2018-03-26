import { Document } from 'mongoose';

export interface User extends Document {
    username?: string;
    admin?: boolean;
    password?: string;
    firstname?: string;
    lastname?: string;
}
