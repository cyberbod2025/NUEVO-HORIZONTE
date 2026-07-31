import { ArrowRight, Brain, ShieldCheck, Sparkles } from 'lucide-react';
import { APP_TOUR_STEPS } from '../data/tourSteps';

interface WelcomeScreenProps {
  onStartTour: () => void;
  onSkipTour: () => void;
}

export default function WelcomeScreen({ onStartTour, onSkipTour }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      <header className="relative z-10 max-w-7xl mx-auto px-5 py-6 flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
          <Brain className="w-6 h-6 text-slate-950 stroke-[2.5]" />
        </div>
        <div>
          <p className="font-extrabold tracking-tight text-white">CodeBrain DevAcademy</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-400">Ruta personal de aprendizaje</p>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-5 pb-12 pt-6 md:pt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
        <section>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Tu progreso comienza en cero
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
            ¡Hola, Profe Hugo!
            <span className="block mt-2 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Construyamos tu ruta.
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Esta academia te acompaña desde fundamentos hasta tu primer portfolio full-stack. Avanzarás módulo por módulo, con práctica guiada y retos que validan tu código.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-3 max-w-xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-2xl font-black text-amber-400">0</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">XP inicial</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-2xl font-black text-white">12</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">Módulos</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-2xl font-black text-cyan-400">4</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">Fases</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartTour}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400 transition"
            >
              Conocer la aplicación
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onSkipTour}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/70 text-slate-300 font-bold text-sm hover:bg-slate-800 hover:text-white transition"
            >
              Entrar directamente
            </button>
          </div>

          <div className="mt-6 flex items-start gap-2.5 text-xs text-slate-400 max-w-xl leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>Tu avance se guarda automáticamente en este navegador de tu laptop. No necesitas crear una cuenta ni estar conectado a internet.</p>
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-y-10 left-7 w-px bg-gradient-to-b from-amber-500 via-cyan-500 to-emerald-500 opacity-40"></div>
          <div className="space-y-3">
            {APP_TOUR_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.tab} className="relative flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur p-4 sm:p-5 shadow-xl">
                  <div className={`relative z-10 w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-slate-950 shadow-lg`}>
                    <StepIcon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Estación {index + 1}</p>
                    <h2 className="mt-1 font-bold text-slate-100">{step.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
