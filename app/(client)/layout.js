import Header from '@/components/globals/Header/Header';

const ClientLayout = ({ children }) => {
    return (
        <main className='container'>
            <Header />
            {children}
        </main>
    );
};

export default ClientLayout;
