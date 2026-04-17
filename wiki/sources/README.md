# Primary Source Reading Notes

Structured notes on primary sources read as part of the doctoral investigation. Nested by priority then by author. These notes feed the wiki's encyclopedia articles via the `/wiki absorb` skill (see [`../README.md`](../README.md)) and are the working surface where reading highlights, annotations and takeaways live.

## Directory layout

```
sources/
├── P1/          # Minimum-viable reading for writing a credible proposal
│   ├── alexander/
│   ├── bradley/
│   └── ...
├── P2/          # Deepens engagement; read after P1
│   ├── gaus/
│   └── ...
├── P3/          # Reference / background; read selectively as specific threads arise
│   └── math/
├── P4/          # Optional / historical / adjacent; read only if a specific question demands it
└── pdfs/        # Cached PDFs and HTML captures of primary sources, organised by surname
```

Priority tiers match the reading log (`../../3-project/working-papers/reading/reading-log.md`). Moving a source between tiers is a signal of re-prioritisation and should be logged in `../../3-project/working-papers/reading/changelog.md`.

Within an author directory, one file per work:

```
sources/P1/bradley/
├── bradley-2017-decision-theory-human-face.md
└── bradley-2022-impartial-evaluation-under-ambiguity.md
```

Filename convention: `{surname}-{year}-{short-title-slug}.md`. British English, no Oxford commas, no em dashes in content.

## Source note format

Each source note carries frontmatter plus standard content sections.

```yaml
---
title: "Work Title"
authors: First Last
year: YYYY
type: book | article | chapter | paper
publisher: Publisher (for books)
venue: Journal Name Vol(Issue) (for articles)
status: not started | reading | read | reread
priority: P1 | P2 | P3 | P4
date_started: YYYY-MM-DD
date_completed: YYYY-MM-DD
pdf_path: wiki/sources/pdfs/author/filename.pdf   # if cached
url: https://...                                  # if available online
access: open-access | paywall | institutional
related_articles: ["[[wiki-article-slug]]", ...]
---
```

Content sections (in order):

1. **Why this matters** — one paragraph on the source's place in the investigation and what it is expected to contribute.
2. **Takeaways** — generated when the source is marked read. 2-3 paragraphs summarising the core claim, what it means for the thesis, and what open questions it raises. Inline page references.
3. **Summary** — longer structured summary of the argument, with section or chapter signposting.
4. **Highlights** — page-numbered direct quotes and paraphrased key passages. This section is where the investigation's engagement with the primary text lives.
5. **Notes** — interpretive notes, connections to other sources, candidate wiki articles to create or update, tensions surfaced.

The Highlights and Notes sections are the primary signal the wiki skill looks for when absorbing the source into the encyclopedia. Keep them rich.

## Status conventions

- `not started`: file exists, frontmatter drafted, content sections empty or skeletal.
- `reading`: actively being worked through. `date_started` set. Progress may be tracked in frontmatter (`progress: "chapters 1-3 of 7"`).
- `read`: finished. `date_completed` set. Takeaways section written. Reading log updated via `/wiki reading update`.
- `reread`: revisited for a specific question. Previous notes preserved; new material added with date markers.

If a source has been partially engaged with via a Claude-assisted scan (not by the user directly), that is not a `read` status. Mark it as `not started` and describe the scan in the notes, noting the user's own reading is pending.

## Relationship to the reading log

The reading log (`../../3-project/working-papers/reading/reading-log.md`) is the master bibliography with priority markers, notes and status. Source notes in this directory are the working surface for specific sources the user has engaged with or is about to. Not every entry in the reading log has a source note here. Only sources being actively read or already read should have files.

When a source is marked `read`, the `/wiki reading update` command will sync the status back to the reading log and offer to run `/wiki absorb` on the new notes.

## PDF cache

`pdfs/` holds local copies of primary sources where access requires a download (paywalled PDFs from institutional subscriptions, scanned chapters, HTML captures). Organised by surname. These are read-only raw files and should not carry notes directly; notes go in the corresponding `.md` file in the author directory.
