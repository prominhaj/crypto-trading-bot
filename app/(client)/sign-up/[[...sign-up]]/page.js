import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className='flex items-center justify-center py-3 md:py-5'>
            <ClerkLoading>
                <h4 className='text-3xl text-center'>LOADING...</h4>
            </ClerkLoading>
            <ClerkLoaded>
                <SignUp />
            </ClerkLoaded>
        </div>
    );
}
