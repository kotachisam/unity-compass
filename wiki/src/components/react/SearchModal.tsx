import { useEffect, useRef, useState } from "react"
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useKBar,
  useMatches,
  useRegisterActions,
  type Action,
} from "kbar"

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

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "")
}

const STATIC_ACTIONS: Action[] = [
  {
    id: "home",
    name: "Home",
    keywords: "main page index",
    section: "Navigation",
    perform: () => { window.location.href = "/" },
  },
  {
    id: "graph",
    name: "Graph view",
    keywords: "map orientation timeline",
    section: "Navigation",
    perform: () => { window.location.href = "/graph" },
  },
  {
    id: "random",
    name: "Random article",
    keywords: "shuffle surprise",
    section: "Navigation",
    perform: () => { window.location.href = "/wiki/random" },
  },
]

function PagefindSearch() {
  const [pagefind, setPagefind] = useState<PagefindAPI | null>(null)
  const [pagefindError, setPagefindError] = useState<string | null>(null)
  const [searchActions, setSearchActions] = useState<Action[]>([])
  const lastQueryRef = useRef("")

  const { searchQuery } = useKBar((state) => ({ searchQuery: state.searchQuery }))

  useEffect(() => {
    const url = "/pagefind/pagefind.js"
    import(/* @vite-ignore */ url)
      .then(async (mod: PagefindAPI) => {
        if (mod.init) await mod.init()
        setPagefind(mod)
      })
      .catch((e) => {
        setPagefindError("Search index not available in dev. Run `bun run build` to generate it.")
        console.warn("pagefind unavailable:", e)
      })
  }, [])

  useEffect(() => {
    const q = (searchQuery ?? "").trim()
    if (!pagefind || q.length < 2) {
      setSearchActions([])
      return
    }
    lastQueryRef.current = q
    pagefind.search(q).then(async ({ results }) => {
      if (lastQueryRef.current !== q) return
      const top = results.slice(0, 12)
      const resolved = await Promise.all(
        top.map(async (r) => {
          const d = await r.data()
          return {
            id: `pf-${r.id}`,
            name: stripHtml(d.meta.title ?? d.url),
            subtitle: stripHtml(d.excerpt).slice(0, 140),
            section: "Articles",
            keywords: q,
            perform: () => { window.location.href = d.url },
          } satisfies Action
        })
      )
      const hasMatches = resolved.length > 0
      const fallback: Action = {
        id: `search-fallback`,
        name: `Search for "${q}" →`,
        subtitle: hasMatches
          ? "Open a full results page with all matches"
          : "No direct matches — open the full search results",
        section: "Search",
        keywords: q,
        priority: hasMatches ? -100 : 100,
        perform: () => { window.location.href = `/search?q=${encodeURIComponent(q)}` },
      }
      if (lastQueryRef.current === q) setSearchActions([...resolved, fallback])
    })
  }, [searchQuery, pagefind])

  useRegisterActions(searchActions, [searchActions])

  if (pagefindError) {
    return (
      <div style={{ padding: "12px 16px", color: "#9ca3af", fontSize: 13 }}>
        {pagefindError}
      </div>
    )
  }
  return null
}

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={{
            padding: "8px 16px",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#9ca3af",
            background: "#fafafa",
          }}>
            {item}
          </div>
        ) : (
          <div style={{
            padding: "10px 16px",
            background: active ? "#eff6ff" : "transparent",
            borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
            cursor: "pointer",
          }}>
            <div style={{ fontWeight: 500, fontSize: 14, color: "#1f2937" }}>{item.name}</div>
            {item.subtitle && (
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.subtitle}</div>
            )}
          </div>
        )
      }
    />
  )
}

export default function SearchModal() {
  return (
    <KBarProvider actions={STATIC_ACTIONS} options={{ enableHistory: true }}>
      <KBarPortal>
        <KBarPositioner style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999, padding: "10vh 16px 16px" }}>
          <KBarAnimator style={{
            maxWidth: 600,
            width: "100%",
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            border: "1px solid #e5e7eb",
          }}>
            <KBarSearch
              defaultPlaceholder="Search articles, navigate (⌘K)…"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: 15,
                border: "none",
                outline: "none",
                borderBottom: "1px solid #e5e7eb",
                background: "white",
              }}
            />
            <PagefindSearch />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  )
}
