import React from 'react';
import { VerifiedSkill, getSkillDossier } from '../../data/skillsCatalog';
import { getSkillIcon } from './SkillIcons';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Brain,
  Cpu,
  Search,
  X,
  Wrench,
  Layers,
} from 'lucide-react';
import { gtaAudio } from '../../utils/audio';

interface SkillIntelligencePanelProps {
  selectedSkill: VerifiedSkill | null;
  onSelectSkill?: (skill: VerifiedSkill) => void;
  onCloseSkill?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchesCount?: number;
  totalSkillsCount?: number;
  allSkills?: VerifiedSkill[];
}

export const SkillIntelligencePanel: React.FC<SkillIntelligencePanelProps> = ({
  selectedSkill,
  onSelectSkill,
  onCloseSkill,
  searchQuery,
  onSearchChange,
  matchesCount,
  totalSkillsCount = 49,
  allSkills = [],
}) => {
  // Obtain enriched dossier data if a skill is selected
  const dossier = selectedSkill ? getSkillDossier(selectedSkill) : null;

  const handleClear = () => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    onSearchChange('');
  };

  const handleClose = () => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    if (onCloseSkill) {
      onCloseSkill();
    }
  };

  const handleRelatedClick = (relatedName: string) => {
    if (!onSelectSkill || !allSkills.length) return;
    const lower = relatedName.toLowerCase().trim();
    const found = allSkills.find(
      (s) => s.name.toLowerCase() === lower || s.name.toLowerCase().includes(lower)
    );
    if (found) {
      try {
        gtaAudio.playSelect();
      } catch {}
      onSelectSkill(found);
    }
  };

  return (
    <aside
      aria-label="Skill Intelligence Dossier"
      className="w-full flex flex-col gap-3.5 select-none"
    >
      {/* =========================================================================
          SECTION 14: SEARCH BOX AT TOP OF RIGHT SIDEBAR
          ========================================================================= */}
      <div className="relative w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search skills (e.g. Python, Docker...)"
            className="w-full pl-3.5 pr-20 py-2 rounded-xl backdrop-blur-md bg-[#040a18]/90 border border-cyan-500/35 text-cyan-100 placeholder:text-slate-400 font-mono text-[11px] focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-all"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-md text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {matchesCount !== undefined && searchQuery.trim() && (
              <span
                className={`font-mono text-[8px] font-bold px-1.5 py-0.2 rounded border ${
                  matchesCount === 0
                    ? 'text-rose-300 bg-rose-950/80 border-rose-500/40'
                    : 'text-amber-300 bg-amber-950/80 border-amber-500/30'
                }`}
              >
                {matchesCount === 0 ? '0' : matchesCount}
              </span>
            )}

            <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              <Search className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Intelligence Container */}
      <div className="relative rounded-2xl backdrop-blur-xl bg-[#030917]/85 border border-cyan-500/35 p-3.5 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.14),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-3.5">
        {/* =========================================================================
            SECTION 13: TOP & AI / HUMAN BRAIN HOLOGRAPHIC ILLUSTRATION
            ========================================================================= */}
        <div className="border-b border-cyan-500/20 pb-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-cyan-200 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-cyan-400" />
              SKILL INTELLIGENCE
            </h2>
            <span className="font-mono text-[9px] text-amber-400 bg-amber-950/50 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
              AI MATRIX
            </span>
          </div>

          {/* Futuristic AI / Human-Brain Holographic Illustration */}
          <div className="relative w-full h-28 rounded-xl bg-gradient-to-b from-[#020614] to-[#040e24] border border-cyan-500/25 overflow-hidden flex items-center justify-center p-2">
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(6,182,212,0.6) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />

            {/* Brain Silhouette & Synaptic Neural Network SVG */}
            <svg viewBox="0 0 280 100" className="w-full h-full relative z-10">
              <path
                d="M 60 50 Q 70 20 100 25 Q 120 15 140 22 Q 160 15 180 25 Q 210 20 220 50 Q 225 75 190 85 Q 160 88 140 82 Q 120 88 90 85 Q 55 75 60 50 Z"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.4"
              />

              {/* Connecting Synaptic Lines */}
              <line x1="55" y1="50" x2="90" y2="30" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
              <line x1="55" y1="50" x2="90" y2="70" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
              <line x1="90" y1="30" x2="140" y2="28" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
              <line x1="90" y1="30" x2="140" y2="70" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
              <line x1="90" y1="70" x2="140" y2="28" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
              <line x1="90" y1="70" x2="140" y2="70" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
              <line x1="140" y1="28" x2="190" y2="30" stroke="#00F0FF" strokeWidth="1.1" opacity="0.7" />
              <line x1="140" y1="28" x2="190" y2="70" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
              <line x1="140" y1="70" x2="190" y2="50" stroke="#00F0FF" strokeWidth="1.2" opacity="0.8" />
              <line x1="190" y1="30" x2="225" y2="50" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
              <line x1="190" y1="50" x2="225" y2="50" stroke="#00F0FF" strokeWidth="1.3" opacity="0.9" />
              <line x1="190" y1="70" x2="225" y2="50" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />

              {/* Neural Synaptic Nodes */}
              <circle cx="55" cy="50" r="3" fill="#0EA5E9" />
              <circle cx="90" cy="30" r="3.5" fill="#06B6D4" />
              <circle cx="90" cy="70" r="3" fill="#06B6D4" />
              <circle cx="140" cy="28" r="4" fill="#38BDF8" />
              <circle cx="140" cy="70" r="3.5" fill="#38BDF8" />
              <circle cx="190" cy="30" r="3.5" fill="#06B6D4" />
              <circle cx="190" cy="50" r="5" fill="#00F0FF" className="animate-ping" style={{ transformOrigin: '190px 50px' }} />
              <circle cx="190" cy="50" r="4.5" fill="#00F0FF" />
              <circle cx="190" cy="70" r="3" fill="#06B6D4" />
              <circle cx="225" cy="50" r="4.5" fill="#F59E0B" />
            </svg>

            {/* Neural Matrix Badge */}
            <div className="absolute bottom-1.5 left-2.5 flex items-center gap-1 font-mono text-[8px] text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>NEURAL SYNAPSE ACTIVE</span>
            </div>
          </div>

          {/* Text: LEARN • PRACTICE • BUILD • GROW • REPEAT */}
          <div className="mt-2.5 pt-2 border-t border-cyan-500/15 flex items-center justify-between text-center font-mono text-[9px] font-bold text-cyan-300/90 tracking-wider">
            <span>LEARN</span>
            <span className="text-cyan-500/40">•</span>
            <span>PRACTICE</span>
            <span className="text-cyan-500/40">•</span>
            <span>BUILD</span>
            <span className="text-cyan-500/40">•</span>
            <span>GROW</span>
            <span className="text-cyan-500/40">•</span>
            <span className="text-amber-300">REPEAT</span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 13: VERIFIED SKILLS & TECH SECTORS
            ========================================================================= */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-xl bg-black/45 border border-cyan-500/20 flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-black text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              {totalSkillsCount}
            </span>
            <span className="font-mono text-[8px] text-slate-400 tracking-wider uppercase mt-0.5">
              VERIFIED SKILLS
            </span>
          </div>
          <div className="p-2 rounded-xl bg-black/45 border border-cyan-500/20 flex flex-col items-center">
            <span className="font-mono text-xl sm:text-2xl font-black text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              8
            </span>
            <span className="font-mono text-[8px] text-slate-400 tracking-wider uppercase mt-0.5">
              TECH SECTORS
            </span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 7 & 14 & 15: SELECTED SKILL INTELLIGENCE DOSSIER / PLACEHOLDER
            ========================================================================= */}
        {dossier ? (
          <div className="p-3.5 rounded-xl bg-black/55 border border-cyan-500/30 flex flex-col gap-3 shadow-inner animate-in fade-in zoom-in-95 duration-200">
            {/* Skill Title, Verified Badge & Close Button */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black/70 border border-cyan-400/40 p-1 flex items-center justify-center shrink-0">
                  {getSkillIcon(dossier.name, dossier.category, 'w-5 h-5')}
                </div>
                <div>
                  <h3 className="font-mono text-sm sm:text-base font-black tracking-widest text-cyan-100 uppercase">
                    {dossier.name}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase block">
                    {dossier.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono text-[8px] font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-cyan-400 text-black shadow-[0_0_10px_#22D3EE] flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  VERIFIED
                </span>
                {onCloseSkill && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1 rounded-md bg-white/5 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-400/50 transition-colors cursor-pointer"
                    title="Close Skill Intelligence (Deselect)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h4 className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase mb-1 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                DESCRIPTION
              </h4>
              <p className="font-mono text-[11px] text-slate-300 leading-relaxed bg-black/40 p-2 rounded-lg border border-cyan-500/10">
                {dossier.description}
              </p>
            </div>

            {/* CORE AREAS */}
            <div>
              <h4 className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                CORE AREAS
              </h4>
              <div className="flex flex-wrap gap-1">
                {dossier.coreAreas &&
                  dossier.coreAreas.map((area, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/25 text-cyan-200"
                    >
                      {area}
                    </span>
                  ))}
              </div>
            </div>

            {/* ARCHITECTURE ROLE */}
            <div>
              <h4 className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                ARCHITECTURE ROLE
              </h4>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/25 text-emerald-300 font-mono text-[10px] font-semibold tracking-wide">
                {dossier.architectureRole}
              </div>
            </div>

            {/* RELATED SKILLS */}
            {dossier.relatedSkills && dossier.relatedSkills.length > 0 && (
              <div>
                <h4 className="font-mono text-[9px] tracking-widest text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-sky-400" />
                  RELATED SKILLS
                </h4>
                <div className="flex flex-wrap gap-1">
                  {dossier.relatedSkills.map((rel, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRelatedClick(rel)}
                      className="font-mono text-[8px] px-2 py-0.5 rounded bg-black/40 hover:bg-cyan-950/70 border border-cyan-500/15 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-200 transition-colors cursor-pointer"
                      title={`View ${rel}`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TOOLS / TECHNOLOGIES */}
            {dossier.tools && dossier.tools.length > 0 && (
              <div>
                <h4 className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase mb-1 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-cyan-400" />
                  TOOLS / TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1">
                  {dossier.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="font-mono text-[8px] font-semibold tracking-wider px-2 py-0.5 rounded bg-sky-950/70 border border-sky-500/25 text-sky-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* When NO skill is selected (Requirement 7 & 14) */
          <div className="p-8 rounded-xl bg-black/45 border border-cyan-500/25 text-center flex flex-col items-center justify-center min-h-[260px] animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-3 shadow-[0_0_16px_rgba(6,182,212,0.3)] animate-pulse">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-mono text-xs sm:text-sm font-black tracking-widest text-cyan-100 uppercase mb-1">
              SELECT A SKILL
            </h3>
            <p className="font-mono text-[10px] text-slate-400 tracking-wider">
              Choose a skill to view intelligence.
            </p>
          </div>
        )}

        {/* BOTTOM MOTTO: SAME STUDENT • DIFFERENT MINDSET • BIGGER GOALS */}
        <div className="pt-2 border-t border-cyan-500/20 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-300 uppercase font-bold leading-relaxed">
            SAME STUDENT
            <br />
            <span className="text-cyan-400">DIFFERENT MINDSET</span>
            <br />
            <span className="text-amber-300">BIGGER GOALS</span>
          </p>
        </div>
      </div>
    </aside>
  );
};
