import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { UnifiedExhibitionItem } from './AchievementSpatialStage';
import { BrandLogo } from './BrandLogo';
import { gtaAudio } from '../../utils/audio';

interface CarouselNavHUDProps {
  items: UnifiedExhibitionItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  progressPercent: number;
}

export const CarouselNavHUD: React.FC<CarouselNavHUDProps> = ({
  items,
  activeIndex,
  onSelectIndex,
  onNext,
  onPrev,
  isAutoPlaying,
  onToggleAutoPlay,
  progressPercent,
}) => {
  const total = items.length;
  const railRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the thumbnail rail to keep active card centered in view
  useEffect(() => {
    if (railRef.current) {
      const activeEl = railRef.current.children[activeIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [activeIndex]);

  if (total === 0) return null;

  const currentNumber = String(activeIndex + 1).padStart(2, '0');
  const totalNumber = String(total).padStart(2, '0');

  return (
    <div
      aria-label="Holographic Credential Dock"
      className="relative w-full flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#140e07]/90 via-[#0b0804]/95 to-[#040302]/98 border border-amber-500/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.85),inset_0_0_20px_rgba(245,158,11,0.08)] select-none"
    >
      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-amber-500/20 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-hud text-[11px] font-black tracking-widest text-amber-300 uppercase">
            HOLOGRAPHIC CREDENTIAL DOCK
          </span>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-amber-300 font-black tracking-wider bg-amber-950/90 px-2 py-0.5 rounded border border-amber-400/50 shadow-sm">
            {currentNumber}
          </span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">{totalNumber}</span>
        </div>
      </div>

      {/* Main Interactive Rail with Prev/Next Controls */}
      <div className="relative w-full flex items-center gap-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => {
            gtaAudio.playSelect();
            onPrev();
          }}
          aria-label="Previous exhibit"
          className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-black/80 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white hover:bg-amber-500/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Scrollable Thumbnail Rail */}
        <div
          ref={railRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none scroll-smooth [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          {items.map((it, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => {
                  gtaAudio.playSelect();
                  onSelectIndex(idx);
                }}
                aria-label={`Select ${it.title}`}
                className={`relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/35 to-black shadow-[0_0_16px_rgba(245,158,11,0.7)] scale-110 z-10'
                    : 'border border-amber-500/25 bg-black/70 hover:border-amber-400/60 hover:bg-black/90 opacity-65 hover:opacity-100'
                }`}
              >
                {/* Brand Logo or Icon Thumbnail */}
                <div className="scale-75 pointer-events-none">
                  <BrandLogo
                    organization={it.organization}
                    title={it.title}
                    category={it.category}
                    size="sm"
                  />
                </div>

                {/* Golden active indicator pip */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_5px_#fde047]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => {
            gtaAudio.playSelect();
            onNext();
          }}
          aria-label="Next exhibit"
          className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-black/80 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white hover:bg-amber-500/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md group"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Track Bar & Autoplay Toggle */}
      <div className="w-full mt-2.5 pt-2 border-t border-amber-500/15 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={onToggleAutoPlay}
          aria-label={isAutoPlaying ? 'Pause automatic rotation' : 'Start automatic rotation'}
          title={isAutoPlaying ? 'Pause auto-cycle (10s)' : 'Resume auto-cycle'}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white transition-colors cursor-pointer"
        >
          {isAutoPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-amber-400" />}
          <span className="font-hud text-[10px] font-bold">{isAutoPlaying ? 'AUTO (10S)' : 'PAUSED'}</span>
        </button>

        {/* Explanatory Prompt */}
        <span className="hidden sm:inline font-hud tracking-widest text-[10px] text-amber-400/80">
          SCROLL • EXPLORE • GET INSPIRED
        </span>

        {/* Dynamic Progress Indicator */}
        <div className="w-24 sm:w-32 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-amber-500/20">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300 shadow-[0_0_8px_#f59e0b]"
            style={{
              width: `${Math.round(((activeIndex + 1) / total) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
