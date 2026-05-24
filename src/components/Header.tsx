interface Props {
  theme:       'dark' | 'light';
  onToggle:    () => void;
  onResetAll:  () => void;
}

export function Header({ theme, onToggle, onResetAll }: Props) {
  return (
    <div className="flex items-start justify-between mb-7 gap-4">
      <div>
        <div className="font-mono text-[10px] tracking-[2px] text-[#7070a0] uppercase mb-2.5">
          Zero to Hired · 80 Days
        </div>
        <h1
          className="font-extrabold leading-[1.1] tracking-[-1px] mb-2"
          style={{
            fontSize: 'clamp(1.7rem, 5vw, 2.4rem)',
            background: 'linear-gradient(135deg, #e2e2f0 40%, #7070a0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Dev Roadmap<br/>Tracker
        </h1>
        <p className="text-[13px] text-[#7070a0] leading-relaxed">
          React · TypeScript · Tailwind · DevOps · 8–10 hrs/day
        </p>
      </div>

      <div className="flex flex-col gap-2 items-end shrink-0">
        <button
          onClick={onToggle}
          className="px-3.5 py-2 rounded-[10px] border border-[#1c1c2e] bg-[#13131f]
                     text-[#7070a0] font-mono text-[11px] cursor-pointer whitespace-nowrap
                     hover:border-violet-500/50 hover:text-violet-300 transition-all duration-150"
        >
          {theme === 'dark' ? '☀ light' : '◑ dark'}
        </button>
        <button
          onClick={() => { if (confirm('Reset ALL progress? Cannot be undone.')) onResetAll(); }}
          className="px-3.5 py-2 rounded-[10px] border border-[#1c1c2e] bg-transparent
                     text-[#7070a0] font-mono text-[11px] cursor-pointer whitespace-nowrap
                     hover:border-red-500/40 hover:text-red-400 transition-all duration-150"
        >
          ↺ reset
        </button>
      </div>
    </div>
  );
}
