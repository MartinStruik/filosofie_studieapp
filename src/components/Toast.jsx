export function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: "80px", left: "50%", transform: "translateX(-50%)",
      background: "#1a1a2e", color: "#fff", padding: "10px 20px", borderRadius: "8px",
      fontSize: "13px", fontWeight: 600, zIndex: 200, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      animation: "fadeInUp 0.3s ease",
      maxWidth: "320px", textAlign: "center",
    }}>
      {message}
    </div>
  );
}
