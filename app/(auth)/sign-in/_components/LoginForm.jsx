"use client";
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useActionState } from 'react';
import { signIn } from '@/app/actions/auth';
import FormControl from '@/components/globals/FormControl/FormControl';
import SubmitButton from '@/components/globals/Buttons/submit-button';

const LoginForm = () => {
    const [state, action] = useActionState(signIn, undefined);

    return (
        <Card className="w-full p-5 md:max-w-md md:p-8 rounded-xl bg-muted/50">
            <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>
            <form action={action} className="space-y-6">
                <FormControl name="email" label="Email" error={state?.errors?.email} />
                <FormControl name="password" label="Password" error={state?.errors?.password} />
                <SubmitButton>
                    Login
                </SubmitButton>
                <p className="text-sm text-center">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </Card>
    );
};

export default LoginForm;