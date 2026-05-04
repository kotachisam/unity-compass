import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const articlesDir = path.join(__dirname, "..", "src", "content", "articles")
const outPath = path.join(__dirname, "..", ".wikidata-cache", "qid-candidates.tsv")

const SEARCH_API = "https://www.wikidata.org/w/api.php"

const TYPE_HINTS: Record<string, { instanceOf: string[]; label: string }> = {
  person: { instanceOf: ["Q5"], label: "human" },
  concept: { instanceOf: ["Q151885", "Q11862829"], label: "concept | academic discipline" },
  work: { instanceOf: ["Q571", "Q47461344", "Q13442814"], label: "book | written work | scholarly article" },
  event: { instanceOf: ["Q1656682", "Q1190554"], label: "event | occurrence" },
  institution: { instanceOf: ["Q3918", "Q43229"], label: "university | organization" },
  theory: { instanceOf: ["Q17737", "Q151885"], label: "theory | concept" },
  "case-study": { instanceOf: ["Q1656682"], label: "event" },
  source: { instanceOf: ["Q571"], label: "book" },
}

interface SearchResult {
  id: string
  label: string
  description?: string
  match?: { type: string; text: string }
}

async function searchEntities(query: string): Promise<SearchResult[]> {
  const url = `${SEARCH_API}?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&limit=15&origin=*`
  const res = await fetch(url, { headers: { "User-Agent": "unity-compass-wiki/0.1 (samuelknorton@gmail.com)" } })
  if (!res.ok) throw new Error(`Wikidata search failed for "${query}": ${res.status}`)
  const json = (await res.json()) as { search: SearchResult[] }
  return json.search
}

async function instanceOf(qids: string[]): Promise<Record<string, string[]>> {
  if (qids.length === 0) return {}
  const url = `${SEARCH_API}?action=wbgetentities&ids=${qids.join("|")}&props=claims&format=json&origin=*`
  const res = await fetch(url, { headers: { "User-Agent": "unity-compass-wiki/0.1 (samuelknorton@gmail.com)" } })
  if (!res.ok) throw new Error(`Wikidata claims fetch failed: ${res.status}`)
  const json = (await res.json()) as { entities: Record<string, { claims?: { P31?: Array<{ mainsnak?: { datavalue?: { value?: { id?: string } } } }> } }> }
  const out: Record<string, string[]> = {}
  for (const [qid, entity] of Object.entries(json.entities)) {
    const ids: string[] = []
    for (const claim of entity.claims?.P31 ?? []) {
      const v = claim.mainsnak?.datavalue?.value?.id
      if (v) ids.push(v)
    }
    out[qid] = ids
  }
  return out
}

async function processOne(slug: string, title: string, type: string): Promise<{
  slug: string
  title: string
  type: string
  results: Array<{ qid: string; label: string; desc: string; instanceOf: string[]; matches_type: boolean }>
  auto_pick: string
}> {
  const hint = TYPE_HINTS[type]
  let candidates: SearchResult[] = []
  try {
    candidates = await searchEntities(title)
  } catch (e) {
    console.error(`  search error for ${title}:`, e instanceof Error ? e.message : e)
  }
  if (candidates.length === 0) {
    return { slug, title, type, results: [], auto_pick: "" }
  }

  let claimsMap: Record<string, string[]> = {}
  try {
    claimsMap = await instanceOf(candidates.map((c) => c.id))
  } catch (e) {
    console.error(`  claims error for ${title}:`, e instanceof Error ? e.message : e)
  }

  const enriched = candidates.map((c, originalIdx) => {
    const inst = claimsMap[c.id] ?? []
    const matchesType = hint ? inst.some((i) => hint.instanceOf.includes(i)) : false
    return {
      qid: c.id,
      label: c.label,
      desc: c.description ?? "",
      instanceOf: inst,
      matches_type: matchesType,
      originalIdx,
    }
  })

  const results = [...enriched].sort((a, b) => {
    if (a.matches_type !== b.matches_type) return a.matches_type ? -1 : 1
    return a.originalIdx - b.originalIdx
  })

  const exactTitle = title.toLowerCase()
  const highConfidence = results.filter(
    (r) => r.label.toLowerCase() === exactTitle && r.matches_type
  )
  const auto_pick = highConfidence.length === 1 ? highConfidence[0].qid : ""

  return { slug, title, type, results, auto_pick }
}

async function main() {
  const files = fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))

  const targets: { slug: string; title: string; type: string; existing_qid: string | null }[] = []
  for (const file of files) {
    const slug = file.replace(".md", "")
    const raw = fs.readFileSync(path.join(articlesDir, file), "utf8")
    const { data } = matter(raw)
    if (!TYPE_HINTS[data.type]) continue
    targets.push({
      slug,
      title: data.title || slug,
      type: data.type,
      existing_qid: data.wikidata_qid ?? null,
    })
  }

  console.log(`Resolving ${targets.length} entity articles against Wikidata...`)

  const lines: string[] = ["slug\ttitle\ttype\texisting_qid\tauto_pick\tcand1_qid\tcand1_label\tcand1_desc\tcand1_match\tcand2_qid\tcand2_label\tcand2_desc\tcand2_match\tcand3_qid\tcand3_label\tcand3_desc\tcand3_match"]

  for (const t of targets) {
    if (t.existing_qid) {
      console.log(`  [skip ${t.slug}] existing QID ${t.existing_qid}`)
      lines.push([t.slug, t.title, t.type, t.existing_qid, t.existing_qid, "", "", "", "", "", "", "", "", "", "", "", ""].join("\t"))
      continue
    }
    process.stdout.write(`  [${t.slug}] `)
    const result = await processOne(t.slug, t.title, t.type)
    const cells = [t.slug, t.title, t.type, "", result.auto_pick]
    for (let i = 0; i < 3; i++) {
      const r = result.results[i]
      if (r) cells.push(r.qid, r.label, r.desc.slice(0, 80), r.matches_type ? "✓" : "")
      else cells.push("", "", "", "")
    }
    lines.push(cells.join("\t"))
    if (result.auto_pick) console.log(`auto-pick ${result.auto_pick}`)
    else if (result.results.length === 0) console.log("no candidates")
    else console.log(`${result.results.length} candidates, needs review`)

    await new Promise((r) => setTimeout(r, 250))
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, lines.join("\n") + "\n")
  console.log(`\nWrote ${targets.length} rows to ${path.relative(process.cwd(), outPath)}`)
  console.log(`Review the TSV (open in spreadsheet), edit auto_pick column, then run: bun run wikidata:apply`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
