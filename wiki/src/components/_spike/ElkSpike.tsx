import { useEffect, useState } from "react"
import { ReactFlow, Background, Controls, type Node, type Edge } from "@xyflow/react"
import ELK, { type ElkNode, type ElkExtendedEdge } from "elkjs/lib/elk.bundled.js"
import "@xyflow/react/dist/style.css"

interface SeedNode {
  id: string
  label: string
  year: number
}

interface SeedEdge {
  source: string
  target: string
  type: string
}

const SEEDS: SeedNode[] = [
  { id: "heraclitus", label: "Heraclitus", year: -500 },
  { id: "kant", label: "Kant", year: 1724 },
  { id: "olson", label: "Olson", year: 1932 },
  { id: "schelling", label: "Schelling", year: 1921 },
  { id: "ostrom", label: "Ostrom", year: 1933 },
  { id: "axelrod", label: "Axelrod", year: 1943 },
  { id: "bradley", label: "Bradley", year: 1965 },
  { id: "alexander", label: "Alexander", year: 1971 },
]

const EDGES: SeedEdge[] = [
  { source: "heraclitus", target: "kant", type: "influenced" },
  { source: "kant", target: "olson", type: "influenced" },
  { source: "kant", target: "schelling", type: "influenced" },
  { source: "schelling", target: "axelrod", type: "influenced" },
  { source: "olson", target: "ostrom", type: "influenced" },
  { source: "schelling", target: "bradley", type: "influenced" },
  { source: "bradley", target: "alexander", type: "doctoral_student" },
]

const X_PER_YEAR = 1.5
const X_OFFSET = 1500

function yearToX(year: number): number {
  return X_OFFSET + year * X_PER_YEAR
}

const elk = new ELK()

interface LayoutResult {
  nodes: Node[]
  edges: Edge[]
  diagnostics: { id: string; expectedX: number; actualX: number; drift: number }[]
}

async function runLayout(): Promise<LayoutResult> {
  const elkNodes: ElkNode[] = SEEDS.map((s) => ({
    id: s.id,
    width: 140,
    height: 50,
    x: yearToX(s.year),
    y: 0,
    layoutOptions: {
      "elk.position": `(${yearToX(s.year)},0)`,
    },
  }))

  const elkEdges: ElkExtendedEdge[] = EDGES.map((e, i) => ({
    id: `e${i}`,
    sources: [e.source],
    targets: [e.target],
  }))

  const graph: ElkNode = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.layered.layering.strategy": "INTERACTIVE",
      "elk.layered.nodePlacement.strategy": "INTERACTIVE",
      "elk.layered.crossingMinimization.semiInteractive": "true",
      "elk.spacing.nodeNode": "30",
      "elk.layered.spacing.nodeNodeBetweenLayers": "20",
    },
    children: elkNodes,
    edges: elkEdges,
  }

  const layouted = await elk.layout(graph)
  const childById = new Map<string, ElkNode>()
  for (const c of layouted.children ?? []) childById.set(c.id, c)

  const diagnostics: LayoutResult["diagnostics"] = SEEDS.map((s) => {
    const elkNode = childById.get(s.id)
    const expectedX = yearToX(s.year)
    const actualX = elkNode?.x ?? -1
    return { id: s.id, expectedX, actualX, drift: Math.round(actualX - expectedX) }
  })

  const nodes: Node[] = SEEDS.map((s) => {
    const elkNode = childById.get(s.id)!
    return {
      id: s.id,
      position: { x: elkNode.x ?? 0, y: elkNode.y ?? 0 },
      data: { label: `${s.label} (${s.year})` },
      style: {
        width: 140,
        height: 50,
        background: "#fff",
        border: "2px solid #3b82f6",
        borderRadius: 6,
        padding: 8,
        fontSize: 12,
        textAlign: "center" as const,
      },
    }
  })

  const edges: Edge[] = EDGES.map((e, i) => ({
    id: `e${i}`,
    source: e.source,
    target: e.target,
    type: "default",
    label: e.type,
    labelStyle: { fontSize: 10, fill: "#6b7280" },
  }))

  return { nodes, edges, diagnostics }
}

export default function ElkSpike() {
  const [result, setResult] = useState<LayoutResult | null>(null)

  useEffect(() => {
    runLayout().then(setResult).catch(console.error)
  }, [])

  if (!result) return <div style={{ padding: 24 }}>Computing layout…</div>

  const maxDrift = Math.max(...result.diagnostics.map((d) => Math.abs(d.drift)))
  const verdict = maxDrift < 5 ? "✓ ELK honours position" : maxDrift < 50 ? "⚠ partial drift" : "✖ ELK ignored position"

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 12, background: "#f8f9fa", borderBottom: "1px solid #e5e7eb", fontFamily: "monospace", fontSize: 12 }}>
        <strong>ELK time-axis spike</strong> — {verdict} (max drift: {maxDrift}px)
        <table style={{ marginTop: 8, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e5e7eb" }}>
              <th style={{ padding: "4px 8px", textAlign: "left" }}>Node</th>
              <th style={{ padding: "4px 8px", textAlign: "right" }}>Expected X</th>
              <th style={{ padding: "4px 8px", textAlign: "right" }}>Actual X</th>
              <th style={{ padding: "4px 8px", textAlign: "right" }}>Drift</th>
            </tr>
          </thead>
          <tbody>
            {result.diagnostics.map((d) => (
              <tr key={d.id}>
                <td style={{ padding: "2px 8px" }}>{d.id}</td>
                <td style={{ padding: "2px 8px", textAlign: "right" }}>{d.expectedX.toFixed(0)}</td>
                <td style={{ padding: "2px 8px", textAlign: "right" }}>{d.actualX.toFixed(0)}</td>
                <td style={{ padding: "2px 8px", textAlign: "right", color: Math.abs(d.drift) > 5 ? "#dc2626" : "#16a34a" }}>{d.drift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ flex: 1 }}>
        <ReactFlow nodes={result.nodes} edges={result.edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}
