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
    <nav className="wiki-sidebar" aria-label="Wiki navigation">
      <div className="wiki-sidebar-logo">
        <a href="/">
          <div className="wiki-logo-circle">UC</div>
          <h1>Unity Compass</h1>
          <p>The Research Wiki</p>
        </a>
      </div>

      <div className={`wiki-sidebar-section ${navOpen ? "" : "collapsed"}`}>
        <div className="wiki-sidebar-section-header">
          <span>Navigation</span>
          <button className="toggle" type="button" onClick={() => setNavOpen(!navOpen)}>
            [{navOpen ? "hide" : "show"}]
          </button>
        </div>
        <ul>
          <li><a href="/">Main page</a></li>
          <li><a href="/graph">Graph view</a></li>
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
            <div key={type} style={{ marginBottom: 4 }}>
              <div className="wiki-sidebar-category-header">
                <a href={`/category/${type}`}>
                  {label}
                  <span>({articles.length})</span>
                </a>
                <button
                  className="toggle"
                  type="button"
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${label}`}
                  onClick={() => toggleCategory(type)}
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
