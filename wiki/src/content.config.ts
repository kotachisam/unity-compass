import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const dateLike = z.union([z.string(), z.date()]).transform((v) =>
  v instanceof Date ? v.toISOString().split("T")[0] : v
)

const period = z.object({
  birth: dateLike.nullable().optional(),
  death: dateLike.nullable().optional(),
  flourished: z.string().nullable().optional(),
})

const linkEntry = z.object({
  to: z.string(),
  type: z.string(),
  provenance: z.enum(["absorbed", "wikidata", "manual", "derived"]).default("absorbed"),
  note: z.string().optional(),
})

const articles = defineCollection({
  loader: glob({
    pattern: "**/[!_]*.md",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    type: z.enum([
      "person",
      "concept",
      "work",
      "event",
      "institution",
      "source",
      "theory",
      "case-study",
    ]),
    created: dateLike.optional(),
    last_updated: dateLike.optional(),
    description: z.string().optional(),
    related: z.array(z.string()).optional().default([]),
    sources: z.array(z.string()).optional().default([]),
    source_notes: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    wikidata_qid: z.string().regex(/^Q\d+$/).nullable().optional(),
    period: period.optional(),
    date: dateLike.nullable().optional(),
    links: z.array(linkEntry).optional().default([]),
  }),
})

export const collections = { articles }
