import { describe, expect, it } from 'vitest';
import { LESSONS_V2 } from './lessonsV2';

describe('LESSONS_V2 — cumplimiento del contrato pedagógico v2', () => {
  it('define exactamente las 3 lecciones piloto de referencia', () => {
    expect(LESSONS_V2).toHaveLength(3);
  });

  it('tiene ids únicos y orden secuencial 1, 2, 3', () => {
    const ids = LESSONS_V2.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(LESSONS_V2.map((lesson) => lesson.order)).toEqual([1, 2, 3]);
  });

  it('cada lección declara schemaVersion 2 y los campos mínimos del contrato', () => {
    for (const lesson of LESSONS_V2) {
      expect(lesson.schemaVersion).toBe(2);
      expect(lesson.title.length).toBeGreaterThan(0);
      expect(lesson.summary.length).toBeGreaterThan(0);
      expect(lesson.learningObjectives.length).toBeGreaterThan(0);
      expect(lesson.concept.explanationMarkdown.length).toBeGreaterThan(0);
      expect(lesson.guidedPractice.length).toBeGreaterThan(0);
      expect(lesson.challenge.checks.length).toBeGreaterThan(0);
      expect(lesson.reflectionPromptMarkdown.length).toBeGreaterThan(0);
      expect(lesson.masteryCriteria.length).toBeGreaterThan(0);
    }
  });

  it('cada lección explica por qué importa y dónde se usa en la realidad (queja explícita atendida)', () => {
    for (const lesson of LESSONS_V2) {
      expect(lesson.concept.whyItMattersMarkdown.length).toBeGreaterThan(0);
      expect(lesson.concept.realWorldContextMarkdown.length).toBeGreaterThan(0);
    }
  });

  it('cada paso guiado tiene su respuesta correcta entre las opciones ofrecidas', () => {
    for (const lesson of LESSONS_V2) {
      for (const step of lesson.guidedPractice) {
        expect(step.options).toContain(step.correctAnswer);
        expect(step.explanationMarkdown.length).toBeGreaterThan(0);
      }
    }
  });

  it('la lección 2 (condicionales) tiene varios pasos guiados, no solo uno (fija la queja de profundidad)', () => {
    const condicionales = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-fundamentos-condicionales');
    expect(condicionales?.guidedPractice.length).toBeGreaterThan(1);
  });

  it('los checks de tipo stdoutIncludes/stdoutEquals siempre traen un value definido', () => {
    for (const lesson of LESSONS_V2) {
      for (const check of lesson.challenge.checks) {
        if (check.type === 'stdoutIncludes' || check.type === 'stdoutEquals') {
          expect(check.value).toBeDefined();
        }
        expect(check.label.length).toBeGreaterThan(0);
        expect(check.failureMessage.length).toBeGreaterThan(0);
      }
    }
  });

  it('las prerrequisitos declarados apuntan a ids que existen dentro del propio piloto', () => {
    const allIds = new Set(LESSONS_V2.map((lesson) => lesson.id));
    for (const lesson of LESSONS_V2) {
      for (const prerequisiteId of lesson.prerequisiteLessonIds) {
        expect(allIds.has(prerequisiteId)).toBe(true);
      }
    }
  });

  it('demuestra progresión: la lección 3 depende de la 1 y la 2 (comprender -> aplicar -> resolver)', () => {
    const [variables, condicionales, funcionEvaluadora] = LESSONS_V2;
    expect(funcionEvaluadora.prerequisiteLessonIds).toEqual(
      expect.arrayContaining([variables.id, condicionales.id]),
    );
  });
});
