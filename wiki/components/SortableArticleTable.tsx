"use client"

import Link from "next/link"
import { useState } from "react"

interface ArticleRow {
  slug: string
  title: string
  type: string
  description: string
  created: string
  last_updated: string
  backlinks: number
}

type SortKey = "title" | "created" | "last_updated" | "backlinks"
type SortDir = "asc" | "desc"

export default function SortableArticleTable({ articles }: { articles: ArticleRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("title")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir(key === "backlinks" ? "desc" : "asc")
    }
  }

  const sorted = [...articles].sort((a, b) => {
    let cmp = 0
    if (sortKey === "title") cmp = a.title.localeCompare(b.title)
    else if (sortKey === "created") cmp = a.created.localeCompare(b.created)
    else if (sortKey === "last_updated") cmp = a.last_updated.localeCompare(b.last_updated)
    else if (sortKey === "backlinks") cmp = a.backlinks - b.backlinks
    return sortDir === "asc" ? cmp : -cmp
  })

  function arrow(key: SortKey) {
    if (sortKey !== key) return " \u2195"
    return sortDir === "asc" ? " \u2191" : " \u2193"
  }

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
            Article{arrow("title")}
          </th>
          <th>Description</th>
          <th onClick={() => handleSort("backlinks")} style={{ cursor: "pointer", width: 80, textAlign: "center" }}>
            Links{arrow("backlinks")}
          </th>
          <th onClick={() => handleSort("last_updated")} style={{ cursor: "pointer", width: 100 }}>
            Updated{arrow("last_updated")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((a) => (
          <tr key={a.slug}>
            <td>
              <Link href={`/wiki/${a.slug}`} style={{ fontWeight: 500 }}>
                {a.title}
              </Link>
            </td>
            <td style={{ fontSize: 12.5, color: "var(--wiki-border)" }}>
              {a.description}
            </td>
            <td style={{ textAlign: "center", fontSize: 12.5, color: "var(--wiki-border)" }}>
              {a.backlinks}
            </td>
            <td style={{ fontSize: 12.5, color: "var(--wiki-border)" }}>
              {a.last_updated}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
