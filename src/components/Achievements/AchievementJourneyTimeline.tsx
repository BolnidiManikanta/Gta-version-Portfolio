import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface AchievementJourneyTimelineProps {
  selectedYear?: string | null;
  onSelectYear?: (year: string | null) => void;
}

const MILESTONE_YEARS = [
  { year: '2022', label: 'FOUNDATION' },
  { year: '2023', label: 'ACCREDIT' },
  { year: '2024', label: 'COMPETE' },
  { year: '2025', label: 'RESEARCH' },
  { year: '2026', label: 'MASTERY' },
];

export const AchievementJourneyTimeline: React.FC<AchievementJourneyTimelineProps> = ({
  selectedYear,
  onSelectYear,
}) => {
  return (
    <section
      aria-label="Achievement Journey Timeline"
      className="relative w-full h-full flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#140e07]/90 via-[#0b0804]/95 to-[#040302]/98 border border-amber-500/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.85),inset_0_0_20px_rgba(245,158,11,0.08)] select-none"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <h2 className="font-hud text-[11px] font-black tracking-widest text-amber-300 uppercase">
            ACHIEVEMENT JOURNEY
          </h2>
        </div>

        {selectedYear ? (
          <button
            type="button"
            onClick={() => onSelectYear?.(null)}
            className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline cursor-pointer"
          >
            CLEAR ({selectedYear})
          </button>
        ) : (
          <span className="font-hud text-[10px] text-neutral-400 uppercase tracking-wider">
            2022 – 2026
          </span>
        )}
      </div>

      <p className="font-vice text-[11px] text-amber-200/80 tracking-wide italic pl-1">
        &ldquo;A timeline of growth.&rdquo;
      </p>

      {/* Horizontal Timeline with Gold Glowing Nodes */}
      <div className="relative pt-4 pb-1 flex items-center justify-between px-2 sm:px-3">
        {/* Continuous Connecting Gold Line */}
        <div className="absolute top-[25px] left-4 right-4 h-[1.5px] bg-gradient-to-r from-amber-500/30 via-amber-400/70 to-amber-500/30" />

        {MILESTONE_YEARS.map((m) => {
          const isSelected = selectedYear === m.year;
          const isLatest = m.year === '2025' || m.year === '2026';

          return (
            <div
              key={m.year}
              onClick={() => onSelectYear?.(isSelected ? null : m.year)}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              {/* Gold Glowing Interactive Node */}
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-amber-300 scale-125 shadow-[0_0_15px_#fcd34d] border-2 border-white'
                    : isLatest
                    ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)] border border-amber-300 group-hover:scale-115'
                    : 'bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)] border border-amber-400 group-hover:scale-110'
                }`}
              >
                <div className="w-1 h-1 rounded-full bg-black/70" />
              </div>

              {/* Year Label */}
              <span
                className={`mt-1.5 font-mono text-[11px] font-bold transition-colors ${
                  isSelected
                    ? 'text-amber-300'
                    : 'text-neutral-300 group-hover:text-amber-400'
                }`}
              >
                {m.year}
              </span>

              {/* Stage Sub-label */}
              <span className="text-[8px] font-hud tracking-wider text-neutral-400 uppercase mt-0.5 hidden sm:inline">
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
