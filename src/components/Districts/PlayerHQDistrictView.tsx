import React, { useState } from 'react';
import { ProfileData, DistrictId, HqHighlightMode } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { ABOUT_PAGE_IMAGE } from '../../config/backgroundTheme';
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
  Maximize2,
  Eye,
  EyeOff,
  X,
  Download,
  Sun,
  Layers,
} from 'lucide-react';

interface PlayerHQDistrictViewProps {
  profile: ProfileData;
  customHeroPhoto?: string;
  onUpdateHeroPhoto: (url: string) => void;
  onSelectDistrict: (district: DistrictId) => void;
  onOpenPhone: () => void;
  onOpenMap: () => void;
  hqHighlightMode?: HqHighlightMode;
  onHighlightModeChange?: (mode: HqHighlightMode) => void;
}

const DEFAULT_HERO_IMAGE = ABOUT_PAGE_IMAGE || '/about-page.png';

export const PlayerHQDistrictView: React.FC<PlayerHQDistrictViewProps> = ({
  profile,
  customHeroPhoto,
  onUpdateHeroPhoto,
  onSelectDistrict,
  onOpenPhone,
  onOpenMap,
  hqHighlightMode = 'vivid',
  onHighlightModeChange,
}) => {
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isCarHovered, setIsCarHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFullBackgroundView, setIsFullBackgroundView] = useState(false);
  const [bgPlacement, setBgPlacement] = useState<'exact_center' | 'full_fit' | 'cinematic'>('exact_center');

  const heroImageSrc = customHeroPhoto || DEFAULT_HERO_IMAGE;

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Dedicated Enter World Full Background: About Page Image Adjusted Exact to Center */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Ambient Blurred Extension Layer to fill wide margins */}
        <img
          src={ABOUT_PAGE_IMAGE || '/about-page.png'}
          alt=""
          className="w-full h-full object-cover object-center filter blur-2xl opacity-35 scale-110"
        />

        {/* Primary Artwork Layer with Exact Centered Placement */}
        <img
          src={ABOUT_PAGE_IMAGE || '/about-page.png'}
          alt="Bolnidi Manikanta - About Page Full Background"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('about-page.png')) {
              target.src = '/about%20page.png';
            } else {
              target.src = '/about-page.png';
            }
          }}
          className={`absolute inset-0 w-full h-full filter contrast-115 saturate-125 brightness-95 transition-all duration-500 ${
            bgPlacement === 'full_fit'
              ? 'object-contain object-center'
              : 'object-cover'
          }`}
          style={{
            objectPosition:
              bgPlacement === 'full_fit'
                ? 'center center'
                : bgPlacement === 'cinematic'
                ? '50% 12%'
                : '50% 4%',
          }}
        />

        {/* Soft atmospheric gradient to keep text crisp while displaying full background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* District Header Watermark */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pink-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-pink-600/30 border border-pink-500 flex items-center justify-center text-pink-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-pink-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 01 // SAFE HOUSE (ENTER WORLD)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              PLAYER HQ & DOSSIER
            </h1>
          </div>
        </div>

        {/* Top Right: Highlight Mode Selector & Full Background View Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Highlight Presets */}
          {onHighlightModeChange && (
            <div className="hidden sm:flex items-center gap-1 bg-black/80 border border-white/20 p-1 rounded">
              {(['vivid', 'cyber', 'sunset', 'panorama'] as HqHighlightMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    gtaAudio.playSelect();
                    onHighlightModeChange(mode);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-hud uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                    hqHighlightMode === mode
                      ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          )}

          {/* Background Image Alignment Preset Selector */}
          <div className="flex items-center gap-1 bg-black/80 border border-cyan-400/40 p-1 rounded">
            <span className="font-hud text-[9px] text-cyan-400 font-bold px-1 hidden sm:inline">
              IMAGE:
            </span>
            <button
              type="button"
              onClick={() => {
                gtaAudio.playSelect();
                setBgPlacement('exact_center');
              }}
              title="Align exact to center (perfect face and portrait framing)"
              className={`px-2 py-0.5 rounded text-[10px] font-hud uppercase tracking-wider font-bold transition-all cursor-pointer ${
                bgPlacement === 'exact_center'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EXACT CENTER
            </button>
            <button
              type="button"
              onClick={() => {
                gtaAudio.playSelect();
                setBgPlacement('full_fit');
              }}
              title="Fit entire uncropped photo in the center"
              className={`px-2 py-0.5 rounded text-[10px] font-hud uppercase tracking-wider font-bold transition-all cursor-pointer ${
                bgPlacement === 'full_fit'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              FULL FIT
            </button>
          </div>

          {/* Toggle Fullscreen / Background View */}
          <button
            type="button"
            onClick={() => {
              gtaAudio.playSelect();
              setIsFullBackgroundView(!isFullBackgroundView);
            }}
            title={isFullBackgroundView ? 'Restore Dossier Cards' : 'View Full Highlighted About Background'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border font-hud text-xs tracking-wider font-bold transition-all cursor-pointer ${
              isFullBackgroundView
                ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_15px_rgba(236,0,140,0.6)]'
                : 'bg-black/80 border-cyan-400/70 text-cyan-300 hover:text-white hover:border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isFullBackgroundView ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isFullBackgroundView ? 'SHOW DOSSIER' : 'VIEW BIG BACKGROUND'}</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs font-hud">
            <span className="px-2 py-1 bg-black/60 border border-pink-500/40 text-cyan-400 font-mono rounded">
              OCEAN DRIVE • SUITE 804
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isFullBackgroundView ? (
        /* Unobstructed Big Background Showcase Overlay */
        <div className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-black/75 backdrop-blur-md border border-cyan-400/70 p-6 rounded-lg max-w-lg shadow-[0_0_50px_rgba(6,182,212,0.5)] space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 font-hud text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>ENTER WORLD // HIGHLIGHTED ABOUT PAGE BACKGROUND</span>
            </div>
            <h2 className="font-vice text-3xl sm:text-4xl text-white tracking-wider">
              PANORAMIC DOSSIER SHOWCASE
            </h2>
            <p className="text-sm font-hud text-neutral-300">
              High-resolution About Page artwork highlighted as the primary world backdrop with active cinematic volumetric lighting.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-hud text-xs font-black tracking-widest uppercase rounded flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INSPECT LIGHTBOX [HQ]</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFullBackgroundView(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-hud text-xs font-bold tracking-wider rounded transition-all cursor-pointer"
              >
                RETURN TO HUD
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Standard 12-Column Grid with Translucent Glassmorphic Cards */
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-6 items-center">
          {/* Left Column: Player Stats & Attributes (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Identity Card */}
            <div className="bg-black/65 backdrop-blur-md border border-pink-500/40 p-5 rounded space-y-3 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-hud font-black bg-pink-600 text-white">
                    CHARACTER
                  </span>
                  <span className="font-hud text-xs text-neutral-400">LEVEL 24 • REPUTATION 99%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-[10px] font-hud text-cyan-300 font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>ABOUT IMAGE HIGHLIGHTED</span>
                  </span>
                  <span className="font-hud text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AVAILABLE
                  </span>
                </div>
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
          {/* Character Card Composition - Prominently Highlighted */}
          <div className="relative w-full max-w-sm">
            {/* Ambient Multi-Color Neon Halo Behind Card */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 rounded-lg blur-xl opacity-60 animate-pulse pointer-events-none" />

            <div className="relative rounded-lg overflow-hidden border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6),0_0_60px_rgba(236,0,140,0.4)] group bg-black">
              <div className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                <img
                  src={heroImageSrc}
                  alt="Bolnidi Manikanta - Highlighted Dossier"
                  className="w-full h-full object-cover object-center filter contrast-125 saturate-120 brightness-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

                {/* Highlighted Badge */}
                <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md border border-cyan-400 px-2.5 py-1 rounded text-[10px] font-hud text-cyan-300 font-black shadow-[0_0_15px_rgba(6,182,212,0.7)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>HIGHLIGHTED // ABOUT DOSSIER</span>
                </div>

                {/* Click to Enlarge inspect trigger */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLightboxOpen(true);
                      gtaAudio.playSelect();
                    }}
                    title="Inspect Full-Resolution Image"
                    className="p-2 rounded-full bg-black/80 hover:bg-cyan-500 text-white hover:text-black transition-colors cursor-pointer border border-cyan-400/60 shadow-lg"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPhotoInput(!showPhotoInput);
                    }}
                    title="Change Photo URL"
                    className="p-2 rounded-full bg-black/80 hover:bg-pink-600 text-white transition-colors cursor-pointer border border-white/20"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Center Hover Prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none">
                  <div className="px-4 py-2 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 font-hud text-xs font-bold tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>CLICK TO ENLARGE [HQ]</span>
                  </div>
                </div>

                {/* Bottom Character ID Bar */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md border border-white/20 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-vice text-2xl text-white">MANIKANTA</div>
                      <div className="font-hud text-[11px] text-pink-400 font-bold">
                        ALIAS: MANI • ARCHITECT OF SOLUTIONS
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400/50 text-[10px] font-hud text-cyan-300">
                      HQ DOSSIER
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Direct Inspect Lightbox */}
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(true);
                  gtaAudio.playSelect();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-950 via-neutral-900 to-pink-950 hover:from-cyan-900 hover:to-pink-900 border-t border-cyan-500/40 text-cyan-300 font-hud text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>INSPECT HIGHLIGHTED ABOUT IMAGE [HQ]</span>
              </button>

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
      )}

      {/* Fullscreen High-Resolution Lightbox Modal for Highlighted About Image */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between border-b border-cyan-500/40 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-vice text-2xl sm:text-3xl text-white tracking-wider">
                    HIGHLIGHTED ABOUT DOSSIER
                  </h3>
                  <p className="font-hud text-xs text-cyan-400 font-bold">
                    LOCATION 01: ENTER WORLD SAFE HOUSE // HIGH-RESOLUTION ARTIFACT
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={heroImageSrc}
                  download="Bolnidi_Manikanta_About_Dossier.png"
                  onClick={() => gtaAudio.playSelect()}
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-hud flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SAVE</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white transition-colors cursor-pointer border border-pink-400 shadow-[0_0_15px_rgba(236,0,140,0.6)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Container */}
            <div className="relative rounded-lg overflow-hidden border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.8)] bg-black max-h-[75vh]">
              <img
                src={heroImageSrc}
                alt="Highlighted About Dossier"
                className="w-full h-auto max-h-[75vh] object-contain filter contrast-125 saturate-125"
              />
            </div>

            <div className="mt-3 text-center text-xs font-hud text-neutral-400">
              PRESS <span className="text-pink-400 font-bold">[ESC]</span> OR CLICK OUTSIDE TO CLOSE
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation: Travel to Next District */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
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
