import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const generatedDir = path.join(__dirname, "..", "src", "content", "articles", "_generated")
const cacheDir = path.join(__dirname, "..", ".wikidata-cache")
const SPARQL_URL = "https://query.wikidata.org/sparql"
const USER_AGENT = "unity-compass-wiki/0.1 (samuelknorton@gmail.com)"
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000
const NEIGHBOUR_CAP = 15
const REQUEST_DELAY_MS = 500

const PROPERTIES = {
  P737: "influenced_by",
  P184: "doctoral_advisor",
  P185: "doctoral_student",
  P50: "author_of",
  P800: "notable_work",
  P361: "part_of",
  P101: "field_of_work",
} as const

type PropId = keyof typeof PROPERTIES

interface AbsorbedNode {
  slug: string
  title: string
  type: string
  wikidata_qid: string | null
  period_year: number | null
  is_ghost: false
}

interface GraphData {
  nodes: AbsorbedNode[]
  edges: unknown[]
}

interface NeighbourRaw {
  qid: string
  label: string
  description: string
  property: PropId
  direction: "outbound" | "inbound"
  birth_year: number | null
  death_year: number | null
  sitelinks: number
  field_of_work_qids: string[]
}

interface SeedMetadata {
  qid: string
  label: string
  description: string
  birth_year: number | null
  death_year: number | null
  sitelinks: number
}

interface QidCache {
  qid: string
  fetched: string
  neighbours: NeighbourRaw[]
  seed?: SeedMetadata
}

interface SparqlBinding {
  type: "uri" | "literal"
  value: string
  datatype?: string
  "xml:lang"?: string
}

interface SparqlRow {
  prop: SparqlBinding
  neighbour: SparqlBinding
  neighbourLabel?: SparqlBinding
  neighbourDescription?: SparqlBinding
  direction: SparqlBinding
  birth?: SparqlBinding
  death?: SparqlBinding
  sitelinks?: SparqlBinding
  field?: SparqlBinding
}

function buildSparql(qid: string): string {
  const propValues = (Object.keys(PROPERTIES) as PropId[]).map((p) => `wdt:${p}`).join(" ")
  return `SELECT ?prop ?neighbour ?neighbourLabel ?neighbourDescription ?direction ?birth ?death ?sitelinks ?field WHERE {
  {
    wd:${qid} ?prop ?neighbour .
    BIND("outbound" AS ?direction)
  } UNION {
    ?neighbour ?prop wd:${qid} .
    BIND("inbound" AS ?direction)
  }
  VALUES ?prop { ${propValues} }
  FILTER(STRSTARTS(STR(?neighbour), "http://www.wikidata.org/entity/Q"))
  OPTIONAL { ?neighbour wdt:P569 ?birth . }
  OPTIONAL { ?neighbour wdt:P570 ?death . }
  OPTIONAL { ?neighbour wikibase:sitelinks ?sitelinks . }
  OPTIONAL { ?neighbour wdt:P101 ?field . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
}
LIMIT 500`
}

function parseQid(uri: string): string {
  return uri.replace(/^http:\/\/www\.wikidata\.org\/entity\//, "")
}

function parseProperty(uri: string): PropId | null {
  const m = uri.match(/\/(P\d+)$/)
  return m && m[1] in PROPERTIES ? (m[1] as PropId) : null
}

function parseYear(date: string | undefined): number | null {
  if (!date) return null
  const m = date.match(/^(-?)(\d{1,4})/)
  if (!m) return null
  const sign = m[1] === "-" ? -1 : 1
  return sign * Number(m[2])
}

async function querySeedMetadata(qid: string): Promise<SeedMetadata | null> {
  const sparql = `SELECT ?label ?description ?birth ?death ?sitelinks WHERE {
    BIND(wd:${qid} AS ?seed)
    OPTIONAL { ?seed wdt:P569 ?birth . }
    OPTIONAL { ?seed wdt:P570 ?death . }
    OPTIONAL { ?seed wikibase:sitelinks ?sitelinks . }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" .
      ?seed rdfs:label ?label .
      ?seed schema:description ?description .
    }
  } LIMIT 1`
  const body = new URLSearchParams({ query: sparql, format: "json" })
  const res = await fetch(SPARQL_URL, {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/sparql-results+json",
    },
    body: body.toString(),
  })
  if (!res.ok) return null
  const json = (await res.json()) as { results: { bindings: Array<{ label?: SparqlBinding; description?: SparqlBinding; birth?: SparqlBinding; death?: SparqlBinding; sitelinks?: SparqlBinding }> } }
  const row = json.results.bindings[0]
  if (!row) return null
  return {
    qid,
    label: row.label?.value ?? qid,
    description: row.description?.value ?? "",
    birth_year: parseYear(row.birth?.value),
    death_year: parseYear(row.death?.value),
    sitelinks: row.sitelinks ? Number(row.sitelinks.value) : 0,
  }
}

async function querySparql(qid: string): Promise<SparqlRow[]> {
  const body = new URLSearchParams({ query: buildSparql(qid), format: "json" })
  const res = await fetch(SPARQL_URL, {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/sparql-results+json",
    },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`SPARQL ${qid}: ${res.status} ${res.statusText}`)
  const json = (await res.json()) as { results: { bindings: SparqlRow[] } }
  return json.results.bindings
}

function consolidateRows(rows: SparqlRow[]): NeighbourRaw[] {
  const byQid = new Map<string, NeighbourRaw>()
  for (const row of rows) {
    const qid = parseQid(row.neighbour.value)
    const propId = parseProperty(row.prop.value)
    if (!propId) continue

    const existing = byQid.get(qid)
    const fieldQid = row.field ? parseQid(row.field.value) : null
    const sitelinks = row.sitelinks ? Number(row.sitelinks.value) : 0
    const birth = parseYear(row.birth?.value)
    const death = parseYear(row.death?.value)
    const direction = row.direction.value === "inbound" ? "inbound" : "outbound"

    if (!existing) {
      byQid.set(qid, {
        qid,
        label: row.neighbourLabel?.value ?? qid,
        description: row.neighbourDescription?.value ?? "",
        property: propId,
        direction,
        birth_year: birth,
        death_year: death,
        sitelinks,
        field_of_work_qids: fieldQid ? [fieldQid] : [],
      })
    } else {
      if (fieldQid && !existing.field_of_work_qids.includes(fieldQid)) {
        existing.field_of_work_qids.push(fieldQid)
      }
      if (sitelinks > existing.sitelinks) existing.sitelinks = sitelinks
      if (birth !== null) existing.birth_year = birth
      if (death !== null) existing.death_year = death
    }
  }
  return [...byQid.values()]
    .sort((a, b) => b.sitelinks - a.sitelinks)
    .slice(0, NEIGHBOUR_CAP)
}

function isFresh(cachePath: string): boolean {
  if (!fs.existsSync(cachePath)) return false
  try {
    const data = JSON.parse(fs.readFileSync(cachePath, "utf8")) as QidCache
    const age = Date.now() - new Date(data.fetched).getTime()
    return age < CACHE_TTL_MS
  } catch {
    return false
  }
}

async function fetchOne(qid: string): Promise<QidCache> {
  const cachePath = path.join(cacheDir, `${qid}.json`)
  if (isFresh(cachePath)) {
    const data = JSON.parse(fs.readFileSync(cachePath, "utf8")) as QidCache
    if (data.seed) return data
  }
  const rows = await querySparql(qid)
  const neighbours = consolidateRows(rows)
  const seed = await querySeedMetadata(qid)
  const cache: QidCache = {
    qid,
    fetched: new Date().toISOString(),
    neighbours,
    ...(seed ? { seed } : {}),
  }
  fs.mkdirSync(cacheDir, { recursive: true })
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2))
  return cache
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
  property?: PropId
  note?: string
}

interface WikidataIndex {
  generated: string
  ghost_nodes: GhostNode[]
  ghost_edges: GhostEdge[]
  contemporaries: { source: string; target: string; shared_field: string }[]
  seed_metadata: Record<string, SeedMetadata>
}

function neighbourToGhostNode(n: NeighbourRaw): GhostNode {
  return {
    qid: n.qid,
    label: n.label,
    description: n.description,
    type: "ghost",
    period_year: n.birth_year,
    birth_year: n.birth_year,
    death_year: n.death_year,
    sitelinks: n.sitelinks,
    is_ghost: true,
  }
}

function neighbourToGhostEdge(seedQid: string, n: NeighbourRaw): GhostEdge {
  const edgeType = PROPERTIES[n.property]
  if (n.direction === "outbound") {
    return { source: seedQid, target: n.qid, type: edgeType, provenance: "wikidata", property: n.property }
  }
  return { source: n.qid, target: seedQid, type: edgeType, provenance: "wikidata", property: n.property }
}

function deriveContemporaries(
  nodes: { qid: string; birth_year: number | null; death_year: number | null; field_of_work_qids: string[] }[]
): { source: string; target: string; shared_field: string }[] {
  const persons = nodes.filter((n) => n.birth_year !== null)
  const out: { source: string; target: string; shared_field: string }[] = []
  for (let i = 0; i < persons.length; i++) {
    for (let j = i + 1; j < persons.length; j++) {
      const a = persons[i]
      const b = persons[j]
      const aEnd = a.death_year ?? new Date().getFullYear()
      const bEnd = b.death_year ?? new Date().getFullYear()
      if (a.birth_year! > bEnd || b.birth_year! > aEnd) continue
      const shared = a.field_of_work_qids.find((f) => b.field_of_work_qids.includes(f))
      if (!shared) continue
      out.push({ source: a.qid, target: b.qid, shared_field: shared })
    }
  }
  return out
}

async function main() {
  const graphPath = path.join(generatedDir, "_graph.json")
  if (!fs.existsSync(graphPath)) {
    console.error(`Missing ${graphPath}. Run \`bun run rebuild\` first.`)
    process.exit(1)
  }
  const graph = JSON.parse(fs.readFileSync(graphPath, "utf8")) as GraphData
  const seeds = graph.nodes
    .map((n) => n.wikidata_qid)
    .filter((q): q is string => Boolean(q))

  console.log(`Fetching Wikidata neighbours for ${seeds.length} seed QIDs...`)

  const ghostNodesByQid = new Map<string, GhostNode>()
  const ghostEdges: GhostEdge[] = []
  const fieldsByQid = new Map<string, string[]>()
  let cached = 0
  let fetched = 0
  let failed = 0

  for (const qid of seeds) {
    const cachePath = path.join(cacheDir, `${qid}.json`)
    const wasFresh = isFresh(cachePath)
    try {
      const data = await fetchOne(qid)
      if (wasFresh) cached++
      else {
        fetched++
        await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS))
      }
      for (const n of data.neighbours) {
        if (!ghostNodesByQid.has(n.qid)) ghostNodesByQid.set(n.qid, neighbourToGhostNode(n))
        else {
          const existing = ghostNodesByQid.get(n.qid)!
          if (n.sitelinks > existing.sitelinks) existing.sitelinks = n.sitelinks
        }
        if (n.field_of_work_qids.length > 0) {
          const merged = new Set([...(fieldsByQid.get(n.qid) ?? []), ...n.field_of_work_qids])
          fieldsByQid.set(n.qid, [...merged])
        }
        ghostEdges.push(neighbourToGhostEdge(qid, n))
      }
      console.log(`  [${wasFresh ? "cache" : "fetch"}] ${qid}: ${data.neighbours.length} neighbours`)
    } catch (e) {
      failed++
      console.warn(`  [error] ${qid}: ${e instanceof Error ? e.message : e}`)
    }
  }

  const ghostNodes = [...ghostNodesByQid.values()]
  const fieldEnrichedNodes = ghostNodes.map((n) => ({
    qid: n.qid,
    birth_year: n.birth_year,
    death_year: n.death_year,
    field_of_work_qids: fieldsByQid.get(n.qid) ?? [],
  }))
  const contemporaries = deriveContemporaries(fieldEnrichedNodes)

  const seedMetadata: Record<string, SeedMetadata> = {}
  for (const qid of seeds) {
    const cachePath = path.join(cacheDir, `${qid}.json`)
    if (!fs.existsSync(cachePath)) continue
    const data = JSON.parse(fs.readFileSync(cachePath, "utf8")) as QidCache
    if (data.seed) seedMetadata[qid] = data.seed
  }

  const index: WikidataIndex = {
    generated: new Date().toISOString(),
    ghost_nodes: ghostNodes,
    ghost_edges: ghostEdges,
    contemporaries,
    seed_metadata: seedMetadata,
  }
  fs.writeFileSync(path.join(generatedDir, "_wikidata.json"), JSON.stringify(index, null, 2))

  console.log("")
  console.log(`Seeds: ${seeds.length} (cached: ${cached}, fetched: ${fetched}, failed: ${failed})`)
  console.log(`Ghost nodes: ${ghostNodes.length} | Ghost edges: ${ghostEdges.length} | Derived contemporary edges: ${contemporaries.length}`)
  console.log(`Wrote src/content/articles/_generated/_wikidata.json`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
