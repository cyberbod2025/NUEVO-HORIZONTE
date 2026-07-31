const PROGRESS_VERSION = '3';

const KEYS = {
  version: 'codebrain_progress_version',
  xp: 'codebrain_xp',
  streak: 'codebrain_streak',
  lastActivity: 'codebrain_last_activity_date',
  completed: 'codebrain_completed',
  onboarding: 'codebrain_onboarding_complete',
} as const;

export interface StoredProgress {
  xp: number;
  streak: number;
  completedModules: string[];
  onboardingComplete: boolean;
}

const EMPTY_PROGRESS: StoredProgress = {
  xp: 0,
  streak: 0,
  completedModules: [],
  onboardingComplete: false,
};

function readNonNegativeNumber(key: string) {
  const value = Number.parseInt(localStorage.getItem(key) ?? '0', 10);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function readCompletedModules() {
  try {
    const value = JSON.parse(localStorage.getItem(KEYS.completed) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function writeProgress(progress: Pick<StoredProgress, 'xp' | 'streak' | 'completedModules'>) {
  localStorage.setItem(KEYS.xp, progress.xp.toString());
  localStorage.setItem(KEYS.streak, progress.streak.toString());
  localStorage.setItem(KEYS.completed, JSON.stringify(progress.completedModules));
}

export function resetStoredProgress() {
  writeProgress(EMPTY_PROGRESS);
  localStorage.removeItem(KEYS.lastActivity);
  localStorage.setItem(KEYS.onboarding, 'false');
  localStorage.setItem(KEYS.version, PROGRESS_VERSION);
}

export function initializeProgressStorage() {
  if (localStorage.getItem(KEYS.version) === PROGRESS_VERSION) return false;
  resetStoredProgress();
  return true;
}

export function readProgress(): StoredProgress {
  return {
    xp: readNonNegativeNumber(KEYS.xp),
    streak: readNonNegativeNumber(KEYS.streak),
    completedModules: readCompletedModules(),
    onboardingComplete: localStorage.getItem(KEYS.onboarding) === 'true',
  };
}

export function markOnboardingComplete() {
  localStorage.setItem(KEYS.onboarding, 'true');
}

export function recordDailyActivity() {
  const today = new Date().toISOString().slice(0, 10);
  const lastActivity = localStorage.getItem(KEYS.lastActivity);
  const currentStreak = readNonNegativeNumber(KEYS.streak);

  if (lastActivity === today) return currentStreak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const nextStreak = lastActivity === yesterday.toISOString().slice(0, 10) ? currentStreak + 1 : 1;

  localStorage.setItem(KEYS.lastActivity, today);
  localStorage.setItem(KEYS.streak, nextStreak.toString());
  return nextStreak;
}

export const PROGRESS_WAS_RESET = initializeProgressStorage();
