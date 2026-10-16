import React, { useState, useMemo } from 'react';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  X,
  Search,
  Layers,
  Cpu,
  Shield,
  FileCode2,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  Navigation,
} from 'lucide-react';

interface ProjectDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  discoveredProjectIds: Set<string>;
  onSelectProject: (index: number) => void;
  onSetWaypoint: (projectId: string) => void;
}

export const ProjectDirectory: React.FC<ProjectDirectoryProps> = ({
  isOpen,
  onClose,
  projects,
  discoveredProjectIds,
  onSelectProject,
  onSetWaypoint,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'AI_ML' | 'FULL_STACK' | 'CYBERSECURITY' | 'RESEARCH'>('ALL');

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      // Category match
      const cat = (proj.category || '').toUpperCase();
      const title = (proj.title || '').toUpperCase();
      const desc = (proj.description || '').toUpperCase();
      const techs = (proj.technologies || []).join(' ').toUpperCase();

      if (activeCategory === 'AI_ML') {
        const isAI = cat.includes('AI') || cat.includes('VISION') || cat.includes('HEALTHCARE') || techs.includes('OPENCV') || techs.includes('TENSORFLOW');
        if (!isAI) return false;
      } else if (activeCategory === 'FULL_STACK') {
        const isFS = cat.includes('FULL STACK') || cat.includes('ECOSYSTEM') || cat.includes('WEB') || techs.includes('REACT') || techs.includes('NODE');
        if (!isFS) return false;
      } else if (activeCategory === 'CYBERSECURITY') {
        const isCyber = cat.includes('SECURITY') || cat.includes('CYBER') || cat.includes('VULN') || techs.includes('CLAMAV') || techs.includes('CRYPTOGRAPHY');
        if (!isCyber) return false;
      } else if (activeCategory === 'RESEARCH') {
        const isRes = cat.includes('RESEARCH') || cat.includes('CLOUD') || cat.includes('ACADEMIC') || !!proj.relatedResearch;
        if (!isRes) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toUpperCase();
        return title.includes(q) || desc.includes(q) || techs.includes(q) || cat.includes(q);
      }

      return true;
    });
  }, [projects, activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[86vh] bg-neutral-950 border border-cyan-500/60 shadow-[0_0_50px_rgba(0,0,0,0.95)] rounded-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/95 border-b border-cyan-500/40 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <div className="font-hud text-sm font-black text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <span>PROJECT REPOSITORY DIRECTORY</span>
                <span className="font-mono text-[10px] text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded-xs">
                  {projects.length} TOTAL REPOSITORIES
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                CAMPUS INVENTORY // CLASSIFIED ARCHIVES & RESEARCH PAPERS
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              try {
                gtaAudio.playBack();
              } catch {
                // Audio safety
              }
              onClose();
            }}
            title="Close Directory [I / ESC]"
            className="p-1.5 rounded-xs bg-white/10 hover:bg-neutral-800 border border-neutral-700 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 bg-neutral-900/60 border-b border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, technologies, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xs bg-black/70 border border-neutral-700 focus:border-cyan-400 text-white font-mono text-xs placeholder:text-neutral-500 outline-none"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none">
            {[
              { id: 'ALL' as const, label: 'ALL' },
              { id: 'FULL_STACK' as const, label: 'FULL STACK' },
              { id: 'AI_ML' as const, label: 'AI & VISION' },
              { id: 'CYBERSECURITY' as const, label: 'CYBERSECURITY' },
              { id: 'RESEARCH' as const, label: 'RESEARCH & CLOUD' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  try {
                    gtaAudio.playHover();
                  } catch {
                    // Audio safety
                  }
                  setActiveCategory(cat.id);
                }}
                className={`px-2.5 py-1 rounded-xs font-mono text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project List Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredProjects.map((proj, idx) => {
            const originalIndex = projects.indexOf(proj);
            const isDiscovered = discoveredProjectIds.has(proj.id);

            return (
              <div
                key={proj.id}
                className="p-3.5 rounded-xs bg-neutral-900/60 border border-neutral-800 hover:border-cyan-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      #{String(originalIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-neutral-500">·</span>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase">
                      {proj.category}
                    </span>
                    {proj.year && (
                      <>
                        <span className="text-neutral-500">·</span>
                        <span className="font-mono text-[11px] text-cyan-300">
                          {proj.year}
                        </span>
                      </>
                    )}
                    {proj.isFlagship && (
                      <span className="px-1.5 py-0.2 rounded-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono">
                        FLAGSHIP
                      </span>
                    )}
                  </div>

                  <h4 className="font-hud text-base font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-1 font-normal">
                    {proj.shortDescription || proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded-xs bg-black/60 border border-neutral-700 text-[10px] font-mono text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      try {
                        gtaAudio.playSelect();
                      } catch {
                        // Audio safety
                      }
                      onSetWaypoint(proj.id);
                      onClose();
                    }}
                    title="Set GPS Waypoint in Game World"
                    className="px-2.5 py-1.5 rounded-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-amber-300 font-mono text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">GPS WAYPOINT</span>
                  </button>

                  <button
                    onClick={() => {
                      try {
                        gtaAudio.playSelect();
                      } catch {
                        // Audio safety
                      }
                      onSelectProject(originalIndex);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xs bg-cyan-600 hover:bg-cyan-500 text-white font-hud text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>INSPECT</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
