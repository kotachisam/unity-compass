import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkWikilinks from "./src/lib/remark-wikilinks"
import rehypeMermaid from "./src/lib/rehype-mermaid"

export default defineConfig({
  site: "https://unity.samue.lk",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      exclude: ["@pagefind/default-ui"],
    },
  },
  integrations: [react(), mdx()],
  markdown: {
    gfm: true,
    smartypants: false,
    remarkPlugins: [remarkWikilinks, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      rehypeKatex,
      rehypeMermaid,
    ],
  },
})
