import type { HuntItem } from '../types';
export type { HuntItem } from '../types';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateHuntList(qs: string[]): HuntItem[] {
  const shuffled = shuffleArray(qs);
  return shuffled.map((text, idx) => ({ id: idx, text, checked: false }));
}

export function toggleHuntItem(items: HuntItem[], id: number): HuntItem[] {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return items; // no-op: preserve identity per tests

  const next = items.slice();
  const target = items[idx];
  next[idx] = { ...target, checked: !target.checked };
  return next;
}

export function getHuntProgress(items: HuntItem[]): { completed: number; total: number; percent: number } {
  const total = items.length;
  const completed = items.reduce((acc, i) => acc + (i.checked ? 1 : 0), 0);
  const percent = total === 0 ? 0 : (completed / total) * 100;
  return { completed, total, percent };
}

export function isHuntComplete(items: HuntItem[]): boolean {
  if (items.length === 0) return false;
  return items.every((i) => i.checked);
}
