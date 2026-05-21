---
title: "D&D AI Game Master"
summary: "Solo tabletop RPG with an LLM as the Game Master. FastAPI backend + React 19 frontend. Supports OpenAI, Anthropic, Gemini, Ollama, and custom endpoints."
date: 2026-03-01
status: active
featured: true
tags: [fullstack, ai, python, typescript]
stack: [Python, FastAPI, React, TypeScript, Vite, LLM]
repo: https://github.com/Amir0234-afk/dnd-ai
---

## What

A browser-based solo D&D experience where an LLM serves as the Game Master: narrating the world, responding to player actions, and maintaining persistent memory across sessions.

## Architecture

**Backend** — FastAPI + uvicorn. Handles prompt construction, LLM routing, and session persistence. Every 10 prompts, the backend synthesizes a long-term memory summary that's injected into subsequent context.

**Frontend** — React 19 + TypeScript + Vite + react-router-dom v7. URL routing for page transitions; no heavy state management framework needed.

**LLM layer** — Provider-agnostic: OpenAI, Anthropic, Gemini, Ollama, or any custom endpoint. Swapping providers is a config change.

## Key features

- Character creation with stat rolling and AI-generated backstory
- Session resumption: memory context is embedded into new sessions so the GM remembers what happened
- Dynamic narration adapts to player actions in real time

## Why it's interesting

The memory synthesis loop is the non-obvious part — naive LLM GMs forget everything after the context window. Summarising every N turns and re-injecting gives the illusion of continuity without ballooning token costs.
