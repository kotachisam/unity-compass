export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const WIKILINK_PATTERN = /\[\[([^\]]+)\]\]/g

export function extractWikilinks(content: string): string[] {
  const links: string[] = []
  const pattern = new RegExp(WIKILINK_PATTERN.source, "g")
  let match
  while ((match = pattern.exec(content)) !== null) {
    links.push(match[1])
  }
  return [...new Set(links)]
}
