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

export const getBybitTradeHistory = async () => {
    try {
        const { apiKey, apiSecret } = await getBybitApiKeyAndSecret();

        // Fetch the current server time

        // Set up the date range (last 2 years to now)
        const currentTimestamp = Date.now();
        const twoYearsAgoTimestamp = currentTimestamp - 2 * 365 * 24 * 60 * 60 * 1000;

        // Time range for each request (7 days in milliseconds)
        const sevenDays = 7 * 24 * 60 * 60 * 1000;

        let startTime = twoYearsAgoTimestamp;
        let endTime = startTime + sevenDays;
        let allTrades = []; // Array to store all trade history

        while (startTime < currentTimestamp) {
            let cursor = null; // To handle pagination

            do {
                const serverTime = await getServerTime();
                const params = {
                    category: 'spot', // Adjust for derivatives if needed
                    api_key: apiKey,
                    timestamp: serverTime, // Synced server time
                    startTime,
                    endTime,
                    recv_window: 20000, // Increased to 20 seconds
                    ...(cursor ? { cursor } : {})
                };

                // Create signature
                const signature = createSignature(params, apiSecret);
                params.sign = signature;

                // Convert params to query string
                const queryString = new URLSearchParams(params).toString();

                // Make the request
                const tradeResponse = await fetch(`${BASE_URL}/v5/execution/list?${queryString}`);
                const tradeData = await tradeResponse.json();

                if (tradeData?.retCode !== 0) {
                    throw new Error(tradeData.retMsg || 'Failed to fetch trade history');
                }

                // Append the results to allTrades
                const trades = tradeData?.result?.list || [];
                allTrades = allTrades.concat(trades);

                console.log(
                    `Fetched ${trades.length} trades from ${new Date(startTime)} to ${new Date(
                        endTime
                    )}`
                );

                // Update the cursor for the next page
                cursor = tradeData?.result?.nextCursor;
            } while (cursor); // Continue fetching paginated results for the current time range

            // Move to the next 7-day range
            startTime = endTime;
            endTime = startTime + sevenDays;
        }

        console.log(`Total trades fetched: ${allTrades.length}`);
        return allTrades;
    } catch (error) {
        console.error('Error fetching trade history:', error.message);
    }
};

export const getWalletBalance = async (coin) => {
    try {
        const serverTime = await getServerTime();
        const params = {
            accountType: 'UNIFIED',
            coin: coin || '',
            api_key: API_KEY,
            timestamp: serverTime,
            recv_window: 10000
        };

        const signature = createSignature(params, API_SECRET);
        const url = `${BASE_URL}/v5/account/wallet-balance?${new URLSearchParams(
            params
        ).toString()}&sign=${signature}`;

        const response = await fetch(url);
        const { result } = await response.json();
        return result?.list?.[0]?.coin;
    } catch (error) {
        console.error('Error fetching wallet balance:', error.message);
    }
};
