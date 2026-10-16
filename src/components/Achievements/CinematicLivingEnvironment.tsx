import React, { useMemo } from 'react';
import { CameraState } from './useCinematicCamera';

interface CinematicLivingEnvironmentProps {
  camera: CameraState;
  reducedMotion?: boolean;
}

export const CinematicLivingEnvironment: React.FC<CinematicLivingEnvironmentProps> = ({
  camera,
  reducedMotion = false,
}) => {
  // Pre-generate randomized building window data to avoid re-calculating on re-renders
  const windowClusters = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: `${(i * 2.1) % 96 + 2}%`,
      top: `${15 + (i * 7) % 65}%`,
      width: `${1.5 + (i % 3) * 0.8}px`,
      height: `${2.0 + ((i * 3) % 4) * 0.9}px`,
      color: i % 5 === 0 ? '#38bdf8' : i % 4 === 0 ? '#f472b6' : '#fef08a',
      opacity: 0.35 + (i % 5) * 0.12,
      duration: `${3.5 + (i % 7) * 1.2}s`,
      delay: `${(i % 11) * 0.7}s`,
    }));
  }, []);

  // Pre-generate distant moving vehicles (headlights & taillights)
  const vehicleLanes = useMemo(() => {
    return [
      // Westbound (warm white/gold headlights)
      { id: 'w1', dir: 'left', speed: '14s', delay: '0s', y: '68.5%', size: '3px', color: '#fef08a', blur: '1px' },
      { id: 'w2', dir: 'left', speed: '18s', delay: '4s', y: '68.8%', size: '2.5px', color: '#fde047', blur: '1px' },
      { id: 'w3', dir: 'left', speed: '16s', delay: '9s', y: '68.3%', size: '3.5px', color: '#fffbeb', blur: '1.5px' },
      { id: 'w4', dir: 'left', speed: '21s', delay: '13s', y: '68.7%', size: '2px', color: '#fef08a', blur: '1px' },
      // Eastbound (ruby red taillights)
      { id: 'e1', dir: 'right', speed: '15s', delay: '2s', y: '69.4%', size: '3px', color: '#ef4444', blur: '1px' },
      { id: 'e2', dir: 'right', speed: '19s', delay: '7s', y: '69.1%', size: '2.5px', color: '#f87171', blur: '1.2px' },
      { id: 'e3', dir: 'right', speed: '13s', delay: '11s', y: '69.6%', size: '3px', color: '#dc2626', blur: '1.5px' },
      { id: 'e4', dir: 'right', speed: '22s', delay: '15s', y: '69.2%', size: '2px', color: '#ef4444', blur: '0.8px' },
    ];
  }, []);

  // Pre-generate ambient dust/ember particles
  const particles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: `${(i * 3.1) % 98 + 1}%`,
      top: `${(i * 3.7) % 90 + 5}%`,
      size: `${1.2 + (i % 3) * 0.8}px`,
      color: i % 3 === 0 ? 'rgba(251, 191, 36, 0.65)' : i % 2 === 0 ? 'rgba(6, 182, 212, 0.55)' : 'rgba(244, 114, 182, 0.45)',
      speed: `${12 + (i % 6) * 3}s`,
      delay: `${(i % 8) * 1.5}s`,
      depthFactor: 0.8 + (i % 4) * 0.35, // parallax depth weight
    }));
  }, []);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#080d1a] via-[#1a0f26] to-[#0a0512]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18)_0%,transparent_70%)]" />
      </div>
    );
  }

  // Camera parallax offsets by layer multiplier
  const { x, y, rotX, rotY, rotZ, worldBreath, flashIntensity } = camera;

  // Multipliers:
  // Sky: 1.0x
  // Distant Skyline: 1.5x
  // Buildings: 2.0x
  // Palms: 3.0x
  // Street Lights: 3.5x
  // Vehicles: 4.0x
  // Atmospheric Haze: 4.5x
  // Wet Road: 3.5x
  // Foreground: 5.0x

  const skyTransform = `translate3d(${x * 6}px, ${y * 3}px, 0) rotateZ(${rotZ * 0.2}deg)`;
  const distantSkylineTransform = `translate3d(${x * 12}px, ${y * 7}px, 0) rotateY(${rotY * 0.3}deg)`;
  const buildingsTransform = `translate3d(${x * 18}px, ${y * 11}px, 0) rotateY(${rotY * 0.5}deg)`;
  const palmsTransform = `translate3d(${x * 26}px, ${y * 16}px, 0) rotateY(${rotY * 0.75}deg)`;
  const streetLightsTransform = `translate3d(${x * 30}px, ${y * 19}px, 0)`;
  const vehiclesTransform = `translate3d(${x * 34}px, ${y * 22}px, 0)`;
  const hazeTransform = `translate3d(${x * 38}px, ${y * 24}px, 0)`;
  const wetRoadTransform = `translate3d(${x * 30}px, ${y * 18}px, 0) rotateX(${rotX * 0.8}deg)`;
  const foregroundTransform = `translate3d(${x * 46}px, ${y * 28}px, 0) rotateZ(${rotZ * 0.6}deg)`;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* =========================================================================
          LAYER 1 — SKY (1.0x Parallax)
          Deep Vice City Sunset Gradient + Twilight Stars + Drifting Clouds
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: skyTransform }}
      >
        {/* Sky Base Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#050713] via-[#1b0826] via-45% to-[#7c2d12]"
          style={{
            filter: `brightness(${0.96 + worldBreath * 0.08 + flashIntensity * 0.08})`,
            transition: 'filter 0.8s ease',
          }}
        />

        {/* Golden Sunset Horizon Glow */}
        <div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[130%] h-[380px] bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.45)_0%,rgba(217,119,6,0.22)_40%,transparent_75%)] blur-3xl opacity-80"
          style={{
            transform: `scale(${1.0 + worldBreath * 0.05 + flashIntensity * 0.15})`,
            transition: 'transform 1.2s ease, opacity 1s ease',
          }}
        />

        {/* Shimmering Evening Stars */}
        <div className="absolute inset-x-0 top-0 h-1/2 opacity-75">
          <div className="absolute top-[8%] left-[15%] w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-[14%] left-[32%] w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" style={{ animationDuration: '5.5s' }} />
          <div className="absolute top-[6%] left-[48%] w-1 h-1 rounded-full bg-cyan-200 animate-pulse" style={{ animationDuration: '3.8s' }} />
          <div className="absolute top-[18%] left-[64%] w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-[11%] left-[82%] w-1 h-1 rounded-full bg-amber-100 animate-pulse" style={{ animationDuration: '4.7s' }} />
          <div className="absolute top-[22%] left-[91%] w-1 h-1 rounded-full bg-purple-200 animate-pulse" style={{ animationDuration: '5.2s' }} />
        </div>

        {/* Slow Drifting Cloud Bands */}
        <div
          className="absolute bottom-[32%] -left-20 w-[140%] h-32 opacity-25 blur-2xl bg-gradient-to-r from-purple-900/60 via-amber-800/50 to-pink-900/40"
          style={{
            animation: 'driftCloud 90s linear infinite alternate',
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 2 — DISTANT CITY SKYLINE (1.5x Parallax)
          Silhouetted Skyscraper Spires + Radio Beacons
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: distantSkylineTransform }}
      >
        <svg
          viewBox="0 0 1600 450"
          preserveAspectRatio="none"
          className="absolute bottom-[28%] inset-x-0 w-full h-[220px] sm:h-[260px] opacity-60"
        >
          <defs>
            <linearGradient id="distantSkylineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e0a2b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0c0412" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          {/* Distant building silhouette profile */}
          <path
            d="M0,450 L0,320 L40,320 L40,290 L65,290 L65,250 L75,180 L80,250 L95,250 L95,330 L160,330 L160,260 L205,260 L205,340 L270,340 L270,220 L310,220 L310,345 L380,345 L380,270 L425,270 L425,350 L520,350 L520,240 L535,160 L545,240 L580,240 L580,330 L660,330 L660,200 L710,200 L710,340 L810,340 L810,230 L855,230 L855,345 L950,345 L950,190 L965,130 L975,190 L1010,190 L1010,330 L1110,330 L1110,250 L1165,250 L1165,340 L1260,340 L1260,210 L1310,210 L1310,345 L1400,345 L1400,280 L1455,280 L1455,335 L1600,335 L1600,450 Z"
            fill="url(#distantSkylineGrad)"
          />
        </svg>

        {/* Radio Tower Beacon Lights (Asynchronous blinking LED pips) */}
        <div className="absolute bottom-[44%] left-[5%] w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-ping" style={{ animationDuration: '2.1s' }} />
        <div className="absolute bottom-[46%] left-[33%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" style={{ animationDuration: '3.4s' }} />
        <div className="absolute bottom-[49%] left-[60%] w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-ping" style={{ animationDuration: '2.7s' }} />
        <div className="absolute bottom-[45%] left-[84%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-ping" style={{ animationDuration: '4.1s' }} />
      </div>

      {/* =========================================================================
          LAYER 3 — MIDGROUND BUILDINGS & WINDOW MATRIX (2.0x Parallax)
          Neon-edged skyscrapers with randomized soft pulse windows
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: buildingsTransform }}
      >
        <svg
          viewBox="0 0 1600 450"
          preserveAspectRatio="none"
          className="absolute bottom-[22%] inset-x-0 w-full h-[270px] sm:h-[320px] opacity-85"
        >
          <defs>
            <linearGradient id="midSkylineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#140620" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#08020d" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,450 L0,270 L70,270 L70,220 L130,220 L130,310 L220,310 L220,180 L290,180 L290,320 L390,320 L390,240 L455,240 L455,330 L570,330 L570,160 L640,160 L640,310 L750,310 L750,210 L825,210 L825,325 L930,325 L930,170 L1010,170 L1010,315 L1130,315 L1130,230 L1205,230 L1205,330 L1320,330 L1320,195 L1395,195 L1395,320 L1510,320 L1510,255 L1600,255 L1600,450 Z"
            fill="url(#midSkylineGrad)"
          />
          {/* Neon Roofline Trims */}
          <path d="M70,220 L130,220" stroke="#f472b6" strokeWidth="1.8" opacity="0.8" />
          <path d="M220,180 L290,180" stroke="#38bdf8" strokeWidth="1.8" opacity="0.8" />
          <path d="M570,160 L640,160" stroke="#fbbf24" strokeWidth="2" opacity="0.85" />
          <path d="M930,170 L1010,170" stroke="#f472b6" strokeWidth="1.8" opacity="0.8" />
          <path d="M1320,195 L1395,195" stroke="#38bdf8" strokeWidth="1.8" opacity="0.75" />
        </svg>

        {/* Randomized City Window Grid Matrix */}
        <div className="absolute bottom-[24%] inset-x-0 h-[190px] overflow-hidden pointer-events-none">
          {windowClusters.map((win) => (
            <div
              key={win.id}
              className="absolute rounded-[0.5px]"
              style={{
                left: win.left,
                top: win.top,
                width: win.width,
                height: win.height,
                backgroundColor: win.color,
                opacity: win.opacity,
                boxShadow: `0 0 4px ${win.color}`,
                animation: `pulseWindow ${win.duration} ease-in-out infinite alternate ${win.delay}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          LAYER 4 — PALM TREES (3.0x Parallax)
          Vice City Palm Silhouettes with organic wind sway
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: palmsTransform }}
      >
        {/* Left Flank Palm Tree 1 */}
        <div
          className="absolute bottom-[22%] left-[-2%] sm:left-[2%] w-[180px] sm:w-[260px] h-[340px] sm:h-[460px] origin-bottom"
          style={{ animation: 'palmSwayLeft 7.2s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 200 350" fill="#07020a" className="w-full h-full opacity-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {/* Curved trunk */}
            <path d="M95,350 Q105,200 135,70 Q130,200 85,350 Z" />
            {/* Fronds */}
            <path d="M135,70 Q90,30 20,40 Q80,60 135,70 Z" />
            <path d="M135,70 Q110,10 60,10 Q110,40 135,70 Z" />
            <path d="M135,70 Q150,0 190,20 Q150,45 135,70 Z" />
            <path d="M135,70 Q180,40 210,90 Q160,80 135,70 Z" />
            <path d="M135,70 Q130,90 150,140 Q135,100 135,70 Z" />
            <path d="M135,70 Q80,85 50,120 Q95,95 135,70 Z" />
          </svg>
        </div>

        {/* Right Flank Palm Tree 2 */}
        <div
          className="absolute bottom-[20%] right-[-3%] sm:right-[1%] w-[200px] sm:w-[290px] h-[360px] sm:h-[490px] origin-bottom"
          style={{ animation: 'palmSwayRight 8.6s ease-in-out infinite 0.8s' }}
        >
          <svg viewBox="0 0 200 350" fill="#07020a" className="w-full h-full opacity-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {/* Trunk leaning inward */}
            <path d="M115,350 Q100,190 70,60 Q80,190 125,350 Z" />
            {/* Fronds */}
            <path d="M70,60 Q20,30 0,60 Q40,70 70,60 Z" />
            <path d="M70,60 Q40,10 80,5 Q70,40 70,60 Z" />
            <path d="M70,60 Q100,15 150,25 Q110,50 70,60 Z" />
            <path d="M70,60 Q130,50 170,100 Q115,85 70,60 Z" />
            <path d="M70,60 Q90,95 110,145 Q85,100 70,60 Z" />
            <path d="M70,60 Q30,90 10,130 Q45,95 70,60 Z" />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          LAYER 5 — STREET LIGHTS & SIGNS (3.5x Parallax)
          Glowing amber lamp posts and neon halos
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: streetLightsTransform }}
      >
        {/* Coastal Highway Street Lamps */}
        <div className="absolute bottom-[28%] left-[18%] w-8 h-8 rounded-full bg-amber-400/20 blur-md" />
        <div className="absolute bottom-[28.5%] left-[38%] w-9 h-9 rounded-full bg-amber-400/25 blur-md" />
        <div className="absolute bottom-[28.2%] left-[62%] w-9 h-9 rounded-full bg-amber-400/25 blur-md" />
        <div className="absolute bottom-[28%] left-[82%] w-8 h-8 rounded-full bg-amber-400/20 blur-md" />

        {/* Ambient Neon Halos */}
        <div className="absolute bottom-[30%] left-[25%] w-24 h-12 bg-pink-500/10 blur-xl rounded-full" />
        <div className="absolute bottom-[29%] right-[22%] w-28 h-14 bg-cyan-500/10 blur-xl rounded-full" />
      </div>

      {/* =========================================================================
          LAYER 6 — VEHICLES / CITY TRAFFIC (4.0x Parallax)
          Tiny distant headlights and taillights cruising horizontally
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: vehiclesTransform }}
      >
        <div className="absolute bottom-[27.5%] inset-x-0 h-8 overflow-hidden">
          {vehicleLanes.map((car) => (
            <div
              key={car.id}
              className="absolute rounded-full"
              style={{
                top: car.y,
                width: car.size,
                height: car.size,
                backgroundColor: car.color,
                boxShadow: `0 0 6px ${car.color}, 0 0 12px ${car.color}`,
                filter: `blur(${car.blur})`,
                animation: `${car.dir === 'left' ? 'trafficWest' : 'trafficEast'} ${car.speed} linear infinite ${car.delay}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          LAYER 7 — ATMOSPHERIC HAZE & VOLUMETRIC LIGHT (4.5x Parallax)
          Slow rolling mist + sunset light rays responding to world breath
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: hazeTransform }}
      >
        {/* Volumetric Fog Sheet 1 */}
        <div
          className="absolute bottom-[24%] inset-x-0 h-40 bg-gradient-to-t from-transparent via-amber-600/10 to-transparent blur-2xl pointer-events-none"
          style={{
            opacity: 0.6 + worldBreath * 0.35 + flashIntensity * 0.25,
            animation: 'driftHaze 45s ease-in-out infinite alternate',
          }}
        />

        {/* Volumetric Sunset Beam (Subtle golden diagonal shaft) */}
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[700px] -rotate-12 bg-gradient-to-b from-amber-500/8 via-amber-400/4 to-transparent blur-3xl pointer-events-none"
          style={{
            opacity: 0.5 + worldBreath * 0.4 + flashIntensity * 0.3,
            transition: 'opacity 1.2s ease',
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 8 — WET ROAD & REFLECTIONS (3.5x Parallax)
          Wet asphalt ground plane with mirrored blurred neon & gold reflections
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: wetRoadTransform }}
      >
        <div className="absolute bottom-0 inset-x-0 h-[32%] bg-gradient-to-b from-[#08020d]/80 via-[#040106] to-[#000000]">
          {/* Subtle wet horizontal specular streaks */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18)_0%,rgba(6,182,212,0.08)_35%,transparent_70%)]" />

          {/* Mirrored floor reflection of city lights */}
          <div
            className="absolute top-0 inset-x-0 h-28 opacity-40 blur-sm bg-gradient-to-b from-amber-500/20 via-pink-500/10 to-transparent"
            style={{
              animation: 'wetReflectionShimmer 8s ease-in-out infinite alternate',
            }}
          />

          {/* Central Ground Dais Glow Reaction (brightens strongly when achievement changes) */}
          <div
            className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[720px] h-[90px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.38)_0%,rgba(245,158,11,0.15)_45%,transparent_75%)] blur-lg"
            style={{
              opacity: 0.65 + flashIntensity * 0.85,
              transform: `translateX(-50%) scale(${1.0 + flashIntensity * 0.25})`,
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          LAYER 9 — FOREGROUND SILHOUETTES & PARTICLES (5.0x Parallax)
          Dark edge silhouettes (palm fronds, architectural pillars) + dust motes
      ========================================================================= */}
      <div
        className="absolute -inset-10 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: foregroundTransform }}
      >
        {/* Top-Left Overhanging Palm Frond Silhouette */}
        <div className="absolute -top-6 -left-6 w-[280px] sm:w-[380px] h-[220px] pointer-events-none opacity-90">
          <svg viewBox="0 0 300 200" fill="#040106" className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <path d="M0,0 Q120,40 240,160 Q150,110 0,60 Z" />
            <path d="M0,0 Q100,80 180,190 Q120,130 0,90 Z" />
            <path d="M0,0 Q70,90 110,195 Q80,130 0,105 Z" />
            <path d="M0,0 Q140,20 280,110 Q180,80 0,35 Z" />
          </svg>
        </div>

        {/* Top-Right Overhanging Frond Silhouette */}
        <div className="absolute -top-6 -right-6 w-[280px] sm:w-[380px] h-[220px] pointer-events-none opacity-90">
          <svg viewBox="0 0 300 200" fill="#040106" className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <path d="M300,0 Q180,40 60,160 Q150,110 300,60 Z" />
            <path d="M300,0 Q200,80 120,190 Q180,130 300,90 Z" />
            <path d="M300,0 Q160,20 20,110 Q120,80 300,35 Z" />
          </svg>
        </div>

        {/* Left & Right Subtle Architectural Corner Edges */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none" />

        {/* Atmospheric Floating Dust / Ember Particles with Depth Parallax */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 5px ${p.color}`,
                opacity: 0.6 + worldBreath * 0.3,
                animation: `floatParticle ${p.speed} linear infinite ${p.delay}`,
                transform: `translate3d(${x * 30 * p.depthFactor}px, ${y * 20 * p.depthFactor}px, 0)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          GLOBAL STYLES FOR LIVING WORLD ANIMATIONS
      ========================================================================= */}
      <style>{`
        @keyframes driftCloud {
          0% { transform: translateX(-5%); }
          100% { transform: translateX(5%); }
        }
        @keyframes pulseWindow {
          0% { opacity: 0.2; }
          50% { opacity: 0.95; }
          100% { opacity: 0.35; }
        }
        @keyframes palmSwayLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.4deg) skewX(-0.8deg); }
        }
        @keyframes palmSwayRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-1.5deg) skewX(0.9deg); }
        }
        @keyframes trafficWest {
          0% { transform: translateX(110vw); opacity: 0; }
          5% { opacity: 0.85; }
          95% { opacity: 0.85; }
          100% { transform: translateX(-10vw); opacity: 0; }
        }
        @keyframes trafficEast {
          0% { transform: translateX(-10vw); opacity: 0; }
          5% { opacity: 0.85; }
          95% { opacity: 0.85; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        @keyframes driftHaze {
          0% { transform: translateX(-4%) scaleY(0.9); }
          100% { transform: translateX(4%) scaleY(1.1); }
        }
        @keyframes wetReflectionShimmer {
          0%, 100% { opacity: 0.32; transform: scaleX(1); }
          50% { opacity: 0.48; transform: scaleX(1.04); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
          100% { transform: translateY(-60px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
