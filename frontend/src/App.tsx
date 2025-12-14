import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState<"login" | "register" | "dashboard">(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  function handleLogin() {
    setPage("dashboard");
  }

  function handleLogout() {
    localStorage.clear();
    setPage("login");
  }

  if (page === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegisterClick={() => setPage("register")}
      />
    );
  }

  if (page === "register") {
    return (
      <RegisterPage
        onLoginClick={() => setPage("login")}
      />
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}
