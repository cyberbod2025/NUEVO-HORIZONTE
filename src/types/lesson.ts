import type { LucideIcon } from 'lucide-react';

/**
 * Contrato pedagógico de lección v2.
 *
 * Ver docs/adr/0004-lesson-v2-pedagogical-contract.md para el diagnóstico y las
 * decisiones detrás de esta forma. Resumen: el modelo v1 (`src/data/curriculum.ts`)
 * define un "módulo" de 10-60 horas con exactamente 1 pregunta guiada y 1 reto de
 * código. Eso no alcanza para practicar de verdad. v2 define una "lección" como la
 * unidad atómica (varias por módulo), con práctica guiada de varios pasos, pistas
 * progresivas, contexto de uso real y criterios explícitos de dominio.
 *
 * Los nombres de campo siguen, cuando es razonable, el esquema JSON serializable ya
 * propuesto en docs/examples/module.example.json (schemaVersion, prerequisiteIds,
 * learningObjectives, estimatedMinutes, sandbox.checks[].type: 'stdoutIncludes', etc.)
 * para no contradecir la migración completa a currículo servido por JSON que ya
 * describe docs/architecture.md. Esta iteración NO implementa esa migración masiva;
 * solo fija el contrato y lo prueba con 3 lecciones reales.
 */

export type SandboxCheckType = 'stdoutIncludes' | 'stdoutEquals' | 'custom';

export interface SandboxCheck {
  id: string;
  type: SandboxCheckType;
  /** Descripción corta y siempre visible de qué valida este check (ej. "Sofía sale como APROBADO"). */
  label: string;
  /** Requerido para 'stdoutIncludes' y 'stdoutEquals'. */
  value?: string;
  /** Solo para 'custom'; no es serializable a JSON puro (deuda conocida, ver ADR). */
  test?: (output: string) => boolean;
  /** Mensaje mostrado al estudiante cuando este check específico falla. */
  failureMessage: string;
}

export interface LessonExample {
  id: string;
  title: string;
  code?: string;
  explanationMarkdown: string;
}

export interface GuidedStep {
  id: string;
  order: number;
  promptMarkdown: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: string;
  /** Pistas progresivas: se revelan una por una si el estudiante falla. */
  hints: string[];
  explanationMarkdown: string;
}

export interface FinalChallenge {
  id: string;
  promptMarkdown: string;
  starterCode: string;
  language: 'javascript';
  timeoutMs: number;
  checks: SandboxCheck[];
  hints: string[];
  /** Qué debe observar el estudiante en su propia salida para saber que lo logró. */
  expectedEvidenceMarkdown: string;
}

export interface LessonConcept {
  explanationMarkdown: string;
  /** Por qué importa este concepto — responde el "¿para qué me sirve?". */
  whyItMattersMarkdown: string;
  /** Dónde y cuándo se usa en el mundo real (ideal: un ejemplo escolar/SASE). */
  realWorldContextMarkdown: string;
  narrationText: string;
}

export interface LessonV2 {
  schemaVersion: 2;
  id: string;
  moduleId: string;
  phaseId: string;
  order: number;
  title: string;
  category: string;
  summary: string;
  prerequisiteLessonIds: string[];
  estimatedMinutes: number;
  xpReward: number;
  learningObjectives: string[];
  concept: LessonConcept;
  examples: LessonExample[];
  guidedPractice: GuidedStep[];
  challenge: FinalChallenge;
  reflectionPromptMarkdown: string;
  /** Criterios observables para considerar la lección dominada, no solo "completada". */
  masteryCriteria: string[];
  icon: LucideIcon;
  color: string;
  week: string;
  hours: number;
}

/**
 * Forma única que consume la UI (`LessonView`, `App`). Toda lección — v1 adaptada o
 * v2 nativa — pasa por `normalizeLesson` (src/domain/lessonAdapter.ts) antes de
 * llegar aquí, así la vista nunca necesita ramificar por versión.
 */
export interface NormalizedLesson extends LessonV2 {
  /** De dónde vino el contenido antes de normalizar. Solo informativo/depuración. */
  sourceVersion: 1 | 2;
}
