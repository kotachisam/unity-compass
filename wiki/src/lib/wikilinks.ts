import { slugify } from "./utils"

const WIKILINK_RE = /\[\[([^\]]+)\]\]/g
const HEADING_RE = /^(#{2,3})\s+(.+)$/gm

export function resolveWikilinks(markdown: string): string {
  return markdown.replace(WIKILINK_RE, (_, text) => {
    return `[${text}](/wiki/${slugify(text)})`
  })
}

export function extractHeadings(markdown: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = []
  for (const match of markdown.matchAll(HEADING_RE)) {
    const text = match[2].trim()
    headings.push({ level: match[1].length, text, id: slugify(text) })
  }
  return headings
}
