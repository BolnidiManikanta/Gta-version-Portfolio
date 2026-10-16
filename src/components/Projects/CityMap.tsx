import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  X,
  Navigation,
  Compass,
  MapPin,
  ChevronRight,
} from 'lucide-react';

interface CityMapProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  playerPos: { x: number; z: number; heading: number };
  carPos?: { x: number; z: number; heading: number };
  discoveredProjectIds: Set<string>;
  activeWaypointId: string | null;
  onSetWaypoint: (projectId: string | null) => void;
  onFastTravel: (x: number, z: number, projectIndex: number) => void;
}

export const CityMap: React.FC<CityMapProps> = ({
  isOpen,
  onClose,
  projects,
  playerPos,
  carPos,
  discoveredProjectIds,
  activeWaypointId,
  onSetWaypoint,
  onFastTravel,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  if (!isOpen) return null;

  // City bounds (-140 to +140) converted to 0-100% SVG coordinates
  const worldToMap = (x: number, z: number) => {
    const mapX = ((x + 140) / 280) * 100;
    const mapY = ((z + 140) / 280) * 100;
    return { x: Math.max(5, Math.min(95, mapX)), y: Math.max(5, Math.min(95, mapY)) };
  };

  const getProjectCoordinates = (proj: ProjectItem, idx: number) => {
    const cat = (proj.category || '').toUpperCase();
    const techs = (proj.technologies || []).join(' ').toUpperCase();

    if (cat.includes('AI') || cat.includes('VISION') || cat.includes('HEALTHCARE') || techs.includes('OPENCV')) {
      const row = idx % 6;
      return { x: idx % 2 === 0 ? -26 : 26, z: -24 - row * 16, district: 'NORTH AI & VISION' };
    }
    if (cat.includes('SECURITY') || cat.includes('CYBER') || cat.includes('VULN') || techs.includes('CLAMAV')) {
      const row = idx % 6;
      return { x: 26 + row * 16, z: idx % 2 === 0 ? -26 : 26, district: 'EAST CYBER DEFENSE' };
    }
    if (cat.includes('RESEARCH') || cat.includes('CLOUD') || cat.includes('ACADEMIC') || !!proj.relatedResearch) {
      const row = idx % 6;
      return { x: idx % 2 === 0 ? -26 : 26, z: 24 + row * 16, district: 'SOUTH RESEARCH COMMONS' };
    }
    const row = idx % 6;
    return { x: -26 - row * 16, z: idx % 2 === 0 ? -26 : 26, district: 'WEST FULL STACK VALLEY' };
  };

  const playerMapPos = worldToMap(playerPos.x, playerPos.z);
  const carMapPos = carPos ? worldToMap(carPos.x, carPos.z) : null;
  const selectedProject = projects.find((p) => p.id === selectedProjectId || p.slug === selectedProjectId);
  const selectedIndex = selectedProject ? projects.indexOf(selectedProject) : -1;
  const selectedCoords = selectedProject && selectedIndex !== -1 ? getProjectCoordinates(selectedProject, selectedIndex) : null;
  const selectedDist = selectedCoords ? Math.round(Math.hypot(playerPos.x - selectedCoords.x, playerPos.z - selectedCoords.z)) : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-neutral-950 border border-neutral-700 shadow-[0_0_50px_rgba(0,0,0,0.95)] rounded-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-black/95 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <div className="font-hud text-xs sm:text-sm font-black text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <span>CITY STREET MAP & GPS SATELLITE</span>
                <span className="font-mono text-[10px] text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded-xs">
                  {discoveredProjectIds.size} / {projects.length} DISCOVERED
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                METROPOLITAN OPEN WORLD // 25 PHYSICAL PROJECT HEADQUARTERS
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              try {
                gtaAudio.playBack();
              } catch {
                // Audio safety
              }
              onClose();
            }}
            title="Close Map [M / ESC]"
            className="p-1.5 rounded-xs bg-white/10 hover:bg-neutral-800 border border-neutral-700 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: City Grid Map */}
          <div className="relative flex-1 bg-neutral-950 p-4 flex items-center justify-center overflow-hidden">
            {/* Street Grid Graphic */}
            <div className="relative w-[92%] max-w-[500px] aspect-square rounded-sm border border-neutral-800 bg-neutral-900/60 overflow-hidden">
              {/* Avenue Grid Lines */}
              <div className="absolute top-0 bottom-0 left-[29%] w-3 bg-neutral-800/80" />
              <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-4 bg-neutral-800/90 border-x border-cyan-500/20" />
              <div className="absolute top-0 bottom-0 right-[29%] w-3 bg-neutral-800/80" />

              <div className="absolute left-0 right-0 top-[29%] h-3 bg-neutral-800/80" />
              <div className="absolute left-0 right-0 top-[50%] -translate-y-1/2 h-4 bg-neutral-800/90 border-y border-cyan-500/20" />
              <div className="absolute left-0 right-0 bottom-[29%] h-3 bg-neutral-800/80" />

              {/* District Street Names */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded-xs border border-cyan-500/30">
                ▲ NORTH AI & VISION DISTRICT
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded-xs border border-cyan-500/30">
                ▼ SOUTH RESEARCH COMMONS
              </div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded-xs -rotate-90">
                ◄ WEST FULL STACK VALLEY
              </div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded-xs rotate-90">
                ► EAST CYBER DEFENSE
              </div>

              {/* Project Pins */}
              {projects.map((proj, idx) => {
                const coords = getProjectCoordinates(proj, idx);
                const pos = worldToMap(coords.x, coords.z);
                const isSelected = selectedProjectId === proj.id;
                const isWaypoint = activeWaypointId === proj.id;
                const isDiscovered = discoveredProjectIds.has(proj.id);

                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      try {
                        gtaAudio.playHover();
                      } catch {
                        // Audio safety
                      }
                      setSelectedProjectId(proj.id);
                    }}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      isSelected
                        ? 'bg-amber-400 ring-4 ring-amber-400/40 scale-125 shadow-[0_0_12px_#eab308]'
                        : isWaypoint
                        ? 'bg-yellow-400 ring-2 ring-white scale-110 shadow-[0_0_10px_#eab308] animate-bounce'
                        : isDiscovered
                        ? 'bg-cyan-500 hover:scale-125 border border-white/60'
                        : 'bg-neutral-600 hover:scale-125 border border-neutral-400'
                    }`}
                    title={`[${String(idx + 1).padStart(2, '0')}] ${proj.title}`}
                  >
                    <span className="text-[8px] font-mono font-bold text-black pointer-events-none">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}

              {/* Player GPS Marker with Heading Cone */}
              <div
                style={{ left: `${playerMapPos.x}%`, top: `${playerMapPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-pink-500 border-2 border-white shadow-[0_0_15px_#ec008c] flex items-center justify-center">
                    <Navigation
                      className="w-3 h-3 text-white"
                      style={{ transform: `rotate(${playerPos.heading}rad)` }}
                    />
                  </div>
                  <div className="absolute -top-5 whitespace-nowrap font-mono text-[9px] font-bold text-pink-300 bg-black/80 px-1 py-0.2 rounded-xs border border-pink-500/40">
                    YOU
                  </div>
                </div>
              </div>

              {/* Car Marker if parked separately */}
              {carMapPos && (
                <div
                  style={{ left: `${carMapPos.x}%`, top: `${carMapPos.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-none transition-all duration-300"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 rounded-xs bg-amber-500 border border-white shadow-[0_0_10px_#f59e0b] flex items-center justify-center">
                      <span className="text-[7px] font-black text-black">CAR</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Selected Project Info & GPS Controls */}
          <div className="w-full md:w-80 bg-neutral-900/90 border-t md:border-t-0 md:border-l border-neutral-800 p-5 flex flex-col justify-between overflow-y-auto">
            {selectedProject && selectedCoords ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      LOCATION // {String(selectedIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-neutral-500">·</span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">
                      {selectedCoords.district}
                    </span>
                  </div>

                  <h3 className="font-hud text-lg sm:text-xl text-white font-bold uppercase">
                    {selectedProject.title}
                  </h3>

                  <div className="text-xs font-mono text-cyan-400">
                    DISTANCE: {selectedDist} METERS
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-normal line-clamp-3">
                  {selectedProject.shortDescription || selectedProject.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    TECH LOADOUT:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-xs bg-black/60 border border-neutral-700 text-[10px] font-mono text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Waypoint & Approach Action Buttons */}
                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => {
                      try {
                        gtaAudio.playSelect();
                      } catch {
                        // Audio safety
                      }
                      if (activeWaypointId === selectedProject.id) {
                        onSetWaypoint(null);
                      } else {
                        onSetWaypoint(selectedProject.id);
                      }
                    }}
                    className={`w-full py-2.5 px-3 rounded-xs font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      activeWaypointId === selectedProject.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-600 text-white'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>{activeWaypointId === selectedProject.id ? 'CLEAR GPS WAYPOINT' : 'SET GPS WAYPOINT'}</span>
                  </button>

                  <button
                    onClick={() => {
                      try {
                        gtaAudio.playSelect();
                      } catch {
                        // Audio safety
                      }
                      onFastTravel(selectedCoords.x, selectedCoords.z, selectedIndex);
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 rounded-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400 text-white font-hud text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>APPROACH LOCATION</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-neutral-400 space-y-3">
                <MapPin className="w-8 h-8 text-cyan-400/60 animate-pulse" />
                <div className="font-mono text-xs uppercase tracking-wider text-white">
                  SELECT A PROJECT LOCATION
                </div>
                <p className="text-[11px] font-mono text-neutral-500">
                  Click any numbered pin on the city street map to inspect location, set GPS waypoints, or approach its physical building.
                </p>
              </div>
            )}

            {/* Legend */}
            <div className="pt-4 border-t border-neutral-800 space-y-1.5 font-mono text-[10px] text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <span>PLAYER STREET POSITION</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>DISCOVERED LOCATION</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span>UNDISCOVERED LOCATION</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>ACTIVE GPS WAYPOINT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
