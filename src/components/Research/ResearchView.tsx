import React, { useState, useMemo } from 'react';
import { SectionId, ResearchPublication } from '../../types';
import { researchPublicationsData, projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  FileText,
  Search,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

interface ResearchViewProps {
  onSelectSection: (section: SectionId) => void;
  onSelectProject?: (projectId: string) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({
  onSelectSection,
  onSelectProject,
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'ACCEPTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResearchId, setSelectedResearchId] = useState<string>(researchPublicationsData[0].id);

  const filteredResearch = useMemo(() => {
    return researchPublicationsData.filter((item) => {
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'PUBLISHED' && item.status === 'PUBLISHED') ||
        (statusFilter === 'ACCEPTED' && item.status.includes('ACCEPTED'));
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.venue.toLowerCase().includes(q) ||
        item.researchDomain.toLowerCase().includes(q) ||
        item.abstract.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const activePaper =
    researchPublicationsData.find((p) => p.id === selectedResearchId) || researchPublicationsData[0];

  const getStatusBadge = (status: ResearchPublication['status']) => {
    switch (status) {
      case 'PUBLISHED':
        return {
          text: 'PUBLISHED',
          bg: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
          dot: 'bg-emerald-400',
        };
      case 'ACCEPTED — MAJOR REVISION':
        return {
          text: 'ACCEPTED — MAJOR REVISION',
          bg: 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
          dot: 'bg-amber-400',
        };
      case 'ACCEPTED FOR PRESENTATION':
        return {
          text: 'ACCEPTED FOR PRESENTATION',
          bg: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]',
          dot: 'bg-cyan-400',
        };
      default:
        return {
          text: status,
          bg: 'bg-purple-950/80 border-purple-500/80 text-purple-300',
          dot: 'bg-purple-400',
        };
    }
  };

  return (
    <div className="relative w-full min-h-screen pt-20 pb-20 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start select-none">
      {/* Background layer with dusk cityscape & purple ambient light */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80"
          alt="Night City Skyline"
          className="w-full h-full object-cover filter contrast-125 brightness-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-purple-950/40" />
      </div>

      {/* Header: RESEARCH LAB + Cursive Publications */}
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
              PEER-REVIEWED SCIENTIFIC DOSSIER // 4 VERIFIED PAPERS
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              RESEARCH
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Publications
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 font-hud text-xs text-white/80 bg-black/70 border border-white/20 px-3.5 py-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>IEEE XPLORE & INTERNATIONAL PROCEEDINGS</span>
        </div>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="bg-black/75 backdrop-blur-md border border-pink-500/30 p-3 sm:p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'ALL RESEARCH (4)' },
            { id: 'PUBLISHED', label: 'PUBLISHED (2)' },
            { id: 'ACCEPTED', label: 'ACCEPTED (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                gtaAudio.playSelect();
                setStatusFilter(tab.id as any);
              }}
              className={`px-3 py-1.5 text-xs font-hud tracking-wider transition-all cursor-pointer border ${
                statusFilter === tab.id
                  ? 'bg-[#ec008c] border-white text-white font-bold shadow-[0_0_12px_rgba(236,0,140,0.7)]'
                  : 'bg-black/60 border-white/20 text-neutral-400 hover:text-white hover:border-white/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, DOI, or keywords..."
            className="w-full pl-9 pr-3 py-1.5 bg-black/90 border border-white/20 focus:border-pink-500 text-xs text-white placeholder-neutral-500 font-sans outline-none"
          />
        </div>
      </div>

      {/* Master Content: Left List & Right Dossier View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Research Papers */}
        <div className="lg:col-span-5 space-y-3">
          {filteredResearch.map((paper) => {
            const isSelected = selectedResearchId === paper.id;
            const badge = getStatusBadge(paper.status);

            return (
              <div
                key={paper.id}
                onClick={() => {
                  gtaAudio.playHover();
                  setSelectedResearchId(paper.id);
                }}
                className={`p-4 border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-950/80 to-black border-pink-500 shadow-[0_0_20px_rgba(236,0,140,0.4)] translate-x-1'
                    : 'bg-black/75 hover:bg-neutral-900/80 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-hud border font-bold flex items-center gap-1.5 ${badge.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.text}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">{paper.year}</span>
                </div>

                <h3 className="font-gta text-lg text-white leading-snug tracking-wide mb-1">
                  {paper.title}
                </h3>
                <div className="font-hud text-[11px] text-cyan-300/80 line-clamp-1">
                  {paper.venue}
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[11px] font-hud text-neutral-400">
                  <span className="text-pink-400 font-bold">{paper.researchDomain}</span>
                  <span className="text-neutral-500">CLICK TO VIEW DOSSIER →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Scientific Dossier */}
        <div className="lg:col-span-7">
          <div className="bg-black/85 backdrop-blur-md border-2 border-pink-500/60 p-6 sm:p-7 shadow-2xl relative">
            {/* Top Status & Year Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pink-500/30 pb-4 mb-5">
              <div>
                <span className="font-hud text-[10px] text-pink-400 uppercase tracking-widest block mb-1">
                  OFFICIAL RESEARCH ENTRY // {activePaper.id.toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  {(() => {
                    const badge = getStatusBadge(activePaper.status);
                    return (
                      <span className={`px-2.5 py-1 text-xs font-hud border font-bold flex items-center gap-1.5 ${badge.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                        {badge.text}
                      </span>
                    );
                  })()}
                  <span className="font-mono text-xs px-2 py-1 bg-white/10 border border-white/20 text-white">
                    {activePaper.year}
                  </span>
                </div>
              </div>

              {/* Direct DOI or Paper Link Button */}
              <div className="flex items-center gap-2">
                {activePaper.doi && (
                  <a
                    href={activePaper.ieeeUrl || `https://doi.org/${activePaper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ec008c] hover:bg-[#ff007f] text-white font-hud text-xs font-bold transition-all shadow-[0_0_12px_rgba(236,0,140,0.6)] cursor-pointer"
                  >
                    <span>IEEE XPLORE / DOI</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Venue */}
            <h2 className="font-gta text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-2">
              {activePaper.title}
            </h2>
            <div className="text-xs sm:text-sm font-hud text-cyan-300 tracking-wider mb-4 pb-3 border-b border-white/10">
              {activePaper.venue}
            </div>

            {/* Authors */}
            <div className="mb-4">
              <span className="font-hud text-[10px] text-neutral-400 tracking-widest uppercase block mb-1">
                AUTHORS & INVESTIGATORS:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-sans text-neutral-200">
                {activePaper.authors.map((author, i) => (
                  <span key={i} className="px-2 py-1 bg-white/5 border border-white/15">
                    {author}
                  </span>
                ))}
              </div>
            </div>

            {/* Acceptance Note / Notice if Present */}
            {activePaper.acceptanceNote && (
              <div className="mb-4 p-3 bg-amber-950/40 border border-amber-500/60 text-amber-200 text-xs font-hud tracking-wide">
                <span className="font-bold text-amber-400 mr-2">NOTICE:</span>
                {activePaper.acceptanceNote}
              </div>
            )}

            {/* Abstract */}
            <div className="mb-5 space-y-2">
              <span className="font-hud text-[10px] text-pink-400 tracking-widest uppercase block">
                RESEARCH ABSTRACT & PROBLEM STATEMENT:
              </span>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans bg-black/60 p-4 border border-white/10">
                {activePaper.abstract}
              </p>
            </div>

            {/* Method / Approach */}
            <div className="mb-5 space-y-1">
              <span className="font-hud text-[10px] text-cyan-400 tracking-widest uppercase block">
                METHODOLOGY & ARCHITECTURAL APPROACH:
              </span>
              <div className="text-xs text-neutral-300 font-sans p-3 bg-white/5 border border-white/10">
                {activePaper.methodApproach}
              </div>
            </div>

            {/* Related Skills */}
            <div className="mb-5">
              <span className="font-hud text-[10px] text-neutral-400 tracking-widest uppercase block mb-2">
                VERIFIED SKILLS APPLIED:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activePaper.relatedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[11px] font-hud bg-purple-950/70 border border-purple-500/50 text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Connected Project Link (Cross-Linking Rule) */}
            {activePaper.relatedProjectIds && activePaper.relatedProjectIds.length > 0 && (
              <div className="pt-4 border-t border-pink-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-hud text-[10px] text-pink-400 tracking-widest uppercase block">
                    RELATED IMPLEMENTATION:
                  </span>
                  <div className="text-xs text-neutral-300 font-mono">
                    {activePaper.relatedProjectIds.join(' • ')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    onSelectSection('projects');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-pink-950/80 hover:bg-[#ec008c] border border-pink-500 text-pink-200 hover:text-white text-xs font-hud font-bold tracking-wider transition-all cursor-pointer"
                >
                  <span>EXPLORE IN PROJECT VAULT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
