import React from 'react';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  X,
  ExternalLink,
  Github,
  Shield,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Target,
  Cpu,
  Layers,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface MissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: ProjectItem | null;
  currentIndex: number;
  totalMissions: number;
  onNextMission: () => void;
  onPrevMission: () => void;
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({
  isOpen,
  onClose,
  mission,
  currentIndex,
  totalMissions,
  onNextMission,
  onPrevMission,
}) => {
  if (!isOpen || !mission) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in zoom-in-95 duration-200 font-sans">
      <div className="absolute inset-0 gta-scanlines pointer-events-none opacity-30" />

      {/* Main Mission Briefing Card */}
      <div className="relative w-full max-w-3xl bg-neutral-950 border-2 border-pink-500 rounded-sm shadow-[0_0_50px_rgba(236,0,140,0.6)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/95 border-b border-pink-500/40">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            <div>
              <div className="font-hud text-xs font-black text-pink-400 tracking-widest uppercase flex items-center gap-2">
                <span>MISSION DOSSIER #{String(currentIndex + 1).padStart(2, '0')} OF {totalMissions}</span>
                {mission.isFlagship && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[9px] font-hud">
                    FLAGSHIP SYSTEM
                  </span>
                )}
              </div>
              <div className="text-[10px] font-hud text-neutral-400">
                CENTRAL REPOSITORY DATABASE // CLASSIFIED OPERATIONS
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              gtaAudio.playBack();
              onClose();
            }}
            className="p-1 rounded bg-white/10 hover:bg-pink-600 text-white transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Mission Title & Tags */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-hud font-bold bg-pink-950 text-pink-300 border border-pink-500/40">
                {mission.category}
              </span>
              {mission.classification && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                  {mission.classification}
                </span>
              )}
              {mission.year && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-cyan-300 border border-cyan-500/30">
                  {mission.year}
                </span>
              )}
              {mission.status && (
                <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                  {mission.status}
                </span>
              )}
              {mission.bounty && (
                <span className="ml-auto text-xs font-hud font-bold text-[#55e055]">
                  BOUNTY: {mission.bounty}
                </span>
              )}
            </div>

            <h1 className="font-gta text-3xl sm:text-4xl md:text-5xl text-white tracking-wider">
              {mission.title}
            </h1>
          </div>

          {/* Mission Briefing Image */}
          <div className="relative rounded-sm overflow-hidden border border-pink-500/40 bg-black max-h-[320px]">
            <img
              src={mission.image}
              alt={mission.title}
              className="w-full h-[200px] sm:h-[280px] object-cover filter contrast-110 saturate-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {mission.verifiedMetrics && (
              <div className="absolute top-3 right-3 bg-black/80 border border-pink-500/60 px-2.5 py-1 rounded text-[11px] font-mono text-pink-300 backdrop-blur-md">
                ★ {mission.verifiedMetrics}
              </div>
            )}
          </div>

          {/* Mission Objectives & Overview */}
          <div className="space-y-2">
            <div className="text-xs font-hud font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>MISSION BRIEFING & EXECUTIVE OVERVIEW:</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal bg-neutral-900/60 p-4 rounded border border-white/5">
              {mission.description}
            </p>
          </div>

          {/* Problem & Solution Dual Briefing */}
          {(mission.problem || mission.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mission.problem && (
                <div className="p-4 rounded bg-red-950/20 border border-red-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-hud font-bold text-red-400 tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>THE PROBLEM & RISK:</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{mission.problem}</p>
                </div>
              )}

              {mission.solution && (
                <div className="p-4 rounded bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-hud font-bold text-emerald-400 tracking-wider">
                    <Zap className="w-3.5 h-3.5" />
                    <span>THE ARCHITECTURAL SOLUTION:</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{mission.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Architecture & Flow */}
          {mission.architecture && (
            <div className="space-y-2">
              <div className="text-xs font-hud font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>SYSTEM ARCHITECTURE & PIPELINE:</span>
              </div>
              <div className="font-mono text-xs text-pink-300 bg-neutral-900/90 p-3 rounded border border-white/10 break-words leading-relaxed">
                {mission.architecture}
              </div>
            </div>
          )}

          {/* Key Features */}
          {mission.keyFeatures && mission.keyFeatures.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-hud font-bold text-pink-400 tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>KEY OPERATIONAL CAPABILITIES:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mission.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-neutral-300 bg-black/40 p-2.5 rounded border border-white/5"
                  >
                    <span className="text-pink-400 font-bold">▶</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Loadout */}
          <div className="space-y-2">
            <div className="text-xs font-hud font-bold text-pink-400 tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>TACTICAL TECH LOADOUT:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.technologies.map((tech, tIdx) => (
                <span
                  key={`${mission.id}-${tech}-${tIdx}`}
                  className="px-2.5 py-1 rounded text-xs font-hud font-bold bg-white/5 border border-pink-500/30 text-pink-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {mission.github && (
              <a
                href={mission.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => gtaAudio.playSelect()}
                className="w-full sm:flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded font-hud font-bold text-xs tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>CLASSIFIED REPOSITORY</span>
              </a>
            )}

            {mission.demo && (
              <a
                href={mission.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => gtaAudio.playSelect()}
                className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded font-hud font-black text-xs tracking-widest flex items-center justify-center gap-2 border border-pink-400 shadow-[0_0_15px_rgba(236,0,140,0.6)] transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LAUNCH MISSION ENDPOINT</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Mission Stepper Footer */}
        <div className="px-6 py-3 bg-black/95 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              gtaAudio.playHover();
              onPrevMission();
            }}
            className="flex items-center gap-1 text-xs font-hud text-neutral-400 hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV MISSION</span>
          </button>

          <span className="text-[11px] font-hud text-pink-400 font-mono">
            MISSION {currentIndex + 1} / {totalMissions}
          </span>

          <button
            onClick={() => {
              gtaAudio.playHover();
              onNextMission();
            }}
            className="flex items-center gap-1 text-xs font-hud text-neutral-400 hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-white/10 transition-colors"
          >
            <span>NEXT MISSION</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
