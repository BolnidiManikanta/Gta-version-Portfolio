import React, { useState, useMemo } from 'react';
import { researchPublicationsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  BookOpen,
  ExternalLink,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
  Search,
  Sparkles,
} from 'lucide-react';

interface ResearchPageProps {
  onBack?: () => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = () => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'ACCEPTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResearchId, setSelectedResearchId] = useState<string>(
    researchPublicationsData[0]?.id || ''
  );

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
    researchPublicationsData.find((p) => p.id === selectedResearchId) ||
    researchPublicationsData[0];

  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-start p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-purple-600/30 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="font-hud text-xs text-purple-400 tracking-widest font-black uppercase flex items-center gap-2">
              <span>PEER-REVIEWED SCIENTIFIC RESEARCH</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>
            <h1 className="font-vice text-4xl sm:text-5xl text-white tracking-wide">
              RESEARCH PUBLICATIONS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">INDEX STATUS:</span>
          <span className="px-3 py-1 bg-black/80 border border-purple-500/50 text-purple-300 font-mono rounded">
            IEEE XPLORE INDEXED & PEER-REVIEWED
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-black/80 backdrop-blur-md border border-purple-500/40 p-4 rounded-sm shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['ALL', 'PUBLISHED', 'ACCEPTED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                gtaAudio.playSelect();
                setStatusFilter(filter);
              }}
              className={`px-3 py-1.5 rounded font-hud text-xs font-bold uppercase transition-all cursor-pointer ${
                statusFilter === filter
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, DOIs, domains..."
            className="w-full pl-9 pr-3 py-1.5 bg-black/80 border border-purple-500/40 rounded text-xs text-white placeholder-neutral-500 font-hud focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Publications Grid & Active Paper Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paper List */}
        <div className="space-y-4 lg:col-span-1">
          {filteredResearch.map((paper) => {
            const isSelected = paper.id === activePaper?.id;
            return (
              <div
                key={paper.id}
                onClick={() => {
                  gtaAudio.playSelect();
                  setSelectedResearchId(paper.id);
                }}
                className={`p-4 rounded-sm border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'bg-black/70 border-white/10 hover:border-purple-500/40 hover:bg-black/90'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-hud">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold uppercase">
                    {paper.venue}
                  </span>
                  <span className="font-mono text-emerald-400">{paper.status}</span>
                </div>

                <h3 className="font-sans font-bold text-sm text-white line-clamp-2">
                  {paper.title}
                </h3>

                <div className="text-[11px] font-hud text-neutral-400">
                  {paper.researchDomain} • {paper.date}
                </div>
              </div>
            );
          })}
        </div>

        {/* Paper Inspector */}
        {activePaper && (
          <div className="lg:col-span-2 bg-black/85 backdrop-blur-md border border-purple-500/40 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded bg-purple-950 text-purple-300 border border-purple-500/50 font-hud text-xs font-bold uppercase">
                  {activePaper.venue}
                </span>
                <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-mono text-xs">
                  {activePaper.status}
                </span>
                <span className="font-hud text-xs text-neutral-400 ml-auto">
                  {activePaper.year}
                </span>
              </div>

              <h2 className="font-sans font-bold text-2xl text-white leading-snug">
                {activePaper.title}
              </h2>

              <div className="text-xs font-hud text-neutral-300">
                <span className="text-purple-400 font-bold">AUTHORS:</span> {activePaper.authors.join(', ')}
              </div>

              <div className="text-xs font-hud text-purple-300">
                <span className="text-neutral-400 font-bold">DOMAIN:</span> {activePaper.researchDomain}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-hud text-xs text-purple-400 uppercase tracking-wider font-bold">
                ABSTRACT & METHODOLOGY:
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed bg-white/5 p-4 rounded border border-white/10">
                {activePaper.abstract || activePaper.description}
              </p>
            </div>

            {activePaper.doi && (
              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded font-mono text-xs text-neutral-300 flex items-center justify-between">
                <span className="text-neutral-400 font-hud">DOI REFERENCE:</span>
                <span className="text-pink-400 font-bold select-all">{activePaper.doi}</span>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              {activePaper.ieeeUrl ? (
                <a
                  href={activePaper.ieeeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-blue-900/90 hover:bg-blue-700 text-white font-hud text-xs font-bold tracking-wider border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VIEW PROCEEDINGS ON IEEE XPLORE</span>
                </a>
              ) : (
                <span className="text-xs font-hud text-neutral-400 italic">
                  {activePaper.statusNote || 'Proceedings indexed in conference repository'}
                </span>
              )}

              {activePaper.acceptanceNote && (
                <div className="flex items-center gap-1.5 font-hud text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{activePaper.acceptanceNote}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
