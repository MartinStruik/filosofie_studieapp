import { useState } from "react";

/**
 * Interactive mindmap component rendered as SVG.
 * Nodes are clickable; tapping a filosoof-node shows details.
 * Designed for mobile: touch-friendly, scrollable, compact.
 */

const NODE_STYLES = {
  central: { fill: "#1a1a2e", textColor: "#fff", rx: 14, fontSize: 11, fontWeight: 700, padX: 16, padY: 10 },
  filosoof: { fill: "#fff", textColor: "#1a1a2e", rx: 10, fontSize: 10, fontWeight: 600, padX: 12, padY: 8, stroke: true },
  concept: { fill: "#f8f8fc", textColor: "#444", rx: 8, fontSize: 9, fontWeight: 400, padX: 10, padY: 6, stroke: true },
  label: { fill: "none", textColor: "#666", rx: 0, fontSize: 10, fontWeight: 700, padX: 8, padY: 4 },
  kwestie: { fill: "#fff", textColor: "#1a1a2e", rx: 12, fontSize: 10, fontWeight: 700, padX: 14, padY: 9, stroke: true },
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

function NodeRect({ node, style, isSelected, onTap }) {
  const s = NODE_STYLES[node.type] || NODE_STYLES.concept;
  const color = node.color || "#999";
  const measured = measureText(node.label, s.fontSize);
  const w = Math.max(measured.width, s.padX * 2 + 20);
  const h = measured.height + s.padY;
  const x = node.x;
  const y = node.y;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => onTap(node)}
      style={{ cursor: node.type === "filosoof" || node.sub ? "pointer" : "default" }}
    >
      {s.fill !== "none" && (
        <rect
          x={-w / 2} y={-h / 2} width={w} height={h}
          rx={s.rx} ry={s.rx}
          fill={node.type === "central" ? s.fill : s.fill}
          stroke={s.stroke ? color : "none"}
          strokeWidth={isSelected ? 2.5 : 1.5}
          opacity={isSelected ? 1 : 0.95}
        />
      )}
      {node.type === "central" && (
        <rect
          x={-w / 2} y={-h / 2} width={w} height={h}
          rx={s.rx} ry={s.rx}
          fill={color || s.fill}
          stroke="none"
        />
      )}
      {measured.lines.map((line, i) => (
        <text
          key={i}
          x={0} y={-((measured.lines.length - 1) * (s.fontSize + 3)) / 2 + i * (s.fontSize + 3) + s.fontSize * 0.35}
          textAnchor="middle"
          fontSize={s.fontSize}
          fontWeight={s.fontWeight}
          fill={node.type === "central" ? "#fff" : s.textColor}
          fontFamily="'Source Sans 3', sans-serif"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Edge({ from, to, edge, nodes }) {
  const n1 = nodes.find(n => n.id === edge.from);
  const n2 = nodes.find(n => n.id === edge.to);
  if (!n1 || !n2) return null;

  const isDashed = edge.style === "dashed";

  // Midpoint for label
  const mx = (n1.x + n2.x) / 2;
  const my = (n1.y + n2.y) / 2;

  return (
    <g>
      <line
        x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
        stroke={isDashed ? "#ccc" : "#ddd"}
        strokeWidth={1.2}
        strokeDasharray={isDashed ? "4 3" : "none"}
      />
      {edge.label && (
        <text
          x={mx} y={my - 4}
          textAnchor="middle"
          fontSize={8}
          fill="#999"
          fontFamily="'Source Sans 3', sans-serif"
          fontStyle="italic"
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}

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
    if (node.sub || node.type === "filosoof") {
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

      {/* Detail popup when filosoof is tapped */}
      {showDetail && selectedNode && selectedNode.sub && (
        <div style={{
          padding: "10px 16px 12px",
          borderTop: "1px solid #f0f0f5",
          background: "#fafafe",
          animation: "fadeIn 0.15s ease",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{
                fontSize: "12px", fontWeight: 700, color: selectedNode.color || "#1a1a2e",
              }}>
                {selectedNode.label}
              </span>
              <div style={{ fontSize: "12px", color: "#444", marginTop: "3px", lineHeight: 1.5 }}>
                {selectedNode.sub}
              </div>
            </div>
            <button
              onClick={() => { setSelected(null); setShowDetail(false); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "16px", color: "#999", padding: "4px 8px", marginRight: "-8px",
              }}
            >
              ×
            </button>
          </div>
        </div>
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
