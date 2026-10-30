---
title: "License plate segmentation with U-Net"
summary: "3-class semantic segmentation of license plates using a U-Net in TensorFlow/Keras — background, border ring, and plate interior."
date: 2025-10-01
status: shipped
featured: false
tags: [ml, computer-vision, segmentation]
stack: [Python, TensorFlow, Keras]
repo: https://github.com/Amir0234-afk/license-plate-segmentation-unet
---

## Task

Segment license plate images into three pixel classes: outside background, white border ring, and black plate interior. Pixel accuracy: **0.9982**. IoU and Dice are not yet reported.

## Architecture

Standard U-Net encoder-decoder with skip connections. Input images paired with masks encoded as either alpha-channel PNG or single-channel 3-class PNG — both formats supported at training time.

## Pipeline

```bash
# Train
python -m src.train_unet --images data/images --masks data/masks --outdir models --epochs 50

# Predict with overlay
python -m src.predict_unet --images data/test --model models/unet.keras --out results --overlay
```

## Notes

- Mask format flexibility was a deliberate design choice: different labelling tools export differently.
- 0.9982 is pixel accuracy, which is dominated by easy background pixels; IoU/Dice are not yet reported. It is achievable here because the classes are visually distinct; the harder problem would be detecting plates in-the-wild before segmentation.
