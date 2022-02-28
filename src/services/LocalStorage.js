const __storage = localStorage;
const USER_KEY = 'bw_user';
const LAST_TRANSACTIONS_KEY = 'bw_transactions_';

const get = (key) => {
    if (!__storage.getItem(key)) return;
    return JSON.parse(__storage.getItem(key));
}

const remove = (key) => {
    return __storage.removeItem(key);
}

const set = (key, value) => {
    if (!key) return;
    __storage.setItem(key, JSON.stringify(value));
}

const LocalStorage = {
    get,
    set,
    remove,
    USER_KEY,
    LAST_TRANSACTIONS_KEY
}

export default LocalStorage;