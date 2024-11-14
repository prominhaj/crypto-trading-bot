import { z } from 'zod';

export const SignupFormSchema = z
    .object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
        email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
        password: z
            .string()
            .min(8, { message: 'Be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Contain at least one special character.'
            })
            .trim(),
        confirmPassword: z.string().min(8, 'Please confirm your password')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(8, { message: 'Be at least 8 characters long' }).trim()
});

export const ExchangeFormSchema = z.object({
    name: z.string().min(2, 'Exchange Name must be at least 2 characters long.').trim(),
    apiKey: z.string().min(6, 'Be at least 8 characters long').trim(),
    apiSecret: z.string().min(6, 'Be at least 8 characters long').trim()
});

export const TradeSettingsFormSchema = z.object({
    symbol: z.string().min(2, 'Exchange Name must be at least 2 characters long').trim(),
    interval: z.number().positive('Interval must be a positive number'),
    sl_percentage: z.number().min(0, 'SL Percentage must be zero or positive'),
    tp_percentage: z.number().min(0, 'TP Percentage must be zero or positive'),
    sl_tp_order_type: z.string().min(1, 'Order type is required').trim(),
    sl_limit_price_distance: z.number().min(0, 'Limit price distance must be zero or positive')
});
