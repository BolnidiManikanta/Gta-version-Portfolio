import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Map, Phone, Pause, FileText, Gamepad2, Home, Terminal, FolderGit2 } from 'lucide-react';
import { DistrictId, AppMode } from '../../types';
import { DISTRICTS_DATA } from '../../data/districtsData';
import { gtaAudio } from '../../utils/audio';

interface TopHUDProps {
  currentDistrict: DistrictId;
  appMode: AppMode;
  onToggleAppMode: () => void;
  onOpenSkills?: () => void;
  onOpenProjects?: () => void;
  onOpenMap: () => void;
  onOpenPhone: () => void;
  onOpenPause: () => void;
  onRadioToggle: () => void;
  isRadioPlaying: boolean;
  onGoHome: () => void;
  onReturnToWalkingIntro?: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  currentDistrict,
  appMode,
  onToggleAppMode,
  onOpenSkills,
  onOpenProjects,
  onOpenMap,
  onOpenPhone,
  onOpenPause,
  onRadioToggle,
  isRadioPlaying,
  onGoHome,
  onReturnToWalkingIntro,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('09:42 PM');
  const [cash] = useState<string>('$2,450,000');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    gtaAudio.setMuted(nextMuted);
    if (!nextMuted) {
      gtaAudio.playSelect();
    }
  };

  const district = DISTRICTS_DATA[currentDistrict] || DISTRICTS_DATA['player_hq'];

  return (
    <div className="fixed top-2 left-2 right-2 sm:top-4 sm:left-6 sm:right-6 z-40 flex items-start justify-between pointer-events-none select-none">
      {/* Top Left: Player Level & Health/Armor Status Bar */}
      <div className="pointer-events-auto bg-black/80 backdrop-blur-md border border-pink-500/40 px-3.5 py-2 rounded shadow-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white font-hud font-black text-xs border border-pink-300">
          24
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between font-hud text-[10px] text-white">
            <span className="font-bold tracking-wider text-pink-400">BOLNIDI MANIKANTA</span>
            <span className="text-neutral-400 font-mono">LVL 24</span>
          </div>
          {/* Dual Bars: Health (Green) & Armor (Cyan) */}
          <div className="flex items-center gap-1.5 w-32 sm:w-40">
            <div className="h-1.5 flex-1 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-emerald-400 rounded-full w-[96%]" />
            </div>
            <div className="h-1.5 flex-1 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-cyan-400 rounded-full w-[88%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Right: Game Actions, Clock, Cash, and Mode Toggle */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Back to Home / Main Menu Button */}
        <button
          id="hud-home-button"
          onClick={() => {
            gtaAudio.playSelect();
            onGoHome();
          }}
          title="Return to Main Menu / Home Screen"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-pink-950/90 hover:bg-pink-600 border border-pink-500/80 text-pink-200 hover:text-white font-hud text-xs tracking-wider font-black transition-all cursor-pointer shadow-[0_0_15px_rgba(236,0,140,0.6)] active:scale-95"
        >
          <Home className="w-3.5 h-3.5 text-pink-300" />
          <span>HOME</span>
        </button>

        {/* Mode Switcher */}
        <button
          onClick={() => {
            gtaAudio.playSelect();
            onToggleAppMode();
          }}
          title="Switch between 3D Game World and Quick Recruiter Mode"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/80 hover:bg-white/10 border border-pink-500/40 text-pink-300 hover:text-white font-hud text-xs transition-all cursor-pointer shadow-lg"
        >
          {appMode === 'game' ? (
            <>
              <FileText className="w-3.5 h-3.5" />
              <span>RECRUITER MODE</span>
            </>
          ) : (
            <>
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>GAME WORLD</span>
            </>
          )}
        </button>

        {/* Skills Button */}
        {onOpenSkills && (
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onOpenSkills();
            }}
            title="Open Dedicated Skills Arsenal [/skills]"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-hud transition-all cursor-pointer shadow-lg ${
              appMode === 'skills'
                ? 'bg-[#ec008c] text-white border border-pink-300 font-bold shadow-[0_0_12px_rgba(236,0,140,0.6)]'
                : 'bg-black/80 hover:bg-pink-900/60 border border-pink-500/50 text-pink-300 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SKILLS</span>
          </button>
        )}

        {/* Project Vault Button */}
        {onOpenProjects && (
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onOpenProjects();
            }}
            title="Open Dedicated Project Vault [/projects]"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-hud transition-all cursor-pointer shadow-lg ${
              appMode === 'projects'
                ? 'bg-[#ec008c] text-white border border-pink-300 font-bold shadow-[0_0_12px_rgba(236,0,140,0.6)]'
                : 'bg-black/80 hover:bg-pink-900/60 border border-pink-500/50 text-pink-300 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PROJECTS</span>
          </button>
        )}

        {/* GPS Map Button */}
        <button
          onClick={() => {
            gtaAudio.playSelect();
            onOpenMap();
          }}
          title="Open Tactical GPS Map [M]"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-black/80 hover:bg-cyan-600 border border-cyan-500/50 text-cyan-300 hover:text-white font-hud text-xs transition-all cursor-pointer shadow-lg"
        >
          <Map className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">MAP [M]</span>
        </button>

        {/* Phone Button */}
        <button
          onClick={() => {
            gtaAudio.playPhone();
            onOpenPhone();
          }}
          title="Open In-Game Comms Phone [P]"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-black/80 hover:bg-pink-600 border border-pink-500/50 text-pink-300 hover:text-white font-hud text-xs transition-all cursor-pointer shadow-lg"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PHONE [P]</span>
        </button>

        {/* Radio Toggle */}
        <button
          onClick={() => {
            gtaAudio.playSelect();
            onRadioToggle();
          }}
          title={isRadioPlaying ? 'Mute Radio' : 'Play Radio'}
          className={`p-1.5 rounded border transition-all cursor-pointer shadow-lg ${
            isRadioPlaying
              ? 'bg-pink-600 border-white text-white animate-pulse'
              : 'bg-black/80 border-white/20 text-neutral-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
        </button>

        {/* Pause Button */}
        <button
          onClick={() => {
            gtaAudio.playPause();
            onOpenPause();
          }}
          title="Game Pause Menu [ESC]"
          className="p-1.5 rounded bg-black/80 hover:bg-white/10 border border-white/20 text-white transition-all cursor-pointer shadow-lg"
        >
          <Pause className="w-3.5 h-3.5" />
        </button>

        {/* Time & Cash Counter */}
        <div className="hidden lg:flex flex-col items-end bg-black/80 border border-white/10 px-3 py-1 rounded">
          <div className="font-hud text-xs text-white font-bold tracking-wider">
            {currentTime}
          </div>
          <div className="font-hud text-xs text-emerald-400 font-bold font-mono tracking-wider">
            {cash}
          </div>
        </div>
      </div>
    </div>
  );
};
