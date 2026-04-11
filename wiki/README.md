# Unity Compass Wiki

Research knowledge wiki for the doctoral investigation into coordination across genuine value difference. Not a general-purpose encyclopedia: a structured map of the investigation's intellectual territory, built to support thesis writing, literature engagement and future face-to-face discussions with supervisors.

The wiki runs as a Next.js application for browsing but the canonical content is in markdown files that can be read and edited directly.

## What lives here

| Directory | Purpose |
|---|---|
| [`articles/`](articles/) | Compiled encyclopedia articles (concepts, theories, people, case studies, sources, institutions). The compiled knowledge base. Managed via the wiki skill. |
| [`sources/`](sources/) | Reading notes on primary sources, nested by priority and author. See [`sources/README.md`](sources/README.md). |
| [`app/source/`](app/source/) | Living research documents the Next.js app renders, including [`open-questions.md`](app/source/open-questions.md). |
| `questions/` | Questions system (placeholder, not yet active). |
| `articles/_index.md` | Master index of all articles with aliases for search. |
| `articles/_backlinks.json` | Reverse-link index: which articles reference which others. |
| `articles/_absorb_log.json` | Tracks which source files have been absorbed into the wiki. |

Next.js scaffolding (`app/`, `components/`, `lib/`, `public/`, `scripts/`, `package.json`, `tsconfig.json`, etc.) is the rendering layer and can be ignored when working with wiki content directly.

## How content flows into the wiki

The wiki is not hand-maintained. It is compiled from investigation sources using the `/wiki absorb` skill. The skill scans the parent repository (`1-theory/`, `2-practice/`, `3-project/working-papers/`) and the local `wiki/sources/` directory, reads every source, and writes or updates articles in `wiki/articles/` based on what it finds. See [`.claude/skills/wiki/SKILL.md`](../.claude/skills/wiki/SKILL.md) for the full skill definition and command set.

Key commands:

| Command | Purpose |
|---|---|
| `/wiki absorb all` | Compile all repo content into wiki articles |
| `/wiki absorb last 30` | Absorb content modified in the last 30 days |
| `/wiki update people` | Enrich person articles with publication links |
| `/wiki query <question>` | Ask a question against the compiled wiki |
| `/wiki reading status` | Show reading progress dashboard |
| `/wiki reading update` | Interactively update reading status for a source |
| `/wiki rebuild-index` | Rebuild `_index.md` and `_backlinks.json` |
| `/wiki status` | Show stats |

The wiki reads FROM investigation sources. It never writes back to them.

## How to navigate

**Looking for a thinker, theory or concept**: start with [`articles/_index.md`](articles/_index.md). Articles are organised by type (concepts, theories, people, case studies, sources, institutions).

**Looking for reading notes on a specific primary source**: go to [`sources/`](sources/). Sources are nested by priority (`P1/`, `P2/`, `P3/`, `P4/`) then by author surname.

**Looking for the open questions register**: see [`app/source/open-questions.md`](app/source/open-questions.md). This is the living record of genuinely unresolved conceptual questions about the coordination space.

**Looking for the reading log or methodological evolution**: those live in the parent repository at `3-project/working-papers/reading/reading-log.md` and `3-project/working-papers/writing/methodological-evolution.md` respectively. The wiki reads from them but does not duplicate them.

## Editing conventions

- Articles in `wiki/articles/` follow a consistent frontmatter schema (type, created, last_updated, related, sources, tags, description). See the wiki skill for the full format.
- Articles are structured by theme, not by which source document mentioned them. The skill's cleanup pass enforces this.
- Length targets: persons 20-80 lines, concepts 40-80, theories 50-100, case studies 30-60, sources 20-40, institutions 20-40.
- Direct quotes carry the voice; the surrounding prose is neutral encyclopedic.
- Wikilinks `[[like this]]` are the primary cross-referencing mechanism.

## Running the Next.js app (optional)

If you want to browse the wiki in a browser:

```bash
bun install
bun dev
```

Then open `http://localhost:3000`. This is not required for reading or editing the underlying markdown.

Note: this is a custom Next.js setup, not a vanilla `create-next-app`. See [`AGENTS.md`](AGENTS.md) for version-specific guidance before writing code against the rendering layer.
