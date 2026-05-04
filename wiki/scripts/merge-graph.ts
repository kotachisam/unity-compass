import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const generatedDir = path.join(__dirname, "..", "src", "content", "articles", "_generated")

interface AbsorbedNode {
  slug: string
  title: string
  type: string
  word_count: number
  is_stub: boolean
  in_degree: number
  out_degree: number
  wikidata_qid: string | null
  period_year: number | null
  is_ghost: false
}

interface AbsorbedEdge {
  source: string
  target: string
  type: string
  provenance: string
  note?: string
}

interface AbsorbedGraph {
  generated: string
  stats: Record<string, unknown>
  nodes: AbsorbedNode[]
  edges: AbsorbedEdge[]
}

interface GhostNode {
  qid: string
  label: string
  description: string
  type: string
  period_year: number | null
  birth_year: number | null
  death_year: number | null
  sitelinks: number
  is_ghost: true
}

interface GhostEdge {
  source: string
  target: string
  type: string
  provenance: "wikidata" | "derived"
  property?: string
  note?: string
}

interface SeedMetadata {
  qid: string
  label: string
  description: string
  birth_year: number | null
  death_year: number | null
  sitelinks: number
}

interface WikidataIndex {
  generated: string
  ghost_nodes: GhostNode[]
  ghost_edges: GhostEdge[]
  contemporaries: { source: string; target: string; shared_field: string }[]
  seed_metadata?: Record<string, SeedMetadata>
}

interface MergedNode {
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

interface MergedEdge {
  source: string
  target: string
  type: string
  provenance: string
  property?: string
  note?: string
}

const graphPath = path.join(generatedDir, "_graph.json")
const wikidataPath = path.join(generatedDir, "_wikidata.json")

if (!fs.existsSync(graphPath)) {
  console.error(`Missing ${graphPath}. Run \`bun run rebuild\` first.`)
  process.exit(1)
}

const absorbed = JSON.parse(fs.readFileSync(graphPath, "utf8")) as AbsorbedGraph
const wikidata: WikidataIndex = fs.existsSync(wikidataPath)
  ? (JSON.parse(fs.readFileSync(wikidataPath, "utf8")) as WikidataIndex)
  : { generated: "", ghost_nodes: [], ghost_edges: [], contemporaries: [], seed_metadata: {} }
const seedMeta = wikidata.seed_metadata ?? {}

const qidToSlug = new Map<string, string>()
for (const n of absorbed.nodes) {
  if (n.wikidata_qid) qidToSlug.set(n.wikidata_qid, n.slug)
}

function remap(id: string): string {
  return qidToSlug.get(id) ?? id
}

let backfilled = 0
const mergedNodes: MergedNode[] = absorbed.nodes.map((n) => {
  let effectiveYear = n.period_year
  if (effectiveYear === null && n.wikidata_qid && seedMeta[n.wikidata_qid]) {
    const meta = seedMeta[n.wikidata_qid]
    if (meta.birth_year !== null) {
      effectiveYear = meta.birth_year
      backfilled++
    }
  }
  return {
    id: n.slug,
    label: n.title,
    type: n.type,
    is_ghost: false,
    period_year: effectiveYear,
    word_count: n.word_count,
    is_stub: n.is_stub,
    in_degree: n.in_degree,
    out_degree: n.out_degree,
    wikidata_qid: n.wikidata_qid,
  }
})

const absorbedQids = new Set(absorbed.nodes.map((n) => n.wikidata_qid).filter(Boolean) as string[])

const GHOST_GLOBAL_CAP = 60
const GHOST_MIN_SITELINKS = 5

const eligibleGhosts = wikidata.ghost_nodes
  .filter((g) => !absorbedQids.has(g.qid))
  .filter((g) => g.sitelinks >= GHOST_MIN_SITELINKS)
  .sort((a, b) => b.sitelinks - a.sitelinks)
  .slice(0, GHOST_GLOBAL_CAP)

for (const g of eligibleGhosts) {
  mergedNodes.push({
    id: g.qid,
    label: g.label,
    type: g.type,
    is_ghost: true,
    period_year: g.period_year,
    description: g.description,
    sitelinks: g.sitelinks,
    birth_year: g.birth_year,
    death_year: g.death_year,
  })
}

const seenEdges = new Set<string>()
const mergedEdges: MergedEdge[] = []

function pushEdge(e: MergedEdge) {
  const key = `${e.source}→${e.target}|${e.type}|${e.provenance}`
  if (seenEdges.has(key)) return
  if (e.source === e.target) return
  seenEdges.add(key)
  mergedEdges.push(e)
}

for (const e of absorbed.edges) {
  pushEdge({ source: e.source, target: e.target, type: e.type, provenance: e.provenance, ...(e.note ? { note: e.note } : {}) })
}

const validIds = new Set(mergedNodes.map((n) => n.id))

for (const e of wikidata.ghost_edges) {
  const source = remap(e.source)
  const target = remap(e.target)
  if (!validIds.has(source) || !validIds.has(target)) continue
  pushEdge({
    source,
    target,
    type: e.type,
    provenance: e.provenance,
    ...(e.property ? { property: e.property } : {}),
    ...(e.note ? { note: e.note } : {}),
  })
}

for (const c of wikidata.contemporaries) {
  const source = remap(c.source)
  const target = remap(c.target)
  if (!validIds.has(source) || !validIds.has(target)) continue
  pushEdge({
    source,
    target,
    type: "contemporary_of",
    provenance: "derived",
    note: `shared field of work: ${c.shared_field}`,
  })
}

const stats = {
  total_nodes: mergedNodes.length,
  absorbed_nodes: mergedNodes.filter((n) => !n.is_ghost).length,
  ghost_nodes: mergedNodes.filter((n) => n.is_ghost).length,
  total_edges: mergedEdges.length,
  edges_by_type: Object.fromEntries(
    Object.entries(
      mergedEdges.reduce<Record<string, number>>((acc, e) => {
        acc[e.type] = (acc[e.type] ?? 0) + 1
        return acc
      }, {})
    ).sort((a, b) => b[1] - a[1])
  ),
  edges_by_provenance: Object.fromEntries(
    Object.entries(
      mergedEdges.reduce<Record<string, number>>((acc, e) => {
        acc[e.provenance] = (acc[e.provenance] ?? 0) + 1
        return acc
      }, {})
    )
  ),
}

const fullGraph = {
  generated: new Date().toISOString(),
  stats,
  nodes: mergedNodes,
  edges: mergedEdges,
}

fs.writeFileSync(path.join(generatedDir, "_full_graph.json"), JSON.stringify(fullGraph, null, 2))

const publicDir = path.join(__dirname, "..", "public")
fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, "_full_graph.json"), JSON.stringify(fullGraph))

console.log(`Nodes: ${stats.total_nodes} (${stats.absorbed_nodes} absorbed + ${stats.ghost_nodes} ghost) — ${backfilled} dates backfilled from Wikidata`)
console.log(`Edges: ${stats.total_edges}`)
console.log(`By type: ${Object.entries(stats.edges_by_type).map(([t, n]) => `${t}=${n}`).join(", ")}`)
console.log(`By provenance: ${Object.entries(stats.edges_by_provenance).map(([p, n]) => `${p}=${n}`).join(", ")}`)
console.log(`Wrote src/content/articles/_generated/_full_graph.json`)
