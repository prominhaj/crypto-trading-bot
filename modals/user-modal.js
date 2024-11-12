import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: false
        },
        exchanges: [
            {
                type: Array,
                required: false,
                default: []
            }
        ],
        isBotActive: {
            type: Boolean,
            required: false,
            default: false
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
