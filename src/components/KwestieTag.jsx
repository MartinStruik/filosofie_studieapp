import { KWESTIES, DOMEINEN } from "../data/kwesties.js";

export function KwestieTag({ kwestie, small }) {
  if (kwestie === 0) {
    return (
      <span style={{ display: "inline-block", padding: small ? "2px 6px" : "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, background: "#90909030", color: "#666", letterSpacing: "0.5px" }}>ALG</span>
    );
  }
  const d = DOMEINEN.find(d => d.id === kwestie);
  if (d) {
    return (
      <span style={{ display: "inline-block", padding: small ? "2px 6px" : "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, background: `${d.color}30`, color: d.color, letterSpacing: "0.5px" }}>{d.id}</span>
    );
  }
  const k = KWESTIES.find(k => k.id === kwestie);
  if (!k) return null;
  return (
    <span style={{ display: "inline-block", padding: small ? "2px 6px" : "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, background: `${k.color}30`, color: k.color, letterSpacing: "0.5px" }}>K{k.id}</span>
  );
}
