import { NavLink } from "react-router-dom";

function Sidebar({ onNavigate }) {
  return (
    <aside>
      <nav>
        <NavLink to="/" end onClick={onNavigate}>Главная</NavLink>
        <NavLink to="/tasks" onClick={onNavigate}>Задачи</NavLink>
        <NavLink to="/about" onClick={onNavigate}>О проекте</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;