import { questions, FREE_SPACE } from '../data/questions';
import { generateHuntList, toggleHuntItem, getHuntProgress, isHuntComplete, type HuntItem } from './huntLogic';

// Helper to check multiset equality without relying on order
function sortedCopy<T>(arr: T[]): T[] {
  return [...arr].sort() as T[];
}

describe('huntLogic', () => {
  describe('generateHuntList', () => {
    it('returns 24 items, all unchecked', () => {
      const items = generateHuntList(questions);
      expect(items).toHaveLength(24);
      expect(items.every((i: HuntItem) => i.checked === false)).toBe(true);
    });

    it('excludes FREE SPACE; texts come from questions', () => {
      const items = generateHuntList(questions);
      const texts = items.map((i: HuntItem) => i.text);
      expect(texts.every((t: string) => questions.includes(t))).toBe(true);
      expect(texts.includes(FREE_SPACE)).toBe(false);
    });

    it('IDs are numeric and unique', () => {
      const items = generateHuntList(questions);
      const ids = items.map((i: HuntItem) => i.id);
      expect(ids.every((id: number) => typeof id === 'number' && Number.isInteger(id))).toBe(true);
      expect(new Set(ids).size).toBe(24);
    });

    it('is a permutation of questions (content match, order ignored)', () => {
      const items = generateHuntList(questions);
      const itemTexts = sortedCopy(items.map((i: HuntItem) => i.text));
      const expected = sortedCopy(questions);
      expect(itemTexts).toEqual(expected);
    });
  });

  describe('toggleHuntItem', () => {
    it('toggles only the target ID; others unchanged', () => {
      const items = generateHuntList(questions);
      const target = items[0];
      const toggled = toggleHuntItem(items, target.id);

      // Target flipped
      const newTarget = toggled.find((i: HuntItem) => i.id === target.id)!;
      expect(newTarget.checked).toBe(true);

      // Others unchanged (value)
      for (const i of items as HuntItem[]) {
        if (i.id === target.id) continue;
        const after = toggled.find((x: HuntItem) => x.id === i.id)!;
        expect(after.checked).toBe(i.checked);
      }
    });

    it('is pure: returns new array; original not mutated', () => {
      const items = generateHuntList(questions);
      const target = items[0];
      const toggled = toggleHuntItem(items, target.id);

      // New array instance
      expect(toggled).not.toBe(items);

      // Target item is a new object; non-targets preserve identity
      const beforeIdx = items.findIndex((i: HuntItem) => i.id === target.id);
      const afterIdx = toggled.findIndex((i: HuntItem) => i.id === target.id);
      expect(toggled[afterIdx]).not.toBe(items[beforeIdx]);
      // Check a sample of non-targets (up to 3) preserve reference identity
      const sample = (items as HuntItem[]).filter((i: HuntItem) => i.id !== target.id).slice(0, 3);
      for (const s of sample) {
        const after = toggled.find((i: HuntItem) => i.id === s.id)!;
        expect(after).toBe(s);
      }

      // Original remains unchecked
      expect(items[beforeIdx].checked).toBe(false);
    });

    it('nonexistent ID produces identical array (no-op)', () => {
      const items = generateHuntList(questions);
      const toggled = toggleHuntItem(items, 999999);
      expect(toggled).toEqual(items);
      // Prefer the identity to remain the same if nothing changed
      expect(toggled).toBe(items);
    });

    it('toggling twice restores original state', () => {
      const items = generateHuntList(questions);
      const target = items[0];
      const once = toggleHuntItem(items, target.id);
      const twice = toggleHuntItem(once, target.id);

      const original = items.find((i: HuntItem) => i.id === target.id)!;
      const afterTwice = twice.find((i: HuntItem) => i.id === target.id)!;
      expect(afterTwice.checked).toBe(original.checked);
    });
  });

  describe('getHuntProgress', () => {
    it('initial progress is 0 of 24 (0%)', () => {
      const items = generateHuntList(questions);
      const p = getHuntProgress(items);
      expect(p.completed).toBe(0);
      expect(p.total).toBe(24);
      expect(p.percent).toBeCloseTo(0, 5);
    });

    it('after N checks: completed = N, total = 24, percent ≈ N/24*100', () => {
      const items = generateHuntList(questions);
      const idsToCheck = items.slice(0, 5).map((i: HuntItem) => i.id);
      const checked = idsToCheck.reduce<HuntItem[]>((acc, id) => toggleHuntItem(acc, id), items);
      const p = getHuntProgress(checked);
      expect(p.completed).toBe(5);
      expect(p.total).toBe(24);
      expect(p.percent).toBeCloseTo((5 / 24) * 100, 5);
    });
  });

  describe('isHuntComplete', () => {
    it('false initially; true only when all 24 are checked', () => {
      const items = generateHuntList(questions);
      expect(isHuntComplete(items)).toBe(false);
      const allChecked = items.reduce<HuntItem[]>((acc, i) => toggleHuntItem(acc, i.id), items);
      expect(isHuntComplete(allChecked)).toBe(true);

      // Uncheck one → false
      const oneUnchecked = toggleHuntItem(allChecked, items[0].id);
      expect(isHuntComplete(oneUnchecked)).toBe(false);
    });
  });
});
