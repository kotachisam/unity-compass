import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getAllArticles } from "./articles"

const repoRoot = path.resolve(process.cwd(), "..")

const SCAN_DIRS = ["1-theory", "2-practice", "3-project"]

const IGNORE_PATTERNS = ["README.md", "CLAUDE.md", "on-logos.pdf", "_index.md", "_backlinks.json", "_absorb_log.json"]

export interface RepoFile {
  path: string
  title: string
  lastModified: string
  wikilinks: string[]
  entityMentions: string[]
}

export interface SourceReferences {
  [articleSlug: string]: RepoFile[]
}

function shouldIgnore(filename: string): boolean {
  return IGNORE_PATTERNS.some((p) => filename.endsWith(p))
}

function findMarkdownFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results

  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory() && !item.name.startsWith(".")) {
      results.push(...findMarkdownFiles(fullPath))
    } else if (item.isFile() && item.name.endsWith(".md") && !shouldIgnore(item.name)) {
      results.push(fullPath)
    }
  }
  return results
}

function extractTitle(content: string, filePath: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) return h1Match[1].trim()
  return path.basename(filePath, ".md").replace(/^\d+-/, "").replace(/-/g, " ")
}

function extractWikilinks(content: string): string[] {
  const wikilinkRegex = /\[\[([^\]]+)\]\]/g
  const links: string[] = []
  let match
  while ((match = wikilinkRegex.exec(content)) !== null) {
    links.push(match[1])
  }
  return [...new Set(links)]
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function scanRepoFiles(): RepoFile[] {
  const files: RepoFile[] = []

  for (const scanDir of SCAN_DIRS) {
    const fullDir = path.join(repoRoot, scanDir)
    const markdownFiles = findMarkdownFiles(fullDir)

    for (const filePath of markdownFiles) {
      const content = fs.readFileSync(filePath, "utf8")
      const relativePath = path.relative(repoRoot, filePath)
      const { data } = matter(content)

      const stats = fs.statSync(filePath)
      const wikilinks = extractWikilinks(content)

      const allArticles = getAllArticles()
      const entityMentions: string[] = []
      for (const article of allArticles) {
        const titleLower = article.title.toLowerCase()
        const contentLower = content.toLowerCase()
        if (contentLower.includes(titleLower) && titleLower.length > 3) {
          entityMentions.push(article.slug)
        }
      }

      files.push({
        path: relativePath,
        title: data.title || extractTitle(content, filePath),
        lastModified: stats.mtime.toISOString().split("T")[0],
        wikilinks,
        entityMentions: [...new Set(entityMentions)],
      })
    }
  }

  return files
}

export function getSourceReferences(): SourceReferences {
  const repoFiles = scanRepoFiles()
  const refs: SourceReferences = {}

  for (const file of repoFiles) {
    for (const mention of file.entityMentions) {
      if (!refs[mention]) refs[mention] = []
      refs[mention].push(file)
    }

    for (const wikilink of file.wikilinks) {
      const slug = slugify(wikilink)
      if (!refs[slug]) refs[slug] = []
      if (!refs[slug].some((f) => f.path === file.path)) {
        refs[slug].push(file)
      }
    }
  }

  return refs
}

export function getSourceReferencesForArticle(slug: string): RepoFile[] {
  const refs = getSourceReferences()
  return refs[slug] || []
}

export function getRepoStats(): { fileCount: number; dirCount: number } {
  const files = scanRepoFiles()
  const dirs = new Set(files.map((f) => f.path.split("/").slice(0, 2).join("/")))
  return { fileCount: files.length, dirCount: dirs.size }
}
