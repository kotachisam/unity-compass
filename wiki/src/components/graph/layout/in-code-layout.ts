export interface LayoutNode {
  id: string
  type: string
  is_ghost: boolean
  period_year?: number | null
  birth_year?: number | null
  death_year?: number | null
}

export interface LayoutEdge {
  source: string
  target: string
}

export interface PositionedNode {
  id: string
  x: number
  y: number
  effective_year: number | null
  position_provenance: "explicit" | "inferred" | "no-date"
}

const TYPE_ORDER = ["person", "concept", "theory", "work", "event", "case-study", "institution", "source", "ghost"]
const NODE_WIDTH = 110
const NODE_HEIGHT = 80
const X_OVERLAP_PAD = 14
const Y_OVERLAP_PAD = 10
const ROW_STEP = NODE_HEIGHT + Y_OVERLAP_PAD
const X_PADDING = 100
const NO_DATE_LANE_WIDTH = 280
const PIXELS_PER_YEAR = 9
const MIN_TIMELINE_WIDTH = 3600
const BAND_PADDING_TOP = 56
const BAND_INNER_PADDING = 28
const BAND_GAP = 18

function getYear(node: LayoutNode): number | null {
  if (typeof node.period_year === "number") return node.period_year
  if (typeof node.birth_year === "number") return node.birth_year
  return null
}

function inferYearByNeighbours(
  unpinned: Set<string>,
  yearByNode: Map<string, number>,
  edges: LayoutEdge[],
): Map<string, number> {
  const inferred = new Map<string, number>()
  const adjacency = new Map<string, Set<string>>()
  for (const e of edges) {
    if (!adjacency.has(e.source)) adjacency.set(e.source, new Set())
    if (!adjacency.has(e.target)) adjacency.set(e.target, new Set())
    adjacency.get(e.source)!.add(e.target)
    adjacency.get(e.target)!.add(e.source)
  }
  let changed = true
  let pass = 0
  while (changed && pass < 5) {
    changed = false
    pass++
    for (const id of unpinned) {
      if (inferred.has(id)) continue
      const neighbours = adjacency.get(id) ?? new Set()
      const dated = [...neighbours].map((n) => yearByNode.get(n) ?? inferred.get(n)).filter((y): y is number => typeof y === "number")
      if (dated.length > 0) {
        inferred.set(id, Math.round(dated.reduce((a, b) => a + b, 0) / dated.length))
        changed = true
      }
    }
  }
  return inferred
}

export interface LayoutResult {
  positions: Record<string, PositionedNode>
  bounds: { width: number; height: number; minYear: number; maxYear: number; noDateX: number }
  bands: Record<string, { y: number; height: number }>
}

export function computeLayout(nodes: LayoutNode[], edges: LayoutEdge[]): LayoutResult {
  const yearByNode = new Map<string, number>()
  for (const n of nodes) {
    const y = getYear(n)
    if (y !== null) yearByNode.set(n.id, y)
  }

  const unpinned = new Set<string>()
  for (const n of nodes) {
    if (!yearByNode.has(n.id)) unpinned.add(n.id)
  }
  const inferred = inferYearByNeighbours(unpinned, yearByNode, edges)

  const allYears = [...yearByNode.values(), ...inferred.values()]
  const minYear = allYears.length ? Math.min(...allYears) : 0
  const maxYear = allYears.length ? Math.max(...allYears) : new Date().getFullYear()
  const yearSpan = Math.max(1, maxYear - minYear)
  const timelineWidth = Math.max(MIN_TIMELINE_WIDTH, yearSpan * PIXELS_PER_YEAR)

  function yearToX(year: number): number {
    return X_PADDING + ((year - minYear) / yearSpan) * timelineWidth
  }

  const noDateX = X_PADDING + timelineWidth + 120
  const totalWidth = noDateX + NO_DATE_LANE_WIDTH

  const presentTypes = [...new Set(nodes.map((n) => (n.is_ghost ? "ghost" : n.type)))]
  const typeOrder = TYPE_ORDER.filter((t) => presentTypes.includes(t))

  const nodesByBand = new Map<string, LayoutNode[]>()
  for (const t of typeOrder) nodesByBand.set(t, [])
  for (const n of nodes) {
    const t = n.is_ghost ? "ghost" : n.type
    nodesByBand.get(t)?.push(n)
  }

  const bands: Record<string, { y: number; height: number }> = {}
  const positions: Record<string, PositionedNode> = {}

  let bandTop = BAND_PADDING_TOP

  for (const t of typeOrder) {
    const bandNodes = (nodesByBand.get(t) ?? []).slice().sort((a, b) => {
      const ya = yearByNode.get(a.id) ?? inferred.get(a.id) ?? Number.MAX_SAFE_INTEGER
      const yb = yearByNode.get(b.id) ?? inferred.get(b.id) ?? Number.MAX_SAFE_INTEGER
      return ya - yb
    })

    const placed: { x: number; y: number }[] = []
    let bandMaxY = bandTop

    for (const n of bandNodes) {
      const explicitYear = yearByNode.get(n.id)
      const inferredYear = inferred.get(n.id)
      const effectiveYear = explicitYear ?? inferredYear ?? null
      const provenance: PositionedNode["position_provenance"] =
        explicitYear !== undefined ? "explicit" : inferredYear !== undefined ? "inferred" : "no-date"

      const x = effectiveYear !== null ? yearToX(effectiveYear) : noDateX

      let y = bandTop
      let attempt = 0
      while (
        placed.some((p) =>
          Math.abs(p.x - x) < NODE_WIDTH + X_OVERLAP_PAD &&
          Math.abs(p.y - y) < NODE_HEIGHT + Y_OVERLAP_PAD
        ) &&
        attempt < 200
      ) {
        y += ROW_STEP
        attempt++
      }

      placed.push({ x, y })
      positions[n.id] = { id: n.id, x, y, effective_year: effectiveYear, position_provenance: provenance }
      if (y + NODE_HEIGHT > bandMaxY) bandMaxY = y + NODE_HEIGHT
    }

    const bandHeight = bandMaxY - bandTop + BAND_INNER_PADDING
    bands[t] = { y: bandTop, height: bandHeight }
    bandTop = bandMaxY + BAND_GAP
  }

  const totalHeight = bandTop + 60

  return {
    positions,
    bounds: { width: totalWidth, height: totalHeight, minYear, maxYear, noDateX },
    bands,
  }
}

export const LAYOUT_CONSTANTS = {
  NODE_WIDTH,
  NODE_HEIGHT,
}
