export default function Navbar({
  onLogout
}: {
  onLogout: () => void;
}) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🍬</span>
        <h1 className="navbar-title">Sweet Shop</h1>
      </div>

      <button
        className="navbar-logout"
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
}
