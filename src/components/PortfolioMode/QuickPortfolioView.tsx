import React, { useState } from 'react';
import { ProfileData, ProjectItem } from '../../types';
import {
  projectsData,
  skillsData,
  experienceData,
  educationData,
  researchPublicationsData,
  leadershipData,
  certificationsData,
  achievementsData,
  summaryStats,
} from '../../data/portfolioData';
import { servicesData } from '../../data/servicesData';
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
  BookOpen,
  Award,
  Users,
  Trophy,
  CheckCircle2,
  Phone,
  Layers,
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

  const categories = [
    'All',
    'Flagship',
    'AI & Vision',
    'Cybersecurity',
    'Full Stack & Web',
    'Research Connected',
  ];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCat =
      selectedCategory === 'All' ||
      (selectedCategory === 'Flagship' && p.isFlagship) ||
      (selectedCategory === 'AI & Vision' &&
        (p.category.includes('AI') || p.category.includes('Vision') || p.category.includes('Deep Learning'))) ||
      (selectedCategory === 'Cybersecurity' &&
        (p.category.includes('Security') || p.category.includes('Cyber'))) ||
      (selectedCategory === 'Full Stack & Web' &&
        (p.category.includes('Full') || p.category.includes('Web') || p.category.includes('Software'))) ||
      (selectedCategory === 'Research Connected' && (p.relatedResearch && p.relatedResearch.length > 0));

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.alternateName && p.alternateName.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
            {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            {profile.title} • {profile.location} • Available for Immediate Roles
          </p>

          {/* Quick Stat Pill Counter */}
          <div className="flex flex-wrap items-center gap-2 pt-2 justify-center sm:justify-start text-[11px] font-mono">
            <span className="px-2.5 py-0.5 rounded bg-black/60 border border-pink-500/50 text-pink-300 font-bold">
              ★ {summaryStats.repositories} Repositories
            </span>
            <span className="px-2.5 py-0.5 rounded bg-black/60 border border-purple-500/50 text-purple-300 font-bold">
              ★ {summaryStats.certifications} Certifications
            </span>
            <span className="px-2.5 py-0.5 rounded bg-black/60 border border-cyan-500/50 text-cyan-300 font-bold">
              ★ {summaryStats.publications} Research Publications
            </span>
            <span className="px-2.5 py-0.5 rounded bg-black/60 border border-emerald-500/50 text-emerald-300 font-bold">
              ★ {summaryStats.studentsLeadership} Reached
            </span>
            <span className="px-2.5 py-0.5 rounded bg-black/60 border border-amber-500/50 text-amber-300 font-bold">
              ★ CGPA {summaryStats.cgpa}
            </span>
          </div>
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
              <span>START SCREEN</span>
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
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span className="font-mono text-white font-bold">{profile.socialLinks.email}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-white">{profile.socialLinks.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-hud font-bold text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="py-2 bg-white/10 hover:bg-white/20 text-white font-hud text-xs rounded text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="py-2 bg-blue-900/60 hover:bg-blue-800 text-white font-hud text-xs rounded text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Peer-Reviewed Research Publications (IEEE Xplore) */}
      <div className="space-y-4">
        <div className="border-b border-purple-500/30 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-vice text-3xl text-purple-300 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <span>PEER-REVIEWED RESEARCH PUBLICATIONS ({researchPublicationsData.length})</span>
            </h2>
            <div className="text-xs font-hud text-neutral-400">
              ACCEPTED & PUBLISHED RESEARCH PAPERS ACROSS CLOUD, CYBERSECURITY, AI & REPAIR ECONOMY
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {researchPublicationsData.map((pub) => (
            <div
              key={pub.id}
              className="bg-neutral-950/90 border border-purple-500/40 p-5 rounded space-y-3 hover:border-purple-400 transition-all shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-hud px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                  {pub.venue}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  {pub.status}
                </span>
              </div>

              <h3 className="font-sans font-bold text-base text-white leading-snug">
                {pub.title}
              </h3>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {pub.description}
              </p>

              {pub.doi && (
                <div className="text-[10px] font-mono text-neutral-400">
                  DOI: <span className="text-pink-400">{pub.doi}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-2">
                {pub.ieeeUrl && (
                  <a
                    href={pub.ieeeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-900/70 hover:bg-blue-800 text-white font-hud text-xs font-bold border border-blue-400/80 tracking-wider transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>IEEE XPLORE ARTICLE</span>
                  </a>
                )}
                {pub.statusNote && (
                  <span className="text-[10px] font-hud text-neutral-400 italic">
                    {pub.statusNote}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Services & Technical Capabilities */}
      <div className="space-y-4">
        <div className="border-b border-cyan-500/30 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-vice text-3xl text-cyan-300 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <span>SERVICES & TECHNICAL CAPABILITIES ({servicesData.length})</span>
            </h2>
            <div className="text-xs font-hud text-neutral-400">
              COMMERCIAL ENGINEERING, FULL-STACK SOFTWARE, DEFENSIVE CYBERSECURITY & AI ARCHITECTURE
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="bg-neutral-950/90 border border-cyan-500/40 p-5 rounded space-y-3 hover:border-cyan-400 transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {svc.number}
                  </span>
                  {svc.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                      {svc.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-base text-white leading-snug">
                  {svc.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {svc.description}
                </p>

                <div className="space-y-1 pt-1 border-t border-white/10">
                  <span className="text-[10px] font-hud text-cyan-400 font-bold uppercase tracking-wider block">
                    WHAT YOU GET
                  </span>
                  {svc.whatYouGet.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section (25 Repositories) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div>
            <h2 className="font-vice text-3xl sm:text-4xl text-white">PROJECT DOSSIER ({filteredProjects.length})</h2>
            <div className="text-xs font-hud text-neutral-400">
              COMPLETE VAULT OF 25 REPOSITORIES ACROSS AI, COMPUTER VISION, CYBERSECURITY, AND FULL STACK
            </div>
          </div>

          {/* Search bar & Category filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, stack, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 pl-8 rounded bg-neutral-900 border border-white/20 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 font-sans"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
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
                  {project.isFlagship && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-hud font-bold bg-amber-500/90 text-black">
                      FLAGSHIP
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-hud text-pink-400 font-bold uppercase">
                    <span>{project.category}</span>
                    {project.year && <span className="text-neutral-400 font-mono">{project.year}</span>}
                  </div>
                  <h3 className="font-vice text-2xl text-white group-hover:text-pink-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.alternateName && (
                    <div className="text-[10px] font-mono text-neutral-400">
                      AKA: {project.alternateName}
                    </div>
                  )}
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((t, tIdx) => (
                    <span
                      key={`${project.id}-${t}-${tIdx}`}
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
                  VIEW DOSSIER &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership & Campus Impact */}
      <div className="space-y-4">
        <div className="border-b border-emerald-500/30 pb-3">
          <h2 className="font-vice text-3xl text-emerald-400 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>LEADERSHIP & CAMPUS IMPACT (500+ STUDENTS)</span>
          </h2>
          <div className="text-xs font-hud text-neutral-400">
            SPEARHEADING PEER MENTORING, TECHNICAL WORKSHOPS, AND CLOUD HACKATHONS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leadershipData.map((lead) => (
            <div
              key={lead.id}
              className="bg-black/80 border border-emerald-500/30 p-5 rounded space-y-2 hover:border-emerald-400 transition-all"
            >
              <div className="flex items-center justify-between font-hud text-xs">
                <span className="text-emerald-400 font-bold">{lead.period}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  {lead.impact}
                </span>
              </div>
              <h3 className="font-hud text-base font-bold text-white">{lead.role}</h3>
              <div className="text-xs text-neutral-400">{lead.organization}</div>
              <p className="text-xs text-neutral-300 leading-relaxed pt-1">{lead.description}</p>
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
            <div className="pt-2 flex flex-wrap gap-1.5">
              {educationData.courses.map((course, cIdx) => (
                <span
                  key={`${course}-${cIdx}`}
                  className="px-2 py-0.5 rounded bg-white/5 border border-cyan-500/30 text-[10px] font-hud text-cyan-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Authenticated Certifications */}
      <div className="space-y-4">
        <div className="border-b border-amber-500/30 pb-3">
          <h2 className="font-vice text-3xl text-amber-400 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>AUTHENTICATED CERTIFICATIONS ({certificationsData.length})</span>
          </h2>
          <div className="text-xs font-hud text-neutral-400">
            VERIFIED INDUSTRY CREDENTIALS IN CLOUD, ETHICAL HACKING, FULL STACK AND ALGORITHMS
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="bg-black/80 border border-amber-500/30 p-4 rounded space-y-2 hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-hud">
                  <span className="text-amber-400 font-bold">{cert.issuer}</span>
                  <span className="text-neutral-400 font-mono">{cert.issueDate}</span>
                </div>
                <h4 className="font-hud text-sm font-bold text-white leading-snug">
                  {cert.title}
                </h4>
                {cert.credentialId && (
                  <div className="text-[10px] font-mono text-neutral-400 truncate">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="pt-2 border-t border-white/10">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-hud text-amber-400 hover:text-amber-300 font-bold"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>VERIFY CREDENTIAL</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
