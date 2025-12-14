import { useState } from "react";
import { register } from "../api/authApi";
import "../styles/auth.css";

export default function RegisterPage({
  onLoginClick
}: {
  onLoginClick: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register(email, password, phoneNumber, role);
      alert("Account created. Please login.");
      onLoginClick();
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }
return (
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-logo">🍬</div>
        <div className="auth-title">Sweet Shop</div>
        <div className="auth-subtitle">
          Create your account to start ordering
        </div>
      </div>

      <h2>Create Account</h2>

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
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
        >
          <option value="USER">Customer</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <div className="auth-switch" onClick={onLoginClick}>
        Already have an account? Login
      </div>
    </div>
  </div>
);

  
}
