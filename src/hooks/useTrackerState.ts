import { useState, useEffect } from 'react';
import type { AppState } from '../types';

const STORAGE_KEY = 'devmap_v5';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppState) : {};
  } catch {
    return {};
  }
}

function saveState(s: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

export function useTrackerState() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  function toggleTask(pi: number, di: number, ti: number): void {
    const id = `p${pi}d${di}t${ti}`;
    const today = new Date().toDateString();
    setState(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next._lastDay !== today) {
        const yesterday = new Date(Date.now() - 86_400_000).toDateString();
        next._streak = prev._lastDay === yesterday ? ((prev._streak as number ?? 0) + 1) : 1;
        next._lastDay = today;
      }
      return next;
    });
  }

  function resetAll(): void {
    setState({});
  }

  return { state, toggleTask, resetAll };
}
