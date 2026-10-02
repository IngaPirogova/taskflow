import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

export default function UserMenu({ onNavigate }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    function handleLogout() {
        localStorage.removeItem("token");
        dispatch(logout());
        onNavigate?.();
        navigate("/login", { replace: true });
    }

    if (!user) {
        return null;
    }

    return (
        <div className="user-menu">
            <span>{user.name}</span>
            <button type="button" onClick={handleLogout}>
                Выйти
            </button>
        </div>
    );
}