import { Command } from "cmdk"
import { useEffect, useRef, useState } from "react"

interface PagefindSubResult {
  url: string
  excerpt: string
}

interface PagefindResult {
  id: string
  data: () => Promise<{
    url: string
    excerpt: string
    meta: { title?: string; description?: string }
    sub_results: PagefindSubResult[]
  }>
}

interface PagefindAPI {
  search: (query: string) => Promise<{ results: PagefindResult[] }>
  init?: () => Promise<void>
}

interface ResolvedHit {
  url: string
  title: string
  excerpt: string
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "")
}

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [pagefind, setPagefind] = useState<PagefindAPI | null>(null)
  const [pagefindError, setPagefindError] = useState<string | null>(null)
  const [results, setResults] = useState<ResolvedHit[]>([])
  const lastQueryRef = useRef("")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!open || pagefind || pagefindError) return
    const url = `/pagefind/pagefind.js`
    import(/* @vite-ignore */ url)
      .then(async (mod: PagefindAPI) => {
        if (mod.init) await mod.init()
        setPagefind(mod)
      })
      .catch((e) => {
        setPagefindError(
          "Search index not available in dev. Run `bun run build` to generate it."
        )
        console.warn("pagefind unavailable:", e)
      })
  }, [open, pagefind, pagefindError])

  useEffect(() => {
    const q = query.trim()
    if (!pagefind || !q) {
      setResults([])
      return
    }
    lastQueryRef.current = q
    pagefind.search(q).then(async ({ results: pageResults }) => {
      if (lastQueryRef.current !== q) return
      const top = pageResults.slice(0, 15)
      const resolved = await Promise.all(
        top.map(async (r) => {
          const d = await r.data()
          return {
            url: d.url,
            title: stripHtml(d.meta.title ?? d.url),
            excerpt: stripHtml(d.excerpt),
          }
        })
      )
      if (lastQueryRef.current === q) setResults(resolved)
    })
  }, [query, pagefind])

  if (!open) return null

  return (
    <div className="wiki-search-overlay" onClick={() => setOpen(false)}>
      <div className="wiki-search-modal" onClick={(e) => e.stopPropagation()}>
        <Command label="Search articles" shouldFilter={false}>
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search the wiki..."
            autoFocus
          />
          <Command.List>
            {pagefindError && (
              <div style={{ padding: "12px 16px", color: "var(--wiki-border)", fontSize: 13 }}>
                {pagefindError}
              </div>
            )}
            {!pagefindError && results.length === 0 && query.trim() && (
              <Command.Empty>No results.</Command.Empty>
            )}
            {results.map((r) => (
              <Command.Item
                key={r.url}
                value={r.url}
                onSelect={() => {
                  window.location.href = r.url
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{r.title}</div>
                  {r.excerpt && (
                    <div style={{ fontSize: 12, color: "var(--wiki-border)" }}>{r.excerpt}</div>
                  )}
                </div>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
