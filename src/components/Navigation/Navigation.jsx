import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation({ onNavigate }) {
    const isAuthenticated = useSelector(
        state => state.auth.isAuthenticated
    );

    return (
        <nav className="auth-navigation" aria-label="Авторизация">
            {!isAuthenticated ? (
                <>
                    <Link to="/login" onClick={onNavigate}>Войти</Link>
                    <Link to="/register" onClick={onNavigate}>Регистрация</Link>
                </>
            ) : (
                <Link to="/tasks" onClick={onNavigate}>Задачи</Link>
            )}
        </nav>
    );
}