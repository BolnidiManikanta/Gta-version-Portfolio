import React from 'react';
import { SectionId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { ChevronDown, ArrowDown, Sparkles, Navigation } from 'lucide-react';

interface WorldTransitionBannerProps {
  currentSection: SectionId;
  targetSection: SectionId;
  transitionType: 'camera_moves' | 'camera_pans' | 'scene_transforms' | 'mission_selection' | 'final_cinematic' | 'complete';
  label: string;
  subLabel: string;
  onTransition: (target: SectionId) => void;
}

export const WorldTransitionBanner: React.FC<WorldTransitionBannerProps> = ({
  targetSection,
  transitionType,
  label,
  subLabel,
  onTransition,
}) => {
  const getBadge = () => {
    switch (transitionType) {
      case 'camera_moves':
        return 'CAMERA MOVES // ENVIRONMENT CHANGES // CHARACTER MOVES';
      case 'camera_pans':
        return 'CAMERA PANS // TACTICAL LOADOUT TRANSITION';
      case 'scene_transforms':
        return 'SCENE TRANSFORMS // MISSION SELECT MAINFRAME';
      case 'mission_selection':
        return 'MISSION SELECTION // DEPLOY TO FIELD OPERATIONS';
      case 'final_cinematic':
        return 'FINAL CINEMATIC // ASCEND TO SATELLITE COMMS';
      case 'complete':
        return 'MISSION COMPLETE // CLAIM RESPECT +';
      default:
        return 'PROCEED TO NEXT OBJECTIVE';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 pt-6 border-t-2 border-dashed border-pink-500/40 text-center select-none">
      <div className="inline-flex flex-col items-center">
        {/* Cinematic Step Indicator */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <span className="font-hud text-[10px] sm:text-xs text-pink-400 tracking-widest uppercase font-bold">
            {getBadge()}
          </span>
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
        </div>

        {/* Transition Button */}
        <button
          onClick={() => {
            if (transitionType === 'scene_transforms') {
              gtaAudio.playSceneTransform();
            } else {
              gtaAudio.playCameraSwoosh();
            }
            onTransition(targetSection);
          }}
          className="group relative bg-black/85 hover:bg-[#ec008c] border-2 border-pink-500/80 hover:border-white px-6 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_25px_rgba(236,0,140,0.5)] hover:shadow-[0_0_35px_rgba(236,0,140,0.9)] cursor-pointer flex items-center gap-3"
        >
          <div className="text-left font-hud">
            <div className="text-[10px] sm:text-xs text-pink-300 group-hover:text-white tracking-widest uppercase">
              {subLabel}
            </div>
            <div className="font-gta text-2xl sm:text-3xl text-white tracking-wider leading-tight">
              {label}
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-pink-500/20 group-hover:bg-white/20 border border-pink-500/60 flex items-center justify-center text-pink-400 group-hover:text-white transition-colors">
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-bounce" />
          </div>
        </button>

        <div className="mt-2 font-hud text-[10px] text-white/40 tracking-wider">
          PRESS [SPACE] OR CLICK TO ADVANCE CAMERA
        </div>
      </div>
    </div>
  );
};
