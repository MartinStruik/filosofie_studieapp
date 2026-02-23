import { useState } from "react";
import { FILOSOOF_EXAMINFO } from "../data/mindmaps.js";

/**
 * Interactive mindmap component rendered as SVG.
 * Supports node types: central, filosoof, concept, label, kwestie, category
 * Supports edge styles: normal, dashed, bridge (thick didactische brugpijl)
 * Tapping a filosoof-node shows examinfo bottom-sheet.
 */

const NODE_STYLES = {
  central: { fill: "#1a1a2e", textColor: "#fff", rx: 14, fontSize: 11, fontWeight: 700, padX: 16, padY: 10 },
  filosoof: { fill: "#fff", textColor: "#1a1a2e", rx: 10, fontSize: 10, fontWeight: 600, padX: 12, padY: 8, stroke: true },
  concept: { fill: "#f8f8fc", textColor: "#444", rx: 8, fontSize: 9, fontWeight: 400, padX: 10, padY: 6, stroke: true },
  label: { fill: "none", textColor: "#666", rx: 0, fontSize: 10, fontWeight: 700, padX: 8, padY: 4 },
  kwestie: { fill: "#fff", textColor: "#1a1a2e", rx: 12, fontSize: 10, fontWeight: 700, padX: 14, padY: 9, stroke: true },
  category: { fill: "#f0f4f8", textColor: "#333", rx: 10, fontSize: 9, fontWeight: 700, padX: 12, padY: 7, stroke: true, dashed: true },
};

function measureText(text, fontSize) {
  const lines = text.split("\n");
  const maxLen = Math.max(...lines.map(l => l.length));
  return {
    width: maxLen * fontSize * 0.52 + 24,
    height: lines.length * (fontSize + 3) + 12,
    lines,
  };
}

function NodeRect({ node, isSelected, onTap }) {
  const s = NODE_STYLES[node.type] || NODE_STYLES.concept;
  const color = node.color || "#999";
  const measured = measureText(node.label, s.fontSize);
  const w = Math.max(measured.width, s.padX * 2 + 20);
  const h = measured.height + s.padY;
  const x = node.x;
  const y = node.y;

  const isClickable = node.type === "filosoof" || node.sub;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => onTap(node)}
      style={{ cursor: isClickable ? "pointer" : "default" }}
    >
      {s.fill !== "none" && (
        <rect
          x={-w / 2} y={-h / 2} width={w} height={h}
          rx={s.rx} ry={s.rx}
          fill={node.type === "central" ? (color || s.fill) : node.type === "category" ? (color + "18") : s.fill}
          stroke={s.stroke ? color : "none"}
          strokeWidth={isSelected ? 2.5 : node.type === "category" ? 1.8 : 1.5}
          strokeDasharray={s.dashed && !isSelected ? "5 3" : "none"}
          opacity={isSelected ? 1 : 0.95}
        />
      )}
      {measured.lines.map((line, i) => (
        <text
          key={i}
          x={0} y={-((measured.lines.length - 1) * (s.fontSize + 3)) / 2 + i * (s.fontSize + 3) + s.fontSize * 0.35}
          textAnchor="middle"
          fontSize={s.fontSize}
          fontWeight={s.fontWeight}
          fill={node.type === "central" ? "#fff" : node.type === "category" ? color : s.textColor}
          fontFamily="'Source Sans 3', sans-serif"
        >
          {line}
        </text>
      ))}
      {/* Tap indicator for filosoof nodes */}
      {node.type === "filosoof" && node.examInfoId && (
        <circle cx={w / 2 - 4} cy={-h / 2 + 4} r={3} fill={color} opacity={0.5} />
      )}
    </g>
  );
}

function Edge({ edge, nodes }) {
  const n1 = nodes.find(n => n.id === edge.from);
  const n2 = nodes.find(n => n.id === edge.to);
  if (!n1 || !n2) return null;

  const isBridge = edge.style === "bridge";
  const isDashed = edge.style === "dashed";

  // Calculate angle for arrowhead
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  const angle = Math.atan2(dy, dx);
  const len = Math.sqrt(dx * dx + dy * dy);

  // Shorten line to leave room for arrowhead on bridge edges
  const shortenBy = isBridge ? 8 : 0;
  const endX = n2.x - Math.cos(angle) * shortenBy;
  const endY = n2.y - Math.sin(angle) * shortenBy;

  // Midpoint for label
  const mx = (n1.x + n2.x) / 2;
  const my = (n1.y + n2.y) / 2;

  // Bridge color: use the target node's color, or a default
  const bridgeColor = isBridge ? (n2.color || n1.color || "#c62828") : null;

  return (
    <g>
      <line
        x1={n1.x} y1={n1.y} x2={endX} y2={endY}
        stroke={isBridge ? bridgeColor : isDashed ? "#bbb" : "#ddd"}
        strokeWidth={isBridge ? 2.5 : 1.2}
        strokeDasharray={isDashed ? "4 3" : "none"}
        opacity={isBridge ? 0.7 : 1}
      />
      {/* Arrowhead for bridge edges */}
      {isBridge && (
        <polygon
          points={`0,-4.5 10,0 0,4.5`}
          fill={bridgeColor}
          opacity={0.7}
          transform={`translate(${endX}, ${endY}) rotate(${angle * 180 / Math.PI})`}
        />
      )}
      {edge.label && (
        <>
          {/* Background for label readability */}
          <rect
            x={mx - measureText(edge.label, 8).width / 2}
            y={my - measureText(edge.label, 8).height / 2 - 3}
            width={measureText(edge.label, 8).width}
            height={measureText(edge.label, 8).height}
            fill="#fff"
            opacity={0.85}
            rx={3}
          />
          {edge.label.split("\n").map((line, i) => (
            <text
              key={i}
              x={mx}
              y={my - ((edge.label.split("\n").length - 1) * 11) / 2 + i * 11 - 1}
              textAnchor="middle"
              fontSize={isBridge ? 7.5 : 8}
              fill={isBridge ? bridgeColor : "#999"}
              fontFamily="'Source Sans 3', sans-serif"
              fontStyle={isBridge ? "normal" : "italic"}
              fontWeight={isBridge ? 600 : 400}
            >
              {line}
            </text>
          ))}
        </>
      )}
    </g>
  );
}

/* === Enhanced Bottom Sheet with FILOSOOF_EXAMINFO === */
function ExamInfoSheet({ node, onClose }) {
  const info = node.examInfoId ? FILOSOOF_EXAMINFO[node.examInfoId] : null;
  const color = node.color || "#1a1a2e";

  if (!info) {
    // Fallback to simple sub text
    return (
      <div style={{
        padding: "10px 16px 12px",
        borderTop: "1px solid #f0f0f5",
        background: "#fafafe",
        animation: "fadeIn 0.15s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, color }}>{node.label.replace(/\n/g, " ")}</span>
            {node.sub && <div style={{ fontSize: "12px", color: "#444", marginTop: "3px", lineHeight: 1.5 }}>{node.sub}</div>}
          </div>
          <CloseBtn onClick={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      borderTop: `2px solid ${color}`,
      background: "#fafafe",
      animation: "fadeIn 0.15s ease",
      maxHeight: "320px",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        padding: "10px 16px 0",
        position: "sticky", top: 0, background: "#fafafe", zIndex: 1,
      }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color }}>{info.naam}</span>
        <CloseBtn onClick={onClose} />
      </div>

      <div style={{ padding: "4px 16px 14px" }}>
        {/* Stelling */}
        <div style={{
          fontSize: "11.5px", color: "#333", lineHeight: 1.55,
          marginTop: "4px", marginBottom: "10px",
          borderLeft: `3px solid ${color}`, paddingLeft: "10px",
          fontStyle: "italic",
        }}>
          {info.stelling}
        </div>

        {/* Kernbegrippen */}
        <Section label="Kernbegrippen" color={color}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {info.kernbegrippen.map((b, i) => (
              <span key={i} style={{
                background: color + "15", color, border: `1px solid ${color}30`,
                borderRadius: "6px", padding: "2px 8px", fontSize: "10.5px", fontWeight: 500,
              }}>{b}</span>
            ))}
          </div>
        </Section>

        {/* Argumenten */}
        <Section label="Argumenten" color={color}>
          {info.argumenten.map((a, i) => (
            <div key={i} style={{ fontSize: "11px", color: "#444", lineHeight: 1.5, marginBottom: "4px" }}>
              <span style={{ fontWeight: 600, color }}>{i + 1}.</span> {a}
            </div>
          ))}
        </Section>

        {/* Voorbeeld */}
        <Section label="Voorbeeld" color={color}>
          <div style={{
            fontSize: "11px", color: "#555", lineHeight: 1.5,
            background: "#f8f4e8", borderRadius: "6px", padding: "6px 10px",
          }}>
            {info.voorbeeld}
          </div>
        </Section>

        {/* Kritiek */}
        <Section label="Kritiek" color={color}>
          <div style={{ fontSize: "11px", color: "#666", lineHeight: 1.5 }}>
            {info.kritiek}
          </div>
        </Section>

        {/* Vergelijk met */}
        {info.vergelijkMet && (
          <Section label={`Vergelijk: ${info.vergelijkMet.label}`} color={color}>
            <div style={{
              fontSize: "11px", color: "#555", lineHeight: 1.5,
              background: "#f0f4ff", borderRadius: "6px", padding: "6px 10px",
              borderLeft: `2px solid ${color}50`,
            }}>
              {info.vergelijkMet.tekst}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ label, color, children }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: color + "cc", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: "16px", color: "#999", padding: "4px 8px", marginRight: "-8px",
        lineHeight: 1,
      }}
    >
      ×
    </button>
  );
}

/* === Main MindMapCard component === */
export function MindMapCard({ mindmap, compact = false, onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  if (!mindmap) return null;

  // Scale percentages to viewBox coordinates
  const vbW = 420;
  const vbH = compact ? 300 : 380;
  const scaledNodes = mindmap.nodes.map(n => ({
    ...n,
    x: (n.x / 100) * (vbW - 40) + 20,
    y: (n.y / 100) * (vbH - 40) + 20,
  }));

  const handleTap = (node) => {
    if (node.type === "filosoof" || node.sub) {
      setSelected(node.id === selected ? null : node.id);
      setShowDetail(node.id !== selected);
    }
  };

  const selectedNode = scaledNodes.find(n => n.id === selected);

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8e8f0",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: compact ? "8px" : "16px",
    }}>
      {!compact && (
        <div style={{ padding: "12px 16px 4px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e" }}>{mindmap.title}</div>
          {mindmap.beschrijving && (
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{mindmap.beschrijving}</div>
          )}
        </div>
      )}

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <svg
          viewBox={`0 0 ${vbW} ${vbH}`}
          width="100%"
          style={{ display: "block", minWidth: compact ? "280px" : "340px" }}
        >
          {/* Arrowhead marker definition for bridge edges */}
          <defs>
            <marker
              id="bridgeArrow"
              markerWidth="8" markerHeight="6"
              refX="7" refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill="#c62828" opacity="0.7" />
            </marker>
          </defs>
          {/* Edges first (behind nodes) */}
          {mindmap.edges.map((edge, i) => (
            <Edge key={i} edge={edge} nodes={scaledNodes} />
          ))}
          {/* Nodes */}
          {scaledNodes.map(node => (
            <NodeRect
              key={node.id}
              node={node}
              isSelected={node.id === selected}
              onTap={handleTap}
            />
          ))}
        </svg>
      </div>

      {/* Bottom sheet when filosoof is tapped */}
      {showDetail && selectedNode && (selectedNode.examInfoId || selectedNode.sub) && (
        <ExamInfoSheet
          node={selectedNode}
          onClose={() => { setSelected(null); setShowDetail(false); }}
        />
      )}
    </div>
  );
}

/**
 * Collapsible mindmap wrapper - shows a "Bekijk denkschema" toggle
 * Use this for embedding in primaire teksten and rode draad views.
 */
export function CollapsibleMindMap({ mindmap, label = "Bekijk denkschema" }) {
  const [open, setOpen] = useState(false);
  if (!mindmap) return null;

  return (
    <div style={{ margin: "12px 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          width: "100%", background: open ? "#f0f4ff" : "#f8f8fc",
          border: "1px solid #e0e8f5", borderRadius: "8px",
          padding: "10px 14px", cursor: "pointer", textAlign: "left",
          fontSize: "12px", fontWeight: 600, color: "#4A90D9",
          transition: "background 0.15s",
        }}
      >
        <span style={{ fontSize: "14px" }}>🗺️</span>
        <span style={{ flex: 1 }}>{label}</span>
        <span style={{ fontSize: "12px", color: "#999" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ marginTop: "8px" }}>
          <MindMapCard mindmap={mindmap} compact />
        </div>
      )}
    </div>
  );
}
