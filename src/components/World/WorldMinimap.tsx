import React, { useState } from 'react';
import { DistrictId } from '../../types';
import { DISTRICTS_DATA, DISTRICT_LIST } from '../../data/districtsData';
import { gtaAudio } from '../../utils/audio';
import {
  Navigation,
  Map,
  X,
  Zap,
  Crosshair,
  Compass,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface WorldMinimapProps {
  currentDistrict: DistrictId;
  onSelectDistrict: (district: DistrictId) => void;
  onOpenMap: () => void;
}

export const WorldMinimap: React.FC<WorldMinimapProps> = ({
  currentDistrict,
  onSelectDistrict,
  onOpenMap,
}) => {
  // Collapsed by default so it never disturbs or covers content!
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictId | null>(null);

  const activeDistrict = DISTRICTS_DATA[currentDistrict] || DISTRICTS_DATA['player_hq'];

  // Calculate approximate distance from current district coordinates
  const calculateDistance = (targetId: DistrictId) => {
    if (targetId === currentDistrict) return '0m (HERE)';
    const current = DISTRICTS_DATA[currentDistrict]?.mapCoordinates || { x: 50, y: 50 };
    const target = DISTRICTS_DATA[targetId]?.mapCoordinates || { x: 50, y: 50 };
    const dx = current.x - target.x;
    const dy = current.y - target.y;
    const dist = Math.round(Math.sqrt(dx * dx + dy * dy) * 18);
    return `${dist}m`;
  };

  const getDistrictOpsCount = (id: DistrictId) => {
    switch (id) {
      case 'player_hq':
        return 'HQ Bio & Attributes';
      case 'ai_lab':
        return '4 Vision Missions';
      case 'cyber_district':
        return '5 Defense Operations';
      case 'dev_district':
        return '6 Web Deployments';
      case 'achievement_hq':
        return '12 Trophies & Awards';
      case 'career_district':
        return 'JPMorgan & Academy';
      case 'comms_center':
        return 'Comms Terminal & Dispatch';
      default:
        return 'Active Sector';
    }
  };

  // When closed: Show only a small, non-intrusive floating button
  if (!isOpen) {
    return (
      <div className="fixed bottom-12 left-3 sm:left-6 z-30 select-none pointer-events-auto">
        <button
          id="minimap-toggle-btn"
          onClick={() => {
            gtaAudio.playSelect();
            setIsOpen(true);
          }}
          title="Open GPS Radar & Fast Travel Teleport [M]"
          className="flex items-center gap-2 bg-black/90 hover:bg-neutral-900 border-2 border-pink-500/80 hover:border-pink-400 px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(236,0,140,0.5)] text-white text-xs font-hud tracking-wider transition-all transform hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="w-5 h-5 rounded-full bg-pink-600 flex items-center justify-center text-white text-[10px] shadow-[0_0_10px_rgba(236,0,140,0.8)] group-hover:bg-pink-500">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-pink-300 group-hover:text-white">GPS RADAR</span>
            <span className="text-[10px] text-cyan-400 font-mono hidden sm:inline">
              [{activeDistrict.name.split(' ')[0]}]
            </span>
          </div>
          <span className="text-[10px] bg-pink-950/80 text-pink-400 border border-pink-500/40 px-1.5 py-0.5 rounded font-mono">
            SHOW
          </span>
        </button>
      </div>
    );
  }

  // When open: Interactive GPS Radar & Fast Travel Navigation Panel
  return (
    <div className="fixed bottom-12 left-3 sm:left-6 z-40 select-none pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
      <div className="w-[300px] sm:w-[340px] bg-black/95 backdrop-blur-xl border-2 border-pink-500/90 rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Header Bar with Useful Controls and Close Button */}
        <div className="bg-gradient-to-r from-pink-950/80 via-neutral-900 to-black px-3.5 py-2 border-b border-pink-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="font-hud text-xs font-bold text-pink-300 tracking-wider">
              GPS RADAR // FAST-TRAVEL
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Full Map Button */}
            <button
              id="minimap-open-fullscreen-map-btn"
              onClick={() => {
                gtaAudio.playSelect();
                onOpenMap();
              }}
              title="Open Full Tactical Map [M]"
              className="px-2 py-0.5 rounded bg-black/60 hover:bg-cyan-900/60 border border-cyan-500/50 text-cyan-300 text-[10px] font-hud tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Map className="w-3 h-3 text-cyan-400" />
              <span>FULL MAP</span>
            </button>

            {/* Close Button to hide radar and clear screen */}
            <button
              id="minimap-close-btn"
              onClick={() => {
                gtaAudio.playSelect();
                setIsOpen(false);
              }}
              title="Minimize Radar (Clear Screen)"
              className="p-1 rounded bg-black/60 hover:bg-pink-600 text-neutral-400 hover:text-white border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle Section: Circular Radar + Current Sector info */}
        <div className="p-3 flex items-center gap-3 bg-neutral-950/90">
          {/* Radar Disc */}
          <div className="relative w-28 h-28 shrink-0 rounded-full border-2 border-neutral-700 bg-black/90 overflow-hidden shadow-inner">
            {/* Scan Grid & Concentric Rings */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/40" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cyan-500/40" />
              <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-6 rounded-full border border-cyan-500/30" />
            </div>

            {/* Sweeping Radar Scanner */}
            <div
              className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-pink-500 to-transparent origin-left pointer-events-none animate-spin"
              style={{ animationDuration: '3.5s' }}
            />

            {/* District Pins on Radar */}
            {DISTRICT_LIST.map((dist) => {
              const isCurrent = dist.id === currentDistrict;
              const isHovered = dist.id === hoveredDistrict;

              return (
                <button
                  key={dist.id}
                  onMouseEnter={() => setHoveredDistrict(dist.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => {
                    gtaAudio.playSelect();
                    gtaAudio.playCameraSwoosh();
                    onSelectDistrict(dist.id);
                  }}
                  title={`${dist.name} (${calculateDistance(dist.id)})`}
                  style={{
                    left: `${dist.mapCoordinates.x}%`,
                    top: `${dist.mapCoordinates.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                    isCurrent
                      ? 'w-5 h-5 bg-pink-600 text-white z-20 shadow-[0_0_12px_rgba(236,0,140,1)] scale-110 animate-pulse'
                      : isHovered
                      ? 'w-4 h-4 bg-cyan-500 text-black z-20 scale-125'
                      : 'w-3 h-3 bg-neutral-900 border border-white/40 text-white/80 z-10'
                  }`}
                >
                  <span className="font-hud text-[7px] font-bold">
                    {dist.name.charAt(0)}
                  </span>
                </button>
              );
            })}

            {/* North Marker */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-hud font-bold text-pink-400">
              N
            </div>
          </div>

          {/* Current / Hovered District Snapshot */}
          <div className="flex-1 min-w-0 text-left space-y-1">
            <div className="text-[10px] font-hud text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3 h-3 text-pink-400" />
              <span>CURRENT LOCATION:</span>
            </div>
            <div className="font-hud text-xs font-bold text-white truncate">
              {hoveredDistrict
                ? DISTRICTS_DATA[hoveredDistrict]?.name
                : activeDistrict.name}
            </div>
            <div className="text-[10px] text-pink-400 font-mono truncate">
              {hoveredDistrict
                ? DISTRICTS_DATA[hoveredDistrict]?.location
                : activeDistrict.location}
            </div>
            <div className="text-[10px] font-hud text-cyan-300 font-bold">
              {hoveredDistrict
                ? `DISTANCE: ${calculateDistance(hoveredDistrict)}`
                : `DISTANCE: 0m (ACTIVE)`}
            </div>
          </div>
        </div>

        {/* Bottom Fast-Travel Quick Teleport Menu */}
        <div className="p-2 bg-black border-t border-white/10 space-y-1">
          <div className="px-1 text-[9px] font-hud font-bold text-neutral-400 uppercase tracking-widest flex items-center justify-between">
            <span>FAST-TRAVEL DESTINATIONS</span>
            <span className="text-pink-400">CLICK TO TELEPORT</span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1 pr-1 gta-scrollbar">
            {DISTRICT_LIST.map((dist) => {
              const isCurrent = dist.id === currentDistrict;
              return (
                <button
                  key={dist.id}
                  onClick={() => {
                    gtaAudio.playSelect();
                    gtaAudio.playCameraSwoosh();
                    onSelectDistrict(dist.id);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors cursor-pointer text-xs font-hud ${
                    isCurrent
                      ? 'bg-pink-600/30 border border-pink-500/80 text-white font-bold'
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: dist.color }}
                    />
                    <span className="truncate">{dist.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-cyan-400">
                      {calculateDistance(dist.id)}
                    </span>
                    {isCurrent ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="bg-neutral-950 px-3 py-1.5 text-[9px] font-hud text-neutral-400 flex items-center justify-between border-t border-white/10">
          <span>PRESS [M] FOR FULL TACTICAL MAP</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-pink-400 hover:underline cursor-pointer"
          >
            MINIMIZE
          </button>
        </div>
      </div>
    </div>
  );
};
