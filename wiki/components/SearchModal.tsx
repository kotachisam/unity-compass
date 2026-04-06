"use client"

import { Command } from "cmdk"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface SearchResult {
  slug: string
  title: string
  type: string
  description?: string
}

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
    }, 150)
    return () => clearTimeout(timeout)
  }, [query])

  function navigate(slug: string) {
    setOpen(false)
    setQuery("")
    setResults([])
    router.push(`/wiki/${slug}`)
  }

  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        backdropFilter: "blur(2px)",
      }}
      onClick={() => { setOpen(false); setQuery(""); setResults([]) }}
    >
      <div
        style={{
          background: "var(--wiki-bg)",
          border: "1px solid var(--wiki-border)",
          borderRadius: 12,
          width: 560,
          maxWidth: "90vw",
          boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Command shouldFilter={false}>
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search articles..."
            style={{
              width: "100%",
              padding: "16px 20px",
              border: "none",
              borderBottom: "1px solid var(--wiki-border-light)",
              fontSize: 17,
              background: "transparent",
              color: "var(--wiki-text)",
              outline: "none",
              fontFamily: "var(--font-inter), -apple-system, sans-serif",
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false)
                setQuery("")
                setResults([])
              }
            }}
          />
          <Command.List style={{ maxHeight: 360, overflowY: "auto" }}>
            {loading && <Command.Loading style={{ padding: 20, textAlign: "center", color: "var(--wiki-border)", fontSize: 14 }}>Searching...</Command.Loading>}
            {!loading && query && results.length === 0 && (
              <Command.Empty style={{ padding: 20, textAlign: "center", color: "var(--wiki-border)", fontSize: 14 }}>
                No results for &ldquo;{query}&rdquo;
              </Command.Empty>
            )}
            {results.map((r) => (
              <Command.Item
                key={r.slug}
                value={r.slug}
                onSelect={() => navigate(r.slug)}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: 8,
                  borderBottom: "1px solid var(--wiki-border-light)",
                }}
                data-selected={undefined}
              >
                <span style={{ fontWeight: 600, fontSize: 15, color: "var(--wiki-link)" }}>{r.title}</span>
                <span style={{
                  fontSize: 11, color: "var(--wiki-border)", padding: "1px 6px",
                  border: "1px solid var(--wiki-border-light)", borderRadius: 3,
                }}>{r.type}</span>
                {r.description && (
                  <span style={{
                    width: "100%", fontSize: 13, color: "var(--wiki-border)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{r.description}</span>
                )}
              </Command.Item>
            ))}
          </Command.List>
          <div style={{
            padding: "8px 20px", display: "flex", gap: 16, fontSize: 12,
            color: "var(--wiki-border)", borderTop: "1px solid var(--wiki-border-light)",
          }}>
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>esc close</span>
          </div>
        </Command>
      </div>
    </div>
  )
}
