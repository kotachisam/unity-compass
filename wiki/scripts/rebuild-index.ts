import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { slugify, extractWikilinks } from "../src/lib/utils.ts"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const articlesDir = path.join(__dirname, "..", "src", "content", "articles")
const generatedDir = path.join(articlesDir, "_generated")

const STUB_WORD_THRESHOLD = 500
const PROMOTION_THRESHOLD = 3

const CANONICAL_EDGE_TYPES = new Set([
  "references",
  "influenced_by",
  "developed",
  "critiqued",
  "cites",
  "engages_concept",
])

const typeLabels: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  work: "Works",
  event: "Events",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
}

interface LinkEntry {
  to: string
  type: string
  provenance?: "absorbed" | "wikidata" | "manual" | "derived"
  note?: string
}

interface ArticleEntry {
  slug: string
  title: string
  type: string
  description: string
  tags: string[]
  created: string
  last_updated: string
  backlinks: number
  wikidata_qid: string | null
}

interface GraphNode {
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

interface GraphEdge {
  source: string
  target: string
  type: string
  provenance: "absorbed" | "wikidata" | "manual" | "derived"
  note?: string
}

interface Warning {
  kind: "missing_target" | "unlinked_related" | "duplicate_link" | "qid_without_period"
  source: string
  detail: string
}

function normaliseDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().split("T")[0]
  if (typeof v === "string") return v
  return ""
}

function periodYear(data: Record<string, unknown>): number | null {
  if (typeof data.date === "string") {
    const m = data.date.match(/^(\d{4})/)
    if (m) return Number(m[1])
  }
  if (data.date instanceof Date) return data.date.getFullYear()
  const period = data.period as { birth?: unknown; flourished?: unknown } | undefined
  if (period?.birth) {
    if (period.birth instanceof Date) return period.birth.getFullYear()
    if (typeof period.birth === "string") {
      const m = period.birth.match(/^(-?\d{1,4})/)
      if (m) return Number(m[1])
    }
  }
  if (typeof period?.flourished === "string") {
    const m = period.flourished.match(/(-?\d{1,4})/)
    if (m) return Number(m[1])
  }
  return null
}

const files = fs
  .readdirSync(articlesDir)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))

const fileContents: Record<string, string> = {}
const fileData: Record<string, matter.GrayMatterFile<string>> = {}

for (const file of files) {
  const slug = file.replace(".md", "")
  const raw = fs.readFileSync(path.join(articlesDir, file), "utf8")
  const parsed = matter(raw)
  fileContents[slug] = parsed.content
  fileData[slug] = parsed
}

const articles: ArticleEntry[] = files.map((file) => {
  const slug = file.replace(".md", "")
  const { data } = fileData[slug]
  return {
    slug,
    title: data.title || slug,
    type: data.type || "article",
    description: data.description || "",
    tags: data.tags || [],
    created: normaliseDate(data.created),
    last_updated: normaliseDate(data.last_updated),
    backlinks: 0,
    wikidata_qid: data.wikidata_qid ?? null,
  }
})

const slugsByTitle: Record<string, string> = {}
for (const article of articles) {
  slugsByTitle[slugify(article.title)] = article.slug
  slugsByTitle[article.slug] = article.slug
}

const articleSlugs = new Set(articles.map((a) => a.slug))
const backlinks: Record<string, string[]> = {}
const edgeKeys = new Set<string>()
const edges: GraphEdge[] = []
const warnings: Warning[] = []
const customTypeCounts: Record<string, number> = {}

function pushEdge(source: string, target: string, type: string, provenance: GraphEdge["provenance"], note?: string) {
  if (source === target) return
  const key = `${source}→${target}|${type}`
  if (edgeKeys.has(key)) {
    warnings.push({ kind: "duplicate_link", source, detail: `${type} → ${target}` })
    return
  }
  edgeKeys.add(key)
  edges.push({ source, target, type, provenance, ...(note ? { note } : {}) })
  if (!CANONICAL_EDGE_TYPES.has(type)) {
    customTypeCounts[type] = (customTypeCounts[type] ?? 0) + 1
  }
  if (!backlinks[target]) backlinks[target] = []
  if (!backlinks[target].includes(source)) backlinks[target].push(source)
}

function resolveTarget(raw: string): { slug: string; resolved: boolean } {
  const slug = slugify(raw)
  const resolved = slugsByTitle[slug] ?? slug
  return { slug: resolved, resolved: articleSlugs.has(resolved) }
}

const ENTITY_TYPES_NEEDING_DATES = new Set(["person", "work", "event", "case-study"])

for (const file of files) {
  const sourceSlug = file.replace(".md", "")
  const content = fileContents[sourceSlug]
  const { data } = fileData[sourceSlug]

  if (
    data.wikidata_qid &&
    ENTITY_TYPES_NEEDING_DATES.has(data.type) &&
    !data.period &&
    !data.date
  ) {
    warnings.push({
      kind: "qid_without_period",
      source: sourceSlug,
      detail: `${data.type} has wikidata_qid (${data.wikidata_qid}) but no period/date — graph layout will rely on build-time backfill or neighbour averaging`,
    })
  }

  const wikilinks = extractWikilinks(content)
  for (const link of wikilinks) {
    const { slug: target, resolved } = resolveTarget(link)
    if (!resolved) {
      warnings.push({ kind: "missing_target", source: sourceSlug, detail: `wikilink [[${link}]] → ${target} (no article)` })
    }
    pushEdge(sourceSlug, target, "references", "absorbed")
  }

  const links = (data.links ?? []) as LinkEntry[]
  for (const link of links) {
    const { slug: target, resolved } = resolveTarget(link.to)
    if (!resolved) {
      warnings.push({ kind: "missing_target", source: sourceSlug, detail: `link ${link.type}: ${link.to} → ${target} (no article)` })
    }
    pushEdge(sourceSlug, target, link.type, link.provenance ?? "absorbed", link.note)
  }

  const related = (data.related ?? []) as string[]
  const linkedTargets = new Set([
    ...wikilinks.map((l) => slugify(l)),
    ...links.map((l) => slugify(l.to)),
  ])
  for (const r of related) {
    const rSlug = slugify(r)
    if (!linkedTargets.has(rSlug)) {
      warnings.push({
        kind: "unlinked_related",
        source: sourceSlug,
        detail: `related entry "${r}" has no body wikilink or typed link — consider adding to links:`,
      })
    }
  }
}

for (const article of articles) {
  article.backlinks = (backlinks[article.slug] || []).length
}

const sortedBacklinks = Object.entries(backlinks).sort((a, b) => b[1].length - a[1].length)

const categories: Record<string, { label: string; count: number; articles: ArticleEntry[] }> = {}
for (const [type, label] of Object.entries(typeLabels)) {
  const typeArticles = articles
    .filter((a) => a.type === type)
    .sort((a, b) => a.title.localeCompare(b.title))
  if (typeArticles.length > 0) {
    categories[type] = { label, count: typeArticles.length, articles: typeArticles }
  }
}

const catalog = {
  generated: new Date().toISOString().split("T")[0],
  total: articles.length,
  categories,
}

fs.mkdirSync(generatedDir, { recursive: true })

fs.writeFileSync(path.join(generatedDir, "_catalog.json"), JSON.stringify(catalog, null, 2))

let indexMd = "# Unity Compass Wiki Index\n\nMaster catalog of all wiki articles.\n\n"
for (const cat of Object.values(categories)) {
  indexMd += `## ${cat.label}\n\n`
  for (const a of cat.articles) {
    const tagStr = a.tags
      .filter((t) => !Object.keys(typeLabels).includes(t) && t !== "core-concept")
      .slice(0, 5)
      .join(", ")
    indexMd += `- **[${a.title}](${a.slug}.md)** (${a.type})${tagStr ? ` also: ${tagStr}` : ""}\n`
  }
  indexMd += "\n"
}
indexMd += `---\n\n**Statistics:** ${articles.length} articles across ${Object.keys(categories).length} categories\n**Last rebuilt:** ${catalog.generated}\n`
fs.writeFileSync(path.join(generatedDir, "_index.md"), indexMd)

fs.writeFileSync(path.join(generatedDir, "_backlinks.json"), JSON.stringify(Object.fromEntries(sortedBacklinks), null, 2))

const outDegree: Record<string, number> = {}
for (const edge of edges) {
  outDegree[edge.source] = (outDegree[edge.source] ?? 0) + 1
}

const validEdges = edges.filter((e) => articleSlugs.has(e.source) && articleSlugs.has(e.target))

const nodes: GraphNode[] = articles.map((a) => {
  const wordCount = fileContents[a.slug].split(/\s+/).filter(Boolean).length
  return {
    slug: a.slug,
    title: a.title,
    type: a.type,
    word_count: wordCount,
    is_stub: wordCount < STUB_WORD_THRESHOLD,
    in_degree: (backlinks[a.slug] || []).length,
    out_degree: outDegree[a.slug] ?? 0,
    wikidata_qid: a.wikidata_qid,
    period_year: periodYear(fileData[a.slug].data),
    is_ghost: false,
  }
})

const stubCount = nodes.filter((n) => n.is_stub).length
const orphanCount = nodes.filter((n) => n.in_degree === 0 && n.out_degree === 0).length

const graph = {
  generated: new Date().toISOString(),
  stats: {
    nodes: nodes.length,
    edges: validEdges.length,
    stubs: stubCount,
    orphans: orphanCount,
    edges_by_type: Object.fromEntries(
      Object.entries(
        validEdges.reduce<Record<string, number>>((acc, e) => {
          acc[e.type] = (acc[e.type] ?? 0) + 1
          return acc
        }, {})
      ).sort((a, b) => b[1] - a[1])
    ),
    edges_by_provenance: Object.fromEntries(
      Object.entries(
        validEdges.reduce<Record<string, number>>((acc, e) => {
          acc[e.provenance] = (acc[e.provenance] ?? 0) + 1
          return acc
        }, {})
      )
    ),
  },
  nodes,
  edges: validEdges,
}

fs.writeFileSync(path.join(generatedDir, "_graph.json"), JSON.stringify(graph, null, 2))

const promotions = Object.entries(customTypeCounts)
  .filter(([, count]) => count >= PROMOTION_THRESHOLD)
  .sort((a, b) => b[1] - a[1])
  .map(([type, count]) => ({ type, count, status: "candidate" }))

fs.writeFileSync(
  path.join(generatedDir, "_promotions.json"),
  JSON.stringify({ generated: new Date().toISOString(), threshold: PROMOTION_THRESHOLD, candidates: promotions }, null, 2)
)

const warningsByKind = warnings.reduce<Record<string, Warning[]>>((acc, w) => {
  if (!acc[w.kind]) acc[w.kind] = []
  acc[w.kind].push(w)
  return acc
}, {})

fs.writeFileSync(
  path.join(generatedDir, "_warnings.json"),
  JSON.stringify({ generated: new Date().toISOString(), total: warnings.length, by_kind: warningsByKind }, null, 2)
)

console.log(`Articles: ${articles.length} | Edges: ${validEdges.length} | Warnings: ${warnings.length} | Promotion candidates: ${promotions.length}`)
console.log(`Edge types: ${Object.entries(graph.stats.edges_by_type).map(([t, n]) => `${t}=${n}`).join(", ")}`)
console.log(`Output: src/content/articles/_generated/{_catalog.json, _index.md, _backlinks.json, _graph.json, _promotions.json, _warnings.json}`)
