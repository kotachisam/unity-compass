import type { Root, Element, ElementContent } from "hast"
import { visit } from "unist-util-visit"

function extractText(node: ElementContent): string {
  if (node.type === "text") return node.value
  if (node.type === "element") {
    return node.children.map(extractText).join("")
  }
  return ""
}

export default function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "pre") return
      const code = node.children.find(
        (c) => c.type === "element" && c.tagName === "code",
      ) as Element | undefined
      if (!code) return

      const classes = (code.properties?.className as string[] | undefined) ?? []
      if (!classes.some((c) => c === "language-mermaid")) return

      const text = code.children.map(extractText).join("").trimEnd()

      node.properties = { ...(node.properties ?? {}), className: ["mermaid"] }
      node.children = [{ type: "text", value: text }]
    })
  }
}
