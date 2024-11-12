import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getSessionUser } from '@/lib/dal';
import { AppSidebar } from './components/app-sidebar';
import BreadcrumbPath from '@/components/globals/Breadcrumb/Breadcrumb';
import ThemeToggle from '@/components/globals/Theme-Toggle/Theme-Toggle';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard page for your application'
};

export default async function DashboardLayout({ children }) {
    const sessionUser = await getSessionUser();

    if (!sessionUser?.exchanges?.length > 0) {
        redirect('/exchange-info');
    }

    return (
        <SidebarProvider>
            <AppSidebar sessionUser={sessionUser} />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between px-4'>
                    <div className='flex items-center gap-2'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='h-4 mr-2' />
                        <BreadcrumbPath />
                    </div>
                    <ThemeToggle />
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
