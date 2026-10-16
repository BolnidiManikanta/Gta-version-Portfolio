import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { achievementsData, certificationsData } from '../../data/portfolioData';
import { AchievementSpatialStage, UnifiedExhibitionItem } from './AchievementSpatialStage';
import { CarouselNavHUD } from './CarouselNavHUD';
import { AchievementJourneyTimeline } from './AchievementJourneyTimeline';
import { LearnGrowPanel } from './LearnGrowPanel';
import { AchievementDetailModal } from './AchievementDetailModal';
import { CinematicLivingEnvironment } from './CinematicLivingEnvironment';
import { useCinematicCamera } from './useCinematicCamera';
import { gtaAudio } from '../../utils/audio';
import {
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Search,
  X,
  Sparkles,
} from 'lucide-react';

interface AchievementsPageProps {
  onBack?: () => void;
}

// Top-level tabs matching image.png: ALL (27), TROPHIES (10), CERTIFICATIONS (17), HONORS (5)
const PRIMARY_TABS = [
  { id: 'all', label: 'ALL', count: 27 },
  { id: 'trophies', label: 'TROPHIES', count: 10 },
  { id: 'certifications', label: 'CERTIFICATIONS', count: 17 },
  { id: 'honors', label: 'HONORS', count: 5 },
] as const;

type PrimaryTabId = (typeof PRIMARY_TABS)[number]['id'];

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<PrimaryTabId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedItemForModal, setSelectedItemForModal] = useState<UnifiedExhibitionItem | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Auto-cycle carousel state (10s default)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHoveringStage, setIsHoveringStage] = useState<boolean>(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState<number>(0);
  const autoPlayTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);
    return () => motionQuery.removeEventListener('change', handleMotion);
  }, []);

  // Transform raw data into unified exhibition items
  const allTrophyExhibits: UnifiedExhibitionItem[] = useMemo(() => {
    return achievementsData.map((ach) => {
      let org = 'Academic / Competition Body';
      if (ach.category === 'RESEARCH') org = 'IEEE / Academic Symposium';
      else if (ach.category === 'HACKATHONS') org = 'IEEE Smart KARE Hackathon';
      else if (ach.category === 'SECURITY & CTF') {
        org = ach.title.toLowerCase().includes('cisco') ? 'Cisco Networking Academy' : 'Tata Group';
      } else if (ach.category === 'LEADERSHIP') {
        org = 'Microsoft Learn Student Club & ACM';
      } else if (ach.title.toLowerCase().includes('codechef')) {
        org = 'CodeChef Global';
      }

      return {
        id: ach.id,
        type: 'trophy',
        title: ach.title,
        organization: org,
        date: ach.date,
        category: ach.category,
        description: ach.description,
        status: ach.status === 'UNLOCKED' ? 'UNLOCKED' : 'VERIFIED',
        badgeLabel: ach.verifiedMetric || 'HONOR UNLOCKED',
        credentialId: ach.credentialId,
        xp: ach.xp,
        iconName: ach.icon,
        verifiedMetric: ach.verifiedMetric,
        rawTrophy: ach,
      };
    });
  }, []);

  const allCertExhibits: UnifiedExhibitionItem[] = useMemo(() => {
    return certificationsData.map((cert) => {
      return {
        id: cert.id || cert.title,
        type: 'certification',
        title: cert.title,
        organization: cert.issuer,
        date: cert.date,
        category: cert.category,
        description:
          cert.skills && cert.skills.length > 0
            ? `Accredited competencies in ${cert.skills.slice(0, 3).join(', ')}${
                cert.skills.length > 3 ? ` and ${cert.skills.length - 3} more` : ''
              }.`
            : `Official accreditation issued by ${cert.issuer}.`,
        status: cert.verificationStatus || 'VERIFIED',
        badgeLabel: cert.credentialId ? 'CREDENTIAL ID AVAILABLE' : 'ACCREDITED',
        credentialId: cert.credentialId,
        verificationUrl: cert.verificationUrl || cert.credentialUrl,
        skills: cert.skills,
        rawCert: cert,
      };
    });
  }, []);

  // Combined exhibits
  const combinedExhibits: UnifiedExhibitionItem[] = useMemo(() => {
    return [...allTrophyExhibits, ...allCertExhibits];
  }, [allTrophyExhibits, allCertExhibits]);

  // Honors subset (top 5 distinguished awards/publications)
  const honorsExhibits: UnifiedExhibitionItem[] = useMemo(() => {
    return [
      allTrophyExhibits[0], // IEEE Smart KARE Hackathon Finalist
      allTrophyExhibits[1], // Published Author at IEEE ICSFT 2026
      allTrophyExhibits[2], // Paper Accepted at ICIRCA 2025
      allTrophyExhibits[5], // Microsoft Student Ambassador & ACM
      allCertExhibits.find((c) => c.title.includes('Oracle')) || allCertExhibits[0],
    ].filter(Boolean);
  }, [allTrophyExhibits, allCertExhibits]);

  // Filter items based on activeTab, searchQuery, and selectedYear
  const filteredExhibits = useMemo(() => {
    let rawList: UnifiedExhibitionItem[] = [];
    if (activeTab === 'trophies') rawList = allTrophyExhibits;
    else if (activeTab === 'certifications') rawList = allCertExhibits;
    else if (activeTab === 'honors') rawList = honorsExhibits;
    else rawList = combinedExhibits;

    const query = searchQuery.trim().toLowerCase();

    return rawList.filter((item) => {
      // Year match if selected in timeline
      if (selectedYear && !item.date.includes(selectedYear)) {
        return false;
      }

      // Search query match
      if (query) {
        return (
          item.title.toLowerCase().includes(query) ||
          item.organization.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.credentialId && item.credentialId.toLowerCase().includes(query)) ||
          (item.skills && item.skills.some((s) => s.toLowerCase().includes(query)))
        );
      }

      return true;
    });
  }, [
    activeTab,
    allTrophyExhibits,
    allCertExhibits,
    honorsExhibits,
    combinedExhibits,
    searchQuery,
    selectedYear,
  ]);

  // Keep active index in bounds
  useEffect(() => {
    if (activeIndex >= filteredExhibits.length) {
      setActiveIndex(0);
    }
  }, [filteredExhibits.length, activeIndex]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (filteredExhibits.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredExhibits.length);
    setAutoPlayProgress(0);
  }, [filteredExhibits.length]);

  const handlePrev = useCallback(() => {
    if (filteredExhibits.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + filteredExhibits.length) % filteredExhibits.length);
    setAutoPlayProgress(0);
  }, [filteredExhibits.length]);

  // Unified 3D Cinematic Camera Motion Controller
  const { camera, handleWheel } = useCinematicCamera({
    activeIndex,
    reducedMotion,
    onNext: handleNext,
    onPrev: handlePrev,
  });

  // Automatic carousel loop (10s duration)
  useEffect(() => {
    if (!isAutoPlaying || isHoveringStage || selectedItemForModal || filteredExhibits.length <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalMs = 10000; // 10 seconds
    const stepMs = 100;
    let elapsed = 0;

    progressIntervalRef.current = window.setInterval(() => {
      elapsed += stepMs;
      setAutoPlayProgress(Math.min(100, (elapsed / intervalMs) * 100));
      if (elapsed >= intervalMs) {
        elapsed = 0;
        handleNext();
      }
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlaying, isHoveringStage, selectedItemForModal, filteredExhibits.length, handleNext]);

  // Reset category filter & active index when tab changes
  const handleTabChange = (tab: PrimaryTabId) => {
    gtaAudio.playSelect();
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedYear(null);
    setActiveIndex(0);
    setAutoPlayProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || selectedItemForModal) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        gtaAudio.playSelect();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        gtaAudio.playSelect();
        handlePrev();
      } else if (e.key === 'Enter') {
        if (filteredExhibits[activeIndex]) {
          gtaAudio.playSelect();
          setSelectedItemForModal(filteredExhibits[activeIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, selectedItemForModal, filteredExhibits, activeIndex]);

  return (
    <div className="relative w-full min-h-screen text-white select-none overflow-x-hidden pb-16">
      {/* Layered 10-Depth Living 3D Cinematic Environment */}
      <CinematicLivingEnvironment camera={camera} reducedMotion={reducedMotion} />

      {/* Ambient Volumetric Lighting Flares */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-gradient-to-b from-amber-600/18 via-amber-500/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[950px] h-[300px] bg-gradient-to-t from-amber-600/15 via-amber-500/6 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* =========================================================================
            1. HEADER / TITLE AREA (MATCHING IMAGE 2 EXACT LAYOUT)
            Left: Title + Subtitle + 3 Stat Badges
            Center: "DISCIPLINE CREATES OPPORTUNITIES."
            Right: Search Box + Filter Tabs
        ========================================================================= */}
        <header className="pt-2 pb-5 border-b border-amber-500/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Branding & Stats */}
            <div className="space-y-3">
              <div>
                <span className="font-hud text-[11px] font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  RECOGNITION & CREDENTIALS
                </span>

                <h1 className="font-vice text-3xl sm:text-4xl md:text-5xl text-white tracking-wider leading-none mt-1">
                  ACHIEVEMENTS{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]">
                    & CERTIFICATIONS
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1">
                  Milestones. Recognitions. A journey of continuous learning.
                </p>
              </div>

              {/* Three Interactive Stat Badges */}
              <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
                {/* 10 TROPHIES */}
                <button
                  type="button"
                  onClick={() => handleTabChange('trophies')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activeTab === 'trophies'
                      ? 'bg-amber-950/90 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.5)] scale-105'
                      : 'bg-black/60 border-amber-500/30 hover:border-amber-400/60'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-sm font-black text-amber-300 leading-none">10</div>
                    <div className="font-hud text-[9px] text-neutral-400 tracking-wider uppercase">
                      TROPHIES
                    </div>
                  </div>
                </button>

                {/* 17 CERTIFICATIONS */}
                <button
                  type="button"
                  onClick={() => handleTabChange('certifications')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activeTab === 'certifications'
                      ? 'bg-amber-950/90 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.5)] scale-105'
                      : 'bg-black/60 border-amber-500/30 hover:border-amber-400/60'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-sm font-black text-amber-300 leading-none">17</div>
                    <div className="font-hud text-[9px] text-neutral-400 tracking-wider uppercase">
                      CERTS
                    </div>
                  </div>
                </button>

                {/* 18 VERIFIED */}
                <button
                  type="button"
                  onClick={() => handleTabChange('all')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.4)]'
                      : 'bg-black/60 border-cyan-500/30 hover:border-cyan-400/60'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-sm font-black text-cyan-300 leading-none">18</div>
                    <div className="font-hud text-[9px] text-neutral-400 tracking-wider uppercase">
                      VERIFIED
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Center: Gold Motto (Desktop Only) */}
            <div className="hidden xl:flex flex-col items-center justify-center px-4 text-center">
              <span className="font-vice text-base lg:text-lg text-amber-200/90 tracking-widest italic drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                &ldquo;DISCIPLINE CREATES OPPORTUNITIES.&rdquo;
              </span>
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mt-2" />
            </div>

            {/* Right: Search Box + Main Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <div className="flex items-center bg-black/70 border border-amber-500/30 hover:border-amber-400/60 rounded-xl px-3 py-1.5 focus-within:border-amber-400 transition-all">
                  <Search className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveIndex(0);
                      setAutoPlayProgress(0);
                    }}
                    placeholder="Search achievements..."
                    className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Primary Tabs: ALL (27) | TROPHIES (10) | CERTIFICATIONS (17) | HONORS (5) */}
              <nav aria-label="Exhibition Filter Tabs" className="flex items-center gap-1.5 p-1 rounded-xl bg-black/70 border border-amber-500/25">
                {PRIMARY_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={`px-3 py-1 rounded-lg font-hud text-[11px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.6)] font-black'
                          : 'text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-mono px-1 rounded ${
                        isActive ? 'bg-black/30 text-black font-bold' : 'text-amber-400/80 bg-amber-950/50'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

        {/* =========================================================================
            2. CENTRAL 3D SPATIAL EXHIBITION CHAMBER
            Open atmosphere, localized spotlight, cyber dais, tall glowing amber cards.
            Breathing room: plenty of vertical space.
        ========================================================================= */}
        <section
          aria-label="3D Recognition Stage"
          className="mt-6 mb-8 w-full flex justify-center cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
        >
          {filteredExhibits.length === 0 ? (
            <div className="w-full h-[400px] flex flex-col items-center justify-center p-8 text-center bg-black/60 border border-amber-500/25 rounded-2xl space-y-3">
              <div className="text-amber-400 font-vice text-2xl">NO EXHIBITS MATCHED</div>
              <p className="text-xs text-neutral-400 max-w-sm">
                No verified records found for your current filter query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                  setSelectedYear(null);
                  gtaAudio.playSelect();
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-hud text-xs font-black rounded tracking-wider cursor-pointer shadow-md hover:scale-105 transition-all"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <AchievementSpatialStage
              items={filteredExhibits}
              activeIndex={activeIndex}
              onSelectIndex={(newIdx) => {
                setActiveIndex(newIdx);
                setAutoPlayProgress(0);
              }}
              onOpenDetail={(item) => {
                gtaAudio.playSelect();
                setSelectedItemForModal(item);
              }}
              onNext={handleNext}
              onPrev={handlePrev}
              reducedMotion={reducedMotion}
              onHoverStateChange={setIsHoveringStage}
              camera={camera}
            />
          )}
        </section>

        {/* =========================================================================
            3. BOTTOM HUD ROW: 3 DOCKS (MATCHING IMAGE 2)
            Left: ACHIEVEMENT JOURNEY (Timeline of Growth)
            Center: HOLOGRAPHIC CREDENTIAL DOCK (Rail + Thumbnails + Counter + Controls)
            Right: LEARN / BUILD / COMPETE / GROW Panel with Gold Star Emblem
        ========================================================================= */}
        <section aria-label="Bottom Navigation Docks" className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Left: Journey Timeline */}
            <div className="md:col-span-12 lg:col-span-4 xl:col-span-3 min-h-[140px]">
              <AchievementJourneyTimeline
                selectedYear={selectedYear}
                onSelectYear={(year) => {
                  gtaAudio.playSelect();
                  setSelectedYear(year);
                  setActiveIndex(0);
                  setAutoPlayProgress(0);
                }}
              />
            </div>

            {/* Center: Holographic Credential Dock */}
            <div className="md:col-span-12 lg:col-span-5 xl:col-span-6">
              <CarouselNavHUD
                items={filteredExhibits}
                activeIndex={activeIndex}
                onSelectIndex={(idx) => {
                  setActiveIndex(idx);
                  setAutoPlayProgress(0);
                }}
                onNext={handleNext}
                onPrev={handlePrev}
                isAutoPlaying={isAutoPlaying}
                onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
                progressPercent={autoPlayProgress}
              />
            </div>

            {/* Right: Learn & Grow Pillars Panel */}
            <div className="md:col-span-12 lg:col-span-3 xl:col-span-3 min-h-[140px]">
              <LearnGrowPanel />
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. BOTTOM FOOTER / AUTHENTICATION ARCHIVE BANNER
        ========================================================================= */}
        <footer className="pt-6 border-t border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-hud text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-neutral-300 font-bold tracking-wider">
              AUTHENTICATED CREDENTIALS ARCHIVE
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-400 font-mono text-[11px]">
              10 TROPHIES • 17 CERTIFICATIONS
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
            <span>VICE CITY IMMERSIVE HUD</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">100% INSTITUTIONAL VERIFIED</span>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          5. OFFICIAL RECORD / TROPHY DOSSIER MODAL
      ========================================================================= */}
      <AchievementDetailModal
        isOpen={Boolean(selectedItemForModal)}
        onClose={() => setSelectedItemForModal(null)}
        item={selectedItemForModal}
        currentIndex={
          selectedItemForModal
            ? filteredExhibits.findIndex((i) => i.id === selectedItemForModal.id)
            : 0
        }
        totalItems={filteredExhibits.length}
        onNext={() => {
          if (!selectedItemForModal || filteredExhibits.length === 0) return;
          const currIdx = filteredExhibits.findIndex((i) => i.id === selectedItemForModal.id);
          const nextIdx = (currIdx + 1) % filteredExhibits.length;
          setSelectedItemForModal(filteredExhibits[nextIdx]);
          setActiveIndex(nextIdx);
        }}
        onPrev={() => {
          if (!selectedItemForModal || filteredExhibits.length === 0) return;
          const currIdx = filteredExhibits.findIndex((i) => i.id === selectedItemForModal.id);
          const prevIdx = (currIdx - 1 + filteredExhibits.length) % filteredExhibits.length;
          setSelectedItemForModal(filteredExhibits[prevIdx]);
          setActiveIndex(prevIdx);
        }}
      />
    </div>
  );
};
