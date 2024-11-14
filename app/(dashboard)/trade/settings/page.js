import { getSymbols } from '@/app/exchanger/exchange';
import TradeSettingForm from './_components/TradeSettingForm';
import { getSessionUser } from '@/lib/dal';

const TradeSettingsPage = async () => {
    const sessionUser = await getSessionUser();
    const symbols = await getSymbols(sessionUser?.selectedExchange);

    return (
        <div className='flex items-center justify-center px-5 py-5'>
            <TradeSettingForm symbols={symbols} sessionUser={sessionUser} />
        </div>
    );
};

export default TradeSettingsPage;
