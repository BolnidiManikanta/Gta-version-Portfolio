import React, { useMemo } from 'react';

interface SkillsCinematicEnvironmentProps {
  mouseX: number; // -1 to +1
  mouseY: number; // -1 to +1
  categoryThemeColor?: string; // e.g. '#F59E0B' | '#06B6D4' | '#A855F7' etc.
  categoryGlowColor?: string;
  reducedMotion?: boolean;
}

export const SkillsCinematicEnvironment: React.FC<SkillsCinematicEnvironmentProps> = ({
  mouseX,
  mouseY,
  categoryThemeColor = '#F59E0B',
  categoryGlowColor = 'rgba(245, 158, 11, 0.25)',
  reducedMotion = false,
}) => {
  // Pre-generate subtle ambient dust and micro-energy particles
  const ambientParticles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${(i * 4.1 + 7) % 94 + 3}%`,
      top: `${(i * 3.7 + 11) % 86 + 7}%`,
      size: `${1.2 + (i % 3) * 0.7}px`,
      color: i % 3 === 0 ? '#F59E0B' : i % 2 === 0 ? '#38BDF8' : '#EC4899',
      duration: `${14 + (i % 5) * 4}s`,
      delay: `${(i % 7) * 1.5}s`,
      depthFactor: 0.2 + (i % 4) * 0.15,
    }));
  }, []);

  // Parallax calculations by layer speed
  // Layer 1 (Sky): 0.05
  // Layer 2 (Skyline): 0.10
  // Layer 3 (Buildings): 0.15
  // Layer 4 (Architecture): 0.25
  // Layer 5 (Floor/Dais): 0.30
  // Layer 7 (Atmospheric Particles): 0.45
  const skyX = reducedMotion ? 0 : mouseX * 6;
  const skyY = reducedMotion ? 0 : mouseY * 4;

  const skylineX = reducedMotion ? 0 : mouseX * 12;
  const skylineY = reducedMotion ? 0 : mouseY * 8;

  const archX = reducedMotion ? 0 : mouseX * 18;
  const archY = reducedMotion ? 0 : mouseY * 12;

  const floorX = reducedMotion ? 0 : mouseX * 24;
  const floorY = reducedMotion ? 0 : mouseY * 15;

  const particleX = reducedMotion ? 0 : mouseX * 36;
  const particleY = reducedMotion ? 0 : mouseY * 22;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: '1600px' }}
    >
      {/* =========================================================================
          LAYER 1 & 2 & 3: HIGH-RESOLUTION PENTHOUSE & SUNSET CITY BACKDROP
          Sharp clarity, moderate darkness, crisp landmarks, subtle vignette
          ========================================================================= */}
      <div
        className="absolute inset-[-4%] w-[108%] h-[108%] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${skylineX}px, ${skylineY}px, 0) scale(1.04)`,
        }}
      >
        <img
          src="/skills-page.png"
          alt="Penthouse Sunset City Backdrop"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('skills-page.png')) {
              target.src = '/skills%20page.png';
            } else if (target.src.includes('skills%20page.png')) {
              target.src = '/homepage-background.png';
            }
          }}
          className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.78] saturate-[1.12]"
        />

        {/* Subtle Atmospheric Sky Gradient - Keeps city visible and landmarks sharp */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55" />

        {/* Cinematic Vignette Framing (darker at extreme edges, crystal clear at center) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75)_95%)]" />
      </div>

      {/* =========================================================================
          LAYER 4: DISTANT SKYLINE TWINKLING BEACONS & NEON AMBIENCE (Parallax 0.10)
          ========================================================================= */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${skyX}px, ${skyY}px, 0)`,
        }}
      >
        {/* Subtle sunset warm rim on the upper skyline */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-amber-600/12 via-amber-500/5 to-transparent" />

        {/* Distant skyscraper antenna beacons */}
        <div className="absolute top-[38%] left-[22%] w-1 h-1 rounded-full bg-red-500 shadow-[0_0_6px_#EF4444] animate-ping" />
        <div className="absolute top-[42%] right-[28%] w-1 h-1 rounded-full bg-red-400 shadow-[0_0_6px_#F87171] animate-ping" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[35%] right-[16%] w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#22D3EE] animate-pulse" />
      </div>

      {/* =========================================================================
          LAYER 5: POLISHED FLOOR REFLECTIONS & CYBERNETIC DAIS GROUND PLANE (Parallax 0.30)
          ========================================================================= */}
      <div
        className="absolute bottom-0 inset-x-0 h-[38%] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${floorX}px, ${floorY}px, 0)`,
        }}
      >
        {/* Specular Wet Floor Neon Sheen (Matches Active Category Glow) */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[180px] rounded-[100%] transition-all duration-1000 opacity-60"
          style={{
            background: `radial-gradient(ellipse at center, ${categoryGlowColor} 0%, rgba(6, 182, 212, 0.08) 45%, transparent 75%)`,
            transform: 'rotateX(75deg)',
          }}
        />

        {/* Subtle Ground Horizon Divider */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* =========================================================================
          LAYER 6: DYNAMIC CATEGORY-SPECIFIC ENVIRONMENTAL LIGHTING
          Changes smoothly when user enters a new technology sector
          ========================================================================= */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none">
        {/* Upper soft halo matched to category */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full transition-all duration-1000 opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, ${categoryThemeColor}22 0%, transparent 70%)`,
          }}
        />

        {/* Subtle left / right rim lighting */}
        <div
          className="absolute top-1/3 -left-20 w-[380px] h-[380px] rounded-full transition-all duration-1000 opacity-20"
          style={{
            background: `radial-gradient(circle, ${categoryThemeColor}33 0%, transparent 65%)`,
          }}
        />
        <div
          className="absolute top-1/4 -right-20 w-[380px] h-[380px] rounded-full transition-all duration-1000 opacity-20"
          style={{
            background: `radial-gradient(circle, #06B6D433 0%, transparent 65%)`,
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 7: ATMOSPHERIC CYBERNETIC MICRO-PARTICLES (Parallax 0.45)
          Floating crisp dust specs moving in true 3D parallax
          ========================================================================= */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${particleX}px, ${particleY}px, 0)`,
        }}
      >
        {ambientParticles.map((pt) => (
          <div
            key={pt.id}
            className="absolute rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              left: pt.left,
              top: pt.top,
              width: pt.size,
              height: pt.size,
              backgroundColor: pt.color,
              opacity: 0.4,
              boxShadow: `0 0 4px ${pt.color}`,
              animation: reducedMotion
                ? 'none'
                : `floatParticle ${pt.duration} ease-in-out infinite alternate`,
              animationDelay: pt.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};
