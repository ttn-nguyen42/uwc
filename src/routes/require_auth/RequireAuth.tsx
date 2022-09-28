import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/hooks/UseAuth";

export default function RequireAuth({ children }: RequireAuthProps) {
    const { isAuthenticated } = useAuth();
    return (isAuthenticated === true) ? children : <Navigate to="/login" replace />;
}

interface RequireAuthProps {
    children: JSX.Element;
}
