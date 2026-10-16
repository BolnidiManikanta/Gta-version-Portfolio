import React, { useState, useEffect } from 'react';
import { DistrictId } from '../../types';
import { summaryStats } from '../../data/portfolioData';
import { HOMEPAGE_BACKGROUND_IMAGE, ABOUT_PAGE_IMAGE } from '../../config/backgroundTheme';
import { gtaAudio } from '../../utils/audio';
import {
  Volume2,
  VolumeX,
  Radio,
  Play,
  Heart,
  Shield,
  Layers,
  MapPin,
  Compass,
  FileText,
  Sparkles,
  Terminal,
  Film,
} from 'lucide-react';

interface GameBootScreenProps {
  onStartGame: (district?: DistrictId) => void;
  onQuickPortfolio: () => void;
  onOpenSkills: () => void;
  onOpenProjects?: () => void;
  onOpenExperience?: () => void;
  onOpenAchievements?: () => void;
  onOpenServices?: () => void;
  onOpenContact?: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
  customHeroPhoto?: string;
  onReturnToWalkingIntro?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  badge?: string;
  district?: DistrictId;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'start', label: 'ENTER WORLD', district: 'player_hq' },
  { id: 'skills', label: 'SKILLS', badge: 'TECHNICAL' },
  { id: 'recruiter', label: 'RECRUITER SCAN', badge: 'QUICK' },
  { id: 'projects', label: 'PROJECT VAULT', badge: '25 REPOS', district: 'ai_lab' },
  { id: 'services', label: 'SERVICES & SPECS', badge: 'OFFERINGS', district: 'dev_district' },
  { id: 'experience', label: 'CAREER & LEADERSHIP', badge: '500+ IMP', district: 'career_district' },
  { id: 'achievements', label: 'ACHIEVEMENTS & CERTS', badge: '17 CERTS', district: 'achievement_hq' },
  { id: 'contact', label: 'CONTACT TERMINAL', district: 'comms_center' },
];

const DEFAULT_HERO_IMAGE = HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png';

export const GameBootScreen: React.FC<GameBootScreenProps> = ({
  onStartGame,
  onQuickPortfolio,
  onOpenSkills,
  onOpenProjects,
  onOpenExperience,
  onOpenAchievements,
  onOpenServices,
  onOpenContact,
  isRadioPlaying,
  onToggleRadio,
  customHeroPhoto,
  onReturnToWalkingIntro,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('6:46 PM');
  const [isMuted, setIsMuted] = useState(false);

  // Live in-game clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setCurrentTime(`${hours}:${formattedMin} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (idx: number) => {
    const item = MENU_ITEMS[idx];
    gtaAudio.playSelect();
    if (item.id === 'start') {
      onStartGame('player_hq');
    } else if (item.id === 'skills') {
      onOpenSkills();
    } else if (item.id === 'projects') {
      if (onOpenProjects) {
        onOpenProjects();
      } else if (item.district) {
        onStartGame(item.district);
      }
    } else if (item.id === 'experience') {
      if (onOpenExperience) {
        onOpenExperience();
      } else if (item.district) {
        onStartGame(item.district);
      }
    } else if (item.id === 'achievements') {
      if (onOpenAchievements) {
        onOpenAchievements();
      } else if (item.district) {
        onStartGame(item.district);
      }
    } else if (item.id === 'services') {
      if (onOpenServices) {
        onOpenServices();
      } else if (item.district) {
        onStartGame(item.district);
      }
    } else if (item.id === 'contact') {
      if (onOpenContact) {
        onOpenContact();
      } else if (item.district) {
        onStartGame(item.district);
      }
    } else if (item.id === 'recruiter') {
      onQuickPortfolio();
    } else if (item.district) {
      onStartGame(item.district);
    }
  };

  // Keyboard navigation [↑/↓], [Enter], [M], [ESC]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = (prev + 1) % MENU_ITEMS.length;
          gtaAudio.playHover();
          return next;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
          gtaAudio.playHover();
          return next;
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect(selectedIndex);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        onToggleRadio();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onQuickPortfolio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onToggleRadio, onQuickPortfolio]);

  const homepageBackground = HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png';
  const heroImageSrc = customHeroPhoto || DEFAULT_HERO_IMAGE;

  return (
    <div className="relative w-screen min-h-screen text-white font-sans overflow-x-hidden select-none flex flex-col justify-between bg-black">
      {/* Background Atmosphere - Homepage Background PNG */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={homepageBackground}
          alt="Bolnidi Manikanta Homepage Background"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/homepage%20background.png' && target.src !== '/homepage-background.png') {
              target.src = '/homepage%20background.png';
            }
          }}
          className="w-full h-full object-cover object-center lg:object-[68%_center] filter contrast-105 brightness-95 saturate-105 transition-all duration-700"
        />

        {/* Cinematic Vignette and Left-Side Text Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent w-full lg:w-3/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Subtle CRT Scanlines & Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 gta-scanlines opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-0 gta-vignette" />

      {/* TOP BAR / HUD */}
      <header className="relative z-20 w-full px-4 sm:px-8 pt-4 pb-2 flex items-start justify-end pointer-events-auto">
        {/* Top Right Cluster: World Mode, Radio, Clock, Cash, Wanted, Health */}
        <div className="flex flex-col items-end gap-2">
          {/* Controls row */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            {/* CINEMATIC INTRO REPLAY */}
            {onReturnToWalkingIntro && (
              <button
                id="start-screen-walking-intro-btn"
                onClick={() => {
                  gtaAudio.playSelect();
                  onReturnToWalkingIntro();
                }}
                title="Replay Cinematic Intro Video"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/80 hover:bg-neutral-900 border border-cyan-500/70 text-cyan-300 hover:text-white font-hud text-xs tracking-wider font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                <span>CINEMATIC INTRO</span>
              </button>
            )}

            {/* DEDICATED SKILLS BUTTON */}
            <button
              id="start-screen-skills-btn"
              onClick={() => {
                gtaAudio.playSelect();
                onOpenSkills();
              }}
              title="Open Dedicated Skills Arsenal [/skills]"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-pink-950/70 hover:bg-pink-900/90 border border-pink-500/80 text-pink-200 hover:text-white font-hud text-xs tracking-wider font-bold transition-all shadow-[0_0_12px_rgba(236,0,140,0.4)] cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-pink-300" />
              <span>SKILLS</span>
            </button>

            {/* RECRUITER SCAN BUTTON */}
            <button
              id="start-screen-recruiter-scan-btn"
              onClick={() => {
                gtaAudio.playSelect();
                onQuickPortfolio();
              }}
              title="Open Fast Recruiter / Overview Mode [ESC]"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/80 text-purple-200 hover:text-white font-hud text-xs tracking-wider font-bold transition-all shadow-[0_0_12px_rgba(168,85,247,0.4)] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-purple-300" />
              <span>RECRUITER SCAN</span>
            </button>

            {/* CONTINUOUS WORLD BUTTON */}
            <button
              id="start-screen-continuous-world-btn"
              onClick={() => {
                gtaAudio.playSelect();
                onStartGame('player_hq');
              }}
              title="Enter Continuous World"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/80 text-pink-300 hover:text-white font-hud text-xs tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(236,0,140,0.4)] cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span>CONTINUOUS WORLD</span>
            </button>

            {/* RADIO STATUS TOGGLE */}
            <button
              id="start-screen-radio-toggle-btn"
              onClick={() => {
                gtaAudio.playSelect();
                onToggleRadio();
              }}
              title="Toggle GTA Radio [M]"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-hud tracking-wider transition-all cursor-pointer ${
                isRadioPlaying
                  ? 'bg-pink-600/80 border-white text-white shadow-[0_0_15px_rgba(236,0,140,0.8)] animate-pulse'
                  : 'bg-black/70 border-white/20 text-neutral-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{isRadioPlaying ? 'RADIO ON' : 'RADIO OFF'}</span>
            </button>

            {/* SOUND MUTE TOGGLE */}
            <button
              id="start-screen-mute-toggle-btn"
              onClick={() => {
                const next = !isMuted;
                setIsMuted(next);
                gtaAudio.setMuted(next);
                if (!next) gtaAudio.playSelect();
              }}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-1.5 rounded bg-black/70 border border-white/20 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-pink-400" />
              )}
            </button>

            {/* Clock & Location */}
            <div className="flex flex-col items-end justify-center pl-1">
              <span className="font-hud text-xs font-bold text-white tracking-wider">
                {currentTime}
              </span>
              <span className="text-[9px] font-hud text-cyan-400 tracking-widest uppercase">
                LOS SANTOS
              </span>
            </div>

            {/* Cash Counter */}
            <div className="font-mono text-xl sm:text-2xl font-black text-[#22c55e] tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.7)] ml-2">
              $2,450,000
            </div>
          </div>

          {/* Wanted Rating & Dual Health/Armor Bars */}
          <div className="flex flex-col items-end gap-1 w-full max-w-[280px]">
            {/* Wanted Stars */}
            <div className="flex items-center gap-2">
              <span className="font-hud text-[10px] text-neutral-400 tracking-widest uppercase font-bold">
                WANTED
              </span>
              <div className="flex items-center gap-0.5 text-xs">
                <span className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]">★</span>
                <span className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]">★</span>
                <span className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]">★</span>
                <span className="text-neutral-700">★</span>
                <span className="text-neutral-700">★</span>
              </div>
            </div>

            {/* Dual Health (Green) & Armor (Cyan) Bars */}
            <div className="flex items-center gap-2 w-full">
              {/* Health */}
              <div className="flex items-center gap-1 flex-1">
                <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                <div className="h-1.5 flex-1 bg-neutral-900/90 rounded-full overflow-hidden border border-white/20">
                  <div className="h-full bg-emerald-400 rounded-full w-[94%] shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </div>
              </div>
              {/* Armor */}
              <div className="flex items-center gap-1 flex-1">
                <Shield className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <div className="h-1.5 flex-1 bg-neutral-900/90 rounded-full overflow-hidden border border-white/20">
                  <div className="h-full bg-cyan-400 rounded-full w-[88%] shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN BODY: LEFT MENU & CENTER/RIGHT CHARACTER CARD */}
      <main className="relative z-10 w-full flex-1 px-4 sm:px-8 md:px-12 py-2 flex flex-col lg:flex-row items-center justify-between gap-6 max-w-7xl mx-auto my-auto">
        {/* LEFT COLUMN: LOGO & VERTICAL MENU */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-5">
          {/* Header Title: MANIKANTA BUILDS */}
          <div className="space-y-1 w-full max-w-md">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-normal leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              MANIKANTA
            </h1>
            <div className="flex items-center w-full">
              <span className="font-gta text-2xl sm:text-3xl font-bold tracking-widest text-[#ec008c] drop-shadow-[0_0_10px_rgba(236,0,140,0.6)]">
                BUILDS
              </span>
              <div className="h-[2px] bg-[#ec008c] flex-1 ml-4 shadow-[0_0_10px_rgba(236,0,140,0.8)]" />
            </div>

            {/* Verified Statistics Quick Pill Strip */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-neutral-300">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-pink-500/40 text-pink-300 font-bold">
                {summaryStats.repositories} Repos
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-purple-500/40 text-purple-300 font-bold">
                {summaryStats.certifications} Certs
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-cyan-500/40 text-cyan-300 font-bold">
                {summaryStats.publications} Research Papers
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-emerald-500/40 text-emerald-300 font-bold">
                {summaryStats.studentsLeadership} Impact
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-yellow-500/40 text-yellow-300 font-bold">
                CGPA {summaryStats.cgpa}
              </span>
            </div>
          </div>

          {/* Menu Items Stack */}
          <div className="w-full max-w-sm space-y-1.5 pt-2">
            {MENU_ITEMS.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={item.id}
                  id={`start-menu-${item.id}`}
                  onMouseEnter={() => {
                    if (selectedIndex !== idx) {
                      setSelectedIndex(idx);
                      gtaAudio.playHover();
                    }
                  }}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex items-center justify-between px-5 py-3 transition-all duration-150 text-left cursor-pointer group rounded-sm ${
                    isSelected
                      ? 'bg-[#ec008c] text-white shadow-[0_0_25px_rgba(236,0,140,0.8)] translate-x-1.5'
                      : 'bg-black/75 hover:bg-neutral-900/90 text-white/90 hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 font-gta text-xl sm:text-2xl tracking-wider uppercase font-bold">
                    {isSelected ? (
                      <span className="text-white text-base animate-pulse">▶</span>
                    ) : (
                      <span className="opacity-0 w-3">▶</span>
                    )}
                    <span>{item.label}</span>
                  </div>

                  {/* Optional Badge (e.g. 15+ for projects) */}
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono font-black ${
                        isSelected
                          ? 'bg-black/40 text-white border border-white/40'
                          : 'bg-[#ec008c] text-white shadow-[0_0_10px_rgba(236,0,140,0.8)]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: HERO CHARACTER SHOWCASE & GTA SPEC BADGE */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-end self-end pb-2 pointer-events-auto">
          {/* If the user explicitly provided a custom portrait upload, show it */}
          {customHeroPhoto ? (
            <div className="relative w-full max-w-sm bg-black/80 backdrop-blur-md rounded border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.95)] overflow-hidden mb-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img
                  src={customHeroPhoto}
                  alt="Bolnidi Manikanta"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          ) : null}

          {/* Authentic Los Santos License Plate & Bolnidi Special Edition Glassmorphic HUD Badge */}
          <div className="bg-black/75 backdrop-blur-md px-5 py-3 rounded-lg border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4 max-w-sm w-full">
            <div className="space-y-0.5">
              <h3 className="font-gta text-lg sm:text-xl font-bold text-white tracking-wider uppercase leading-none">
                BOLNIDI SPECIAL EDITION
              </h3>
              <div className="font-mono text-[10px] sm:text-xs text-[#ec008c] tracking-widest font-bold uppercase">
                V8 TWIN-TURBO • CODE ENGINE
              </div>
              <div className="font-hud text-[9px] text-neutral-400 tracking-wider uppercase">
                FULL-STACK & AI RESEARCHER
              </div>
            </div>

            {/* GTA Los Santos Authentic License Plate Graphic */}
            <div className="relative w-24 sm:w-28 h-10 sm:h-11 bg-[#faf5d8] border-2 border-yellow-600/80 rounded flex flex-col items-center justify-center shadow-lg select-none px-1 overflow-hidden shrink-0">
              <div className="absolute top-0.5 left-1 w-1 h-1 rounded-full bg-neutral-800" />
              <div className="absolute top-0.5 right-1 w-1 h-1 rounded-full bg-neutral-800" />
              <div className="font-hud text-[7px] font-bold text-blue-900 tracking-wider uppercase leading-none">
                LOS SANTOS
              </div>
              <div className="font-gta text-base sm:text-lg font-black text-blue-950 tracking-widest uppercase leading-none mt-0.5">
                MANI 007
              </div>
              <div className="absolute bottom-0.5 right-1 w-2.5 h-1.5 bg-yellow-500 rounded-[1px] text-[4px] text-black font-bold flex items-center justify-center">
                26
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM TICKER / FOOTER */}
      <footer className="relative z-20 w-full px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-hud border-t border-white/10 bg-black/80 backdrop-blur-md">
        {/* Bottom Left: Radio Status Pill */}
        <button
          id="start-screen-radio-pill-btn"
          onClick={() => {
            gtaAudio.playSelect();
            onToggleRadio();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] tracking-wider font-bold transition-all cursor-pointer ${
            isRadioPlaying
              ? 'bg-pink-600/80 border-white text-white shadow-[0_0_15px_rgba(236,0,140,0.8)]'
              : 'bg-black/60 border-pink-500/50 text-pink-300 hover:text-white hover:border-pink-400'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>
            {isRadioPlaying
              ? 'RADIO: PLAYING [CLICK OR PRESS M]'
              : 'RADIO: OFF [CLICK OR PRESS M]'}
          </span>
        </button>

        {/* Center: Instruction Line & Controls Hints */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="text-[10px] text-neutral-400 tracking-wider">
            Press <span className="text-pink-400 font-bold font-mono">M</span> to start radio • Designed by Bolnidi Manikanta
          </div>

          <div className="bg-black/90 border border-white/20 px-3 py-1 rounded flex items-center gap-2 text-[10px] tracking-wider text-neutral-300">
            <span className="text-pink-400 font-bold">[↑/↓]</span>
            <span>NAVIGATE</span>
            <span className="text-neutral-600">•</span>
            <span className="text-cyan-400 font-bold">[ENTER]</span>
            <span>SELECT</span>
            <span className="text-neutral-600">•</span>
            <span className="text-pink-400 font-bold">[ESC]</span>
            <span>MENU</span>
            <span className="text-neutral-600">•</span>
            <span className="text-cyan-400 font-bold">[M]</span>
            <span>RADIO</span>
          </div>
        </div>

        {/* Bottom Right: Location & Version */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1 text-pink-400 font-bold tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span>LOCATION: DOWNTOWN LOS SANTOS</span>
          </div>
          <span className="text-neutral-500 font-mono">v2.0 PRO</span>
        </div>
      </footer>
    </div>
  );
};
