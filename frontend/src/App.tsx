import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterPage onLoginClick={() => setShowRegister(false)} />
    ) : (
      <LoginPage
        onLogin={() => setIsAuthenticated(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
    );
  }

  return <h2 style={{ textAlign: "center" }}>Dashboard coming next 🚀</h2>;
}
