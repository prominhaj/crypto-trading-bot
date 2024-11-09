"use client";
import { dark } from '@clerk/themes';
import { ClerkProvider as NextClerkProvider } from '@clerk/nextjs';

const ClerkProvider = ({ children }) => {

    return (
        <NextClerkProvider appearance={{ baseTheme: dark }}>
            {children}
        </NextClerkProvider>
    );
};

export default ClerkProvider;