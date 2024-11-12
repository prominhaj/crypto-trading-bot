import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/Provider/ThemeProvider';
import { dbConnect } from '@/lib/db-connect';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Crypto Trading Bot',
    description: 'Crypto Trading Bot'
};

export default async function RootLayout({ children }) {
    // Connect DB
    await dbConnect();

    return (
        <html lang='en' suppressHydrationWarning>
            <body>
                <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
