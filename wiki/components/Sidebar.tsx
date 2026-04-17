"use client"

import Link from "next/link"
import { useState } from "react"

interface SidebarProps {
  articlesByType: Record<string, { slug: string; title: string }[]>
}

const typeLabels: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
}

export default function Sidebar({ articlesByType }: SidebarProps) {
  const [navOpen, setNavOpen] = useState(true)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

  function toggleCategory(type: string) {
    setOpenCategories((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <nav className="wiki-sidebar">
      <div className="wiki-sidebar-logo">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="wiki-logo-circle">UC</div>
          <h1>Unity Compass</h1>
          <p>The Research Wiki</p>
        </Link>
      </div>

      <div className={`wiki-sidebar-section ${navOpen ? "" : "collapsed"}`}>
        <div className="wiki-sidebar-section-header">
          <span>Navigation</span>
          <button className="toggle" onClick={() => setNavOpen(!navOpen)}>
            [{navOpen ? "hide" : "show"}]
          </button>
        </div>
        <ul>
          <li><Link href="/">Main page</Link></li>
          <li><Link href="/graph">Graph</Link></li>
          <li><Link href="/wiki/random">Random article</Link></li>
          <li><Link href="/search">Search</Link></li>
        </ul>
      </div>

      <div className="wiki-sidebar-section">
        <div className="wiki-sidebar-section-header">
          <span>Articles</span>
        </div>

        {Object.entries(typeLabels).map(([type, label]) => {
          const articles = articlesByType[type]
          if (!articles || articles.length === 0) return null
          const isOpen = openCategories[type] || false

          return (
            <div key={type} style={{ marginBottom: 2 }}>
              <div className="wiki-sidebar-category-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href={`/category/${type}`} style={{ fontWeight: 500, fontSize: 12 }}>
                  {label}
                  <span style={{ color: "var(--wiki-border)", fontWeight: 400, marginLeft: 4 }}>
                    ({articles.length})
                  </span>
                </Link>
                <button
                  className="toggle"
                  onClick={() => toggleCategory(type)}
                  style={{ fontSize: 10, background: "none", border: "none", color: "var(--wiki-link)", cursor: "pointer", padding: 0 }}
                >
                  [{isOpen ? "−" : "+"}]
                </button>
              </div>
              {isOpen && (
                <ul style={{ marginLeft: 4 }}>
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/wiki/${a.slug}`}>{a.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
