import React, { useState } from 'react';
import { ProfileData, DistrictId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  User,
  Shield,
  Zap,
  Terminal,
  ChevronRight,
  Camera,
  MapPin,
  Sparkles,
  Award,
  Flame,
} from 'lucide-react';

interface PlayerHQDistrictViewProps {
  profile: ProfileData;
  customHeroPhoto?: string;
  onUpdateHeroPhoto: (url: string) => void;
  onSelectDistrict: (district: DistrictId) => void;
  onOpenPhone: () => void;
  onOpenMap: () => void;
}

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80';

export const PlayerHQDistrictView: React.FC<PlayerHQDistrictViewProps> = ({
  profile,
  customHeroPhoto,
  onUpdateHeroPhoto,
  onSelectDistrict,
  onOpenPhone,
  onOpenMap,
}) => {
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isCarHovered, setIsCarHovered] = useState(false);

  const heroImageSrc = customHeroPhoto || DEFAULT_HERO_IMAGE;

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-pink-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-pink-600/30 border border-pink-500 flex items-center justify-center text-pink-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-pink-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 01 // SAFE HOUSE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              PLAYER HQ & DOSSIER
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-pink-500/40 text-cyan-400 font-mono rounded">
            OCEAN DRIVE • SUITE 804
          </span>
        </div>
      </div>

      {/* Main Grid: Left Dossier & Attributes, Right Character Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-6 items-center">
        {/* Left Column: Player Stats & Attributes (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Identity Card */}
          <div className="bg-black/75 backdrop-blur-md border border-pink-500/40 p-5 rounded space-y-3 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-hud font-black bg-pink-600 text-white">
                  CHARACTER
                </span>
                <span className="font-hud text-xs text-neutral-400">LEVEL 24 • REPUTATION 99%</span>
              </div>
              <span className="font-hud text-xs text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR CONTRACTS
              </span>
            </div>

            <div>
              <h2 className="font-vice text-4xl sm:text-5xl text-white tracking-wide">
                {profile.name}
              </h2>
              <div className="font-hud text-xs sm:text-sm text-pink-400 font-bold tracking-wider mt-1">
                {profile.title}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {profile.bioFull}
            </p>

            {/* Specialization Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-1 rounded text-[11px] font-hud bg-white/5 border border-white/20 text-neutral-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Animated Player Attributes (Game Status Screen) */}
          <div className="bg-black/75 backdrop-blur-md border border-cyan-500/30 p-5 rounded space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-hud text-xs font-black text-cyan-400 tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>CORE COMBAT & TECH ATTRIBUTES</span>
              </span>
              <span className="text-[10px] font-hud text-neutral-400">ANIMATED GAUGES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'CODING POWER', val: profile.stats.coding, col: 'bg-pink-500', icon: Terminal },
                { label: 'AI & VISION', val: profile.stats.aiMl, col: 'bg-cyan-400', icon: Zap },
                { label: 'CYBER DEFENSE', val: profile.stats.cybersecurity, col: 'bg-emerald-400', icon: Shield },
                { label: 'FULL STACK ARCH', val: profile.stats.softwareEng, col: 'bg-blue-400', icon: Sparkles },
                { label: 'PROBLEM SOLVING', val: 99, col: 'bg-amber-400', icon: Award },
                { label: 'SYSTEM STAMINA', val: profile.stats.stamina, col: 'bg-purple-400', icon: Flame },
              ].map((attr) => (
                <div key={attr.label} className="space-y-1 bg-white/5 p-2 rounded border border-white/10">
                  <div className="flex items-center justify-between font-hud text-[11px]">
                    <span className="text-neutral-300 font-bold">{attr.label}</span>
                    <span className="text-white font-mono">{attr.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className={`h-full ${attr.col} rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${attr.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Character Portrait & Interactive Infernus Car (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          {/* Character Card Composition */}
          <div className="relative w-full max-w-sm rounded-sm overflow-hidden border-2 border-pink-500/80 shadow-[0_0_40px_rgba(236,0,140,0.5)] group bg-black">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src={heroImageSrc}
                alt="Bolnidi Manikanta"
                className="w-full h-full object-cover object-center filter contrast-115 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* GTA Style Photo Tag */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-pink-500/50 px-2.5 py-1 rounded text-[10px] font-hud text-pink-300 font-black">
                WANTED: TALENT ACQUISITION
              </div>

              {/* Photo Change trigger */}
              <button
                onClick={() => setShowPhotoInput(!showPhotoInput)}
                title="Update Character Photo"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/80 hover:bg-pink-600 text-white transition-colors cursor-pointer border border-white/20"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>

              {/* Bottom Character ID Bar */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md border border-white/20 p-3 rounded">
                <div className="font-vice text-2xl text-white">MANIKANTA</div>
                <div className="font-hud text-[11px] text-pink-400 font-bold">
                  ALIAS: MANI • ARCHITECT OF SOLUTIONS
                </div>
              </div>
            </div>

            {/* Custom Photo URL Input drawer */}
            {showPhotoInput && (
              <div className="p-3 bg-neutral-900 border-t border-pink-500/40 space-y-2 animate-in slide-in-from-top-2">
                <div className="text-[10px] font-hud text-neutral-400">PASTE CUSTOM PHOTO URL:</div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 bg-black border border-white/20 px-2 py-1 text-xs font-hud text-white rounded outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={() => {
                      if (photoUrlInput.trim()) {
                        onUpdateHeroPhoto(photoUrlInput.trim());
                        setShowPhotoInput(false);
                        setPhotoUrlInput('');
                        gtaAudio.playSelect();
                      }
                    }}
                    className="px-3 py-1 bg-pink-600 hover:bg-pink-500 text-white font-hud text-xs rounded font-bold cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Object: Infernus Sports Car */}
          <div
            onMouseEnter={() => {
              setIsCarHovered(true);
              gtaAudio.playHover();
            }}
            onMouseLeave={() => setIsCarHovered(false)}
            onClick={() => {
              gtaAudio.playInteract();
              onOpenPhone();
            }}
            className="w-full max-w-sm bg-black/75 border border-pink-500/40 p-3.5 rounded flex items-center justify-between cursor-pointer hover:border-pink-400 hover:bg-pink-950/30 transition-all group"
          >
            <div>
              <div className="font-hud text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>IN-WORLD OBJECT: INFERNUS SPORTS CAR</span>
              </div>
              <div className="text-[11px] font-hud text-neutral-400 mt-0.5">
                Parked outside safehouse. Access communications.
              </div>
            </div>
            <div className="px-2.5 py-1 bg-pink-600 text-white font-hud text-xs font-bold rounded group-hover:scale-105 transition-transform">
              [ E ]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation: Travel to Next District */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="text-xs font-hud text-neutral-400">
          PRESS <span className="text-pink-400 font-bold">[M]</span> FOR MAP •{' '}
          <span className="text-pink-400 font-bold">[P]</span> FOR PHONE •{' '}
          <span className="text-pink-400 font-bold">[ESC]</span> FOR PAUSE
        </div>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('ai_lab');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-pink-400 shadow-[0_0_15px_rgba(236,0,140,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA TO AI LAB</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
