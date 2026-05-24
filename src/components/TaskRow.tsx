import { useState } from 'react';
import type { Task } from '../types';
import { badgeClasses } from '../utils';

interface Props {
  task:    Task;
  done:    boolean;
  color:   string;
  onToggle: () => void;
}

export function TaskRow({ task, done, color, onToggle }: Props) {
  const [flash, setFlash] = useState(false);

  function handleClick() {
    if (!done) {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }
    onToggle();
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-start gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer
                  hover:bg-white/[0.025] transition-colors duration-100
                  ${flash ? 'flash' : ''}`}
    >
      {/* Checkbox */}
      <div
        className={`cb-check w-[18px] h-[18px] rounded-[5px] shrink-0 mt-[1px]
                    flex items-center justify-center
                    border transition-all duration-200 ease-spring
                    ${done ? 'border-transparent' : 'border-[#3a3a5c]'}`}
        style={done ? { background: color, borderColor: color } : {}}
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
          stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2 6 5 9 10 3"/>
        </svg>
      </div>

      {/* Text */}
      <span
        className={`flex-1 text-[13px] leading-[1.55] transition-all duration-200
                    ${done ? 'line-through text-[#7070a0] opacity-45' : 'text-[#e2e2f0]'}`}
      >
        {task.t}
      </span>

      {/* Badge */}
      <span className={`font-mono text-[9px] font-semibold px-2 py-0.5 rounded
                        shrink-0 mt-[2px] tracking-[0.3px] ${badgeClasses(task.k)}`}>
        {task.k}
      </span>
    </div>
  );
}
