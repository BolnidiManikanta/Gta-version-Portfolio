import React, { useState } from 'react';
import { MainMenu } from '../Navigation/MainMenu';
import { SectionId } from '../../types';
import { Camera, RefreshCw } from 'lucide-react';
import { gtaAudio } from '../../utils/audio';
import { HOMEPAGE_BACKGROUND_IMAGE } from '../../config/backgroundTheme';

interface HeroViewProps {
  currentSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  customHeroPhoto?: string;
  onUpdateHeroPhoto: (url: string) => void;
  onOpenContinuousWorld?: () => void;
}

// Default cinematic hero character image from user's uploaded artwork
const DEFAULT_HERO_IMAGE = HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png';

export const HeroView: React.FC<HeroViewProps> = ({
  currentSection,
  onSelectSection,
  customHeroPhoto,
  onUpdateHeroPhoto,
  onOpenContinuousWorld,
}) => {
  const [isHoveredCar, setIsHoveredCar] = useState(false);

  const heroImageSrc = customHeroPhoto || DEFAULT_HERO_IMAGE;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateHeroPhoto(event.target.result as string);
          gtaAudio.playSelect();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-screen min-h-[640px] flex items-center justify-between overflow-hidden px-4 sm:px-10 md:px-16 lg:px-24">
      {/* Background Layer: Custom Homepage Background */}
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={HOMEPAGE_BACKGROUND_IMAGE}
          alt="Homepage Background"
          className="w-full h-full object-cover object-center scale-105 filter contrast-115 brightness-75 saturate-110"
        />
        {/* Purple / Magenta Sunset Overlay matching reference video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-purple-950/45 to-pink-900/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Left Column: Interactive Main Menu */}
      <div className="relative z-20 w-full max-w-md my-auto pt-16 pb-12">
        <MainMenu
          currentSection={currentSection}
          onSelectSection={onSelectSection}
          onOpenContinuousWorld={onOpenContinuousWorld}
        />
      </div>

      {/* Center-Right: Hero Character & Car Composition (Exact Reference Composition) */}
      <div
        className="relative hidden md:flex flex-1 h-full items-end justify-center lg:justify-end z-10 pointer-events-none pb-8 lg:pr-12"
        onMouseEnter={() => setIsHoveredCar(true)}
        onMouseLeave={() => setIsHoveredCar(false)}
      >
        <div className="relative max-w-[560px] lg:max-w-[680px] w-full flex flex-col items-center pointer-events-auto">
          {/* Subtle Pink Neon Backglow behind character */}
          <div className="absolute -top-10 right-10 w-96 h-96 rounded-full bg-pink-600/30 blur-[90px] -z-10 animate-pulse" />
          <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-blue-600/20 blur-[80px] -z-10" />

          {/* Character Cut-out Frame with GTA comic/game styling */}
          <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
            {/* The Character Image */}
            <div className="relative rounded-t-lg overflow-hidden border-b-4 border-pink-500 shadow-2xl shadow-pink-900/40">
              <img
                src={heroImageSrc}
                alt="Bolnidi Manikanta"
                className="w-[360px] lg:w-[440px] xl:w-[480px] max-h-[580px] object-cover object-top filter contrast-115 saturate-125 brightness-105"
              />
              {/* GTA dramatic rim light gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-pink-500/15 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-pink-500/20 pointer-events-none" />

              {/* Photo Switcher Tooltip / Trigger */}
              <label
                htmlFor="hero-photo-upload"
                title="Click to use your own personal photo!"
                className="absolute top-3 right-3 bg-black/80 hover:bg-pink-600 border border-pink-500/60 p-2 rounded-full cursor-pointer transition-all duration-200 text-white shadow-lg opacity-80 hover:opacity-100 flex items-center gap-1.5"
                onClick={() => gtaAudio.playSelect()}
              >
                <Camera className="w-4 h-4 text-pink-400 group-hover:text-white" />
                <span className="font-hud text-[10px] hidden group-hover:inline pr-1">CUSTOM PHOTO</span>
              </label>
              <input
                id="hero-photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* GTA Sports Car Base & Plate */}
            <div className="w-full bg-gradient-to-b from-neutral-900 to-black p-3 border-t-2 border-pink-500/80 shadow-2xl flex items-center justify-between">
              <div>
                <div className="font-gta text-2xl tracking-widest text-white leading-none">
                  BOLNIDI SPECIAL EDITION
                </div>
                <div className="font-hud text-[10px] text-pink-400 tracking-wider">
                  V8 TWIN-TURBO • CODE ENGINE
                </div>
              </div>

              {/* License Plate */}
              <div className="bg-amber-100 border-2 border-neutral-700 px-2.5 py-1 rounded-xs shadow-inner flex flex-col items-center justify-center">
                <span className="text-[7px] font-hud text-blue-900 font-black tracking-widest leading-none">
                  LOS SANTOS
                </span>
                <span className="font-gta text-base font-black text-blue-950 tracking-widest leading-none">
                  MANI 007
                </span>
              </div>
            </div>

            {/* Bottom Caption matching video */}
            <div className="mt-3 text-center">
              <p className="font-hud text-xs text-white/70 tracking-wider">
                Press <span className="text-pink-400 font-bold bg-white/10 px-1.5 py-0.5 rounded-xs border border-white/20">M</span> to start radio &bull; Designed by Bolnidi Manikanta
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
