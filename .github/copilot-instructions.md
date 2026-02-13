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
