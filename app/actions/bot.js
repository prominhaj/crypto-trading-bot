'use server';

import { getSessionUser } from '@/lib/dal';
import User from '@/modals/user-modal';
import { revalidatePath } from 'next/cache';

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
