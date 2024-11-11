import Header from '@/components/globals/Header/Header';

const ClientLayout = ({ children }) => {
    return (
        <main>
            <div className='container'>
                <Header />
            </div>
            {children}
        </main>
    );
};

export default ClientLayout;
