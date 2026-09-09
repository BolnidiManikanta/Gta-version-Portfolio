import React from 'react';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { X, ExternalLink, Github, Award, Shield, CheckCircle2, Star, ChevronRight, ChevronLeft } from 'lucide-react';

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
      <div className="relative w-full max-w-2xl bg-neutral-950 border-2 border-pink-500 rounded-sm shadow-[0_0_50px_rgba(236,0,140,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/90 border-b border-pink-500/40">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            <div>
              <div className="font-hud text-xs font-black text-pink-400 tracking-widest uppercase">
                MISSION DOSSIER #{String(currentIndex + 1).padStart(2, '0')} OF {totalMissions}
              </div>
              <div className="text-[10px] font-hud text-neutral-400">
                VICE CITY DATABASE // CLASSIFIED OPERATIONS
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
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Mission Title & Category */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-pink-950 text-pink-300 border border-pink-500/40">
                {mission.category}
              </span>
              <span className="text-xs font-hud text-neutral-400">
                DIFFICULTY: <span className="text-amber-400 font-bold">{mission.difficulty}</span>
              </span>
            </div>
            <h2 className="font-vice text-3xl sm:text-4xl text-white">
              {mission.title}
            </h2>
          </div>

          {/* Mission Media Preview */}
          <div className="relative h-48 sm:h-56 rounded-sm overflow-hidden border border-pink-500/30 group">
            <img
              src={mission.image}
              alt={mission.title}
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Mission Complete Stamp Banner */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/60 px-3 py-1.5 rounded backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-hud text-xs font-black text-emerald-300 tracking-wider">
                MISSION STATUS: {mission.status}
              </span>
              <span className="text-[10px] font-hud text-emerald-400 font-mono ml-2">
                BOUNTY: {mission.bounty}
              </span>
            </div>
          </div>

          {/* Mission Objectives / Description */}
          <div className="space-y-2">
            <div className="text-xs font-hud font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>MISSION BRIEFING & OBJECTIVES:</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans bg-black/50 p-3.5 rounded border border-white/10">
              {mission.description}
            </p>
          </div>

          {/* Tech Loadout */}
          <div className="space-y-2">
            <div className="text-xs font-hud font-bold text-pink-400 tracking-wider">
              TACTICAL TECH LOADOUT:
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.technologies.map((tech) => (
                <span
                  key={tech}
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
                className="w-full sm:flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded font-hud font-bold text-xs tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
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
                className="w-full sm:flex-1 py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded font-hud font-black text-xs tracking-widest flex items-center justify-center gap-2 border border-pink-400 shadow-[0_0_15px_rgba(236,0,140,0.6)] transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LAUNCH MISSION ENDPOINT</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Mission Stepper Footer */}
        <div className="px-6 py-3 bg-black/90 border-t border-white/10 flex items-center justify-between">
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
