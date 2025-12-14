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

      <div style={{ padding: 24 }}>
        <h2>Available Sweets</h2>

        {sweets.length === 0 && (
          <p style={{ color: "#6b7280" }}>
            No sweets available yet.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 16
          }}
        >
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
