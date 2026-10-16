import React from 'react';
import {
  LayoutGrid,
  Code2,
  ShieldAlert,
  Cpu,
  Layers,
  Database,
  Cloud,
  Wrench,
  Radio,
  Sparkles,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { gtaAudio } from '../../utils/audio';

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

interface SkillSidebarNavProps {
  categories: CategoryItem[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  totalSkillsCount?: number;
}

export const SkillSidebarNav: React.FC<SkillSidebarNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  totalSkillsCount = 49,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'all':
        return <LayoutGrid className="w-3.5 h-3.5" />;
      case 'programming':
        return <Code2 className="w-3.5 h-3.5" />;
      case 'cybersecurity':
        return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'ai-ml':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'fullstack':
        return <Layers className="w-3.5 h-3.5" />;
      case 'databases':
        return <Database className="w-3.5 h-3.5" />;
      case 'cloud-devops':
        return <Cloud className="w-3.5 h-3.5" />;
      case 'tools':
        return <Wrench className="w-3.5 h-3.5" />;
      default:
        return <Terminal className="w-3.5 h-3.5" />;
    }
  };

  const handleCategoryClick = (id: string) => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    onSelectCategory(id);
  };

  const handleCategoryHover = () => {
    try {
      gtaAudio.playHover();
    } catch {
      // ignore
    }
  };

  return (
    <aside
      aria-label="Skill Vault Navigation"
      className="w-full flex flex-col gap-3.5 select-none"
    >
      {/* =========================================================================
          SECTION 4: LEFT SIDEBAR — SKILLS VAULT
          ========================================================================= */}
      <div className="relative rounded-2xl backdrop-blur-xl bg-[#030917]/85 border border-cyan-500/35 p-3.5 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.14),inset_0_1px_1px_rgba(255,255,255,0.08)]">
        {/* Heading & Subtitle */}
        <div className="border-b border-cyan-500/20 pb-2.5 mb-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-cyan-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
              SKILLS VAULT
            </h2>
            <span className="font-mono text-[9px] text-cyan-400/80 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.5 rounded">
              SEC.08
            </span>
          </div>
          <p className="font-mono text-[8px] sm:text-[9px] tracking-widest text-slate-400 mt-1 uppercase">
            EXPLORE • INTERACT • MASTER
          </p>
        </div>

        {/* Categories List */}
        <nav className="flex flex-col gap-1" aria-label="Skill Sectors">
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                onMouseEnter={handleCategoryHover}
                className={`group relative w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-amber-500/15 border-cyan-400 text-cyan-100 shadow-[0_0_14px_rgba(6,182,212,0.45)] translate-x-1'
                    : 'bg-black/30 border-cyan-500/10 text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-950/40 hover:text-cyan-200 hover:translate-x-0.5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`transition-colors ${
                      isActive
                        ? 'text-cyan-300 drop-shadow-[0_0_6px_#00F0FF]'
                        : 'text-slate-400 group-hover:text-cyan-400'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                  </span>
                  <span className="tracking-wider uppercase text-[10px] sm:text-[11px] truncate max-w-[110px] text-left">
                    {cat.name}
                  </span>
                </div>

                {/* Badge Count with cyan/yellow highlight when active */}
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded transition-all ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-[0_0_8px_#F59E0B]'
                      : 'bg-cyan-950/60 text-cyan-300/80 border border-cyan-500/20 group-hover:border-cyan-400/50'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* =========================================================================
          SECTION 5: LEFT SIDEBAR QUOTE PANEL
          "“TECHNOLOGY
           TURNS IDEAS
           INTO IMPACT”
           Below:
           Bolnidi Manikanta
           Use handwritten/signature styling for the name."
          ========================================================================= */}
      <div className="relative rounded-2xl backdrop-blur-xl bg-[#030917]/85 border border-cyan-500/35 p-3.5 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.14)] overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

        <p className="font-mono text-[11px] leading-relaxed text-slate-200 tracking-wider">
          &ldquo;TECHNOLOGY
          <br />
          TURNS IDEAS
          <br />
          <span className="text-cyan-300 font-extrabold drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
            INTO IMPACT
          </span>
          &rdquo;
        </p>

        {/* Signature styled name */}
        <div className="mt-3 pt-2.5 border-t border-cyan-500/20 flex flex-col">
          <span className="font-mono text-[8px] tracking-widest text-slate-400 uppercase">
            SIGNATURE
          </span>
          <span
            className="text-base sm:text-lg text-amber-300 font-serif italic font-bold tracking-wide mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] select-none"
            style={{
              fontFamily: "'Brush Script MT', 'Caveat', 'Playfair Display', cursive, serif",
            }}
          >
            Bolnidi Manikanta
          </span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6: SYSTEM STATUS PANEL
          "SYSTEM STATUS
           ● ONLINE
           49 VERIFIED SKILLS
           8 TECH SECTORS
           READY FOR WHAT'S NEXT
           Use small futuristic status icons."
          ========================================================================= */}
      <div className="relative rounded-2xl backdrop-blur-xl bg-[#030917]/85 border border-cyan-500/35 p-3.5 shadow-[0_12px_36px_rgba(2,6,18,0.7),0_0_24px_rgba(6,182,212,0.14)] flex flex-col gap-2.5">
        {/* Status Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-semibold">
            SYSTEM STATUS
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            <span className="font-mono text-[9px] font-extrabold text-emerald-300 tracking-wider">
              ONLINE
            </span>
          </div>
        </div>

        {/* Telemetry Numbers */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-lg bg-black/40 border border-cyan-500/15">
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span className="font-mono text-sm sm:text-base font-extrabold text-cyan-200">
                {totalSkillsCount}
              </span>
            </div>
            <span className="font-mono text-[8px] text-slate-400 tracking-wider uppercase block mt-0.5">
              VERIFIED SKILLS
            </span>
          </div>

          <div className="p-2 rounded-lg bg-black/40 border border-cyan-500/15">
            <div className="flex items-center justify-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span className="font-mono text-sm sm:text-base font-extrabold text-cyan-200">
                8
              </span>
            </div>
            <span className="font-mono text-[8px] text-slate-400 tracking-wider uppercase block mt-0.5">
              TECH SECTORS
            </span>
          </div>
        </div>

        {/* Ready Indicator */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20">
          <span className="font-mono text-[9px] font-semibold text-cyan-300 tracking-wider flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-spin" />
            READY FOR WHAT&apos;S NEXT
          </span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    </aside>
  );
};
