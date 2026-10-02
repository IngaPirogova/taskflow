import "modern-normalize";

import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import About from "./pages/About/About";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFound from "./pages/NotFound/NotFound";
import { fetchCurrentUser } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  if (isAuthPage) {
    return (
      <div className="app app--auth">
        <main className="auth-layout">
          <aside className="auth-brand">
            <Link className="auth-brand-link" to="/">
              <span className="auth-monogram">TF</span>
              <span>TaskFlow</span>
            </Link>
            <div className="auth-brand-copy">
              <p className="auth-brand-kicker">ЛИЧНЫЙ КАБИНЕТ</p>
              <h1>TaskFlow<span>.</span></h1>
            </div>
            <span className="auth-brand-mark" aria-hidden="true">TF</span>
          </aside>
          <section className="auth-form-column">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </section>
        </main>
      </div>
    );
  }

  if (isHomePage) {
    return <Home />;
  }

  return (
    <div className="app app--workspace">
      <Header title="TaskFlow" />
      <Sidebar />
      <main className="app-main">
        <Routes>
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <PrivateRoute>
                <TaskDetails />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

