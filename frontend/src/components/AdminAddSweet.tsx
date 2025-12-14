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
    <div className="admin-add-sweet-form">
      <h3>Add New Sweet</h3>
      <p className="admin-add-sweet-subtitle">Add a new item to the inventory</p>

      {error && (
        <p className="form-error">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label htmlFor="sweet-name">Sweet Name</label>
          <input
            id="sweet-name"
            placeholder="e.g. Gulab Jamun"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="sweet-category">Category</label>
          <input
            id="sweet-category"
            placeholder="e.g. Traditional"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="sweet-price">Price (₹)</label>
          <input
            id="sweet-price"
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="sweet-stock">Initial Stock</label>
          <input
            id="sweet-stock"
            type="number"
            placeholder="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-add-sweet"
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
}
