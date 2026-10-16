import React from 'react';

export interface DistributionCategory {
  name: string;
  count: number;
  color: string;
}

interface SkillDistributionHUDProps {
  categories: DistributionCategory[];
  totalSkills: number;
}

export const SkillDistributionHUD: React.FC<SkillDistributionHUDProps> = ({
  categories,
  totalSkills,
}) => {
  // SVG Donut Calculations
  const size = 110;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute strokeDasharray and strokeDashoffset for each slice
  let accumulatedAngle = 0;
  const slices = categories.map((cat) => {
    const ratio = totalSkills > 0 ? cat.count / totalSkills : 0;
    const strokeDash = ratio * circumference;
    const strokeOffset = circumference - accumulatedAngle;
    accumulatedAngle += strokeDash;

    return {
      ...cat,
      strokeDash,
      strokeOffset,
    };
  });

  return (
    <div className="w-full p-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <span className="font-hud font-bold text-xs tracking-wider text-amber-400 uppercase">
          SKILL DISTRIBUTION
        </span>
        <span className="text-[10px] font-mono text-white/50">
          {totalSkills} VERIFIED
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* SVG Donut Chart */}
        <div className="relative w-[110px] h-[110px] shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {slices.map((slice, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${slice.strokeDash} ${circumference}`}
                strokeDashoffset={slice.strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-700 hover:opacity-80"
              />
            ))}
          </svg>

          {/* Center Label inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="font-hud font-extrabold text-lg text-white leading-none">
              {totalSkills}
            </span>
            <span className="text-[9px] font-hud font-bold text-amber-400 uppercase tracking-widest mt-0.5">
              SKILLS
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-[11px] font-sans text-white/80 group hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_6px]"
                  style={{ backgroundColor: cat.color, color: cat.color }}
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span className="font-mono text-[10px] text-white/60 font-semibold group-hover:text-amber-300 ml-1">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
