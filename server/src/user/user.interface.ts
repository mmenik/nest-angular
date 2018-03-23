import { Document } from 'mongoose';

export interface IUser extends Document {
    username?: string;
    admin?: boolean;
    password?: string;
    firstname?: string;
    lastname?: string;
}
