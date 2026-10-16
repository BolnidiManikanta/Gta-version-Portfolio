import React, { useMemo } from 'react';
import { VerifiedSkill } from '../../data/skillsCatalog';
import { getSkillIcon } from './SkillIcons';
import { Search, CheckCircle2, X, Cpu, ShieldAlert, Layers, Terminal, Sparkles } from 'lucide-react';

interface SkillDossierPanelProps {
  selectedSkill: VerifiedSkill;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProject?: (projectId: string) => void;
}

export const SkillDossierPanel: React.FC<SkillDossierPanelProps> = ({
  selectedSkill,
  searchQuery,
  onSearchChange,
}) => {
  // Parse Core Areas from the skill focus string
  const coreAreas = useMemo(() => {
    if (!selectedSkill.focus) return ['Architecture', 'Core Engineering', 'Optimization'];
    return selectedSkill.focus
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 6);
  }, [selectedSkill]);

  // Status mapping - factual, high-end MNC developer tier
  const statusLabel = useMemo(() => {
    const tag = selectedSkill.tag?.toLowerCase() || '';
    if (tag.includes('primary') || tag.includes('standard') || tag.includes('core')) {
      return 'PRODUCTION READY';
    }
    if (tag.includes('strict') || tag.includes('enterprise') || tag.includes('rdbms')) {
      return 'ACTIVE ENTERPRISE';
    }
    return 'ACTIVE CORE';
  }, [selectedSkill]);

  // Domain implementation metadata derived strictly from skill properties
  const technicalSpecs = useMemo(() => {
    const cat = selectedSkill.category.toUpperCase();
    if (cat.includes('AI') || cat.includes('MACHINE')) {
      return {
        role: 'Neural Architecture & Inference',
        standard: 'Evaluation Metrics & Pipeline Latency',
        icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      };
    }
    if (cat.includes('SECURITY')) {
      return {
        role: 'Offensive / Defensive Security',
        standard: 'Zero-Trust & Threat Mitigation',
        icon: <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />,
      };
    }
    if (cat.includes('FULL-STACK') || cat.includes('FRONTEND') || cat.includes('BACKEND')) {
      return {
        role: 'Full-Cycle Web Architecture',
        standard: 'State Management & REST API Spec',
        icon: <Layers className="w-3.5 h-3.5 text-emerald-400" />,
      };
    }
    if (cat.includes('PROGRAMMING')) {
      return {
        role: 'Algorithm Execution & Syntax',
        standard: 'Type Safety & Memory Efficiency',
        icon: <Terminal className="w-3.5 h-3.5 text-yellow-400" />,
      };
    }
    return {
      role: 'Production Infrastructure',
      standard: 'Scalability & Resilient Operations',
      icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />,
    };
  }, [selectedSkill]);

  return (
    <aside
      aria-label="Skill Intelligence"
      className="w-full flex flex-col gap-3 select-none text-hd-sharp"
    >
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search skills..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-neutral-950/95 border border-white/20 text-white placeholder-neutral-400 text-sm font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-md"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Intelligence Card */}
      <div className="p-5 rounded-2xl bg-neutral-950/95 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)] flex flex-col gap-4">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="font-hud text-xs tracking-[0.2em] text-amber-400 font-extrabold uppercase">
            SKILL INTELLIGENCE
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-300">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">49 VERIFIED SKILLS</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">8 TECH SECTORS</span>
          </div>
        </div>

        {/* Top: Tech Logo + Skill Name + Category + Verified Badge */}
        <div className="flex items-start justify-between gap-3 border-b border-white/15 pb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-white/25 flex items-center justify-center shrink-0 shadow-inner">
              {getSkillIcon(selectedSkill.name, selectedSkill.category, 'w-8 h-8')}
            </div>

            <div className="min-w-0">
              <h2 className="font-hud font-extrabold text-2xl sm:text-3xl text-white tracking-wide truncate leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {selectedSkill.name}
              </h2>
              <p className="text-xs sm:text-[13px] text-amber-300 font-mono font-bold tracking-wider truncate uppercase mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {selectedSkill.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400 text-amber-300 shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-hud font-extrabold tracking-wider uppercase">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Focus / Description (Concise 2-3 lines) */}
        <div>
          <span className="block text-xs font-hud font-extrabold text-neutral-300 tracking-[0.2em] uppercase mb-1.5">
            DESCRIPTION
          </span>
          <p className="text-sm text-neutral-100 font-sans leading-relaxed font-normal">
            {selectedSkill.focus}
          </p>
        </div>

        {/* Core Areas */}
        <div>
          <span className="block text-xs font-hud font-extrabold text-neutral-300 tracking-[0.2em] uppercase mb-2">
            CORE AREAS
          </span>
          <div className="flex flex-wrap gap-2">
            {coreAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-neutral-900 border border-cyan-400/30 text-cyan-200 text-xs sm:text-[13px] font-mono font-semibold tracking-wide shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Implementation Specs (Pure Skills Data) */}
        <div className="border-t border-white/15 pt-3.5 space-y-2.5">
          <span className="block text-xs font-hud font-extrabold text-neutral-300 tracking-[0.2em] uppercase">
            ARCHITECTURE SPECIFICATIONS
          </span>

          <div className="p-3 rounded-xl bg-neutral-900/90 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 font-mono text-[11px]">DOMAIN ROLE</span>
              <div className="flex items-center gap-1.5 text-neutral-100 font-hud font-bold">
                {technicalSpecs.icon}
                <span>{technicalSpecs.role}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-2">
              <span className="text-neutral-400 font-mono text-[11px]">STANDARDS</span>
              <span className="text-amber-300 font-mono text-[11px] font-semibold">
                {technicalSpecs.standard}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="border-t border-white/15 pt-3.5 flex items-center justify-between">
          <span className="text-xs font-hud font-extrabold text-neutral-300 tracking-[0.2em] uppercase">
            STATUS
          </span>
          <span className="font-mono text-xs sm:text-[13px] font-bold text-amber-300 tracking-widest bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/40 shadow-sm">
            {statusLabel}
          </span>
        </div>
      </div>
    </aside>
  );
};
