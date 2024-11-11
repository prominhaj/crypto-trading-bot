'use server';

import { LoginFormSchema, SignupFormSchema } from '@/lib/definitions';
import { createSession, deleteSession } from '@/lib/session';
import User from '@/modals/user-modal';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/queries/user';

export async function signup(state, formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { name, email, password } = validatedFields.data;

    // Check if user already exists
    const userExists = await User.exists({ email });
    if (userExists) {
        const errors = {
            email: ['Email is already exists']
        };

        return { errors };
    }

    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store other user details in DataBase
    const createdUser = await User.create({ name, email, password: hashedPassword });

    // Create a session for the user
    await createSession(createdUser?._id.toString());

    redirect('/dashboard');
}

export const signIn = async (state, formData) => {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user) {
        const errors = {
            email: ['Email is not valid']
        };
        return { errors };
    }

    // Check Password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        const errors = {
            password: ['Password is not Invalid']
        };
        return { errors };
    }

    // Create a session for the user
    await createSession(user?.id);

    redirect(`/dashboard`);
};

export const logout = async () => {
    deleteSession();
    redirect('/login');
};
