import React, { useState } from 'react';
import { SectionId, ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import { ProjectDossierModal } from './ProjectDossierModal';
import {
  Gamepad2,
  Compass,
  Building2,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Car,
  FileCode2,
} from 'lucide-react';

interface ProjectsViewProps {
  onSelectSection?: (section: SectionId) => void;
  onOpenProjects?: (slug?: string) => void;
}

type DistrictFilter = 'all' | 'fullstack' | 'ai' | 'cyber' | 'research';

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onSelectSection,
  onOpenProjects,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<DistrictFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDossierProj, setActiveDossierProj] = useState<ProjectItem | null>(null);

  // Filter projects based on district & search
  const filteredProjects = projectsData.filter((proj) => {
    const cat = (proj.category || '').toLowerCase();
    const techs = (proj.technologies || []).join(' ').toLowerCase();
    const q = searchQuery.toLowerCase();

    // Search filter
    const matchesSearch =
      !searchQuery ||
      proj.title.toLowerCase().includes(q) ||
      cat.includes(q) ||
      techs.includes(q) ||
      (proj.problem && proj.problem.toLowerCase().includes(q)) ||
      (proj.description && proj.description.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    // District filter
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ai') {
      return cat.includes('ai') || cat.includes('vision') || cat.includes('healthcare') || techs.includes('opencv');
    }
    if (selectedFilter === 'cyber') {
      return cat.includes('security') || cat.includes('cyber') || cat.includes('vuln') || techs.includes('clamav');
    }
    if (selectedFilter === 'research') {
      return cat.includes('research') || cat.includes('cloud') || cat.includes('academic') || !!proj.relatedResearch;
    }
    if (selectedFilter === 'fullstack') {
      return (
        !cat.includes('ai') &&
        !cat.includes('vision') &&
        !cat.includes('security') &&
        !cat.includes('research') &&
        !cat.includes('academic')
      );
    }
    return true;
  });

  const handleLaunchGame = (slug?: string) => {
    try {
      gtaAudio.playSelect();
      gtaAudio.playBoot();
    } catch {
      // Safety
    }
    if (onOpenProjects) {
      onOpenProjects(slug);
    }
  };

  return (
    <div
      id="work-page"
      className="relative w-full min-h-screen py-16 px-4 sm:px-8 bg-neutral-950 text-white font-sans selection:bg-pink-600 selection:text-white"
    >
      {/* Vice City Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* HEADER: GTA VICE CITY BANNER & 3D GAME LAUNCHER */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-black/95 to-neutral-900/90 border-2 border-pink-500/60 shadow-[0_0_40px_rgba(236,72,153,0.35)] relative overflow-hidden backdrop-blur-xl">
          {/* Neon Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-400 animate-pulse" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 font-mono text-xs tracking-widest uppercase">
                <Gamepad2 className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
                PLAYABLE THIRD-PERSON OPEN WORLD
              </div>

              <h1 className="font-hud text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-cyan-300 tracking-wider uppercase drop-shadow-[0_2px_15px_rgba(236,72,153,0.6)]">
                GTA: VICE CITY // PROJECT VAULT
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 font-mono leading-relaxed">
                Take control of <span className="text-cyan-300 font-bold">Tommy Vercetti</span> in his iconic turquoise palm shirt. Drive your sports car down Ocean Drive, explore 4 vibrant city districts, enter physical tech facilities, and inspect production repositories in full 3D.
              </p>

              {/* Game Key Controls Hint */}
              <div className="flex flex-wrap items-center gap-2 pt-2 justify-center lg:justify-start">
                <span className="px-2 py-0.5 rounded bg-black/80 border border-neutral-700 text-[11px] font-mono text-neutral-300">
                  <strong className="text-white">[W/A/S/D]</strong> Walk / Steer
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 border border-neutral-700 text-[11px] font-mono text-neutral-300">
                  <strong className="text-pink-400">[F] / [E]</strong> Enter / Exit Vehicle
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 border border-neutral-700 text-[11px] font-mono text-neutral-300">
                  <strong className="text-cyan-300">[E]</strong> Enter Building Showroom
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 border border-neutral-700 text-[11px] font-mono text-neutral-300">
                  <strong className="text-amber-400">[M]</strong> Satellite Map & Fast Travel
                </span>
              </div>
            </div>

            {/* GIANT PLAY BUTTON */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => handleLaunchGame()}
                className="group relative px-8 py-5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-hud font-black text-base sm:text-xl tracking-widest uppercase shadow-[0_0_35px_rgba(236,72,153,0.8)] hover:shadow-[0_0_50px_rgba(236,72,153,1)] hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
              >
                <Car className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                <span>LAUNCH 3D VICE CITY GAME</span>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="text-[11px] font-mono text-neutral-400 tracking-wider">
                60 FPS WEBGL · 25 3D SITES · AUDIO ENGINE ENABLED
              </div>
            </div>
          </div>
        </div>

        {/* DISTRICT FILTERS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* District Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'ALL HQS (25)', color: 'border-pink-500 text-pink-300' },
              { id: 'fullstack', label: 'FULL STACK VALLEY (7)', color: 'border-emerald-500 text-emerald-300' },
              { id: 'ai', label: 'AI & VISION DISTRICT (6)', color: 'border-cyan-500 text-cyan-300' },
              { id: 'cyber', label: 'CYBER DEFENSE (6)', color: 'border-amber-500 text-amber-300' },
              { id: 'research', label: 'INNOVATION COMMONS (6)', color: 'border-purple-500 text-purple-300' },
            ].map((btn) => {
              const active = selectedFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    try {
                      gtaAudio.playSelect();
                    } catch {}
                    setSelectedFilter(btn.id as DistrictFilter);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer border ${
                    active
                      ? 'bg-pink-600/30 border-pink-400 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                      : 'bg-neutral-900/80 border-neutral-700/70 text-neutral-400 hover:text-white hover:border-neutral-500'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tech, title, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-white placeholder-neutral-500 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* 25 PROJECT HEADQUARTERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => {
            const cat = (proj.category || '').toUpperCase();
            const isAI = cat.includes('AI') || cat.includes('VISION');
            const isCyber = cat.includes('SECURITY') || cat.includes('CYBER');
            const isResearch = cat.includes('RESEARCH') || cat.includes('CLOUD');

            const districtBadge = isAI
              ? 'NORTH AI DISTRICT'
              : isCyber
              ? 'CYBER DEFENSE DISTRICT'
              : isResearch
              ? 'INNOVATION COMMONS'
              : 'FULL STACK VALLEY';

            const districtColor = isAI
              ? 'border-cyan-500/50 text-cyan-300 bg-cyan-950/40'
              : isCyber
              ? 'border-amber-500/50 text-amber-300 bg-amber-950/40'
              : isResearch
              ? 'border-purple-500/50 text-purple-300 bg-purple-950/40'
              : 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40';

            return (
              <div
                key={proj.id}
                className="group p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-pink-500/70 shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.35)] transition-all flex flex-col justify-between backdrop-blur-md"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${districtColor}`}>
                      {districtBadge}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      HQ #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-hud text-lg font-black text-white group-hover:text-pink-300 transition-colors uppercase tracking-wider">
                      {proj.title}
                    </h3>
                    {proj.shortDescription && (
                      <p className="text-xs font-mono text-neutral-400 line-clamp-1 mt-0.5">
                        {proj.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Problem Statement snippet */}
                  {(proj.problem || proj.description) && (
                    <p className="text-xs text-neutral-300/90 font-mono leading-relaxed line-clamp-2">
                      {proj.problem || proj.description}
                    </p>
                  )}

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(proj.technologies || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-black/60 border border-neutral-800 text-[10px] font-mono text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {(proj.technologies || []).length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
                        +{(proj.technologies || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      try {
                        gtaAudio.playSelect();
                      } catch {}
                      setActiveDossierProj(proj);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>DOSSIER</span>
                  </button>

                  <button
                    onClick={() => handleLaunchGame(proj.slug || proj.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600 border border-pink-500/60 hover:border-pink-400 text-pink-300 hover:text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                  >
                    <Building2 className="w-3.5 h-3.5 text-pink-400" />
                    <span>ENTER IN 3D</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CLASSIFIED PROJECT DOSSIER MODAL */}
        {activeDossierProj && (
          <ProjectDossierModal
            project={activeDossierProj}
            currentIndex={projectsData.findIndex((p) => p.id === activeDossierProj.id)}
            totalProjects={projectsData.length}
            onClose={() => setActiveDossierProj(null)}
            onNextProject={() => {
              const curIdx = projectsData.findIndex((p) => p.id === activeDossierProj.id);
              const nextIdx = (curIdx + 1) % projectsData.length;
              setActiveDossierProj(projectsData[nextIdx]);
            }}
            onPrevProject={() => {
              const curIdx = projectsData.findIndex((p) => p.id === activeDossierProj.id);
              const prevIdx = (curIdx - 1 + projectsData.length) % projectsData.length;
              setActiveDossierProj(projectsData[prevIdx]);
            }}
          />
        )}
      </div>
    </div>
  );
};
