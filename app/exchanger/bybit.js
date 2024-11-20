import { symbolsDataFormat } from '@/lib/convertData';
import { getSessionUser } from '@/lib/dal';
import crypto from 'crypto';

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
    testnet: false
});

const BASE_URL = 'https://api.bybit.com';

const createSignature = (params, apiSecret) => {
    const sortedParams = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join('&');
    return crypto.createHmac('sha256', apiSecret).update(sortedParams).digest('hex');
};

export const getBybitApiKeyAndSecret = async () => {
    const sessionUser = await getSessionUser();
    const result = sessionUser?.exchanges?.find((exchange) => exchange?.name === 'bybit');
    return {
        apiKey: result?.apiKey,
        apiSecret: result?.apiSecret
    };
};

export const getBybitSymbols = async () => {
    const { result } = await client.getInstrumentsInfo({
        category: 'spot'
    });
    return symbolsDataFormat(result?.list);
};

export const getServerTime = async () => {
    try {
        const response = await fetch(`${BASE_URL}/v5/market/time`);
        const result = await response.json();
        return result?.time;
    } catch (error) {
        console.error('Error fetching server time:', error.message);
    }
};
