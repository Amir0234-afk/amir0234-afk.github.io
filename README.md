# Yamato — Portfolio

Astro static site. Content-first dev portfolio with blog, projects, and CV.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # → ./dist
npm run preview      # serve built site locally
```

Requires **Node 20+**.

## Stack

- **Astro 4** — static site generation, file-based routing, content collections.
- **MDX** — markdown + JSX in blog posts (embed components when needed).
- **Shiki** — code highlighting at build time (no client JS for syntax).
- **@astrojs/sitemap** + **@astrojs/rss** — SEO + feed out of the box.
- Zero client-side JS by default. Hydrate only what you need.

## Project layout

```
src/
  components/   reusable UI (Nav, Footer, ProjectCard, PostCard)
  layouts/      Base.astro — head meta, fonts, nav, footer
  pages/        file-based routes
    index.astro
    about.astro
    projects/index.astro
    projects/[...slug].astro
    blog/index.astro
    blog/[...slug].astro
    rss.xml.js
  content/
    config.ts                content collection schemas
    projects/*.md            project case studies
    blog/*.mdx               blog posts
  styles/global.css          design tokens + base styles
  config.ts                  SITE info + nav (single source of truth)
public/
  favicon.svg
  cv.pdf                     drop your CV here (linked from nav)
```

## Adding a project

Create `src/content/projects/my-project.md`:

```md
---
title: "My project"
summary: "One-line description."
date: 2026-06-01
status: wip          # wip | active | shipped | archived
featured: true       # shows on landing
tags: [systems, c]
stack: [C, POSIX]
repo: https://github.com/...
demo: https://...    # optional
---

## Why

Markdown body. Use headings, code blocks, lists, images.
```

## Adding a blog post

Create `src/content/blog/my-post.mdx`:

```mdx
---
title: "Post title"
summary: "One-line teaser shown in lists and meta tags."
date: 2026-06-01
tags: [systems, learning]
draft: false
---

Body. MDX lets you import and use Astro components inline if you want
interactive demos later.
```

Set `draft: true` to hide from production builds.

## Design tokens

All colours and typography live in `src/styles/global.css` under `:root`. Change them there, the whole site updates.

Current palette:
- `--bg: #0b0822` — background
- `--accent: #8b5cf6` — primary purple
- `--accent-hot: #ec4899` — secondary pink
- `--border / --accent-cool: #1e3a8a` — borders, deep blue

## Deploying to GitHub Pages

Two scenarios — pick one:

### A. User site (recommended): `amir0234-afk.github.io`

1. Create a repo named exactly `amir0234-afk.github.io` (case-sensitive).
2. In `astro.config.mjs` keep `base` commented out; `site` is already set.
3. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.

Live at `https://amir0234-afk.github.io/`.

### B. Project site: `amir0234-afk.github.io/portfolio`

1. Name the repo `portfolio` (or anything).
2. In `astro.config.mjs` uncomment `base: '/portfolio'`.
3. Same Pages setup + push.

Live at `https://amir0234-afk.github.io/portfolio/`.

## Content workflow

1. Draft locally → `npm run dev`.
2. Commit. The blog post itself is the deliverable, the repo history is the journal.
3. Push to `main`. CI builds and deploys in ~1 minute.

Cross-post finished blog posts to dev.to manually for distribution. The canonical URL stays here.

## What's not done yet

- `public/cv.pdf` — add your CV.
- Logo asset — drop yours into `public/` and reference it from `Nav.astro` if you want to replace the placeholder diamond.
- Social links in `src/config.ts` — fill in LinkedIn, email.
- OG image — generate a static `public/og.png` (1200×630) and add `image:` defaults to `Base.astro`.
