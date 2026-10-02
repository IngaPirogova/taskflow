import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthError, loginUser } from "../../redux/authSlice";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector(state => state.auth);

    async function handleSubmit(event) {
        event.preventDefault();
        dispatch(clearAuthError());

        const result = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(result)) {
            navigate("/tasks", { replace: true });
        }
    }

    return (
        <div className="auth-page">
            <p className="auth-eyebrow">РАДЫ ВАС ВИДЕТЬ</p>
            <h2 className="auth-title">С возвращением</h2>
            {location.state?.message && (
                <p className="auth-feedback auth-feedback--success" role="status">
                    {location.state.message}
                </p>
            )}
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    Электронная почта
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Пароль
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </label>
                {error && <p className="auth-feedback" role="alert">{error}</p>}
                <button className="auth-submit" type="submit" disabled={isLoading}>
                    {isLoading ? "Входим..." : "Войти"}
                </button>
            </form>
            <p className="auth-switch">
                Впервые здесь? <Link to="/register">Создать аккаунт</Link>
            </p>
        </div>
    );
}