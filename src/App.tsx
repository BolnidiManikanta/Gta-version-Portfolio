import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DistrictId, AppMode, TimeOfDay, ProjectItem, HqHighlightMode } from './types';
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

// Dedicated Skills Page & Cinematic Shell
import { CinematicShell } from './components/Shell/CinematicShell';
import { SkillsPage } from './components/Skills/SkillsPage';
import { WorkPage } from './components/Work/WorkPage';
import { CareerLeadershipPage } from './components/Experience/CareerLeadershipPage';
import { AchievementsPage } from './components/Achievements/AchievementsPage';
import { ResearchPage } from './components/Research/ResearchPage';
import { AboutPage } from './components/About/AboutPage';
import { ServicesPage } from './components/Services/ServicesPage';
import { ContactPage } from './components/Contact/ContactPage';
import {
  HOMEPAGE_BACKGROUND_IMAGE,
  EXPERIENCE_PAGE_IMAGE,
  LEADER_PAGE_IMAGE,
  ABOUT_PAGE_IMAGE,
  PROJECT_VAULT_PAGE_IMAGE,
} from './config/backgroundTheme';

export default function App() {
  // Check initial URL route
  const getInitialRouteInfo = () => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p === '/skills' || h === '#/skills' || h === '#skills') {
        return { isPassed: true, isBooted: true, mode: 'skills' as AppMode };
      }
      if (
        p === '/work' || p.startsWith('/work/') || h === '#/work' || h.startsWith('#/work') || h === '#work' ||
        p.startsWith('/projects') || h.startsWith('#/projects') || h === '#projects'
      ) {
        return { isPassed: true, isBooted: true, mode: 'projects' as AppMode };
      }
      if (
        p === '/experience' || p === '/career' || p === '/journey' ||
        h === '#/experience' || h === '#/career' || h === '#/journey' ||
        h === '#experience' || h === '#career' || h === '#journey'
      ) {
        return { isPassed: true, isBooted: true, mode: 'experience' as AppMode };
      }
      if (
        p === '/achievements' || p === '/certifications' ||
        h === '#/achievements' || h === '#/certifications' ||
        h === '#achievements' || h === '#certifications'
      ) {
        return { isPassed: true, isBooted: true, mode: 'achievements' as AppMode };
      }
      if (p === '/research' || h === '#/research' || h === '#research') {
        return { isPassed: true, isBooted: true, mode: 'research' as AppMode };
      }
      if (p === '/about' || h === '#/about' || h === '#about') {
        return { isPassed: true, isBooted: true, mode: 'about' as AppMode };
      }
      if (p === '/services' || h === '#/services' || h === '#services') {
        return { isPassed: true, isBooted: true, mode: 'services' as AppMode };
      }
      if (p === '/contact' || h === '#/contact' || h === '#contact') {
        return { isPassed: true, isBooted: true, mode: 'contact' as AppMode };
      }
    }
    return { isPassed: false, isBooted: false, mode: 'game' as AppMode };
  };

  const initialRoute = getInitialRouteInfo();

  // Cinematic Walking Video Intro State (BEFORE existing homepage)
  const [hasPassedIntro, setHasPassedIntro] = useState(initialRoute.isPassed);

  // Boot Sequence State
  const [isBooted, setIsBooted] = useState(initialRoute.isBooted);

  // Selected project for deep linking inside Project Vault
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/projects\/([a-z0-9-]+)/i) ||
                    window.location.hash.match(/^#\/projects\/([a-z0-9-]+)/i);
      if (match && match[1]) return match[1];
    }
    return undefined;
  });

  // App Core State
  const [appMode, setAppMode] = useState<AppMode>(initialRoute.mode);
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

  // Enter World Background Highlight Mode ('vivid' | 'cyber' | 'sunset' | 'panorama')
  const [hqHighlightMode, setHqHighlightMode] = useState<HqHighlightMode>('vivid');

  // Custom photo storage
  const [customHeroPhoto, setCustomHeroPhoto] = useState<string>(() => {
    const saved = localStorage.getItem('gta_hero_photo');
    if (saved === '/about-page.png' || saved === '/about page.png') {
      localStorage.removeItem('gta_hero_photo');
      return '';
    }
    return saved || '';
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
    setAppMode('game');
    try {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Skills Page (/skills)
  const handleOpenSkills = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('skills');
    try {
      if (window.location.pathname !== '/skills') {
        window.history.pushState({}, '', '/skills');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Project Vault (/projects or /projects/[slug])
  const handleOpenProjects = useCallback((slug?: string) => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setSelectedProjectSlug(slug);
    setAppMode('projects');
    try {
      const targetPath = slug ? `/projects/${slug}` : '/projects';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Career & Leadership Page (/experience, /career, /journey)
  const handleOpenExperience = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('experience');
    try {
      if (window.location.pathname !== '/experience') {
        window.history.pushState({}, '', '/experience');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Achievements Page (/achievements, /certifications)
  const handleOpenAchievements = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('achievements');
    try {
      if (window.location.pathname !== '/achievements') {
        window.history.pushState({}, '', '/achievements');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Research Page (/research)
  const handleOpenResearch = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('research');
    try {
      if (window.location.pathname !== '/research') {
        window.history.pushState({}, '', '/research');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated About Page (/about)
  const handleOpenAbout = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('about');
    try {
      if (window.location.pathname !== '/about') {
        window.history.pushState({}, '', '/about');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Services Page (/services)
  const handleOpenServices = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('services');
    try {
      if (window.location.pathname !== '/services') {
        window.history.pushState({}, '', '/services');
      }
    } catch {
      // ignore
    }
  }, []);

  // Open Dedicated Contact Page (/contact)
  const handleOpenContact = useCallback(() => {
    setHasPassedIntro(true);
    setIsBooted(true);
    setAppMode('contact');
    try {
      if (window.location.pathname !== '/contact') {
        window.history.pushState({}, '', '/contact');
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync browser URL (/skills, /projects, /experience, /achievements, /research, /about, /services, /contact)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/skills' || hash === '#/skills' || hash === '#skills') {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('skills');
      } else if (
        path === '/work' ||
        path.startsWith('/work/') ||
        hash === '#/work' ||
        hash.startsWith('#/work') ||
        hash === '#work' ||
        path.startsWith('/projects') ||
        hash.startsWith('#/projects') ||
        hash === '#projects'
      ) {
        setHasPassedIntro(true);
        setIsBooted(true);
        const slugMatch =
          path.match(/^\/(?:projects|work)\/([a-z0-9-]+)/i) ||
          hash.match(/^#\/(?:projects|work)\/([a-z0-9-]+)/i);
        if (slugMatch && slugMatch[1]) {
          setSelectedProjectSlug(slugMatch[1]);
        }
        setAppMode('projects');
      } else if (
        path === '/experience' ||
        path === '/career' ||
        path === '/journey' ||
        hash === '#/experience' ||
        hash === '#/career' ||
        hash === '#/journey' ||
        hash === '#experience' ||
        hash === '#career' ||
        hash === '#journey'
      ) {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('experience');
      } else if (
        path === '/achievements' ||
        path === '/certifications' ||
        hash === '#/achievements' ||
        hash === '#/certifications' ||
        hash === '#achievements' ||
        hash === '#certifications'
      ) {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('achievements');
      } else if (path === '/research' || hash === '#/research' || hash === '#research') {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('research');
      } else if (path === '/about' || hash === '#/about' || hash === '#about') {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('about');
      } else if (path === '/services' || hash === '#/services' || hash === '#services') {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('services');
      } else if (path === '/contact' || hash === '#/contact' || hash === '#contact') {
        setHasPassedIntro(true);
        setIsBooted(true);
        setAppMode('contact');
      } else if (
        appMode === 'skills' ||
        appMode === 'projects' ||
        appMode === 'experience' ||
        appMode === 'achievements' ||
        appMode === 'research' ||
        appMode === 'about' ||
        appMode === 'services' ||
        appMode === 'contact'
      ) {
        setAppMode('game');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [appMode]);

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
        // Open first Cyber mission
        const cyberIdx = projectsData.findIndex(
          (p) => p.category.includes('Security') || p.category.includes('Cyber')
        );
        setActiveMission(projectsData[cyberIdx >= 0 ? cyberIdx : 1]);
        setActiveMissionIdx(cyberIdx >= 0 ? cyberIdx : 1);
        break;
      case 'dev_district':
        // Open first Dev mission
        const devIdx = projectsData.findIndex(
          (p) => p.category.includes('Full') || p.category.includes('Web')
        );
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
        onEnter={() => {
          setHasPassedIntro(true);
          setIsBooted(false);
          setAppMode('game');
          try {
            if (window.location.pathname !== '/') {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
      />
    );
  }

  // Dedicated Skills Vault Interactive Command Center
  if (appMode === 'skills') {
    return (
      <SkillsPage
        onBack={() => {
          setAppMode('game');
          try {
            if (window.location.pathname === '/skills') {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        onNavigate={(route: string) => {
          if (route === '/' || route === 'home') handleGoHome();
          else if (route === '/about' || route === 'about') handleOpenAbout();
          else if (route === '/journey' || route === '/experience' || route === 'experience') handleOpenExperience();
          else if (route === '/projects' || route === '/work' || route === 'projects') handleOpenProjects();
          else if (route === '/skills') handleOpenSkills();
          else if (route === '/research' || route === 'research') handleOpenResearch();
          else if (route === '/achievements' || route === 'achievements') handleOpenAchievements();
          else if (route === '/services' || route === 'services') handleOpenServices();
          else if (route === '/contact' || route === 'contact') handleOpenContact();
          else if (route === '/recruiter' || route === 'recruiter') {
            setHasPassedIntro(true);
            setIsBooted(true);
            setAppMode('quick_portfolio');
          }
        }}
        onSelectProject={(projectId) => {
          setSelectedProjectSlug(projectId);
          setAppMode('projects');
          try {
            window.history.pushState({}, '', `/projects/${projectId}`);
          } catch {
            // ignore
          }
        }}
      />
    );
  }

  // Dedicated Project Vault 3D Cinematic Game Experience
  if (appMode === 'projects') {
    return (
      <WorkPage
        onBack={() => {
          setAppMode('game');
          try {
            if (
              window.location.pathname.startsWith('/projects') ||
              window.location.pathname.startsWith('/work')
            ) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        initialProjectSlug={selectedProjectSlug}
        onNavigate={(route: string) => {
          if (route === '/' || route === 'home') handleGoHome();
          else if (route === '/about' || route === 'about') handleOpenAbout();
          else if (route === '/journey' || route === '/experience' || route === 'experience') handleOpenExperience();
          else if (route === '/projects' || route === '/work' || route === 'projects') handleOpenProjects();
          else if (route === '/skills') handleOpenSkills();
          else if (route === '/research' || route === 'research') handleOpenResearch();
          else if (route === '/achievements' || route === 'achievements') handleOpenAchievements();
          else if (route === '/services' || route === 'services') handleOpenServices();
          else if (route === '/contact' || route === 'contact') handleOpenContact();
        }}
      />
    );
  }

  // Dedicated Career & Leadership Page (/experience, /career, /journey)
  if (appMode === 'experience') {
    return (
      <CinematicShell
        onBack={() => {
          setAppMode('game');
          try {
            if (
              window.location.pathname.startsWith('/experience') ||
              window.location.pathname.startsWith('/career') ||
              window.location.pathname.startsWith('/journey')
            ) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        title="CAREER & LEADERSHIP"
        badge="VERIFIED FIELD DOSSIER"
        backgroundImage={LEADER_PAGE_IMAGE || '/leader-page.png'}
        highlightBackground={true}
      >
        <CareerLeadershipPage
          onBack={() => {
            setAppMode('game');
            try {
              if (
                window.location.pathname.startsWith('/experience') ||
                window.location.pathname.startsWith('/career') ||
                window.location.pathname.startsWith('/journey')
              ) {
                window.history.pushState({}, '', '/');
              }
            } catch {
              // ignore
            }
          }}
        />
      </CinematicShell>
    );
  }

  // Dedicated Achievements & Certifications Page (/achievements, /certifications)
  if (appMode === 'achievements') {
    return (
      <CinematicShell
        onBack={() => {
          setAppMode('game');
          try {
            if (
              window.location.pathname.startsWith('/achievements') ||
              window.location.pathname.startsWith('/certifications')
            ) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        title="ACHIEVEMENTS & CERTS"
        badge="10 TROPHIES • 17 CERTS"
        backgroundImage={HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png'}
        highlightBackground={true}
        hideDefaultBackground={true}
      >
        <AchievementsPage
          onBack={() => {
            setAppMode('game');
            try {
              if (
                window.location.pathname.startsWith('/achievements') ||
                window.location.pathname.startsWith('/certifications')
              ) {
                window.history.pushState({}, '', '/');
              }
            } catch {
              // ignore
            }
          }}
        />
      </CinematicShell>
    );
  }

  // Dedicated Research Page (/research)
  if (appMode === 'research') {
    return (
      <CinematicShell
        onBack={() => {
          setAppMode('game');
          try {
            if (window.location.pathname.startsWith('/research')) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        title="RESEARCH PUBLICATIONS"
        badge="IEEE XPLORE PROCEEDINGS"
        backgroundImage={EXPERIENCE_PAGE_IMAGE}
        highlightBackground={true}
      >
        <ResearchPage
          onBack={() => {
            setAppMode('game');
            try {
              if (window.location.pathname.startsWith('/research')) {
                window.history.pushState({}, '', '/');
              }
            } catch {
              // ignore
            }
          }}
        />
      </CinematicShell>
    );
  }

  // Dedicated About Page (/about)
  if (appMode === 'about') {
    return (
      <CinematicShell
        onBack={() => {
          setAppMode('game');
          try {
            if (window.location.pathname.startsWith('/about')) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        title="ABOUT OPERATIVE"
        badge="LEVEL 99 SENIOR ARCHITECT"
        backgroundImage={ABOUT_PAGE_IMAGE || HOMEPAGE_BACKGROUND_IMAGE}
        highlightBackground={true}
      >
        <AboutPage
          onBack={() => {
            setAppMode('game');
            try {
              if (window.location.pathname.startsWith('/about')) {
                window.history.pushState({}, '', '/');
              }
            } catch {
              // ignore
            }
          }}
        />
      </CinematicShell>
    );
  }

  // Dedicated Services Page (/services)
  if (appMode === 'services') {
    return (
      <CinematicShell
        onBack={() => {
          setAppMode('game');
          try {
            if (window.location.pathname.startsWith('/services')) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        title="SERVICES"
        badge="DIGITAL SOLUTIONS"
        backgroundImage={HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png'}
        highlightBackground={true}
      >
        <ServicesPage
          onNavigateContact={handleOpenContact}
          onNavigateProjects={() => handleOpenProjects()}
          onBack={() => {
            setAppMode('game');
            try {
              if (window.location.pathname.startsWith('/services')) {
                window.history.pushState({}, '', '/');
              }
            } catch {
              // ignore
            }
          }}
        />
      </CinematicShell>
    );
  }

  // Dedicated Contact Page (/contact)
  if (appMode === 'contact') {
    return (
      <CinematicShell
        onBack={() => {
          setAppMode('game');
          try {
            if (window.location.pathname.startsWith('/contact')) {
              window.history.pushState({}, '', '/');
            }
          } catch {
            // ignore
          }
        }}
        onGoHome={handleGoHome}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        title="COMMUNICATIONS TOWER"
        badge="SECURE RELAY"
        backgroundImage={HOMEPAGE_BACKGROUND_IMAGE || '/homepage-background.png'}
        highlightBackground={true}
      >
        <ContactPage
          onBack={() => {
            setAppMode('game');
            try {
              if (window.location.pathname.startsWith('/contact')) {
                window.history.pushState({}, '', '/');
              }
            } catch {
              // ignore
            }
          }}
        />
      </CinematicShell>
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
        onOpenSkills={handleOpenSkills}
        onOpenProjects={handleOpenProjects}
        onOpenExperience={handleOpenExperience}
        onOpenAchievements={handleOpenAchievements}
        onOpenServices={handleOpenServices}
        onOpenContact={handleOpenContact}
        isRadioPlaying={isRadioPlaying}
        onToggleRadio={handleRadioToggle}
        customHeroPhoto={customHeroPhoto}
        onReturnToWalkingIntro={() => setHasPassedIntro(false)}
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
        onOpenSkills={handleOpenSkills}
        onOpenProjects={handleOpenProjects}
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
            hqHighlightMode={hqHighlightMode}
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
                hqHighlightMode={hqHighlightMode}
                onHighlightModeChange={setHqHighlightMode}
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
        onOpenSkills={() => {
          setIsPhoneOpen(false);
          handleOpenSkills();
        }}
        onOpenProjects={() => {
          setIsPhoneOpen(false);
          handleOpenProjects();
        }}
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
        onOpenSkills={() => {
          setIsPauseOpen(false);
          handleOpenSkills();
        }}
        onOpenProjects={() => {
          setIsPauseOpen(false);
          handleOpenProjects();
        }}
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
