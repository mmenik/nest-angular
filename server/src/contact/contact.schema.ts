import { Schema } from 'mongoose';

export const ContactSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    photoUrl: {
        type: String
    },
    email: {
        type: String
    }
});
