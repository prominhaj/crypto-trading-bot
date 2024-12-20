export const replaceMongoIdInArray = (array = []) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Expected an array');
    }

    return array.map((item) => {
        const { _id, ...rest } = item;
        return {
            id: _id.toString(),
            ...rest
        };
    });
};

export const replaceMongoIdInObject = (obj) => {
    if (!obj) return null;
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj;
};

export const symbolsDataFormat = (symbolsData) => {
    return symbolsData
        .filter((item) => item.quoteCoin === 'USDT' || item.quoteCoin === 'USDC')
        .map((item) => ({
            symbol: item.symbol,
            baseCoin: item.baseCoin,
            quoteCoin: item.quoteCoin
        }));
};
