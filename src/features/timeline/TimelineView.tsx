import { Check, ChevronRight, FlaskConical, Lock, Trophy } from 'lucide-react';
import { BADGES, MODULES, PHASES } from '../../data/curriculum';
import type { LegacyModule } from '../../domain/lessonAdapter';
import { isModuleUnlocked } from '../../domain/progress';
import type { LessonV2 } from '../../types/lesson';

type SelectableLesson = LegacyModule | LessonV2;

interface TimelineViewProps {
  completedModules: string[];
  progressPercent: number;
  pilotLessons: LessonV2[];
  onSelectModule: (module: SelectableLesson) => void;
}

export default function TimelineView({ completedModules, progressPercent, pilotLessons, onSelectModule }: TimelineViewProps) {
  const pilotLessonIds = pilotLessons.map((lesson) => lesson.id);

  return (
    <div className="space-y-8">
      {/* PILOTO V2: LECCIONES REDISEÑADAS (ver docs/adr/0004) */}
      {pilotLessons.length > 0 && (
        <div className="bg-slate-900/70 border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">Piloto v2 · en validación</span>
              <h3 className="font-bold text-slate-100 leading-tight">Lecciones rediseñadas: varios pasos, pistas y contexto real</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pilotLessons.map((lesson) => {
              const isCompleted = completedModules.includes(lesson.id);
              const isUnlocked = isModuleUnlocked(pilotLessonIds, lesson.id, completedModules);
              const IconComp = lesson.icon;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (isUnlocked) onSelectModule(lesson);
                  }}
                  className={`relative rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between ${
                    isUnlocked
                      ? 'cursor-pointer bg-slate-950/80 hover:bg-slate-900 border-cyan-500/30 hover:border-cyan-400/60'
                      : 'bg-slate-950/40 border-slate-800/50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700 font-mono">
                      {lesson.estimatedMinutes} min
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Superada
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-bold text-cyan-300">Disponible</span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <Lock className="w-3.5 h-3.5" /> Bloqueada
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shrink-0">
                      <IconComp className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-100 leading-tight">{lesson.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{lesson.summary}</p>
                    </div>
                  </div>
                  {isUnlocked && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-end text-[11px] text-cyan-300 font-medium">
                      Entrar <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HERO BARRA DE META A ALCANZAR */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/60 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Ruta de Aprendizaje • 12 a 24 Semanas
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2 tracking-tight">
              Meta: Programador Junior Competitivo
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Avanza nodo a nodo. Cada nivel aplica el andamiaje interactivo: **Observar** conceptos visuales, realizar **Práctica Guiada** y dominar **Retos Autónomos (Regla 70/30)**.
            </p>
          </div>

          <div className="w-full md:w-80 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-right shadow-inner">
            <div className="flex justify-between items-center text-xs mb-2 font-bold">
              <span className="text-slate-400">Progreso a la Meta</span>
              <span className="text-amber-400 font-mono text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 h-full rounded-full transition-all duration-700 shadow-md shadow-orange-500/50"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              {completedModules.length} de {MODULES.length} niveles completados
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE FASES Y LÍNEA DEL TIEMPO CON NODOS */}
      <div className="space-y-10">
        {PHASES.map((phase) => {
          const phaseModules = MODULES.filter(m => m.phaseId === phase.id);

          return (
            <div key={phase.id} className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${phase.color} text-slate-950 font-extrabold text-xs shadow-md`}>
                  {phase.weeks}
                </div>
                <h3 className="font-bold text-lg text-slate-200 tracking-tight">
                  {phase.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {phaseModules.map((mod) => {
                  const isCompleted = completedModules.includes(mod.id);
                  const isUnlocked = isModuleUnlocked(MODULES.map(module => module.id), mod.id, completedModules);
                  const IconComp = mod.icon;

                  return (
                    <div 
                      key={mod.id}
                      onClick={() => {
                        if (isUnlocked) {
                          onSelectModule(mod);
                        }
                      }}
                      className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                        isUnlocked 
                          ? 'cursor-pointer bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/10' 
                          : 'bg-slate-950/40 border-slate-800/50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700 font-mono">
                            Nivel {mod.level} • {mod.hours}h
                          </span>

                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                              <Check className="w-3.5 h-3.5 stroke-[3]" /> Superado
                            </span>
                          ) : isUnlocked ? (
                            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 animate-pulse">
                              Disponible
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                              <Lock className="w-3.5 h-3.5" /> Bloqueado
                            </span>
                          )}
                        </div>

                        <div className="flex items-start gap-3 mt-2">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} text-slate-950 font-bold shadow-md shrink-0`}>
                            <IconComp className="w-6 h-6 stroke-[2.2]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-slate-100 group-hover:text-amber-400 transition-colors leading-tight">
                              {mod.title}
                            </h4>
                            <span className="text-[11px] text-slate-400 font-mono">{mod.category}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                          {mod.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Aprender estilo Brilliant</span>
                        {isUnlocked && <ChevronRight className="w-4 h-4 text-amber-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* RECONOCIMIENTOS / MEDALLAS GANADAS */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" /> Medallas & Logros de Progreso
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES.map((badge, idx) => {
            const unlocked = completedModules.length > badge.requiredMod;

            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition ${
                  unlocked 
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200 shadow-lg shadow-amber-500/5' 
                    : 'bg-slate-950/40 border-slate-800/50 text-slate-600 grayscale'
                }`}
              >
                <div className="text-2xl mb-1">{badge.name.split(' ')[0]}</div>
                <h4 className="font-bold text-xs text-slate-200">{badge.name.substring(badge.name.indexOf(' ') + 1)}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
