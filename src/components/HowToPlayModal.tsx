interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 neon-vignette">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full space-y-6 neon-ring">
        <h2 className="text-3xl font-bold neon-glow text-center">How to Play</h2>

        <div className="space-y-4">
          {[
            {
              num: 1,
              title: 'Find Matches',
              desc: 'Mingle and find people who match the prompts on your card',
            },
            {
              num: 2,
              title: 'Mark Squares',
              desc: 'Tap a square when you find someone who matches that description',
            },
            {
              num: 3,
              title: 'Get 5 in a Row',
              desc: 'Get 5 marked squares in a row (vertical, horizontal, or diagonal) to win!',
            },
            {
              num: 4,
              title: 'Celebrate',
              desc: 'Shout "BINGO!" and celebrate your win with your new friends',
            },
          ].map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold neon-glow">
                {step.num}
              </div>
              <div>
                <h3 className="font-bold text-gray-100 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full neon-btn py-3 rounded-lg font-bold text-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400"
        >
          Let's Play!
        </button>
      </div>
    </div>
  );
}
