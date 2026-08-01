import { Award, Brain, Flame, RotateCcw, Zap } from 'lucide-react';

interface AppHeaderProps {
  streak: number;
  xp: number;
  currentLevel: number;
  onResetProgress: () => void;
}

export default function AppHeader({ streak, xp, currentLevel, onResetProgress }: AppHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
            <Brain className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Nuevo Horizonte
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <span>Ruta Mentoría Profe Hugo</span> • <span className="text-amber-400 font-mono">Estilo Brilliant</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 border border-slate-700/60 rounded-full shadow-inner">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="font-bold text-orange-400">{streak} Días de Racha</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 border border-slate-700/60 rounded-full shadow-inner">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-yellow-400">{xp} XP</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full shadow-inner">
            <Award className="w-4 h-4" />
            <span className="font-bold">Nivel {currentLevel} Dev</span>
          </div>

          <button
            onClick={onResetProgress}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-rose-500/10 border border-slate-700/60 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 rounded-full transition"
            title="Borrar todo el progreso"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Reiniciar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
