import React, { useState } from 'react';
import { DistrictId } from '../../types';
import { DISTRICTS_DATA, DISTRICT_LIST } from '../../data/districtsData';
import { gtaAudio } from '../../utils/audio';
import { X, Navigation, Crosshair, MapPin, Radio, Shield, Code, Brain, Trophy, Briefcase, User, Sparkles } from 'lucide-react';

interface ViceCityMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: DistrictId;
  onSelectDistrict: (district: DistrictId) => void;
}

export const ViceCityMapModal: React.FC<ViceCityMapModalProps> = ({
  isOpen,
  onClose,
  currentDistrict,
  onSelectDistrict,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictId>(currentDistrict);

  if (!isOpen) return null;

  const activeDistrictInfo = DISTRICTS_DATA[hoveredDistrict] || DISTRICTS_DATA[currentDistrict];

  const getDistrictIcon = (id: DistrictId) => {
    switch (id) {
      case 'player_hq':
        return <User className="w-3.5 h-3.5" />;
      case 'ai_lab':
        return <Brain className="w-3.5 h-3.5" />;
      case 'cyber_district':
        return <Shield className="w-3.5 h-3.5" />;
      case 'dev_district':
        return <Code className="w-3.5 h-3.5" />;
      case 'achievement_hq':
        return <Trophy className="w-3.5 h-3.5" />;
      case 'career_district':
        return <Briefcase className="w-3.5 h-3.5" />;
      case 'comms_center':
        return <Radio className="w-3.5 h-3.5" />;
      default:
        return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Scanline overlay */}
      <div className="absolute inset-0 gta-scanlines pointer-events-none opacity-30" />

      {/* Main Map Box */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-neutral-950 border-2 border-pink-500/80 rounded-sm shadow-[0_0_50px_rgba(236,0,140,0.5)] flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/90 border-b border-pink-500/40">
          <div className="flex items-center gap-3">
            <Crosshair className="w-5 h-5 text-pink-500 animate-spin" style={{ animationDuration: '10s' }} />
            <div>
              <div className="font-hud text-sm font-black text-white tracking-widest flex items-center gap-2">
                <span>VICE CITY SATELLITE GPS // TACTICAL MAP</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-900/60 text-pink-300 border border-pink-500/40">
                  LIVE TRACKING
                </span>
              </div>
              <div className="text-[11px] font-hud text-neutral-400">
                SELECT A DISTRICT WAYPOINT TO ENGAGE CAMERA TRAVEL [ESC / M TO EXIT]
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              gtaAudio.playBack();
              onClose();
            }}
            className="p-1.5 rounded bg-white/10 hover:bg-pink-600 text-white transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Body: Left Interactive Canvas, Right District Dossier */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          {/* Map Surface (2 Columns) */}
          <div className="lg:col-span-2 relative bg-[#090b14] overflow-hidden border-b lg:border-b-0 lg:border-r border-pink-500/30 flex items-center justify-center p-4">
            {/* Blueprint Grid Lines */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Stylized Ocean & Island Shapes SVG */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full max-h-[520px] filter drop-shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <defs>
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#050814" />
                  <stop offset="100%" stopColor="#081024" />
                </linearGradient>
                <linearGradient id="islandGrad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#141a2e" />
                  <stop offset="100%" stopColor="#1a233d" />
                </linearGradient>
                <linearGradient id="islandGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#162035" />
                  <stop offset="100%" stopColor="#202c4b" />
                </linearGradient>
              </defs>

              {/* Water background */}
              <rect width="800" height="600" fill="url(#oceanGrad)" />

              {/* Coastlines / Islands */}
              {/* Mainland Left (Downtown & Little Haiti) */}
              <path
                d="M 50,0 L 220,0 Q 280,100 240,240 Q 210,340 260,420 Q 300,500 200,600 L 50,600 Z"
                fill="url(#islandGrad1)"
                stroke="#06b6d4"
                strokeWidth="1.5"
                opacity="0.9"
              />

              {/* Starfish Island (Central Hub) */}
              <path
                d="M 380,260 Q 450,230 480,290 Q 490,360 420,380 Q 360,360 370,300 Z"
                fill="url(#islandGrad2)"
                stroke="#3b82f6"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Vice City Beach / Ocean Beach (Right Island) */}
              <path
                d="M 580,40 Q 640,0 720,0 L 780,0 L 780,600 L 660,600 Q 560,500 600,380 Q 620,280 570,180 Q 540,110 580,40 Z"
                fill="url(#islandGrad1)"
                stroke="#ec008c"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Inter-island Bridges */}
              {/* Downtown to Starfish Bridge */}
              <line x1="240" y1="300" x2="370" y2="300" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
              {/* Starfish to Beach Bridge */}
              <line x1="480" y1="320" x2="600" y2="340" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
              {/* North Venetian Causeway */}
              <line x1="230" y1="120" x2="600" y2="120" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
              {/* South Washington Bridge */}
              <line x1="230" y1="480" x2="630" y2="480" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />

              {/* GPS Route Connecting All 7 Districts */}
              <polyline
                points="192,456 288,252 496,168 416,360 624,270 544,432 672,120"
                fill="none"
                stroke="#ec008c"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                opacity="0.75"
              />
            </svg>

            {/* Interactive District Pins overlaying the SVG map */}
            {DISTRICT_LIST.map((district) => {
              const isCurrent = district.id === currentDistrict;
              const isHovered = district.id === hoveredDistrict;

              return (
                <div
                  key={district.id}
                  style={{
                    left: `${district.mapCoordinates.x}%`,
                    top: `${district.mapCoordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <button
                    onMouseEnter={() => {
                      setHoveredDistrict(district.id);
                      gtaAudio.playHover();
                    }}
                    onClick={() => {
                      gtaAudio.playSelect();
                      gtaAudio.playCameraSwoosh();
                      onSelectDistrict(district.id);
                      onClose();
                    }}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      isHovered ? 'scale-125 z-40' : 'hover:scale-115'
                    }`}
                  >
                    {/* Pulsing ring around marker */}
                    <div
                      className={`absolute -inset-2 rounded-full opacity-60 animate-ping pointer-events-none ${
                        isCurrent ? 'bg-pink-500' : 'bg-cyan-400'
                      }`}
                      style={{ animationDuration: '3s' }}
                    />

                    {/* Main Pin Icon */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all ${
                        isCurrent
                          ? 'bg-pink-600 border-white text-white shadow-[0_0_20px_rgba(236,0,140,1)]'
                          : isHovered
                          ? 'bg-cyan-500 border-white text-white shadow-[0_0_15px_rgba(6,182,212,1)]'
                          : 'bg-black/90 border-neutral-400 text-neutral-200'
                      }`}
                    >
                      {getDistrictIcon(district.id)}
                    </div>

                    {/* District Label Pill */}
                    <div
                      className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-hud font-black uppercase tracking-wider whitespace-nowrap shadow-lg border transition-all ${
                        isCurrent
                          ? 'bg-pink-600/90 text-white border-pink-400'
                          : isHovered
                          ? 'bg-cyan-600/90 text-white border-cyan-400'
                          : 'bg-black/80 text-neutral-300 border-white/20'
                      }`}
                    >
                      {district.name}
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Compass Rose */}
            <div className="absolute top-4 right-4 bg-black/70 border border-white/20 p-2 rounded flex flex-col items-center pointer-events-none text-pink-400 font-hud text-xs">
              <span className="font-black text-pink-500">N</span>
              <div className="w-[1px] h-6 bg-pink-500/50 my-1" />
              <Navigation className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* District Dossier / Travel Sidebar (1 Column) */}
          <div className="bg-neutral-900/95 p-5 flex flex-col justify-between overflow-y-auto space-y-4">
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-hud font-bold text-pink-400 tracking-widest">
                    TARGET DISTRICT INTEL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-hud bg-white/10 text-cyan-300 font-mono">
                    COORD: {activeDistrictInfo.mapCoordinates.x}°W / {activeDistrictInfo.mapCoordinates.y}°N
                  </span>
                </div>
                <h2 className="font-vice text-2xl sm:text-3xl text-white mt-1">
                  {activeDistrictInfo.name}
                </h2>
                <div className="text-xs font-hud text-pink-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeDistrictInfo.location}</span>
                </div>
              </div>

              {/* Subtitle & Description */}
              <div className="space-y-2">
                <div className="text-xs font-hud font-semibold text-cyan-300">
                  {activeDistrictInfo.subtitle}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {activeDistrictInfo.description}
                </p>
              </div>

              {/* In-World Interactive Object Details */}
              <div className="bg-black/60 border border-pink-500/30 p-3.5 rounded space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] font-hud text-neutral-400">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>IN-WORLD INTERACTABLE OBJECT:</span>
                </div>
                <div className="font-hud text-xs font-bold text-white tracking-wider">
                  {activeDistrictInfo.interactableObject.name}
                </div>
                <div className="text-[11px] font-hud text-cyan-400 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-pink-600 text-white rounded text-[10px] font-bold">
                    [ {activeDistrictInfo.interactableObject.actionKey} ]
                  </span>
                  <span>{activeDistrictInfo.interactableObject.prompt}</span>
                </div>
              </div>

              {/* Quick District Navigation Switcher */}
              <div className="space-y-2">
                <div className="text-[11px] font-hud text-neutral-400 tracking-wider">
                  ALL 7 WORLD DISTRICTS:
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {DISTRICT_LIST.map((dist) => (
                    <button
                      key={dist.id}
                      onMouseEnter={() => {
                        setHoveredDistrict(dist.id);
                        gtaAudio.playHover();
                      }}
                      onClick={() => {
                        gtaAudio.playSelect();
                        gtaAudio.playCameraSwoosh();
                        onSelectDistrict(dist.id);
                        onClose();
                      }}
                      className={`px-3 py-2 rounded text-xs font-hud text-left flex items-center justify-between transition-colors border cursor-pointer ${
                        dist.id === currentDistrict
                          ? 'bg-pink-600/30 border-pink-500 text-white font-bold'
                          : dist.id === hoveredDistrict
                          ? 'bg-white/10 border-cyan-400 text-cyan-200'
                          : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {getDistrictIcon(dist.id)}
                        <span className="truncate">{dist.name}</span>
                      </div>
                      {dist.id === currentDistrict && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-pink-500 text-white rounded font-bold">
                          CURRENT
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Travel Button */}
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  gtaAudio.playSelect();
                  gtaAudio.playCameraSwoosh();
                  onSelectDistrict(activeDistrictInfo.id);
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-hud font-black text-xs tracking-widest rounded border border-pink-400 shadow-[0_0_20px_rgba(236,0,140,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Crosshair className="w-4 h-4" />
                <span>DEPLOY CAMERA TO {activeDistrictInfo.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
