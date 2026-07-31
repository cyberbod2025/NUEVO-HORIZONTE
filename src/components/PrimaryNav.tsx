import { useEffect, useRef } from 'react';
import { APP_TOUR_STEPS } from '../data/tourSteps';
import type { AppTab } from '../types/app';

interface PrimaryNavProps {
  activeTab: AppTab;
  tourStep: number | null;
  onSelect: (tab: AppTab, stepIndex: number) => void;
}

const NAV_LABELS = [
  'Línea del Tiempo (Meta Junior)',
  'Módulo Interactivo (Brilliant)',
  'PowerShell & Tareas CLI',
  'Auditoría de Empleabilidad',
];

export default function PrimaryNav({ activeTab, tourStep, onSelect }: PrimaryNavProps) {
  const navButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (tourStep !== null) {
      navButtonRefs.current[tourStep]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [tourStep]);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 sticky top-[61px] z-40">
      <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto py-2">
        {APP_TOUR_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={step.tab}
              ref={(element) => { navButtonRefs.current[index] = element; }}
              onClick={() => onSelect(step.tab, index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === step.tab
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              } ${tourStep === index ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
            >
              <Icon className="w-4 h-4" /> {NAV_LABELS[index]}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
