import type { FormEvent, RefObject } from 'react';
import { TerminalSquare } from 'lucide-react';
import { CLI_CHALLENGES } from '../../data/curriculum';

interface CliHistoryItem {
  type: string;
  text: string;
}

interface PowerShellViewProps {
  cliHistory: CliHistoryItem[];
  cliInput: string;
  activeCliChallengeIndex: number;
  terminalEndRef: RefObject<HTMLDivElement | null>;
  onSelectChallenge: (index: number) => void;
  onClearHistory: () => void;
  onCliInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PowerShellView({
  cliHistory,
  cliInput,
  activeCliChallengeIndex,
  terminalEndRef,
  onSelectChallenge,
  onClearHistory,
  onCliInputChange,
  onSubmit,
}: PowerShellViewProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* ENCABEZADO DE LA TERMINAL */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TerminalSquare className="w-6 h-6 text-amber-400" /> PowerShell & Entorno de Comandos CLI
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Ponte a prueba ejecutando comandos reales de Git, NPM, Node, Supabase y Vercel en tu propia PowerShell virtual.
        </p>
      </div>

      {/* SELECCIÓN DE DESAFÍO CLI */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          Desafíos Prácticos de Terminal (Misiones CLI)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CLI_CHALLENGES.map((ch, index) => (
            <button
              key={ch.id}
              onClick={() => onSelectChallenge(index)}
              className={`p-3.5 rounded-2xl border text-left transition ${
                activeCliChallengeIndex === index 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-200 shadow-md' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <h4 className="font-bold text-xs text-slate-200">{ch.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{ch.description}</p>
            </button>
          ))}
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
          <span className="font-bold text-amber-400">Pista: </span> 
          {CLI_CHALLENGES[activeCliChallengeIndex].hint}
        </div>
      </div>

      {/* POWERSHELL INTERFAZ GRÁFICA */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-mono text-xs">
        {/* BARRA SUPERIOR VENTANA POWERSHELL */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-[11px] text-slate-400 font-sans font-semibold ml-2">Windows PowerShell - Profe Hugo</span>
          </div>
          <button 
            onClick={onClearHistory}
            className="hover:text-slate-200 transition text-[11px] font-sans"
          >
            Limpia pantalla
          </button>
        </div>

        {/* HISTORIAL DE LA TERMINAL */}
        <div className="p-4 h-72 overflow-y-auto space-y-2 leading-relaxed">
          {cliHistory.map((item, idx) => (
            <div key={idx} className={`${
              item.type === 'cmd' ? 'text-slate-100 font-bold' :
              item.type === 'success' ? 'text-emerald-400' :
              item.type === 'challenge' ? 'text-yellow-400 font-bold bg-yellow-500/10 p-2 rounded-lg' :
              item.type === 'err' ? 'text-rose-400' :
              'text-slate-400'
            }`}>
              {item.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* INPUT DE LA TERMINAL */}
        <form onSubmit={onSubmit} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-amber-400 font-bold">PS C:\Users\ProfeHugo\Project&gt;</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => onCliInputChange(e.target.value)}
            placeholder="Escribe comando (p. ej. git init, npm test)..."
            className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono text-xs"
          />
          <button type="submit" className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition">
            Enviar
          </button>
        </form>
      </div>

    </div>
  );
}
