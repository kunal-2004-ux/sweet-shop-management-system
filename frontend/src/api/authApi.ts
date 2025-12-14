import axios from "axios";

const API_URL = "http://localhost:3000/api";

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", response.data.role);
}

export async function register(
  email: string,
  password: string,
  phoneNumber: string,
  role: "USER" | "ADMIN"
) {
  await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    phoneNumber,
    role
  });
}
