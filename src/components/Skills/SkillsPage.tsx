import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ALL_VERIFIED_SKILLS,
  VerifiedSkill,
  matchCategory,
} from '../../data/skillsCatalog';
import { SkillTopHUD } from './SkillTopHUD';
import { SkillSidebarNav, CategoryItem } from './SkillSidebarNav';
import { SkillQuadrantPanels } from './SkillQuadrantPanels';
import { SkillIntelligencePanel } from './SkillIntelligencePanel';
import { ThreeSkillEnvironment } from './ThreeSkillEnvironment';
import { gtaAudio } from '../../utils/audio';

export interface SkillsPageProps {
  onBack?: () => void;
  onNavigate?: (route: string) => void;
  onGoHome?: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({
  onBack,
  onNavigate,
  onGoHome,
}) => {
  // 1. Centralized skills dataset (Requirement 2)
  const allSkills = ALL_VERIFIED_SKILLS;

  // 2. Dynamically computed category counts from dataset (Requirement 2 & 15)
  const categoryItems: CategoryItem[] = useMemo(() => {
    return [
      {
        id: 'all',
        name: 'ALL SECTORS',
        count: allSkills.length,
      },
      {
        id: 'programming',
        name: 'PROGRAMMING',
        count: allSkills.filter((s) => matchCategory(s, 'programming')).length,
      },
      {
        id: 'cybersecurity',
        name: 'CYBERSECURITY',
        count: allSkills.filter((s) => matchCategory(s, 'cybersecurity')).length,
      },
      {
        id: 'ai-ml',
        name: 'AI / ML',
        count: allSkills.filter((s) => matchCategory(s, 'ai-ml')).length,
      },
      {
        id: 'fullstack',
        name: 'FULL-STACK',
        count: allSkills.filter((s) => matchCategory(s, 'fullstack')).length,
      },
      {
        id: 'databases',
        name: 'DATABASES',
        count: allSkills.filter((s) => matchCategory(s, 'databases')).length,
      },
      {
        id: 'cloud-devops',
        name: 'CLOUD & DEVOPS',
        count: allSkills.filter((s) => matchCategory(s, 'cloud-devops')).length,
      },
      {
        id: 'tools',
        name: 'TOOLS',
        count: allSkills.filter((s) => matchCategory(s, 'tools')).length,
      },
    ];
  }, [allSkills]);

  // Primary states
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<VerifiedSkill | null>(
    () => allSkills.find((s) => s.name.toLowerCase() === 'python') || allSkills[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Mouse Parallax movement (3-layer depth, throttled via RAF)
  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter skills based on Category + Search query working together (Requirement 9)
  const categoryFilteredSkills = useMemo(() => {
    if (activeCategoryId === 'all') return allSkills;
    return allSkills.filter((s) => matchCategory(s, activeCategoryId));
  }, [allSkills, activeCategoryId]);

  const matchingSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return categoryFilteredSkills;
    return categoryFilteredSkills.filter((skill) => {
      const inName = skill.name.toLowerCase().includes(q);
      const inCat = skill.category.toLowerCase().includes(q);
      const inFocus = skill.focus ? skill.focus.toLowerCase().includes(q) : false;
      const inDesc = skill.description ? skill.description.toLowerCase().includes(q) : false;
      const inAreas = skill.coreAreas ? skill.coreAreas.some((a) => a.toLowerCase().includes(q)) : false;
      const inRelated = skill.relatedSkills ? skill.relatedSkills.some((r) => r.toLowerCase().includes(q)) : false;
      const inTools = skill.tools ? skill.tools.some((t) => t.toLowerCase().includes(q)) : false;
      return inName || inCat || inFocus || inDesc || inAreas || inRelated || inTools;
    });
  }, [categoryFilteredSkills, searchQuery]);

  // When search query changes, automatically select the best match from the results
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        // Exact match first
        const exact = categoryFilteredSkills.find(
          (s) => s.name.toLowerCase() === q || s.id.toLowerCase() === q
        );
        if (exact) {
          setSelectedSkill(exact);
          return;
        }
        // Starts-with match
        const startsWith = categoryFilteredSkills.find((s) =>
          s.name.toLowerCase().startsWith(q)
        );
        if (startsWith) {
          setSelectedSkill(startsWith);
          return;
        }
        // Substring match
        const found = categoryFilteredSkills.find((s) => {
          const inName = s.name.toLowerCase().includes(q);
          const inCat = s.category.toLowerCase().includes(q);
          const inFocus = s.focus ? s.focus.toLowerCase().includes(q) : false;
          return inName || inCat || inFocus;
        });
        if (found) {
          setSelectedSkill(found);
        }
      }
    },
    [categoryFilteredSkills]
  );

  // Clear search query
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Category selection handler with smooth 450ms cinematic transition (Requirement 4)
  const handleSelectCategory = (categoryId: string) => {
    if (activeCategoryId === categoryId) return;

    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }

    setIsTransitioning(true);
    setActiveCategoryId(categoryId);

    // If selecting 'all', return to full vault; if search is active, keep search query
    setTimeout(() => {
      setIsTransitioning(false);
    }, 450);

    // Automatically spotlight the first skill of that category in right panel
    if (categoryId !== 'all') {
      const firstInCategory = allSkills.find((s) => matchCategory(s, categoryId));
      if (firstInCategory) {
        setSelectedSkill(firstInCategory);
      }
    }
  };

  // Close / Deselect skill (Requirement 14)
  const handleCloseSkill = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  // Keyboard navigation & accessibility (Requirement 27)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        if (selectedSkill) {
          handleCloseSkill();
        } else if (onBack) {
          onBack();
        } else if (window.history.length > 1) {
          window.history.back();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (matchingSkills.length > 0) {
          const currentIdx = selectedSkill
            ? matchingSkills.findIndex((s) => s.name === selectedSkill.name)
            : -1;
          const nextIdx = (currentIdx + 1) % matchingSkills.length;
          setSelectedSkill(matchingSkills[nextIdx]);
          try {
            gtaAudio.playHover();
          } catch {}
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (matchingSkills.length > 0) {
          const currentIdx = selectedSkill
            ? matchingSkills.findIndex((s) => s.name === selectedSkill.name)
            : 0;
          const prevIdx = (currentIdx - 1 + matchingSkills.length) % matchingSkills.length;
          setSelectedSkill(matchingSkills[prevIdx]);
          try {
            gtaAudio.playHover();
          } catch {}
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSkill, matchingSkills, handleCloseSkill, onBack]);

  return (
    <div
      id="skills-vault-page"
      className="relative w-full min-h-screen bg-[#01040a] text-slate-100 font-mono overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* =========================================================================
          ATMOSPHERIC DEEP SPACE 3D BACKGROUND WITH PARALLAX
          ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ThreeSkillEnvironment mousePos={mousePos} />
        {/* Subtle holographic grid lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        {/* Volumetric Radial Glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-sky-500/5 to-transparent blur-[120px] rounded-full pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 12}px), ${mousePos.y * 12}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* =========================================================================
          MAIN PAGE WRAPPER
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto min-h-screen px-3 sm:px-5 lg:px-6 py-4 flex flex-col gap-3">
        {/* 1. TOP HEADER & INTERACTIVE NAVIGATION BAR (Requirement 11, 12, 13) */}
        <SkillTopHUD onBack={onBack} onNavigate={onNavigate} onGoHome={onGoHome} />

        {/* 2. THREE-COLUMN DESKTOP LAYOUT (Left ~15-18%, Center ~68-70%, Right ~15-18%) */}
        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4.5 items-start mt-0.5">
          {/* LEFT COLUMN: SKILLS VAULT NAVIGATION */}
          <div className="lg:col-span-3 xl:col-span-2 w-full lg:sticky lg:top-4 z-20">
            <SkillSidebarNav
              categories={categoryItems}
              activeCategoryId={activeCategoryId}
              onSelectCategory={handleSelectCategory}
              totalSkillsCount={allSkills.length}
            />
          </div>

          {/* CENTER COLUMN: MAIN SKILL ENVIRONMENT WITH 500MS TRANSITION (Requirement 4, 5, 6, 19) */}
          <div
            className={`lg:col-span-6 xl:col-span-7 w-full z-10 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-70 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            <SkillQuadrantPanels
              selectedSkill={selectedSkill}
              onSelectSkill={setSelectedSkill}
              allSkills={allSkills}
              filterCategoryId={activeCategoryId}
              searchFilterQuery={searchQuery}
              mousePos={mousePos}
              onClearSearch={handleClearSearch}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* RIGHT COLUMN: SKILL INTELLIGENCE DOSSIER & SEARCH (Requirement 7, 8, 9, 14) */}
          <div className="lg:col-span-3 xl:col-span-3 w-full lg:sticky lg:top-4 z-20">
            <SkillIntelligencePanel
              selectedSkill={selectedSkill}
              onSelectSkill={setSelectedSkill}
              onCloseSkill={handleCloseSkill}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              matchesCount={searchQuery.trim() ? matchingSkills.length : undefined}
              totalSkillsCount={allSkills.length}
              allSkills={allSkills}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
