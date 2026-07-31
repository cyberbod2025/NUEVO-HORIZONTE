import type { LucideIcon } from 'lucide-react';

export type AppTab = 'timeline' | 'lesson' | 'powershell' | 'employability';

export interface TourStep {
  tab: AppTab;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}
