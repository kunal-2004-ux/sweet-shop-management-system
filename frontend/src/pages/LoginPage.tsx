import { useState } from "react";
import { login } from "../api/authApi";
import "../styles/auth.css";

export default function LoginPage({
  onLogin,
  onRegisterClick
}: {
  onLogin: () => void;
  onRegisterClick: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      onLogin();
    } catch {
      setError("Invalid email or password");
    }
  }
return (
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-logo">🍬</div>
        <div className="auth-title">Sweet Shop Management System</div>
        <div className="auth-subtitle">
          Manage and order sweets online 
        </div>
      </div>

      <h2>Login</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <div className="auth-switch" onClick={onRegisterClick}>
        New user? Create an account
      </div>
    </div>
  </div>
);

  
}
