
import Navigation from "../Navigation/Navigation";
import MobileMenu from "../MobileMenu/MobileMenu";
import UserMenu from "../UserMenu/UserMenu";

function Header({ title }) {
  return (
    <header className="app-header">
      <h1 className="title">{title}</h1>
      <Navigation />
      <UserMenu />
      <MobileMenu />
    </header>
  );
}

export default Header;