import { searchArticles } from "@/lib/articles"
import Link from "next/link"

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q || ""
  const results = searchArticles(query)

  return (
    <>
      <div className="wiki-header">
        <div style={{ fontWeight: 500 }}>Unity Compass Wiki</div>
        <form className="wiki-search" action="/search" method="get">
          <input type="text" name="q" defaultValue={query} placeholder="Search wiki..." />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="wiki-tabs">
        <div className="wiki-tab active">Search results</div>
      </div>

      <div className="wiki-article" style={{ maxWidth: "100%" }}>
        <h1>Search results{query ? ` for "${query}"` : ""}</h1>

        {!query && <p>Enter a search term above.</p>}

        {query && results.length === 0 && (
          <p>No articles found matching &ldquo;{query}&rdquo;.</p>
        )}

        {results.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((a) => (
              <li key={a.slug} style={{ marginBottom: 12 }}>
                <Link href={`/wiki/${a.slug}`} style={{ fontSize: 16, fontWeight: 500 }}>
                  {a.title}
                </Link>
                <span style={{ color: "var(--wiki-border)", fontSize: 12, marginLeft: 8 }}>({a.type})</span>
                {a.description && (
                  <p style={{ fontSize: 13, color: "var(--wiki-border)", marginTop: 2 }}>{a.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
