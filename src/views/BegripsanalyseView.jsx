import { useState } from "react";
import { BEGRIPSANALYSE } from "../data/begripsanalyse.js";
import { useToast } from "../hooks/useToast.js";
import { Toast } from "../components/Toast.jsx";

export function BegripsanalyseView({ progress, setProgress }) {
  const [selectedBegrip, setSelectedBegrip] = useState(0);
  const [openItems, setOpenItems] = useState({});
  const { toast, show: showToast } = useToast();

  const tracker = progress.begripsanalyseTracker || {};

  const toggleItem = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const setBegripStatus = (key, status) => {
    const current = tracker[key];
    const newStatus = current === status ? null : status;
    setProgress(prev => {
      const t = { ...(prev.begripsanalyseTracker || {}) };
      t[key] = newStatus;
      return { ...prev, begripsanalyseTracker: t };
    });
    if (newStatus) showToast(newStatus === "begrepen" ? "Gemarkeerd als begrepen" : "Gemarkeerd als lastig");
  };

  const totalDefs = BEGRIPSANALYSE.reduce((sum, b) => sum + b.definities.length, 0);
  const totalBegrepen = Object.values(tracker).filter(v => v === "begrepen").length;
  const totalLastig = Object.values(tracker).filter(v => v === "lastig").length;
  const totalDone = totalBegrepen + totalLastig;

  const begrip = BEGRIPSANALYSE[selectedBegrip];
  const tabColors = ["#c2185b", "#1565c0", "#2e7d32"];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      {totalDone > 0 && (
        <div style={{ display: "flex", gap: "10px", margin: "16px 0", padding: "12px 16px", background: "#f8f8fc", borderRadius: "12px", border: "1px solid #e8e8f0" }}>
          <div style={{ fontSize: "12px", color: "#666" }}>
            <strong style={{ color: "#1a1a2e" }}>{totalDone}/{totalDefs}</strong> beoordeeld
          </div>
          <div style={{ fontSize: "12px", color: "#4caf50" }}>
            ✔ {totalBegrepen} begrepen
          </div>
          <div style={{ fontSize: "12px", color: "#ef5350" }}>
            ✗ {totalLastig} lastig
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
        {BEGRIPSANALYSE.map((b, i) => (
          <button
            key={b.begrip}
            onClick={() => { setSelectedBegrip(i); setOpenItems({}); }}
            style={{
              flex: 1, padding: "10px 8px", borderRadius: "8px", cursor: "pointer",
              fontWeight: 700, fontSize: "13px", fontFamily: "'Source Sans 3', sans-serif",
              border: selectedBegrip === i ? `2px solid ${tabColors[i]}` : "1px solid #e0e0e0",
              background: selectedBegrip === i ? `${tabColors[i]}10` : "#fafafa",
              color: selectedBegrip === i ? tabColors[i] : "#666",
              transition: "all 0.2s",
            }}
          >
            {b.begrip}
          </button>
        ))}
      </div>

      <div style={{
        padding: "14px 16px", background: "#f8f8fc", borderRadius: "12px",
        border: `1px solid ${tabColors[selectedBegrip]}22`, marginBottom: "16px",
      }}>
        <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{begrip.intro}</p>
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", color: "#1a1a2e", margin: "0 0 12px" }}>
        Definities van '{begrip.begrip}'
      </h3>

      {begrip.definities.map((d, i) => {
        const voKey = `${selectedBegrip}-${i}-vo`;
        const imKey = `${selectedBegrip}-${i}-im`;
        const trackKey = `${begrip.begrip}-${d.filosoof}`;
        const status = tracker[trackKey];
        return (
          <div key={i} style={{
            padding: "14px 16px", background: "#fff", borderRadius: "12px",
            border: `1px solid ${tabColors[selectedBegrip]}22`,
            borderLeft: `3px solid ${status === "begrepen" ? "#4caf50" : status === "lastig" ? "#ef5350" : tabColors[selectedBegrip]}`,
            marginBottom: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <div style={{ fontWeight: 700, fontSize: "14px", color: tabColors[selectedBegrip] }}>
                {d.filosoof}
              </div>
              {status && <span style={{ fontSize: "11px", fontWeight: 600, color: status === "begrepen" ? "#4caf50" : "#ef5350" }}>{status === "begrepen" ? "✔ begrepen" : "✗ lastig"}</span>}
            </div>
            <p style={{ fontSize: "13px", color: "#333", lineHeight: 1.5, margin: "0 0 10px" }}>
              {d.definitie}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => toggleItem(voKey)}
                style={{
                  padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
                  fontSize: "12px", fontWeight: 600,
                  border: `1px solid ${tabColors[selectedBegrip]}44`,
                  background: openItems[voKey] ? `${tabColors[selectedBegrip]}15` : "#fff",
                  color: tabColors[selectedBegrip],
                  transition: "all 0.2s",
                }}
              >
                {openItems[voKey] ? "Vooronderstelling ▲" : "Vooronderstelling? ▼"}
              </button>
              <button
                onClick={() => toggleItem(imKey)}
                style={{
                  padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
                  fontSize: "12px", fontWeight: 600,
                  border: `1px solid ${tabColors[selectedBegrip]}44`,
                  background: openItems[imKey] ? `${tabColors[selectedBegrip]}15` : "#fff",
                  color: tabColors[selectedBegrip],
                  transition: "all 0.2s",
                }}
              >
                {openItems[imKey] ? "Implicatie ▲" : "Implicatie? ▼"}
              </button>
            </div>
            {openItems[voKey] && (
              <div style={{
                marginTop: "10px", padding: "10px 12px", borderRadius: "6px",
                background: `${tabColors[selectedBegrip]}08`, fontSize: "13px",
                color: "#333", lineHeight: 1.5,
              }}>
                <strong style={{ color: tabColors[selectedBegrip] }}>Vooronderstelling:</strong> {d.vooronderstelling}
              </div>
            )}
            {openItems[imKey] && (
              <div style={{
                marginTop: "8px", padding: "10px 12px", borderRadius: "6px",
                background: `${tabColors[selectedBegrip]}08`, fontSize: "13px",
                color: "#333", lineHeight: 1.5,
              }}>
                <strong style={{ color: tabColors[selectedBegrip] }}>Implicatie:</strong> {d.implicatie}
              </div>
            )}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", borderTop: "1px solid #f0f0f5", paddingTop: "10px" }}>
              <button onClick={() => setBegripStatus(trackKey, "begrepen")} style={{
                flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
                border: status === "begrepen" ? "2px solid #4caf50" : "1px solid #e0e0e8",
                background: status === "begrepen" ? "#e8f5e9" : "#fff",
                color: status === "begrepen" ? "#2e7d32" : "#777",
              }}>✔ Begrepen</button>
              <button onClick={() => setBegripStatus(trackKey, "lastig")} style={{
                flex: 1, padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
                border: status === "lastig" ? "2px solid #ef5350" : "1px solid #e0e0e8",
                background: status === "lastig" ? "#fce4ec" : "#fff",
                color: status === "lastig" ? "#c62828" : "#777",
              }}>✗ Lastig</button>
            </div>
          </div>
        );
      })}

      <div style={{
        marginTop: "20px", padding: "16px", background: "#f0f4ff",
        borderRadius: "12px", border: "1px solid #d0d8f0",
      }}>
        <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", color: "#1a1a2e", margin: "0 0 8px" }}>
          Vergelijking
        </h4>
        <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>
          {begrip.vergelijking}
        </p>
      </div>
      <Toast message={toast} />
    </div>
  );
}
