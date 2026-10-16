import React, { useState, useEffect } from 'react';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, Radio, Volume2, VolumeX, Home, Sparkles, Eye } from 'lucide-react';
import { HOMEPAGE_BACKGROUND_IMAGE } from '../../config/backgroundTheme';

interface CinematicShellProps {
  children: React.ReactNode;
  onBack: () => void;
  onGoHome?: () => void;
  isRadioPlaying?: boolean;
  onToggleRadio?: () => void;
  title?: string;
  badge?: string;
  backgroundImage?: string;
  highlightBackground?: boolean;
  hideDefaultBackground?: boolean;
  customEnvironment?: React.ReactNode;
}

export const CinematicShell: React.FC<CinematicShellProps> = ({
  children,
  onBack,
  onGoHome,
  isRadioPlaying = false,
  onToggleRadio,
  title = 'TECHNICAL ARSENAL',
  badge = 'VERIFIED LOADOUT',
  backgroundImage,
  highlightBackground = true,
  hideDefaultBackground = false,
  customEnvironment,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [timeString, setTimeString] = useState('09:45 PM');
  const [isHighlighted, setIsHighlighted] = useState(highlightBackground);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeString(`${hours}:${formattedMin} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const activeBg = backgroundImage || HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png';

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden select-none">
      {/* Cinematic Background Layer with Highlighting */}
      {hideDefaultBackground ? (
        customEnvironment ? (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {customEnvironment}
          </div>
        ) : null
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={activeBg}
            alt="Atmospheric Backdrop"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('project-vault-page.png')) {
                target.src = '/project%20vault%20page.png';
              } else if (target.src.includes('project%20vault%20page.png')) {
                target.src = '/project-vault-page.png';
              } else if (target.src.includes('leader-page.png')) {
                target.src = '/leader%20page.png';
              } else if (target.src.includes('leader%20page.png')) {
                target.src = '/leader-page.png';
              } else if (target.src.includes('experience-background-page.png')) {
                target.src = '/experience%20background%20page.png';
              } else if (target.src.includes('about-page.png')) {
                target.src = '/about%20page.png';
              } else if (target.src !== '/homepage%20background.png') {
                target.src = '/homepage%20background.png';
              }
            }}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              isHighlighted
                ? 'filter contrast-125 brightness-90 saturate-125 scale-100'
                : 'filter contrast-105 brightness-35 saturate-95 scale-100'
            }`}
          />
          
          {/* Highlight Ambient Neon Lighting Beams */}
          {isHighlighted && (
            <>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
            </>
          )}

          {/* Dynamic Vignette & Contrast Gradients */}
          <div 
            className={`absolute inset-0 transition-opacity duration-700 ${
              isHighlighted
                ? 'bg-gradient-to-t from-black/95 via-black/40 to-black/60 opacity-90'
                : 'bg-gradient-to-t from-black via-black/85 to-purple-950/40 opacity-100'
            }`} 
          />
          <div 
            className={`absolute inset-0 transition-opacity duration-700 ${
              isHighlighted
                ? 'bg-gradient-to-r from-black/80 via-transparent to-black/80 opacity-80'
                : 'bg-gradient-to-r from-black/90 via-black/60 to-black/90 opacity-100'
            }`} 
          />
        </div>
      )}

      {/* CRT Scanlines & Vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 gta-scanlines opacity-15" />
      <div className="fixed inset-0 pointer-events-none z-10 gta-vignette" />

      {/* Top Persistent HUD */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-black/85 backdrop-blur-md border-b border-pink-500/30 flex items-center justify-between">
        {/* Left: Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              gtaAudio.playBack();
              onBack();
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-[#ec008c] text-white rounded-xs border border-pink-500/50 hover:border-pink-300 font-hud text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(236,0,140,0.3)] active:scale-95"
            title="Return to Previous Screen [ESC]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ESC / BACK</span>
          </button>

          {onGoHome && (
            <button
              onClick={() => {
                gtaAudio.playSelect();
                onGoHome();
              }}
              onMouseEnter={() => gtaAudio.playHover()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xs border border-white/20 font-hud text-xs tracking-wider transition-all cursor-pointer"
              title="Return to Start Menu"
            >
              <Home className="w-3.5 h-3.5 text-pink-400" />
              <span>HOME</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="font-hud text-[11px] text-pink-400 font-bold uppercase tracking-widest">
              {title}
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-pink-950/80 border border-pink-500/40 text-[10px] font-hud text-pink-300 font-bold">
              {badge}
            </span>
          </div>
        </div>

        {/* Right: Controls, Highlight Toggle, Radio & Time */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Highlight Background Toggle */}
          <button
            onClick={() => {
              gtaAudio.playSelect();
              setIsHighlighted((prev) => !prev);
            }}
            onMouseEnter={() => gtaAudio.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border font-hud text-xs tracking-wider transition-all cursor-pointer ${
              isHighlighted
                ? 'bg-pink-950/70 border-pink-500 text-pink-300 shadow-[0_0_15px_rgba(236,0,140,0.4)]'
                : 'bg-black/70 border-white/20 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Backdrop Highlight"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">BACKDROP:</span>
            <span className="font-bold">{isHighlighted ? 'HIGHLIGHTED' : 'DIMMED'}</span>
          </button>

          {onToggleRadio && (
            <button
              onClick={() => {
                gtaAudio.playSelect();
                onToggleRadio();
              }}
              title={isRadioPlaying ? 'Mute GTA Radio [M]' : 'Play GTA Radio [M]'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border text-xs font-hud tracking-wider transition-all cursor-pointer ${
                isRadioPlaying
                  ? 'bg-pink-600/80 border-white text-white shadow-[0_0_15px_rgba(236,0,140,0.8)] animate-pulse'
                  : 'bg-black/70 border-white/20 text-neutral-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {isRadioPlaying ? 'RADIO ON' : 'RADIO OFF'}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              const next = !isMuted;
              setIsMuted(next);
              gtaAudio.setMuted(next);
              if (!next) gtaAudio.playSelect();
            }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded-xs bg-black/70 border border-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-pink-400" />
            )}
          </button>

          <div className="px-2.5 py-1 bg-black/70 border border-white/10 rounded-xs font-hud text-xs text-white tracking-wider">
            {timeString}
          </div>
        </div>
      </header>

      {/* Main Children Body Content */}
      <main className="relative z-20 w-full min-h-[calc(100vh-60px)]">
        {children}
      </main>
    </div>
  );
};
