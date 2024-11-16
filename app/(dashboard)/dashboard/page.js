import { getBybitTradeHistory } from '@/app/exchanger/bybit';
import DashboardAreaChart from '../components/AreaChart/Chart';
import AnalyticCard from './_components/AnalyticCard';

export default async function DashboardPage() {
    const tradeHistory = await getBybitTradeHistory();
    console.log({ tradeHistory });

    return (
        <div>
            <div className='flex flex-col flex-1 gap-4 p-4 pt-0'>
                <div className='grid gap-4 md:grid-cols-3'>
                    <AnalyticCard label='Today P/L' value='+$30' />
                    <AnalyticCard label='Monthly P/L' value='+$2,300' />
                    <AnalyticCard label='Total P/L' value='+$10000' />
                </div>
                <DashboardAreaChart />
            </div>
        </div>
    );
}
