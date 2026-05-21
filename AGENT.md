# Portfolio Site — Agent Spec

## What this is

Personal developer portfolio for Yamato (github.com/Amir0234-afk), a cybersecurity student at Tarbiat Modares University, Iran. Built with Astro 6, deployed to GitHub Pages. The site has five sections: landing, projects, blog, about, CV.

The scaffold is complete and running locally. The agent's job is content, configuration, and deployment wiring — not architecture.

---

## Tech stack

- **Astro 6** — static site, file-based routing, content collections via glob loader
- **MDX** — blog posts support components
- **Shiki** — build-time code highlighting, theme: `github-dark-dimmed`
- **@astrojs/sitemap**, **@astrojs/rss** — already integrated
- No client-side JS framework. No UI library.

---

## Design system

All tokens in `src/styles/global.css` under `:root`. Do not hardcode colors elsewhere.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0b0822` | Page background |
| `--bg-elev` | `#14102e` | Elevated background |
| `--surface` | `#1a1330` | Card/surface background |
| `--border` | `#1e3a8a` | Border color |
| `--accent` | `#8b5cf6` | Primary purple — links, active states |
| `--accent-hot` | `#ec4899` | Secondary pink — hover, highlights |
| `--text` | `#e7e5ee` | Body text |
| `--text-muted` | `#9aa0b4` | Secondary text |
| `--font-sans` | Inter | Body/UI |
| `--font-mono` | JetBrains Mono | Labels, tags, code, nav |

---

## File structure

```
src/
  components/
    Nav.astro           sticky nav with active-link indicator
    Footer.astro        links to GitHub, LinkedIn, RSS
    ProjectCard.astro   card with title, summary, stack tags, status badge
    PostCard.astro      blog post row with date, tags, summary
  layouts/
    Base.astro          head meta, OG tags, fonts, Nav, Footer, skip link
  pages/
    index.astro         landing: hero + featured projects + latest posts
    about.astro         bio, current focus, links
    projects/
      index.astro       grid of all non-draft projects
      [...slug].astro   project detail: rendered markdown + meta + repo/demo links
    blog/
      index.astro       list of all non-draft posts
      [...slug].astro   post detail: rendered MDX
    rss.xml.js          RSS feed
  content/
    content.config.ts   collection schemas (projects + blog, glob loader)
    projects/           one .md file per project
    blog/               one .mdx file per post
  styles/
    global.css          design tokens + base styles + utility classes
  config.ts             SITE object + NAV array — single source of truth
public/
  favicon.svg           diamond logo in brand colors
  cv.pdf                [MISSING — agent must not create, just note it]
.github/
  workflows/
    deploy.yml          push to main → build → GitHub Pages
```

---

## src/config.ts — update these fields

```ts
export const SITE = {
  name: 'Yamato',
  title: 'Yamato — Systems, ML, Game Dev',
  description: 'Cybersecurity student building systems software, ML pipelines, and games.',
  url: 'https://amir0234-afk.github.io',   // update if using custom domain
  author: 'Yamato',
  github: 'https://github.com/Amir0234-afk',
  email: '',       // fill in or leave empty
  linkedin: '',    // fill in or leave empty
};
```

---

## Content collections

### Project frontmatter schema

```md
---
title: string           required
summary: string         required — one line, shown in cards and meta
date: YYYY-MM-DD        required
updated: YYYY-MM-DD     optional
status: wip | active | shipped | archived
featured: true | false  true = appears on landing page (max 4 shown)
tags: [string]          topic tags, shown as #tag in muted text
stack: [string]         tech used, shown as pill tags on card
repo: https://...       optional
demo: https://...       optional
draft: true | false     true = hidden from all pages and feeds
---
```

### Blog frontmatter schema

```md
---
title: string
summary: string         shown in post list and meta description
date: YYYY-MM-DD
updated: YYYY-MM-DD     optional
tags: [string]
draft: true | false
---
```

---

## Projects to add

Add one `.md` file per project in `src/content/projects/`. Base content on the descriptions below. Write a proper body for each: ## Why, ## Approach, ## Results (if applicable), ## What I learned. Be technical and specific — this is the actual hiring signal.

### 1. IMDB Sentiment Analysis
- **File:** `imdb-sentiment.md`
- **Status:** shipped
- **Stack:** Python, PyTorch, HuggingFace Transformers
- **Tags:** nlp, ml, classification
- **Key result:** F1 0.93 on IMDB test set
- **Featured:** false

### 2. CNN Handwritten Character Recognition
- **File:** `cnn-handwriting.md`
- **Status:** shipped
- **Stack:** Python, PyTorch, NIST SD19
- **Tags:** ml, cv, cnn
- **Key result:** ~73% accuracy on NIST SD19 dataset
- **Featured:** false

### 3. License Plate Segmentation (U-Net)
- **File:** `license-plate-unet.md`
- **Status:** shipped
- **Stack:** Python, PyTorch, U-Net
- **Tags:** ml, cv, segmentation
- **Key result:** ~99% localization accuracy
- **Featured:** true

### 4. AML Detection — Elliptic Bitcoin Dataset
- **File:** `aml-detection.md` (already exists, expand the body)
- **Status:** shipped
- **Stack:** Python, PyTorch, PyTorch Geometric, cuML
- **Tags:** ml, gnn, security
- **Key result:** Best RF F1: 0.80; GNN underperformed tabular on this dataset
- **Featured:** true

### 5. Flappy Bird Clone — Unreal Engine 5.1
- **File:** `flappy-bird-ue5.md`
- **Status:** shipped
- **Stack:** Unreal Engine 5.1, Blueprints
- **Tags:** gamedev, ue5
- **Featured:** false

### 6. yshell — Toy Unix Shell in C
- **File:** `yshell.md` (already exists, update status when complete)
- **Status:** wip
- **Stack:** C, POSIX, GNU Make
- **Tags:** systems, c, unix
- **Featured:** true

### 7. Cold Promise — 2D Narrative Game
- **File:** `cold-promise.md`
- **Status:** active
- **Stack:** Godot 4, GDScript
- **Tags:** gamedev, godot, narrative
- **Featured:** true
- **Note:** active development, update body as milestones ship

### 8. Nexus Room — AI SaaS Platform
- **File:** `nexus-room.md`
- **Status:** active
- **Stack:** Python, FastAPI, React (or whatever the actual stack is)
- **Tags:** saas, ai, fullstack
- **Featured:** true
- **Note:** keep vague on unshipped features; focus on what exists

---

## About page

`src/pages/about.astro` — the body text is a placeholder. Rewrite to Yamato's voice. Keep these facts:

- Cybersecurity student, Tarbiat Modares University, Iran
- Working through C/Linux/OS internals (K&R, OSTEP, TLPI)
- Research focus: GraphRAG
- Active projects: Nexus Room (SaaS), Cold Promise (Godot game)
- Interests outside code: tabletop RPG/collaborative storytelling, anime/manga, miniature figure painting, music (Suno AI)
- GitHub: github.com/Amir0234-afk

Do not invent specifics. If a field is unknown, omit it or write a placeholder comment for Yamato to fill in.

---

## Blog posts to write

Minimum viable: one post per shipped or active project, one post about the learning roadmap. File naming: `YYYY-MM-DD-slug.mdx` is optional but helpful for sorting.

Suggested first posts (drafts welcome, set `draft: true` until ready):

1. `hello-systems.mdx` — already exists, edit to Yamato's voice
2. `graphrag-thesis-approach.mdx` — what the thesis is, why GraphRAG, early decisions
3. `aml-gnn-vs-tabular.mdx` — the result where RF beat GNN; lessons on when not to use GNNs
4. `building-cold-promise.mdx` — game dev devlog format, what the game is, current state

---

## Deployment

### GitHub Pages setup (do once)

1. Create repo named `amir0234-afk.github.io` on GitHub (user site — cleaner URL).
2. Push this project to `main` on that repo.
3. GitHub repo → Settings → Pages → Source: **GitHub Actions**.
4. The workflow at `.github/workflows/deploy.yml` handles everything on push.

If using a different repo name (e.g. `portfolio`), set `base: '/portfolio'` in `astro.config.mjs` and update `site` accordingly.

### CV

Drop `cv.pdf` into `public/`. It's linked from the nav. Do not generate or stub it.

---

## What the agent must NOT do

- Do not change the design system tokens.
- Do not add client-side JS frameworks (React, Vue, Svelte) unless explicitly asked.
- Do not add authentication, databases, or server-side rendering.
- Do not invent personal details (email, LinkedIn, CV content, project metrics) that aren't in this spec.
- Do not move, rename, or restructure files outside `src/content/`.
- Do not add features not listed here. Content and configuration only.
