import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { slugify, extractWikilinks } from "../lib/utils"

const articlesDir = path.join(import.meta.dir, "..", "articles")

const STUB_WORD_THRESHOLD = 500

const typeLabels: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
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
}

interface CatalogCategory {
  label: string
  count: number
  articles: ArticleEntry[]
}

interface Catalog {
  generated: string
  total: number
  categories: Record<string, CatalogCategory>
}

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
  stats: {
    nodes: number
    edges: number
    stubs: number
    orphans: number
  }
  nodes: GraphNode[]
  edges: GraphEdge[]
}

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"))

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
    created: data.created instanceof Date ? data.created.toISOString().split("T")[0] : (data.created || ""),
    last_updated: data.last_updated instanceof Date ? data.last_updated.toISOString().split("T")[0] : (data.last_updated || ""),
    backlinks: 0,
  }
})

const slugsByTitle: Record<string, string> = {}
for (const article of articles) {
  slugsByTitle[slugify(article.title)] = article.slug
  slugsByTitle[article.slug] = article.slug
}

const backlinks: Record<string, string[]> = {}
const edgeSet = new Set<string>()
const edges: GraphEdge[] = []

for (const file of files) {
  const sourceSlug = file.replace(".md", "")
  const content = fileContents[sourceSlug]
  const wikilinks = extractWikilinks(content)

  for (const link of wikilinks) {
    const linkSlug = slugify(link)
    const targetSlug = slugsByTitle[linkSlug] || linkSlug

    if (!backlinks[targetSlug]) backlinks[targetSlug] = []
    if (!backlinks[targetSlug].includes(sourceSlug)) backlinks[targetSlug].push(sourceSlug)

    const edgeKey = `${sourceSlug}→${targetSlug}`
    if (sourceSlug !== targetSlug && !edgeSet.has(edgeKey)) {
      edgeSet.add(edgeKey)
      edges.push({
        source: sourceSlug,
        target: targetSlug,
        type: "wikilink",
        symmetric: false,
      })
    }
  }
}

for (const article of articles) {
  article.backlinks = (backlinks[article.slug] || []).length
}

const sorted = Object.entries(backlinks).sort((a, b) => b[1].length - a[1].length)

const categories: Record<string, CatalogCategory> = {}
for (const [type, label] of Object.entries(typeLabels)) {
  const typeArticles = articles.filter((a) => a.type === type).sort((a, b) => a.title.localeCompare(b.title))
  if (typeArticles.length > 0) {
    categories[type] = { label, count: typeArticles.length, articles: typeArticles }
  }
}

const catalog: Catalog = {
  generated: new Date().toISOString().split("T")[0],
  total: articles.length,
  categories,
}

fs.writeFileSync(path.join(articlesDir, "_catalog.json"), JSON.stringify(catalog, null, 2))

let index = "# Unity Compass Wiki Index\n\nMaster catalog of all wiki articles.\n\n"
for (const [, cat] of Object.entries(categories)) {
  index += `## ${cat.label}\n\n`
  for (const a of cat.articles) {
    const tagStr = a.tags.filter((t) => !Object.keys(typeLabels).includes(t) && t !== "core-concept").slice(0, 5).join(", ")
    index += `- **[${a.title}](${a.slug}.md)** (${a.type}) also: ${tagStr}\n`
  }
  index += "\n"
}
index += `---\n\n**Statistics:** ${articles.length} articles across ${Object.keys(categories).length} categories\n**Last rebuilt:** ${catalog.generated}\n`
fs.writeFileSync(path.join(articlesDir, "_index.md"), index)

fs.writeFileSync(path.join(articlesDir, "_backlinks.json"), JSON.stringify(Object.fromEntries(sorted), null, 2))

const outDegree: Record<string, number> = {}
for (const edge of edges) {
  outDegree[edge.source] = (outDegree[edge.source] || 0) + 1
}

const articlesBySlug = new Set(articles.map((a) => a.slug))
const nodes: GraphNode[] = articles.map((a) => {
  const wordCount = fileContents[a.slug].split(/\s+/).filter(Boolean).length
  return {
    slug: a.slug,
    title: a.title,
    type: a.type,
    word_count: wordCount,
    is_stub: wordCount < STUB_WORD_THRESHOLD,
    in_degree: (backlinks[a.slug] || []).length,
    out_degree: outDegree[a.slug] || 0,
  }
})

const validEdges = edges.filter((e) => articlesBySlug.has(e.source) && articlesBySlug.has(e.target))

const stubCount = nodes.filter((n) => n.is_stub).length
const orphanCount = nodes.filter((n) => n.in_degree === 0 && n.out_degree === 0).length

const graph: Graph = {
  generated: new Date().toISOString(),
  stats: {
    nodes: nodes.length,
    edges: validEdges.length,
    stubs: stubCount,
    orphans: orphanCount,
  },
  nodes,
  edges: validEdges,
}

fs.writeFileSync(path.join(articlesDir, "_graph.json"), JSON.stringify(graph, null, 2))

console.log(`Rebuilt: ${articles.length} articles, ${Object.keys(categories).length} categories, ${sorted.length} backlink targets`)
console.log(`Graph: ${nodes.length} nodes, ${validEdges.length} edges, ${stubCount} stubs, ${orphanCount} orphans`)
console.log("Files: _catalog.json, _index.md, _backlinks.json, _graph.json")
