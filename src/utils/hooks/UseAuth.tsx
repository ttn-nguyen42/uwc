import React, { useEffect } from "react";
import { Account, Accounts } from "../../account";

const LS_LOGIN_STATE = "login_state";
const LS_LOGGED_USERNAME = "login_username";

const authContext = React.createContext<AuthStatus | undefined>(undefined);

interface AuthStatus {
    isAuthenticated: boolean,
    userAccount: Account | undefined,
    login: (username: string, password: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: JSX.Element | JSX.Element[] | null;
}

export function useAuth(): AuthStatus {
    const [isAuthenticated, setAuthenticationStatus] = React.useState(false);
    const [userAccount, setAccount] = React.useState<Account | undefined>(undefined);

    useEffect(() => {
        const hasLoggedIn: string | null = localStorage.getItem(LS_LOGIN_STATE);

        if (hasLoggedIn === "false" || hasLoggedIn === null) {
            setAuthenticationStatus(false);
            setAccount(undefined);
        }
        if (hasLoggedIn === "true") {
            setAuthenticationStatus(true);
            const username: string | null = localStorage.getItem(LS_LOGGED_USERNAME);
            const result: Account | undefined = Accounts.find((account: Account): boolean => (account.username === username));
            setAccount(result);
        }
    }, []);

    return {
        isAuthenticated,
        userAccount,
        login(username: string, password: string) {
            const result: Account | undefined = Accounts.find((account: Account): boolean => (account.username === username) && (account.password === password));
            if (result === undefined) {
                setAuthenticationStatus(false);
                setAccount(undefined);
                localStorage.setItem(LS_LOGIN_STATE, "false");
                localStorage.removeItem(LS_LOGGED_USERNAME);
                return;
            }
            setAuthenticationStatus(true);
            setAccount(result);
            localStorage.setItem(LS_LOGIN_STATE, "true");
            localStorage.setItem(LS_LOGGED_USERNAME, result.username);
        },
        logout() {
            if (isAuthenticated) {
                setAuthenticationStatus(false);
                setAccount(undefined);
                localStorage.setItem(LS_LOGIN_STATE, "false");
                localStorage.removeItem(LS_LOGGED_USERNAME);
            }
        },

    };
}

export function AuthProvider({ children }: AuthProviderProps) {
    const auth: AuthStatus = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}