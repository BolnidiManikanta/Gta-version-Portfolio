import React from 'react';
import { DistrictId, TimeOfDay } from '../../types';
import { DISTRICTS_DATA } from '../../data/districtsData';

interface WorldEnvironmentProps {
  currentDistrict: DistrictId;
  timeOfDay: TimeOfDay;
}

export const WorldEnvironment: React.FC<WorldEnvironmentProps> = ({
  currentDistrict,
  timeOfDay,
}) => {
  // District-specific ambient wallpapers
  const getDistrictImage = (id: DistrictId) => {
    switch (id) {
      case 'player_hq':
        // Ocean Drive luxury beach penthouse
        return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85';
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
        // Highway overlook with light streaks across the skyline
        return 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&auto=format&fit=crop&q=85';
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

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <img
          src={getDistrictImage(currentDistrict)}
          alt={district.name}
          className="w-full h-full object-cover object-center filter contrast-125 saturate-135 brightness-45 scale-105 transition-all duration-1000"
        />

        {/* Atmosphere Time-of-Day Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t ${getTimeGradient()} transition-colors duration-1000`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Holographic Perspective Ground Grid */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45vh] opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(236, 0, 140, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 25px',
          transform: 'perspective(500px) rotateX(70deg) scale(2)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Floating Ambient Atmosphere Particles / Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90" />
    </div>
  );
};
