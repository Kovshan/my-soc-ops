import type { BingoSquareData } from '../types';

const PREVIEW_PROMPTS = [
  'Has traveled to 5+ countries',
  'Speaks 3+ languages',
  'Works in tech',
  'Plays an instrument',
  'Has written a book',
  'Loves hiking',
  'Vegan/Vegetarian',
  'Runs marathons',
  'Speaks French',
  'Worked in startup',
  'Paints or draws',
  'Has pets at home',
  'Free Space',
  'Loves cooking',
  'Professional dancer',
  'Climbed a mountain',
  'Plays chess',
  'Podcaster',
  'Speaks Spanish',
  'Studied abroad',
  'Built an app',
  'Volunteers regularly',
  'Speaks Japanese',
  'Professional athlete',
];

export function BoardPreview() {
  // Create board with some marked squares for visual preview
  const board: BingoSquareData[] = PREVIEW_PROMPTS.map((text, idx) => ({
    id: idx,
    text,
    isMarked: [0, 1, 2, 5, 12].includes(idx), // Mark a few for demo
    isFreeSpace: text === 'Free Space',
  }));

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-100">Get Started</h2>

      {/* Board Preview */}
      <div className="grid grid-cols-5 gap-1 w-full max-w-sm aspect-square">
        {board.map((square) => (
          <div
            key={square.id}
            className={`aspect-square rounded flex items-center justify-center text-xs font-semibold text-center p-1 transition-all ${
              square.isFreeSpace
                ? 'bg-accent text-white neon-glow'
                : square.isMarked
                  ? 'bg-marked text-black border-2 border-marked-border neon-border'
                  : 'bg-gray-900 text-gray-200 border border-gray-700 hover:border-accent'
            }`}
          >
            {square.isFreeSpace ? (
              <span className="font-bold">FREE</span>
            ) : (
              square.text
            )}
          </div>
        ))}
      </div>

      {/* Rules Card */}
      <div className="glass-card rounded-lg p-5 max-w-sm">
        <h3 className="font-bold text-gray-100 mb-3">How to Play</h3>
        <ol className="text-sm text-gray-300 space-y-1.5">
          <li>
            <span className="text-accent font-semibold">1.</span> Find people who match questions
          </li>
          <li>
            <span className="text-accent font-semibold">2.</span> Tap a square when you find a match
          </li>
          <li>
            <span className="text-accent font-semibold">3.</span> Get 5 in a row to <span className="text-bingo font-bold">BINGO!</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
