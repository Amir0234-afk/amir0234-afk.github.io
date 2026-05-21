---
title: "AML detection on the Elliptic Bitcoin dataset"
summary: "Graph neural networks vs. tabular baselines for anti-money-laundering classification. PyTorch Geometric + cuML. Best RF F1: 0.80."
date: 2025-12-10
status: shipped
featured: true
tags: [ml, gnn, security]
stack: [PyTorch, PyTorch Geometric, cuML, scikit-learn, Python]
repo: https://github.com/Amir0234-afk/aml-elliptic
---

## Problem

The Elliptic dataset is a labeled transaction graph: licit, illicit, unknown. Goal — classify the illicit nodes from graph structure plus tabular features, and see whether GNNs beat boring baselines.

## Approach

Two tracks in parallel:

- **Tabular baselines** — Logistic Regression and Random Forest on the feature matrix, accelerated with RAPIDS cuML.
- **GNN track** — GCN and SkipGCN variants in PyTorch Geometric, using the temporal split (train: steps 1–34, test: steps 35–49).
- **Hybrid** — GCN embeddings fed as features into Random Forest.

Five orchestrated phases: preprocessing → training → evaluation → embedding extraction → hybrid eval.

## Results

| Model              | Precision | Recall | F1 (illicit) |
|--------------------|-----------|--------|--------------|
| Random Forest      | 0.8992    | 0.7248 | **0.8027**   |
| RF + GCN Embeddings| 0.9929    | 0.6445 | 0.7816       |
| GCN                | —         | —      | 0.69         |

Tabular won on this dataset — the engineered features carry a lot. The hybrid approach traded recall for very high precision.

## Takeaways

- "Use a GNN" is not free; the feature engineering it implicitly replaces may already be doing the heavy lifting.
- Reproducibility hygiene matters more than model choice for write-ups like this.
- High precision / lower recall in the hybrid is a meaningful trade-off in AML: false positives are costly to investigate.
