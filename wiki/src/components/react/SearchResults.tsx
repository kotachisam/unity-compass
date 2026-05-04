import { useEffect, useState } from "react"

interface PagefindResult {
  id: string
  data: () => Promise<{
    url: string
    excerpt: string
    meta: { title?: string; description?: string }
    sub_results: { url: string; excerpt: string }[]
  }>
}

interface PagefindAPI {
  search: (query: string) => Promise<{ results: PagefindResult[] }>
  init?: () => Promise<void>
}

interface ResolvedHit {
  url: string
  title: string
  description: string
  excerpt: string
  excerptHtml: string
}

interface SearchResultsProps {
  initialQuery: string
}

export default function SearchResults({ initialQuery }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery)
  const [pagefind, setPagefind] = useState<PagefindAPI | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ResolvedHit[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const url = "/pagefind/pagefind.js"
    import(/* @vite-ignore */ url)
      .then(async (mod: PagefindAPI) => {
        if (mod.init) await mod.init()
        setPagefind(mod)
      })
      .catch((e) => {
        setError("Search index not available in dev. Run `bun run build` then `bun run preview` to test search.")
        console.warn("pagefind unavailable:", e)
      })
  }, [])

  useEffect(() => {
    const q = query.trim()
    if (!pagefind || q.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    pagefind.search(q).then(async ({ results: pr }) => {
      const top = pr.slice(0, 50)
      const resolved = await Promise.all(
        top.map(async (r) => {
          const d = await r.data()
          return {
            url: d.url,
            title: stripHtml(d.meta.title ?? d.url),
            description: stripHtml(d.meta.description ?? ""),
            excerpt: stripHtml(d.excerpt),
            excerptHtml: d.excerpt,
          } satisfies ResolvedHit
        })
      )
      setResults(resolved)
      setLoading(false)
    })
  }, [query, pagefind])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = (new FormData(e.currentTarget).get("q") ?? "").toString()
    const url = new URL(window.location.href)
    url.searchParams.set("q", next)
    window.history.replaceState(null, "", url.toString())
    setQuery(next)
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
        <input
          name="q"
          defaultValue={query}
          placeholder="Search articles…"
          autoFocus
          style={{
            width: "100%",
            padding: "10px 14px",
            fontSize: 15,
            border: "1px solid var(--wiki-border-light)",
            borderRadius: 4,
            outline: "none",
          }}
        />
      </form>

      {error && (
        <p style={{ color: "var(--wiki-border)", fontSize: 13 }}>{error}</p>
      )}

      {!error && query.trim().length < 2 && (
        <p style={{ color: "var(--wiki-border)", fontSize: 13 }}>Enter a query of at least 2 characters.</p>
      )}

      {!error && query.trim().length >= 2 && (
        <p style={{ color: "var(--wiki-border)", fontSize: 13, marginBottom: 12 }}>
          {loading
            ? "Searching…"
            : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {results.map((r) => (
          <li key={r.url} style={{ borderBottom: "1px solid var(--wiki-border-light)", paddingBottom: 12 }}>
            <a href={r.url} style={{ fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
              {r.title}
            </a>
            {r.description && (
              <div style={{ fontSize: 13, color: "var(--wiki-border)", marginTop: 2 }}>
                {r.description}
              </div>
            )}
            <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{r.excerpt}</div>
            <div style={{ fontSize: 11, color: "var(--wiki-border)", marginTop: 6, fontFamily: "ui-monospace, monospace" }}>
              {r.url}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "")
}
