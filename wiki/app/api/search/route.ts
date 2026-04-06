import { NextRequest, NextResponse } from "next/server"
import { searchArticles } from "@/lib/articles"

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || ""
  const results = searchArticles(q)
  return NextResponse.json(results)
}
