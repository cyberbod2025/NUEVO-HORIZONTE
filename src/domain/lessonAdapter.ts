import type { MODULES } from '../data/curriculum';
import type { LessonV2, NormalizedLesson } from '../types/lesson';

/** Forma real de un elemento de `MODULES` (currículo v1), inferida del dato existente. */
export type LegacyModule = (typeof MODULES)[number];

export function isLessonV2(input: LegacyModule | LessonV2): input is LessonV2 {
  return (input as LessonV2).schemaVersion === 2;
}

/**
 * Único punto de entrada que consumen `App.tsx` y `LessonView`. Acepta un módulo v1
 * tal cual existe hoy en `curriculum.ts` o una lección v2 nueva, y siempre devuelve
 * la misma forma completa. Los módulos v1 no se tocan ni se migran: se adaptan en
 * memoria, con valores por defecto explícitos donde v1 no tiene el dato (pistas
 * progresivas, ejemplos, contexto de uso real, reflexión, criterios de dominio).
 */
export function normalizeLesson(input: LegacyModule | LessonV2): NormalizedLesson {
  if (isLessonV2(input)) {
    return { ...input, sourceVersion: 2 };
  }
  return normalizeLegacyModule(input);
}

function normalizeLegacyModule(module: LegacyModule): NormalizedLesson {
  return {
    schemaVersion: 2,
    sourceVersion: 1,
    id: module.id,
    moduleId: module.id,
    phaseId: module.phaseId,
    order: module.level,
    title: module.title,
    category: module.category,
    summary: module.description,
    prerequisiteLessonIds: [],
    estimatedMinutes: module.hours * 60,
    xpReward: 100,
    learningObjectives: [
      `Comprender: ${module.description}`,
    ],
    concept: {
      explanationMarkdown: module.concept,
      whyItMattersMarkdown: '',
      realWorldContextMarkdown: '',
      narrationText: module.voiceAudioText,
    },
    examples: [],
    guidedPractice: [
      {
        id: `${module.id}-guided-1`,
        order: 1,
        promptMarkdown: module.guidedExercise.question,
        codeSnippet: module.guidedExercise.codeSnippet,
        options: module.guidedExercise.options,
        correctAnswer: module.guidedExercise.correctAnswer,
        hints: [],
        explanationMarkdown: module.guidedExercise.explanation,
      },
    ],
    challenge: {
      id: `${module.id}-challenge`,
      promptMarkdown: module.description,
      starterCode: module.sandbox.initialCode,
      language: 'javascript',
      timeoutMs: 2000,
      checks: module.sandbox.testCases.map((testCase, index) => ({
        id: `${module.id}-check-${index}`,
        type: 'custom' as const,
        label: testCase.name,
        test: testCase.test,
        failureMessage: `Todavía no se cumple: ${testCase.name}`,
      })),
      hints: [],
      expectedEvidenceMarkdown: module.sandbox.expectedOutput,
    },
    reflectionPromptMarkdown: '',
    masteryCriteria: module.sandbox.testCases.map((testCase) => testCase.name),
    icon: module.icon,
    color: module.color,
    week: module.week,
    hours: module.hours,
  };
}
