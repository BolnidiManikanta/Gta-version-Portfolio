import React, { useState } from 'react';
import { ProfileData, ProjectItem } from '../../types';
import { projectsData, skillsData, experienceData, educationData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Gamepad2,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  FileText,
  Search,
  Filter,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Shield,
  Brain,
  Code,
  Sparkles,
  Home,
} from 'lucide-react';

interface QuickPortfolioViewProps {
  profile: ProfileData;
  onEnterGameWorld: () => void;
  onOpenMissionModal: (mission: ProjectItem, index: number) => void;
  onGoHome?: () => void;
}

export const QuickPortfolioView: React.FC<QuickPortfolioViewProps> = ({
  profile,
  onEnterGameWorld,
  onOpenMissionModal,
  onGoHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI & Vision', 'Cybersecurity', 'Full Stack'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCat =
      selectedCategory === 'All' ||
      (selectedCategory === 'AI & Vision' && p.category.includes('AI')) ||
      (selectedCategory === 'Cybersecurity' && p.category.includes('Security')) ||
      (selectedCategory === 'Full Stack' &&
        (p.category.includes('Full') || p.category.includes('Web') || p.category.includes('Software')));

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 space-y-12 text-white font-sans animate-in fade-in duration-300">
      {/* Top Recruiter Banner with instant Switch to Game World */}
      <div className="bg-gradient-to-r from-pink-950/80 via-neutral-900 to-purple-950/80 border-2 border-pink-500/80 p-6 rounded-sm shadow-[0_0_40px_rgba(236,0,140,0.4)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-hud text-xs font-bold text-pink-400 tracking-widest flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>RECRUITER & FAST SCAN MODE ACTIVE</span>
          </div>
          <h1 className="font-vice text-3xl sm:text-4xl text-white">
            BOLNIDI MANIKANTA
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Full Stack Developer • AI & Cybersecurity Specialist • Ready for Immediate Hiring
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onGoHome && (
            <button
              id="recruiter-back-home-btn"
              onClick={() => {
                gtaAudio.playSelect();
                onGoHome();
              }}
              className="px-4 py-3 bg-black/80 hover:bg-neutral-800 text-white font-hud font-bold text-xs sm:text-sm tracking-wider rounded border border-white/20 hover:border-pink-400 transition-all cursor-pointer flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-pink-400" />
              <span>HOME / START SCREEN</span>
            </button>
          )}

          <button
            onClick={() => {
              gtaAudio.playSelect();
              onEnterGameWorld();
            }}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-hud font-black text-xs sm:text-sm tracking-widest rounded border border-pink-400 shadow-[0_0_20px_rgba(236,0,140,0.8)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>[ ENTER 3D GTA GAME WORLD ]</span>
          </button>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black/75 border border-white/15 p-6 rounded space-y-4">
          <h2 className="font-vice text-2xl text-pink-400">EXECUTIVE SUMMARY</h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {profile.bioFull}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {profile.specializations.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 rounded text-xs font-hud bg-white/5 border border-white/15 text-pink-300"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Contact & Resume */}
        <div className="bg-black/75 border border-white/15 p-6 rounded space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="font-vice text-2xl text-cyan-400">DIRECT CONNECT</h2>
            <div className="space-y-1.5 text-xs">
              <div className="text-neutral-400">EMAIL:</div>
              <div className="text-white font-bold font-mono">{profile.socialLinks.email}</div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-hud font-bold text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="py-2 bg-white/10 hover:bg-white/20 text-white font-hud text-xs rounded text-center cursor-pointer"
              >
                GITHUB
              </a>
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="py-2 bg-blue-900/60 hover:bg-blue-800 text-white font-hud text-xs rounded text-center cursor-pointer"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section (15 Missions) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div>
            <h2 className="font-vice text-3xl sm:text-4xl text-white">PROJECT DOSSIER</h2>
            <div className="text-xs font-hud text-neutral-400">
              15 PRODUCTION-READY PROJECTS ACROSS AI, CYBERSECURITY, AND FULL STACK
            </div>
          </div>

          {/* Filter Chips & Search */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  gtaAudio.playSelect();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded text-xs font-hud font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                gtaAudio.playSelect();
                const globalIdx = projectsData.findIndex((p) => p.id === project.id);
                onOpenMissionModal(project, globalIdx >= 0 ? globalIdx : idx);
              }}
              className="bg-black/80 border border-white/15 hover:border-pink-500 rounded p-4 space-y-3 cursor-pointer hover:shadow-[0_0_25px_rgba(236,0,140,0.3)] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="relative h-40 rounded overflow-hidden border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-black/80 text-emerald-300 border border-emerald-500/40">
                    {project.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-hud text-pink-400 font-bold uppercase">
                    {project.category}
                  </div>
                  <h3 className="font-vice text-2xl text-white group-hover:text-pink-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-hud text-neutral-300 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-hud text-xs">
                <span className="text-emerald-400 font-mono font-bold">{project.bounty}</span>
                <span className="text-pink-400 font-bold group-hover:translate-x-1 transition-transform">
                  VIEW SPECS &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience */}
        <div className="space-y-4">
          <h2 className="font-vice text-2xl text-purple-400 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <span>OPERATIONAL EXPERIENCE</span>
          </h2>
          {experienceData.map((exp, idx) => (
            <div key={idx} className="bg-black/75 border border-white/15 p-5 rounded space-y-2">
              <div className="flex justify-between font-hud text-xs">
                <span className="text-purple-400 font-bold">{exp.period}</span>
                <span className="text-neutral-400">{exp.badge}</span>
              </div>
              <h3 className="font-hud text-base font-bold text-white">{exp.role}</h3>
              <div className="text-xs text-neutral-400">{exp.organization}</div>
              <p className="text-xs text-neutral-300 leading-relaxed pt-1">{exp.mission}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h2 className="font-vice text-2xl text-cyan-400 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            <span>ACADEMIC FOUNDATIONS</span>
          </h2>
          <div className="bg-black/75 border border-white/15 p-5 rounded space-y-2">
            <div className="flex justify-between font-hud text-xs">
              <span className="text-cyan-400 font-bold">{educationData.period}</span>
              <span className="text-neutral-400">{educationData.gpaOrScore}</span>
            </div>
            <h3 className="font-hud text-base font-bold text-white">{educationData.degree}</h3>
            <div className="text-xs text-neutral-400">{educationData.institution} • {educationData.location}</div>
            <ul className="text-xs text-neutral-300 space-y-1 list-disc pl-4 pt-1">
              {educationData.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
