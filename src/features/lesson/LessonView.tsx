import { lazy, Suspense, useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Circle,
  CheckSquare,
  Code,
  Compass,
  Eye,
  Lightbulb,
  ListChecks,
  MapPin,
  Play,
  RefreshCw,
  Sliders,
  Sparkles,
  Target,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { evaluateChecks } from '../../domain/sandboxChecks';
import type { NormalizedLesson } from '../../types/lesson';
import { renderInlineCode } from './renderInlineCode';

const SandboxEditor = lazy(() => import('../sandbox/SandboxEditor'));

export type LessonStage = 'observe' | 'guided' | 'solo';

interface GuidedFeedback {
  type: 'success' | 'error';
  msg: string;
}

interface LessonViewProps {
  lesson: NormalizedLesson;
  lessonStage: LessonStage;
  guidedStepIndex: number;
  guidedInput: string;
  guidedFeedback: GuidedFeedback | null;
  sandboxCode: string;
  consoleLogs: string[];
  sandboxSuccess: boolean;
  isSandboxRunning: boolean;
  isSpeaking: boolean;
  onToggleSpeak: (textToRead: string) => void;
  onSetLessonStage: (stage: LessonStage) => void;
  onSetGuidedStepIndex: (index: number) => void;
  onSetGuidedInput: (value: string) => void;
  onVerifyGuided: () => void;
  onResetSandbox: () => void;
  onSetSandboxCode: (code: string) => void;
  onRunCode: () => void;
  onReturnToTimeline: () => void;
}

export default function LessonView({
  lesson,
  lessonStage,
  guidedStepIndex,
  guidedInput,
  guidedFeedback,
  sandboxCode,
  consoleLogs,
  sandboxSuccess,
  isSandboxRunning,
  isSpeaking,
  onToggleSpeak,
  onSetLessonStage,
  onSetGuidedStepIndex,
  onSetGuidedInput,
  onVerifyGuided,
  onResetSandbox,
  onSetSandboxCode,
  onRunCode,
  onReturnToTimeline,
}: LessonViewProps) {
  const guidedStep = lesson.guidedPractice[guidedStepIndex] ?? lesson.guidedPractice[0];
  const hasMultipleGuidedSteps = lesson.guidedPractice.length > 1;

  const [revealedGuidedHints, setRevealedGuidedHints] = useState(0);
  const [revealedChallengeHints, setRevealedChallengeHints] = useState(0);
  const [masteryChecked, setMasteryChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setRevealedGuidedHints(0);
  }, [lesson.id, guidedStepIndex]);

  useEffect(() => {
    setRevealedChallengeHints(0);
    setMasteryChecked({});
  }, [lesson.id]);

  const outputText = consoleLogs.join('\n');
  const checkResults = consoleLogs.length > 0 ? evaluateChecks(lesson.challenge.checks, outputText) : [];

  return (
    <div className="space-y-6">

      {/* ENCABEZADO DEL MÓDULO ACTIVO + LECTOR POR VOZ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">{lesson.category}</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{lesson.week}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{lesson.title}</h2>
          <p className="text-xs text-slate-300">{lesson.summary}</p>
        </div>

        {/* CONTROLES: NARRADOR POR VOZ + ETAPAS DE ANDAMIAJE */}
        <div className="flex flex-wrap items-center gap-3">

          <button
            onClick={() => onToggleSpeak(lesson.concept.narrationText)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
              isSpeaking
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-400'
            }`}
            title="Escuchar lección por voz"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Detener Voz' : 'Escuchar Lección'}</span>
          </button>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onSetLessonStage('observe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                lessonStage === 'observe' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> 1. Observar
            </button>

            <button
              onClick={() => onSetLessonStage('guided')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                lessonStage === 'guided' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> 2. Guiado
            </button>

            <button
              onClick={() => onSetLessonStage('solo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                lessonStage === 'solo' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> 3. Autónomo (70/30)
            </button>
          </div>
        </div>
      </div>

      {/* FASE 1: OBSERVAR — QUÉ APRENDERÉ, EXPLICACIÓN, CONTEXTO REAL, EJEMPLOS */}
      {lessonStage === 'observe' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">

          {lesson.learningObjectives.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <Target className="w-5 h-5" /> ¿Qué aprenderé?
              </h3>
              <ul className="mt-2 space-y-1.5">
                {lesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-slate-200">
                    <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{renderInlineCode(objective)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Explicación
            </h3>
            <div className="mt-2 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs md:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
              <Brain className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>{renderInlineCode(lesson.concept.explanationMarkdown)}</div>
            </div>
          </div>

          {lesson.concept.whyItMattersMarkdown && (
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> ¿Por qué me sirve esto?
              </h4>
              <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                {renderInlineCode(lesson.concept.whyItMattersMarkdown)}
              </p>
            </div>
          )}

          {lesson.concept.realWorldContextMarkdown && (
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" /> ¿Dónde y cuándo se usa en la práctica?
              </h4>
              <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                {renderInlineCode(lesson.concept.realWorldContextMarkdown)}
              </p>
            </div>
          )}

          {lesson.examples.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4" /> Ejemplos
              </h4>
              {lesson.examples.map((example) => (
                <div key={example.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-200">{example.title}</p>
                  {example.code && (
                    <pre className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] md:text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                      {example.code}
                    </pre>
                  )}
                  <p className="text-xs text-slate-400 leading-relaxed">{renderInlineCode(example.explanationMarkdown)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => onSetLessonStage('guided')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-orange-500/20"
            >
              Pasar a Práctica Guiada <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FASE 2: PRÁCTICA GUIADA — VARIOS PASOS CON PISTAS PROGRESIVAS */}
      {lessonStage === 'guided' && guidedStep && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <Sliders className="w-5 h-5" /> Práctica Guiada
            </h3>
            {hasMultipleGuidedSteps && (
              <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                Paso {guidedStepIndex + 1} de {lesson.guidedPractice.length}
              </span>
            )}
          </div>

          <p className="text-xs md:text-sm text-slate-200">{renderInlineCode(guidedStep.promptMarkdown)}</p>

          {guidedStep.codeSnippet && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs md:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {guidedStep.codeSnippet}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {guidedStep.options.map((opt) => (
              <button
                key={opt}
                onClick={() => onSetGuidedInput(opt)}
                className={`p-3.5 rounded-xl font-mono text-xs md:text-sm border transition text-center ${
                  guidedInput === opt
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {guidedStep.hints.length > 0 && (
            <div className="space-y-2">
              {revealedGuidedHints < guidedStep.hints.length && (
                <button
                  onClick={() => setRevealedGuidedHints((n) => Math.min(n + 1, guidedStep.hints.length))}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Ver pista ({revealedGuidedHints}/{guidedStep.hints.length})
                </button>
              )}
              {guidedStep.hints.slice(0, revealedGuidedHints).map((hint, index) => (
                <div key={index} className="text-[11px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2">
                  {renderInlineCode(hint)}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={onVerifyGuided}
                disabled={!guidedInput}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition border border-slate-700 disabled:opacity-50"
              >
                Verificar Respuesta
              </button>

              {hasMultipleGuidedSteps && (
                <>
                  <button
                    onClick={() => onSetGuidedStepIndex(Math.max(0, guidedStepIndex - 1))}
                    disabled={guidedStepIndex === 0}
                    className="flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 border border-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Paso anterior
                  </button>
                  <button
                    onClick={() => onSetGuidedStepIndex(Math.min(lesson.guidedPractice.length - 1, guidedStepIndex + 1))}
                    disabled={guidedStepIndex === lesson.guidedPractice.length - 1}
                    className="flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 border border-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Siguiente paso <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => onSetLessonStage('solo')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-orange-500/20"
            >
              Ir al Reto Autónomo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {guidedFeedback && (
            <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
              guidedFeedback.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {guidedFeedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <div>
                <p className="font-bold">{guidedFeedback.msg}</p>
                <p className="mt-1 text-slate-400">{renderInlineCode(guidedStep.explanationMarkdown)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FASE 3: RETO AUTÓNOMO — EDITOR, EVIDENCIA, REFLEXIÓN Y CRITERIOS DE DOMINIO */}
      {lessonStage === 'solo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <p className="text-xs text-slate-300 mb-3">{renderInlineCode(lesson.challenge.promptMarkdown)}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Code className="w-4 h-4" /> Editor de Código JS / Sandbox
                  </span>
                  <button
                    onClick={onResetSandbox}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reiniciar
                  </button>
                </div>

                <Suspense fallback={<div className="h-72 grid place-items-center rounded-2xl border border-slate-800 bg-slate-950 text-xs text-slate-500">Preparando Monaco Editor...</div>}>
                  <SandboxEditor value={sandboxCode} onChange={onSetSandboxCode} />
                </Suspense>

                {lesson.challenge.hints.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {revealedChallengeHints < lesson.challenge.hints.length && (
                      <button
                        onClick={() => setRevealedChallengeHints((n) => Math.min(n + 1, lesson.challenge.hints.length))}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 hover:text-cyan-300"
                      >
                        <Lightbulb className="w-3.5 h-3.5" /> Ver pista ({revealedChallengeHints}/{lesson.challenge.hints.length})
                      </button>
                    )}
                    {lesson.challenge.hints.slice(0, revealedChallengeHints).map((hint, index) => (
                      <div key={index} className="text-[11px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2">
                        {renderInlineCode(hint)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Regla 70/30: 70% tiempo escribiendo código</span>
                <button
                  onClick={onRunCode}
                  disabled={isSandboxRunning}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-wait"
                >
                  <Play className={`w-4 h-4 fill-current ${isSandboxRunning ? 'animate-pulse' : ''}`} />
                  {isSandboxRunning ? 'Ejecutando...' : 'Ejecutar Código'}
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Terminal de Salida (`console.log`)
                </h3>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-48 font-mono text-xs overflow-y-auto space-y-1">
                  {consoleLogs.length === 0 ? (
                    <span className="text-slate-600 italic">{isSandboxRunning ? 'Ejecutando en un Worker aislado...' : 'Presiona "Ejecutar Código" para ver los resultados en vivo...'}</span>
                  ) : (
                    consoleLogs.map((log, i) => (
                      <div key={i} className="text-emerald-400">&gt; {log}</div>
                    ))
                  )}
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  <strong className="text-slate-400">Evidencia esperada:</strong> {renderInlineCode(lesson.challenge.expectedEvidenceMarkdown)}
                </p>

                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-300">Pruebas Automatizadas de Validación:</h4>
                  {lesson.challenge.checks.map((check) => {
                    const result = checkResults.find((r) => r.id === check.id);
                    return (
                      <div key={check.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">{check.label}</span>
                          {result?.passed ? (
                            <span className="flex items-center gap-1 font-bold text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" /> Pasó
                            </span>
                          ) : result ? (
                            <span className="flex items-center gap-1 font-bold text-rose-400">
                              <AlertCircle className="w-4 h-4" /> Falta
                            </span>
                          ) : (
                            <span className="text-slate-500">Pendiente</span>
                          )}
                        </div>
                        {result && !result.passed && (
                          <p className="text-[11px] text-rose-300/80">{result.failureMessage}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {sandboxSuccess && (
                <div className="mt-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 flex items-center justify-between">
                  <span>¡Módulo Superado! Has ganado +{lesson.xpReward} XP.</span>
                  <button
                    onClick={onReturnToTimeline}
                    className="font-bold underline hover:text-emerald-200"
                  >
                    Volver a la Ruta
                  </button>
                </div>
              )}
            </div>
          </div>

          {sandboxSuccess && (lesson.reflectionPromptMarkdown || lesson.masteryCriteria.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {lesson.reflectionPromptMarkdown && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Brain className="w-4 h-4" /> Pregunta de reflexión
                  </h4>
                  <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                    {renderInlineCode(lesson.reflectionPromptMarkdown)}
                  </p>
                </div>
              )}

              {lesson.masteryCriteria.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <ListChecks className="w-4 h-4" /> ¿Ya domino esto?
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {lesson.masteryCriteria.map((criterion, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setMasteryChecked((prev) => ({ ...prev, [index]: !prev[index] }))}
                          className="w-full flex items-start gap-2 text-left text-xs md:text-sm text-slate-300 hover:text-slate-100"
                        >
                          {masteryChecked[index] ? (
                            <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                          )}
                          <span className={masteryChecked[index] ? 'line-through text-slate-500' : ''}>{criterion}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
