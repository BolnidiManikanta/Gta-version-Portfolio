import React, { useState } from 'react';
import { SectionId, ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, ExternalLink, Github, Laptop, Shield, Zap, Crosshair } from 'lucide-react';

interface ProjectsViewProps {
  onSelectSection: (section: SectionId) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectSection }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);

  const selectedProject: ProjectItem =
    projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background layer with dusk cityscape & purple ambient light */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80"
          alt="Dusk City"
          className="w-full h-full object-cover filter contrast-125 brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-purple-950/40" />
      </div>

      {/* Header: PROJECTS + Cursive Operations */}
      <div className="flex flex-wrap items-end justify-between border-b border-pink-500/40 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                gtaAudio.playBack();
                onSelectSection('start');
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-pink-500/50 hover:bg-[#ec008c] text-white font-hud text-xs tracking-wider rounded-xs cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ESC / BACK</span>
            </button>
            <span className="font-hud text-xs text-pink-400 uppercase tracking-widest">
              ACTIVE MISSIONS ARCHIVE
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              PROJECTS
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Operations
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 font-hud text-xs text-white/70 bg-black/60 border border-white/20 px-3 py-2">
          TOTAL COMPLETED OPS: <span className="text-pink-400 font-bold">{projectsData.length} MISSIONS</span>
        </div>
      </div>

      {/* Main Grid: Mission Selector on Left + Mission Briefing Laptop Hologram on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mission Directory List */}
        <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-2">
          <div className="text-xs font-hud text-pink-400 tracking-widest uppercase mb-2 flex items-center justify-between sticky top-0 bg-black/90 p-2 z-10 border-b border-pink-500/30">
            <span>SELECT OPERATION BRIEFING</span>
            <span className="text-white/50">{projectsData.length} OPS AVAILABLE</span>
          </div>

          {projectsData.map((project, idx) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                onClick={() => {
                  gtaAudio.playSelect();
                  setSelectedProjectId(project.id);
                }}
                onMouseEnter={() => {
                  if (!isSelected) gtaAudio.playHover();
                }}
                className={`w-full text-left p-3 cursor-pointer transition-all duration-150 border flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#ec008c] border-white text-white shadow-[0_0_15px_rgba(236,0,140,0.7)] translate-x-1.5'
                    : 'bg-black/75 hover:bg-white/10 border-white/10 text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-hud text-xs font-bold px-1.5 py-0.5 rounded-xs ${
                      isSelected ? 'bg-black text-pink-400' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="font-gta text-xl sm:text-2xl tracking-wider leading-tight">
                      {project.title}
                    </div>
                    <div
                      className={`font-hud text-[10px] tracking-widest ${
                        isSelected ? 'text-pink-100' : 'text-cyan-400'
                      }`}
                    >
                      {project.category}
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span
                    className={`font-hud text-xs font-bold ${
                      isSelected ? 'text-white' : 'text-[#55e055]'
                    }`}
                  >
                    {project.bounty}
                  </span>
                  <span
                    className={`font-hud text-[9px] uppercase tracking-wider ${
                      project.difficulty === 'EXTREME'
                        ? 'text-amber-400'
                        : project.difficulty === 'HARD'
                        ? 'text-pink-400'
                        : 'text-white/60'
                    }`}
                  >
                    {project.difficulty}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Mission Briefing & Holographic Laptop Terminal (matching video 00:24) */}
        <div className="lg:col-span-7">
          <div className="bg-black/85 backdrop-blur-md border-2 border-pink-500/60 p-5 sm:p-6 shadow-2xl relative">
            {/* Mission Dossier Top Bar */}
            <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-pink-500/30 gap-2">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-pink-500 animate-spin" />
                <span className="font-hud text-xs text-pink-400 tracking-widest uppercase">
                  OPERATION DOSSIER: {selectedProject.title.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2 font-hud text-xs">
                <span className="text-white/50">BOUNTY REWARD:</span>
                <span className="text-[#55e055] font-gta text-2xl tracking-wider">
                  {selectedProject.bounty}
                </span>
              </div>
            </div>

            {/* Glowing Laptop Terminal Display (Exact Reference Feature in video 00:24) */}
            <div className="relative my-4 rounded-t-lg bg-neutral-950 border-4 border-neutral-800 p-2 sm:p-4 shadow-[0_0_35px_rgba(236,0,140,0.3)]">
              {/* Laptop Web Camera Dot */}
              <div className="w-2 h-2 rounded-full bg-neutral-700 mx-auto mb-2 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* Laptop Screen Content with image & overlay */}
              <div className="relative h-[260px] sm:h-[320px] rounded overflow-hidden border border-cyan-500/40 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover filter contrast-120 saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* HUD scanline and target bracket overlay */}
                <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 border border-pink-500/60 font-hud text-[10px] text-pink-400">
                  SYSTEM STATUS: OPERATIONAL
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-hud">
                  <div>
                    <span className="text-[10px] text-white/60 uppercase block">
                      MISSION DIRECTIVE
                    </span>
                    <span className="font-gta text-2xl text-white tracking-wider">
                      {selectedProject.title}
                    </span>
                  </div>
                  <span className="bg-emerald-950/80 border border-emerald-500 text-emerald-400 text-xs px-2 py-0.5">
                    ● MISSION ACCOMPLISHED
                  </span>
                </div>
              </div>

              {/* Laptop Keyboard Base Hinge */}
              <div className="w-48 h-2 bg-neutral-700 mx-auto mt-2 rounded-b-md" />
            </div>

            {/* Mission Objective & Description */}
            <div className="space-y-4 pt-2">
              <div>
                <span className="font-hud text-xs text-pink-400 tracking-widest block mb-1">
                  MISSION BRIEFING / OBJECTIVE
                </span>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technology Arsenal Stack */}
              <div>
                <span className="font-hud text-xs text-pink-400 tracking-widest block mb-2">
                  TACTICAL TECH STACK DEPLOYED
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="font-hud text-xs bg-white/10 border border-cyan-500/40 text-cyan-300 px-3 py-1 rounded-xs flex items-center gap-1.5"
                    >
                      <Zap className="w-3 h-3 text-yellow-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: GitHub, Demo, Contact */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => gtaAudio.playSelect()}
                    className="flex items-center gap-2 bg-[#ec008c] hover:bg-[#ff007f] text-white px-5 py-2.5 font-gta text-xl tracking-wider shadow-lg cursor-pointer transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>INSPECT SOURCE CODE</span>
                  </a>
                )}

                <a
                  href={selectedProject.demo || selectedProject.github || 'https://github.com/BolnidiManikanta'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => gtaAudio.playSelect()}
                  className="flex items-center gap-2 bg-black/80 hover:bg-white/10 border border-cyan-400 text-cyan-300 px-5 py-2.5 font-gta text-xl tracking-wider cursor-pointer transition-all hover:text-white"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>COMMENCE LIVE OPERATION</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
