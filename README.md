# Planning Poker

A mobile-first Scrum Planning Poker PWA. Pick your estimate, reveal together.

## Features

- 9 Fibonacci cards (1, 2, 3, 5, 8, 13, 21, 34, 55)
- Tap to select, reveal to show your card face-down, tap to flip
- Light and dark theme (respects system preference)
- Works offline (service worker)
- No dependencies, no build step — vanilla HTML/CSS/JS

## Usage

1. Pick a card from the grid
2. Tap **Reveal** to enter single-card view (card shown face-down)
3. Tap the card to flip and show your estimate
4. Tap **Pick again** to return to the grid

## Deploy

Hosted on GitHub Pages via Actions. Push to `main` and the workflow deploys automatically.

To enable: repo **Settings → Pages → Source → GitHub Actions**.
