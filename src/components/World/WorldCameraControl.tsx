import React from 'react';
import { SectionId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { Camera, ChevronUp, ChevronDown, Video, Eye } from 'lucide-react';

export type CameraMode = 'cinematic' | 'tactical' | 'drone' | 'direct';

interface WorldCameraControlProps {
  cameraMode: CameraMode;
  onCycleCameraMode: () => void;
  currentSection: SectionId;
  onNextSection: () => void;
  onPrevSection: () => void;
}

const SECTION_ORDER: SectionId[] = [
  'start',
  'about',
  'skills',
  'projects',
  'experience',
  'achievements',
  'academy',
  'contact',
  'exit',
];

export const WorldCameraControl: React.FC<WorldCameraControlProps> = ({
  cameraMode,
  onCycleCameraMode,
  currentSection,
  onNextSection,
  onPrevSection,
}) => {
  const currentIndex = SECTION_ORDER.indexOf(currentSection);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < SECTION_ORDER.length - 1;

  const modeLabels: Record<CameraMode, string> = {
    cinematic: 'CAM: CINEMATIC 3D',
    tactical: 'CAM: TACTICAL ISO',
    drone: 'CAM: DRONE WIDE',
    direct: 'CAM: DIRECT 2D',
  };

  return (
    <div className="fixed top-18 right-3 sm:top-20 sm:right-6 z-40 flex items-center gap-1.5 bg-black/75 backdrop-blur-md border border-pink-500/40 p-1 rounded-sm shadow-xl pointer-events-auto select-none font-hud text-[10px]">
      {/* Cycle Camera Angle Button (like pressing 'C' in GTA) */}
      <button
        onClick={() => {
          gtaAudio.playCameraClick();
          onCycleCameraMode();
        }}
        title="Toggle Camera Angle (or press 'C')"
        className="flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-pink-600 border border-white/10 hover:border-pink-500 text-white rounded-xs transition-colors cursor-pointer"
      >
        <Video className="w-3 h-3 text-pink-400" />
        <span className="font-bold tracking-wider">{modeLabels[cameraMode]}</span>
      </button>

      {/* Camera Up / Prev Objective */}
      <button
        onClick={() => {
          if (canGoPrev) {
            gtaAudio.playCameraSwoosh();
            onPrevSection();
          }
        }}
        disabled={!canGoPrev}
        title="Previous Camera Objective"
        className={`p-1 rounded-xs border transition-colors ${
          canGoPrev
            ? 'bg-white/5 hover:bg-white/20 border-white/20 text-white cursor-pointer'
            : 'opacity-30 border-transparent text-white/40 cursor-not-allowed'
        }`}
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Camera Down / Next Objective */}
      <button
        onClick={() => {
          if (canGoNext) {
            gtaAudio.playCameraSwoosh();
            onNextSection();
          }
        }}
        disabled={!canGoNext}
        title="Next Camera Objective"
        className={`p-1 rounded-xs border transition-colors ${
          canGoNext
            ? 'bg-pink-600 hover:bg-pink-500 border-pink-500 text-white cursor-pointer shadow-[0_0_8px_rgba(236,0,140,0.6)]'
            : 'opacity-30 border-transparent text-white/40 cursor-not-allowed'
        }`}
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
