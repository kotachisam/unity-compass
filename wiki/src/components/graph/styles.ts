export const TYPE_COLOURS: Record<string, string> = {
  concept: "#3b82f6",
  theory: "#8b5cf6",
  person: "#10b981",
  work: "#06b6d4",
  event: "#f59e0b",
  "case-study": "#f97316",
  source: "#ef4444",
  institution: "#6b7280",
  ghost: "#94a3b8",
}

export const TYPE_LABELS: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  work: "Works",
  event: "Events",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
  ghost: "Wikidata neighbours",
}

export const EDGE_COLOURS: Record<string, string> = {
  references: "#cbd5e1",
  influenced_by: "#3b82f6",
  developed: "#10b981",
  critiqued: "#ef4444",
  cites: "#94a3b8",
  engages_concept: "#8b5cf6",
  doctoral_advisor: "#0891b2",
  doctoral_student: "#0891b2",
  field_of_work: "#a78bfa",
  author_of: "#f59e0b",
  notable_work: "#f59e0b",
  part_of: "#9ca3af",
  contemporary_of: "#d1d5db",
}

export const TIER_1_EDGE_TYPES = new Set([
  "references",
  "influenced_by",
  "developed",
  "critiqued",
  "cites",
  "engages_concept",
  "doctoral_advisor",
  "doctoral_student",
  "field_of_work",
])

export const DEFAULT_OFF_EDGE_TYPES = new Set([
  "contemporary_of",
  "part_of",
  "author_of",
  "notable_work",
])

export function nodeRadius(wordCount?: number): number {
  if (typeof wordCount !== "number") return 8
  return Math.max(8, Math.min(28, Math.sqrt(wordCount) / 2))
}
