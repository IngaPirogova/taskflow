import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthError, registerUser } from "../../redux/authSlice";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector(state => state.auth);

    async function handleSubmit(event) {
        event.preventDefault();
        dispatch(clearAuthError());

        const result = await dispatch(registerUser({ name, email, password }));

        if (registerUser.fulfilled.match(result)) {
            navigate("/login", {
                replace: true,
                state: { message: "Аккаунт создан. Теперь войдите." },
            });
        }
    }

    return (
        <div className="auth-page">
            <p className="auth-eyebrow">НОВЫЙ АККАУНТ</p>
            <h2 className="auth-title">Создать аккаунт</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    Имя
                    <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        required
                    />
                </label>
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
                        autoComplete="new-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </label>
                {error && <p className="auth-feedback" role="alert">{error}</p>}
                <button className="auth-submit" type="submit" disabled={isLoading}>
                    {isLoading ? "Создаём..." : "Создать аккаунт"}
                </button>
            </form>
            <p className="auth-switch">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
}