import React, { useState, useEffect } from 'react';
import { DistrictId } from '../../types';
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
} from 'lucide-react';

interface GameBootScreenProps {
  onStartGame: (district?: DistrictId) => void;
  onQuickPortfolio: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
  customHeroPhoto?: string;
}

interface MenuItem {
  id: string;
  label: string;
  badge?: string;
  district?: DistrictId;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'start', label: 'START GAME', district: 'player_hq' },
  { id: 'about', label: 'ABOUT ME', district: 'player_hq' },
  { id: 'skills', label: 'SKILLS', district: 'ai_lab' },
  { id: 'projects', label: 'PROJECTS', badge: '15+', district: 'ai_lab' },
  { id: 'experience', label: 'EXPERIENCE', district: 'career_district' },
  { id: 'achievements', label: 'ACHIEVEMENTS', district: 'achievement_hq' },
  { id: 'academy', label: 'ACADEMY', district: 'career_district' },
  { id: 'contact', label: 'CONTACT', district: 'comms_center' },
];

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85';

export const GameBootScreen: React.FC<GameBootScreenProps> = ({
  onStartGame,
  onQuickPortfolio,
  isRadioPlaying,
  onToggleRadio,
  customHeroPhoto,
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

  const heroImageSrc = customHeroPhoto || DEFAULT_HERO_IMAGE;

  return (
    <div className="relative w-screen min-h-screen bg-black text-white font-sans overflow-x-hidden select-none flex flex-col justify-between">
      {/* Background Dark Urban Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1920&auto=format&fit=crop&q=85"
          alt="Los Santos Safehouse"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-30 saturate-85 scale-105"
        />
        {/* Dark Vignette and Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />
      </div>

      {/* Subtle CRT Scanlines & Vignette */}
      <div className="fixed inset-0 pointer-events-none -z-10 gta-scanlines opacity-30" />
      <div className="fixed inset-0 pointer-events-none -z-10 gta-vignette" />

      {/* TOP BAR / HUD */}
      <header className="relative z-20 w-full px-4 sm:px-8 pt-4 pb-2 flex items-start justify-end pointer-events-auto">
        {/* Top Right Cluster: World Mode, Radio, Clock, Cash, Wanted, Health */}
        <div className="flex flex-col items-end gap-2">
          {/* Controls row */}
          <div className="flex items-center gap-2 sm:gap-3">
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

        {/* RIGHT COLUMN: PORTRAIT CHARACTER CARD & SPEC EDITION BADGE */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md sm:max-w-lg bg-neutral-950 rounded border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* Portrait Image with CRT overlay */}
            <div className="relative aspect-[4/5] sm:aspect-[4/4.5] w-full overflow-hidden bg-black">
              <img
                src={heroImageSrc}
                alt="Bolnidi Manikanta"
                className="w-full h-full object-cover object-top filter contrast-115 brightness-95 saturate-110"
              />
              {/* Scanlines & Inner shadow overlay */}
              <div className="absolute inset-0 gta-scanlines pointer-events-none opacity-20" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />
            </div>

            {/* Hot Pink Accent Divider */}
            <div className="w-full h-[3px] bg-[#ec008c] shadow-[0_0_10px_rgba(236,0,140,0.9)]" />

            {/* Card Footer: BOLNIDI SPECIAL EDITION & LICENSE PLATE */}
            <div className="bg-black/95 px-5 py-3.5 flex items-center justify-between border-t border-white/10">
              <div className="space-y-0.5">
                <h3 className="font-gta text-xl sm:text-2xl font-bold text-white tracking-wider uppercase leading-none">
                  BOLNIDI SPECIAL EDITION
                </h3>
                <div className="font-mono text-[11px] sm:text-xs text-[#ec008c] tracking-widest font-bold uppercase">
                  V8 TWIN-TURBO • CODE ENGINE
                </div>
              </div>

              {/* GTA Los Santos Authentic License Plate Graphic */}
              <div className="relative w-28 sm:w-32 h-11 sm:h-12 bg-[#faf5d8] border-2 border-yellow-600/80 rounded flex flex-col items-center justify-center shadow-lg select-none px-1 overflow-hidden">
                {/* Plate screws */}
                <div className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-neutral-800" />
                <div className="absolute top-1 right-1.5 w-1 h-1 rounded-full bg-neutral-800" />

                {/* State name */}
                <div className="font-hud text-[7px] sm:text-[8px] font-bold text-blue-900 tracking-wider uppercase leading-none">
                  LOS SANTOS
                </div>

                {/* Stamped Number */}
                <div className="font-gta text-lg sm:text-xl font-black text-blue-950 tracking-widest uppercase leading-none mt-0.5">
                  MANI 007
                </div>

                {/* Registration sticker */}
                <div className="absolute bottom-1 right-1.5 w-2.5 h-2 bg-yellow-500 rounded-[1px] text-[5px] text-black font-bold flex items-center justify-center">
                  26
                </div>
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
