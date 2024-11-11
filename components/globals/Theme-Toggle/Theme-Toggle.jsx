'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="bg-background/50 backdrop-blur-sm"
        >
            <Sun className="transition-all scale-100 rotate-0 !w-6 !h-6 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute transition-all scale-0 rotate-90 !w-6 !h-6 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}