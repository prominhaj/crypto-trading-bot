import ThemeToggle from '@/components/globals/Theme-Toggle/Theme-Toggle';

const AuthLayout = ({ children }) => {
    return (
        <div className='container'>
            <div className='flex items-center justify-end py-3'>
                <ThemeToggle />
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;
