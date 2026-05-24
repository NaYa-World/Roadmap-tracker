import { useEffect } from 'react';
import type { NoteData, NoteSection } from '../types';

interface Props {
  note:     NoteData | null;
  dayLabel: string;
  onClose:  () => void;
}

function escHtml(t: string): string {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function Section({ s }: { s: NoteSection }) {
  switch (s.type) {
    case 'h2':
      return (
        <h2 className="text-base font-bold text-white mt-7 mb-3 pb-2
                       border-b border-[#1c1c2e] first:mt-0">
          {s.t}
        </h2>
      );
    case 'h3':
      return <h3 className="text-[13px] font-semibold text-white mt-4 mb-2">{s.t}</h3>;
    case 'p':
      return (
        <p
          className="text-[13px] text-[#7070a0] leading-7 mb-2"
          dangerouslySetInnerHTML={{ __html: s.t }}
        />
      );
    case 'code':
      return (
        <pre className="n-code text-[11.5px] leading-6 my-3 overflow-x-auto">
          {escHtml(s.t)}
        </pre>
      );
    case 'tip':
      return (
        <div className="flex gap-2.5 p-3 rounded-lg my-3
                        bg-emerald-500/5 border border-emerald-500/15">
          <span className="text-base shrink-0 mt-0.5">💡</span>
          <p
            className="text-[13px] text-[#7070a0] leading-6"
            dangerouslySetInnerHTML={{ __html: s.t }}
          />
        </div>
      );
    case 'warn':
      return (
        <div className="flex gap-2.5 p-3 rounded-lg my-3
                        bg-amber-500/5 border border-amber-500/15">
          <span className="text-base shrink-0 mt-0.5">⚠️</span>
          <p
            className="text-[13px] text-[#7070a0] leading-6"
            dangerouslySetInnerHTML={{ __html: s.t }}
          />
        </div>
      );
    case 'table':
      return (
        <div className="overflow-x-auto my-3">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr>
                {s.heads.map(h => (
                  <th key={h}
                    className="text-left px-3 py-2 bg-violet-500/8 text-white
                               font-semibold border border-[#1c1c2e]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.015]">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-1.5 border border-[#1c1c2e] text-[#7070a0] leading-5">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'keypoints':
      return (
        <div className="bg-violet-500/4 border border-violet-500/12 rounded-xl p-4 my-3">
          {s.items.map((item, i) => (
            <div key={i} className="flex gap-2.5 py-2 border-b border-white/[0.04] last:border-0">
              <span className="font-mono text-[11px] font-bold text-violet-400 shrink-0 pt-0.5 min-w-[22px]">
                {i + 1}.
              </span>
              <p
                className="text-[13px] text-[#7070a0] leading-6"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </div>
          ))}
        </div>
      );
    case 'quiz':
      return (
        <div className="mt-1 space-y-2">
          {s.qs.map((q, i) => (
            <div key={i}
              className="px-3.5 py-2.5 rounded-lg bg-amber-500/5 border border-amber-500/12
                         text-[13px] text-[#7070a0] leading-6 before:content-['Q_·_']
                         before:font-mono before:text-[10px] before:font-bold before:text-amber-400">
              {q}
            </div>
          ))}
        </div>
      );
  }
}

export function NotesPanel({ note, dayLabel, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = note ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [note]);

  const isOpen = Boolean(note);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
                    transition-opacity duration-250
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Panel */}
      <div
        id="notes-panel"
        className={`fixed top-0 right-0 bottom-0 z-50
                    w-full max-w-[680px]
                    bg-[#08080f] border-l border-[#1c1c2e]
                    flex flex-col overflow-hidden
                    ${isOpen ? 'open' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1c1c2e] bg-[#13131f] shrink-0">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-widest mb-1">
              {note?.phase ?? ''}
            </div>
            <div className="text-[15px] font-bold text-white truncate">
              {note?.day ?? dayLabel}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0
                       border border-[#1c1c2e] bg-[#13131f] text-[#7070a0]
                       hover:border-red-500/40 hover:text-red-400 transition-all duration-150"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {note ? (
            note.sections.map((s, i) => <Section key={i} s={s} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="text-5xl">📝</div>
              <p className="text-white font-semibold">Notes coming soon</p>
              <p className="text-sm text-[#7070a0]">Detailed notes for {dayLabel} will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
