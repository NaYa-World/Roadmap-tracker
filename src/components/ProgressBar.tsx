interface Props {
  pct:     number;
  done:    number;
  left:    number;
  nextDay: string;
}

export function ProgressBar({ pct, done, left, nextDay }: Props) {
  const message =
    left === 0
      ? '🎉 All tasks complete! You are ready to apply.'
      : done === 0
      ? `${left} tasks ahead of you — start today, not tomorrow.`
      : `${left} tasks left — next up: ${nextDay}`;

  return (
    <>
      {/* Overall bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-mono text-[11px] text-[#7070a0]">overall progress</span>
          <span className="font-mono text-[11px] font-semibold text-white">{pct}%</span>
        </div>
        <div className="h-1.5 bg-[#1c1c2e] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-emerald-400 to-sky-400
                       transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Left banner */}
      <div className="flex items-center gap-2 bg-violet-500/5 border border-violet-500/15
                      rounded-xl px-3.5 py-2.5 mb-4">
        <svg className="shrink-0 text-violet-400" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span className="text-[13px] text-[#7070a0]"
          dangerouslySetInnerHTML={{ __html: message.replace(/([^:]+:)(.+)/, '$1 <strong class="text-white font-semibold">$2</strong>') }}
        />
      </div>
    </>
  );
}
