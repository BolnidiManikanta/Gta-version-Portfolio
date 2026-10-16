import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { ProjectArchitectureFlow } from './ProjectArchitectureFlow';
import {
  X,
  ExternalLink,
  Github,
  Shield,
  Layers,
  Cpu,
  Target,
  AlertTriangle,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Terminal,
  FileText,
  Lock,
} from 'lucide-react';

interface ProjectDossierModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  currentIndex: number;
  totalProjects: number;
  onNextProject: () => void;
  onPrevProject: () => void;
}

type DossierTab = 'brief' | 'architecture' | 'tech' | 'engineering' | 'impact';

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({
  project,
  onClose,
  currentIndex,
  totalProjects,
  onNextProject,
  onPrevProject,
}) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('brief');

  // Reset tab when project changes
  useEffect(() => {
    setActiveTab('brief');
  }, [project?.id]);

  // Keyboard navigation [Esc], [←], [→]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        try {
          gtaAudio.playBack();
        } catch {
          // Audio safety
        }
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        try {
          gtaAudio.playHover();
        } catch {
          // Audio safety
        }
        onNextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        try {
          gtaAudio.playHover();
        } catch {
          // Audio safety
        }
        onPrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNextProject, onPrevProject]);

  if (!project) return null;

  const projectNumber = String(currentIndex + 1).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 select-none animate-in fade-in zoom-in-95 duration-200">
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 gta-scanlines pointer-events-none opacity-30" />

      {/* Main Dossier Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-950 border-2 border-cyan-500/80 shadow-[0_0_60px_rgba(0,240,255,0.4)] rounded-sm flex flex-col overflow-hidden">
        
        {/* Top Header / Tactical Dossier Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black/95 border-b border-cyan-500/40 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <div className="font-hud text-xs font-black text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <span>PROJECT DOSSIER #{projectNumber} OF {totalProjects}</span>
                {project.isFlagship && (
                  <span className="px-1.5 py-0.2 rounded-xs bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[9px] font-mono">
                    ★ FLAGSHIP ARCHIVE
                  </span>
                )}
                <span className="hidden sm:inline px-1.5 py-0.2 rounded-xs bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[9px] font-mono">
                  {project.category}
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                INTELLIGENCE CLASSIFIED REPOSITORY // LEVEL 4 AUTHORIZED
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                try {
                  gtaAudio.playBack();
                } catch {
                  // Audio safety
                }
                onClose();
              }}
              title="Close Dossier [ESC]"
              className="p-1.5 rounded-sm bg-white/10 hover:bg-pink-600 text-white transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tactical Dossier Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 py-2 bg-neutral-900/90 border-b border-neutral-800 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => {
              gtaAudio.playHover();
              setActiveTab('brief');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-mono text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'brief'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>MISSION BRIEF</span>
          </button>

          <button
            onClick={() => {
              gtaAudio.playHover();
              setActiveTab('architecture');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-mono text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURE</span>
          </button>

          <button
            onClick={() => {
              gtaAudio.playHover();
              setActiveTab('tech');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-mono text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tech'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>TECH LOADOUT</span>
          </button>

          {(project.engineeringDecisions || project.challenges || project.securityConsiderations) && (
            <button
              onClick={() => {
                gtaAudio.playHover();
                setActiveTab('engineering');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-mono text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'engineering'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>ENGINEERING</span>
            </button>
          )}

          {(project.outcomes || project.verifiedMetrics) && (
            <button
              onClick={() => {
                gtaAudio.playHover();
                setActiveTab('impact');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs font-mono text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'impact'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>OUTCOME & IMPACT</span>
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">

          {/* Title Header with Metadata Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-400">
                // PROJECT_{projectNumber}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono text-neutral-400 uppercase">
                {project.category}
              </span>
              {project.year && (
                <>
                  <span className="text-neutral-500">·</span>
                  <span className="text-xs font-mono text-cyan-300">
                    {project.year}
                  </span>
                </>
              )}
              {project.status && (
                <>
                  <span className="text-neutral-500">·</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {project.status}
                  </span>
                </>
              )}
              {project.bounty && (
                <span className="ml-auto text-xs font-mono font-bold text-[#55e055]">
                  BOUNTY: {project.bounty}
                </span>
              )}
            </div>

            <h1 className="font-hud text-2xl sm:text-4xl text-white tracking-wide uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {project.title}
            </h1>
          </div>

          {/* TAB 1: MISSION BRIEF */}
          {activeTab === 'brief' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Project Hero Image */}
              <div className="relative rounded-sm overflow-hidden border border-cyan-500/40 bg-black max-h-[300px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[180px] sm:h-[260px] object-cover filter contrast-110 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                {project.verifiedMetrics && (
                  <div className="absolute top-3 right-3 bg-black/85 border border-cyan-500/60 px-3 py-1 rounded-xs text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-md">
                    ★ {project.verifiedMetrics}
                  </div>
                )}
              </div>

              {/* Executive Overview */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-1.5 uppercase font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>MISSION OBJECTIVE & SCOPE:</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal bg-neutral-900/60 p-4 rounded-sm border border-neutral-800">
                  {project.description}
                </p>
              </div>

              {/* Problem & Solution Dual Grid */}
              {(project.problem || project.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.problem && (
                    <div className="p-4 rounded-sm bg-red-950/20 border border-red-500/30 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-bold tracking-wider uppercase">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>TACTICAL CHALLENGE / RISK:</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{project.problem}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-4 rounded-sm bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold tracking-wider uppercase">
                        <Zap className="w-3.5 h-3.5" />
                        <span>ENGINEERED SOLUTION:</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{project.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Target Users / Audience */}
              {project.targetUsers && (
                <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-sm font-mono text-xs text-neutral-300">
                  <span className="text-cyan-400 font-bold mr-1 uppercase">TARGET OPERATORS:</span>
                  <span>{project.targetUsers}</span>
                </div>
              )}

              {/* Key Features Preview */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-1.5 uppercase font-bold">
                    <Target className="w-3.5 h-3.5" />
                    <span>OPERATIONAL CAPABILITIES:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-neutral-300 bg-black/40 p-2.5 rounded-sm border border-neutral-800"
                      >
                        <span className="text-cyan-400 font-bold">▶</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <ProjectArchitectureFlow
                architectureText={project.architecture}
                technologies={project.technologies}
              />
            </div>
          )}

          {/* TAB 3: TECH LOADOUT */}
          {activeTab === 'tech' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-1.5 uppercase font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>TACTICAL TECH LOADOUT // VERIFIED STACK:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {project.technologies.map((tech, idx) => (
                  <div
                    key={`${project.id}-tech-${idx}`}
                    className="p-3 rounded-sm bg-neutral-900/80 border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono text-cyan-500">MODULE 0{idx + 1}</span>
                    <div className="font-hud text-sm font-bold text-white tracking-wide mt-1">
                      {tech}
                    </div>
                  </div>
                ))}
              </div>

              {/* Related Skills & Research Cross-links */}
              {project.relatedSkills && project.relatedSkills.length > 0 && (
                <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-sm space-y-2">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    ASSOCIATED CAPABILITY VECTOR:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.relatedSkills.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-xs bg-black/60 border border-neutral-700 text-xs font-mono text-neutral-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ENGINEERING */}
          {activeTab === 'engineering' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SYSTEM ENGINEERING DECISIONS:</span>
                  </div>
                  <div className="space-y-2">
                    {project.engineeringDecisions.map((dec, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-sm text-xs text-neutral-300 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-cyan-400 font-mono font-bold">0{idx + 1}.</span>
                        <span>{dec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.challenges && (
                <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-sm space-y-1">
                  <div className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>TECHNICAL HURDLES OVERCOME:</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{project.challenges}</p>
                </div>
              )}

              {project.securityConsiderations && project.securityConsiderations.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-pink-400 uppercase font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>SECURITY & THREAT MITIGATIONS:</span>
                  </div>
                  <div className="space-y-1.5">
                    {project.securityConsiderations.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-black/60 border border-pink-500/20 rounded-sm text-xs text-neutral-300 flex items-start gap-2"
                      >
                        <span className="text-pink-400 font-bold">✓</span>
                        <span>{sec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: IMPACT & OUTCOME */}
          {activeTab === 'impact' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {project.verifiedMetrics && (
                <div className="p-4 rounded-sm bg-gradient-to-r from-cyan-950/50 via-neutral-900 to-black border border-cyan-500/50 flex items-center gap-3">
                  <Award className="w-6 h-6 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase font-bold">
                      VERIFIED BENCHMARK & RESULT:
                    </div>
                    <div className="font-hud text-lg text-white font-bold mt-0.5">
                      {project.verifiedMetrics}
                    </div>
                  </div>
                </div>
              )}

              {project.outcomes && (
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-cyan-400 uppercase font-bold">
                    FIELD IMPACT & OUTCOME SUMMARY:
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-900/60 p-4 rounded-sm border border-neutral-800">
                    {project.outcomes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Interactive Terminal Launch Buttons (Live Demo & Github) */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  try {
                    gtaAudio.playSelect();
                  } catch {
                    // Audio safety
                  }
                }}
                className="w-full sm:flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-sm font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 border border-neutral-700 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>[ VIEW GITHUB REPO ]</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  try {
                    gtaAudio.playSelect();
                  } catch {
                    // Audio safety
                  }
                }}
                className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-sm font-hud font-black text-xs tracking-widest flex items-center justify-center gap-2 border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>[ LAUNCH LIVE DEMO ]</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Stepper Footer */}
        <div className="px-4 sm:px-6 py-3 bg-black/95 border-t border-neutral-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              try {
                gtaAudio.playHover();
              } catch {
                // Audio safety
              }
              onPrevProject();
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white cursor-pointer px-3 py-1.5 rounded-sm hover:bg-white/10 transition-colors border border-transparent hover:border-neutral-700"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>← PREVIOUS PROJECT</span>
          </button>

          <button
            onClick={() => {
              try {
                gtaAudio.playBack();
              } catch {
                // Audio safety
              }
              onClose();
            }}
            className="font-mono text-xs text-cyan-400 hover:text-white px-3 py-1 rounded-sm border border-cyan-500/30 hover:border-cyan-400 cursor-pointer"
          >
            BACK TO VAULT [ESC]
          </button>

          <button
            onClick={() => {
              try {
                gtaAudio.playHover();
              } catch {
                // Audio safety
              }
              onNextProject();
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white cursor-pointer px-3 py-1.5 rounded-sm hover:bg-white/10 transition-colors border border-transparent hover:border-neutral-700"
          >
            <span>NEXT PROJECT →</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
