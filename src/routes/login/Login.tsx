import { useAuth } from "../../utils/hooks/UseAuth"
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
    const auth = useAuth();
    useEffect(() => {
        auth.login("janitor01", "password");
    });
    return (auth.isAuthenticated ? <Navigate to="/overview" replace /> : <div>Login</div>);
}