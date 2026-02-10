import { getLiaRef } from "../utils/liaRef.js";

export function LiaBadge({ text, kwestie }) {
  const ref = text ? getLiaRef(text, kwestie) : getLiaRef(null, kwestie);
  if (!ref) return null;
  return (
    <span style={{ display: "inline-block", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, background: ref.startsWith("Lia 1") ? "#2D5A8E30" : "#7A2D8E30", color: ref.startsWith("Lia 1") ? "#2D5A8E" : "#7A2D8E", letterSpacing: "0.3px", whiteSpace: "nowrap" }}>
      {ref}
    </span>
  );
}
