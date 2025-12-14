import { useState } from "react";
import { addSweet } from "../api/sweetApi";

export default function AdminAddSweet({
  onAdded
}: {
  onAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await addSweet({
        name,
        category,
        price,
        quantityInStock: quantity
      });

      setName("");
      setCategory("");
      setPrice(0);
      setQuantity(0);
      onAdded();
    } catch (err) {
      setError("Failed to add sweet");
    }
  }

  return (
    <div
      style={{
        marginTop: 32,
        padding: 20,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        maxWidth: 420
      }}
    >
      <h3>Add New Sweet</h3>

      {error && (
        <p style={{ color: "red", marginBottom: 8 }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Sweet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          type="number"
          placeholder="Initial Stock"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "none",
            background: "#22c55e",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
}
