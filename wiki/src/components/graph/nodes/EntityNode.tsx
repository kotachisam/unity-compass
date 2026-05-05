import { Handle, Position, type NodeProps } from "@xyflow/react"
import { TYPE_COLOURS } from "../styles"

export interface EntityNodeData {
  label: string
  type: string
  is_ghost: boolean
  is_stub?: boolean
  word_count?: number
  position_provenance?: "explicit" | "inferred" | "no-date"
  effective_year?: number | null
  description?: string
}

const SIZE_BY_DEGREE = (wc?: number) => {
  if (typeof wc !== "number") return { w: 110, h: 80 }
  const scale = Math.min(1.3, Math.max(0.9, Math.sqrt(wc) / 30))
  return { w: Math.round(110 * scale), h: Math.round(80 * scale) }
}

export default function EntityNode({ data }: NodeProps) {
  const d = data as unknown as EntityNodeData
  const colour = TYPE_COLOURS[d.is_ghost ? "ghost" : d.type] ?? "#6b7280"
  const isGhost = d.is_ghost
  const isInferred = d.position_provenance === "inferred"
  const isStub = d.is_stub === true

  const { w, h } = isGhost ? { w: 96, h: 64 } : SIZE_BY_DEGREE(d.word_count)

  const style: React.CSSProperties = {
    width: w,
    height: h,
    background: isGhost
      ? "color-mix(in srgb, var(--paper) 92%, transparent)"
      : `color-mix(in srgb, ${colour} 14%, var(--paper))`,
    border: `${isGhost ? "1.5px dashed" : "2px solid"} ${colour}`,
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: isGhost ? 11 : 12,
    fontStyle: isGhost ? "italic" : "normal",
    color: isStub ? "var(--ink-faint)" : "var(--ink)",
    opacity: isGhost ? 0.78 : 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 1.15,
    cursor: "pointer",
    boxShadow: isInferred
      ? "0 0 0 2px var(--halo)"
      : "0 1px 2px rgba(0,0,0,0.06)",
    fontFamily: "var(--font-sans)",
  }

  return (
    <div style={style} title={d.description ?? d.label}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div
        style={{
          fontWeight: 500,
          width: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          wordBreak: "break-word",
          hyphens: "auto",
        }}
      >
        {d.label}
      </div>
      {d.effective_year !== null && d.effective_year !== undefined && !isGhost && (
        <div style={{ fontSize: 9, color: "var(--ink-faint)", marginTop: 2, fontFamily: "var(--font-mono)" }}>
          {d.effective_year}{isInferred ? " ~" : ""}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  )
}
