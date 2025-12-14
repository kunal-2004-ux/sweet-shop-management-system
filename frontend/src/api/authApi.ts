import axios from "axios";

const API_URL = "http://localhost:3000/api";

interface AuthResponse {
  token: string;
  role: "USER" | "ADMIN";
}

/* ---------------- LOGIN ---------------- */

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    { email, password }
  );

  // ✅ Persist auth state
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);

  return res.data;
}

/* ---------------- REGISTER ---------------- */

export async function register(
  email: string,
  password: string,
  phoneNumber: string,
  role: "USER" | "ADMIN"
) {
  const res = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    phoneNumber,
    role
  });

  return res.data;
}
