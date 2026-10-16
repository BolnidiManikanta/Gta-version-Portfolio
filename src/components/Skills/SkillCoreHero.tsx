import React, { useState, useEffect } from 'react';
import { ArrowDown, Cpu, Sparkles } from 'lucide-react';

interface SkillCoreHeroProps {
  selectedCategoryName?: string;
  totalSkillsCount?: number;
  mousePos: { x: number; y: number };
  reducedMotion?: boolean;
  coreRef?: React.RefObject<HTMLDivElement | null>;
}

const PIPELINE_STAGES = [
  { id: 'ideas', label: 'IDEAS', color: 'text-cyan-400' },
  { id: 'code', label: 'CODE', color: 'text-sky-300' },
  { id: 'secure', label: 'SECURE', color: 'text-emerald-400' },
  { id: 'build', label: 'BUILD', color: 'text-amber-400' },
  { id: 'deploy', label: 'DEPLOY', color: 'text-indigo-300' },
  { id: 'impact', label: 'IMPACT', color: 'text-cyan-200' },
];

export const SkillCoreHero: React.FC<SkillCoreHeroProps> = ({
  selectedCategoryName = 'ALL SECTORS',
  totalSkillsCount = 49,
  mousePos,
  reducedMotion = false,
  coreRef,
}) => {
  // Active pulsing pipeline step
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // 3D Parallax tilt calculation
  const tiltX = reducedMotion ? 0 : mousePos.y * -8;
  const tiltY = reducedMotion ? 0 : mousePos.x * 10;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-[380px] sm:max-w-[420px] select-none"
      style={{
        perspective: '1000px',
      }}
    >
      {/* 3D ROTATABLE CONTAINER */}
      <div
        className="relative flex flex-col items-center justify-center w-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* =========================================================================
            OUTER ORBITAL SYSTEM (Concentric Holographic Rings)
            ========================================================================= */}
        <div className="absolute -inset-10 flex items-center justify-center pointer-events-none">
          {/* Ring 1: Primary Counter-Clockwise Outer Ring */}
          <div
            className={`absolute w-[360px] h-[360px] sm:w-[410px] sm:h-[410px] rounded-full border border-cyan-500/25 border-dashed ${
              reducedMotion ? '' : 'animate-[spin_40s_linear_infinite_reverse]'
            }`}
          >
            {/* Satellite Nodes */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
          </div>

          {/* Ring 2: Tilted Gyroscopic Orbit Ring (Cyan glow) */}
          <div
            className={`absolute w-[320px] h-[320px] sm:w-[370px] sm:h-[370px] rounded-full border border-sky-400/30 ${
              reducedMotion ? '' : 'animate-[spin_32s_linear_infinite]'
            }`}
            style={{
              transform: 'rotateX(68deg) rotateY(20deg)',
            }}
          >
            <div className="absolute top-0 right-10 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38BDF8]" />
            <div className="absolute bottom-4 left-8 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
          </div>

          {/* Ring 3: Orthogonal Tilted Gyroscopic Ring */}
          <div
            className={`absolute w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] rounded-full border border-cyan-400/20 border-dotted ${
              reducedMotion ? '' : 'animate-[spin_25s_linear_infinite_reverse]'
            }`}
            style={{
              transform: 'rotateX(-60deg) rotateY(35deg)',
            }}
          >
            <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#FBBF24]" />
          </div>

          {/* Volumetric Core Glow Behind Sphere */}
          <div className="absolute w-[240px] h-[240px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-sky-500/15 to-transparent blur-2xl pointer-events-none" />
        </div>

        {/* =========================================================================
            TRANSPARENT HOLOGRAPHIC DIGITAL SPHERE CONTAINER
            ========================================================================= */}
        <div
          ref={coreRef}
          className="relative z-10 w-[260px] sm:w-[290px] min-h-[360px] sm:min-h-[390px] rounded-3xl backdrop-blur-md bg-[#040a18]/65 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.22),inset_0_0_20px_rgba(6,182,212,0.08)] p-5 flex flex-col items-center justify-between overflow-hidden"
        >
          {/* Subtle Ambient Scanline moving downward */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/8 to-transparent opacity-60 pointer-events-none animate-[scanline_4s_linear_infinite]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Top Status Header inside Core */}
          <div className="w-full flex items-center justify-between border-b border-cyan-500/20 pb-2.5 z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22D3EE]" />
              <span className="font-mono text-[10px] tracking-widest text-cyan-300 font-semibold uppercase">
                CORE MATRIX
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-400/70">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>49 ACTIVE</span>
            </div>
          </div>

          {/* Center Pipeline Display: IDEAS → CODE → SECURE → BUILD → DEPLOY → IMPACT */}
          <div className="w-full flex flex-col items-center justify-center py-2.5 z-10 my-auto">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <React.Fragment key={stage.id}>
                  {/* Step Item */}
                  <div
                    className={`relative w-full max-w-[190px] py-1 px-3 rounded-md transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/20 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.35)] scale-105'
                        : 'bg-black/30 border border-cyan-500/10 hover:border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive
                            ? 'bg-cyan-300 shadow-[0_0_6px_#00F0FF]'
                            : 'bg-slate-600'
                        }`}
                      />
                      <span
                        className={`font-mono text-xs sm:text-[13px] font-bold tracking-widest transition-colors ${
                          isActive
                            ? 'text-cyan-200 drop-shadow-[0_0_6px_#00F0FF]'
                            : 'text-slate-400'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="flex items-center text-[9px] font-mono font-bold text-amber-400 tracking-wider">
                        <Sparkles className="w-2.5 h-2.5 mr-0.5 animate-spin" />
                        SYNC
                      </span>
                    )}
                  </div>

                  {/* Down Arrow between steps */}
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="flex items-center justify-center my-0.5">
                      <ArrowDown
                        className={`w-3 h-3 transition-colors duration-300 ${
                          isActive
                            ? 'text-cyan-400 animate-bounce'
                            : 'text-cyan-500/30'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom Core Telemetry Bar */}
          <div className="w-full pt-2.5 border-t border-cyan-500/20 flex items-center justify-between z-10">
            <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase truncate max-w-[140px]">
              {selectedCategoryName}
            </span>
            <span className="font-mono text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
              {totalSkillsCount} VERIFIED
            </span>
          </div>

          {/* Holographic Corner Tech Accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-400/80 pointer-events-none" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-cyan-400/80 pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-cyan-400/80 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-400/80 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
