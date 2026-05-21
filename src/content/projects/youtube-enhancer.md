---
title: "YouTube Enhancer browser extension"
summary: "Manifest V3 browser extension with 30+ individually toggleable features: ad blocking, SponsorBlock, dislike restoration, playback controls, UI cleanup."
date: 2025-11-01
status: active
featured: true
tags: [web, browser-extension, javascript]
stack: [JavaScript, HTML, CSS, Manifest V3]
repo: https://github.com/Amir0234-afk/youtube-enhancer
---

## What

A browser extension that layers ~30 features onto YouTube, each independently togglable via a popup settings panel. No single opinionated preset — the user enables exactly what they want.

## Feature categories

- **Ad blocking** — auto-skip ads, remove banner overlays
- **Playback** — volume normalisation, speed control, background playback
- **UI** — cinema mode, mini player, hide Shorts/comments/chat
- **Integrations** — Return YouTube Dislike API (free), SponsorBlock
- **Utilities** — screenshot, custom keyboard shortcuts, visual filters

## Architecture

Manifest V3: `content.js` runs in the page context, `background.js` is a service worker, `popup/` handles the settings UI. Icon generation requires Node.js but the extension itself has no build step.

## Notes

Not on the Chrome Web Store — manual unpacking required. Built as a personal tool first; the repo is the artefact.
