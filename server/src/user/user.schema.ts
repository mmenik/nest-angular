import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: {
        type: String
    },
    admin: {
        type: Boolean
    },
    password: {
        type: String
    }
});
