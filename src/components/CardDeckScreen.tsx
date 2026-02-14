import { useMemo, useState, useCallback } from 'react';
import { questions } from '../data/questions';

// Simple Fisher-Yates shuffle
function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface CardDeckScreenProps {
  onBack: () => void;
}

export function CardDeckScreen({ onBack }: CardDeckScreenProps) {
  // Shuffle once per mount; no persistence in v1
  const deck = useMemo(() => shuffle(questions), []);
  const [index, setIndex] = useState<number | null>(null);

  const draw = useCallback(() => {
    setIndex((prev) => {
      // v1: allow repeats after reaching the end by reshuffling implicitly
      if (prev === null) return 0;
      const next = prev + 1;
      return next >= deck.length ? 0 : next;
    });
  }, [deck.length]);

  const current = index === null ? null : deck[index];

  return (
    <div className="min-h-full p-6 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold neon-text">Card Deck</h2>
        <div className="flex gap-2">
          <button onClick={() => setIndex(null)} className="px-4 py-2 rounded-lg border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400">Clear</button>
          <button onClick={onBack} className="px-4 py-2 rounded-lg border-2 border-gray-500 text-gray-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400">Back</button>
        </div>
      </header>

      {/* Tap card */}
      <div
        role="button"
        aria-label={current ? 'Draw next card' : 'Draw a card'}
        tabIndex={0}
        onClick={draw}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); draw(); } }}
        className="glass-card neon-ring rounded-2xl flex-1 flex items-center justify-center p-8 cursor-pointer select-none text-center"
      >
        {current ? (
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-widest text-gray-400 mb-3">Question</div>
            <p className="text-3xl sm:text-4xl font-bold leading-tight text-accent">
              {current}
            </p>
            <div className="mt-6 text-gray-400 text-sm">Tap anywhere to draw next</div>
          </div>
        ) : (
          <div className="max-w-xl">
            <h3 className="text-4xl font-black neon-text mb-3">Tap to Draw</h3>
            <p className="text-gray-300">Everyone opens this screen and taps to get a random prompt. Share, discuss, and keep tapping for new cards.</p>
          </div>
        )}
      </div>

      <footer className="flex justify-center">
        <button onClick={draw} className="neon-btn px-8 py-3 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400">
          {current ? 'Next Card' : 'Draw a Card'}
        </button>
      </footer>
    </div>
  );
}
