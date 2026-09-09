import React from 'react';
import { Disc3, MapPin, Keyboard } from 'lucide-react';

interface BottomHUDProps {
  isRadioPlaying: boolean;
  onRadioToggle: () => void;
}

export const BottomHUD: React.FC<BottomHUDProps> = ({ isRadioPlaying, onRadioToggle }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 py-2 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-wrap items-center justify-between text-[11px] font-hud tracking-wider text-white/80 pointer-events-none select-none">
      {/* Left: Radio Station Status */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          onClick={onRadioToggle}
          className="flex items-center gap-2 bg-black/70 hover:bg-black border border-pink-500/40 px-2.5 py-1 rounded cursor-pointer transition-colors"
        >
          <Disc3 className={`w-3.5 h-3.5 text-pink-500 ${isRadioPlaying ? 'animate-spin' : ''}`} />
          <span className="text-white/90">
            {isRadioPlaying ? 'STATION: NON-STOP POP FM' : 'RADIO: OFF (CLICK OR PRESS M)'}
          </span>
          {isRadioPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-pink-400 animate-pulse h-full" />
              <span className="w-0.5 bg-pink-500 animate-bounce h-2/3" />
              <span className="w-0.5 bg-cyan-400 animate-pulse h-full" />
              <span className="w-0.5 bg-pink-400 animate-bounce h-1/2" />
            </div>
          )}
        </button>
      </div>

      {/* Center: Keyboard Controls Hint (Hidden on small mobile) */}
      <div className="hidden md:flex items-center gap-2 bg-black/60 px-3 py-1 border border-white/10 rounded text-white/60">
        <Keyboard className="w-3.5 h-3.5 text-pink-400" />
        <span>[↑/↓] NAVIGATE</span>
        <span className="text-pink-500">•</span>
        <span>[ENTER] SELECT</span>
        <span className="text-pink-500">•</span>
        <span>[ESC] MENU</span>
        <span className="text-pink-500">•</span>
        <span>[M] RADIO</span>
      </div>

      {/* Right: Location & Developer Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-pink-400">
          <MapPin className="w-3 h-3 text-pink-500" />
          <span className="hidden sm:inline text-white/80">LOCATION:</span>
          <span>DOWNTOWN LOS SANTOS</span>
        </div>
        <div className="text-white/50 border-l border-white/20 pl-2">
          v2.0 PRO
        </div>
      </div>
    </div>
  );
};
