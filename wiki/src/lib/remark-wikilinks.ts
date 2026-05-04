import type { Root, Text, Link } from "mdast"
import { visit, SKIP } from "unist-util-visit"
import { slugify } from "./utils"

const WIKILINK_RE = /\[\[([^\]]+)\]\]/g

export default function remarkWikilinks() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || typeof index !== "number") return
      const value = node.value
      if (!value.includes("[[")) return

      const segments: Array<Text | Link> = []
      let lastIndex = 0
      for (const match of value.matchAll(WIKILINK_RE)) {
        const [full, label] = match
        const start = match.index ?? 0
        if (start > lastIndex) {
          segments.push({ type: "text", value: value.slice(lastIndex, start) })
        }
        const [target, alias] = label.split("|").map((s) => s.trim())
        const display = alias ?? target
        segments.push({
          type: "link",
          url: `/wiki/${slugify(target)}`,
          children: [{ type: "text", value: display }],
        })
        lastIndex = start + full.length
      }
      if (segments.length === 0) return
      if (lastIndex < value.length) {
        segments.push({ type: "text", value: value.slice(lastIndex) })
      }

      parent.children.splice(index, 1, ...segments)
      return [SKIP, index + segments.length]
    })
  }
}
