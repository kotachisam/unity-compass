import { getCollection, getEntry, type CollectionEntry } from "astro:content"
import { slugify } from "./utils"

export type Article = CollectionEntry<"articles">

export async function getAllArticles(): Promise<Article[]> {
  const all = await getCollection("articles")
  return all.sort((a, b) => a.data.title.localeCompare(b.data.title))
}

export async function getArticlesByType(): Promise<Record<string, Article[]>> {
  const all = await getAllArticles()
  const grouped: Record<string, Article[]> = {}
  for (const article of all) {
    const type = article.data.type
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(article)
  }
  return grouped
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return await getEntry("articles", slug)
}

export async function getRandomSlug(): Promise<string> {
  const all = await getAllArticles()
  return all[Math.floor(Math.random() * all.length)].id
}

export async function getBacklinks(slug: string): Promise<Article[]> {
  const all = await getAllArticles()
  const target = all.find((a) => a.id === slug)
  if (!target) return []
  const targetTitle = target.data.title

  const out: Article[] = []
  for (const a of all) {
    if (a.id === slug) continue
    if (
      a.body?.includes(`[[${targetTitle}]]`) ||
      a.body?.includes(`](/wiki/${slug})`) ||
      a.data.related?.some((r) => slugify(r) === slug)
    ) {
      out.push(a)
    }
  }
  return out
}
