import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: false,
            default: ''
        },
        lastName: {
            type: String,
            required: false,
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        photo_url: {
            type: String,
            required: false,
            default: ''
        },
        password: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        }
    },
    { timestamps: true }
);

const User = mongoose?.models?.User ?? mongoose.model('User', userSchema);

export default User;
