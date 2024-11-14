'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useActionState } from 'react';
import { signup } from '@/app/actions/auth';
import SubmitButton from '@/components/globals/Buttons/submit-button';
import FormControl from '@/components/globals/FormControl/FormControl';

const RegisterForm = () => {
    const [state, action] = useActionState(signup, undefined);

    return (
        <Card className="w-full max-w-md p-5 md:p-8 rounded-xl bg-muted/50">
            <h1 className="mb-8 text-3xl font-bold text-center">Register</h1>
            <form action={action} className="space-y-6">
                <FormControl name="name" label="Name" error={state?.errors?.name} />
                <FormControl name="email" label="Email" error={state?.errors?.email} />
                <FormControl type='password' name="password" label="Password" error={state?.errors?.password} />
                <FormControl type='password' name="confirmPassword" label="Confirm Password" error={state?.errors?.confirmPassword} />
                <SubmitButton>
                    Sign Up
                </SubmitButton>
                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </Card>
    )
};

export default RegisterForm;
