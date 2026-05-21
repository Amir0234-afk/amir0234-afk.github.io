---
title: "CNN experiments on NIST SD19 handwritten characters"
summary: "Modular CNN pipeline for systematic architecture search on the NIST SD19 handwritten character dataset. 0.7835 test accuracy."
date: 2025-07-01
status: shipped
featured: false
tags: [ml, computer-vision, cnn]
stack: [Python, TensorFlow, NumPy, scikit-learn, OpenCV]
repo: https://github.com/Amir0234-afk/CNN-Experiments-on-NIST-SD19-Handwritten-Characters
---

## Goal

Systematic exploration of CNN architecture decisions on NIST SD19: filter count, kernel size, layer depth, pooling strategy (max vs average), and activation functions (ReLU, sigmoid, tanh).

## Setup

- **Dataset:** NIST SD19 handwritten characters
- **Training:** 50 epochs, batch size 64, Adam optimizer, categorical cross-entropy
- **Evaluation:** test accuracy 0.7835, micro/macro/weighted F1, per-class metrics, confusion matrix

## Output

Each run saves: confusion matrix heatmap, sample prediction grid, misclassification log, per-class F1 report. Reproducible via fixed seeds.

## Takeaway

Max pooling + ReLU reliably outperformed the alternatives on this dataset. The modular structure made ablations cheap to run.
