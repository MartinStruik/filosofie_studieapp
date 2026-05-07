// Renders een array van { deel, hoofdstuk, pagina } refs als chips.
// Gebruikt in ExamQuestions en FoutenjachtView om de bijbehorende Lia-stof
// (zoals behandeld in de les) zichtbaar te maken bij elke vraag of foutenjager-item.

export function LiaRefBadge({ refs }) {
  if (!refs || refs.length === 0) return null;
  return (
    <span style={{ display: "inline-flex", gap: "4px", flexWrap: "wrap" }}>
      {refs.map((r, i) => (
        <span
          key={i}
          title={`Lia's transformatie Deel ${r.deel}, Hoofdstuk ${r.hoofdstuk}`}
          style={{
            display: "inline-block",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 600,
            background: r.deel === 1 ? "#2D5A8E20" : "#7A2D8E20",
            color: r.deel === 1 ? "#2D5A8E" : "#7A2D8E",
            letterSpacing: "0.3px",
            whiteSpace: "nowrap",
          }}
        >
          📖 Lia {r.deel} H{r.hoofdstuk}, p.{r.pagina}
        </span>
      ))}
    </span>
  );
}
