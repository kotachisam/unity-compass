import { getArticle, getBacklinks, getAllArticleSlugs } from "@/lib/articles"
import { getSourceReferencesForArticle } from "@/lib/repo-scanner"
import ArticleContent from "@/components/ArticleContent"
import Link from "next/link"
import { notFound } from "next/navigation"

function extractHeadings(markdown: string): { level: number; text: string; id: string }[] {
  const regex = /^(#{2,3})\s+(.+)$/gm
  const headings: { level: number; text: string; id: string }[] = []
  let match
  while ((match = regex.exec(markdown)) !== null) {
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    headings.push({ level: match[1].length, text, id })
  }
  return headings
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const backlinks = getBacklinks(slug)
  const sourceRefs = getSourceReferencesForArticle(slug)
  const headings = extractHeadings(article.content)

  return (
    <>
      <div className="wiki-tab-bar">
        <div className="wiki-tabs-left">
          <span className="wiki-tab active">Article</span>
          <a className="wiki-tab" href="https://github.com/kotachisam/unity-compass/issues" target="_blank" rel="noopener noreferrer">Discuss</a>
        </div>
        <div className="wiki-tabs-right">
          <span className="wiki-tab active">Read</span>
          <a
            className="wiki-tab"
            href={`https://github.com/kotachisam/unity-compass/blob/main/wiki/articles/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </a>
        </div>
      </div>

      <div className="wiki-content-area">
        <article className="wiki-article">
          <h1>
            {article.title}
            <span className="wiki-article-type">({article.type})</span>
          </h1>

          <ArticleContent content={article.content} />

          {backlinks.length > 0 && (
            <div className="wiki-backlinks">
              <h3>What links here</h3>
              <ul>
                {backlinks.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/wiki/${b.slug}`}>{b.title}</Link>
                    <span style={{ color: "var(--wiki-border)", fontSize: 12, marginLeft: 6 }}>({b.type})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sourceRefs.length > 0 && (
            <div className="wiki-source-refs">
              <h3>Referenced in source documents</h3>
              <ul>
                {sourceRefs.map((ref) => (
                  <li key={ref.path}>
                    <Link href={`/source/${ref.path}`}>{ref.title}</Link>
                    <span className="source-path"> ({ref.path})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.tags.length > 0 && (
            <div className="wiki-categories">
              <span>Categories:</span>
              {article.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>{tag}</Link>
              ))}
            </div>
          )}
        </article>

        <aside className="wiki-right-sidebar">
          {headings.length > 0 && (
            <div className="wiki-toc-box">
              <h4>Contents</h4>
              <ul>
                {headings.map((h, i) => (
                  <li key={i} className={h.level === 3 ? "toc-h3" : ""}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="wiki-tools-box">
            <h4>Tools</h4>

            <h5>General</h5>
            <ul>
              <li>
                <Link href={`/wiki/${slug}`}>What links here</Link>
                {backlinks.length > 0 && (
                  <span style={{ color: "var(--wiki-border)", marginLeft: 4 }}>({backlinks.length})</span>
                )}
              </li>
              {sourceRefs.length > 0 && (
                <li>
                  <span style={{ color: "var(--wiki-border)" }}>Source refs: {sourceRefs.length}</span>
                </li>
              )}
              <li>
                <a
                  href={`https://github.com/kotachisam/unity-compass/blob/main/wiki/articles/${slug}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source
                </a>
              </li>
            </ul>

            <h5>Page information</h5>
            <div className="tool-info">Type: {article.type}</div>
            {article.created && <div className="tool-info">Created: {article.created}</div>}
            {article.last_updated && <div className="tool-info">Updated: {article.last_updated}</div>}
            {article.tags.length > 0 && <div className="tool-info">Tags: {article.tags.length}</div>}
            {article.sources.length > 0 && <div className="tool-info">Sources: {article.sources.length}</div>}

            {article.related.length > 0 && (
              <>
                <h5>Related articles</h5>
                <ul>
                  {article.related.map((r) => (
                    <li key={r}>
                      <Link href={`/wiki/${slugify(r)}`}>{r}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {article.sources.length > 0 && (
              <>
                <h5>Sources cited</h5>
                <ul>
                  {article.sources.map((s) => (
                    <li key={s} className="tool-info">{s}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}
