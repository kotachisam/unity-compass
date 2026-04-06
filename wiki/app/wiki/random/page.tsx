import { redirect } from "next/navigation"
import { getRandomSlug } from "@/lib/articles"

export const dynamic = "force-dynamic"

export default function RandomArticle() {
  const slug = getRandomSlug()
  redirect(`/wiki/${slug}`)
}
