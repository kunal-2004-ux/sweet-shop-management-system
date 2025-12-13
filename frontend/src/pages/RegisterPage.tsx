import { useState } from "react";
import { register } from "../api/authApi";

export default function RegisterPage({ onRegister }: { onRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await register(email, password);
    onRegister();
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
          🍭 Create Account
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
