---
title: "zsh-vibecheck"
summary: "Three zsh functions that judge your actions: based, cringe, and vibecheck. ASCII art included. Pointless but necessary."
date: 2025-06-01
status: shipped
featured: false
tags: [shell, zsh, tools]
stack: [Shell, zsh]
repo: https://github.com/Amir0234-afk/zsh-vibecheck
---

## What

Three shell functions for your `.zshrc`:

- `based` — prints a gigachad with a BASED verdict
- `cringe` — prints a soyjak with a CRINGE verdict
- `vibecheck` — coin-flips between the two

## Install

```bash
# Manual
git clone https://github.com/Amir0234-afk/zsh-vibecheck ~/.config/zsh/vibecheck
source ~/.config/zsh/vibecheck/vibecheck.zsh

# oh-my-zsh plugin
# clone into $ZSH_CUSTOM/plugins/vibecheck, then add to plugins=()
```

Requires `pv` for the animated output.
