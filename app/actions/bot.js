'use server';

import { getSessionUser } from '@/lib/dal';
import { TradeSettingsFormSchema } from '@/lib/definitions';
import User from '@/modals/user-modal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const changeBotStatus = async (isBotAction) => {
    const sessionUser = await getSessionUser();

    await User.findOneAndUpdate(
        { _id: sessionUser?.id },
        { $set: { isBotActive: !isBotAction } },
        { new: true }
    ).lean();

    revalidatePath('/');

    return !isBotAction;
};

export const tradeSettings = async (state, formData) => {
    const sessionUser = await getSessionUser();

    // Validate form fields
    const validatedFields = TradeSettingsFormSchema.safeParse({
        symbol: formData.get('symbol'),
        interval: parseInt(formData.get('interval')),
        sl_percentage: parseFloat(formData.get('sl_percentage')),
        tp_percentage: parseFloat(formData.get('tp_percentage')),
        sl_tp_order_type: formData.get('sl_tp_order_type'),
        sl_limit_price_distance: parseFloat(formData.get('sl_limit_price_distance'))
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const {
        symbol,
        interval,
        sl_percentage,
        tp_percentage,
        sl_tp_order_type,
        sl_limit_price_distance
    } = validatedFields.data;

    // Update Database
    await User.findByIdAndUpdate(
        { _id: sessionUser?.id },
        {
            $set: {
                tradeSettings: {
                    symbol,
                    interval,
                    sl_percentage,
                    tp_percentage,
                    sl_tp_order_type,
                    sl_limit_price_distance
                }
            }
        },
        { new: true }
    ).lean();

    revalidatePath('/');

    redirect('/dashboard');
};
