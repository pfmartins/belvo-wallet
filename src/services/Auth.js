import { api } from './Api';
import LocalStorage from './LocalStorage';

const loggedUser = {
    isAuthenticated: false
}

const signIn = (username, password) => {
    const path = '/login';
    const data = {
        username: username,
        password: password
    }

    return api(path, data).then((item) => item).catch((error) => error);
}

const signOut = () => {
    loggedUser.isAuthenticated = false;
    LocalStorage.remove(LocalStorage.USER_KEY);
}

export {
    signIn,
    signOut
};