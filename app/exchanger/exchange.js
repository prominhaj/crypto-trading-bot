import { getBybitSymbols } from './bybit';

export const getSymbols = async (exchange) => {
    try {
        if (exchange === 'bybit') {
            const symbols = await getBybitSymbols();
            return symbols;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
