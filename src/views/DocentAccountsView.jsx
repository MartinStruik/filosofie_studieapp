import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";

export function DocentAccountsView() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .order("display_name");
    setStudents(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

  const generateEmail = (displayName) => {
    return displayName
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      + "@filosofie.app";
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;

    setCreating(true);
    setMessage(null);

    const email = generateEmail(name.trim());

    try {
      const { data, error } = await supabase.functions.invoke("create-student", {
        body: {
          email,
          password: password.trim(),
          display_name: name.trim(),
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setMessage({ type: "success", text: `Account aangemaakt: ${email}` });
      setName("");
      setPassword("");
      await fetchStudents();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Er ging iets mis" });
    }

    setCreating(false);
  };

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#1a1a2e", margin: 0 }}>
          Accounts beheren
        </h1>
      </div>

      {/* Nieuw account aanmaken */}
      <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>Nieuw leerlingaccount</div>
        <form onSubmit={handleCreate}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#444", marginBottom: "4px" }}>
            Naam
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Voornaam Achternaam"
            required
            style={{
              width: "100%", padding: "8px 12px", fontSize: "14px",
              border: "1px solid #ddd", borderRadius: "8px",
              marginBottom: "4px", boxSizing: "border-box",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          />
          {name.trim() && (
            <div style={{ fontSize: "11px", color: "#999", marginBottom: "10px" }}>
              E-mail wordt: {generateEmail(name.trim())}
            </div>
          )}

          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#444", marginBottom: "4px", marginTop: "8px" }}>
            Wachtwoord
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kies een wachtwoord"
            required
            style={{
              width: "100%", padding: "8px 12px", fontSize: "14px",
              border: "1px solid #ddd", borderRadius: "8px",
              marginBottom: "14px", boxSizing: "border-box",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          />

          {message && (
            <div style={{
              background: message.type === "success" ? "#f0fff0" : "#fff0f0",
              border: `1px solid ${message.type === "success" ? "#c8e6c9" : "#ffcdd2"}`,
              borderRadius: "8px", padding: "8px 12px", marginBottom: "12px",
              fontSize: "13px", color: message.type === "success" ? "#2e7d32" : "#c62828",
            }}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={creating}
            style={{
              padding: "10px 20px", fontSize: "14px", fontWeight: 700,
              color: "#fff",
              background: creating ? "#9ab8d9" : "linear-gradient(135deg, #4A90D9 0%, #2D5A8E 100%)",
              border: "none", borderRadius: "8px",
              cursor: creating ? "wait" : "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {creating ? "Aanmaken..." : "Account aanmaken"}
          </button>
        </form>
      </div>

      {/* Bestaande accounts */}
      <div style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", fontSize: "14px", fontWeight: 700, color: "#1a1a2e", borderBottom: "1px solid #f0f0f5" }}>
          Leerlingen ({students.length})
        </div>

        {loading ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#999", fontSize: "13px" }}>Laden...</div>
        ) : students.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#999", fontSize: "13px" }}>Nog geen leerlingen.</div>
        ) : (
          students.map((s, i) => (
            <div key={s.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 16px", borderTop: i > 0 ? "1px solid #f0f0f5" : "none",
            }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>{s.display_name}</div>
                <div style={{ fontSize: "11px", color: "#999" }}>
                  {new Date(s.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
