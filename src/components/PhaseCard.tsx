import { useState } from 'react';
import type { PhaseConfig, AppState } from '../types';
import { DayBlock } from './DayBlock';
import { phaseDone, phaseTotal } from '../utils';

interface Props {
  phase:     PhaseConfig;
  pi:        number;
  state:     AppState;
  search:    string;
  onToggle:  (pi: number, di: number, ti: number) => void;
  onNotes:   (key: string, label: string) => void;
}

export function PhaseCard({ phase, pi, state, search, onToggle, onNotes }: Props) {
  const [open, setOpen] = useState(pi === 0);

  const done     = phaseDone(phase, pi, state);
  const total    = phaseTotal(phase);
  const pct      = total ? Math.round((done / total) * 100) : 0;
  const complete = done === total && total > 0;

  return (
    <div
      className="relative bg-[#13131f] border border-[#1c1c2e] rounded-2xl overflow-hidden
                 hover:border-violet-500/20 hover:shadow-[0_4px_32px_rgba(0,0,0,0.3)]
                 transition-all duration-200 mb-2.5"
      style={{ ['--phase-color' as string]: phase.color }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: phase.color }}
      />

      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 pl-6 pr-5 py-4
                   hover:bg-white/[0.02] transition-colors duration-150 text-left"
      >
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 text-[15px]"
          style={{ background: phase.dim }}
        >
          {phase.icon}
        </div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-[#e2e2f0] mb-0.5">{phase.title}</div>
          <div className="font-mono text-[10px] text-[#7070a0]">
            {phase.days} · {done}/{total} tasks
          </div>
          {/* Mini progress bar */}
          <div className="mt-1.5 h-[3px] w-32 bg-[#1c1c2e] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%`, background: phase.color }}
            />
          </div>
        </div>

        {/* Status pill / pct */}
        {complete ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold
                           px-2.5 py-1 rounded-full shrink-0
                           bg-emerald-500/12 text-emerald-400 border border-emerald-500/25">
            ✓ complete
          </span>
        ) : (
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-full shrink-0
                           bg-[#1c1c2e] text-[#7070a0]">
            {pct}%
          </span>
        )}

        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`text-[#7070a0] shrink-0 transition-transform duration-300
                      ${open ? 'rotate-180' : 'rotate-0'}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Collapsible body */}
      <div className={`phase-body ${open ? 'open' : ''}`}>
        <div className="phase-body-inner">
          {phase.data.map((day, di) => (
            <DayBlock
              key={di}
              day={day}
              di={di}
              pi={pi}
              phaseColor={phase.color}
              phaseDim={phase.dim}
              state={state}
              search={search}
              onToggle={ti => onToggle(pi, di, ti)}
              onNotes={onNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
