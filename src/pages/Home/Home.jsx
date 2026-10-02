import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="entry-page">
      <header className="entry-header">
        <Link className="entry-wordmark" to="/">
          <span className="entry-monogram">TF</span>
          <span>TaskFlow</span>
        </Link>
        <div className="entry-header-actions">
          <nav className="entry-desktop-nav" aria-label="Аккаунт">
            {isAuthenticated ? (
              <Link className="entry-header-link" to="/tasks">Задачи</Link>
            ) : (
              <>
                <Link className="entry-header-link" to="/login">Войти</Link>
                <Link className="entry-header-cta" to="/register">Регистрация</Link>
              </>
            )}
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="entry-main">
        <section className="entry-copy">
          <p className="entry-eyebrow">ПЛАНИРОВАНИЕ ЗАДАЧ</p>
          <h1>Ваши задачи <span>в TaskFlow.</span></h1>
          <p className="entry-description">
            Начните с регистрации или войдите в свой аккаунт.
          </p>
          <div className="entry-actions">
            <Link className="entry-primary" to={isAuthenticated ? "/tasks" : "/register"}>
              {isAuthenticated ? "Перейти к задачам" : "Создать аккаунт"}
            </Link>
            {!isAuthenticated && (
              <p className="entry-existing">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
              </p>
            )}
          </div>
        </section>

        <figure className="entry-visual">
          <img
            src="/taskflow-planning.jpg"
            alt="Блокнот с планом на день, ручка и ноутбук на рабочем столе"
            fetchPriority="high"
          />
        </figure>
      </main>
    </div>
  );
}

export default Home;
