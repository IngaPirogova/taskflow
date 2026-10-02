import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="mobile-menu">
            <button
                className="mobile-menu-toggle"
                type="button"
                aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu-panel"
                onClick={() => setIsOpen(open => !open)}
            >
                <span className="mobile-menu-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
            </button>
            <div
                className="mobile-menu-panel"
                id="mobile-menu-panel"
                hidden={!isOpen}
            >
                <Sidebar onNavigate={closeMenu} />
                <Navigation onNavigate={closeMenu} />
                <UserMenu onNavigate={closeMenu} />
            </div>
        </div>
    );
}