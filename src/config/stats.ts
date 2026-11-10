import type { Dictionary } from '../i18n';
import { site } from './site';

export interface StatItem {
  key: keyof Dictionary['stats'];
  value: number;
  suffix: string;
  label: string;
}

/** Key figures shown in the hero and "Why ALSTAR". Unconfirmed (`null`) figures are left out. */
export function visibleStats(t: Dictionary): StatItem[] {
  const { stats } = site;
  const all: { key: StatItem['key']; value: number | null; suffix: string }[] = [
    { key: 'years', value: stats.years, suffix: '+' },
    { key: 'facility', value: stats.facilityM2, suffix: '+' },
    { key: 'projects', value: stats.projects, suffix: '' },
    { key: 'team', value: stats.team, suffix: '+' },
  ];
  return all
    .filter((s): s is typeof s & { value: number } => s.value !== null)
    .map((s) => ({ ...s, label: t.stats[s.key] }));
}
