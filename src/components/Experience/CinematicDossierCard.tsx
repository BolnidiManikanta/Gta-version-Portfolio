import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface CinematicDossierCardProps {
  index: number;
  category: string;
  title: string;
  organization: string;
  period?: string;
  badge?: string;
  badgeVariant?: 'purple' | 'cyan' | 'emerald' | 'pink';
  description?: string;
  directive?: string;
  highlights?: string[];
  metaNote?: string;
  actionButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  accentColor?: 'purple' | 'cyan' | 'pink' | 'emerald';
  layoutOffset?: 'left' | 'right' | 'center';
}

export const CinematicDossierCard: React.FC<CinematicDossierCardProps> = ({
  index,
  category,
  title,
  organization,
  period,
  badge,
  badgeVariant = 'purple',
  description,
  directive,
  highlights = [],
  metaNote,
  actionButton,
  accentColor = 'purple',
  layoutOffset = 'center',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check touch device
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchQuery.matches || window.innerWidth < 768);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Default staggered 3D floating offsets based on index
  const defaultZ = index % 2 === 0 ? 12 : -8;
  const defaultRotX = index % 2 === 0 ? 0.8 : -0.8;
  const defaultRotY = index % 2 === 0 ? -1.2 : 1.2;
  const defaultTransY = index % 2 === 1 ? 8 : 0;

  // Handle mouse move for 3D tilt and specular reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setPixelPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (!reducedMotion && !isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Compute 3D rotation angles (capped at ±5.5 degrees)
  const maxTilt = 5.5;
  const rotateX = isHovered && !reducedMotion ? (mousePos.y - 0.5) * -maxTilt * 2 : defaultRotX;
  const rotateY = isHovered && !reducedMotion ? (mousePos.x - 0.5) * maxTilt * 2 : defaultRotY;
  const translateZ = isHovered && !reducedMotion ? 32 : defaultZ;
  const scale = isHovered && !reducedMotion ? 1.02 : 1.0;
  const translateY = isHovered && !reducedMotion ? -6 : defaultTransY;

  // Accent color themes
  const colorMap = {
    purple: {
      border: 'border-purple-500/30',
      borderHover: 'hover:border-purple-400/80',
      glow: 'rgba(168, 85, 247, 0.25)',
      badgeBg: 'bg-purple-950/80',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/50',
      marker: 'marker:text-purple-400',
      line: 'bg-purple-500',
      tagText: 'text-purple-400',
      radialColor: 'rgba(168, 85, 247, 0.14)',
    },
    cyan: {
      border: 'border-cyan-500/30',
      borderHover: 'hover:border-cyan-400/80',
      glow: 'rgba(6, 182, 212, 0.25)',
      badgeBg: 'bg-cyan-950/80',
      badgeText: 'text-cyan-300',
      badgeBorder: 'border-cyan-500/50',
      marker: 'marker:text-cyan-400',
      line: 'bg-cyan-500',
      tagText: 'text-cyan-400',
      radialColor: 'rgba(6, 182, 212, 0.14)',
    },
    emerald: {
      border: 'border-emerald-500/30',
      borderHover: 'hover:border-emerald-400/80',
      glow: 'rgba(16, 185, 129, 0.25)',
      badgeBg: 'bg-emerald-950/80',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/50',
      marker: 'marker:text-emerald-400',
      line: 'bg-emerald-500',
      tagText: 'text-emerald-400',
      radialColor: 'rgba(16, 185, 129, 0.14)',
    },
    pink: {
      border: 'border-pink-500/30',
      borderHover: 'hover:border-pink-400/80',
      glow: 'rgba(236, 72, 153, 0.25)',
      badgeBg: 'bg-pink-950/80',
      badgeText: 'text-pink-300',
      badgeBorder: 'border-pink-500/50',
      marker: 'marker:text-pink-400',
      line: 'bg-pink-500',
      tagText: 'text-pink-400',
      radialColor: 'rgba(236, 72, 153, 0.14)',
    },
  };

  const activeColors = colorMap[accentColor];

  // Dynamic layout offset classes for cinematic composition
  const offsetClass =
    layoutOffset === 'left'
      ? 'lg:-translate-x-3'
      : layoutOffset === 'right'
      ? 'lg:translate-x-3'
      : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`perspective-1000 w-full ${offsetClass}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: reducedMotion
            ? 'none'
            : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(${translateY}px) scale(${scale})`,
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, border-color 0.5s ease',
          boxShadow: isHovered
            ? `0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 32px ${activeColors.glow}`
            : '0 12px 30px -8px rgba(0, 0, 0, 0.65), 0 0 16px rgba(0, 0, 0, 0.4)',
        }}
        className={`relative w-full rounded-lg overflow-hidden border ${activeColors.border} ${activeColors.borderHover} transition-colors duration-300 group cursor-default`}
      >
        {/* Layer 1: Translucent Dark Glass Surface */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-300"
          style={{
            backgroundColor: isHovered ? 'rgba(12, 9, 24, 0.72)' : 'rgba(8, 5, 16, 0.62)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        />

        {/* Layer 2: Subtle Neon Edge Highlight Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] ${activeColors.line} transition-opacity duration-300 ${
            isHovered ? 'opacity-100 shadow-[0_0_12px_currentColor]' : 'opacity-40'
          }`}
        />

        {/* Layer 3: Mouse-Tracking Specular Light Reflection */}
        {isHovered && !reducedMotion && !isTouchDevice && (
          <div
            className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 380px at ${pixelPos.x}px ${pixelPos.y}px, ${activeColors.radialColor}, transparent 75%)`,
            }}
          />
        )}

        {/* Layer 4: Card Header Glow Accent */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: activeColors.glow }}
        />

        {/* Layer 5: Card Content Architecture */}
        <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
          {/* Top Row: Small Category Label & Status Badge */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${activeColors.line} ${isHovered ? 'animate-ping' : ''}`} />
              <span className={`font-hud text-[11px] tracking-widest uppercase font-bold ${activeColors.tagText}`}>
                {category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {period && (
                <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline-block">
                  {period}
                </span>
              )}
              {badge && (
                <span
                  className={`text-[10px] font-hud font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                    badgeVariant === 'emerald'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : badgeVariant === 'cyan'
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                      : badgeVariant === 'pink'
                      ? 'bg-pink-950/80 text-pink-300 border-pink-500/50'
                      : 'bg-purple-950/80 text-purple-300 border-purple-500/50'
                  }`}
                >
                  {badge}
                </span>
              )}
            </div>
          </div>

          {/* Main Title & Organization */}
          <div className="space-y-1">
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight group-hover:text-purple-200 transition-colors leading-snug">
              {title}
            </h3>
            <div className="font-hud text-xs sm:text-sm text-neutral-300 flex items-center gap-2">
              <span className="text-purple-400 font-bold">INSTITUTION:</span>
              <span className="text-neutral-200 font-medium">{organization}</span>
            </div>
          </div>

          {/* Directive / High-Level Focus (if present) */}
          {directive && (
            <div className="px-3.5 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-hud text-neutral-200">
              <span className="text-purple-400 font-bold uppercase mr-1.5">DIRECTIVE:</span>
              <span>{directive}</span>
            </div>
          )}

          {/* Short Description */}
          {description && (
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {description}
            </p>
          )}

          {/* Key Contributions / Highlights */}
          {highlights.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="font-hud text-[11px] text-neutral-400 uppercase tracking-wider block font-bold">
                KEY CONTRIBUTIONS & VERIFIED IMPACT:
              </span>
              <ul className={`space-y-2 text-xs sm:text-sm text-neutral-300 pl-4 list-disc ${activeColors.marker}`}>
                {highlights.map((item, hIdx) => (
                  <li key={hIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Footer Row: Meta Note & Action Button */}
          {(metaNote || actionButton) && (
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              {metaNote && (
                <div className="font-hud text-neutral-400 italic text-[11px] flex items-center gap-1.5">
                  <span>{metaNote}</span>
                </div>
              )}
              {actionButton && (
                actionButton.href ? (
                  <a
                    href={actionButton.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-purple-600/80 hover:bg-purple-500 text-white font-hud text-xs font-bold tracking-wider transition-all duration-200 border border-purple-300/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer self-start sm:self-auto"
                  >
                    {actionButton.icon}
                    <span>{actionButton.label}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={actionButton.onClick}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-purple-600/80 hover:bg-purple-500 text-white font-hud text-xs font-bold tracking-wider transition-all duration-200 border border-purple-300/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer self-start sm:self-auto"
                  >
                    {actionButton.icon}
                    <span>{actionButton.label}</span>
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
