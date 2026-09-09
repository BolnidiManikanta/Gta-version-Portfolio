import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DistrictId, AppMode, TimeOfDay, ProjectItem } from './types';
import { profileData, projectsData } from './data/portfolioData';
import { DISTRICTS_DATA, DISTRICT_LIST } from './data/districtsData';
import { gtaAudio } from './utils/audio';

// Boot & Core Systems
import { CinematicWalkingIntro } from './components/Intro/CinematicWalkingIntro';
import { GameBootScreen } from './components/Boot/GameBootScreen';
import { WorldEnvironment } from './components/World/WorldEnvironment';
import { WorldMinimap } from './components/World/WorldMinimap';
import { TopHUD } from './components/HUD/TopHUD';
import { BottomHUD } from './components/HUD/BottomHUD';
import { ContextualInteractPrompt } from './components/HUD/ContextualInteractPrompt';

// Modals
import { ViceCityMapModal } from './components/Map/ViceCityMapModal';
import { InGamePhoneModal } from './components/Phone/InGamePhoneModal';
import { PauseMenuModal } from './components/Pause/PauseMenuModal';
import { MissionDetailModal } from './components/Missions/MissionDetailModal';

// District Views
import { PlayerHQDistrictView } from './components/Districts/PlayerHQDistrictView';
import { AILabDistrictView } from './components/Districts/AILabDistrictView';
import { CyberDistrictView } from './components/Districts/CyberDistrictView';
import { DevDistrictView } from './components/Districts/DevDistrictView';
import { AchievementHQDistrictView } from './components/Districts/AchievementHQDistrictView';
import { CareerDistrictView } from './components/Districts/CareerDistrictView';
import { CommsCenterDistrictView } from './components/Districts/CommsCenterDistrictView';

// Recruiter Quick Mode
import { QuickPortfolioView } from './components/PortfolioMode/QuickPortfolioView';

export default function App() {
  // Cinematic Walking Video Intro State (BEFORE existing homepage)
  const [hasPassedIntro, setHasPassedIntro] = useState(false);

  // Boot Sequence State
  const [isBooted, setIsBooted] = useState(false);

  // App Core State
  const [appMode, setAppMode] = useState<AppMode>('game');
  const [currentDistrict, setCurrentDistrict] = useState<DistrictId>('player_hq');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('dusk');
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  // Modals
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [activeMission, setActiveMission] = useState<ProjectItem | null>(null);
  const [activeMissionIdx, setActiveMissionIdx] = useState<number>(0);

  // Cinematic Camera Notice
  const [cinematicNotice, setCinematicNotice] = useState<{
    title: string;
    sub: string;
  } | null>(null);

  // Custom photo storage
  const [customHeroPhoto, setCustomHeroPhoto] = useState<string>(() => {
    return localStorage.getItem('gta_hero_photo') || '';
  });

  const handleUpdateHeroPhoto = (url: string) => {
    setCustomHeroPhoto(url);
    try {
      localStorage.setItem('gta_hero_photo', url);
    } catch {
      // Quota safety
    }
  };

  // Scroll wheel debounce ref for virtual camera travel
  const lastScrollTime = useRef<number>(0);

  // Return to initial starting boot screen / home
  const handleGoHome = useCallback(() => {
    gtaAudio.playSelect();
    setIsBooted(false);
  }, []);

  // Camera travel handler
  const handleSelectDistrict = useCallback(
    (nextDistrict: DistrictId) => {
      if (nextDistrict === currentDistrict) return;

      const targetInfo = DISTRICTS_DATA[nextDistrict];
      setCinematicNotice({
        title: `CAMERA DEPLOYING // ${targetInfo.name.toUpperCase()}`,
        sub: `Navigating to ${targetInfo.location} • Sector ${targetInfo.mapCoordinates.x}°W`,
      });

      setTimeout(() => {
        setCinematicNotice(null);
      }, 2800);

      gtaAudio.playCameraSwoosh();
      setCurrentDistrict(nextDistrict);
    },
    [currentDistrict]
  );

  // District step navigation (next / prev)
  const navigateDistrictStep = useCallback(
    (direction: 'next' | 'prev') => {
      const currentIndex = DISTRICT_LIST.findIndex((d) => d.id === currentDistrict);
      if (currentIndex === -1) return;

      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= DISTRICT_LIST.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = DISTRICT_LIST.length - 1;

      handleSelectDistrict(DISTRICT_LIST[nextIndex].id);
    },
    [currentDistrict, handleSelectDistrict]
  );

  // Contextual Interaction [E]
  const handleInteract = useCallback(() => {
    switch (currentDistrict) {
      case 'player_hq':
        setIsPhoneOpen(true);
        break;
      case 'ai_lab':
        // Open first AI mission
        setActiveMission(projectsData[0]);
        setActiveMissionIdx(0);
        break;
      case 'cyber_district':
        // Open first Cyber mission (proj-12)
        const cyberIdx = projectsData.findIndex((p) => p.id === 'proj-12');
        setActiveMission(projectsData[cyberIdx >= 0 ? cyberIdx : 1]);
        setActiveMissionIdx(cyberIdx >= 0 ? cyberIdx : 1);
        break;
      case 'dev_district':
        // Open first Dev mission (proj-3)
        const devIdx = projectsData.findIndex((p) => p.id === 'proj-3');
        setActiveMission(projectsData[devIdx >= 0 ? devIdx : 2]);
        setActiveMissionIdx(devIdx >= 0 ? devIdx : 2);
        break;
      case 'achievement_hq':
        gtaAudio.playMissionPassed();
        break;
      case 'career_district':
        setIsPhoneOpen(true);
        break;
      case 'comms_center':
        setIsPhoneOpen(true);
        break;
    }
  }, [currentDistrict]);

  // Radio toggle
  const handleRadioToggle = () => {
    const isPlaying = gtaAudio.toggleRadio();
    setIsRadioPlaying(isPlaying);
  };

  // Cycle time of day
  const handleCycleTimeOfDay = () => {
    const times: TimeOfDay[] = ['day', 'sunset', 'dusk', 'night'];
    const currentIdx = times.indexOf(timeOfDay);
    const nextTime = times[(currentIdx + 1) % times.length];
    setTimeOfDay(nextTime);
    gtaAudio.playSelect();
  };

  // Virtual Camera Scroll Event Listener (Scroll Wheel Controls Camera)
  useEffect(() => {
    if (!isBooted || appMode !== 'game' || isMapOpen || isPhoneOpen || isPauseOpen || activeMission) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      // Only travel if not scrolling a modal or inner list
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return; // 800ms debounce
      if (Math.abs(e.deltaY) > 40) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          navigateDistrictStep('next');
        } else {
          navigateDistrictStep('prev');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [
    isBooted,
    appMode,
    isMapOpen,
    isPhoneOpen,
    isPauseOpen,
    activeMission,
    navigateDistrictStep,
  ]);

  // Global Keyboard Controls (WASD, M, P, ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isTyping = activeTag === 'input' || activeTag === 'textarea';

      if (isTyping) return;

      // ESC: Toggle pause menu or close modals
      if (e.key === 'Escape') {
        if (activeMission) {
          setActiveMission(null);
        } else if (isMapOpen) {
          setIsMapOpen(false);
        } else if (isPhoneOpen) {
          setIsPhoneOpen(false);
        } else {
          setIsPauseOpen((prev) => !prev);
          gtaAudio.playPause();
        }
        return;
      }

      // If a modal is open, don't trigger game world shortcuts
      if (isMapOpen || isPhoneOpen || isPauseOpen || activeMission) return;

      // M: Map
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        gtaAudio.playMapToggle();
        setIsMapOpen((prev) => !prev);
        return;
      }

      // P: Phone
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        gtaAudio.playPhone();
        setIsPhoneOpen((prev) => !prev);
        return;
      }

      // W / S / ArrowUp / ArrowDown / D / A: Camera Travel Navigation
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        navigateDistrictStep('next');
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        navigateDistrictStep('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isMapOpen,
    isPhoneOpen,
    isPauseOpen,
    activeMission,
    navigateDistrictStep,
  ]);

  // Step 0: Cinematic Walking Video Intro Scene (Appears BEFORE the homepage)
  if (!hasPassedIntro) {
    return (
      <CinematicWalkingIntro
        onEnter={(targetDistrict?: DistrictId) => {
          setHasPassedIntro(true);
          if (targetDistrict) {
            setIsBooted(true);
            setAppMode('game');
            setCurrentDistrict(targetDistrict);
          } else {
            setIsBooted(false);
          }
        }}
      />
    );
  }

  // If boot screen is active, show the authentic GTA starting interface (Home Page)
  if (!isBooted) {
    return (
      <GameBootScreen
        onStartGame={(targetDistrict?: DistrictId) => {
          setIsBooted(true);
          setAppMode('game');
          if (targetDistrict) {
            setCurrentDistrict(targetDistrict);
          }
        }}
        onQuickPortfolio={() => {
          setIsBooted(true);
          setAppMode('quick_portfolio');
        }}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        customHeroPhoto={customHeroPhoto}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-pink-600 selection:text-white">
      {/* CRT Scanlines & Vignette */}
      <div className="fixed inset-0 z-40 gta-scanlines pointer-events-none opacity-25" />
      <div className="fixed inset-0 z-40 gta-vignette pointer-events-none" />

      {/* Top HUD (Persistent) */}
      <TopHUD
        currentDistrict={currentDistrict}
        appMode={appMode}
        onToggleAppMode={() =>
          setAppMode((prev) => (prev === 'game' ? 'quick_portfolio' : 'game'))
        }
        onOpenMap={() => setIsMapOpen(true)}
        onOpenPhone={() => setIsPhoneOpen(true)}
        onOpenPause={() => setIsPauseOpen(true)}
        onRadioToggle={handleRadioToggle}
        isRadioPlaying={isRadioPlaying}
        onGoHome={handleGoHome}
      />

      {/* Cinematic Camera Transition Ticker */}
      {cinematicNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-black/90 border-2 border-pink-500 px-6 py-2.5 shadow-[0_0_30px_rgba(236,0,140,0.8)] text-center">
            <div className="font-hud text-xs font-black text-pink-400 tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>{cinematicNotice.title}</span>
            </div>
            <div className="font-hud text-[11px] text-white/80 tracking-wider mt-0.5">
              {cinematicNotice.sub}
            </div>
          </div>
        </div>
      )}

      {/* GAME WORLD MODE */}
      {appMode === 'game' ? (
        <>
          {/* Dynamic 3D Environment Background */}
          <WorldEnvironment
            currentDistrict={currentDistrict}
            timeOfDay={timeOfDay}
          />

          {/* Active District Screen Content */}
          <main className="relative z-10 w-full min-h-screen pt-16 pb-20">
            {currentDistrict === 'player_hq' && (
              <PlayerHQDistrictView
                profile={profileData}
                customHeroPhoto={customHeroPhoto}
                onUpdateHeroPhoto={handleUpdateHeroPhoto}
                onSelectDistrict={handleSelectDistrict}
                onOpenPhone={() => setIsPhoneOpen(true)}
                onOpenMap={() => setIsMapOpen(true)}
              />
            )}

            {currentDistrict === 'ai_lab' && (
              <AILabDistrictView
                onSelectDistrict={handleSelectDistrict}
                onOpenMissionModal={(mission, idx) => {
                  setActiveMission(mission);
                  setActiveMissionIdx(idx);
                }}
              />
            )}

            {currentDistrict === 'cyber_district' && (
              <CyberDistrictView
                onSelectDistrict={handleSelectDistrict}
                onOpenMissionModal={(mission, idx) => {
                  setActiveMission(mission);
                  setActiveMissionIdx(idx);
                }}
              />
            )}

            {currentDistrict === 'dev_district' && (
              <DevDistrictView
                onSelectDistrict={handleSelectDistrict}
                onOpenMissionModal={(mission, idx) => {
                  setActiveMission(mission);
                  setActiveMissionIdx(idx);
                }}
              />
            )}

            {currentDistrict === 'achievement_hq' && (
              <AchievementHQDistrictView
                onSelectDistrict={handleSelectDistrict}
              />
            )}

            {currentDistrict === 'career_district' && (
              <CareerDistrictView
                onSelectDistrict={handleSelectDistrict}
              />
            )}

            {currentDistrict === 'comms_center' && (
              <CommsCenterDistrictView
                profile={profileData}
                onSelectDistrict={handleSelectDistrict}
                onOpenPhone={() => setIsPhoneOpen(true)}
              />
            )}
          </main>

          {/* Contextual [E] Action Prompt */}
          <ContextualInteractPrompt
            currentDistrict={currentDistrict}
            onInteract={handleInteract}
          />

          {/* In-Game Minimap Radar with District GPS */}
          <WorldMinimap
            currentDistrict={currentDistrict}
            onSelectDistrict={handleSelectDistrict}
            onOpenMap={() => setIsMapOpen(true)}
          />
        </>
      ) : (
        /* QUICK RECRUITER PORTFOLIO MODE */
        <main className="relative z-10 w-full min-h-screen pt-20 pb-24">
          <QuickPortfolioView
            profile={profileData}
            onEnterGameWorld={() => setAppMode('game')}
            onOpenMissionModal={(mission, idx) => {
              setActiveMission(mission);
              setActiveMissionIdx(idx);
            }}
            onGoHome={handleGoHome}
          />
        </main>
      )}

      {/* Bottom HUD (Radio & Controls Hint) */}
      <BottomHUD
        isRadioPlaying={isRadioPlaying}
        onRadioToggle={handleRadioToggle}
      />

      {/* MODAL: Tactical Vice City GPS Map [M] */}
      <ViceCityMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        currentDistrict={currentDistrict}
        onSelectDistrict={handleSelectDistrict}
      />

      {/* MODAL: In-Game Comms Smartphone [P] */}
      <InGamePhoneModal
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
        profile={profileData}
        onOpenMap={() => {
          setIsPhoneOpen(false);
          setIsMapOpen(true);
        }}
        onSelectDistrict={handleSelectDistrict}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
      />

      {/* MODAL: Game Pause Menu [ESC] */}
      <PauseMenuModal
        isOpen={isPauseOpen}
        onClose={() => setIsPauseOpen(false)}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenPhone={() => setIsPhoneOpen(true)}
        onSelectDistrict={handleSelectDistrict}
        appMode={appMode}
        onToggleAppMode={() =>
          setAppMode((prev) => (prev === 'game' ? 'quick_portfolio' : 'game'))
        }
        timeOfDay={timeOfDay}
        onCycleTimeOfDay={handleCycleTimeOfDay}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        onRebootIntro={() => setIsBooted(false)}
        onReplayWalkingIntro={() => setHasPassedIntro(false)}
      />

      {/* MODAL: Classified Mission Detail Dossier */}
      <MissionDetailModal
        isOpen={activeMission !== null}
        onClose={() => setActiveMission(null)}
        mission={activeMission}
        currentIndex={activeMissionIdx}
        totalMissions={projectsData.length}
        onNextMission={() => {
          const nextIdx = (activeMissionIdx + 1) % projectsData.length;
          setActiveMission(projectsData[nextIdx]);
          setActiveMissionIdx(nextIdx);
        }}
        onPrevMission={() => {
          const prevIdx =
            (activeMissionIdx - 1 + projectsData.length) % projectsData.length;
          setActiveMission(projectsData[prevIdx]);
          setActiveMissionIdx(prevIdx);
        }}
      />
    </div>
  );
}
