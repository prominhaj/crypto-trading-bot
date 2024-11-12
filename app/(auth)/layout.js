import Logo from '@/components/globals/logo';
import ThemeToggle from '@/components/globals/Theme-Toggle/Theme-Toggle';

const AuthLayout = ({ children }) => {
    return (
        <div className='container'>
            <div className='flex items-center justify-between py-3'>
                <Logo />
                <ThemeToggle />
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;
