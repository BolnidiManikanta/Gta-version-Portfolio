import React from 'react';
import { Star, ShieldCheck, Flame, Trophy, Award } from 'lucide-react';

export const LearnGrowPanel: React.FC = () => {
  return (
    <div
      aria-label="Pillars of Growth"
      className="relative w-full h-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#140e07]/90 via-[#0b0804]/95 to-[#040302]/98 border border-amber-500/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.85),inset_0_0_20px_rgba(245,158,11,0.08)] select-none overflow-hidden"
    >
      {/* Background soft ambient flare */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Left: Glowing Gold Star Emblem */}
      <div className="flex flex-col items-center justify-center pl-1 sm:pl-2 shrink-0">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[1.5px] shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-black/85 flex items-center justify-center">
            <Star className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 fill-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.9)] animate-pulse" />
          </div>
        </div>
        <span className="font-hud text-[9px] font-black text-amber-400 tracking-wider mt-1.5 uppercase">
          HONORS
        </span>
      </div>

      {/* Right: 4 Golden Growth Pillars */}
      <div className="flex flex-col justify-center space-y-1 pr-1 sm:pr-2 text-right">
        <div className="flex items-center justify-end gap-1.5 font-hud font-black text-xs sm:text-sm tracking-wider text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
          <span>LEARN</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <div className="flex items-center justify-end gap-1.5 font-hud font-black text-xs sm:text-sm tracking-wider text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
          <span>BUILD</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <div className="flex items-center justify-end gap-1.5 font-hud font-black text-xs sm:text-sm tracking-wider text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
          <span>COMPETE</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <div className="flex items-center justify-end gap-1.5 font-hud font-black text-xs sm:text-sm tracking-wider text-yellow-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
          <span>GROW</span>
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping" />
        </div>
      </div>
    </div>
  );
};
