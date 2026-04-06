"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith("/wiki/") || href?.startsWith("/source/") || href?.startsWith("/search")) {
            return <Link href={href}>{children}</Link>
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          )
        },
        h2: ({ children }) => {
          const text = String(children)
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          return <h2 id={id}>{children}</h2>
        },
        h3: ({ children }) => {
          const text = String(children)
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          return <h3 id={id}>{children}</h3>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
