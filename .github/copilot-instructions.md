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

Purpose: Provide designers and contributors a concise reference for the Cyberpunk Neon redesign applied to the app.

- **Palette & Tokens**: Use the `@theme` tokens defined in `src/index.css`. Primary accent is neon pink (`--color-accent`), secondary neon cyan (`--color-marked`), and neon purple (`--color-bingo`). Prefer token names over hard-coded hex values in components and CSS.
- **Typography**: Keep system font stack but favour bold weights for headings and semibold for UI controls to improve legibility against neon glows.
- **Surfaces**: Use `.glass-card` for panels and headers to enable blurred/translucent backgrounds; fall back to solid dark surfaces under `prefers-reduced-transparency`.
- **Glow & Effects**: Apply `.neon-glow` and `.neon-ring` sparingly — reserve strong glows for CTAs, winning states, and modal titles. Respect `prefers-reduced-motion` and `prefers-reduced-transparency`.
- **Buttons**: Use `.neon-btn` for primary CTAs. Maintain clear focus outlines and accessible tap targets (≥44px recommended).
- **Cards & Modals**: Modals use `.neon-vignette` backdrop and `.glass-card` content; center modals and avoid excessive animation when `prefers-reduced-motion` is set.
- **SVGs & Assets**: Recolor existing SVGs to neon gradients and place replacements in `src/assets`. When adding new assets, prefer SVG with currentColor-friendly fills to allow token-driven recoloring.
- **Accessibility**: Check contrast for text-on-glass and neon overlays. Provide plain, high-contrast alternatives for users who disable transparency or motion.
- **Utilities**: Add new utilities in `src/index.css` under `@layer utilities`. Use these utilities (`neon-glow`, `neon-text`, `glass-card`, `neon-btn`) instead of repeating raw styles.

Usage notes:
- To change the theme colors safely, update the `@theme` block in `src/index.css` so existing component classes such as `bg-accent` and `bg-marked` will adopt the new palette automatically.
- Keep layout classes (grid, aspect-square, spacing) unchanged unless the change is layout-driven — the redesign is visual-first.
- Document any new utilities in `docs/STYLE.md` when added.
