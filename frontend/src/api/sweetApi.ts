import axios from "axios";

const API_URL = "http://localhost:3000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
}

export async function fetchSweets() {
  const response = await axios.get(`${API_URL}/sweets`, {
    headers: authHeaders()
  });
  return response.data;
}

export async function purchaseSweet(id: string) {
  await axios.post(
    `${API_URL}/sweets/${id}/purchase`,
    {},
    {
      headers: authHeaders()
    }
  );
}
