import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AchievementItem, CertificationItem } from '../../types';
import { AchievementPortraitCard } from './AchievementPortraitCard';
import { gtaAudio } from '../../utils/audio';
import { CameraState } from './useCinematicCamera';

export interface UnifiedExhibitionItem {
  id: string;
  type: 'trophy' | 'certification';
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  status: string;
  badgeLabel?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
  xp?: string;
  iconName?: string;
  verifiedMetric?: string;
  rawTrophy?: AchievementItem;
  rawCert?: CertificationItem;
}

interface AchievementSpatialStageProps {
  items: UnifiedExhibitionItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDetail: (item: UnifiedExhibitionItem) => void;
  onNext: () => void;
  onPrev: () => void;
  reducedMotion: boolean;
  onHoverStateChange?: (isHovering: boolean) => void;
  camera?: CameraState;
}

export const AchievementSpatialStage: React.FC<AchievementSpatialStageProps> = ({
  items,
  activeIndex,
  onSelectIndex,
  onOpenDetail,
  onNext,
  onPrev,
  reducedMotion,
  onHoverStateChange,
  camera,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [idleWave, setIdleWave] = useState(0);

  const lastScrollTime = useRef<number>(0);
  const idleTimerRef = useRef<number | null>(null);

  // Touch gesture support for mobile swiping
  const touchStartX = useRef<number | null>(null);

  const total = items.length;

  // Continuous subtle 3D breathing / floating motion (sinusoidal vertical drift)
  useEffect(() => {
    if (reducedMotion) return;

    let frameId: number;
    const startTime = performance.now();

    const animateIdle = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const wave = Math.sin(elapsed * 1.1) * 4.5; // gentle ±4.5px float
      setIdleWave(wave);
      frameId = requestAnimationFrame(animateIdle);
    };

    frameId = requestAnimationFrame(animateIdle);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  // Mouse-controlled camera parallax tilt
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !stageRef.current) return;

      const rect = stageRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

      setMouseParallax({
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      });

      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setMouseParallax({ x: 0, y: 0 });
      }, 3000);
    },
    [reducedMotion]
  );

  // Wheel scrolling across exhibits
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const now = performance.now();
      if (now - lastScrollTime.current < 280) return;

      if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
        lastScrollTime.current = now;
        if (e.deltaY > 0 || e.deltaX > 0) {
          onNext();
        } else {
          onPrev();
        }
      }
    },
    [onNext, onPrev]
  );

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => onHoverStateChange?.(true)}
      onMouseLeave={() => {
        onHoverStateChange?.(false);
        setMouseParallax({ x: 0, y: 0 });
      }}
      aria-label="Cinematic 3D Recognition Gallery Stage"
      className="relative w-full h-[530px] sm:h-[570px] md:h-[600px] flex items-center justify-center select-none overflow-visible"
      style={{ perspective: reducedMotion ? 'none' : '1800px' }}
    >
      {/* =========================================================================
          0. LOCALIZED WARM GOLD SPOTLIGHT DIRECTLY HIGHLIGHTING THE ACTIVE HERO
          Creates the dramatic volumetric illumination seen in Image 2.
      ========================================================================= */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[520px] sm:w-[720px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.26)_0%,rgba(217,119,6,0.08)_45%,transparent_75%)] pointer-events-none blur-3xl" />

      {/* Secondary cyan ambient rim light from top right */}
      <div className="absolute top-10 right-1/4 w-[380px] h-[260px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      {/* =========================================================================
          1. MULTI-TIERED CONCENTRIC TURNTABLE DAIS / CYBERNETIC PLATFORM
          Resting on the ground right beneath the central card.
          Features glowing segmented notches, concentric rings, and floor flares.
      ========================================================================= */}
      <div
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-0 flex flex-col items-center justify-center transition-transform duration-200"
        style={{
          transform: `translateX(-50%) translateY(${idleWave * 0.15 + (camera?.y || 0) * 3}px) scale(${1.0 + (camera?.flashIntensity || 0) * 0.14 + (camera?.worldBreath || 0) * 0.03})`,
        }}
      >
        {/* Outer segmented cyber ring with tick notches */}
        <div
          className="relative w-[460px] sm:w-[680px] md:w-[820px] h-[46px] sm:h-[62px] rounded-[50%] border border-amber-500/35 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.28)_0%,rgba(217,119,6,0.09)_45%,transparent_75%)]"
          style={{
            boxShadow: `0 0 ${50 + (camera?.flashIntensity || 0) * 60}px rgba(245,158,11,${0.32 + (camera?.flashIntensity || 0) * 0.35})`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Segmented notches around rim */}
          <div className="absolute inset-0 rounded-[50%] border-2 border-dashed border-amber-400/40 opacity-70" />
          {/* Cyan perimeter rim glow */}
          <div className="absolute inset-1 rounded-[50%] border border-cyan-400/30" />
        </div>

        {/* Inner bright gold turntable core */}
        <div
          className="absolute w-[260px] sm:w-[400px] md:w-[490px] h-[26px] sm:h-[34px] rounded-[50%] border border-amber-400/70 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.32)_0%,rgba(245,158,11,0.12)_40%,transparent_70%)]"
          style={{
            boxShadow: `0 0 ${25 + (camera?.flashIntensity || 0) * 45}px rgba(251,191,36,${0.45 + (camera?.flashIntensity || 0) * 0.45})`,
            transition: 'box-shadow 0.25s ease',
          }}
        />

        {/* Radiant golden ground reflection flare */}
        <div
          className="absolute -bottom-6 w-[560px] sm:w-[850px] h-[55px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22)_0%,transparent_70%)] blur-xl"
          style={{
            opacity: 0.7 + (camera?.flashIntensity || 0) * 0.6,
            transition: 'opacity 0.25s ease',
          }}
        />
      </div>

      {/* =========================================================================
          2. 3D SPATIAL RECOGNITION EXHIBITION CARDS (CURVED PARABOLIC ARC)
          Cards span depth: Hero (center front), Near Left/Right, Far Left/Right.
      ========================================================================= */}
      <div
        className="relative w-full max-w-7xl h-full flex items-center justify-center transition-transform duration-300 pointer-events-none"
        style={{
          transformStyle: reducedMotion ? 'flat' : 'preserve-3d',
          transform: reducedMotion
            ? 'none'
            : `translate3d(${(camera?.x || 0) * 6}px, ${(camera?.y || 0) * 4}px, 0) rotateX(${((camera?.rotX || 0) * 2.2) + (mouseParallax.y * -1.5)}deg) rotateY(${((camera?.rotY || 0) * 2.5) + (mouseParallax.x * 2.5)}deg) rotateZ(${(camera?.rotZ || 0) * 0.4}deg)`,
        }}
      >
        {items.map((item, idx) => {
          // Wrapped offset for seamless loop (1 ↔ N)
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          // Render visible exhibits within distance ±3 for generous depth
          if (Math.abs(offset) > 3) return null;

          const isHero = offset === 0;
          const isHovered = hoveredIndex === idx;
          const absOff = Math.abs(offset);
          const sign = Math.sign(offset);

          const camX = camera?.x || 0;
          const camY = camera?.y || 0;
          const camZ = camera?.z || 0;
          const camRotY = camera?.rotY || 0;

          let x = 0;
          let y = 0;
          let z = 0;
          let rotY = 0;
          let scale = 1;
          let opacity = 1;
          let blurAmount = 0;
          let zIndex = 10;

          if (isHero) {
            // FEATURED HERO EXHIBIT:
            // Centered, elevated, forward-facing, razor sharp (0 blur)
            x = mouseParallax.x * 8 + camX * 10;
            y = mouseParallax.y * 5 + idleWave + camY * 8;
            z = 110 + camZ;
            rotY = mouseParallax.x * 3.0 + camRotY * 3.5;
            scale = 1;
            opacity = 1;
            blurAmount = 0;
            zIndex = 50;
          } else {
            // SURROUNDING 3D ARC CARDS:
            // Curved parabolic trajectory receding gracefully into the depth
            const isWide = typeof window !== 'undefined' && window.innerWidth >= 1280;
            const baseSpread = isWide ? 295 : 265;

            if (absOff === 1) {
              // NEAR LEFT / RIGHT EXHIBIT
              x = sign * baseSpread + mouseParallax.x * 5 + camX * 6;
              y = 28 + mouseParallax.y * 2.5 + idleWave * 0.4 + camY * 4;
              z = -75 + (isHovered ? 35 : 0) + camZ * 0.7;
              rotY = -sign * 18 + mouseParallax.x * 1.5 + camRotY * 2.0;
              scale = isHovered ? 0.86 : 0.82;
              opacity = isHovered ? 1.0 : 0.85;
              blurAmount = isHovered ? 0 : 0.35;
              zIndex = 35;
            } else if (absOff === 2) {
              // FAR LEFT / RIGHT EXHIBIT
              x = sign * (baseSpread * 1.88) + mouseParallax.x * 3 + camX * 4;
              y = 54 + mouseParallax.y * 1.5 + idleWave * 0.2 + camY * 2;
              z = -220 + (isHovered ? 40 : 0) + camZ * 0.5;
              rotY = -sign * 28 + mouseParallax.x * 1.0 + camRotY * 1.2;
              scale = isHovered ? 0.72 : 0.66;
              opacity = isHovered ? 0.88 : 0.55;
              blurAmount = isHovered ? 0 : 1.1;
              zIndex = 20;
            } else if (absOff === 3) {
              // OUTER EDGE EXHIBIT (Wide screens only)
              x = sign * (baseSpread * 2.65) + camX * 2;
              y = 78 + idleWave * 0.1;
              z = -380 + camZ * 0.3;
              rotY = -sign * 36 + camRotY * 0.8;
              scale = 0.50;
              opacity = 0.28;
              blurAmount = 2.2;
              zIndex = 10;
            }
          }

          // Responsive adjustment on mobile screens
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
          if (isMobile && !isHero) {
            x = sign * 175;
            scale *= 0.75;
            opacity *= 0.32;
          }

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'absolute',
                zIndex,
                transform: reducedMotion
                  ? isHero
                    ? 'none'
                    : `translateX(${sign * 270}px) scale(0.78)`
                  : `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: reducedMotion ? (isHero ? 1 : 0.45) : opacity,
                filter: reducedMotion ? 'none' : blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
                transition: isHovered
                  ? 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.18s ease, filter 0.18s ease'
                  : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease, filter 0.65s ease',
              }}
              className="pointer-events-auto"
            >
              <AchievementPortraitCard
                item={item}
                index={idx}
                total={total}
                isHero={isHero}
                isHovered={isHovered}
                onOpenDetail={onOpenDetail}
                onSelectHero={() => {
                  if (!isHero) {
                    gtaAudio.playSelect();
                    onSelectIndex(idx);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

