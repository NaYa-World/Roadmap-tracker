// ─── Task types ────────────────────────────────────────────────────────────
export type TaskKind = 'concept' | 'code' | 'quiz' | 'project';

export interface Task {
  readonly t: string;
  readonly k: TaskKind;
}

// ─── Day / Phase data ───────────────────────────────────────────────────────
export interface DayData {
  readonly day: string;
  readonly label: string;
  readonly noteKey: string;
  readonly tasks: Task[];
}

export interface PhaseConfig {
  readonly title: string;
  readonly days: string;
  readonly icon: string;
  readonly color: string;
  readonly dim: string;
  readonly data: DayData[];
}

// ─── Notes system ───────────────────────────────────────────────────────────
export type NoteSection =
  | { type: 'h2';        t: string }
  | { type: 'h3';        t: string }
  | { type: 'p';         t: string }
  | { type: 'code';      t: string }
  | { type: 'tip';       t: string }
  | { type: 'warn';      t: string }
  | { type: 'keypoints'; items: string[] }
  | { type: 'quiz';      qs: string[] }
  | { type: 'table';     heads: string[]; rows: string[][] }

export interface NoteData {
  readonly phase: string;
  readonly day: string;
  readonly sections: NoteSection[];
}

export type NotesMap = Record<string, NoteData>;

// ─── Persisted state ────────────────────────────────────────────────────────
export interface AppState {
  _streak?: number;
  _lastDay?: string;
  [key: string]: boolean | number | string | undefined;
}

// ─── Context ────────────────────────────────────────────────────────────────
export interface TrackerContextValue {
  state:       AppState;
  toggleTask:  (pi: number, di: number, ti: number) => void;
  resetAll:    () => void;
  totalDone:   number;
  totalLeft:   number;
  totalTasks:  number;
  pct:         number;
  streak:      number;
}
