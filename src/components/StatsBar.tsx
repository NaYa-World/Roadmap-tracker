interface Props {
  done:   number;
  left:   number;
  total:  number;
  pct:    number;
  streak: number;
}

export function StatsBar({ done, left, total, pct, streak }: Props) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {[
        { label: 'Done',     value: done,              color: 'text-white' },
        { label: 'Left',     value: left,              color: 'text-red-400' },
        { label: 'Total',    value: total,             color: 'text-white' },
        { label: 'Progress', value: `${pct}%`,         color: 'text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text' },
        { label: '🔥 Streak',value: streak,            color: 'text-amber-400' },
      ].map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-[#13131f] border border-[#1c1c2e] rounded-xl p-3 text-center
                     hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20
                     transition-all duration-150"
        >
          <div className={`font-mono text-xl font-bold ${color}`}>{value}</div>
          <div className="text-[10px] text-[#7070a0] uppercase tracking-widest mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
