import { createContext, useContext, useState, useEffect } from 'react';

import * as auth from '../Auth';
import LocalStorage from '../LocalStorage';
import { headers } from '../Api';

const authContextData = {
    signed: false,
    user: {}
}

const AuthContext = createContext(authContextData);

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Hook useAuth must be used within an AuthProvider');
    }

    return context;
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function signIn(username, password) {
        const response = await auth.signIn(username, password);

        if (response.access_token) {
            setUser({ username, password, token: response.access_token });
            LocalStorage.set(LocalStorage.USER_KEY, { username, token: response.access_token });
            authContextData.user = user;
            authContextData.signed = true;
        }

        return response;
    }

    async function signOut() {
        authContextData.user = {};
        authContextData.signed = false;

        auth.signOut();
        setUser(null);
    }

    async function loadStorageData() {
        const storagedUser = LocalStorage.get(LocalStorage.USER_KEY);

        if (storagedUser) {
            setUser(storagedUser);
            headers.set('Authorization', `Baerer ${storagedUser.token}`);
        }
    }

    const valueProvided = { signed: !!user, user, signIn, signOut }

    useEffect(() => {
        loadStorageData();
    }, []);

    return (
        <AuthContext.Provider value={valueProvided}>
            {children}
        </AuthContext.Provider>
    )
};

export {
    useAuth,
    AuthProvider
}

export default AuthContext;