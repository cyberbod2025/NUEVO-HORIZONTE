import { ArrowRight } from 'lucide-react';
import { APP_TOUR_STEPS } from '../data/tourSteps';

interface TourBannerProps {
  tourStep: number;
  onFinish: () => void;
  onNavigate: (nextStep: number) => void;
}

export default function TourBanner({ tourStep, onFinish, onNavigate }: TourBannerProps) {
  const currentTourStep = APP_TOUR_STEPS[tourStep];
  if (!currentTourStep) return null;

  const CurrentTourIcon = currentTourStep.icon;

  return (
    <aside className="border-b border-amber-500/20 bg-slate-950/95 px-4 py-4" aria-live="polite">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        <div className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${currentTourStep.accent} flex items-center justify-center text-slate-950 shadow-lg`}>
          <CurrentTourIcon className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Recorrido {tourStep + 1} de {APP_TOUR_STEPS.length}</span>
            <div className="flex gap-1">
              {APP_TOUR_STEPS.map((step, index) => (
                <span key={step.tab} className={`w-1.5 h-1.5 rounded-full ${index === tourStep ? 'bg-amber-400' : 'bg-slate-700'}`}></span>
              ))}
            </div>
          </div>
          <h2 className="mt-1 font-bold text-white">{currentTourStep.title}</h2>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed max-w-3xl">{currentTourStep.description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={onFinish} className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-200 transition">
            Omitir
          </button>
          <button
            onClick={() => onNavigate(tourStep - 1)}
            disabled={tourStep === 0}
            className="px-3 py-2 rounded-lg border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>
          <button
            onClick={() => onNavigate(tourStep + 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition"
          >
            {tourStep === APP_TOUR_STEPS.length - 1 ? 'Terminar' : 'Siguiente'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
