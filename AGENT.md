# Portfolio Site — Agent Spec

## What this is

Personal site for Yamato (github.com/Amir0234-afk), branded "Yamato — No One's Studio". M.Sc. Cybersecurity student (Tarbiat Modares University, Tehran) building nomem, researching verifiable inference for GraphRAG, and shipping local-first tools. Built with Astro 6, deployed to GitHub Pages at https://amir0234-afk.github.io. Sections: home, projects, blog, about, CV.

Content and configuration only; do not change architecture.

---

## Tech stack

- **Astro 6** — static site, file-based routing, content collections via glob loader
- **MDX** — blog posts support components
- **Shiki** — build-time code highlighting, theme `github-dark-dimmed`
- **@astrojs/sitemap**, **@astrojs/rss**
- **@astrojs/check** + **typescript** (dev only) for `npx astro check`
- No client-side JS framework. No UI library.
- **No third-party runtime assets.** Fonts (Inter, JetBrains Mono; latin woff2), images and icons are self-hosted under `public/`. No CDN fonts, scripts, analytics or badges.

---

## Design system

All tokens in `src/styles/global.css` under `:root`. Do not hardcode colors elsewhere. Do not change the tokens.

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
  components/   Nav, Footer, ProjectCard, PostCard
  layouts/      Base.astro — head meta, OG/twitter tags (default og.png), fonts preload, skip link (#main)
  pages/
    index.astro        hero + 4 featured projects + latest posts
    about.astro        short bio + contact links
    cv.astro           on-page HTML CV (noindex); CI prints it to /cv.pdf
    projects/          index + [...slug] detail
    blog/              index + [...slug] detail
    rss.xml.js
  content/
    projects/*.md      one file per project (schema below)
    blog/*.mdx         synced from dev.to by scripts/sync-devto.js — do not hand-edit
  content.config.ts    collection schemas
  styles/global.css    tokens, @font-face, base styles
  config.ts            SITE object + NAV array — single source of truth
public/
  fonts/               self-hosted woff2 + OFL licences
  og.png               1200x630 social card (source: scripts/og-source.svg)
  0234.png             256px nav logo
  favicon.ico          (favicon.svg is unused)
scripts/
  sync-devto.js        hourly dev.to import (sync-devto.yml)
  og-source.svg        source of public/og.png
.github/workflows/
  deploy.yml           push to main → build → print /cv to dist/cv.pdf → GitHub Pages
  sync-devto.yml       imports dev.to posts into src/content/blog
```

---

## Content collections

### Project frontmatter

```md
---
title: string           required
summary: string         required — one line, shown in cards and meta
date: YYYY-MM-DD        required (home page featured cards sort by date, newest first, max 4)
updated: YYYY-MM-DD     optional
status: wip | active | shipped | archived
featured: true | false  true = appears on the home page
tags: [string]
stack: [string]
repo: https://...       optional
demo: https://...       optional
draft: true | false     true = hidden from all pages and feeds
---
```

Blog frontmatter is produced by the sync script (title, summary, date, tags, cover_image, devto_url, draft).

---

## Rules

- Do not invent facts: no email on the public site (the CV intentionally lists one), no metrics, no dates, no release claims. Leave a marked TODO instead.
- Do not link to or describe private repos (thesis code, bot, storefront code, nomem-pro). The thesis may only appear generically as research.
- Use the git-URL install line for nomem until PyPI ownership is confirmed by the owner.
- Do not edit blog post bodies.
- No new dependencies unless essential.
- Keep `noindex` on `/cv`.

## CV

`/cv` is the single HTML source for both the page and `cv.pdf`. CI serves `dist/`, prints `/cv` with headless Chrome (`--virtual-time-budget` so self-hosted fonts load) and uploads the result as `dist/cv.pdf`. `cv.pdf` is not committed and does not exist in local builds.

## Deployment

User site `amir0234-afk.github.io`, GitHub Pages source set to GitHub Actions. `site` in `astro.config.mjs` is `https://amir0234-afk.github.io`; leave `base` unset.
