import { describe, expect, it } from 'vitest';
import { MODULES } from '../data/curriculum';
import { LESSONS_V2 } from '../data/lessonsV2';
import { isLessonV2, normalizeLesson } from './lessonAdapter';

describe('lessonAdapter — compatibilidad v1', () => {
  const legacyModule = MODULES[0];
  const normalized = normalizeLesson(legacyModule);

  it('no identifica un módulo v1 como lección v2', () => {
    expect(isLessonV2(legacyModule)).toBe(false);
  });

  it('conserva el id original del módulo (así el progreso guardado sigue siendo válido)', () => {
    expect(normalized.id).toBe(legacyModule.id);
    expect(normalized.sourceVersion).toBe(1);
    expect(normalized.schemaVersion).toBe(2);
  });

  it('adapta el ejercicio guiado único en un arreglo de un paso', () => {
    expect(normalized.guidedPractice).toHaveLength(1);
    expect(normalized.guidedPractice[0].promptMarkdown).toBe(legacyModule.guidedExercise.question);
    expect(normalized.guidedPractice[0].correctAnswer).toBe(legacyModule.guidedExercise.correctAnswer);
    expect(normalized.guidedPractice[0].hints).toEqual([]);
  });

  it('adapta el sandbox v1 al reto v2 preservando el código inicial y los test cases', () => {
    expect(normalized.challenge.starterCode).toBe(legacyModule.sandbox.initialCode);
    expect(normalized.challenge.checks).toHaveLength(legacyModule.sandbox.testCases.length);

    const outputThatShouldPass = legacyModule.sandbox.expectedOutput;
    const firstCheck = normalized.challenge.checks[0];
    expect(firstCheck.type).toBe('custom');
    expect(firstCheck.test?.(outputThatShouldPass)).toBe(true);
  });

  it('rellena con valores por defecto seguros los campos que v1 no tiene (no rompe la vista)', () => {
    expect(normalized.examples).toEqual([]);
    expect(normalized.concept.whyItMattersMarkdown).toBe('');
    expect(normalized.concept.realWorldContextMarkdown).toBe('');
    expect(normalized.reflectionPromptMarkdown).toBe('');
    expect(normalized.prerequisiteLessonIds).toEqual([]);
    expect(normalized.masteryCriteria.length).toBeGreaterThan(0);
  });

  it('mantiene xpReward equivalente al valor histórico de +100 XP por módulo', () => {
    expect(normalized.xpReward).toBe(100);
  });
});

describe('lessonAdapter — lecciones v2 nativas', () => {
  it('pasa una lección v2 sin transformar su contenido', () => {
    const source = LESSONS_V2[0];
    const normalized = normalizeLesson(source);

    expect(isLessonV2(source)).toBe(true);
    expect(normalized.sourceVersion).toBe(2);
    expect(normalized.id).toBe(source.id);
    expect(normalized.guidedPractice).toBe(source.guidedPractice);
    expect(normalized.challenge).toBe(source.challenge);
  });
});
