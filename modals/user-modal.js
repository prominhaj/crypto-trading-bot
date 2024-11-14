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
        tradeSettings: {
            symbol: {
                type: String,
                required: false,
                default: 'ETHUSDT'
            },
            interval: {
                type: Number,
                required: false,
                default: 5
            },
            sl_percentage: {
                type: Number,
                required: false,
                default: 1
            },
            tp_percentage: {
                type: Number,
                required: false,
                default: 0
            },
            sl_tp_order_type: {
                type: String,
                required: false,
                default: 'limit'
            }
        },
        selectedExchange: {
            type: String,
            required: false,
            default: 'bybit'
        },
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
