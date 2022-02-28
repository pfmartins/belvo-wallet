
const BASE_URL = 'https://belvo-wallet-challenge-api.herokuapp.com';

const trendingCoins = [
    { name: 'BTC (bitcoin)', currentValue: 44221.00, statusLast24Hours: '+15' },
    { name: 'MATIC (Polygon)', currentValue: 1.79, statusLast24Hours: '+9.94' },
    { name: 'JST (JUST)', currentValue: 0.005081, statusLast24Hours: '+2.5' },
    { name: 'KDA (Kadena)', currentValue: 8.48, statusLast24Hours: '+23' },
]

const lastTransactions = [
    { id: 123123123, to: 'Norma Oliveira dos Santos', type: 'Sent', asset: 'ETH', totalValue: 4800 },
    { id: 567657, to: 'Isabelle Marques', type: 'Receive', asset: 'BTC', totalValue: 1223 },
    { id: 5345123, to: 'Carlos Macedo', type: 'Send', asset: 'SHIBA', totalValue: 478 },
    { id: 12365456, to: 'Roger Oliveira', type: 'Receive', asset: 'DOGE', totalValue: 2490 },
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
    {
        uuid: '23423423234',
        name: 'Paulo Martins',
    },
    {
        uuid: '21223423234',
        name: 'Marcos Tito',
    },
    {
        uuid: '566523423234',
        name: 'Roger Oliveira',
    }
]

const headers = new Headers({
    'Content-Type': 'application/json'
});

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

const getLastTransactions = () => {
    return lastTransactions;
}

const getContacts = () => {
    return contactList;
}

export {
    api,
    headers,
    getAssets,
    getLastTransactions,
    getTrendingAssets,
    getContacts
};