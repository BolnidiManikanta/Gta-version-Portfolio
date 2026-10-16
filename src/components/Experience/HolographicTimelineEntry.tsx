import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export interface TimelineMilestone {
  id: string;
  yearOrPeriod: string;
  category: string;
  title: string;
  organization: string;
  description: string;
  keyContribution: string | string[];
  status?: string;
  statusVariant?: 'emerald' | 'cyan' | 'purple' | 'pink';
  actionUrl?: string;
  actionLabel?: string;
  accentColor?: 'purple' | 'cyan' | 'pink' | 'emerald';
}

interface HolographicTimelineEntryProps {
  entry: TimelineMilestone;
  index: number;
  total: number;
  isActive: boolean;
  onActivate: () => void;
  position: 'left' | 'right';
}

export const HolographicTimelineEntry: React.FC<HolographicTimelineEntryProps> = ({
  entry,
  index,
  total,
  isActive,
  onActivate,
  position,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches || window.innerWidth < 768);

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setPixelPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // 3D Tilt calculations
  const maxTiltX = 3;
  const maxTiltY = 4;
  const rotateX = isHovered && !reducedMotion ? (mousePos.y - 0.5) * -maxTiltX * 2 : 0;
  const baseRotY = position === 'left' ? 2 : -2;
  const rotateY = isHovered && !reducedMotion ? (mousePos.x - 0.5) * maxTiltY * 2 + (baseRotY * 0.5) : baseRotY;
  const translateZ = isActive ? (isHovered ? 35 : 20) : (isHovered ? 10 : -40);
  const scale = isActive ? (isHovered ? 1.04 : 1.02) : (isHovered ? 0.99 : 0.95);

  const accentThemes = {
    purple: {
      border: 'border-purple-500/35',
      borderActive: 'border-purple-400',
      glow: 'rgba(168, 85, 247, 0.35)',
      nodeBg: 'bg-purple-500',
      nodeRing: 'ring-purple-400',
      tagText: 'text-purple-400',
      badgeBg: 'bg-purple-950/80',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/50',
      beam: 'from-purple-500/60 to-purple-500/0',
    },
    cyan: {
      border: 'border-cyan-500/35',
      borderActive: 'border-cyan-400',
      glow: 'rgba(6, 182, 212, 0.35)',
      nodeBg: 'bg-cyan-500',
      nodeRing: 'ring-cyan-400',
      tagText: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/80',
      badgeText: 'text-cyan-300',
      badgeBorder: 'border-cyan-500/50',
      beam: 'from-cyan-500/60 to-cyan-500/0',
    },
    pink: {
      border: 'border-pink-500/35',
      borderActive: 'border-pink-400',
      glow: 'rgba(236, 72, 153, 0.35)',
      nodeBg: 'bg-pink-500',
      nodeRing: 'ring-pink-400',
      tagText: 'text-pink-400',
      badgeBg: 'bg-pink-950/80',
      badgeText: 'text-pink-300',
      badgeBorder: 'border-pink-500/50',
      beam: 'from-pink-500/60 to-pink-500/0',
    },
    emerald: {
      border: 'border-emerald-500/35',
      borderActive: 'border-emerald-400',
      glow: 'rgba(16, 185, 129, 0.35)',
      nodeBg: 'bg-emerald-500',
      nodeRing: 'ring-emerald-400',
      tagText: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/80',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/50',
      beam: 'from-emerald-500/60 to-emerald-500/0',
    },
  };

  const theme = accentThemes[entry.accentColor || 'purple'];

  return (
    <div
      className={`relative w-full flex flex-col md:flex-row items-center my-6 md:my-10 ${
        position === 'left' ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* 1. Empty Spacer Column on opposite side for desktop 50/50 split */}
      <div className="hidden md:block w-1/2" />

      {/* 2. Central Timeline Interactive Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        {/* Clickable Glowing Rail Node */}
        <button
          type="button"
          onClick={onActivate}
          aria-label={`Milestone ${index + 1}: ${entry.title}`}
          className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isActive
              ? `${theme.nodeBg} shadow-[0_0_25px_${theme.glow}] ring-4 ${theme.nodeRing}/40 scale-110`
              : 'bg-black/90 border border-white/30 hover:border-purple-400 hover:scale-110'
          }`}
        >
          {/* Inner pulsating core */}
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              isActive ? 'bg-white shadow-[0_0_8px_#ffffff]' : 'bg-purple-400/80'
            }`}
          />
          {isActive && (
            <span
              className={`absolute inset-0 rounded-full ${theme.nodeBg} animate-ping opacity-60 pointer-events-none`}
            />
          )}
        </button>

        {/* Milestone Index Indicator */}
        <span
          className={`mt-1 font-mono text-[10px] tracking-tighter uppercase px-1.5 py-0.2 rounded transition-colors ${
            isActive ? `${theme.tagText} font-black` : 'text-neutral-500'
          }`}
        >
          0{index + 1}
        </span>
      </div>

      {/* 3. Horizontal Holographic Connector Conduit (Desktop) */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300 ${
          position === 'left'
            ? 'right-1/2 w-8 lg:w-12 bg-gradient-to-l ' + theme.beam
            : 'left-1/2 w-8 lg:w-12 bg-gradient-to-r ' + theme.beam
        } h-[2px]`}
      />

      {/* 4. Floating Holographic Panel Container */}
      <div
        className={`w-full pl-12 md:pl-0 md:w-1/2 z-20 ${
          position === 'left' ? 'md:pr-10 lg:pr-14' : 'md:pl-10 lg:pl-14'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-1000 w-full"
        >
          <div
            ref={panelRef}
            onClick={onActivate}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              if (!reducedMotion && !isTouch) setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePos({ x: 0.5, y: 0.5 });
            }}
            style={{
              transformStyle: 'preserve-3d',
              transform: reducedMotion
                ? 'none'
                : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
              transition: isHovered
                ? 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease'
                : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease',
              boxShadow: isActive
                ? `0 24px 48px -10px rgba(0, 0, 0, 0.9), 0 0 35px ${theme.glow}`
                : isHovered
                ? `0 16px 32px -8px rgba(0, 0, 0, 0.75), 0 0 20px ${theme.glow}`
                : '0 8px 24px -6px rgba(0, 0, 0, 0.6)',
            }}
            className={`relative w-full rounded-lg border backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden group ${
              isActive ? `${theme.borderActive} bg-[#0c0818]/75` : `${theme.border} bg-[#080512]/60 hover:border-purple-400/70`
            }`}
          >
            {/* Hologram Scanline & Reticle Texture Overlay */}
            <div className="absolute inset-0 gta-scanlines opacity-10 pointer-events-none" />

            {/* Corner Sci-Fi Target Reticles */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">
              ⌜ 0{index + 1}
            </div>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">
              ⌝
            </div>
            <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">
              ⌞
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">
              ⌟
            </div>

            {/* Neon Top Accent Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                isActive ? `${theme.nodeBg} opacity-100 shadow-[0_0_10px_currentColor]` : 'bg-white/20 opacity-40'
              }`}
            />

            {/* Specular Radial Light Reflection Following Cursor */}
            {isHovered && !reducedMotion && !isTouch && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                style={{
                  background: `radial-gradient(circle 320px at ${pixelPos.x}px ${pixelPos.y}px, rgba(255, 255, 255, 0.08), transparent 75%)`,
                }}
              />
            )}

            {/* Panel Internal Content */}
            <div className="relative z-10 p-5 sm:p-6 space-y-3.5">
              {/* Top Row: Year / Period + Track Category + Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold ${theme.tagText}`}>
                    {entry.yearOrPeriod}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="font-hud text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                    {entry.category}
                  </span>
                </div>

                {entry.status && (
                  <span
                    className={`text-[10px] font-hud uppercase px-2 py-0.5 rounded border font-semibold tracking-wider ${
                      entry.statusVariant === 'emerald'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                        : entry.statusVariant === 'cyan'
                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                        : 'bg-purple-950/80 text-purple-300 border-purple-500/50'
                    }`}
                  >
                    {entry.status}
                  </span>
                )}
              </div>

              {/* Main Title & Organization */}
              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white group-hover:text-purple-200 transition-colors leading-snug">
                  {entry.title}
                </h3>
                <div className="font-hud text-xs text-neutral-300 font-medium">
                  {entry.organization}
                </div>
              </div>

              {/* 2-3 Line Concise Description */}
              {entry.description && (
                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {entry.description}
                </p>
              )}

              {/* Key Contribution / Deliverable */}
              {entry.keyContribution && (
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <div className="font-hud text-[10px] text-neutral-400 uppercase tracking-wider font-bold">
                    KEY CONTRIBUTION:
                  </div>
                  {Array.isArray(entry.keyContribution) ? (
                    <ul className="space-y-1.5 text-xs text-neutral-200 pl-4 list-disc marker:text-purple-400">
                      {entry.keyContribution.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-neutral-200 font-medium leading-relaxed flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{entry.keyContribution}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Action Button (e.g. IEEE Xplore Link) */}
              {entry.actionUrl && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={entry.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-purple-600/80 hover:bg-purple-500 text-white font-hud text-[11px] font-bold border border-purple-300/60 shadow-[0_0_12px_rgba(168,85,247,0.4)] tracking-wider transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{entry.actionLabel || 'VIEW PUBLICATION'}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
