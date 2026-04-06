import fs from "fs"
import path from "path"
import matter from "gray-matter"

const articlesDirectory = path.join(process.cwd(), "articles")

export interface ArticleMeta {
  slug: string
  title: string
  type: string
  created: string
  last_updated: string
  related: string[]
  sources: string[]
  tags: string[]
  description?: string
}

export interface Article extends ArticleMeta {
  content: string
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function resolveWikilinksToMarkdown(text: string, allSlugs: Set<string>): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, linkText) => {
    const slug = slugify(linkText)
    return `[${linkText}](/wiki/${slug})`
  })
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getArticleMeta(slug: string): ArticleMeta | null {
  const filePath = path.join(articlesDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    type: data.type || "article",
    created: data.created instanceof Date ? data.created.toISOString().split("T")[0] : (data.created || ""),
    last_updated: data.last_updated instanceof Date ? data.last_updated.toISOString().split("T")[0] : (data.last_updated || ""),
    related: data.related || [],
    sources: data.sources || [],
    tags: data.tags || [],
    description: data.description,
  }
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  const allSlugs = new Set(getAllArticleSlugs())
  const resolvedContent = resolveWikilinksToMarkdown(content, allSlugs)

  return {
    slug,
    title: data.title || slug,
    type: data.type || "article",
    created: data.created instanceof Date ? data.created.toISOString().split("T")[0] : (data.created || ""),
    last_updated: data.last_updated instanceof Date ? data.last_updated.toISOString().split("T")[0] : (data.last_updated || ""),
    related: data.related || [],
    sources: data.sources || [],
    tags: data.tags || [],
    description: data.description,
    content: resolvedContent,
  }
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getAllArticleSlugs()
  return slugs
    .map((slug) => getArticleMeta(slug))
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getArticlesByType(): Record<string, ArticleMeta[]> {
  const articles = getAllArticles()
  const grouped: Record<string, ArticleMeta[]> = {}
  for (const article of articles) {
    const type = article.type
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(article)
  }
  return grouped
}

export function getBacklinks(slug: string): ArticleMeta[] {
  const allSlugs = getAllArticleSlugs()
  const targetTitle = getArticleMeta(slug)?.title || slug
  const backlinks: ArticleMeta[] = []

  for (const otherSlug of allSlugs) {
    if (otherSlug === slug) continue
    const filePath = path.join(articlesDirectory, `${otherSlug}.md`)
    const content = fs.readFileSync(filePath, "utf8")

    if (content.includes(`[[${targetTitle}]]`) || content.includes(`](${slug})`)) {
      const meta = getArticleMeta(otherSlug)
      if (meta) backlinks.push(meta)
    }
  }

  return backlinks
}

export function getRandomSlug(): string {
  const slugs = getAllArticleSlugs()
  return slugs[Math.floor(Math.random() * slugs.length)]
}

export function searchArticles(query: string): ArticleMeta[] {
  if (!query.trim()) return []
  const lower = query.toLowerCase()
  const all = getAllArticles()

  const scored: { article: ArticleMeta; score: number }[] = []

  for (const a of all) {
    let score = 0
    const titleLower = a.title.toLowerCase()

    if (titleLower === lower) {
      score = 100
    } else if (titleLower.startsWith(lower)) {
      score = 80
    } else if (titleLower.includes(lower)) {
      score = 60
    } else if (a.tags.some((t) => t.toLowerCase().includes(lower))) {
      score = 40
    } else if (a.description?.toLowerCase().includes(lower)) {
      score = 30
    } else {
      const filePath = path.join(articlesDirectory, `${a.slug}.md`)
      const content = fs.readFileSync(filePath, "utf8").toLowerCase()
      if (content.includes(lower)) {
        score = 10
      }
    }

    if (score > 0) {
      scored.push({ article: a, score })
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title))
    .map((s) => s.article)
}
