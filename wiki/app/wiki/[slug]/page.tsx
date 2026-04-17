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
              <h3 id="what-links-here">What links here</h3>
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
              <h3 id="referenced-in-source-documents">Referenced in source documents</h3>
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
            <details className="wiki-aside-section" open>
              <summary>Contents</summary>
              <ul className="wiki-aside-toc">
                {headings.map((h, i) => (
                  <li key={i} className={h.level === 3 ? "toc-h3" : ""}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <details className="wiki-aside-section" open>
            <summary>Page info</summary>
            <dl className="wiki-aside-info">
              <dt>Type</dt><dd>{article.type}</dd>
              {article.created && (<><dt>Created</dt><dd>{article.created}</dd></>)}
              {article.last_updated && (<><dt>Updated</dt><dd>{article.last_updated}</dd></>)}
              {backlinks.length > 0 && (
                <>
                  <dt>Backlinks</dt>
                  <dd><a href="#what-links-here">{backlinks.length}</a></dd>
                </>
              )}
              {sourceRefs.length > 0 && (
                <>
                  <dt>Source refs</dt>
                  <dd><a href="#referenced-in-source-documents">{sourceRefs.length}</a></dd>
                </>
              )}
            </dl>
          </details>

          {article.related.length > 0 && (
            <details className="wiki-aside-section" open>
              <summary>Related <span className="wiki-aside-count">{article.related.length}</span></summary>
              <ul className="wiki-aside-list">
                {article.related.map((r) => (
                  <li key={r}>
                    <Link href={`/wiki/${slugify(r)}`}>{r}</Link>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {article.sources.length > 0 && (
            <details className="wiki-aside-section">
              <summary>Sources <span className="wiki-aside-count">{article.sources.length}</span></summary>
              <ul className="wiki-aside-list wiki-aside-list-mono">
                {article.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </details>
          )}

          <details className="wiki-aside-section">
            <summary>Actions</summary>
            <ul className="wiki-aside-list">
              <li>
                <a
                  href={`https://github.com/kotachisam/unity-compass/blob/main/wiki/articles/${slug}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source on GitHub
                </a>
              </li>
              <li>
                <Link href="/graph">Open in graph view</Link>
              </li>
            </ul>
          </details>
        </aside>
      </div>
    </>
  )
}
