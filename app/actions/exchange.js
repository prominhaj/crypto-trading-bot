'use server';

import { getSessionUser } from '@/lib/dal';
import { ExchangeFormSchema } from '@/lib/definitions';
import User from '@/modals/user-modal';
import { redirect } from 'next/navigation';

export const connectExchange = async (state, formData) => {
    const sessionUser = await getSessionUser();

    // Validate form fields
    const validatedFields = ExchangeFormSchema.safeParse({
        name: formData.get('name'),
        apiKey: formData.get('api_key'),
        apiSecret: formData.get('api_secret')
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { name, apiKey, apiSecret } = validatedFields.data;

    await User.findByIdAndUpdate(sessionUser?.id, {
        $push: {
            exchanges: {
                name,
                apiKey,
                apiSecret,
                selected: true
            }
        }
    });

    redirect('/dashboard');
};
