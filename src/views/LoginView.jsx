import { useState } from "react";

export function LoginView({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await onLogin(email, password);
    if (err) {
      setError(
        err.message === "Invalid login credentials"
          ? "Onjuist e-mailadres of wachtwoord"
          : err.message
      );
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "520px", margin: "0 auto", minHeight: "100vh",
      background: "#fff", fontFamily: "'Source Sans 3', -apple-system, sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "26px", color: "#1a1a2e", margin: "0 0 4px",
          textAlign: "center",
        }}>
          Filosofie VWO 2026
        </h1>
        <p style={{
          color: "#666", fontSize: "14px", margin: "0 0 32px",
          textAlign: "center",
        }}>
          Log in om verder te gaan
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#444", marginBottom: "6px" }}>
            E-mailadres
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voornaam@filosofie.app"
            required
            autoComplete="email"
            style={{
              width: "100%", padding: "10px 12px", fontSize: "15px",
              border: "1px solid #ddd", borderRadius: "8px",
              marginBottom: "16px", boxSizing: "border-box",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          />

          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#444", marginBottom: "6px" }}>
            Wachtwoord
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            style={{
              width: "100%", padding: "10px 12px", fontSize: "15px",
              border: "1px solid #ddd", borderRadius: "8px",
              marginBottom: "24px", boxSizing: "border-box",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          />

          {error && (
            <div style={{
              background: "#fff0f0", border: "1px solid #ffcdd2",
              borderRadius: "8px", padding: "10px 14px", marginBottom: "16px",
              fontSize: "13px", color: "#c62828",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "12px", fontSize: "15px",
              fontWeight: 700, color: "#fff",
              background: loading
                ? "#9ab8d9"
                : "linear-gradient(135deg, #4A90D9 0%, #2D5A8E 100%)",
              border: "none", borderRadius: "8px", cursor: loading ? "wait" : "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {loading ? "Bezig..." : "Inloggen"}
          </button>
        </form>

        <p style={{
          color: "#999", fontSize: "12px", textAlign: "center",
          marginTop: "24px", lineHeight: 1.5,
        }}>
          Je inloggegevens krijg je van je docent.<br />
          Problemen?{" "}
          <a href="mailto:m.struik@asg.nl?subject=Login%20probleem%20Filosofie%20Studieapp"
            style={{ color: "#4A90D9" }}>
            Mail de docent
          </a>
        </p>
      </div>
    </div>
  );
}
