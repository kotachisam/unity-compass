import fs from "fs"
import path from "path"
import matter from "gray-matter"

const articlesDir = path.join(import.meta.dir, "..", "articles")

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

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"))

const articles: ArticleEntry[] = files.map((file) => {
  const content = fs.readFileSync(path.join(articlesDir, file), "utf8")
  const { data } = matter(content)
  return {
    slug: file.replace(".md", ""),
    title: data.title || file.replace(".md", ""),
    type: data.type || "article",
    description: data.description || "",
    tags: data.tags || [],
    created: data.created instanceof Date ? data.created.toISOString().split("T")[0] : (data.created || ""),
    last_updated: data.last_updated instanceof Date ? data.last_updated.toISOString().split("T")[0] : (data.last_updated || ""),
    backlinks: 0,
  }
})

const wikilinkRe = /\[\[([^\]]+)\]\]/g
const backlinks: Record<string, string[]> = {}

for (const file of files) {
  const slug = file.replace(".md", "")
  const content = fs.readFileSync(path.join(articlesDir, file), "utf8")
  let match
  while ((match = wikilinkRe.exec(content)) !== null) {
    const target = match[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    if (!backlinks[target]) backlinks[target] = []
    if (!backlinks[target].includes(slug)) backlinks[target].push(slug)
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

console.log(`Rebuilt: ${articles.length} articles, ${Object.keys(categories).length} categories, ${sorted.length} backlink targets`)
console.log("Files: _catalog.json, _index.md, _backlinks.json")
