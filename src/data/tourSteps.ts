import { BookOpen, Compass, TerminalSquare, UserCheck } from 'lucide-react';
import type { TourStep } from '../types/app';

export const APP_TOUR_STEPS: TourStep[] = [
  {
    tab: 'timeline',
    title: 'Tu ruta completa',
    description: 'Aquí ves los 12 módulos, qué nivel está disponible y cuánto falta para alcanzar la meta Junior.',
    icon: Compass,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    tab: 'lesson',
    title: 'Aprende y practica',
    description: 'Cada módulo avanza por tres etapas: observar el concepto, resolver una práctica guiada y completar código por tu cuenta.',
    icon: BookOpen,
    accent: 'from-cyan-500 to-blue-600',
  },
  {
    tab: 'powershell',
    title: 'Entrena en la terminal',
    description: 'Usa el simulador para familiarizarte con comandos de Git, npm y despliegue sin afectar archivos reales.',
    icon: TerminalSquare,
    accent: 'from-violet-500 to-purple-600',
  },
  {
    tab: 'employability',
    title: 'Prepara tu perfil laboral',
    description: 'Revisa los entregables que demostrarán tus habilidades: repositorio, proyecto desplegado y perfiles profesionales.',
    icon: UserCheck,
    accent: 'from-emerald-500 to-teal-600',
  },
];
