"use client";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ children, className, variant, size, ...props }) => {
    const { pending } = useFormStatus();

    return (
        <Button variant={variant} size={size} disabled={pending} type="submit" className={cn(className, "w-full")} {...props}>
            {pending ? (
                <>
                    <Loader2 className="animate-spin" />
                    Please wait...
                </>
            ) : children}
        </Button>
    )
};

export default SubmitButton;