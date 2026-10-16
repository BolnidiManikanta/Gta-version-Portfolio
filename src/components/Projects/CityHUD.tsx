import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { PlayerControlMode } from './CityWorldCanvas';
import {
  Map,
  FileCode2,
  Radio,
  ArrowLeft,
  Eye,
  Car,
  DoorOpen,
  Gauge,
  Heart,
  Shield,
  Star,
  Terminal,
} from 'lucide-react';

interface CityHUDProps {
  currentDistrict: string;
  totalProjects: number;
  discoveredCount: number;
  activeObjective: string;
  missionTitle: string;
  nearbyInteraction: {
    type: 'project' | 'car' | 'interior_node' | 'interior_exit';
    target: ProjectItem | string;
    distance: number;
    index?: number;
    title: string;
  } | null;
  playerPos: { x: number; z: number; heading: number };
  carPos: { x: number; z: number; heading: number; speed: number };
  controlMode: PlayerControlMode;
  speedKmh: number;
  activeInteriorProject: ProjectItem | null;
  projects: ProjectItem[];
  activeWaypointId: string | null;
  onInteract: () => void;
  onOpenMap: () => void;
  onOpenDirectory: () => void;
  onOpenDossier: () => void;
  onExit: () => void;
  onGoHome: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
  onMoveButtonDown: (dir: 'w' | 's' | 'a' | 'd') => void;
  onMoveButtonUp: (dir: 'w' | 's' | 'a' | 'd') => void;
}

export const CityHUD: React.FC<CityHUDProps> = ({
  currentDistrict,
  totalProjects,
  discoveredCount,
  activeObjective,
  missionTitle,
  nearbyInteraction,
  playerPos,
  carPos,
  controlMode,
  speedKmh,
  activeInteriorProject,
  projects,
  activeWaypointId,
  onInteract,
  onOpenMap,
  onOpenDirectory,
  onOpenDossier,
  onExit,
  onGoHome,
  isRadioPlaying,
  onToggleRadio,
  onMoveButtonDown,
  onMoveButtonUp,
}) => {
  const radarRadiusMeters = 65;
  const radarPx = 54;
  const currentPos = controlMode === 'driving' ? carPos : playerPos;

  // In-game 80s Digital Clock (similar to 05:04 in Vice City screenshot)
  const [gameTime, setGameTime] = useState('05:04');

  useEffect(() => {
    let minutes = 4;
    let hours = 5;
    const interval = setInterval(() => {
      minutes += 1;
      if (minutes >= 60) {
        minutes = 0;
        hours = (hours + 1) % 24;
      }
      setGameTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Compute 6 Wanted / Discovery Stars based on projects discovered
  const totalStars = 6;
  const filledStars = Math.min(totalStars, Math.ceil((discoveredCount / totalProjects) * totalStars));

  return (
    <>
      {/* 1. TOP-LEFT: GAME TITLE & MISSION OBJECTIVE */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-5 z-30 pointer-events-none select-none flex flex-col gap-2">
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => {
              try {
                gtaAudio.playSelect();
              } catch {
                // Safety
              }
              onGoHome();
            }}
            title="Return to Main Portfolio"
            className="px-2.5 py-1 rounded-xs bg-black/90 border border-pink-500/80 hover:border-pink-400 font-hud text-xs font-black text-pink-400 hover:text-white transition-all cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.5)]"
          >
            BM
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h1 className="font-hud text-sm sm:text-base font-black text-white tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                PROJECT VAULT
              </h1>
            </div>
            <div className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">
              {currentDistrict}
            </div>
          </div>
        </div>

        {/* Vice City Style Objective Banner */}
        <div className="px-3 py-1.5 rounded-xs bg-black/90 border-l-4 border-amber-400 backdrop-blur-md shadow-lg max-w-sm pointer-events-auto">
          <div className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">
            MISSION // {missionTitle}
          </div>
          <div className="text-xs font-mono text-white tracking-wide leading-tight">
            {activeObjective}
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: AUTHENTIC GTA VICE CITY HUD CLUSTER */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-30 pointer-events-none select-none flex flex-col items-end gap-1.5">
        <div className="flex items-start gap-3">
          {/* Quick Buttons Bar */}
          <div className="flex items-center gap-1.5 pointer-events-auto mt-1">
            {/* Map [M] */}
            {controlMode !== 'interior' && (
              <button
                onClick={() => {
                  try {
                    gtaAudio.playSelect();
                  } catch {
                    // Safety
                  }
                  onOpenMap();
                }}
                title="City Map [M]"
                className="px-2 py-1 rounded-xs bg-black/85 hover:bg-neutral-900 border border-pink-500/60 hover:border-pink-400 text-pink-300 hover:text-white font-mono text-[10px] tracking-wider transition-all cursor-pointer shadow-sm"
              >
                MAP [M]
              </button>
            )}

            {/* Projects Directory [I] */}
            <button
              onClick={() => {
                try {
                  gtaAudio.playSelect();
                } catch {
                  // Safety
                }
                onOpenDirectory();
              }}
              title="Projects Catalog [I]"
              className="px-2 py-1 rounded-xs bg-black/85 hover:bg-neutral-900 border border-cyan-500/60 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-[10px] tracking-wider transition-all cursor-pointer shadow-sm"
            >
              PROJECTS [I]
            </button>

            {/* Radio Toggle */}
            <button
              onClick={() => {
                try {
                  gtaAudio.playSelect();
                } catch {
                  // Safety
                }
                onToggleRadio();
              }}
              title={isRadioPlaying ? 'Mute Radio' : 'Play Radio'}
              className={`p-1 rounded-xs border transition-all cursor-pointer ${
                isRadioPlaying
                  ? 'bg-amber-950/90 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                  : 'bg-black/85 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
            </button>

            {/* Exit [ESC] */}
            <button
              onClick={() => {
                try {
                  gtaAudio.playBack();
                } catch {
                  // Safety
                }
                onExit();
              }}
              title="Exit [ESC]"
              className="px-2 py-1 rounded-xs bg-black/85 hover:bg-neutral-900 border border-red-500/60 hover:border-red-400 text-red-400 hover:text-white font-mono text-[10px] tracking-wider transition-all cursor-pointer shadow-sm"
            >
              EXIT [ESC]
            </button>
          </div>

          {/* Authentic Vice City Clock, Cash & Vitals Column */}
          <div className="flex flex-col items-end">
            {/* Authentic Vice City Green Cash Counter */}
            <div className="font-mono text-xl sm:text-2xl font-black text-[#4ade80] tracking-wider drop-shadow-[0_2px_4px_rgba(74,222,128,0.7)]">
              ${String(25000 + discoveredCount * 2500).padStart(8, '0')}
            </div>

            {/* Digital Clock in bold Cyan */}
            <div className="font-mono text-xl sm:text-2xl font-black text-[#00f0ff] tracking-widest drop-shadow-[0_2px_6px_rgba(0,240,255,0.7)]">
              {gameTime}
            </div>

            {/* Armor counter in Bright Green */}
            <div className="flex items-center gap-1.5 font-mono text-base sm:text-lg font-black text-[#4ade80] drop-shadow-[0_2px_4px_rgba(74,222,128,0.6)]">
              <Shield className="w-3.5 h-3.5 fill-[#4ade80]" />
              <span>100</span>
            </div>

            {/* Health counter in Bright Vice City Magenta/Pink */}
            <div className="flex items-center gap-1.5 font-mono text-base sm:text-lg font-black text-[#ec4899] drop-shadow-[0_2px_4px_rgba(236,72,153,0.7)]">
              <Heart className="w-3.5 h-3.5 fill-[#ec4899]" />
              <span>100</span>
            </div>
          </div>

          {/* Weapon / Code Icon Box with Pink Border (Iconic Vice City Weapon Slot) */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xs bg-black/80 border-3 border-[#ec4899] shadow-[0_0_15px_rgba(236,72,153,0.6)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 to-cyan-900/30" />
            <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 drop-shadow-[0_0_6px_#00f0ff] relative z-10" />
            <span className="absolute bottom-0.5 right-1 font-mono text-[8px] font-bold text-pink-300 z-10">
              {discoveredCount}/{totalProjects}
            </span>
          </div>
        </div>

        {/* 6 Vice City Wanted / Discovery Stars */}
        <div className="flex items-center gap-1 pr-1">
          {Array.from({ length: totalStars }).map((_, i) => {
            const isFilled = i < filledStars;
            return (
              <Star
                key={i}
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all ${
                  isFilled
                    ? 'text-[#00f0ff] fill-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] animate-pulse'
                    : 'text-[#00f0ff]/40'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* 3. DYNAMIC CENTER-BOTTOM INTERACTION PROMPTS */}
      {nearbyInteraction && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none animate-in slide-in-from-bottom-3 fade-in duration-200">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                try {
                  gtaAudio.playSelect();
                } catch {
                  // Safety
                }
                onInteract();
              }}
              className="px-6 py-3 rounded-xs bg-black/95 hover:bg-neutral-900 border-2 border-pink-500 hover:border-cyan-400 text-white font-hud font-black text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2.5 shadow-[0_0_25px_rgba(236,72,153,0.7)] hover:scale-105 transition-all cursor-pointer"
            >
              {nearbyInteraction.type === 'car' && <Car className="w-4 h-4 text-pink-400 animate-bounce" />}
              {nearbyInteraction.type === 'project' && <DoorOpen className="w-4 h-4 text-cyan-300 animate-pulse" />}
              {nearbyInteraction.type === 'interior_node' && <Eye className="w-4 h-4 text-cyan-300" />}
              {nearbyInteraction.type === 'interior_exit' && <DoorOpen className="w-4 h-4 text-red-400" />}

              <span>
                {nearbyInteraction.type === 'car' && '[E] / [F] ENTER CAR'}
                {nearbyInteraction.type === 'project' && `[E] ENTER ${nearbyInteraction.title}`}
                {nearbyInteraction.type === 'interior_node' && `[E] INSPECT ${nearbyInteraction.title}`}
                {nearbyInteraction.type === 'interior_exit' && '[E] EXIT TO OCEAN DRIVE'}
              </span>
            </button>

            <div className="px-3 py-0.5 rounded-full bg-black/90 border border-neutral-700 text-[10px] font-mono text-neutral-300 tracking-wider">
              DISTANCE: {nearbyInteraction.distance} METERS · PRESS [E] OR CLICK
            </div>
          </div>
        </div>
      )}

      {/* When driving: Exit prompt & speedometer */}
      {controlMode === 'driving' && !nearbyInteraction && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xs bg-black/90 border border-pink-500/70 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <div className="font-mono text-xl font-black text-white tracking-widest">
              {speedKmh} <span className="text-xs text-cyan-400 font-normal">KM/H</span>
            </div>
            <div className="h-4 w-px bg-neutral-700" />
            <button
              onClick={() => {
                try {
                  gtaAudio.playCarHorn();
                } catch {
                  // Safety
                }
              }}
              title="Honk Car Horn [H]"
              className="text-xs font-mono font-bold text-cyan-300 hover:text-white px-2 py-0.5 rounded-xs bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/40 cursor-pointer"
            >
              [H] HORN
            </button>
            <div className="h-4 w-px bg-neutral-700" />
            <button
              onClick={() => {
                try {
                  gtaAudio.playSelect();
                } catch {
                  // Safety
                }
                onInteract();
              }}
              className="text-xs font-mono font-bold text-amber-300 hover:text-white px-2 py-0.5 rounded-xs bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/40 cursor-pointer"
            >
              [F] EXIT VEHICLE
            </button>
          </div>
        </div>
      )}

      {/* 4. CIRCULAR VICE CITY MINIMAP (BOTTOM-LEFT) */}
      {controlMode !== 'interior' && (
        <div className="fixed bottom-7 left-4 z-30 pointer-events-auto select-none hidden sm:flex flex-col items-start">
          <div
            onClick={onOpenMap}
            title="Click to open full City Satellite Map [M]"
            className="relative w-30 h-30 rounded-full bg-black/95 border-4 border-[#ec4899] shadow-[0_0_25px_rgba(236,72,153,0.85)] overflow-hidden cursor-pointer hover:border-pink-400 transition-colors"
          >
            {/* North [N] Pointer Badge at Top-Left */}
            <div className="absolute top-1 left-2 z-30 pointer-events-none">
              <div className="w-5 h-5 rounded-xs bg-blue-600 border border-white flex items-center justify-center shadow-md">
                <span className="font-mono text-[10px] font-black text-white">N</span>
              </div>
            </div>

            {/* Radar Sweep Effect */}
            <div
              className="absolute inset-0 origin-center rounded-full pointer-events-none animate-spin"
              style={{
                animationDuration: '4.5s',
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(236,72,153,0.25) 360deg)',
              }}
            />

            {/* Street Grid Crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-pink-500/30" />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-pink-500/30" />
            <div className="absolute inset-0 m-4 rounded-full border border-pink-500/20" />
            <div className="absolute inset-0 m-8 rounded-full border border-pink-500/20" />

            {/* Green Parkway Strip on Right Side of Minimap (matching Ocean Drive beachfront in screenshot) */}
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-emerald-950/40 border-l border-emerald-500/30 pointer-events-none" />

            {/* Center Player/Vehicle Arrow rotating with heading */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div
                className={`w-4 h-4 flex items-center justify-center filter drop-shadow-[0_0_4px_#ec008c] ${
                  controlMode === 'driving' ? 'text-amber-400' : 'text-cyan-400'
                }`}
                style={{ transform: `rotate(${currentPos.heading}rad)` }}
              >
                ▲
              </div>
            </div>

            {/* Car Icon blip on minimap if on foot */}
            {controlMode === 'walking' && (
              (() => {
                const relCarX = carPos.x - playerPos.x;
                const relCarZ = carPos.z - playerPos.z;
                const d = Math.hypot(relCarX, relCarZ);
                if (d > radarRadiusMeters) return null;
                const bx = radarPx + (relCarX / radarRadiusMeters) * (radarPx - 8);
                const by = radarPx + (relCarZ / radarRadiusMeters) * (radarPx - 8);
                return (
                  <div
                    key="car-blip"
                    style={{ left: `${bx}px`, top: `${by}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-xs bg-red-500 ring-1 ring-white shadow-[0_0_6px_#ef4444]"
                    title="Player Red Car"
                  />
                );
              })()
            )}

            {/* Nearby Project Buildings Blips */}
            {projects.map((proj, idx) => {
              let bx = 0;
              let bz = 0;
              const cat = (proj.category || '').toUpperCase();
              if (cat.includes('AI') || cat.includes('VISION')) {
                bx = idx % 2 === 0 ? -28 : 28;
                bz = -26 - (idx % 6) * 18;
              } else if (cat.includes('SECURITY') || cat.includes('CYBER')) {
                bx = 28 + (idx % 6) * 18;
                bz = idx % 2 === 0 ? -26 : 26;
              } else if (cat.includes('RESEARCH') || cat.includes('CLOUD')) {
                bx = idx % 2 === 0 ? -28 : 28;
                bz = 26 + (idx % 6) * 18;
              } else {
                bx = -28 - (idx % 6) * 18;
                bz = idx % 2 === 0 ? -26 : 26;
              }

              const rx = bx - currentPos.x;
              const rz = bz - currentPos.z;
              const dist = Math.hypot(rx, rz);
              if (dist > radarRadiusMeters) return null;

              const mapX = radarPx + (rx / radarRadiusMeters) * (radarPx - 8);
              const mapY = radarPx + (rz / radarRadiusMeters) * (radarPx - 8);
              const isWaypoint = activeWaypointId === proj.id;

              return (
                <div
                  key={proj.id}
                  style={{ left: `${mapX}px`, top: `${mapY}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
                    isWaypoint
                      ? 'w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ring-white scale-125'
                      : 'w-2 h-2 rounded-xs bg-cyan-400'
                  }`}
                />
              );
            })}
          </div>

          <div className="mt-1 flex items-center justify-between w-30 px-1 font-mono text-[9px] text-pink-400 font-bold">
            <span>VICE RADAR</span>
            <span className="text-cyan-400">GPS [M]</span>
          </div>
        </div>
      )}

      {/* 5. CONTROLS HELPER LEGEND */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 px-4 py-1 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none select-none flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-neutral-700 text-cyan-300 font-bold">
              W A S D
            </span>
            <span>{controlMode === 'driving' ? 'DRIVE / STEER' : 'MOVE'}</span>
          </div>

          {controlMode === 'walking' && (
            <div className="hidden sm:flex items-center gap-1">
              <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-neutral-700 text-cyan-300 font-bold">
                SHIFT
              </span>
              <span>SPRINT</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1">
            <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-neutral-700 text-cyan-300 font-bold">
              SPACE
            </span>
            <span>{controlMode === 'driving' ? 'HANDBRAKE' : 'JUMP'}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-pink-500 text-pink-300 font-bold">
              E / F
            </span>
            <span>ENTER CAR / INTERACT</span>
          </div>

          {controlMode !== 'interior' && (
            <div className="hidden md:flex items-center gap-1">
              <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-neutral-700 text-neutral-300 font-bold">
                M
              </span>
              <span>MAP</span>
            </div>
          )}

          <div className="hidden md:flex items-center gap-1">
            <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-neutral-700 text-neutral-300 font-bold">
              I
            </span>
            <span>PROJECTS</span>
          </div>

          {controlMode === 'driving' && (
            <div className="hidden lg:flex items-center gap-1">
              <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-cyan-500 text-cyan-300 font-bold">
                H
              </span>
              <span>HORN</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-1">
            <span className="px-1.5 py-0.2 rounded-xs bg-neutral-900 border border-amber-500 text-amber-300 font-bold">
              R
            </span>
            <span>RADIO</span>
          </div>
        </div>

        <div className="text-[10px] text-pink-400/90 font-bold uppercase tracking-widest hidden lg:block">
          VICE CITY TECH BOULEVARD
        </div>
      </footer>

      {/* 6. MOBILE TOUCH CONTROLS */}
      <div className="fixed bottom-7 left-4 z-30 pointer-events-auto sm:hidden flex flex-col items-center gap-1 opacity-80">
        <button
          onTouchStart={() => onMoveButtonDown('w')}
          onTouchEnd={() => onMoveButtonUp('w')}
          className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-pink-500/70 text-white font-mono text-lg font-bold flex items-center justify-center active:bg-pink-500 active:text-black"
        >
          ▲
        </button>
        <div className="flex items-center gap-1">
          <button
            onTouchStart={() => onMoveButtonDown('a')}
            onTouchEnd={() => onMoveButtonUp('a')}
            className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-pink-500/70 text-white font-mono text-lg font-bold flex items-center justify-center active:bg-pink-500 active:text-black"
          >
            ◀
          </button>
          <button
            onTouchStart={() => onMoveButtonDown('s')}
            onTouchEnd={() => onMoveButtonUp('s')}
            className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-pink-500/70 text-white font-mono text-lg font-bold flex items-center justify-center active:bg-pink-500 active:text-black"
          >
            ▼
          </button>
          <button
            onTouchStart={() => onMoveButtonDown('d')}
            onTouchEnd={() => onMoveButtonUp('d')}
            className="w-11 h-11 rounded-sm bg-neutral-900/90 border border-pink-500/70 text-white font-mono text-lg font-bold flex items-center justify-center active:bg-pink-500 active:text-black"
          >
            ▶
          </button>
        </div>
      </div>
    </>
  );
};
