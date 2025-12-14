import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SweetCard from "../components/SweetCard";
import { fetchSweets, purchaseSweet } from "../api/sweetApi";

export default function Dashboard() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSweets() {
    setLoading(true);
    const data = await fetchSweets();
    setSweets(data);
    setLoading(false);
  }

  async function handlePurchase(id: string) {
    await purchaseSweet(id);
    loadSweets();
  }

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="container">
      <Navbar />

      {loading ? (
        <p>Loading sweets...</p>
      ) : sweets.length === 0 ? (
        <p>🍬 No sweets available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 16
          }}
        >
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      )}
    </div>
  );
}
