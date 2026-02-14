import { getHuntProgress, type HuntItem } from '../utils/huntLogic';

interface ScavengerScreenProps {
  items: HuntItem[];
  onToggle: (id: number) => void;
  onReset: () => void;
  onBack: () => void;
}

export function ScavengerScreen({ items, onToggle, onReset, onBack }: ScavengerScreenProps) {
  const progress = getHuntProgress(items);
  const percent = Math.round(progress.percent);

  return (
    <div className="min-h-full p-6 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold neon-text">Scavenger Hunt</h2>
        <div className="flex gap-2">
          <button onClick={onReset} className="px-4 py-2 rounded-lg border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400">Reset</button>
          <button onClick={onBack} className="px-4 py-2 rounded-lg border-2 border-gray-500 text-gray-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400">Back</button>
        </div>
      </header>

      {/* Progress meter */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Progress</span>
          <span className="text-sm text-gray-300">{progress.completed}/{progress.total} • {percent}%</span>
        </div>
        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Checklist */}
      <div className="glass-card rounded-xl p-4">
        <ul className="divide-y divide-white/10">
          {items.map((item) => (
            <li key={item.id} className="py-3 flex items-start gap-3">
              <input
                id={`hunt-${item.id}`}
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggle(item.id)}
                className="mt-1 h-5 w-5 accent-cyan-400"
                aria-label={item.text}
              />
              <label htmlFor={`hunt-${item.id}`} className={`flex-1 ${item.checked ? 'text-accent opacity-80' : ''}`}>
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
