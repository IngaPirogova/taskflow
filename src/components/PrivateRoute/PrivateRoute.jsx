import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading } = useSelector(state => state.auth);

    if (isLoading) {
        return <p role="status">Проверяем авторизацию...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}