import { NextResponse } from 'next/server';
import { decrypt } from './lib/session';

const publicRoutes = ['/sign-in', '/sign-up', '/'];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = req.cookies.get('session')?.value;
    const session = await decrypt(cookie);

    if (!isPublicRoute && !session?.userId) {
        return NextResponse.redirect(new URL(`/sign-in?redirectUrl=${path}`, req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL(`/dashboard`, req.nextUrl));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)'
    ]
};
