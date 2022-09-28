import React, { useEffect } from 'react';
import { Account, Accounts } from '../../account';

const LS_LOGIN_STATE = 'login_state';
const LS_LOGGED_USERNAME = 'login_username';

const authContext = React.createContext();

function useAuth() {
    const [isAuthenticated, setAuthenticationStatus] = React.useState(false);
    const [userAccount, setAccount] = React.useState(undefined);

    useEffect(() => {
        const hasLoggedIn = localStorage.getItem(LS_LOGIN_STATE);

        if (hasLoggedIn === 'false' || hasLoggedIn === null) {
            setAuthenticationStatus(false);
            setAccount(undefined);
        }
        if (hasLoggedIn === 'true') {
            setAuthenticationStatus(true);
            const username = localStorage.getItem(LS_LOGGED_USERNAME);
            const result = Accounts.find(
                (account) => account.username === username
            );
            setAccount(result);
        }
    }, []);

    return {
        isAuthenticated,
        userAccount,
        login(username, password) {
            const result = Accounts.find(
                (account) =>
                    account.username === username &&
                    account.password === password
            );
            if (result === undefined) {
                setAuthenticationStatus(false);
                setAccount(undefined);
                localStorage.setItem(LS_LOGIN_STATE, 'false');
                localStorage.removeItem(LS_LOGGED_USERNAME);
                return;
            }
            setAuthenticationStatus(true);
            setAccount(result);
            localStorage.setItem(LS_LOGIN_STATE, 'true');
            localStorage.setItem(LS_LOGGED_USERNAME, result.username);
        },
        logout() {
            if (isAuthenticated) {
                setAuthenticationStatus(false);
                setAccount(undefined);
                localStorage.setItem(LS_LOGIN_STATE, 'false');
                localStorage.removeItem(LS_LOGGED_USERNAME);
            }
        },
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
