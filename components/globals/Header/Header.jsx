import Link from "next/link";
import Logo from "../logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Header = () => {
    return (
        <nav className="flex items-center justify-between py-2">
            <div className="flex items-center">
                <Logo />
                <h1 className="hidden md:block text-transparent gradient-text bg-gradient-to-b from-white to-gray-400 bg-clip-text font-extrabold  p-3 relative text-[max(24px,min(4vw,24px))] leading-none tracking-[-0.03em]">
                    Crypto Trading Bot
                </h1>
            </div>
            <div className="flex items-center gap-2">
                <Link className={cn(buttonVariants({ variant: "default", size: "sm" }))} href="/sign-in">Sign In</Link>
                <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} href="/sign-up">Get Started</Link>
            </div>
        </nav>
    );
};

export default Header;