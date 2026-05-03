import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const articlesDir = path.join(__dirname, "..", "src", "content", "articles")
const tsvPath = path.join(__dirname, "..", ".wikidata-cache", "qid-candidates.tsv")

if (!fs.existsSync(tsvPath)) {
  console.error(`Missing TSV: ${tsvPath}\nRun: bun run wikidata:bootstrap`)
  process.exit(1)
}

const lines = fs.readFileSync(tsvPath, "utf8").split("\n").filter(Boolean)
const header = lines[0].split("\t")
const slugIdx = header.indexOf("slug")
const pickIdx = header.indexOf("auto_pick")
if (slugIdx === -1 || pickIdx === -1) {
  console.error("TSV missing required columns slug/auto_pick")
  process.exit(1)
}

let updated = 0
let skipped = 0
let cleared = 0

for (const line of lines.slice(1)) {
  const cells = line.split("\t")
  const slug = cells[slugIdx]
  const pick = (cells[pickIdx] ?? "").trim()

  const filePath = path.join(articlesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    console.warn(`  [skip] ${slug}: file not found`)
    continue
  }

  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  const existing = parsed.data.wikidata_qid as string | undefined

  if (!pick) {
    skipped++
    continue
  }

  if (pick === "NONE" || pick === "-") {
    if (existing) {
      delete parsed.data.wikidata_qid
      fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data))
      cleared++
      console.log(`  [clear] ${slug}: removed QID ${existing}`)
    }
    continue
  }

  if (!/^Q\d+$/.test(pick)) {
    console.warn(`  [skip] ${slug}: invalid QID "${pick}"`)
    continue
  }

  if (existing === pick) continue

  parsed.data.wikidata_qid = pick
  fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data))
  updated++
  console.log(`  [set] ${slug}: ${existing ? `${existing} → ` : ""}${pick}`)
}

console.log(`\nUpdated: ${updated} | Cleared: ${cleared} | Skipped: ${skipped}`)
