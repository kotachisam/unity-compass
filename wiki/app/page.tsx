import { getAllArticles, getArticlesByType, getArticle } from "@/lib/articles"
import { getRepoStats } from "@/lib/repo-scanner"
import ArticleContent from "@/components/ArticleContent"
import Link from "next/link"

const typeLabels: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
}

const typeDescriptions: Record<string, string> = {
  concept: "Ideas and principles the investigation develops or uses",
  theory: "Formal frameworks engaged with",
  person: "Thinkers, researchers and key figures",
  "case-study": "Real-world coordination cases examined",
  source: "Books, papers and articles referenced",
  institution: "Organisations and partnerships",
}

export default function WikiIndex() {
  const allArticles = getAllArticles()
  const byType = getArticlesByType()
  const typeCount = Object.keys(byType).length
  const repoStats = getRepoStats()

  const featured = allArticles.find((a) => a.slug === "coordination-without-convergence") || allArticles[0]

  let featuredExcerpt = ""
  if (featured) {
    const full = getArticle(featured.slug)
    if (full) {
      const lines = full.content.split("\n").filter((l: string) => l.trim() && !l.startsWith("#") && !l.startsWith("---"))
      featuredExcerpt = lines.slice(0, 3).join("\n\n").slice(0, 400)
      if (featuredExcerpt.length >= 400) featuredExcerpt += "..."
    }
  }

  const recentlyUpdated = [...allArticles]
    .filter((a) => a.last_updated)
    .sort((a, b) => String(b.last_updated).localeCompare(String(a.last_updated)))
    .slice(0, 5)

  return (
    <>
      <div className="wiki-tab-bar">
        <div className="wiki-tabs-left">
          <span className="wiki-tab active">Main page</span>
        </div>
        <div className="wiki-tabs-right" />
      </div>

      <div className="wiki-index">
        <h1>Welcome to the Unity Compass Wiki</h1>
        <p className="wiki-index-subtitle">
          the research knowledge base for coordination across genuine difference
        </p>
        <p className="wiki-stats">
          {allArticles.length} articles across {typeCount} categories
          {repoStats.fileCount > 0 && (
            <> &middot; Indexed from {repoStats.fileCount} source documents</>
          )}
        </p>

        <div className="wiki-index-grid">
          {featured && (
            <div className="wiki-box">
              <div className="wiki-box-header">Featured article</div>
              <div className="wiki-box-body">
                <p>
                  <Link href={`/wiki/${featured.slug}`}><strong>{featured.title}</strong></Link>
                  {" "}({featured.type})
                  {featured.description ? ` \u2014 ${featured.description}` : ""}
                </p>
                {featuredExcerpt && (
                  <div style={{ marginTop: 8 }}>
                    <ArticleContent content={featuredExcerpt} />
                  </div>
                )}
                <p style={{ marginTop: 8 }}>
                  <Link href={`/wiki/${featured.slug}`}>Read more &rarr;</Link>
                </p>
              </div>
            </div>
          )}

          <div className="wiki-box">
            <div className="wiki-box-header">Recently updated</div>
            <div className="wiki-box-body">
              {recentlyUpdated.length > 0 ? (
                <ul>
                  {recentlyUpdated.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/wiki/${a.slug}`}>{a.title}</Link>
                      <span style={{ color: "var(--wiki-border)", fontSize: 11, marginLeft: 6 }}>
                        ({String(a.last_updated)})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recently updated articles.</p>
              )}
            </div>
          </div>
        </div>

        <div className="wiki-index-grid-wide">
          <div>
            <div className="wiki-box">
              <div className="wiki-box-header">Browse by category</div>
              <div className="wiki-box-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {Object.entries(typeLabels).map(([type, label]) => {
                    const articles = byType[type]
                    if (!articles || articles.length === 0) return null
                    return (
                      <div key={type} style={{ padding: "8px 12px", background: "var(--wiki-toc-bg)", border: "1px solid var(--wiki-border-light)" }}>
                        <Link href={`/category/${type}`} style={{ fontWeight: 600, fontSize: 14 }}>
                          {label}
                        </Link>
                        <span style={{ color: "var(--wiki-border)", fontSize: 12, marginLeft: 6 }}>
                          ({articles.length})
                        </span>
                        <p style={{ fontSize: 12, color: "var(--wiki-border)", marginTop: 2 }}>
                          {typeDescriptions[type]}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="wiki-about-box">
              <h3>About</h3>
              <p>
                This wiki is the research knowledge base for the Unity Compass
                investigation into coordination across genuine difference.
              </p>
              <p style={{ marginTop: 8 }}>
                Articles cover the concepts, thinkers, theories, case studies and
                source materials the investigation engages with.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
