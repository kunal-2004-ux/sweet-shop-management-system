export default function Navbar() {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

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
      <button className="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
