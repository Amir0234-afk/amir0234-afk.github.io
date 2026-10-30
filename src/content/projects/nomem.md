---
title: "nomem"
summary: "Persistent per-user memory for LLM apps as a self-updating, bi-temporal knowledge graph."
date: 2026-09-02
status: active
featured: true
tags: [Python, SQLite, PostgreSQL, Neo4j, LLM]
stack: [Python, SQLite, PostgreSQL, Neo4j]
repo: https://github.com/Amir0234-afk/nomem
---

## What it does

nomem takes conversation turns, extracts entities and relationships, matches them against what the graph already knows, and applies CREATE, UPDATE and RETIRE operations. Facts that stop holding are retired rather than deleted, and both timelines are tracked: when a fact was true in the world and when nomem learned it. Retrieval returns a small, relevant subgraph inside a configurable token budget instead of a growing chat history. Storage backends are SQLite (default), PostgreSQL with pgvector, and Neo4j.

## Example

```python
# excerpt (see the README for the full example)
from nomem import MemoryGraph

with MemoryGraph(user_id="u123", backend_options={"path": "memory.sqlite"}) as graph:
    graph.ingest(
        user="Where's Kira living now?",
        assistant="Kira lives in Berlin.",
    )
    # ...
    for node in graph.retrieve("Where does Kira live?").nodes:
        print(node.type, node.label)
```

The full example, including retiring a contradicted fact and querying the graph as of an earlier checkpoint, is in the repository README.

## Install

```bash
pip install git+https://github.com/Amir0234-afk/nomem
```

## Licensing

The core is MIT; nomem-pro is a separate proprietary plugin sold at [https://no0nestudio.com](https://no0nestudio.com).
