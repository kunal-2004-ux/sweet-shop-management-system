interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantityInStock: number;
}

export default function SweetCard({
  sweet,
  onPurchase
}: {
  sweet: Sweet;
  onPurchase: (id: string) => void;
}) {
  const outOfStock = sweet.quantityInStock === 0;

  return (
    <div className="card">
      <h3>{sweet.name}</h3>
      <p style={{ color: "#6b7280" }}>{sweet.category}</p>
      <p>₹{sweet.price}</p>
      <p>In stock: {sweet.quantityInStock}</p>

      <button
        className="button"
        disabled={outOfStock}
        onClick={() => onPurchase(sweet.id)}
      >
        {outOfStock ? "Out of stock" : "Purchase"}
      </button>
    </div>
  );
}
