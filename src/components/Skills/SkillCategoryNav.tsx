import React from 'react';
import { gtaAudio } from '../../utils/audio';

export interface CategoryItemDef {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

interface SkillCategoryNavProps {
  categories: CategoryItemDef[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const SkillCategoryNav: React.FC<SkillCategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <nav
      aria-label="Technology Categories Console"
      className="w-full flex flex-col gap-1 p-3.5 rounded-2xl bg-neutral-950/95 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)] text-hd-sharp"
    >
      {/* Console Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/15 mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <h2 className="font-hud text-xs sm:text-[13px] tracking-[0.2em] text-amber-400 font-extrabold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            SKILLS VAULT
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-bold">
          NAV CONTROL
        </span>
      </div>

      {/* Category Rows */}
      <div className="flex flex-col gap-1.5" role="tablist">
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => {
                gtaAudio.playSelect();
                onSelectCategory(cat.id);
              }}
              className={`relative w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 outline-none ${
                isActive
                  ? 'bg-amber-400/15 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                  : 'bg-white/[0.03] border border-white/10 text-neutral-200 hover:text-white hover:bg-white/[0.07] hover:border-white/25'
              }`}
            >
              {/* Left active indicator pill */}
              {isActive && (
                <span
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]"
                  aria-hidden="true"
                />
              )}

              {/* Icon & Category Name */}
              <div className="flex items-center gap-2.5 min-w-0 pl-1.5">
                <span
                  className={`w-4 h-4 flex items-center justify-center transition-colors duration-200 shrink-0 ${
                    isActive ? 'text-amber-400' : 'text-neutral-300 group-hover:text-white'
                  }`}
                  aria-hidden="true"
                >
                  {cat.icon}
                </span>

                <span
                  className={`font-hud font-bold text-xs sm:text-[13px] tracking-wider uppercase truncate transition-colors ${
                    isActive ? 'text-amber-300 font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]' : 'text-neutral-100 group-hover:text-white'
                  }`}
                >
                  {cat.name}
                </span>
              </div>

              {/* Dot leader or spacer */}
              <div className="flex-1 mx-2 border-b border-dotted border-white/15 group-hover:border-white/30 transition-colors" />

              {/* Verified Count */}
              <span
                className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-400 text-black font-extrabold shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'text-neutral-300 bg-white/10 group-hover:text-white group-hover:bg-white/15'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
