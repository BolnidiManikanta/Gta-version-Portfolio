import React, { useEffect } from 'react';
import { SectionId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  Camera,
  Layers,
  User,
  RotateCcw,
  Zap,
  Target,
  Film,
  Sparkles,
  ArrowDown,
  X,
  Play,
  Pause,
  ChevronRight,
  Shield,
  Navigation,
} from 'lucide-react';

interface ContinuousWorldModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  isAutoTouring: boolean;
  onToggleAutoTour: () => void;
}

interface FlowStep {
  id: SectionId;
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  icon: string;
  transitionsToNext?: {
    actions: { label: string; icon: React.ReactNode; color: string }[];
  };
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 'start',
    title: 'HERO',
    subtitle: 'OCEAN DRIVE BEACHFRONT',
    location: 'Vice Beach, Los Santos',
    badge: 'STAGE 1',
    icon: '🏎️',
    transitionsToNext: {
      actions: [
        { label: 'CAMERA MOVES', icon: <Camera className="w-3.5 h-3.5" />, color: 'text-cyan-400 border-cyan-500/40' },
        { label: 'ENVIRONMENT CHANGES', icon: <Layers className="w-3.5 h-3.5" />, color: 'text-amber-400 border-amber-500/40' },
        { label: 'CHARACTER MOVES', icon: <User className="w-3.5 h-3.5" />, color: 'text-pink-400 border-pink-500/40' },
      ],
    },
  },
  {
    id: 'about',
    title: 'ABOUT',
    subtitle: 'PENTHOUSE SUITE DOSSIER',
    location: 'Ocean Heights Penthouse',
    badge: 'STAGE 2',
    icon: '📄',
    transitionsToNext: {
      actions: [
        { label: 'CAMERA PANS', icon: <RotateCcw className="w-3.5 h-3.5" />, color: 'text-emerald-400 border-emerald-500/40' },
      ],
    },
  },
  {
    id: 'skills',
    title: 'SKILLS',
    subtitle: 'UNDERGROUND CYBER ARMORY',
    location: 'Sub-Level 4 Tactical Hub',
    badge: 'STAGE 3',
    icon: '⚡',
    transitionsToNext: {
      actions: [
        { label: 'SCENE TRANSFORMS', icon: <Zap className="w-3.5 h-3.5" />, color: 'text-fuchsia-400 border-fuchsia-500/40' },
      ],
    },
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    subtitle: 'TACTICAL OPS MAINFRAME',
    location: 'Holographic War Room',
    badge: 'STAGE 4',
    icon: '💻',
    transitionsToNext: {
      actions: [
        { label: 'MISSION SELECTION', icon: <Target className="w-3.5 h-3.5" />, color: 'text-yellow-400 border-yellow-500/40' },
      ],
    },
  },
  {
    id: 'experience',
    title: 'EXPERIENCE',
    subtitle: 'SAN ANDREAS FWY OVERLOOK',
    location: 'Mulholland Overlook',
    badge: 'STAGE 5',
    icon: '🌉',
    transitionsToNext: {
      actions: [
        { label: 'FINAL CINEMATIC', icon: <Film className="w-3.5 h-3.5" />, color: 'text-rose-400 border-rose-500/40' },
      ],
    },
  },
  {
    id: 'contact',
    title: 'CONTACT',
    subtitle: 'SATELLITE ROOFTOP DISPATCH',
    location: 'Maze Bank Comms Tower',
    badge: 'STAGE 6',
    icon: '📡',
  },
];

export const ContinuousWorldModal: React.FC<ContinuousWorldModalProps> = ({
  isOpen,
  onClose,
  currentSection,
  onSelectSection,
  isAutoTouring,
  onToggleAutoTour,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Tactical Grid Background overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ec008c 1px, transparent 1px), linear-gradient(to bottom, #ec008c 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Tactical Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950/95 border-2 border-pink-500/70 shadow-[0_0_50px_rgba(236,0,140,0.4)] flex flex-col overflow-hidden text-white">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-pink-500/40 bg-black/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-gta text-2xl text-white tracking-wider">ONE CONTINUOUS WORLD</span>
                <span className="font-hud text-[10px] bg-pink-600 px-2 py-0.5 font-bold uppercase rounded-xs">
                  TACTICAL PIPELINE
                </span>
              </div>
              <p className="font-hud text-[11px] text-pink-300/80 tracking-wider">
                SEAMLESS CINEMATIC STAGE & ENVIRONMENT TRANSITIONS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Play Tour Button */}
            <button
              onClick={() => {
                gtaAudio.playSelect();
                onToggleAutoTour();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-hud text-xs font-bold border transition-all cursor-pointer ${
                isAutoTouring
                  ? 'bg-pink-600 border-white text-white animate-pulse'
                  : 'bg-black/60 border-pink-500/60 text-pink-300 hover:bg-pink-600 hover:text-white'
              }`}
            >
              {isAutoTouring ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoTouring ? 'PAUSE TOUR' : 'PLAY CINEMATIC TOUR'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                gtaAudio.playBack();
                onClose();
              }}
              className="p-1.5 bg-white/10 hover:bg-pink-600 border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Flow Pipeline Diagram */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-3 custom-scrollbar">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {FLOW_STEPS.map((step, idx) => {
              const isActive = currentSection === step.id;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Node Card */}
                  <div
                    onClick={() => {
                      gtaAudio.playSelect();
                      onSelectSection(step.id);
                      onClose();
                    }}
                    className={`w-full group relative p-4 sm:p-5 border-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-black/90 border-[#ec008c] shadow-[0_0_25px_rgba(236,0,140,0.6)] translate-y-[-2px]'
                        : 'bg-black/60 border-white/20 hover:border-pink-500/60 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-gta text-2xl sm:text-3xl tracking-wider text-white group-hover:text-pink-400 transition-colors">
                              {step.title}
                            </span>
                            <span
                              className={`font-hud text-[10px] font-bold px-2 py-0.5 uppercase ${
                                isActive ? 'bg-pink-600 text-white' : 'bg-white/10 text-white/60'
                              }`}
                            >
                              {step.badge}
                            </span>
                            {isActive && (
                              <span className="font-hud text-[10px] text-emerald-400 font-bold animate-pulse flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                CURRENT CAMERA TARGET
                              </span>
                            )}
                          </div>
                          <div className="font-hud text-xs text-pink-300 font-semibold tracking-wider">
                            {step.subtitle}
                          </div>
                          <div className="font-hud text-[11px] text-white/50 tracking-wider">
                            LOCATION: {step.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="font-hud text-xs px-3 py-1.5 bg-pink-500/20 group-hover:bg-pink-600 border border-pink-500/60 group-hover:border-white text-white transition-all flex items-center gap-1">
                          <span>DEPLOY CAM</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Transition Pipeline Actions */}
                  {step.transitionsToNext && (
                    <div className="w-full py-2 flex flex-col items-center relative">
                      {/* Vertical line indicator */}
                      <div className="w-0.5 h-4 bg-gradient-to-b from-pink-500 to-cyan-500" />
                      <ArrowDown className="w-4 h-4 text-pink-500 -my-1" />

                      {/* Transition Action Badges */}
                      <div className="flex flex-wrap items-center justify-center gap-2 my-1 z-10">
                        {step.transitionsToNext.actions.map((action, actionIdx) => (
                          <div
                            key={actionIdx}
                            className={`flex items-center gap-1.5 px-3 py-1 bg-black/80 border text-[11px] font-hud font-bold tracking-widest uppercase shadow-md ${action.color}`}
                          >
                            {action.icon}
                            <span>{action.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-pink-500" />
                      <ArrowDown className="w-4 h-4 text-cyan-400 -my-1" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Mission Complete Final Node */}
            <div className="w-full py-2 flex flex-col items-center">
              <div className="w-0.5 h-4 bg-gradient-to-b from-rose-500 to-yellow-500" />
              <ArrowDown className="w-4 h-4 text-yellow-400 -my-1" />
            </div>

            <div
              onClick={() => {
                gtaAudio.playMissionPassed();
                onSelectSection('exit');
                onClose();
              }}
              className="w-full group p-4 border-2 border-yellow-500/50 hover:border-yellow-400 bg-black/70 hover:bg-yellow-950/30 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="font-gta text-2xl text-yellow-400 tracking-wider">
                    MISSION COMPLETE // RESPECT +
                  </div>
                  <div className="font-hud text-xs text-white/70">
                    LOS SANTOS SUNSET CINEMATIC REEL
                  </div>
                </div>
              </div>
              <button className="font-hud text-xs px-3 py-1.5 bg-yellow-500/20 group-hover:bg-yellow-500 border border-yellow-500 text-yellow-300 group-hover:text-black font-bold transition-all">
                CLAIM RESPECT
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3 border-t border-pink-500/30 bg-black/90 flex flex-wrap items-center justify-between gap-2 text-xs font-hud text-white/70">
          <div className="flex items-center gap-2">
            <span className="text-pink-400 font-bold">[TIP]</span>
            <span>PRESS [SPACE] ANYWHERE IN THE WORLD TO ADVANCE CAMERA TO NEXT OBJECTIVE</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-colors cursor-pointer"
          >
            RETURN TO GAME [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
