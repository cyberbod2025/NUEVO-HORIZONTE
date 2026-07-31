import { describe, expect, it } from 'vitest';
import { getProgressPercent, isModuleUnlocked } from './progress';

describe('progress rules', () => {
  const moduleIds = ['mod-1', 'mod-2', 'mod-3'];

  it('unlocks the first module and requires the previous module afterward', () => {
    expect(isModuleUnlocked(moduleIds, 'mod-1', [])).toBe(true);
    expect(isModuleUnlocked(moduleIds, 'mod-2', [])).toBe(false);
    expect(isModuleUnlocked(moduleIds, 'mod-2', ['mod-1'])).toBe(true);
    expect(isModuleUnlocked(moduleIds, 'missing', ['mod-1'])).toBe(false);
  });

  it('calculates bounded progress', () => {
    expect(getProgressPercent(0, 12)).toBe(0);
    expect(getProgressPercent(6, 12)).toBe(50);
    expect(getProgressPercent(13, 12)).toBe(100);
    expect(getProgressPercent(1, 0)).toBe(0);
  });
});
