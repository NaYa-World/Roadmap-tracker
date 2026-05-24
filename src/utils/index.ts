import type { AppState, PhaseConfig, TaskKind } from '../types';

export function taskId(pi: number, di: number, ti: number): string {
  return `p${pi}d${di}t${ti}`;
}

export function countDone(phases: PhaseConfig[], state: AppState): number {
  let n = 0;
  phases.forEach((ph, pi) =>
    ph.data.forEach((d, di) =>
      d.tasks.forEach((_, ti) => { if (state[taskId(pi, di, ti)]) n++; })
    )
  );
  return n;
}

export function countTotal(phases: PhaseConfig[]): number {
  return phases.reduce((a, ph) => a + ph.data.reduce((b, d) => b + d.tasks.length, 0), 0);
}

export function phaseDone(phase: PhaseConfig, pi: number, state: AppState): number {
  return phase.data.reduce(
    (a, d, di) => a + d.tasks.filter((_, ti) => !!state[taskId(pi, di, ti)]).length,
    0
  );
}

export function phaseTotal(phase: PhaseConfig): number {
  return phase.data.reduce((a, d) => a + d.tasks.length, 0);
}

export function badgeClasses(k: TaskKind): string {
  const map: Record<TaskKind, string> = {
    concept: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    code:    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    quiz:    'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    project: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  };
  return map[k];
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
