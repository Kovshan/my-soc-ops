interface HuntCompleteModalProps {
  onDismiss: () => void;
  onPlayAgain: () => void;
  onBackToStart: () => void;
}

export function HuntCompleteModal({ onDismiss, onPlayAgain, onBackToStart }: HuntCompleteModalProps) {
  return (
    <div className="neon-vignette fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md shadow-xl relative">
        <h3 className="text-2xl font-bold neon-text mb-2">All items found!</h3>
        <p className="text-gray-300 mb-6">Nice work. You completed the scavenger list.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onPlayAgain}
            className="neon-btn px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
          >
            Play Again
          </button>
          <button
            onClick={onBackToStart}
            className="px-4 py-2 rounded-lg border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
          >
            Back to Start
          </button>
          <button
            onClick={onDismiss}
            className="px-4 py-2 rounded-lg border-2 border-gray-500 text-gray-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
