import { beforeEach, describe, expect, it } from 'vitest';
import {
  recordDailyActivity,
  readProgress,
  resetStoredProgress,
  writeProgress,
} from './progressStorage';

describe('progressStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('normalizes invalid stored progress instead of crashing', () => {
    localStorage.setItem('codebrain_xp', '-20');
    localStorage.setItem('codebrain_streak', 'not-a-number');
    localStorage.setItem('codebrain_completed', '{invalid');

    expect(readProgress()).toEqual({
      xp: 0,
      streak: 0,
      completedModules: [],
      onboardingComplete: false,
    });
  });

  it('writes and resets the browser progress record', () => {
    writeProgress({ xp: 125, streak: 3, completedModules: ['mod-1'] });
    expect(readProgress()).toMatchObject({
      xp: 125,
      streak: 3,
      completedModules: ['mod-1'],
    });

    resetStoredProgress();
    expect(readProgress()).toEqual({
      xp: 0,
      streak: 0,
      completedModules: [],
      onboardingComplete: false,
    });
  });

  it('awards one streak day per calendar day', () => {
    expect(recordDailyActivity()).toBe(1);
    expect(recordDailyActivity()).toBe(1);
  });
});
