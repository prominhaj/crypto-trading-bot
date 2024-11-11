"use client";
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {

    };

    return (
        <Card className="w-full p-5 md:max-w-md md:p-8">
            <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>
            <form action={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
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