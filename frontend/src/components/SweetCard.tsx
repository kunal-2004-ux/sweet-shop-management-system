import { useState } from "react";
import {
  purchaseSweet,
  restockSweet,
  deleteSweet
} from "../api/sweetApi";

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantityInStock: number;
}

export default function SweetCard({
  sweet,
  isAdmin,
  onPurchased,
  onRestocked,
  onDeleted
}: {
  sweet: Sweet;
  isAdmin: boolean;
  onPurchased: () => void;
  onRestocked: () => void;
  onDeleted: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [restockAmount, setRestockAmount] = useState(1);

  const outOfStock = sweet.quantityInStock === 0;

  async function handlePurchase() {
    if (quantity <= 0 || quantity > sweet.quantityInStock) return;
    await purchaseSweet(sweet.id, quantity);
    onPurchased();
  }

  async function handleRestock() {
    if (restockAmount <= 0) return;
    await restockSweet(sweet.id, restockAmount);
    onRestocked();
  }

  async function handleDelete() {
    if (!confirm("Delete this sweet?")) return;
    await deleteSweet(sweet.id);
    onDeleted();
  }

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        width: 260
      }}
    >
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantityInStock}</p>

      {/* USER VIEW */}
      {!isAdmin && (
        <>
          <input
            type="number"
            min={1}
            max={sweet.quantityInStock}
            value={quantity}
            disabled={outOfStock}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "100%", marginBottom: 8 }}
          />

          <button
            disabled={outOfStock}
            onClick={handlePurchase}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: "none",
              background: outOfStock ? "#9ca3af" : "#22c55e",
              color: "white",
              cursor: outOfStock ? "not-allowed" : "pointer"
            }}
          >
            {outOfStock ? "Out of Stock" : "Purchase"}
          </button>
        </>
      )}

      {/* ADMIN VIEW */}
      {isAdmin && (
        <>
          <hr style={{ margin: "12px 0" }} />

          <label>Restock Quantity</label>
          <input
            type="number"
            min={1}
            value={restockAmount}
            onChange={(e) => setRestockAmount(Number(e.target.value))}
            style={{ width: "100%", marginBottom: 8 }}
          />

          <button
            onClick={handleRestock}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: "none",
              background: "#3b82f6",
              color: "white",
              marginBottom: 8
            }}
          >
            Restock
          </button>

          <button
            onClick={handleDelete}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: "none",
              background: "#ef4444",
              color: "white"
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
