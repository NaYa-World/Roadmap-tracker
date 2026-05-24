import type { DayData } from '../types';
import type { AppState } from '../types';
import { TaskRow } from './TaskRow';
import { taskId } from '../utils';

interface Props {
  day:        DayData;
  di:         number;
  pi:         number;
  phaseColor: string;
  phaseDim:   string;
  state:      AppState;
  search:     string;
  onToggle:   (ti: number) => void;
  onNotes:    (key: string, label: string) => void;
}

export function DayBlock({ day, di, pi, phaseColor, phaseDim, state, search, onToggle, onNotes }: Props) {
  const sl = search.toLowerCase();
  const visible = !search ||
    day.tasks.some(t => t.t.toLowerCase().includes(sl)) ||
    day.label.toLowerCase().includes(sl) ||
    day.day.toLowerCase().includes(sl);

  if (!visible) return null;

  const dayDone  = day.tasks.filter((_, ti) => !!state[taskId(pi, di, ti)]).length;
  const allDone  = dayDone === day.tasks.length;
  const quizMsg  = `Quiz me on: ${day.label} (${day.day}). Ask 3 questions one at a time and give feedback on each answer.`;

  function handleCopy() {
    navigator.clipboard.writeText(quizMsg).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = quizMsg;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  }

  return (
    <div
      className={`border-t border-[#1c1c2e] px-5 py-4
                  ${allDone ? 'bg-emerald-500/[0.03]' : ''}`}
    >
      {/* Day header row */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span
          className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-[5px] whitespace-nowrap"
          style={{ background: phaseDim, color: phaseColor }}
        >
          {day.day}
        </span>

        <span className="text-[13px] font-medium text-[#e2e2f0] flex-1 min-w-0">
          {day.label}
        </span>

        {/* Notes button */}
        <button
          onClick={() => onNotes(day.noteKey, `${day.day} — ${day.label}`)}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold
                     px-2.5 py-1 rounded-md border shrink-0
                     bg-violet-500/10 text-violet-300 border-violet-500/20
                     hover:bg-violet-500/20 hover:text-violet-200 hover:-translate-y-px
                     transition-all duration-150"
        >
          📖 Notes
        </button>

        <span
          className={`font-mono text-[10px] shrink-0
                      ${allDone ? 'text-emerald-400' : 'text-[#7070a0]'}`}
        >
          {dayDone}/{day.tasks.length}{allDone ? ' ✓' : ''}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-0.5">
        {day.tasks.map((task, ti) => {
          const matchesSearch = !search ||
            task.t.toLowerCase().includes(sl) ||
            day.label.toLowerCase().includes(sl) ||
            day.day.toLowerCase().includes(sl);
          if (!matchesSearch) return null;

          return (
            <TaskRow
              key={ti}
              task={task}
              done={!!state[taskId(pi, di, ti)]}
              color={phaseColor}
              onToggle={() => onToggle(ti)}
            />
          );
        })}
      </div>

      {/* AI Quiz card */}
      <div className="mt-3.5 rounded-[10px] overflow-hidden border border-[#1c1c2e]
                      bg-gradient-to-br from-violet-500/[0.04] to-emerald-500/[0.03]">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-[#1c1c2e]">
          <div className="w-6 h-6 rounded-[7px] bg-violet-500/12 flex items-center justify-center text-[13px] shrink-0">
            🤖
          </div>
          <span className="text-[12px] font-semibold text-[#e2e2f0] flex-1">
            Quiz me on: {day.label}
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full
                           bg-violet-500/10 text-violet-300 border border-violet-500/20">
            AI quiz
          </span>
        </div>

        <div className="px-3.5 py-2 text-[11px] text-[#7070a0] italic border-b border-[#1c1c2e] leading-5">
          {quizMsg}
        </div>

        <div className="flex">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2
                       text-[12px] font-medium text-[#7070a0] border-r border-[#1c1c2e]
                       hover:bg-emerald-500/8 hover:text-emerald-400 transition-all duration-150
                       rounded-bl-[10px]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            Copy prompt
          </button>
          <a
            href={`https://claude.ai/new?q=${encodeURIComponent(quizMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2
                       text-[12px] font-medium text-[#7070a0]
                       hover:bg-sky-500/8 hover:text-sky-400 transition-all duration-150
                       rounded-br-[10px]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Open in Claude ↗
          </a>
        </div>
      </div>
    </div>
  );
}
