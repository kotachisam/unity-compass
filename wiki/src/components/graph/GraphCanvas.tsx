import { useEffect, useMemo, useState } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { computeLayout, type LayoutNode, type LayoutEdge } from "./layout/in-code-layout"
import EntityNode, { type EntityNodeData } from "./nodes/EntityNode"
import {
  EDGE_COLOURS,
  TYPE_COLOURS,
  TYPE_LABELS,
  TIER_1_EDGE_TYPES,
  DEFAULT_OFF_EDGE_TYPES,
} from "./styles"

interface GraphNodeRaw {
  id: string
  label: string
  type: string
  is_ghost: boolean
  period_year: number | null
  word_count?: number
  is_stub?: boolean
  in_degree?: number
  out_degree?: number
  wikidata_qid?: string | null
  description?: string
  sitelinks?: number
  birth_year?: number | null
  death_year?: number | null
}

interface GraphEdgeRaw {
  source: string
  target: string
  type: string
  provenance: string
  property?: string
  note?: string
}

interface FullGraph {
  generated: string
  stats: {
    total_nodes: number
    absorbed_nodes: number
    ghost_nodes: number
    total_edges: number
    edges_by_type: Record<string, number>
    edges_by_provenance: Record<string, number>
  }
  nodes: GraphNodeRaw[]
  edges: GraphEdgeRaw[]
}

const NODE_TYPES = { entity: EntityNode }

export default function GraphCanvas() {
  const [graph, setGraph] = useState<FullGraph | null>(null)
  const [showInferred, setShowInferred] = useState(true)
  const [showGhosts, setShowGhosts] = useState(true)
  const [enabledEdges, setEnabledEdges] = useState<Set<string>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/_full_graph.json")
      .then((r) => r.json() as Promise<FullGraph>)
      .then((g) => {
        setGraph(g)
        const allTypes = Object.keys(g.stats.edges_by_type)
        const initial = new Set(allTypes.filter((t) => !DEFAULT_OFF_EDGE_TYPES.has(t)))
        setEnabledEdges(initial)
      })
      .catch((e) => console.error("Failed to load graph:", e))
  }, [])

  const layout = useMemo(() => {
    if (!graph) return null
    const layoutNodes: LayoutNode[] = graph.nodes.map((n) => ({
      id: n.id,
      type: n.type,
      is_ghost: n.is_ghost,
      period_year: n.period_year,
      birth_year: n.birth_year,
      death_year: n.death_year,
    }))
    const layoutEdges: LayoutEdge[] = graph.edges.map((e) => ({ source: e.source, target: e.target }))
    return computeLayout(layoutNodes, layoutEdges)
  }, [graph])

  const visibleNodeIds = useMemo(() => {
    if (!graph || !layout) return new Set<string>()
    return new Set(
      graph.nodes
        .filter((n) => {
          if (!showGhosts && n.is_ghost) return false
          const pos = layout.positions[n.id]
          if (!showInferred && pos?.position_provenance === "inferred") return false
          return true
        })
        .map((n) => n.id)
    )
  }, [graph, layout, showGhosts, showInferred])

  const rfNodes = useMemo<Node[]>(() => {
    if (!graph || !layout) return []
    return graph.nodes
      .filter((n) => visibleNodeIds.has(n.id))
      .map((n) => {
        const pos = layout.positions[n.id]
        const data: EntityNodeData = {
          label: n.label,
          type: n.type,
          is_ghost: n.is_ghost,
          is_stub: n.is_stub,
          word_count: n.word_count,
          position_provenance: pos?.position_provenance,
          effective_year: pos?.effective_year,
          description: n.description,
        }
        return {
          id: n.id,
          type: "entity",
          position: { x: pos?.x ?? 0, y: pos?.y ?? 0 },
          data: data as unknown as Record<string, unknown>,
        }
      })
  }, [graph, layout, visibleNodeIds])

  const oneHopNeighbours = useMemo(() => {
    const set = new Set<string>()
    if (!hoveredId || !graph) return set
    for (const e of graph.edges) {
      if (e.source === hoveredId) set.add(e.target)
      if (e.target === hoveredId) set.add(e.source)
    }
    set.add(hoveredId)
    return set
  }, [hoveredId, graph])

  const rfEdges = useMemo<Edge[]>(() => {
    if (!graph) return []
    return graph.edges
      .filter((e) => enabledEdges.has(e.type))
      .filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map((e, i) => {
        const isHighlighted =
          hoveredId !== null &&
          oneHopNeighbours.has(e.source) &&
          oneHopNeighbours.has(e.target)
        const isDimmed = hoveredId !== null && !isHighlighted
        const colour = EDGE_COLOURS[e.type] ?? "#cbd5e1"
        return {
          id: `e${i}`,
          source: e.source,
          target: e.target,
          type: "default",
          animated: false,
          style: {
            stroke: colour,
            strokeWidth: isHighlighted ? 2 : e.provenance === "absorbed" ? 1.4 : 1,
            strokeDasharray:
              e.provenance === "wikidata" ? "5 3" : e.provenance === "derived" ? "2 2" : undefined,
            opacity: isDimmed ? 0.08 : isHighlighted ? 0.95 : 0.6,
          },
        }
      })
  }, [graph, enabledEdges, visibleNodeIds, hoveredId, oneHopNeighbours])

  const onNodeClick: NodeMouseHandler = (_, node) => {
    const raw = graph?.nodes.find((n) => n.id === node.id)
    if (!raw) return
    if (raw.is_ghost) {
      window.open(`https://www.wikidata.org/wiki/${raw.id}`, "_blank")
    } else {
      window.location.href = `/wiki/${raw.id}`
    }
  }

  if (!graph || !layout) {
    return <div style={{ padding: 24, fontFamily: "ui-sans-serif" }}>Loading graph…</div>
  }

  const absorbedYears = graph.nodes
    .filter((n) => !n.is_ghost)
    .map((n) => layout.positions[n.id]?.effective_year)
    .filter((y): y is number => typeof y === "number")
  const medianYear = absorbedYears.length
    ? absorbedYears.sort((a, b) => a - b)[Math.floor(absorbedYears.length / 2)]
    : (layout.bounds.minYear + layout.bounds.maxYear) / 2
  const yearSpan = Math.max(1, layout.bounds.maxYear - layout.bounds.minYear)
  const medianX = ((medianYear - layout.bounds.minYear) / yearSpan) * layout.bounds.width

  const allEdgeTypes = Object.keys(graph.stats.edges_by_type).sort()
  const tier1 = allEdgeTypes.filter((t) => TIER_1_EDGE_TYPES.has(t))
  const tier2 = allEdgeTypes.filter((t) => !TIER_1_EDGE_TYPES.has(t))

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <aside style={{
        width: 280,
        borderRight: "1px solid #e5e7eb",
        background: "#fafafa",
        padding: 18,
        fontSize: 13,
        overflowY: "auto",
        flexShrink: 0,
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 4 }}>Graph view</h2>
        <div style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
          {graph.stats.absorbed_nodes} absorbed + {graph.stats.ghost_nodes} ghost · {graph.stats.total_edges} edges
        </div>

        <h3 style={{ fontSize: 11, textTransform: "uppercase", color: "#6b7280", margin: "18px 0 8px", letterSpacing: "0.04em" }}>Node visibility</h3>
        <Toggle label={`Show Wikidata ghosts (${graph.stats.ghost_nodes})`} on={showGhosts} onChange={setShowGhosts} />
        <Toggle label="Show inferred-position nodes" on={showInferred} onChange={setShowInferred} />

        <h3 style={{ fontSize: 11, textTransform: "uppercase", color: "#6b7280", margin: "18px 0 8px", letterSpacing: "0.04em" }}>Edges (high-signal)</h3>
        {tier1.map((t) => (
          <EdgeToggle
            key={t}
            type={t}
            count={graph.stats.edges_by_type[t]}
            on={enabledEdges.has(t)}
            onChange={(v) => {
              const next = new Set(enabledEdges)
              if (v) next.add(t); else next.delete(t)
              setEnabledEdges(next)
            }}
          />
        ))}

        <h3 style={{ fontSize: 11, textTransform: "uppercase", color: "#6b7280", margin: "18px 0 8px", letterSpacing: "0.04em" }}>Edges (sidekick, off by default)</h3>
        {tier2.map((t) => (
          <EdgeToggle
            key={t}
            type={t}
            count={graph.stats.edges_by_type[t]}
            on={enabledEdges.has(t)}
            onChange={(v) => {
              const next = new Set(enabledEdges)
              if (v) next.add(t); else next.delete(t)
              setEnabledEdges(next)
            }}
          />
        ))}

        <h3 style={{ fontSize: 11, textTransform: "uppercase", color: "#6b7280", margin: "18px 0 8px", letterSpacing: "0.04em" }}>Type bands</h3>
        {Object.keys(layout.bands).map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 0" }}>
            <span style={{
              width: 10, height: 10, borderRadius: 2,
              background: TYPE_COLOURS[t] ?? "#888",
              border: t === "ghost" ? "1px dashed #888" : "none",
            }} />
            <span>{TYPE_LABELS[t] ?? t}</span>
          </div>
        ))}
      </aside>

      <div style={{ flex: 1, height: "100vh" }}>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={NODE_TYPES}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={(_, n) => setHoveredId(n.id)}
          onNodeMouseLeave={() => setHoveredId(null)}
          defaultViewport={{ x: -medianX * 0.65 + 600, y: -50, zoom: 0.65 }}
          minZoom={0.05}
          maxZoom={3}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={50} size={1} color="#e5e7eb" />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              const data = n.data as unknown as EntityNodeData
              return TYPE_COLOURS[data.is_ghost ? "ghost" : data.type] ?? "#888"
            }}
            nodeColor={(n) => {
              const data = n.data as unknown as EntityNodeData
              return data.is_ghost ? "#fff" : (TYPE_COLOURS[data.type] ?? "#888")
            }}
            pannable
            zoomable
          />
        </ReactFlow>
      </div>
    </div>
  )
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", fontSize: 13 }}>
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

function EdgeToggle({ type, count, on, onChange }: { type: string; count: number; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", fontSize: 13 }}>
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span style={{ width: 18, height: 3, background: EDGE_COLOURS[type] ?? "#888", borderRadius: 1 }} />
      <span style={{ flex: 1 }}>{type}</span>
      <span style={{ color: "#9ca3af", fontSize: 12 }}>{count}</span>
    </label>
  )
}
