import { describe, expect, it } from 'vitest';
import type { SandboxCheck } from '../types/lesson';
import { allChecksPassed, evaluateCheck, evaluateChecks } from './sandboxChecks';

describe('evaluateCheck', () => {
  it('stdoutIncludes pasa cuando la salida contiene el valor esperado', () => {
    const check: SandboxCheck = { id: 'c1', type: 'stdoutIncludes', label: 'incluye Bien', value: 'Bien', failureMessage: 'falta Bien' };
    expect(evaluateCheck(check, 'Excelente\nBien\nSuficiente').passed).toBe(true);
    expect(evaluateCheck(check, 'Excelente\nSuficiente').passed).toBe(false);
  });

  it('stdoutEquals exige coincidencia exacta (ignorando espacios en los extremos)', () => {
    const check: SandboxCheck = { id: 'c2', type: 'stdoutEquals', label: 'igual a 42', value: '42', failureMessage: 'no es 42' };
    expect(evaluateCheck(check, '42').passed).toBe(true);
    expect(evaluateCheck(check, ' 42 ').passed).toBe(true);
    expect(evaluateCheck(check, '420').passed).toBe(false);
  });

  it('custom delega en la función test provista', () => {
    const check: SandboxCheck = {
      id: 'c3',
      type: 'custom',
      label: 'longitud par',
      test: (output) => output.length % 2 === 0,
      failureMessage: 'longitud impar',
    };
    expect(evaluateCheck(check, 'ab').passed).toBe(true);
    expect(evaluateCheck(check, 'abc').passed).toBe(false);
  });

  it('custom sin función test nunca pasa (evita falsos positivos por datos incompletos)', () => {
    const check: SandboxCheck = { id: 'c4', type: 'custom', label: 'sin test', failureMessage: 'no configurado' };
    expect(evaluateCheck(check, 'cualquier cosa').passed).toBe(false);
  });

  it('devuelve el failureMessage del check en el resultado', () => {
    const check: SandboxCheck = { id: 'c5', type: 'stdoutIncludes', label: 'x', value: 'x', failureMessage: 'mensaje específico' };
    expect(evaluateCheck(check, 'y').failureMessage).toBe('mensaje específico');
  });
});

describe('allChecksPassed', () => {
  const checks: SandboxCheck[] = [
    { id: 'a', type: 'stdoutIncludes', label: 'a', value: 'A', failureMessage: 'falta A' },
    { id: 'b', type: 'stdoutIncludes', label: 'b', value: 'B', failureMessage: 'falta B' },
  ];

  it('requiere que TODOS los checks pasen', () => {
    expect(allChecksPassed(checks, 'A B')).toBe(true);
    expect(allChecksPassed(checks, 'A')).toBe(false);
  });

  it('una lista vacía de checks nunca se considera superada (evita falsos "aprobado" por contenido mal migrado)', () => {
    expect(allChecksPassed([], 'cualquier salida')).toBe(false);
  });
});

describe('evaluateChecks', () => {
  it('devuelve un resultado por cada check en el mismo orden', () => {
    const checks: SandboxCheck[] = [
      { id: 'a', type: 'stdoutIncludes', label: 'a', value: 'A', failureMessage: 'falta A' },
      { id: 'b', type: 'stdoutIncludes', label: 'b', value: 'B', failureMessage: 'falta B' },
    ];
    const results = evaluateChecks(checks, 'A');
    expect(results.map((r) => r.id)).toEqual(['a', 'b']);
    expect(results.map((r) => r.passed)).toEqual([true, false]);
  });
});
