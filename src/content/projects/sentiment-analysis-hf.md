---
title: "BERT sentiment classification"
summary: "Binary sentiment classifier fine-tuned on IMDB and SST-2 using Hugging Face Transformers. Reproducible training pipeline with configurable checkpoints."
date: 2025-09-01
status: shipped
featured: false
tags: [ml, nlp, transformers]
stack: [Python, Hugging Face Transformers, BERT, PyTorch]
repo: https://github.com/Amir0234-afk/sentiment-analysis-hf
---

## What

A binary sentiment classification pipeline built on BERT-family models from Hugging Face. Supports training on IMDB or SST-2 out of the box, or any custom CSV. Evaluation reports accuracy and macro-F1.

## Design

- Any HuggingFace checkpoint can be swapped in via a single config line — not tied to `bert-base-uncased`.
- Trainer API with YAML configuration keeps hyperparameters reproducible and diff-able.
- Batch prediction from CSV or raw text; evaluation saves per-class F1 breakdowns.

## Why it matters

Fine-tuning a pre-trained transformer is the practical baseline for any text classification problem. This repo is the reusable scaffold: swap the dataset, swap the model, get results.
