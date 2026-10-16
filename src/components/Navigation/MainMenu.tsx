import React, { useEffect, useRef } from 'react';
import { SectionId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { Shield, ChevronRight, Zap } from 'lucide-react';

interface MainMenuProps {
  currentSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenContinuousWorld?: () => void;
}

interface MenuItem {
  id: SectionId;
  label: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'start', label: 'START GAME' },
  { id: 'about', label: 'ABOUT ME' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS', badge: '25' },
  { id: 'research', label: 'RESEARCH', badge: '4' },
  { id: 'services', label: 'SERVICES' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'achievements', label: 'ACHIEVEMENTS', badge: '17' },
  { id: 'academy', label: 'ACADEMY', badge: '8.6' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'exit', label: 'EXIT GAME' },
];

export const MainMenu: React.FC<MainMenuProps> = ({
  currentSection,
  onSelectSection,
  onOpenContinuousWorld,
}) => {
  const selectedIndex = MENU_ITEMS.findIndex((item) => item.id === currentSection);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation support: Up, Down, Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp') {
        const nextIndex = selectedIndex > 0 ? selectedIndex - 1 : MENU_ITEMS.length - 1;
        gtaAudio.playHover();
        onSelectSection(MENU_ITEMS[nextIndex].id);
      } else if (e.key === 'ArrowDown') {
        const nextIndex = selectedIndex < MENU_ITEMS.length - 1 ? selectedIndex + 1 : 0;
        gtaAudio.playHover();
        onSelectSection(MENU_ITEMS[nextIndex].id);
      } else if (e.key === 'Enter') {
        gtaAudio.playSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelectSection]);

  return (
    <div
      ref={menuContainerRef}
      className="flex flex-col justify-start z-30 w-full max-w-[340px] sm:max-w-[380px] select-none"
    >
      {/* GTA Branding / Logo */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="font-gta text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-wider leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            MANIKANTA
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-gta text-3xl sm:text-4xl text-[#ec008c] tracking-widest leading-none drop-shadow-[0_2px_8px_rgba(236,0,140,0.8)]">
            BUILDS
          </span>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-[#ec008c] to-transparent ml-2" />
        </div>
      </div>

      {/* GTA In-Game Menu List */}
      <div className="flex flex-col space-y-1.5 sm:space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                gtaAudio.playSelect();
                onSelectSection(item.id);
              }}
              onMouseEnter={() => {
                gtaAudio.playHover();
              }}
              className={`group relative text-left transition-all duration-150 py-1.5 sm:py-2 px-3 sm:px-4 cursor-pointer flex items-center justify-between ${
                isActive
                  ? 'bg-[#ec008c] text-white font-black shadow-[0_0_20px_rgba(236,0,140,0.7)] translate-x-1.5'
                  : 'bg-black/60 hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm'
              }`}
            >
              {/* Left Active Arrow Indicator */}
              <div className="flex items-center gap-2.5">
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white fill-white animate-pulse" />
                )}
                <span
                  className={`font-gta text-xl sm:text-2xl md:text-3xl tracking-wider leading-none ${
                    isActive ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Badge if available */}
              {item.badge && (
                <span
                  className={`font-hud text-[10px] px-1.5 py-0.5 font-bold uppercase rounded-xs ${
                    isActive ? 'bg-black text-pink-400' : 'bg-[#ec008c]/80 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Glowing border accent on active item */}
              {isActive && (
                <div className="absolute inset-0 border border-white/40 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* ONE CONTINUOUS WORLD: Cinematic Transition Sequence Launcher */}
      <button
        onClick={() => {
          gtaAudio.playSelect();
          onOpenContinuousWorld?.();
        }}
        onMouseEnter={() => gtaAudio.playHover()}
        className="mt-3 w-full py-2 px-3 bg-gradient-to-r from-pink-950/80 via-black/90 to-purple-950/80 border border-pink-500/60 hover:border-pink-400 hover:bg-pink-600/30 text-white flex items-center justify-between cursor-pointer transition-all shadow-lg group select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-base group-hover:scale-110 transition-transform">🎬</span>
          <div className="text-left">
            <div className="font-gta text-lg leading-none tracking-wider text-white group-hover:text-pink-300">
              ONE CONTINUOUS WORLD
            </div>
            <div className="font-hud text-[9px] text-pink-300/80 tracking-widest">
              CINEMATIC STORY PIPELINE
            </div>
          </div>
        </div>
        <span className="font-hud text-[9px] bg-pink-600 text-white font-bold px-1.5 py-0.5 rounded-xs animate-pulse">
          STORY MODE
        </span>
      </button>

      {/* Bottom HUD Metadata Box (as seen in video frame 00:00 - 00:04) */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-3.5 bg-black/75 backdrop-blur-md border border-pink-500/40 shadow-2xl rounded-xs">
        <div className="flex items-center justify-between border-b border-pink-500/30 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5 text-[#ec008c] font-hud text-xs font-bold tracking-wider">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>SELECT TO ENTER</span>
          </div>
          <span className="font-hud text-[10px] text-white/60 tracking-wider">
            MISSION V2.4
          </span>
        </div>

        <div className="text-[11px] font-hud text-white/80 space-y-1">
          <div className="flex justify-between">
            <span className="text-white/50">ACTIVE AGENT:</span>
            <span className="text-pink-400 font-bold">BOLNIDI MANIKANTA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">SPECIALIZATION:</span>
            <span className="text-cyan-400">AI • CYBER • FULL STACK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">VERIFIED METRICS:</span>
            <span className="text-amber-400 font-bold">25 REPOS • 17 CERTS • 8.6 CGPA</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-white/10">
            <span className="text-white/50">STATUS:</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              <Shield className="w-3 h-3 text-emerald-400" />
              AVAILABLE FOR MISSIONS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
