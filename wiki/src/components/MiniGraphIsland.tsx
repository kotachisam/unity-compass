import { useEffect, useMemo, useRef, useState } from "react"
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeMouseHandler,
  type Viewport,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { computeLayout, type LayoutNode, type LayoutEdge } from "./graph/layout/in-code-layout"
import EntityNode, { type EntityNodeData } from "./graph/nodes/EntityNode"
import { EDGE_COLOURS } from "./graph/styles"

interface GraphNodeRaw {
  id: string
  label: string
  type: string
  is_ghost: boolean
  period_year: number | null
  word_count?: number
  is_stub?: boolean
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
}

interface FullGraph {
  nodes: GraphNodeRaw[]
  edges: GraphEdgeRaw[]
}

const NODE_TYPES = { entity: EntityNode }

interface MiniGraphIslandProps {
  slug: string
  radius?: number
}

const NODE_W = 110
const NODE_H = 80
const FRAME_HEIGHT = 380

export default function MiniGraphIsland({ slug, radius = 1 }: MiniGraphIslandProps) {
  const [graph, setGraph] = useState<FullGraph | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 700, h: FRAME_HEIGHT })

  useEffect(() => {
    if (!wrapperRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ w: Math.max(280, width), h: Math.max(220, height) })
      }
    })
    ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    fetch("/_full_graph.json")
      .then((r) => r.json() as Promise<FullGraph>)
      .then(setGraph)
      .catch((e) => console.error("Failed to load mini-graph:", e))
  }, [])

  const slice = useMemo(() => {
    if (!graph) return null
    const adjacency = new Map<string, Set<string>>()
    for (const e of graph.edges) {
      if (!adjacency.has(e.source)) adjacency.set(e.source, new Set())
      if (!adjacency.has(e.target)) adjacency.set(e.target, new Set())
      adjacency.get(e.source)!.add(e.target)
      adjacency.get(e.target)!.add(e.source)
    }
    const visible = new Set<string>([slug])
    let frontier = new Set<string>([slug])
    for (let i = 0; i < radius; i++) {
      const next = new Set<string>()
      for (const id of frontier) {
        for (const neighbour of adjacency.get(id) ?? []) {
          if (!visible.has(neighbour)) {
            visible.add(neighbour)
            next.add(neighbour)
          }
        }
      }
      frontier = next
    }
    const nodes = graph.nodes.filter((n) => visible.has(n.id))
    const edges = graph.edges.filter((e) => visible.has(e.source) && visible.has(e.target))
    return { nodes, edges }
  }, [graph, slug, radius])

  const layout = useMemo(() => {
    if (!slice) return null
    const layoutNodes: LayoutNode[] = slice.nodes.map((n) => ({
      id: n.id,
      type: n.type,
      is_ghost: n.is_ghost,
      period_year: n.period_year,
      birth_year: n.birth_year,
      death_year: n.death_year,
    }))
    const layoutEdges: LayoutEdge[] = slice.edges.map((e) => ({ source: e.source, target: e.target }))
    return computeLayout(layoutNodes, layoutEdges)
  }, [slice])

  const { rfNodes, rfEdges } = useMemo(() => {
    if (!slice || !layout) return { rfNodes: [] as Node[], rfEdges: [] as Edge[] }
    const rfNodes: Node[] = slice.nodes.map((n) => {
      const pos = layout.positions[n.id]
      const isCentre = n.id === slug
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
        style: isCentre
          ? { boxShadow: "0 0 0 3px var(--halo), 0 0 0 5px var(--gilt)" }
          : undefined,
      }
    })
    const rfEdges: Edge[] = slice.edges.map((e, i) => ({
      id: `e${i}`,
      source: e.source,
      target: e.target,
      type: "default",
      style: {
        stroke: EDGE_COLOURS[e.type] ?? "#cbd5e1",
        strokeWidth: 1.4,
        strokeDasharray: e.provenance === "wikidata" ? "5 3" : e.provenance === "derived" ? "2 2" : undefined,
        opacity: 0.6,
      },
    }))
    return { rfNodes, rfEdges }
  }, [slice, layout, slug])

  const onNodeClick: NodeMouseHandler = (_, node) => {
    const raw = slice?.nodes.find((n) => n.id === node.id)
    if (!raw) return
    if (raw.is_ghost) {
      window.open(`https://www.wikidata.org/wiki/${raw.id}`, "_blank")
    } else if (raw.id !== slug) {
      window.location.href = `/wiki/${raw.id}`
    }
  }

  if (!slice || !layout) return <div style={{ padding: 16, color: "var(--ink-faint)", fontSize: 13 }}>Loading neighbourhood…</div>
  if (slice.nodes.length <= 1) {
    return <div style={{ padding: 16, color: "var(--ink-faint)", fontSize: 13 }}>No connected neighbours yet.</div>
  }

  const centrePos = layout.positions[slug]
  const xs = Object.values(layout.positions).map((p) => p.x)
  const ys = Object.values(layout.positions).map((p) => p.y)
  const xSpan = Math.max(1, Math.max(...xs) - Math.min(...xs))
  const ySpan = Math.max(1, Math.max(...ys) - Math.min(...ys))
  const zoomFit = Math.min(size.w / (xSpan + NODE_W + 100), size.h / (ySpan + NODE_H + 100), 1)
  const zoom = Math.max(0.5, Math.min(0.95, zoomFit))
  const cx = (centrePos?.x ?? 0) + NODE_W / 2
  const cy = (centrePos?.y ?? 0) + NODE_H / 2
  const defaultViewport: Viewport = {
    x: size.w / 2 - cx * zoom,
    y: size.h / 2 - cy * zoom,
    zoom,
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: FRAME_HEIGHT,
        border: "1px solid var(--rule-soft)",
        borderRadius: "var(--r-2)",
        overflow: "hidden",
        background: "var(--paper-tint)",
      }}
    >
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={NODE_TYPES}
        onNodeClick={onNodeClick}
        defaultViewport={defaultViewport}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        panOnDrag
        zoomOnScroll={false}
      >
        <Background gap={30} size={1} color="#e5e7eb" />
      </ReactFlow>
    </div>
  )
}
