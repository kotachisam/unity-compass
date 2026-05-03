import { useState } from "react"

interface SidebarProps {
  articlesByType: Record<string, { slug: string; title: string }[]>
  currentPath?: string
}

const typeLabels: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  work: "Works",
  event: "Events",
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
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="wiki-logo-circle">UC</div>
          <h1>Unity Compass</h1>
          <p>The Research Wiki</p>
        </a>
      </div>

      <div className={`wiki-sidebar-section ${navOpen ? "" : "collapsed"}`}>
        <div className="wiki-sidebar-section-header">
          <span>Navigation</span>
          <button className="toggle" onClick={() => setNavOpen(!navOpen)}>
            [{navOpen ? "hide" : "show"}]
          </button>
        </div>
        <ul>
          <li><a href="/">Main page</a></li>
          <li><a href="/wiki/random">Random article</a></li>
          <li><a href="/search">Search</a></li>
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
                <a href={`/category/${type}`} style={{ fontWeight: 500, fontSize: 12 }}>
                  {label}
                  <span style={{ color: "var(--wiki-border)", fontWeight: 400, marginLeft: 4 }}>
                    ({articles.length})
                  </span>
                </a>
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
                      <a href={`/wiki/${a.slug}`}>{a.title}</a>
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
