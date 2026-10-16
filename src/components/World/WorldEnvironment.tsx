import React from 'react';
import { DistrictId, TimeOfDay, HqHighlightMode } from '../../types';
import { DISTRICTS_DATA } from '../../data/districtsData';
import { ABOUT_PAGE_IMAGE, EXPERIENCE_PAGE_IMAGE, LEADER_PAGE_IMAGE } from '../../config/backgroundTheme';

interface WorldEnvironmentProps {
  currentDistrict: DistrictId;
  timeOfDay: TimeOfDay;
  hqHighlightMode?: HqHighlightMode;
}

export const WorldEnvironment: React.FC<WorldEnvironmentProps> = ({
  currentDistrict,
  timeOfDay,
  hqHighlightMode = 'vivid',
}) => {
  // District-specific ambient wallpapers
  const getDistrictImage = (id: DistrictId) => {
    switch (id) {
      case 'player_hq':
        // Player Home Safehouse / Enter World - Highlighted About Page Artwork
        return ABOUT_PAGE_IMAGE || '/about-page.png';
      case 'ai_lab':
        // Cyber AI Lab with glowing blue/cyan terminal
        return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&auto=format&fit=crop&q=85';
      case 'cyber_district':
        // Subterranean dark server room / security bunker
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&auto=format&fit=crop&q=85';
      case 'dev_district':
        // Silicon waterfront & glass high-rises at night
        return 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&auto=format&fit=crop&q=85';
      case 'achievement_hq':
        // Luxury mansion vault with warm amber glow
        return 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&auto=format&fit=crop&q=85';
      case 'career_district':
        // Career & Field Operations District - Leader Artwork
        return LEADER_PAGE_IMAGE || EXPERIENCE_PAGE_IMAGE || '/leader-page.png';
      case 'comms_center':
        // Rooftop skyscraper with communication spires and aerial vistas
        return 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&auto=format&fit=crop&q=85';
      default:
        return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85';
    }
  };

  // Atmosphere overlay gradients
  const getTimeGradient = () => {
    switch (timeOfDay) {
      case 'day':
        return 'from-sky-950/70 via-black/80 to-blue-950/70';
      case 'sunset':
        return 'from-orange-950/85 via-black/85 to-purple-950/85';
      case 'dusk':
        return 'from-pink-950/90 via-black/90 to-indigo-950/90';
      case 'night':
        return 'from-black/95 via-purple-950/70 to-black/95';
    }
  };

  const district = DISTRICTS_DATA[currentDistrict] || DISTRICTS_DATA['player_hq'];
  const isHQ = currentDistrict === 'player_hq';
  const isCareer = currentDistrict === 'career_district';

  // Specific image filters for each highlight mode in Enter World
  const getHqFilter = () => {
    if (isCareer) return 'contrast-125 saturate-135 brightness-90 scale-100';
    if (!isHQ) return 'contrast-125 saturate-135 brightness-45 scale-105';
    switch (hqHighlightMode) {
      case 'vivid':
        return 'contrast-125 saturate-145 brightness-105 scale-100';
      case 'cyber':
        return 'contrast-135 saturate-140 brightness-100 scale-102';
      case 'sunset':
        return 'contrast-130 saturate-160 brightness-105 scale-100';
      case 'panorama':
        return 'contrast-120 saturate-130 brightness-110 scale-105';
      default:
        return 'contrast-125 saturate-140 brightness-105 scale-100';
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Dynamic Background Image Layer */}
      <div className="absolute inset-0 transition-all duration-700 ease-in-out">
        <img
          src={getDistrictImage(currentDistrict)}
          alt={district.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (isHQ) {
              if (target.src.includes('about-page.png')) {
                target.src = '/about%20page.png';
              } else {
                target.src = '/about-page.png';
              }
            } else if (isCareer) {
              if (target.src.includes('leader-page.png')) {
                target.src = '/leader%20page.png';
              } else {
                target.src = '/leader-page.png';
              }
            }
          }}
          className={`w-full h-full object-cover filter ${getHqFilter()} transition-all duration-700`}
          style={{ objectPosition: isHQ ? '50% 4%' : 'center center' }}
        />

        {/* =========================================================================
            ENTER WORLD SPECIFIC HIGHLIGHT LIGHTING & EFFECTS
           ========================================================================= */}
        {isHQ && (
          <>
            {/* Mode 1: Vivid Spotlight - High-intensity dual volumetric neon beams */}
            {hqHighlightMode === 'vivid' && (
              <>
                <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-cyan-400/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <div className="absolute bottom-10 left-1/4 w-[550px] h-[550px] bg-pink-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <div className="absolute inset-0 bg-radial from-transparent via-cyan-900/10 to-black/40 pointer-events-none" />
              </>
            )}

            {/* Mode 2: Cyber Laser Scan - Moving laser bar and glowing HUD frame */}
            {hqHighlightMode === 'cyber' && (
              <>
                {/* Horizontal Sweeping Cyber Laser Beam */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(6,182,212,1)] animate-pulse pointer-events-none top-1/3 opacity-80" />
                <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-cyan-500/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
                
                {/* Cyber Corner HUD Brackets on Background */}
                <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none" />
                <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-pink-500/70 pointer-events-none" />
                <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-cyan-400/70 pointer-events-none" />
                <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-pink-500/70 pointer-events-none" />
              </>
            )}

            {/* Mode 3: Sunset Neon Aura - Rich amber, rose & violet golden-hour glow */}
            {hqHighlightMode === 'sunset' && (
              <>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-amber-500/20 via-rose-500/25 to-purple-600/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-purple-950/30 pointer-events-none" />
              </>
            )}

            {/* Mode 4: Panorama Showcase - Crystal clarity with delicate edge vignette */}
            {hqHighlightMode === 'panorama' && (
              <>
                <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/30 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </>
            )}
          </>
        )}

        {/* Atmosphere Time-of-Day Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${getTimeGradient()} ${
            isHQ
              ? hqHighlightMode === 'panorama'
                ? 'opacity-10'
                : 'opacity-25'
              : isCareer
              ? 'opacity-30'
              : 'opacity-100'
          } transition-opacity duration-700`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isHQ
              ? hqHighlightMode === 'panorama'
                ? 'from-black/15 via-transparent to-black/15'
                : 'from-black/35 via-transparent to-black/35'
              : 'from-black/80 via-transparent to-black/80'
          } transition-all duration-700`}
        />
      </div>

      {/* Holographic Perspective Ground Grid */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[45vh] ${
          isHQ && hqHighlightMode === 'cyber' ? 'opacity-40' : 'opacity-20'
        } pointer-events-none transition-opacity duration-700`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(236, 0, 140, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.35) 1px, transparent 1px)',
          backgroundSize: '50px 25px',
          transform: 'perspective(500px) rotateX(70deg) scale(2)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Floating Ambient Atmosphere Particles / Vignette */}
      <div
        className={`absolute inset-0 bg-radial from-transparent via-black/30 ${
          isHQ && hqHighlightMode === 'panorama' ? 'to-black/50' : 'to-black/80'
        } transition-all duration-700`}
      />
    </div>
  );
};

