import { Command } from "cmdk"
import { useEffect, useMemo, useState } from "react"

interface SearchEntry {
  slug: string
  title: string
  type: string
  description: string
  tags: string[]
}

interface SearchIndex {
  generated: string
  entries: SearchEntry[]
}

function score(entry: SearchEntry, q: string): number {
  const t = entry.title.toLowerCase()
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  if (t.includes(q)) return 60
  if (entry.tags.some((tag) => tag.toLowerCase().includes(q))) return 40
  if (entry.description.toLowerCase().includes(q)) return 30
  return 0
}

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState<SearchIndex | null>(null)

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
    if (!open || index) return
    fetch("/_search.json")
      .then((r) => r.json() as Promise<SearchIndex>)
      .then(setIndex)
      .catch(() => setIndex({ generated: "", entries: [] }))
  }, [open, index])

  const results = useMemo(() => {
    if (!index || !query.trim()) return []
    const q = query.toLowerCase()
    return index.entries
      .map((e) => ({ entry: e, s: score(e, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.entry.title.localeCompare(b.entry.title))
      .slice(0, 25)
      .map((r) => r.entry)
  }, [index, query])

  if (!open) return null

  return (
    <div className="wiki-search-overlay" onClick={() => setOpen(false)}>
      <div className="wiki-search-modal" onClick={(e) => e.stopPropagation()}>
        <Command label="Search articles">
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search the wiki..."
            autoFocus
          />
          <Command.List>
            {results.length === 0 && query.trim() && (
              <Command.Empty>No results.</Command.Empty>
            )}
            {results.map((r) => (
              <Command.Item
                key={r.slug}
                value={r.slug}
                onSelect={() => {
                  window.location.href = `/wiki/${r.slug}`
                }}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{r.title}</div>
                  {r.description && (
                    <div style={{ fontSize: 12, color: "var(--wiki-border)" }}>{r.description}</div>
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
