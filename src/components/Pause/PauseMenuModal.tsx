import React, { useState } from 'react';
import { TimeOfDay, AppMode, DistrictId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  Play,
  Map,
  Phone,
  ListOrdered,
  User,
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  FileText,
  RotateCcw,
  Film,
  X,
  BookOpen,
  Briefcase,
  Terminal,
  FolderGit2,
} from 'lucide-react';

interface PauseMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMap: () => void;
  onOpenPhone: () => void;
  onSelectDistrict: (district: DistrictId) => void;
  onOpenSkills?: () => void;
  onOpenProjects?: () => void;
  appMode: AppMode;
  onToggleAppMode: () => void;
  timeOfDay: TimeOfDay;
  onCycleTimeOfDay: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
  onRebootIntro: () => void;
  onReplayWalkingIntro?: () => void;
}

export const PauseMenuModal: React.FC<PauseMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenMap,
  onOpenPhone,
  onSelectDistrict,
  onOpenSkills,
  onOpenProjects,
  appMode,
  onToggleAppMode,
  timeOfDay,
  onCycleTimeOfDay,
  isRadioPlaying,
  onToggleRadio,
  onRebootIntro,
  onReplayWalkingIntro,
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'audio'>('main');

  if (!isOpen) return null;

  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'day':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'sunset':
        return <Sunset className="w-4 h-4 text-orange-400" />;
      case 'dusk':
        return <Sunset className="w-4 h-4 text-pink-400" />;
      case 'night':
        return <Moon className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-150 font-sans">
      <div className="absolute inset-0 gta-scanlines pointer-events-none opacity-30" />

      {/* Main Pause Box */}
      <div className="relative w-full max-w-xl bg-neutral-950 border-2 border-pink-500 rounded-sm shadow-[0_0_60px_rgba(236,0,140,0.6)] p-6 sm:p-8 space-y-6">
        {/* Giant Pause Header */}
        <div className="text-center border-b border-pink-500/30 pb-4">
          <div className="text-xs font-hud text-cyan-400 tracking-[0.4em] uppercase">
            VICE CITY DATABASE • SUSPENDED
          </div>
          <h1 className="font-vice text-6xl sm:text-7xl text-pink-500 drop-shadow-[0_0_30px_rgba(236,0,140,0.9)] tracking-wider">
            PAUSED
          </h1>
        </div>

        {/* Menu Buttons List */}
        <div className="space-y-2 font-hud text-xs sm:text-sm font-bold tracking-wider">
          {/* 1. Resume */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onClose();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-pink-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-pink-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Play className="w-4 h-4 text-pink-400 group-hover:text-white" />
              <span>RESUME GAME</span>
            </div>
            <span className="text-[10px] text-neutral-400 group-hover:text-white">[ESC]</span>
          </button>

          {/* 2. City Map */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onClose();
              onOpenMap();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-cyan-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-cyan-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Map className="w-4 h-4 text-cyan-400 group-hover:text-white" />
              <span>VICE CITY SATELLITE MAP</span>
            </div>
            <span className="text-[10px] text-neutral-400 group-hover:text-white">[M]</span>
          </button>

          {/* 3. In-Game Phone */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onClose();
              onOpenPhone();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-purple-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-purple-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-purple-400 group-hover:text-white" />
              <span>IN-GAME COMMS PHONE</span>
            </div>
            <span className="text-[10px] text-neutral-400 group-hover:text-white">[P]</span>
          </button>

          {/* 4. Player Attributes */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onSelectDistrict('player_hq');
              onClose();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-pink-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-pink-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-pink-400 group-hover:text-white" />
              <span>PLAYER PROFILE & ATTRIBUTES</span>
            </div>
            <span className="text-[10px] text-neutral-400 group-hover:text-white">HQ</span>
          </button>

          {/* Dedicated Skills Arsenal */}
          {onOpenSkills && (
            <button
              onClick={() => {
                gtaAudio.playSelect();
                onOpenSkills();
                onClose();
              }}
              onMouseEnter={() => gtaAudio.playHover()}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-[#ec008c] text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-pink-400 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-pink-400 group-hover:text-white" />
                <span>SKILLS ARSENAL</span>
              </div>
              <span className="text-[10px] text-pink-300 group-hover:text-white font-mono">/skills</span>
            </button>
          )}

          {/* Dedicated Project Vault */}
          {onOpenProjects && (
            <button
              onClick={() => {
                gtaAudio.playSelect();
                onOpenProjects();
                onClose();
              }}
              onMouseEnter={() => gtaAudio.playHover()}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-[#ec008c] text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-pink-400 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4 text-pink-400 group-hover:text-white" />
                <span>PROJECT VAULT (25 REPOSITORIES)</span>
              </div>
              <span className="text-[10px] text-pink-300 group-hover:text-white font-mono">/projects</span>
            </button>
          )}

          {/* Research Publications District */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onSelectDistrict('career_district');
              onClose();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-purple-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-purple-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-purple-400 group-hover:text-white" />
              <span>RESEARCH PUBLICATIONS & PAPERS</span>
            </div>
            <span className="text-[10px] text-purple-300 group-hover:text-white">IEEE</span>
          </button>

          {/* Services & Engineering Specs District */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onSelectDistrict('dev_district');
              onClose();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-blue-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-blue-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-blue-400 group-hover:text-white" />
              <span>ENGINEERING SERVICES & SPECS</span>
            </div>
            <span className="text-[10px] text-blue-300 group-hover:text-white">DEV</span>
          </button>

          {/* 5. Switch Mode: Game vs Quick Portfolio */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onToggleAppMode();
              onClose();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-950/60 to-purple-950/60 hover:from-pink-600 hover:to-purple-600 text-white rounded flex items-center justify-between transition-colors border border-pink-500/50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-pink-300 group-hover:text-white" />
              <span>
                MODE: {appMode === 'game' ? 'SWITCH TO QUICK PORTFOLIO' : 'SWITCH TO GAME WORLD'}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-white/20 rounded">
              {appMode === 'game' ? 'GAME ACTIVE' : 'PORTFOLIO ACTIVE'}
            </span>
          </button>

          {/* 6. Atmosphere / Day-Night Cycle */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onCycleTimeOfDay();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-amber-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-amber-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {getTimeIcon()}
              <span>ATMOSPHERE / TIME: {timeOfDay.toUpperCase()}</span>
            </div>
            <span className="text-[10px] text-neutral-400 group-hover:text-white">[CLICK TO CYCLE]</span>
          </button>

          {/* 7. Radio & Sound */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onToggleRadio();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-emerald-600 text-white rounded flex items-center justify-between transition-colors border border-white/10 hover:border-emerald-400 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {isRadioPlaying ? (
                <Volume2 className="w-4 h-4 text-emerald-400 group-hover:text-white" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              )}
              <span>SYNTHWAVE RADIO: {isRadioPlaying ? 'PLAYING' : 'MUTED'}</span>
            </div>
            <span className="text-[10px] text-neutral-400 group-hover:text-white">[M KEY]</span>
          </button>

          {/* 8. Replay Cinematic Intro */}
          {onReplayWalkingIntro && (
            <button
              onClick={() => {
                gtaAudio.playSelect();
                onClose();
                onReplayWalkingIntro();
              }}
              onMouseEnter={() => gtaAudio.playHover()}
              className="w-full py-2.5 px-4 bg-pink-950/40 hover:bg-pink-600 text-pink-200 hover:text-white rounded flex items-center justify-between transition-colors border border-pink-500/40 hover:border-pink-400 cursor-pointer group shadow-[0_0_15px_rgba(236,0,140,0.3)]"
            >
              <div className="flex items-center gap-3">
                <Film className="w-4 h-4 text-pink-400 group-hover:text-white" />
                <span>REPLAY CINEMATIC INTRO</span>
              </div>
              <span className="text-[10px] text-pink-300 group-hover:text-white">[INTRO]</span>
            </button>
          )}

          {/* 9. Reboot Game Bootloader */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onClose();
              onRebootIntro();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-red-600 text-neutral-400 hover:text-white rounded flex items-center justify-between transition-colors border border-white/10 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4" />
              <span>RESTART INTRO BOOTLOADER</span>
            </div>
            <span className="text-[10px]">[REBOOT]</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-white/10 text-center text-[10px] font-hud text-neutral-500">
          PRESS [ESC] TO RESUME EXPLORATION
        </div>
      </div>
    </div>
  );
};
