
import LocalStorage from './LocalStorage';

const BASE_URL = 'https://belvo-wallet-challenge-api.herokuapp.com';

const trendingCoins = [
    { name: 'BTC (bitcoin)', currentValue: 44221.00, statusLast24Hours: '+15' },
    { name: 'MATIC (Polygon)', currentValue: 1.79, statusLast24Hours: '+9.94' },
    { name: 'JST (JUST)', currentValue: 0.005081, statusLast24Hours: '+2.5' },
    { name: 'KDA (Kadena)', currentValue: 8.48, statusLast24Hours: '+23' },
]

const assets = [
    { name: 'BTC', currentValue: 44223, amount: 14 },
    { name: 'ETH', currentValue: 24.3, amount: 24.3 },
    { name: 'ADA', currentValue: 64.8, amount: 64.8 },
    { name: 'SOL', currentValue: 16.3, amount: 16.3 },
    { name: 'SHIB', currentValue: 1332389, amount: 1332389 },
    { name: 'MANA', currentValue: 24.3, amount: 77 },
]

const contactList = [
    { uuid: 'c648d64a-11cc-442f-b63e-3ff0e68f97ea', name: 'Paulo Martins' },
    { uuid: '654aa5c0-86c7-4c14-9d4e-b49788fc75cd', name: 'Marcos Tito' },
    { uuid: '5c83c9a6-b3f5-482b-a6e0-1908360dbb84', name: 'Roger Oliveira' }
]

const headers = new Headers({ 'Content-Type': 'application/json' });
const config = {
    method: 'POST',
    body: {},
    headers
}

const api = (path, data) => {
    const apiPath = `${BASE_URL}${path}`;
    const jsonData = JSON.stringify(data);
    const apiConfig = { ...config, body: jsonData };

    return fetch(apiPath, apiConfig).then((response) => response.json());
}

const getAssets = () => {
    return assets;
}

const getTrendingAssets = () => {
    return trendingCoins;
}

const getLastTransactions = (userKey) => {
    if (!userKey) return [];

    const localTransactionKey = `${LocalStorage.LAST_TRANSACTIONS_KEY}${userKey}`;
    return LocalStorage.get(localTransactionKey) || [];
}

const getContacts = () => {
    return contactList;
}

const updateLastTransactions = (data) => {
    if (!data) return;

    const userHash = data.from;
    const userDataKey = `${LocalStorage.LAST_TRANSACTIONS_KEY}${userHash}`;
    const transactions = LocalStorage.get(userDataKey) || [];

    transactions.unshift(data);
    LocalStorage.set(userDataKey, transactions);
}

export {
    api,
    headers,
    getAssets,
    getContacts,
    getLastTransactions,
    getTrendingAssets,
    updateLastTransactions
};