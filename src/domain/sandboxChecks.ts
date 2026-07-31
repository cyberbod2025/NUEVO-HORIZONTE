import type { SandboxCheck } from '../types/lesson';

export interface CheckResult {
  id: string;
  passed: boolean;
  failureMessage: string;
}

/**
 * Evalúa un único check declarativo contra la salida de consola del sandbox.
 * 'custom' existe solo para adaptar retos v1 ya escritos como funciones; contenido
 * v2 nuevo debería preferir 'stdoutIncludes'/'stdoutEquals' porque son serializables.
 */
export function evaluateCheck(check: SandboxCheck, output: string): CheckResult {
  let passed = false;

  switch (check.type) {
    case 'stdoutIncludes':
      passed = check.value !== undefined && output.includes(check.value);
      break;
    case 'stdoutEquals':
      passed = check.value !== undefined && output.trim() === check.value.trim();
      break;
    case 'custom':
      passed = typeof check.test === 'function' && check.test(output);
      break;
    default:
      passed = false;
  }

  return { id: check.id, passed, failureMessage: check.failureMessage };
}

export function evaluateChecks(checks: SandboxCheck[], output: string): CheckResult[] {
  return checks.map((check) => evaluateCheck(check, output));
}

export function allChecksPassed(checks: SandboxCheck[], output: string): boolean {
  return checks.length > 0 && evaluateChecks(checks, output).every((result) => result.passed);
}
