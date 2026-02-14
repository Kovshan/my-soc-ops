import { useState } from 'react';
import { HowToPlayModal } from './HowToPlayModal';

interface StartScreenProps {
  onStart: () => void;
  onStartHunt?: () => void;
  onStartDeck?: () => void;
}

export function StartScreen({ onStart, onStartHunt, onStartDeck }: StartScreenProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-full p-6 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-marked opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-7xl sm:text-8xl font-black neon-glow tracking-tighter drop-shadow-2xl">
              Soc Ops
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 font-semibold tracking-wide">
              Social icebreaker bingo for in-person mixers
            </p>
          </div>

          {/* Layered Glass Card Section */}
          <div className="space-y-4 relative">
            {/* Background layer */}
            <div className="glass-card rounded-2xl p-8 absolute inset-0 translate-y-2 translate-x-2 opacity-20" />

            {/* Main card */}
            <div className="glass-card rounded-2xl p-8 relative space-y-6 border-l border-t border-cyan-400 border-opacity-30">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-center">
                  <span className="neon-text">Connect</span>
                  {' • '}
                  <span className="neon-text">Play</span>
                  {' • '}
                  <span className="neon-text">Win</span>
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
                  Mark 5 squares in a row to win! Every match brings people together in unexpected ways.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-700">
                {[
                  { label: '5x5', desc: 'Board' },
                  { label: '25', desc: 'Questions' },
                  { label: '∞', desc: 'Connections' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-accent">{stat.label}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={onStart}
              className="neon-btn px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400 order-1"
              aria-label="Start Game Now"
            >
              Start Game
            </button>
            {onStartHunt && (
              <button
                onClick={onStartHunt}
                className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
                aria-label="Start Scavenger Hunt"
              >
                Start Scavenger Hunt
              </button>
            )}
            {onStartDeck && (
              <button
                onClick={onStartDeck}
                className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
                aria-label="Start Card Deck Mode"
              >
                Card Deck Shuffle
              </button>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
              aria-label="Learn How to Play"
            >
              How to Play
            </button>
          </div>

          {/* Footer accent */}
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              🎲 Perfect for mixers & team events
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <HowToPlayModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
