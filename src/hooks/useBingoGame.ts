import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode, HuntItem } from '../types';
import { questions } from '../data/questions';
import { generateHuntList, isHuntComplete, toggleHuntItem as toggleHuntItemUtil } from '../utils/huntLogic';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';

export interface BingoGameState {
  gameState: GameState;
  mode: GameMode;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
  // Hunt state
  huntItems: HuntItem[];
  showHuntModal: boolean;
}

export interface BingoGameActions {
  startGame: () => void;
  handleSquareClick: (squareId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
  // Mode + Hunt actions
  setMode: (mode: GameMode) => void;
  startHunt: () => void;
  startDeck: () => void;
  toggleHuntItem: (id: number) => void;
  resetHunt: () => void;
  dismissHuntModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  gameState: GameState;
  mode: GameMode;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  huntItems: HuntItem[];
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }
  
  if (typeof obj.gameState !== 'string' || !['start', 'playing', 'bingo'].includes(obj.gameState)) {
    return false;
  }
  
  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }
  
  const validSquares = obj.board.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const square = sq as Record<string, unknown>;
    return (
      typeof square.id === 'number' &&
      typeof square.text === 'string' &&
      typeof square.isMarked === 'boolean' &&
      typeof square.isFreeSpace === 'boolean'
    );
  });
  
  if (!validSquares) {
    return false;
  }
  
  if (obj.winningLine !== null) {
    if (typeof obj.winningLine !== 'object') {
      return false;
    }
    const line = obj.winningLine as Record<string, unknown>;
    if (
      typeof line.type !== 'string' ||
      !['row', 'column', 'diagonal'].includes(line.type) ||
      typeof line.index !== 'number' ||
      !Array.isArray(line.squares)
    ) {
      return false;
    }
  }
  
  // Validate mode
  if (typeof obj.mode !== 'string' || !['bingo', 'hunt', 'deck'].includes(obj.mode as string)) {
    return false;
  }

  // Validate huntItems
  if (!Array.isArray(obj.huntItems)) {
    return false;
  }
  const validHunt = obj.huntItems.every((it: unknown) => {
    if (!it || typeof it !== 'object') return false;
    const item = it as Record<string, unknown>;
    return (
      typeof item.id === 'number' &&
      typeof item.text === 'string' &&
      typeof item.checked === 'boolean'
    );
  });
  if (!validHunt) return false;

  return true;
}

function loadGameState(): Pick<BingoGameState, 'gameState' | 'board' | 'winningLine' | 'mode' | 'huntItems'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        board: parsed.board,
        winningLine: parsed.winningLine,
        mode: parsed.mode,
        huntItems: parsed.huntItems,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  gameState: GameState,
  board: BingoSquareData[],
  winningLine: BingoLine | null,
  mode: GameMode,
  huntItems: HuntItem[],
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      mode,
      board,
      winningLine,
      huntItems,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [mode, setMode] = useState<GameMode>(() => loadedState?.mode || 'bingo');
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [huntItems, setHuntItems] = useState<HuntItem[]>(() => loadedState?.huntItems || []);
  const [showHuntModal, setShowHuntModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, board, winningLine, mode, huntItems);
  }, [gameState, board, winningLine, mode, huntItems]);

  const startGame = useCallback(() => {
    setMode('bingo');
    setBoard(generateBoard());
    setWinningLine(null);
    setGameState('playing');
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [winningLine]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setMode('bingo');
    setBoard([]);
    setWinningLine(null);
    setShowBingoModal(false);
    setHuntItems([]);
    setShowHuntModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  // Hunt actions
  const startHunt = useCallback(() => {
    setMode('hunt');
    const list = generateHuntList(questions);
    setHuntItems(list);
    setShowHuntModal(false);
    setWinningLine(null);
    setBoard([]);
    setGameState('playing');
    // If somehow already complete (shouldn't happen), show modal
    if (isHuntComplete(list)) {
      queueMicrotask(() => setShowHuntModal(true));
    }
  }, []);

  // Card Deck mode: simple state flip; deck state is local to UI
  const startDeck = useCallback(() => {
    setMode('deck');
    setBoard([]);
    setWinningLine(null);
    setShowBingoModal(false);
    setHuntItems([]);
    setShowHuntModal(false);
    setGameState('playing');
  }, []);

  const toggleHunt = useCallback((id: number) => {
    setHuntItems((curr) => {
      const next = toggleHuntItemUtil(curr, id);
      if (isHuntComplete(next)) {
        queueMicrotask(() => setShowHuntModal(true));
      }
      return next;
    });
  }, []);

  const resetHunt = useCallback(() => {
    setHuntItems([]);
    setShowHuntModal(false);
  }, []);

  const dismissHuntModal = useCallback(() => {
    setShowHuntModal(false);
  }, []);

  return {
    gameState,
    mode,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    huntItems,
    showHuntModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
    setMode,
    startHunt,
    startDeck,
    toggleHuntItem: toggleHunt,
    resetHunt,
    dismissHuntModal,
  };
}
