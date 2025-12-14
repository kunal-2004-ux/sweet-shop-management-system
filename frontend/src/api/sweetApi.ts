import axios from "axios";

const API_URL = "http://localhost:3000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

/* ------------------ USER APIs ------------------ */

export async function fetchSweets() {
  const res = await axios.get(
    `${API_URL}/sweets`,
    authHeaders()
  );
  return res.data;
}

export async function purchaseSweet(
  id: string,
  quantity: number
) {
  const res = await axios.post(
    `${API_URL}/sweets/${id}/purchase`,
    { quantity },
    authHeaders()
  );
  return res.data;
}

/* ------------------ ADMIN APIs ------------------ */

export async function addSweet(data: {
  name: string;
  category: string;
  price: number;
  quantityInStock: number;
}) {
  const res = await axios.post(
    `${API_URL}/sweets`,
    data,
    authHeaders()
  );
  return res.data;
}

export async function restockSweet(
  id: string,
  amount: number
) {
  const res = await axios.post(
    `${API_URL}/sweets/${id}/restock`,
    { amount },
    authHeaders()
  );
  return res.data;
}

export async function deleteSweet(id: string) {
  const res = await axios.delete(
    `${API_URL}/sweets/${id}`,
    authHeaders()
  );
  return res.data;
}
