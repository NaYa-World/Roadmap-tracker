# 80-Day Dev Roadmap Tracker

A full-featured learning tracker built with **React 18 + TypeScript + Tailwind CSS + Vite**.

Click any day's **📖 Notes** button to open structured, senior-level notes for that topic — concepts, code examples, tips, key points, and quiz questions.

---

## ✨ Features

- **Per-day Notes panel** — slides in from the right with full structured content for every day
- **Task checkboxes** — tick off each task, persisted in `localStorage` (no database needed)
- **Phase progress bars** — per-phase and overall progress tracking
- **Stats dashboard** — Done · Left · Total · Progress % · 🔥 Streak
- **AI Quiz cards** — copy prompt or open directly in Claude for every day
- **Search** — filter tasks across all phases instantly
- **Phase tabs** — jump to any phase directly
- **Dark / Light theme** — persisted across sessions
- **Top progress strip** — animated gradient bar fills as you complete tasks

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Title, theme toggle, reset button
│   ├── StatsBar.tsx        # Done / Left / Total / Progress / Streak cards
│   ├── ProgressBar.tsx     # Overall progress bar + next task banner
│   ├── SearchAndTabs.tsx   # Search input + phase filter tabs
│   ├── PhaseCard.tsx       # Collapsible phase with progress bar
│   ├── DayBlock.tsx        # Day row with tasks + notes button + quiz card
│   ├── TaskRow.tsx         # Individual task with animated checkbox
│   └── NotesPanel.tsx      # Slide-over notes panel with rich content
├── data/
│   ├── phases.ts           # All 80 days of roadmap data
│   └── notes.ts            # Structured notes for every phase/day
├── hooks/
│   ├── useTrackerState.ts  # localStorage persistence + streak logic
│   └── useTheme.ts         # Dark/light theme management
├── types/
│   └── index.ts            # All TypeScript interfaces and types
├── utils/
│   └── index.ts            # Helper functions (taskId, countDone, cn...)
├── App.tsx                 # Root component wiring everything together
├── main.tsx                # React entry point
└── index.css               # Tailwind imports + custom CSS (animations, transitions)
```

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| Vite | 5 | Build tool + dev server |

**Zero runtime dependencies** beyond React itself. All state stored in `localStorage`.

---

## 📖 How Notes Work

Each day has a **`noteKey`** in the phase data (`p0d0`, `p1d0`, etc.) that maps to a structured note entry in `src/data/notes.ts`.

Notes are composed of typed sections:
- `h2` / `h3` — headings
- `p` — paragraphs (supports inline HTML)
- `code` — syntax-highlighted code blocks
- `tip` — green callout boxes
- `warn` — amber warning boxes
- `table` — structured data tables
- `keypoints` — numbered key point list
- `quiz` — quiz questions formatted as cards

To add notes for a new day, add an entry to `NOTES` in `src/data/notes.ts` and set the `noteKey` on the day in `src/data/phases.ts`.

---

*Built for GK · Zero to Hired in 80 Days*
