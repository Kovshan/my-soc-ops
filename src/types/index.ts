/** Domain types for the Bingo game */

export interface BingoSquareData {
  id: number;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

export interface BingoLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: number[];
}

export type GameState = 'start' | 'playing' | 'bingo';

// Multi-mode support
export type GameMode = 'bingo' | 'hunt';

// Scavenger Hunt item
export interface HuntItem {
  id: number;
  text: string;
  checked: boolean;
}
