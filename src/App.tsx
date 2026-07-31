import { useState, useEffect, useMemo, useRef, type FormEvent } from 'react';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import EmployabilityView from './components/EmployabilityView';
import PrimaryNav from './components/PrimaryNav';
import TourBanner from './components/TourBanner';
import WelcomeScreen from './components/WelcomeScreen';
import { CLI_CHALLENGES, MODULES } from './data/curriculum';
import { LESSONS_V2 } from './data/lessonsV2';
import { APP_TOUR_STEPS } from './data/tourSteps';
import { normalizeLesson, type LegacyModule } from './domain/lessonAdapter';
import { getProgressPercent } from './domain/progress';
import { allChecksPassed } from './domain/sandboxChecks';
import LessonView, { type LessonStage } from './features/lesson/LessonView';
import PowerShellView from './features/powershell/PowerShellView';
import { runJavaScript } from './features/sandbox/runCode';
import TimelineView from './features/timeline/TimelineView';
import {
  markOnboardingComplete,
  PROGRESS_WAS_RESET,
  recordDailyActivity,
  readProgress,
  resetStoredProgress,
  writeProgress,
} from './services/progressStorage';
import type { AppTab } from './types/app';
import type { LessonV2 } from './types/lesson';

type SelectableLesson = LegacyModule | LessonV2;

const INITIAL_PROGRESS = readProgress();
const INITIAL_NORMALIZED_LESSON = normalizeLesson(MODULES[0]);
const INITIAL_CLI_HISTORY = [
  { type: 'sys', text: 'Windows PowerShell [Versión 10.0.19045.3803]' },
  { type: 'sys', text: '(c) Microsoft Corporation. CodeBrain DevAcademy CLI cargado.\n' },
  { type: 'info', text: 'Escribe "help" para ver la lista de comandos disponibles o selecciona un desafío arriba.' },
];

export default function App() {
  // ESTADOS PERSISTENTES
  const [xp, setXp] = useState(INITIAL_PROGRESS.xp);
  const [streak, setStreak] = useState(INITIAL_PROGRESS.streak);
  const [completedModules, setCompletedModules] = useState(INITIAL_PROGRESS.completedModules);
  const [showWelcome, setShowWelcome] = useState(!INITIAL_PROGRESS.onboardingComplete);
  const [tourStep, setTourStep] = useState<number | null>(null);

  // VISTAS PRINCIPALES: 'timeline', 'lesson', 'powershell', 'employability'
  const [activeTab, setActiveTab] = useState<AppTab>('timeline');
  const [selectedModule, setSelectedModule] = useState<SelectableLesson>(MODULES[0]);

  // Lección normalizada (contrato v2): tanto módulos v1 como lecciones v2 pasan por
  // el mismo adaptador antes de llegar a la vista. Ver src/domain/lessonAdapter.ts.
  const normalizedLesson = useMemo(() => normalizeLesson(selectedModule), [selectedModule]);

  // ESTADO INTERNO DE LA LECCIÓN (BRILLIANT STYLE)
  const [lessonStage, setLessonStage] = useState<LessonStage>('observe');
  const [guidedStepIndex, setGuidedStepIndex] = useState(0);
  const [guidedInput, setGuidedInput] = useState('');
  const [guidedFeedback, setGuidedFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [rewardedGuidedStepIds, setRewardedGuidedStepIds] = useState<string[]>([]);
  const [sandboxCode, setSandboxCode] = useState(INITIAL_NORMALIZED_LESSON.challenge.starterCode);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [sandboxSuccess, setSandboxSuccess] = useState(false);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);

  // NARRADOR POR VOZ (TEXT-TO-SPEECH)
  const [isSpeaking, setIsSpeaking] = useState(false);

  // POWERSHELL / TERMINAL SIMULATOR
  const [cliHistory, setCliHistory] = useState(INITIAL_CLI_HISTORY);
  const [cliInput, setCliInput] = useState('');
  const [activeCliChallengeIndex, setActiveCliChallengeIndex] = useState(0);
  const [cliChallengeCompleted, setCliChallengeCompleted] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const sandboxRunRef = useRef(0);

  useEffect(() => {
    if (!PROGRESS_WAS_RESET) return;

    setXp(0);
    setStreak(0);
    setCompletedModules([]);
    setSelectedModule(MODULES[0]);
    setActiveTab('timeline');
    setTourStep(null);
    setShowWelcome(true);
  }, []);

  // EFECTO GUARDADO LOCALSTORAGE
  useEffect(() => {
    writeProgress({ xp, streak, completedModules });
  }, [xp, streak, completedModules]);

  // REINICIAR ESTADOS AL CAMBIAR DE MÓDULO/LECCIÓN
  useEffect(() => {
    setGuidedStepIndex(0);
    setGuidedInput('');
    setGuidedFeedback(null);
    setRewardedGuidedStepIds([]);
    setSandboxCode(normalizedLesson.challenge.starterCode);
    setConsoleLogs([]);
    setSandboxSuccess(false);
    setIsSandboxRunning(false);
    sandboxRunRef.current += 1;
    stopVoiceNarrator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModule]);

  // SCROLL AUTOMÁTICO EN POWERSHELL
  useEffect(() => {
    if (activeTab === 'powershell') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliHistory, activeTab]);

  // CANCELLATION DE VOZ
  const stopVoiceNarrator = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // MANEJADOR DE LECTURA POR VOZ (TEXT TO SPEECH)
  const handleToggleSpeak = (textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Tu navegador no soporta lectura por voz (Web Speech API). Prueba usando Google Chrome o Edge.");
      return;
    }

    if (isSpeaking) {
      stopVoiceNarrator();
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // MANEJADOR DE EJECUCIÓN DE CÓDIGO JS EN SANDBOX
  const handleRunCode = async () => {
    const runToken = ++sandboxRunRef.current;
    setIsSandboxRunning(true);
    setSandboxSuccess(false);
    setConsoleLogs([]);

    const result = await runJavaScript(sandboxCode);
    if (runToken !== sandboxRunRef.current) return;

    const logs = result.error ? [...result.logs, `[${result.timedOut ? 'Timeout' : 'Error'}] ${result.error}`] : result.logs;
    setConsoleLogs(logs);
    setIsSandboxRunning(false);

    const outputStr = result.logs.join('\n');
    const passAll = !result.error && allChecksPassed(normalizedLesson.challenge.checks, outputStr);
    setSandboxSuccess(passAll);

    if (passAll && !completedModules.includes(normalizedLesson.id)) {
      setCompletedModules(prev => [...prev, normalizedLesson.id]);
      setXp(prev => prev + normalizedLesson.xpReward);
      setStreak(recordDailyActivity());
    }
  };

  // CAMBIAR DE PASO EN LA PRÁCTICA GUIADA (limpia la respuesta/feedback del paso anterior)
  const handleSetGuidedStepIndex = (index: number) => {
    setGuidedStepIndex(index);
    setGuidedInput('');
    setGuidedFeedback(null);
  };

  // VERIFICAR PRÁCTICA GUIADA (por paso; una lección v2 puede tener varios pasos)
  const handleVerifyGuided = () => {
    const step = normalizedLesson.guidedPractice[guidedStepIndex];
    if (!step) return;

    if (guidedInput.trim() === step.correctAnswer) {
      setGuidedFeedback({
        type: 'success',
        msg: '¡Excelente deducción! Has comprendido el principio básico.'
      });
      if (!rewardedGuidedStepIds.includes(step.id)) {
        setXp(prev => prev + 25);
        setStreak(recordDailyActivity());
        setRewardedGuidedStepIds(prev => [...prev, step.id]);
      }
    } else {
      setGuidedFeedback({
        type: 'error',
        msg: `Sigue intentándolo. Pista: La respuesta correcta es "${step.correctAnswer}".`
      });
    }
  };

  // MANEJADOR DE POWERSHELL / CLI
  const handleCliSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    const newHistory = [...cliHistory, { type: 'cmd', text: `PS C:\\Users\\ProfeHugo\\Project> ${cmd}` }];
    const lowerCmd = cmd.toLowerCase();

    // INTERPRETAR COMANDOS SIMULADOS
    if (lowerCmd === 'clear' || lowerCmd === 'cls') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else if (lowerCmd === 'help') {
      newHistory.push({ 
        type: 'out', 
        text: 'Comandos disponibles:\n  git init          - Inicializa repositorio\n  git add .         - Agrega archivos al staging\n  git commit -m ""  - Guarda cambios con mensaje\n  npm test          - Ejecuta suite de Vitest\n  node app.js       - Inicia script de Node\n  vercel --prod     - Despliega en la nube\n  clear / cls       - Limpia la consola' 
      });
    } else if (lowerCmd.startsWith('git init')) {
      newHistory.push({ type: 'success', text: 'Initialized empty Git repository in C:/Users/ProfeHugo/Project/.git/' });
    } else if (lowerCmd.startsWith('git add')) {
      newHistory.push({ type: 'success', text: 'Stage: 4 files modified, 0 errors.' });
    } else if (lowerCmd.startsWith('git commit')) {
      newHistory.push({ type: 'success', text: '[main (root-commit) a1b2c3d] feat: commit inicial del proyecto SASE\n 4 files changed, 120 insertions(+)' });
    } else if (lowerCmd === 'npm test' || lowerCmd === 'npx vitest') {
      newHistory.push({ type: 'success', text: '✓ src/sase.test.ts (3 tests passed)\n  Test Files  1 passed (1)\n  Tests       3 passed (3)\n  Time        420ms' });
    } else if (lowerCmd === 'vercel --prod') {
      newHistory.push({ type: 'success', text: '🔍 Inspecting project...\n✅ Deployment complete!\n🔗 Production URL: https://sase-portfolio-profehugo.vercel.app' });
    } else {
      newHistory.push({ type: 'err', text: `'${cmd}' no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable. Escribe "help" para orientación.` });
    }

    // COMPROBAR TAREA CLI ACTIVA
    const currentChallenge = CLI_CHALLENGES[activeCliChallengeIndex];
    if (currentChallenge && currentChallenge.targetCommands.includes(cmd) && !cliChallengeCompleted) {
      newHistory.push({ type: 'challenge', text: `🎉 ¡Misión CLI Superada! Comando clave ejecutado correctamente. (+50 XP)` });
      setXp(prev => prev + 50);
      setStreak(recordDailyActivity());
      setCliChallengeCompleted(true);
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  const finishOnboarding = () => {
    markOnboardingComplete();
    setTourStep(null);
  };

  const handleStartTour = () => {
    setShowWelcome(false);
    setActiveTab(APP_TOUR_STEPS[0].tab);
    setTourStep(0);
  };

  const handleSkipTour = () => {
    setShowWelcome(false);
    finishOnboarding();
  };

  const handleTourNavigation = (nextStep: number) => {
    if (nextStep < 0) return;
    if (nextStep >= APP_TOUR_STEPS.length) {
      finishOnboarding();
      setActiveTab('timeline');
      return;
    }

    setTourStep(nextStep);
    setActiveTab(APP_TOUR_STEPS[nextStep].tab);
  };

  const handleNavSelection = (tab: AppTab, stepIndex: number) => {
    setActiveTab(tab);
    if (tourStep !== null) setTourStep(stepIndex);
  };

  const handleResetProgress = () => {
    const confirmed = window.confirm('¿Quieres borrar todo tu progreso y volver a la pantalla de bienvenida?');
    if (!confirmed) return;

    resetStoredProgress();

    setXp(0);
    setStreak(0);
    setCompletedModules([]);
    setSelectedModule(MODULES[0]);
    setActiveTab('timeline');
    setLessonStage('observe');
    setGuidedStepIndex(0);
    setGuidedInput('');
    setGuidedFeedback(null);
    setRewardedGuidedStepIds([]);
    setSandboxCode(INITIAL_NORMALIZED_LESSON.challenge.starterCode);
    setConsoleLogs([]);
    setSandboxSuccess(false);
    setIsSandboxRunning(false);
    sandboxRunRef.current += 1;
    stopVoiceNarrator();
    setCliHistory(INITIAL_CLI_HISTORY);
    setCliInput('');
    setActiveCliChallengeIndex(0);
    setCliChallengeCompleted(false);
    setTourStep(null);
    setShowWelcome(true);
  };

  // NIVELES
  const currentLevel = Math.floor(xp / 200) + 1;
  const progressPercent = getProgressPercent(completedModules.length, MODULES.length);

  if (showWelcome) {
    return <WelcomeScreen onStartTour={handleStartTour} onSkipTour={handleSkipTour} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      <AppHeader
        streak={streak}
        xp={xp}
        currentLevel={currentLevel}
        onResetProgress={handleResetProgress}
      />
      <PrimaryNav activeTab={activeTab} tourStep={tourStep} onSelect={handleNavSelection} />
      {tourStep !== null && (
        <TourBanner
          tourStep={tourStep}
          onFinish={finishOnboarding}
          onNavigate={handleTourNavigation}
        />
      )}

      {/* CONTENIDO PRINCIPAL DE LA APLICACIÓN */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'timeline' && (
          <TimelineView
            completedModules={completedModules}
            progressPercent={progressPercent}
            pilotLessons={LESSONS_V2}
            onSelectModule={(module) => {
              setSelectedModule(module);
              setActiveTab('lesson');
            }}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonView
            lesson={normalizedLesson}
            lessonStage={lessonStage}
            guidedStepIndex={guidedStepIndex}
            guidedInput={guidedInput}
            guidedFeedback={guidedFeedback}
            sandboxCode={sandboxCode}
            consoleLogs={consoleLogs}
            sandboxSuccess={sandboxSuccess}
            isSandboxRunning={isSandboxRunning}
            isSpeaking={isSpeaking}
            onToggleSpeak={handleToggleSpeak}
            onSetLessonStage={setLessonStage}
            onSetGuidedStepIndex={handleSetGuidedStepIndex}
            onSetGuidedInput={setGuidedInput}
            onVerifyGuided={handleVerifyGuided}
            onResetSandbox={() => setSandboxCode(normalizedLesson.challenge.starterCode)}
            onSetSandboxCode={setSandboxCode}
            onRunCode={handleRunCode}
            onReturnToTimeline={() => setActiveTab('timeline')}
          />
        )}

        {activeTab === 'powershell' && (
          <PowerShellView
            cliHistory={cliHistory}
            cliInput={cliInput}
            activeCliChallengeIndex={activeCliChallengeIndex}
            terminalEndRef={terminalEndRef}
            onSelectChallenge={(index) => {
              setActiveCliChallengeIndex(index);
              setCliChallengeCompleted(false);
            }}
            onClearHistory={() => setCliHistory([])}
            onCliInputChange={setCliInput}
            onSubmit={handleCliSubmit}
          />
        )}

        {/* ================= VISTA 4: CHECKLIST DE EMPLEABILIDAD JUNIOR ================= */}
        {activeTab === 'employability' && (
          <EmployabilityView />
        )}

      </main>

      <AppFooter />
    </div>
  );
}
