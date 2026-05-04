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
            <div key={type} className="wiki-sidebar-category">
              <div
                className="wiki-sidebar-category-card"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => toggleCategory(type)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleCategory(type)
                  }
                }}
              >
                <a
                  href={`/category/${type}`}
                  className="wiki-sidebar-category-title"
                  onClick={(e) => e.stopPropagation()}
                >
                  {label}
                  <span>{articles.length}</span>
                </a>
                <svg
                  className="wiki-sidebar-category-chevron"
                  data-open={isOpen}
                  viewBox="0 0 12 12"
                  width="10"
                  height="10"
                  aria-hidden="true"
                >
                  <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {isOpen && (
                <ul className="wiki-sidebar-category-list">
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
