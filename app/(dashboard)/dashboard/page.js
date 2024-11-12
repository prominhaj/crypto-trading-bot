import { Card, CardContent } from '@/components/ui/card';
import DashboardAreaChart from '../components/AreaChart/Chart';

export default async function DashboardPage() {
    return (
        <div>
            <div className='flex flex-col flex-1 gap-4 p-4 pt-0'>
                <div className='grid gap-4 md:grid-cols-3'>
                    <Card className='rounded-xl bg-muted/50'>
                        <CardContent className='pt-5'>
                            <h3 className='mb-2 text-lg font-medium'>Today P/L</h3>
                            <p className='text-3xl font-bold text-green-500'>+$30</p>
                        </CardContent>
                    </Card>
                    <Card className='rounded-xl bg-muted/50'>
                        <CardContent className='pt-5'>
                            <h3 className='mb-2 text-lg font-medium'>Monthly P/L</h3>
                            <p className='text-3xl font-bold text-green-500'>+$2,300</p>
                        </CardContent>
                    </Card>
                    <Card className='rounded-xl bg-muted/50'>
                        <CardContent className='pt-5'>
                            <h3 className='mb-2 text-lg font-medium'>Total P/L</h3>
                            <p className='text-3xl font-bold text-green-500'>+$2,300</p>
                        </CardContent>
                    </Card>
                </div>
                <DashboardAreaChart />
            </div>
        </div>
    );
}
