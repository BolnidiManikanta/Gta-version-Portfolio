import React, { useState } from 'react';
import { VerifiedSkill, matchCategory } from '../../data/skillsCatalog';
import { getSkillIcon } from './SkillIcons';
import { CenterpieceGlobe } from './CenterpieceGlobe';
import { gtaAudio } from '../../utils/audio';
import {
  ShieldAlert,
  Cpu,
  Layers,
  Terminal,
  Database,
  Cloud,
  Wrench,
  Sparkles,
  SearchX,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface SkillQuadrantPanelsProps {
  selectedSkill: VerifiedSkill | null;
  onSelectSkill: (skill: VerifiedSkill) => void;
  allSkills: VerifiedSkill[];
  filterCategoryId?: string;
  searchFilterQuery?: string;
  mousePos?: { x: number; y: number };
  onClearSearch?: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const SkillQuadrantPanels: React.FC<SkillQuadrantPanelsProps> = ({
  selectedSkill,
  onSelectSkill,
  allSkills,
  filterCategoryId = 'all',
  searchFilterQuery = '',
  mousePos = { x: 0, y: 0 },
  onClearSearch,
  onSelectCategory,
}) => {
  const [, setHoveredSkillId] = useState<string | null>(null);

  const handleSkillClick = (skill: VerifiedSkill) => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    onSelectSkill(skill);
  };

  const handleSkillHover = (skill: VerifiedSkill) => {
    setHoveredSkillId(skill.name);
    try {
      gtaAudio.playHover();
    } catch {
      // ignore
    }
  };

  // Helper to match skill against search query
  const skillMatchesSearch = (skill: VerifiedSkill, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const inName = skill.name.toLowerCase().includes(q);
    const inCat = skill.category.toLowerCase().includes(q);
    const inFocus = skill.focus ? skill.focus.toLowerCase().includes(q) : false;
    const inDesc = skill.description ? skill.description.toLowerCase().includes(q) : false;
    const inAreas = skill.coreAreas ? skill.coreAreas.some((a) => a.toLowerCase().includes(q)) : false;
    const inRelated = skill.relatedSkills ? skill.relatedSkills.some((r) => r.toLowerCase().includes(q)) : false;
    const inTools = skill.tools ? skill.tools.some((t) => t.toLowerCase().includes(q)) : false;
    return inName || inCat || inFocus || inDesc || inAreas || inRelated || inTools;
  };

  // Centralized category-filtered skills from the real dataset
  const aimlSkills = allSkills.filter((s) => matchCategory(s, 'ai-ml'));
  const cyberSkills = allSkills.filter((s) => matchCategory(s, 'cybersecurity'));
  const fullstackSkills = allSkills.filter((s) => matchCategory(s, 'fullstack'));
  const programmingSkills = allSkills.filter((s) => matchCategory(s, 'programming'));
  const databaseSkills = allSkills.filter((s) => matchCategory(s, 'databases'));
  const cloudSkills = allSkills.filter((s) => matchCategory(s, 'cloud-devops'));
  const toolsSkills = allSkills.filter((s) => matchCategory(s, 'tools'));

  // Skills for currently selected category
  const activeCategorySkills =
    filterCategoryId === 'all'
      ? allSkills
      : allSkills.filter((s) => matchCategory(s, filterCategoryId));

  // Skills filtered by search query
  const searchResults = activeCategorySkills.filter((s) =>
    skillMatchesSearch(s, searchFilterQuery)
  );

  // If search query is active and yields no results
  const isSearchActive = searchFilterQuery.trim().length > 0;
  const noResultsFound = isSearchActive && searchResults.length === 0;

  // Category title info
  const getCategoryMeta = (catId: string) => {
    switch (catId) {
      case 'programming':
        return {
          title: 'PROGRAMMING INTELLIGENCE',
          subtitle: 'CORE LANGUAGES THAT CREATE POSSIBILITIES',
          icon: <Terminal className="w-4 h-4 text-amber-400" />,
          color: 'text-amber-400',
          skills: programmingSkills,
        };
      case 'cybersecurity':
        return {
          title: 'CYBERSECURITY DEFENSE MATRIX',
          subtitle: 'SECURE SYSTEMS • SAFER TOMORROW • ZERO TRUST',
          icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
          color: 'text-rose-400',
          skills: cyberSkills,
        };
      case 'ai-ml':
        return {
          title: 'AI / MACHINE LEARNING CORE',
          subtitle: 'INTELLIGENCE FOR A BRIGHTER TOMORROW',
          icon: <Cpu className="w-4 h-4 text-purple-400" />,
          color: 'text-purple-400',
          skills: aimlSkills,
        };
      case 'fullstack':
        return {
          title: 'FULL-STACK DEVELOPMENT',
          subtitle: 'IDEAS TO APPLICATIONS • DISTRIBUTED SYSTEMS',
          icon: <Layers className="w-4 h-4 text-cyan-400" />,
          color: 'text-cyan-400',
          skills: fullstackSkills,
        };
      case 'databases':
        return {
          title: 'DATABASES & DATA ENGINES',
          subtitle: 'RELATIONAL & NOSQL PERSISTENCE • ACID ARCHITECTURE',
          icon: <Database className="w-4 h-4 text-amber-400" />,
          color: 'text-amber-400',
          skills: databaseSkills,
        };
      case 'cloud-devops':
        return {
          title: 'CLOUD & DEVOPS INFRASTRUCTURE',
          subtitle: 'CONTAINERS • KERNEL SYSTEMS • NETWORK PROTOCOLS',
          icon: <Cloud className="w-4 h-4 text-emerald-400" />,
          color: 'text-emerald-400',
          skills: cloudSkills,
        };
      case 'tools':
        return {
          title: 'DEVELOPMENT & SECURITY TOOLS',
          subtitle: 'COLLABORATION • TESTING • CLI UTILITIES',
          icon: <Wrench className="w-4 h-4 text-sky-400" />,
          color: 'text-sky-400',
          skills: toolsSkills,
        };
      default:
        return {
          title: 'ALL TECH SECTORS',
          subtitle: 'EXPLORE • INTERACT • MASTER',
          icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
          color: 'text-cyan-400',
          skills: allSkills,
        };
    }
  };

  const currentCatMeta = getCategoryMeta(filterCategoryId);

  return (
    <div className="relative w-full flex flex-col gap-4 select-none transition-all duration-500 ease-out">
      {/* =========================================================================
          NO RESULTS STATE WHEN SEARCHING (Requirement 8 & 9)
          ========================================================================= */}
      {noResultsFound ? (
        <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#030917]/90 border border-rose-500/40 text-center flex flex-col items-center justify-center my-12 shadow-[0_0_36px_rgba(244,63,94,0.3)] animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-rose-950/70 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-3 shadow-[0_0_16px_rgba(244,63,94,0.4)]">
            <SearchX className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-mono text-base font-black tracking-widest text-rose-200 uppercase mb-1">
            NO SKILL FOUND
          </h3>
          <p className="font-mono text-xs text-slate-300 tracking-wider mb-2">
            No verified skill matches &ldquo;{searchFilterQuery}&rdquo;
          </p>
          <p className="font-mono text-[10px] text-slate-400 tracking-wide mb-5 max-w-sm">
            Sector Filter:{' '}
            <strong className="text-cyan-300">
              {filterCategoryId.toUpperCase()}
            </strong>
            . Try searching Python, Java, Docker, React, or Security.
          </p>
          <div className="flex items-center gap-3">
            {onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-mono text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR SEARCH</span>
              </button>
            )}
            {onSelectCategory && filterCategoryId !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className="px-4 py-2 rounded-xl bg-black/60 hover:bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 font-mono text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                SEARCH ALL SECTORS
              </button>
            )}
          </div>
        </div>
      ) : filterCategoryId !== 'all' ? (
        /* =========================================================================
            DEDICATED CATEGORY ENVIRONMENT (Requirement 3, 4, 5, 19, 20-24)
            ========================================================================= */
        <div className="w-full flex flex-col gap-4 animate-in fade-in duration-300">
          {/* Category Sector Header Banner */}
          <div className="w-full rounded-2xl backdrop-blur-xl bg-[#030917]/85 border border-cyan-400/50 p-3.5 shadow-[0_0_24px_rgba(6,182,212,0.2)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                {currentCatMeta.icon}
              </span>
              <div>
                <h2 className="font-mono text-xs sm:text-sm md:text-base font-black tracking-widest text-cyan-100 uppercase">
                  {currentCatMeta.title}
                </h2>
                <p className="font-mono text-[9px] text-slate-400 tracking-wider uppercase mt-0.5">
                  {currentCatMeta.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
                {searchResults.length} SKILLS ACTIVE
              </span>
              {onSelectCategory && (
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className="hidden sm:flex items-center gap-1 font-mono text-[9px] px-2 py-1 rounded-lg bg-black/50 hover:bg-cyan-950 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>ALL SECTORS</span>
                </button>
              )}
            </div>
          </div>

          {/* Central 3D Globe / Core */}
          <div className="w-full flex items-center justify-center relative min-h-[300px] sm:min-h-[360px] my-1">
            <CenterpieceGlobe
              mousePos={mousePos}
              activeSectorName={currentCatMeta.title}
              activeSectorId={filterCategoryId}
              selectedSkillName={selectedSkill ? selectedSkill.name : undefined}
              totalSkillsCount={searchResults.length}
            />
          </div>

          {/* Dedicated Category Hexagonal Skill Modules Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {searchResults.map((skill, idx) => {
              const isSelected =
                selectedSkill &&
                selectedSkill.name.toLowerCase() === skill.name.toLowerCase();
              return (
                <button
                  key={`cat-skill-${skill.id || skill.name}-${idx}`}
                  type="button"
                  onClick={() => handleSkillClick(skill)}
                  onMouseEnter={() => handleSkillHover(skill)}
                  className={`group relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-500/30 to-amber-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-1 ring-cyan-300 scale-105 z-10'
                      : 'bg-[#020716]/80 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-cyan-950/50 hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Hexagonal container for icon */}
                    <div
                      className={`w-8 h-8 flex items-center justify-center transition-transform duration-200 ${
                        isSelected
                          ? 'bg-cyan-900 border border-cyan-300 text-cyan-200 scale-110 shadow-[0_0_10px_#00F0FF]'
                          : 'bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 group-hover:scale-110'
                      }`}
                      style={{
                        clipPath:
                          'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      <div className="scale-90">
                        {getSkillIcon(skill.name, skill.category, 'w-4 h-4')}
                      </div>
                    </div>

                    {skill.tag && (
                      <span className="font-mono text-[7px] text-cyan-400/90 bg-cyan-950/60 border border-cyan-500/20 px-1 py-0.2 rounded truncate max-w-[80px]">
                        {skill.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-2">
                    <span className="font-mono text-[11px] font-bold text-slate-100 group-hover:text-cyan-200 transition-colors leading-tight line-clamp-1 block">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[8px] text-slate-400 truncate block mt-0.5">
                      {skill.focus ? skill.focus.split(',')[0] : skill.category}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute bottom-1 right-1.5 flex items-center gap-1 text-[7px] font-mono text-cyan-300 font-bold">
                      <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================================
            ALL SECTORS VIEW (Standard Holographic Command Center Environment)
            ========================================================================= */
        <>
          {/* SECTION 8: AI / ML PANEL (UPPER CENTER) */}
          <section
            aria-label="AI / ML Panel"
            className="relative w-full max-w-4xl mx-auto rounded-2xl backdrop-blur-xl bg-[#030917]/80 border border-cyan-500/35 hover:border-cyan-400/60 transition-all duration-300 p-4 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.12)]"
          >
            <div
              onClick={() => onSelectCategory && onSelectCategory('ai-ml')}
              className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3 cursor-pointer group"
              title="Filter by AI / ML Sector"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-purple-400 group-hover:border-purple-400 transition-colors">
                  <Cpu className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-mono text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-cyan-100 group-hover:text-purple-300 uppercase transition-colors">
                    AI / ML
                  </h3>
                  <p className="font-mono text-[8px] sm:text-[9px] tracking-wider text-slate-400 uppercase">
                    INTELLIGENCE FOR A BRIGHTER TOMORROW
                  </p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-purple-300 bg-purple-950/60 border border-purple-500/30 group-hover:border-purple-400 px-2 py-0.5 rounded font-bold transition-colors">
                {aimlSkills.length} CORE NODES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {aimlSkills.slice(0, 6).map((skill, idx) => {
                const isSelected =
                  selectedSkill &&
                  selectedSkill.name.toLowerCase() === skill.name.toLowerCase();
                const matches = skillMatchesSearch(skill, searchFilterQuery);
                return (
                  <button
                    key={`aiml-${skill.name}-${idx}`}
                    type="button"
                    onClick={() => handleSkillClick(skill)}
                    onMouseEnter={() => handleSkillHover(skill)}
                    className={`group relative text-left p-2 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between text-center min-h-[72px] overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/25 border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.5)] scale-105'
                        : matches
                        ? 'bg-black/40 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:scale-[1.02]'
                        : 'bg-black/20 border-slate-800/60 opacity-30 hover:opacity-80'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      {getSkillIcon(skill.name, skill.category, 'w-4 h-4')}
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-cyan-200 transition-colors leading-tight line-clamp-1 mt-1">
                      {skill.name}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF] mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* MIDDLE ROW: CYBERSECURITY + 3D GLOBE + FULL-STACK */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center w-full">
            {/* SECTION 9: CYBERSECURITY PANEL (LEFT) */}
            <section
              aria-label="Cybersecurity Panel"
              className="lg:col-span-3 rounded-2xl backdrop-blur-xl bg-[#030917]/80 border border-cyan-500/35 hover:border-cyan-400/60 transition-all duration-300 p-3.5 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.12)] flex flex-col justify-between"
              style={{ transform: 'perspective(800px) rotateY(4deg)' }}
            >
              <div
                onClick={() => onSelectCategory && onSelectCategory('cybersecurity')}
                className="flex items-start justify-between border-b border-cyan-500/20 pb-2 mb-2.5 cursor-pointer group"
                title="Filter by Cybersecurity Sector"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-rose-400 group-hover:border-rose-400 transition-colors">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-cyan-100 group-hover:text-rose-300 uppercase transition-colors">
                      CYBERSECURITY
                    </h3>
                  </div>
                  <p className="font-mono text-[8px] tracking-wider text-slate-400 uppercase mt-0.5">
                    SECURE SYSTEMS • SAFER TOMORROW
                  </p>
                </div>
                <span className="font-mono text-[8px] text-rose-300 bg-rose-950/60 border border-rose-500/30 group-hover:border-rose-400 px-1.5 py-0.2 rounded font-bold transition-colors">
                  {cyberSkills.length} CORE
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {cyberSkills.slice(0, 6).map((skill, idx) => {
                  const isSelected =
                    selectedSkill &&
                    selectedSkill.name.toLowerCase() === skill.name.toLowerCase();
                  const matches = skillMatchesSearch(skill, searchFilterQuery);
                  return (
                    <button
                      key={`cyber-${skill.name}-${idx}`}
                      type="button"
                      onClick={() => handleSkillClick(skill)}
                      onMouseEnter={() => handleSkillHover(skill)}
                      className={`group relative w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/25 border-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.5)] translate-x-1'
                          : matches
                          ? 'bg-black/40 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:translate-x-0.5'
                          : 'bg-black/20 border-slate-800/60 opacity-30 hover:opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                          {getSkillIcon(skill.name, skill.category, 'w-3.5 h-3.5')}
                        </div>
                        <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-cyan-200 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
                      )}
                    </button>
                  );
                })}
                {cyberSkills.length > 6 && onSelectCategory && (
                  <button
                    type="button"
                    onClick={() => onSelectCategory('cybersecurity')}
                    className="mt-1 py-1 px-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/25 text-rose-300 hover:text-white font-mono text-[9px] font-bold text-center tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    + {cyberSkills.length - 6} MORE CYBER SKILLS
                  </button>
                )}
              </div>
            </section>

            {/* SECTION 7 & 11: CENTERPIECE 3D GLOBE */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] sm:min-h-[440px]">
              <CenterpieceGlobe
                mousePos={mousePos}
                activeSectorName="ALL SECTORS"
                activeSectorId="all"
                selectedSkillName={selectedSkill ? selectedSkill.name : undefined}
                totalSkillsCount={allSkills.length}
              />
            </div>

            {/* SECTION 10: FULL-STACK PANEL (RIGHT) */}
            <section
              aria-label="Full-Stack Panel"
              className="lg:col-span-3 rounded-2xl backdrop-blur-xl bg-[#030917]/80 border border-cyan-500/35 hover:border-cyan-400/60 transition-all duration-300 p-3.5 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.12)] flex flex-col justify-between"
              style={{ transform: 'perspective(800px) rotateY(-4deg)' }}
            >
              <div
                onClick={() => onSelectCategory && onSelectCategory('fullstack')}
                className="flex items-start justify-between border-b border-cyan-500/20 pb-2 mb-2.5 cursor-pointer group"
                title="Filter by Full-Stack Sector"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-sky-400 group-hover:border-sky-400 transition-colors">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-cyan-100 group-hover:text-cyan-300 uppercase transition-colors">
                      FULL-STACK
                    </h3>
                  </div>
                  <p className="font-mono text-[8px] tracking-wider text-slate-400 uppercase mt-0.5">
                    IDEAS TO APPLICATIONS
                  </p>
                </div>
                <span className="font-mono text-[8px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 group-hover:border-cyan-400 px-1.5 py-0.2 rounded font-bold transition-colors">
                  {fullstackSkills.length} CORE
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {fullstackSkills.slice(0, 6).map((skill, idx) => {
                  const isSelected =
                    selectedSkill &&
                    selectedSkill.name.toLowerCase() === skill.name.toLowerCase();
                  const matches = skillMatchesSearch(skill, searchFilterQuery);
                  return (
                    <button
                      key={`fullstack-${skill.name}-${idx}`}
                      type="button"
                      onClick={() => handleSkillClick(skill)}
                      onMouseEnter={() => handleSkillHover(skill)}
                      className={`group relative w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/25 border-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.5)] translate-x-1'
                          : matches
                          ? 'bg-black/40 border-cyan-500/20 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:translate-x-0.5'
                          : 'bg-black/20 border-slate-800/60 opacity-30 hover:opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                          {getSkillIcon(skill.name, skill.category, 'w-3.5 h-3.5')}
                        </div>
                        <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-cyan-200 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
                      )}
                    </button>
                  );
                })}
                {fullstackSkills.length > 6 && onSelectCategory && (
                  <button
                    type="button"
                    onClick={() => onSelectCategory('fullstack')}
                    className="mt-1 py-1 px-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/25 text-cyan-300 hover:text-white font-mono text-[9px] font-bold text-center tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    + {fullstackSkills.length - 6} MORE FULL-STACK SKILLS
                  </button>
                )}
              </div>
            </section>
          </div>

          {/* SECTION 12: PROGRAMMING PANEL (BOTTOM CENTER) */}
          <section
            aria-label="Programming Panel"
            className="relative w-full max-w-4xl mx-auto rounded-2xl backdrop-blur-xl bg-[#030917]/80 border border-cyan-500/35 hover:border-cyan-400/60 transition-all duration-300 p-4 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.12)]"
          >
            <div
              onClick={() => onSelectCategory && onSelectCategory('programming')}
              className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3 cursor-pointer group"
              title="Filter by Programming Sector"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-amber-400 group-hover:border-amber-400 transition-colors">
                  <Terminal className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-mono text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-cyan-100 group-hover:text-amber-300 uppercase transition-colors">
                    PROGRAMMING
                  </h3>
                  <p className="font-mono text-[8px] sm:text-[9px] tracking-wider text-slate-400 uppercase">
                    LANGUAGES THAT CREATE POSSIBILITIES
                  </p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-amber-300 bg-amber-950/60 border border-amber-500/30 group-hover:border-amber-400 px-2 py-0.5 rounded font-bold transition-colors">
                {programmingSkills.length} CORE LANGUAGES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {programmingSkills.map((skill, idx) => {
                const isSelected =
                  selectedSkill &&
                  selectedSkill.name.toLowerCase() === skill.name.toLowerCase();
                const matches = skillMatchesSearch(skill, searchFilterQuery);
                return (
                  <button
                    key={`prog-${skill.name}-${idx}`}
                    type="button"
                    onClick={() => handleSkillClick(skill)}
                    onMouseEnter={() => handleSkillHover(skill)}
                    className={`group relative p-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between text-center min-h-[82px] overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500/30 to-amber-500/20 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.6)] scale-105'
                        : matches
                        ? 'bg-black/40 border-cyan-500/25 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:scale-[1.03]'
                        : 'bg-black/20 border-slate-800/60 opacity-30 hover:opacity-80'
                    }`}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center bg-cyan-950/90 border border-cyan-400/50 group-hover:border-amber-400 group-hover:scale-110 transition-all duration-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      style={{
                        clipPath:
                          'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      <div className="scale-90">
                        {getSkillIcon(skill.name, skill.category, 'w-4 h-4')}
                      </div>
                    </div>

                    <span className="font-mono text-[10px] sm:text-[11px] font-extrabold text-slate-100 group-hover:text-cyan-200 transition-colors leading-tight line-clamp-1 mt-1.5">
                      {skill.name}
                    </span>

                    {isSelected ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF] mt-1" />
                    ) : (
                      <span className="font-mono text-[8px] text-slate-500 uppercase mt-0.5">
                        LANG
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* SUPPLEMENTAL QUICK JUMP SECTORS CHIPS */}
          <div className="w-full max-w-4xl mx-auto rounded-xl bg-black/40 border border-cyan-500/20 p-2.5 flex items-center justify-between flex-wrap gap-2">
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              ADDITIONAL SECTORS:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                {
                  id: 'databases',
                  label: 'DATABASES',
                  count: databaseSkills.length,
                  icon: <Database className="w-3 h-3" />,
                },
                {
                  id: 'cloud-devops',
                  label: 'CLOUD & DEVOPS',
                  count: cloudSkills.length,
                  icon: <Cloud className="w-3 h-3" />,
                },
                {
                  id: 'tools',
                  label: 'TOOLS',
                  count: toolsSkills.length,
                  icon: <Wrench className="w-3 h-3" />,
                },
              ].map((sector) => (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(sector.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/25 hover:border-cyan-400 text-cyan-300 font-mono text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                >
                  {sector.icon}
                  <span>{sector.label}</span>
                  <span className="bg-cyan-900/80 px-1 py-0.2 rounded text-[8px] text-amber-300">
                    {sector.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
