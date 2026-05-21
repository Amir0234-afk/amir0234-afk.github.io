---
title: "Housing price prediction with DNN"
summary: "Keras deep neural network regressor for housing price prediction, with a pure-NumPy 2-hidden-layer baseline for comparison."
date: 2024-06-01
status: shipped
featured: false
tags: [ml, regression, keras]
stack: [Python, Keras, TensorFlow, NumPy, Pandas]
repo: https://github.com/Amir0234-afk/housing-price-prediction-DNN
---

## What

Two models trained side-by-side on tabular housing data:

- **Keras DNN** — saved with scaler, `.keras` model file, `metrics.json`, and training history plot.
- **NumPy baseline** — 2-hidden-layer network implemented from scratch; no framework, just matrix ops.

## Why the NumPy baseline

Writing backprop by hand, even once, makes the framework abstraction meaningful rather than magical.

## Reproducibility

Deterministic seeds set across NumPy, Python, and TensorFlow. Results are stable across runs.
