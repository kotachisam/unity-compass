import fs from "fs"
import path from "path"
import GraphView from "@/components/GraphView"

interface GraphNode {
  slug: string
  title: string
  type: string
  word_count: number
  is_stub: boolean
  in_degree: number
  out_degree: number
}

interface GraphEdge {
  source: string
  target: string
  type: string
  symmetric: boolean
}

interface Graph {
  generated: string
  stats: { nodes: number; edges: number; stubs: number; orphans: number }
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export const metadata = {
  title: "Graph · Unity Compass Wiki",
  description: "Force-directed visualisation of the wiki's structural relationships",
}

export default function GraphPage() {
  const graphPath = path.join(process.cwd(), "articles", "_graph.json")
  const graph: Graph = JSON.parse(fs.readFileSync(graphPath, "utf8"))

  return (
    <>
      <div className="wiki-tab-bar">
        <div className="wiki-tabs-left">
          <span className="wiki-tab active">Graph</span>
        </div>
        <div className="wiki-tabs-right" />
      </div>
      <GraphView graph={graph} />
    </>
  )
}
