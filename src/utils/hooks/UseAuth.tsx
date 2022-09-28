import React from "react";
import { Account, Accounts } from "../../account";

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

    return {
        isAuthenticated,
        userAccount,
        login(username: string, password: string) {
            const result: Account | undefined = Accounts.find((account: Account): boolean => (account.username === username) && (account.password === password));
            if (result === undefined) {
                setAuthenticationStatus(false);
                setAccount(undefined);
                return;
            }
            setAuthenticationStatus(true);
            setAccount(result);
        },
        logout() {
            if (isAuthenticated) {
                setAuthenticationStatus(false);
                setAccount(undefined);
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