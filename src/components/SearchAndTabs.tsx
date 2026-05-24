// ─── SearchBar ──────────────────────────────────────────────────────────────
interface SearchBarProps {
  value:    string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-3.5">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
        width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search concepts, tasks, topics..."
        className="w-full bg-[#13131f] border border-[#1c1c2e] rounded-[10px]
                   pl-10 pr-4 py-2.5 text-[14px] text-[#e2e2f0] outline-none
                   font-sans placeholder:text-[#7070a0]
                   focus:border-violet-500/40 focus:ring-[3px] focus:ring-violet-500/8
                   transition-all duration-150"
      />
    </div>
  );
}

// ─── Tabs ───────────────────────────────────────────────────────────────────
const TAB_LABELS = [
  { value: 'all', label: 'All phases' },
  { value: '0',   label: '① Foundations' },
  { value: '1',   label: '② TypeScript' },
  { value: '2',   label: '③ React+Tailwind' },
  { value: '3',   label: '④ DevOps' },
  { value: '4',   label: '⑤ Projects' },
  { value: '5',   label: '⑥ Interview' },
];

interface TabsProps {
  active:   string;
  onChange: (v: string) => void;
}

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-5">
      {TAB_LABELS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3 py-1.5 text-[12px] font-medium rounded-full border
                      font-sans whitespace-nowrap transition-all duration-150
                      ${active === tab.value
                        ? 'bg-[#e2e2f0] text-[#08080f] border-transparent'
                        : 'bg-transparent text-[#7070a0] border-[#1c1c2e] hover:text-[#e2e2f0] hover:border-[#3a3a5c]'
                      }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
