export function getProgressPercent(completedCount: number, moduleCount: number) {
  if (moduleCount <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((completedCount / moduleCount) * 100)));
}

export function isModuleUnlocked(moduleIds: string[], moduleId: string, completedIds: string[]) {
  const moduleIndex = moduleIds.indexOf(moduleId);
  if (moduleIndex < 0) return false;
  return moduleIndex === 0 || completedIds.includes(moduleIds[moduleIndex - 1]);
}
