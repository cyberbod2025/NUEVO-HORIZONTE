import { CheckCircle2, UserCheck } from 'lucide-react';

export default function EmployabilityView() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-amber-400" /> Auditoría de Inserción Laboral Junior
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Verifica tus entregables tangibles para competir con éxito en el mercado laboral como desarrollador web.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-start gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-slate-200">1. Repositorio en GitHub con Commits Convencionales</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Historial de cambios con sintaxis `feat:`, `fix:`, demostrando constancia y buen manejo de ramas.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-slate-200">2. Prototipo SASE Portfolio Desplegado</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Aplicación full-stack en Vercel o AWS conectada a PostgreSQL y Supabase.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-slate-200">3. Perfil de LinkedIn & Upwork Optimizados</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Titular profesional: "Desarrollador Full-Stack (React, Node.js, Supabase)" y caso de estudio bien redactado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
