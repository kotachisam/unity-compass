import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify, extractWikilinks } from "./utils";

export const REPO_ROOT = path.resolve(process.cwd(), "..");

const SCAN_DIRS = ["1-theory", "2-practice", "3-project"];
const WIKI_SOURCES_DIR = path.join(process.cwd(), "sources");

const IGNORE_PATTERNS = [
  "README.md",
  "CLAUDE.md",
  "AGENTS.md",
  "_index.md",
  "_backlinks.json",
  "_absorb_log.json",
];

export interface RepoFile {
  path: string;
  title: string;
  lastModified: string;
  wikilinks: string[];
  entityMentions: string[];
}

function shouldIgnore(filename: string): boolean {
  return IGNORE_PATTERNS.some((p) => filename.endsWith(p));
}

function findMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (
      item.isDirectory() &&
      !item.name.startsWith(".") &&
      !item.name.startsWith("_")
    ) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (
      item.isFile() &&
      item.name.endsWith(".md") &&
      !shouldIgnore(item.name)
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractTitle(content: string, filePath: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  return path.basename(filePath, ".md").replace(/^\d+-/, "").replace(/-/g, " ");
}

export interface ArticleStub {
  slug: string;
  title: string;
}

export function scanRepoFiles(articles: ArticleStub[]): RepoFile[] {
  const files: RepoFile[] = [];
  const titleIndex = articles
    .filter((a) => a.title.length > 3)
    .map((a) => ({ slug: a.slug, lower: a.title.toLowerCase() }));

  const dirs = [
    ...SCAN_DIRS.map((d) => ({
      root: REPO_ROOT,
      full: path.join(REPO_ROOT, d),
    })),
    { root: process.cwd(), full: WIKI_SOURCES_DIR },
  ];

  for (const { root, full } of dirs) {
    const markdownFiles = findMarkdownFiles(full);
    for (const filePath of markdownFiles) {
      const content = fs.readFileSync(filePath, "utf8");
      const relativePath = path.relative(root, filePath);
      const { data } = matter(content);
      const stats = fs.statSync(filePath);
      const wikilinks = extractWikilinks(content);
      const contentLower = content.toLowerCase();
      const entityMentions = titleIndex
        .filter((t) => contentLower.includes(t.lower))
        .map((t) => t.slug);

      files.push({
        path: relativePath,
        title: data.title || extractTitle(content, filePath),
        lastModified: stats.mtime.toISOString().split("T")[0],
        wikilinks,
        entityMentions: [...new Set(entityMentions)],
      });
    }
  }

  return files;
}

export function getSourceReferences(
  articles: ArticleStub[],
): Record<string, RepoFile[]> {
  const repoFiles = scanRepoFiles(articles);
  const refs: Record<string, RepoFile[]> = {};

  for (const file of repoFiles) {
    for (const mention of file.entityMentions) {
      if (!refs[mention]) refs[mention] = [];
      refs[mention].push(file);
    }
    for (const wikilink of file.wikilinks) {
      const slug = slugify(wikilink);
      if (!refs[slug]) refs[slug] = [];
      if (!refs[slug].some((f) => f.path === file.path)) {
        refs[slug].push(file);
      }
    }
  }

  return refs;
}

export function getSourceReferencesForArticle(
  slug: string,
  articles: ArticleStub[],
): RepoFile[] {
  return getSourceReferences(articles)[slug] ?? [];
}

export function isSafeSourcePath(relativePath: string): boolean {
  const resolved = path.resolve(REPO_ROOT, relativePath);
  if (!resolved.startsWith(REPO_ROOT + path.sep) && resolved !== REPO_ROOT)
    return false;
  return resolved.endsWith(".md");
}

export function getAllSourcePaths(): string[] {
  const out: string[] = [];
  for (const d of SCAN_DIRS) {
    const full = path.join(REPO_ROOT, d);
    for (const f of findMarkdownFiles(full)) {
      out.push(path.relative(REPO_ROOT, f));
    }
  }
  for (const f of findMarkdownFiles(WIKI_SOURCES_DIR)) {
    out.push(path.relative(REPO_ROOT, f));
  }
  return out;
}
