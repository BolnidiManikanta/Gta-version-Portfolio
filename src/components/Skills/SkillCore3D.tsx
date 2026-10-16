import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { VerifiedSkill } from '../../data/skillsCatalog';
import { SkillWorkstation3D } from './SkillWorkstation3D';
import { SkillFourDirectionHUD } from './SkillFourDirectionHUD';

interface SkillCore3DProps {
  selectedSkill: VerifiedSkill;
  activeCategoryId: string;
  categorySkills: VerifiedSkill[];
  onSelectSkill: (skill: VerifiedSkill) => void;
  onSelectCategory?: (categoryId: string) => void;
  reducedMotion?: boolean;
}

export const SkillCore3D: React.FC<SkillCore3DProps> = ({
  selectedSkill,
  activeCategoryId,
  onSelectSkill,
  onSelectCategory,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Camera & Mouse Parallax State
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [cameraZoom, setCameraZoom] = useState(0); // -120 to +120px
  const [idleTime, setIdleTime] = useState(0);

  // Periodic subtle breathing pulse for reactor energy
  const [pulseActive, setPulseActive] = useState(false);

  // Idle Animation Loop for Organic Rotation & Glow
  useEffect(() => {
    if (reducedMotion) return;
    let animId: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      setIdleTime((now - startTime) / 1000);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  // Periodic energy pulse (every 8 seconds)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setPulseActive(true);
      const timer = setTimeout(() => setPulseActive(false), 1500);
      return () => clearTimeout(timer);
    }, 8000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Mouse Movement Parallax
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = ((e.clientX - cx) / (rect.width / 2)) * -10;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * -6;

      setMouseOffset({ x: dx, y: dy });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  // Scroll Wheel Z-Dolly Camera
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      setCameraZoom((prev) => {
        const next = prev - e.deltaY * 0.2;
        return Math.max(-100, Math.min(100, next));
      });
    },
    [reducedMotion]
  );

  // Category Configuration (Theme colors & Specific Environmental Visuals)
  const categoryConfig = useMemo(() => {
    switch (activeCategoryId) {
      case 'cybersecurity':
        return {
          title: 'CYBER DEFENSE CORE',
          color: '#F43F5E',
          glow: 'rgba(244, 63, 94, 0.5)',
          beamColor: 'rgba(244, 63, 94, 0.8)',
          activeQuadrant: 'left',
        };
      case 'ai-ml':
        return {
          title: 'NEURAL TENSOR CORE',
          color: '#A855F7',
          glow: 'rgba(168, 85, 247, 0.5)',
          beamColor: 'rgba(168, 85, 247, 0.8)',
          activeQuadrant: 'top',
        };
      case 'fullstack':
        return {
          title: 'APPLICATION ENGINE CORE',
          color: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.5)',
          beamColor: 'rgba(6, 182, 212, 0.8)',
          activeQuadrant: 'right',
        };
      case 'programming':
        return {
          title: 'SYSTEMS COMPILER CORE',
          color: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.5)',
          beamColor: 'rgba(245, 158, 11, 0.8)',
          activeQuadrant: 'bottom',
        };
      default:
        return {
          title: 'TECHNOLOGY VAULT REACTOR',
          color: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.35)',
          beamColor: 'rgba(245, 158, 11, 0.6)',
          activeQuadrant: 'all',
        };
    }
  }, [activeCategoryId]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      className="relative w-full h-[680px] sm:h-[720px] xl:h-[760px] flex items-center justify-center select-none overflow-visible"
      style={{
        perspective: '1500px',
      }}
    >
      {/* 3D World Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${Math.round(mouseOffset.x)}px, ${Math.round(
            mouseOffset.y
          )}px, ${Math.round(cameraZoom)}px) rotateY(${mouseOffset.x * 0.3}deg) rotateX(${
            -mouseOffset.y * 0.3
          }deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* =====================================================================
            1. LARGE CENTRAL TECHNOLOGICAL REACTOR CORE BEHIND DEVELOPER
            Monumental circular mechanical and holographic structure.
            Frames the body, creates depth, rotates slowly, emits cyan/blue + amber light.
            Physically installed in the command room background.
            ===================================================================== */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            transform: 'translate3d(-50%, -50%, -120px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer Heavy Mechanical Armature Ring with Segmented Teeth */}
          <div
            className="w-[560px] h-[560px] sm:w-[640px] sm:h-[640px] rounded-full border-2 border-dashed transition-colors duration-1000 animate-[spin_100s_linear_infinite]"
            style={{
              borderColor: `${categoryConfig.color}44`,
              boxShadow: `0 0 70px ${categoryConfig.glow}`,
            }}
          >
            {/* Segmented Armor Plates at Octagonal Angles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                style={{ transform: `rotate(${i * 45}deg)` }}
              >
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 rounded-xs border transition-colors duration-700"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderColor: `${categoryConfig.color}88`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Middle Counter-Rotating Holographic Optical Ring */}
          <div
            className="absolute inset-8 sm:inset-10 rounded-full border border-white/25 transition-all duration-700 animate-[spin_60s_linear_infinite_reverse]"
            style={{
              borderColor: `${categoryConfig.color}77`,
            }}
          >
            {/* Cardinal Holographic Laser Marks */}
            <span
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full animate-ping"
              style={{ backgroundColor: categoryConfig.color }}
            />
            <span
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full animate-ping"
              style={{ backgroundColor: categoryConfig.color, animationDelay: '1s' }}
            />
            <span
              className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full animate-ping"
              style={{ backgroundColor: categoryConfig.color, animationDelay: '0.5s' }}
            />
            <span
              className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full animate-ping"
              style={{ backgroundColor: categoryConfig.color, animationDelay: '1.5s' }}
            />
          </div>

          {/* Inner Glowing Reactor Aperture & Volumetric Energy Chamber */}
          <div
            className="absolute inset-20 sm:inset-24 rounded-full transition-all duration-700 flex items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(circle, ${categoryConfig.color}40 0%, ${categoryConfig.color}15 45%, rgba(0,0,0,0.85) 75%)`,
            }}
          >
            {/* Concentric Precision Laser Grid */}
            <div
              className="w-56 h-56 rounded-full border-2 border-dotted opacity-50 animate-[spin_30s_linear_infinite]"
              style={{ borderColor: categoryConfig.color }}
            />

            {/* Pulsing Core Energy Focal Point */}
            <div
              className={`w-28 h-28 rounded-full transition-all duration-700 filter blur-md ${
                pulseActive ? 'scale-125 opacity-90' : 'scale-100 opacity-60'
              }`}
              style={{
                backgroundColor: categoryConfig.color,
                boxShadow: `0 0 50px ${categoryConfig.color}`,
              }}
            />
          </div>

          {/* 4 Cardinal Glowing Laser Conduits Linking Core to Surrounding Systems */}
          {/* Top Conduit to AI/ML Module */}
          <div
            className={`absolute -top-24 left-1/2 -translate-x-1/2 w-0.5 h-28 transition-all duration-700 ${
              categoryConfig.activeQuadrant === 'top' || categoryConfig.activeQuadrant === 'all'
                ? 'opacity-90 shadow-[0_0_12px_#A855F7]'
                : 'opacity-25'
            }`}
            style={{
              background: 'linear-gradient(to top, rgba(168,85,247,0.9), transparent)',
            }}
          />

          {/* Left Conduit to Cybersecurity Module */}
          <div
            className={`absolute top-1/2 -left-24 -translate-y-1/2 h-0.5 w-28 transition-all duration-700 ${
              categoryConfig.activeQuadrant === 'left' || categoryConfig.activeQuadrant === 'all'
                ? 'opacity-90 shadow-[0_0_12px_#F43F5E]'
                : 'opacity-25'
            }`}
            style={{
              background: 'linear-gradient(to left, rgba(244,63,94,0.9), transparent)',
            }}
          />

          {/* Right Conduit to Full-Stack Module */}
          <div
            className={`absolute top-1/2 -right-24 -translate-y-1/2 h-0.5 w-28 transition-all duration-700 ${
              categoryConfig.activeQuadrant === 'right' || categoryConfig.activeQuadrant === 'all'
                ? 'opacity-90 shadow-[0_0_12px_#06B6D4]'
                : 'opacity-25'
            }`}
            style={{
              background: 'linear-gradient(to right, rgba(6,182,212,0.9), transparent)',
            }}
          />

          {/* Bottom Conduit to Programming Console */}
          <div
            className={`absolute -bottom-24 left-1/2 -translate-x-1/2 w-0.5 h-28 transition-all duration-700 ${
              categoryConfig.activeQuadrant === 'bottom' || categoryConfig.activeQuadrant === 'all'
                ? 'opacity-90 shadow-[0_0_12px_#F59E0B]'
                : 'opacity-25'
            }`}
            style={{
              background: 'linear-gradient(to bottom, rgba(245,158,11,0.9), transparent)',
            }}
          />
        </div>

        {/* =====================================================================
            2. CENTRAL SEATED DEVELOPER & REAL PHYSICAL COMPUTER WORKSTATION
            Framed naturally by the circular reactor behind.
            Developer seated in three-quarter pose, thoughtful chin-hand gesture,
            authentic face, dark techwear hoodie, physical widescreen monitor, desk.
            ===================================================================== */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{
            transform: 'translate3d(0, 0, 0px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <SkillWorkstation3D
            selectedSkill={selectedSkill}
            activeCategoryId={activeCategoryId}
            themeColor={categoryConfig.color}
            glowColor={categoryConfig.glow}
            idleTime={idleTime}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* =====================================================================
            3. FOUR INTEGRATED HOLOGRAPHIC SKILL SYSTEMS SURROUNDING DEVELOPER
            TOP: AI / ML System (curved canopy above head)
            LEFT: CYBERSECURITY System (defense shield on left)
            RIGHT: FULL-STACK System (application engine on right)
            BOTTOM: PROGRAMMING System (curved console framing workstation base)
            NO floating windows! All skills embedded as hexagonal technology nodes.
            ===================================================================== */}
        <SkillFourDirectionHUD
          selectedSkill={selectedSkill}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(catId) => {
            if (onSelectCategory) onSelectCategory(catId);
          }}
          onSelectSkill={onSelectSkill}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
};
