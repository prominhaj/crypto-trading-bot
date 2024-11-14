import { symbolsDataFormat } from '@/lib/convertData';

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
    testnet: false
});

export const getBybitSymbols = async () => {
    const { result } = await client.getInstrumentsInfo({
        category: 'spot'
    });
    return symbolsDataFormat(result?.list);
};
