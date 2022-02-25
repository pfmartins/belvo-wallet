
const BASE_URL = 'https://belvo-wallet-challenge-api.herokuapp.com';

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
export {
    api,
    headers
};