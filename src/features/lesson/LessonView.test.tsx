import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MODULES } from '../../data/curriculum';
import { LESSONS_V2 } from '../../data/lessonsV2';
import { normalizeLesson } from '../../domain/lessonAdapter';
import LessonView from './LessonView';

// Monaco no aporta nada en estas pruebas y es pesado bajo jsdom; se reemplaza por un
// stub mínimo. La cobertura real del editor/Worker ya vive en runCode.ts y sus specs.
vi.mock('../sandbox/SandboxEditor', () => ({
  default: ({ value }: { value: string }) => <textarea data-testid="mock-sandbox-editor" defaultValue={value} readOnly />,
}));

afterEach(cleanup);

const noop = () => {};

const baseProps = {
  guidedInput: '',
  guidedFeedback: null,
  consoleLogs: [] as string[],
  sandboxSuccess: false,
  isSandboxRunning: false,
  isSpeaking: false,
  onToggleSpeak: noop,
  onSetLessonStage: noop,
  onSetGuidedStepIndex: noop,
  onSetGuidedInput: noop,
  onVerifyGuided: noop,
  onResetSandbox: noop,
  onSetSandboxCode: noop,
  onRunCode: noop,
  onReturnToTimeline: noop,
};

describe('LessonView — compatibilidad con lecciones v1 adaptadas', () => {
  const lesson = normalizeLesson(MODULES[0]);

  it('renderiza la etapa "Observar" con las secciones nuevas sin romper', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={lesson}
        lessonStage="observe"
        guidedStepIndex={0}
        sandboxCode={lesson.challenge.starterCode}
      />,
    );

    expect(screen.getAllByText(lesson.title).length).toBeGreaterThan(0);
    expect(screen.getByText('¿Qué aprenderé?')).toBeInTheDocument();
    expect(screen.getByText('Explicación')).toBeInTheDocument();
  });

  it('conserva las etiquetas de las que depende el flujo e2e existente en la etapa autónoma', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={lesson}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={lesson.challenge.starterCode}
        sandboxSuccess
      />,
    );

    expect(screen.getByText('Editor de Código JS / Sandbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ejecutar Código' })).toBeInTheDocument();
    expect(screen.getByText(`¡Módulo Superado! Has ganado +${lesson.xpReward} XP.`)).toBeInTheDocument();
  });

  it('no muestra secciones v2 opcionales cuando el módulo v1 no trae ese dato', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={lesson}
        lessonStage="observe"
        guidedStepIndex={0}
        sandboxCode={lesson.challenge.starterCode}
      />,
    );

    expect(screen.queryByText('¿Dónde y cuándo se usa en la práctica?')).not.toBeInTheDocument();
  });
});

describe('LessonView — lecciones v2 nativas', () => {
  const conceptual = normalizeLesson(LESSONS_V2[0]);
  const guiada = normalizeLesson(LESSONS_V2[1]);

  it('muestra el contexto real de uso cuando la lección v2 lo define', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={conceptual}
        lessonStage="observe"
        guidedStepIndex={0}
        sandboxCode={conceptual.challenge.starterCode}
      />,
    );

    expect(screen.getByText('¿Dónde y cuándo se usa en la práctica?')).toBeInTheDocument();
    expect(screen.getByText('¿Por qué me sirve esto?')).toBeInTheDocument();
    expect(screen.getByText(conceptual.examples[0].title)).toBeInTheDocument();
  });

  it('muestra la evidencia esperada del reto en la etapa autónoma', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={conceptual}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={conceptual.challenge.starterCode}
      />,
    );

    expect(screen.getByText(/Evidencia esperada:/)).toBeInTheDocument();
  });

  it('muestra el contador de pasos cuando la práctica guiada tiene más de un paso', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={guiada}
        lessonStage="guided"
        guidedStepIndex={0}
        sandboxCode={guiada.challenge.starterCode}
      />,
    );

    expect(screen.getByText(`Paso 1 de ${guiada.guidedPractice.length}`)).toBeInTheDocument();
    expect(guiada.guidedPractice.length).toBeGreaterThan(1);
  });

  it('muestra reflexión y criterios de dominio al superar el reto', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={guiada}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={guiada.challenge.starterCode}
        sandboxSuccess
      />,
    );

    expect(screen.getByText('Pregunta de reflexión')).toBeInTheDocument();
    expect(screen.getByText('¿Ya domino esto?')).toBeInTheDocument();
  });
});

describe('LessonView — migración de seguimiento (JS moderno/async)', () => {
  const arrowDestructuring = normalizeLesson(
    LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-arrow-destructuring')!,
  );

  it('renderiza la lección de arrow functions/destructuring con sus 4 pasos guiados', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={arrowDestructuring}
        lessonStage="guided"
        guidedStepIndex={0}
        sandboxCode={arrowDestructuring.challenge.starterCode}
      />,
    );

    expect(screen.getByText(`Paso 1 de ${arrowDestructuring.guidedPractice.length}`)).toBeInTheDocument();
    expect(arrowDestructuring.guidedPractice).toHaveLength(4);
  });
});

describe('LessonView — migración de seguimiento (Git y Conventional Commits)', () => {
  const ramas = normalizeLesson(LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-git-ramas')!);

  it('renderiza la lección de ramas con sus 4 pasos guiados', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={ramas}
        lessonStage="guided"
        guidedStepIndex={0}
        sandboxCode={ramas.challenge.starterCode}
      />,
    );

    expect(screen.getByText(`Paso 1 de ${ramas.guidedPractice.length}`)).toBeInTheDocument();
    expect(ramas.guidedPractice).toHaveLength(4);
  });

  it('muestra el reto y la evidencia esperada de la lección de Conventional Commits', () => {
    const conventionalCommits = normalizeLesson(
      LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-conventional-commits')!,
    );

    render(
      <LessonView
        {...baseProps}
        lesson={conventionalCommits}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={conventionalCommits.challenge.starterCode}
      />,
    );

    expect(screen.getByText(/Evidencia esperada:/)).toBeInTheDocument();
  });
});

describe('LessonView — migración de seguimiento (TypeScript esencial)', () => {
  const interfaces = normalizeLesson(LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-interfaces')!);

  it('renderiza la lección de interfaces con sus 4 pasos guiados', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={interfaces}
        lessonStage="guided"
        guidedStepIndex={0}
        sandboxCode={interfaces.challenge.starterCode}
      />,
    );

    expect(screen.getByText(`Paso 1 de ${interfaces.guidedPractice.length}`)).toBeInTheDocument();
    expect(interfaces.guidedPractice).toHaveLength(4);
  });

  it('muestra la evidencia esperada del reto de funciones/genéricos', () => {
    const funcionesGenericos = normalizeLesson(
      LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-funciones-genericos')!,
    );

    render(
      <LessonView
        {...baseProps}
        lesson={funcionesGenericos}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={funcionesGenericos.challenge.starterCode}
      />,
    );

    expect(screen.getByText(/Evidencia esperada:/)).toBeInTheDocument();
  });
});

describe('LessonView — migración de seguimiento (React: props, useState, levantar estado)', () => {
  const props = normalizeLesson(LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-props')!);

  it('renderiza la lección de props con sus 4 pasos guiados', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={props}
        lessonStage="guided"
        guidedStepIndex={0}
        sandboxCode={props.challenge.starterCode}
      />,
    );

    expect(screen.getByText(`Paso 1 de ${props.guidedPractice.length}`)).toBeInTheDocument();
    expect(props.guidedPractice).toHaveLength(4);
  });

  it('muestra reflexión y criterios de dominio al superar el reto de levantar el estado', () => {
    const levantarEstado = normalizeLesson(
      LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-levantar-estado')!,
    );

    render(
      <LessonView
        {...baseProps}
        lesson={levantarEstado}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={levantarEstado.challenge.starterCode}
        sandboxSuccess
      />,
    );

    expect(screen.getByText('Pregunta de reflexión')).toBeInTheDocument();
    expect(screen.getByText('¿Ya domino esto?')).toBeInTheDocument();
  });
});

describe('LessonView — migración de seguimiento (Backend: HTTP, Express y CRUD)', () => {
  const httpMetodos = normalizeLesson(
    LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-http-metodos')!,
  );

  it('renderiza la lección de HTTP con sus 4 pasos guiados', () => {
    render(
      <LessonView
        {...baseProps}
        lesson={httpMetodos}
        lessonStage="guided"
        guidedStepIndex={0}
        sandboxCode={httpMetodos.challenge.starterCode}
      />,
    );

    expect(screen.getByText(`Paso 1 de ${httpMetodos.guidedPractice.length}`)).toBeInTheDocument();
    expect(httpMetodos.guidedPractice).toHaveLength(4);
  });

  it('muestra reflexión y criterios de dominio al superar el reto CRUD', () => {
    const apiCrud = normalizeLesson(
      LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-api-crud')!,
    );

    render(
      <LessonView
        {...baseProps}
        lesson={apiCrud}
        lessonStage="solo"
        guidedStepIndex={0}
        sandboxCode={apiCrud.challenge.starterCode}
        sandboxSuccess
      />,
    );

    expect(screen.getByText('Pregunta de reflexión')).toBeInTheDocument();
    expect(screen.getByText('¿Ya domino esto?')).toBeInTheDocument();
  });
});
