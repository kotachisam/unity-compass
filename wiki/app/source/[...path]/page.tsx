import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllArticleSlugs, resolveWikilinksToMarkdown } from "@/lib/articles"
import ArticleContent from "@/components/ArticleContent"

const repoRoot = path.resolve(process.cwd(), "..")

export default async function SourceViewerPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  const relativePath = segments.join("/")
  const filePath = path.join(repoRoot, relativePath)

  if (!fs.existsSync(filePath) || !filePath.endsWith(".md")) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { content } = matter(fileContents)

  const allSlugs = new Set(getAllArticleSlugs())
  const resolvedContent = resolveWikilinksToMarkdown(content, allSlugs)

  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1].trim() : path.basename(relativePath, ".md")

  return (
    <>
      <div className="wiki-tab-bar">
        <div className="wiki-tabs-left">
          <span className="wiki-tab active">Source document</span>
        </div>
        <div className="wiki-tabs-right">
          <span className="wiki-tab active">Read-only</span>
          <a
            className="wiki-tab"
            href={`https://github.com/kotachisam/unity-compass/blob/main/${relativePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="wiki-content-area">
        <article className="wiki-article">
          <div style={{
            background: "var(--wiki-toc-bg)",
            border: "1px solid var(--wiki-border-light)",
            padding: "8px 12px",
            marginBottom: 16,
            fontSize: 13,
          }}>
            <strong>Source document:</strong>{" "}
            <code style={{ fontSize: 12 }}>{relativePath}</code>
            {" "}<Link href="/">Back to wiki</Link>
          </div>

          <h1>{title}</h1>

          <ArticleContent content={resolvedContent} />
        </article>
      </div>
    </>
  )
}
