import { useState } from "react";
import { KWESTIES } from "../data/kwesties.js";
import { FILOSOFEN } from "../data/filosofen.js";
import { FLASHCARDS } from "../data/flashcards.js";
import { EXAM_QUESTIONS } from "../data/examQuestions.js";
import { SPECIFIEKE_EINDTERMEN } from "../data/eindtermen.js";
import { KwestieTag } from "../components/KwestieTag.jsx";

const KWESTIE_STRUCTUUR = {
  1: {
    title: "Drie perspectieven op de mens",
    intro: "De syllabus benadert 'wat is de mens?' vanuit drie perspectieven:",
    groups: [
      { label: "3e persoon \u2014 de mens als object", desc: "De mens van buitenaf beschreven: als machine, als biologisch wezen, als hersenprocessen.", filosofen: ["Descartes"] },
      { label: "1e persoon \u2014 de geleefde ervaring", desc: "Hoe het voelt om een lichaam te zijn. Pre-reflectieve beweging, excentrische positionaliteit.", filosofen: ["Sheets-Johnstone", "Plessner"] },
      { label: "2e persoon \u2014 de blik van de ander", desc: "Hoe anderen je identiteit vormen. Gender als situatie, ras als opgedrongen schema.", filosofen: ["De Beauvoir", "Fanon"] },
    ]
  },
  2: {
    title: "Drie standpunten",
    intro: "Kwestie 2 draait om hoe techniek en wetenschap ons zelfbeeld veranderen:",
    groups: [
      { label: "Metaforen vormen ons denken", desc: "Elke tijd heeft een dominante metafoor voor de mens. Lichamelijke ervaring structureert ons begrip.", filosofen: ["Lakoff & Johnson", "Vroon & Draaisma"] },
      { label: "Het brein als computer", desc: "De computationalistische claim dat denken = informatie verwerken, plus de kritiek daarop.", filosofen: ["Swaab", "Dreyfus (kritiek)"] },
      { label: "Denken is belichaamd", desc: "Cognitie stopt niet bij de schedel: het lichaam en de omgeving denken mee.", filosofen: ["4E-cognitie", "Clark & Chalmers", "No\u00eb"] },
    ]
  },
  3: {
    title: "Vier dimensies van verandering",
    intro: "Elke filosoof in K3 belicht een andere dimensie van hoe techniek ons verandert:",
    groups: [
      { label: "Cognitie & lichaam", desc: "De mens is van nature een cyborg: techniek wordt ingelijfd in het lichaam en het denken.", filosofen: ["Clark"] },
      { label: "Zintuiglijke ervaring", desc: "Nieuwe techniek verstoort en herschikt onze waarneming (decentreren \u2192 recentreren).", filosofen: ["Kockelkoren"] },
      { label: "Moreel oordeelsvermogen", desc: "Techniek is niet neutraal: het stuurt onze morele keuzes. Ontwerpen = moraal ontwerpen.", filosofen: ["Verbeek"] },
      { label: "Identiteit & mensbeeld", desc: "NBIN-technologie\u00ebn transformeren wie de mens kan worden. Drie scenario's.", filosofen: ["De Mul"] },
    ]
  },
  4: {
    title: "Drie grensvervagingen",
    intro: "Kwestie 4 is georganiseerd rond drie grenzen die vervagen:",
    groups: [
      { label: "Mens \u2194 dier/plant", desc: "Alles is verbonden in the mesh. Dieren hebben een eigen perspectief en agency.", filosofen: ["Morton", "Despret"] },
      { label: "Levend \u2194 niet-levend", desc: "Niet-menselijke dingen 'handelen': actanten, cognitieve assemblages, intra-actie.", filosofen: ["Latour", "Hayles", "Barad"] },
      { label: "Fysiek \u2194 niet-fysiek", desc: "De cyborg doorbreekt dualismen. Data claimen de mens te vangen \u2014 maar het else ontsnapt.", filosofen: ["Haraway", "Harari", "Rasch"] },
    ]
  },
};

export function KwestieDetail({ id, setView }) {
  const k = KWESTIES.find(k => k.id === id);
  const filosofen = FILOSOFEN.filter(f => f.kwestie === id);
  const begrippen = FLASHCARDS.filter(f => f.kwestie === id);
  const examQ = EXAM_QUESTIONS.filter(eq => eq.kwestie === id);
  const [openUitwerking, setOpenUitwerking] = useState({});
  const toggleUitwerking = (nr) => setOpenUitwerking(prev => ({ ...prev, [nr]: !prev[nr] }));

  const ets = SPECIFIEKE_EINDTERMEN[id] || [];
  const structuur = KWESTIE_STRUCTUUR[id];

  return (
    <div style={{ padding: "0 20px 40px" }}>
      <div style={{ background: k.color, color: "#fff", borderRadius: "16px", padding: "24px", margin: "16px 0 20px" }}>
        <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "4px" }}>Kwestie {k.id}</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", margin: "0 0 8px", lineHeight: 1.2 }}>{k.title}</h2>
        <p style={{ fontSize: "13px", opacity: 0.8, margin: 0 }}>{k.chapters} · {k.eindtermen}</p>
      </div>

      {structuur && (
        <>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>{structuur.title}</h3>
          <p style={{ fontSize: "12px", color: "#666", margin: "0 0 10px", lineHeight: 1.5 }}>{structuur.intro}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {structuur.groups.map((g, i) => (
              <div key={i} style={{
                padding: "12px 14px", background: "#fff",
                border: "1px solid #e8e8f0", borderLeft: `4px solid ${k.color}`,
                borderRadius: "8px",
              }}>
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a2e", marginBottom: "4px" }}>{g.label}</div>
                <div style={{ fontSize: "12px", color: "#666", lineHeight: 1.5, marginBottom: "8px" }}>{g.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {g.filosofen.map(f => (
                    <span key={f} style={{
                      background: `${k.color}15`, color: k.color,
                      padding: "3px 8px", borderRadius: "4px",
                      fontSize: "11px", fontWeight: 600,
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>{"📋"} Eindtermen (examenrelevant!)</h3>
      {ets.map(et => (
        <div key={et.nr} style={{ marginBottom: "6px", padding: "12px", background: "#f8f8fc", borderRadius: "8px", border: "1px solid #e8e8f0" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: k.color }}>ET {et.nr}</div>
          <p style={{ fontSize: "13px", color: "#333", margin: "4px 0 0", lineHeight: 1.4 }}>{et.text}</p>
          <button onClick={() => toggleUitwerking(et.nr)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: k.color, padding: "6px 0 0", fontWeight: 600 }}>
            {openUitwerking[et.nr] ? "Verberg uitwerking \u25B2" : "Toon uitwerking \u25BC"}
          </button>
          {openUitwerking[et.nr] && (
            <div style={{ marginTop: "8px", padding: "10px 12px", background: `${k.color}08`, borderRadius: "6px", fontSize: "13px", color: "#333", lineHeight: 1.5 }}>
              {et.uitwerking}
            </div>
          )}
        </div>
      ))}

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"👤"} Filosofen ({filosofen.length})</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {filosofen.map(f => (
          <button key={f.name} onClick={() => setView && setView("filosofen")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: "2px 0", textAlign: "left" }}>
            <span style={{ background: `${k.color}15`, color: k.color, padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 600 }}>{f.name}</span>
            {f.lia && <span style={{ fontSize: "11px", color: "#666" }}>{f.lia}</span>}
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"🎴"} Begrippen ({begrippen.length})</h3>
      <button onClick={() => setView && setView("flashcards")} style={{ display: "flex", flexWrap: "wrap", gap: "4px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        {begrippen.map(b => (
          <span key={b.term} style={{ background: "#f0f0f5", color: "#666", padding: "4px 10px", borderRadius: "4px", fontSize: "11px" }}>{b.term}</span>
        ))}
      </button>

      {examQ.length > 0 && (
        <>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: "20px 0 8px" }}>{"🔍"} Examenvragen ({examQ.length})</h3>
          {examQ.map((eq, i) => (
            <button key={i} onClick={() => setView && setView("exam")} style={{ display: "block", width: "100%", marginBottom: "6px", padding: "10px 12px", background: "#fff5f0", borderRadius: "8px", fontSize: "13px", color: "#333", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontWeight: 600 }}>{eq.year} vr.{eq.nr}</span> ({eq.points}p) — {eq.question.substring(0, 80)}...
            </button>
          ))}
        </>
      )}
    </div>
  );
}
