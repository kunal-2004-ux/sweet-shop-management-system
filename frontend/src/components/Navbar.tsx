export default function Navbar({
  onLogout
}: {
  onLogout: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24
      }}
    >
      <h2>🍬 Sweet Shop</h2>

      <button
        className="button"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
