import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getArticlesByType } from "@/lib/articles"
import Sidebar from "@/components/Sidebar"
import SearchModal from "@/components/SearchModal"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Unity Compass Wiki",
  description: "Research knowledge base for coordination across genuine difference",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const byType = getArticlesByType()

  const sidebarData: Record<string, { slug: string; title: string }[]> = {}
  for (const [type, articles] of Object.entries(byType)) {
    sidebarData[type] = articles.map((a) => ({ slug: a.slug, title: a.title }))
  }

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="wiki-outer">
          <Sidebar articlesByType={sidebarData} />

          <main className="wiki-main">
            <div className="wiki-global-header">
              <form className="wiki-search" action="/search" method="get">
                <input type="text" name="q" placeholder="Search (⌘K)" />
                <button type="submit">Search</button>
              </form>
            </div>
            {children}
          </main>
        </div>
        <SearchModal />
      </body>
    </html>
  )
}
