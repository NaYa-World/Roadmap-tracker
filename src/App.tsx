import { useState, useMemo, useCallback } from 'react';
import { PHASES }        from './data/phases';
import { NOTES }         from './data/notes';
import { useTrackerState } from './hooks/useTrackerState';
import { useTheme }      from './hooks/useTheme';
import { countDone, countTotal } from './utils';
import { Header }        from './components/Header';
import { StatsBar }      from './components/StatsBar';
import { ProgressBar }   from './components/ProgressBar';
import { SearchBar, Tabs } from './components/SearchAndTabs';
import { PhaseCard }     from './components/PhaseCard';
import { NotesPanel }    from './components/NotesPanel';
import type { NoteData } from './types';

export default function App() {
  const { state, toggleTask, resetAll } = useTrackerState();
  const { theme, toggleTheme }          = useTheme();

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  // Notes panel state
  const [activeNote, setActiveNote] = useState<NoteData | null>(null);
  const [noteDayLabel, setNoteDayLabel] = useState<string>('');

  // Derived stats
  const totalDone  = useMemo(() => countDone(PHASES, state),  [state]);
  const totalTasks = useMemo(() => countTotal(PHASES),         []);
  const totalLeft  = totalTasks - totalDone;
  const pct        = totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0;
  const streak     = (state._streak as number) ?? 0;

  // Next incomplete day label
  const nextDayLabel = useMemo(() => {
    for (let pi = 0; pi < PHASES.length; pi++) {
      const ph = PHASES[pi];
      for (let di = 0; di < ph.data.length; di++) {
        const d = ph.data[di];
        for (let ti = 0; ti < d.tasks.length; ti++) {
          if (!state[`p${pi}d${di}t${ti}`]) {
            return `${d.day} · ${d.label}`;
          }
        }
      }
    }
    return '';
  }, [state]);

  // Top strip progress
  useMemo(() => {
    const el = document.getElementById('top-strip');
    if (el) el.style.transform = `scaleX(${pct / 100})`;
  }, [pct]);

  // Open notes handler
  const handleOpenNotes = useCallback((key: string, label: string) => {
    setActiveNote(NOTES[key] ?? null);
    setNoteDayLabel(label);
  }, []);

  const handleCloseNotes = useCallback(() => {
    setActiveNote(null);
    setNoteDayLabel('');
  }, []);

  const handleToggle = useCallback((pi: number, di: number, ti: number) => {
    toggleTask(pi, di, ti);
  }, [toggleTask]);

  const visiblePhases = useMemo(() =>
    filter === 'all' ? PHASES : [PHASES[parseInt(filter)]].filter(Boolean),
    [filter]
  );

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 pt-10 pb-20">
      {/* Top progress strip */}
      <div
        id="top-strip"
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left
                   bg-gradient-to-r from-violet-500 via-emerald-400 to-sky-400"
        style={{ transform: 'scaleX(0)', transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)' }}
      />

      <Header theme={theme} onToggle={toggleTheme} onResetAll={resetAll} />

      <StatsBar
        done={totalDone}
        left={totalLeft}
        total={totalTasks}
        pct={pct}
        streak={streak}
      />

      <ProgressBar
        pct={pct}
        done={totalDone}
        left={totalLeft}
        nextDay={nextDayLabel}
      />

      <SearchBar value={search} onChange={setSearch} />
      <Tabs active={filter} onChange={setFilter} />

      {/* Phase cards */}
      <div>
        {visiblePhases.map((phase, idx) => {
          const pi = filter === 'all' ? idx : parseInt(filter);
          // Check if any day matches search
          const hasMatch = !search || phase.data.some(d =>
            d.tasks.some(t => t.t.toLowerCase().includes(search.toLowerCase())) ||
            d.label.toLowerCase().includes(search.toLowerCase()) ||
            d.day.toLowerCase().includes(search.toLowerCase())
          );
          if (!hasMatch) return null;

          return (
            <PhaseCard
              key={pi}
              phase={phase}
              pi={pi}
              state={state}
              search={search}
              onToggle={handleToggle}
              onNotes={handleOpenNotes}
            />
          );
        })}
      </div>

      {/* Notes panel */}
      <NotesPanel
        note={activeNote}
        dayLabel={noteDayLabel}
        onClose={handleCloseNotes}
      />
    </div>
  );
}
