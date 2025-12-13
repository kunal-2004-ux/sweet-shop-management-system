import { useState } from "react";
import { login } from "../api/authApi";

export default function LoginPage({
  onLogin,
  onRegisterClick
}: {
  onLogin: () => void;
  onRegisterClick: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    onLogin();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fdf2f8, #f9fafb)"
      }}
    >
      <div className="card" style={{ width: 380, padding: 24 }}>
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>
          🍬 Sweet Shop Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 12,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #d1d5db"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 16,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #d1d5db"
            }}
          />

          <button className="button" type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: 14,
            textAlign: "center",
            fontSize: 14,
            cursor: "pointer",
            color: "#ec4899"
          }}
          onClick={onRegisterClick}
        >
          New user? Create an account
        </p>
      </div>
    </div>
  );
}
