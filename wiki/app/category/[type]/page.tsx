import { getAllArticles, getBacklinks } from "@/lib/articles"
import SortableArticleTable from "@/components/SortableArticleTable"
import Link from "next/link"
import { notFound } from "next/navigation"

const typeLabels: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
}

const typeDescriptions: Record<string, string> = {
  concept: "Ideas and principles the investigation develops or uses.",
  theory: "Formal frameworks the investigation engages with.",
  person: "Thinkers, researchers and key figures.",
  "case-study": "Real-world coordination cases examined by the investigation.",
  source: "Books, papers and journal articles referenced.",
  institution: "Universities, organisations and partnerships.",
}

export function generateStaticParams() {
  return Object.keys(typeLabels).map((type) => ({ type }))
}

export default async function CategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params

  if (!typeLabels[type]) notFound()

  const allArticles = getAllArticles().filter((a) => a.type === type)
  const label = typeLabels[type]
  const description = typeDescriptions[type]

  const tableData = allArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    type: a.type,
    description: a.description || "",
    created: a.created,
    last_updated: a.last_updated,
    backlinks: getBacklinks(a.slug).length,
  }))

  return (
    <>
      <div className="wiki-tab-bar">
        <div className="wiki-tabs-left">
          <span className="wiki-tab active">Category</span>
        </div>
        <div className="wiki-tabs-right" />
      </div>

      <div className="wiki-article" style={{ maxWidth: "100%" }}>
        <h1>Category: {label}</h1>
        <p style={{ color: "var(--wiki-border)", marginBottom: 16 }}>{description}</p>

        {allArticles.length === 0 ? (
          <p>No articles in this category yet.</p>
        ) : (
          <>
            <p style={{ marginBottom: 16, fontSize: 13 }}>
              {allArticles.length} {allArticles.length === 1 ? "article" : "articles"} in this category. Click column headers to sort.
            </p>

            <SortableArticleTable articles={tableData} />
          </>
        )}

        <div style={{ marginTop: 24, fontSize: 13 }}>
          <Link href="/">&larr; Back to main page</Link>
        </div>
      </div>
    </>
  )
}
