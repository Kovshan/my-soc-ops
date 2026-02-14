# Copilot Instructions for my-soc-ops

## Development Checklist

- [ ] `npm run lint` — Run ESLint
- [ ] `npm run build` — Build for production (tsc + vite build)
- [ ] `npm run test` — Run Vitest tests

## Project Overview

**Soc Ops** is a React-based social bingo game for in-person mixers. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Architecture

**Single custom hook pattern**: `useBingoGame()` in [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts) manages all state. Game logic lives in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts), not the hook. State auto-persists to localStorage with validation.

**Core game logic**: 5×5 board with FREE SPACE at center (index 12). Win = 5 marked squares in a line (row/column/diagonal). Board uses Fisher-Yates shuffle on 24 questions from [src/data/questions.ts](src/data/questions.ts).

**Type system**: Domain types in [src/types/index.ts](src/types/index.ts) — use strict TypeScript with discriminated unions (`GameState = 'start' | 'playing' | 'bingo'`), never `any`.

## Key Conventions

- **Props**: Define as interfaces above component; use destructuring
- **localStorage**: Validate on load (not try-catch), include version field, clear invalid data
- **SSR guards**: Add `if (typeof window === 'undefined')` for server safety
- **State flow**: Three states — start → playing → bingo; only change on user action or win
- **Tests**: Co-located next to utilities (e.g., [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts)), focus on game rules in isolation

## Component Structure

```
App.tsx
├── StartScreen
├── GameScreen
│   └── BingoBoard
│       └── BingoSquare
└── BingoModal
```

## Quick Tasks

**Add feature**: Logic in bingoLogic.ts → expose in useBingoGame → wire in components

**Style changes**: Tailwind classes in JSX; use `@layer` directives in index.css

**Bug hunt**: Game logic → hook state flow → component rendering

**Data**: Edit [src/data/questions.ts](src/data/questions.ts) (24 questions + FREE_SPACE constant)

## Design Guide (Cyberpunk Neon)

Purpose: Concise guidance for the v3 landing (Neon Showcase) while keeping the system consistent.

- **Palette & Tokens**: Drive color through tokens in [src/index.css](src/index.css) (`--color-accent`, `--color-accent-light`, `--color-marked`, `--color-bingo`). Prefer tokens over hex. Small theme tweaks should only update the `@theme` block.
- **Typography**: System stack; heavy weight for hero titles (`font-bold`/`font-black`), semibold for CTAs and section labels for legibility against glow.
- **Surfaces**: Use `.glass-card` for content panels. Layer cards subtly (offset shadow/opacity) for depth. Under `prefers-reduced-transparency`, fall back to solid dark surfaces.
- **Glow & Motion**: Reserve strong `.neon-glow` for the hero title and key CTAs. Background accents may use soft pulsing orbs; all animations must respect `prefers-reduced-motion`.
- **Buttons**: Primary CTAs use `.neon-btn` with clear focus rings (cyan) and adequate hit area (≥44px). Secondary CTAs use bordered styles with token colors.
- **Cards & Modals**: Use `.neon-vignette` for modal backdrops and `.glass-card` for content. Center modals, minimize animation, and ensure ESC/overlay click closes when appropriate.
- **Showcase Elements (v3)**: Hero with `.neon-glow` title, layered `.glass-card` info block with a compact stats row (Board/Questions/Connections), and dual CTAs: “Start Game” and “How to Play”.
- **Accessibility**: Maintain WCAG-appropriate contrast on glass; ensure keyboard order, focus visibility, and ARIA labels (especially for the modal). Provide motion/transparency fallbacks.
- **Utilities**: Prefer shared utilities from [src/index.css](src/index.css) — `neon-glow`, `neon-text`, `glass-card`, `neon-btn`, `neon-ring`, `neon-vignette`. Add new utilities under `@layer utilities` and avoid per-component CSS.

Usage notes:
- Modify appearance by editing tokens in [src/index.css](src/index.css); component classes like `bg-accent`/`text-accent` will update automatically.
- Keep layout primitives (grid, spacing, aspect-square) stable unless a change is explicitly layout-driven.

