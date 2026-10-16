import React, { useState, useCallback } from 'react';
import { getSkillIcon } from './SkillIcons';
import { VerifiedSkill } from '../../data/skillsCatalog';

export interface OrbitNodePosition {
  id: string;
  skill: VerifiedSkill;
  x: number; // px offset from center X
  y: number; // px offset from center Y
  z: number; // depth px (-160 to +90)
  scale: number;
  opacity: number;
  rotationY: number;
  rotationX: number;
  depthTier: 'front' | 'mid' | 'back';
  idlePhase: number;
  speedY: number;
  speedX: number;
  speedRot: number;
}

interface SkillHexNodeProps {
  node: OrbitNodePosition;
  isSelected?: boolean;
  isPulsing?: boolean;
  idleTime: number;
  onSelect: (skill: VerifiedSkill) => void;
  onHover?: (isHovered: boolean) => void;
  reducedMotion?: boolean;
}

export const SkillHexNode: React.FC<SkillHexNodeProps> = ({
  node,
  isSelected = false,
  isPulsing = false,
  idleTime,
  onSelect,
  onHover,
  reducedMotion = false,
}) => {
  const {
    skill,
    x,
    y,
    z,
    scale,
    opacity,
    rotationX,
    rotationY,
    depthTier,
    idlePhase,
    speedY,
    speedX,
    speedRot,
  } = node;

  const [isHovered, setIsHovered] = useState(false);
  const [tiltOffset, setTiltOffset] = useState({ rx: 0, ry: 0 });

  // Independent floating physics offsets per node (unsynchronized)
  const floatY = reducedMotion ? 0 : Math.sin(idleTime * speedY + idlePhase) * 7;
  const floatX = reducedMotion ? 0 : Math.cos(idleTime * speedX + idlePhase) * 5;
  const floatRot = reducedMotion ? 0 : Math.sin(idleTime * speedRot + idlePhase) * 2;

  // Mouse hover tilt
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setTiltOffset({ rx: -ny * 7, ry: nx * 9 });
    },
    [reducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover?.(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltOffset({ rx: 0, ry: 0 });
    onHover?.(false);
  }, [onHover]);

  // Dynamic Z and scale when hovered
  const currentZ = isHovered ? z + 45 : z;
  const currentScale = isHovered ? 1.06 : scale;
  const currentRotX = rotationX + floatRot + (isHovered ? tiltOffset.rx : 0);
  const currentRotY = rotationY + (isHovered ? tiltOffset.ry : 0);

  // Hexagon clip path for clean faceted edges
  const hexClipStyle = {
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
  };

  // Color theme styling based on depth and status
  const borderColor = isSelected
    ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
    : isHovered
    ? 'border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.45)]'
    : isPulsing
    ? 'border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.4)]'
    : depthTier === 'front'
    ? 'border-white/30 hover:border-amber-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
    : depthTier === 'mid'
    ? 'border-white/20 hover:border-amber-400/70 shadow-[0_4px_16px_rgba(0,0,0,0.8)]'
    : 'border-white/15 hover:border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.8)]';

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select skill: ${skill.name} (${skill.category})`}
      onClick={() => onSelect(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(skill);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute top-1/2 left-1/2 cursor-pointer select-none outline-none group focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{
        transform: `translate3d(calc(-50% + ${Math.round(x + floatX)}px), calc(-50% + ${Math.round(y + floatY)}px), ${Math.round(currentZ)}px) rotateY(${currentRotY}deg) rotateX(${currentRotX}deg) scale(${currentScale})`,
        opacity: isHovered ? 1 : opacity,
        zIndex: Math.round(currentZ + 500),
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
        transition: reducedMotion
          ? 'none'
          : isHovered
          ? 'transform 180ms ease-out, opacity 180ms ease'
          : 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Node Outer Hexagonal Capsule */}
      <div
        className={`relative w-32 h-36 sm:w-36 sm:h-40 flex items-center justify-center transition-all duration-300`}
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* Vector Hexagon Perimeter Outline (100% Sharp) */}
        <svg
          viewBox="0 0 100 115.47"
          className={`absolute inset-0 w-full h-full pointer-events-none transition-colors duration-300 ${
            isSelected
              ? 'stroke-amber-400 stroke-[2.8]'
              : isHovered
              ? 'stroke-amber-300 stroke-[2.4]'
              : isPulsing
              ? 'stroke-cyan-300 stroke-[2]'
              : depthTier === 'front'
              ? 'stroke-white/40 group-hover:stroke-amber-400 stroke-[1.8]'
              : 'stroke-white/20 group-hover:stroke-white/60 stroke-[1.4]'
          }`}
          fill="none"
        >
          <polygon
            points="50 0, 100 28.87, 100 86.6, 50 115.47, 0 86.6, 0 28.87"
            strokeLinejoin="round"
          />
        </svg>

        {/* Interior Faceted Glass Panel (Sharp, dark, high contrast) */}
        <div
          style={hexClipStyle}
          className={`absolute inset-1 bg-neutral-950/95 flex flex-col items-center justify-center p-2.5 transition-all duration-200 border ${borderColor}`}
        >
          {/* Subtle Top Specular Glare (Sharp linear sheen, NO Blur) */}
          <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

          {/* Hover "SELECT" Micro-Tag */}
          {isHovered && (
            <span className="absolute top-2.5 px-2 py-0.5 rounded bg-amber-400 text-black font-hud font-extrabold text-[9px] tracking-widest uppercase shadow-md">
              SELECT
            </span>
          )}

          {/* 1. Technology Logo */}
          <div
            className={`relative z-10 transition-transform duration-200 ${
              isHovered ? 'scale-110 -translate-y-0.5' : 'scale-100'
            }`}
          >
            {getSkillIcon(skill.name, skill.category, 'w-8 h-8 sm:w-9 sm:h-9')}
          </div>

          {/* 2. Technology Name (Large, crisp, high contrast) */}
          <span
            className={`relative z-10 mt-1.5 font-hud font-bold text-[13px] sm:text-[14px] tracking-wide text-center leading-tight truncate max-w-[105px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] ${
              isHovered ? 'text-amber-200' : 'text-white'
            }`}
            style={{
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility',
            }}
          >
            {skill.name}
          </span>

          {/* 3. Category (Short, uppercase) */}
          <span
            className="relative z-10 text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-amber-300 font-bold truncate max-w-[100px] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]"
            style={{
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            {skill.tag || skill.category.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
