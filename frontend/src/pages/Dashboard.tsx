import { useEffect, useState } from "react";
import SweetCard from "../components/SweetCard";
import Navbar from "../components/Navbar";
import { fetchSweets } from "../api/sweetApi";
import AdminAddSweet from "../components/AdminAddSweet";

export default function Dashboard({
  onLogout
}: {
  onLogout: () => void;
}) {
  const [sweets, setSweets] = useState<any[]>([]);
  const role = localStorage.getItem("role");

  const isAdmin = role === "ADMIN";

  async function loadSweets() {
    try {
      const res = await fetchSweets();
      setSweets(res);
    } catch (err) {
      console.error("Failed to load sweets", err);
    }
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <>
      <Navbar onLogout={onLogout} />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Available Sweets</h2>
          <p className="dashboard-subtitle">
            {isAdmin
              ? "Manage your inventory - restock or remove items"
              : "Browse our delicious collection and place your order"}
          </p>
        </div>

        {sweets.length === 0 && (
          <p className="dashboard-empty">
            No sweets available yet.
          </p>
        )}

        <div className="sweet-grid">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              isAdmin={isAdmin}
              onPurchased={loadSweets}
              onRestocked={loadSweets}
              onDeleted={loadSweets}
            />
          ))}
        </div>

        {/* ADMIN ONLY */}
        {isAdmin && (
          <AdminAddSweet onAdded={loadSweets} />
        )}
      </div>
    </>
  );
}
