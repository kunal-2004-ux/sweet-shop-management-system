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
  const [quantity, setQuantity] = useState("1");
  const [restockAmount, setRestockAmount] = useState("1");

  const outOfStock = sweet.quantityInStock === 0;
  const quantityNum = parseInt(quantity, 10) || 0;
  const restockNum = parseInt(restockAmount, 10) || 0;

  async function handlePurchase() {
    if (quantityNum <= 0 || quantityNum > sweet.quantityInStock) return;
    await purchaseSweet(sweet.id, quantityNum);
    setQuantity("1");
    onPurchased();
  }

  async function handleRestock() {
    if (restockNum <= 0) return;
    await restockSweet(sweet.id, restockNum);
    setRestockAmount("1");
    onRestocked();
  }

  async function handleDelete() {
    if (!confirm("Delete this sweet?")) return;
    await deleteSweet(sweet.id);
    onDeleted();
  }

  return (
    <div className="sweet-card">
      {/* Card Header */}
      <div className="sweet-card-header">
        <h3 className="sweet-card-name">{sweet.name}</h3>
        <div className="sweet-card-category">{sweet.category}</div>
      </div>

      {/* Price & Stock Info */}
      <div className="sweet-card-info">
        <div className="sweet-card-info-item">
          <div className="sweet-card-info-label">Price</div>
          <div className="sweet-card-info-value price">₹{sweet.price}</div>
        </div>
        <div className="sweet-card-info-item">
          <div className="sweet-card-info-label">In Stock</div>
          <div className={`sweet-card-info-value ${outOfStock ? 'out-of-stock' : ''}`}>
            {sweet.quantityInStock}
          </div>
        </div>
      </div>

      {/* USER VIEW - Purchase Section */}
      {!isAdmin && (
        <div className="sweet-card-purchase">
          <label htmlFor={`qty-${sweet.id}`}>Quantity</label>
          <input
            id={`qty-${sweet.id}`}
            type="number"
            min={1}
            max={sweet.quantityInStock}
            value={quantity}
            disabled={outOfStock}
            onChange={(e) => setQuantity(e.target.value)}
            className={`sweet-card-quantity-input ${quantityNum > sweet.quantityInStock ? 'input-error' : ''}`}
          />

          {quantityNum > sweet.quantityInStock && (
            <p className="quantity-error">
              Cannot order more than {sweet.quantityInStock} items
            </p>
          )}

          {quantityNum <= 0 && quantity !== "" && (
            <p className="quantity-error">
              Please enter a valid quantity
            </p>
          )}

          <button
            disabled={outOfStock || quantityNum <= 0 || quantityNum > sweet.quantityInStock}
            onClick={handlePurchase}
            className="btn-purchase"
          >
            {outOfStock ? "Out of Stock" : "Purchase"}
          </button>
        </div>
      )}

      {/* ADMIN VIEW - Restock & Delete Section */}
      {isAdmin && (
        <div className="sweet-card-admin">
          <div className="admin-section-title">Admin Actions</div>

          <div className="admin-restock-group">
            <label htmlFor={`restock-${sweet.id}`}>Restock Quantity</label>
            <input
              id={`restock-${sweet.id}`}
              type="number"
              min={1}
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
              className="admin-restock-input"
            />
            <button
              onClick={handleRestock}
              className="btn-restock"
            >
              Restock
            </button>
          </div>

          <div className="admin-delete-group">
            <label>Delete Sweet</label>
            <button
              onClick={handleDelete}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
