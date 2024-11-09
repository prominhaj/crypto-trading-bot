import './globals.css';
import { Inter } from 'next/font/google';
import ClerkProvider from '@/Provider/ClerkProvider';
import { ThemeProvider } from '@/Provider/ThemeProvider';
import { dbConnect } from '@/lib/db-connect';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Crypto Trading Bot',
    description: 'Crypto Trading Bot'
};

export default async function RootLayout({ children }) {
    // Connect DB
    await dbConnect();

    return (
        <ClerkProvider>
            <html lang='en' suppressHydrationWarning>
                <body>
                    <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
