import React, { useState, useEffect, useRef } from 'react';
import { SectionId, ProfileData } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { WorldEnvironment } from './WorldEnvironment';
import { WorldMinimap } from './WorldMinimap';
import { WorldCameraControl, CameraMode } from './WorldCameraControl';
import { HeroView } from '../Hero/HeroView';
import { AboutView } from '../About/AboutView';
import { SkillsView } from '../Skills/SkillsView';
import { ProjectsView } from '../Projects/ProjectsView';
import { ExperienceView } from '../Experience/ExperienceView';
import { AchievementsView } from '../Achievements/AchievementsView';
import { AcademyView } from '../Academy/AcademyView';
import { ContactView } from '../Contact/ContactView';
import { MissionCompleteModal } from '../MissionComplete/MissionCompleteModal';
import { Navigation, Sparkles } from 'lucide-react';

interface ContinuousWorldProps {
  profile: ProfileData;
  customHeroPhoto?: string;
  onUpdateHeroPhoto: (url: string) => void;
  currentSection: SectionId;
  onSelectSection: (section: SectionId) => void;
}

const SECTION_ORDER: SectionId[] = [
  'start',
  'about',
  'skills',
  'projects',
  'experience',
  'achievements',
  'academy',
  'contact',
  'exit',
];

const STAGE_TITLES: Record<SectionId, { title: string; subtitle: string; waypointNum: string }> = {
  start: { title: 'OCEAN DRIVE', subtitle: 'HERO // CAR STAGING', waypointNum: '1/7' },
  about: { title: 'PENTHOUSE SUITE', subtitle: 'CHARACTER BRIEFING DOSSIER', waypointNum: '2/7' },
  skills: { title: 'CYBER ARMORY', subtitle: 'TACTICAL WEAPON LOADOUT', waypointNum: '3/7' },
  projects: { title: 'TACTICAL MAINFRAME', subtitle: 'MISSION CONTROL OPERATIONS', waypointNum: '4/7' },
  experience: { title: 'SAN ANDREAS FWY', subtitle: 'FIELD DEPLOYMENTS OVERLOOK', waypointNum: '5/7' },
  achievements: { title: 'TROPHY VAULT', subtitle: 'HONORS & ACCREDITATIONS', waypointNum: '•' },
  academy: { title: 'INSTITUTIONAL ARCHIVE', subtitle: 'ACADEMIC CREDENTIALS', waypointNum: '•' },
  contact: { title: 'SATELLITE ROOFTOP', subtitle: 'FINAL CINEMATIC // DISPATCH POST', waypointNum: '6/7' },
  exit: { title: 'LOS SANTOS SUNSET', subtitle: 'MISSION COMPLETE // RESPECT +', waypointNum: '7/7' },
};

export const ContinuousWorld: React.FC<ContinuousWorldProps> = ({
  profile,
  customHeroPhoto,
  onUpdateHeroPhoto,
  currentSection,
  onSelectSection,
}) => {
  const [cameraMode, setCameraMode] = useState<CameraMode>('cinematic');
  const [isTraveling, setIsTraveling] = useState<boolean>(false);
  const isInternalScrollRef = useRef<boolean>(false);

  // References for all 3D world stages
  const stageRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    start: null,
    about: null,
    skills: null,
    projects: null,
    experience: null,
    achievements: null,
    academy: null,
    contact: null,
    exit: null,
  });

  // Cycle camera mode (like pressing 'C' in GTA)
  const handleCycleCameraMode = () => {
    const modes: CameraMode[] = ['cinematic', 'tactical', 'drone', 'direct'];
    const nextIdx = (modes.indexOf(cameraMode) + 1) % modes.length;
    setCameraMode(modes[nextIdx]);
  };

  // Navigate to next section
  const handleNextSection = () => {
    const curIdx = SECTION_ORDER.indexOf(currentSection);
    if (curIdx < SECTION_ORDER.length - 1) {
      handleTravelToSection(SECTION_ORDER[curIdx + 1]);
    }
  };

  // Navigate to prev section
  const handlePrevSection = () => {
    const curIdx = SECTION_ORDER.indexOf(currentSection);
    if (curIdx > 0) {
      handleTravelToSection(SECTION_ORDER[curIdx - 1]);
    }
  };

  // Travel camera smoothly to target stage
  const handleTravelToSection = (target: SectionId) => {
    setIsTraveling(true);
    isInternalScrollRef.current = true;
    onSelectSection(target);

    const targetEl = stageRefs.current[target];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset travel warp effect after animation
    setTimeout(() => {
      setIsTraveling(false);
      setTimeout(() => {
        isInternalScrollRef.current = false;
      }, 200);
    }, 600);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form inputs
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'c' || e.key === 'C') {
        gtaAudio.playCameraClick();
        handleCycleCameraMode();
      } else if (e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        gtaAudio.playCameraSwoosh();
        handleNextSection();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        gtaAudio.playCameraSwoosh();
        handlePrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, cameraMode]);

  // Track user continuous scroll across the single continuous world
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isInternalScrollRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          const sectionId = entry.target.getAttribute('data-section-id') as SectionId;
          if (sectionId && sectionId !== currentSection) {
            onSelectSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: [0.45],
    });

    SECTION_ORDER.forEach((id) => {
      const el = stageRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentSection, onSelectSection]);

  // Sync scroll if external section changes (e.g. from Main Menu)
  useEffect(() => {
    const targetEl = stageRefs.current[currentSection];
    if (targetEl && !isInternalScrollRef.current) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSection]);

  // Determine 3D camera transforms based on active camera mode
  const getCameraRigStyles = (): React.CSSProperties => {
    switch (cameraMode) {
      case 'tactical':
        return {
          perspective: '1000px',
          transform: 'rotateX(8deg) scale(0.97)',
          transformOrigin: 'top center',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'drone':
        return {
          perspective: '1400px',
          transform: 'scale(0.93) translateZ(-40px)',
          transformOrigin: 'center center',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      case 'direct':
        return {
          transition: 'transform 0.5s ease',
        };
      case 'cinematic':
      default:
        return {
          perspective: '1200px',
          transform: 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        };
    }
  };

  const activeMeta = STAGE_TITLES[currentSection] || STAGE_TITLES.start;

  return (
    <div className="relative w-full min-h-screen">
      {/* 1. Dynamic Shared Skybox & Environment reacting to current world section */}
      <WorldEnvironment currentSection={currentSection} cameraMode={cameraMode} />

      {/* 2. Cinematic Speed Lines & Motion Blur Warp Effect during camera travel */}
      <div
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-300 ${
          isTraveling ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Radial speed lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent, transparent 15px, rgba(236, 0, 140, 0.25) 20px, transparent 25px)`,
            transform: 'scale(1.2)',
          }}
        />
        {/* Horizontal light streak bars */}
        <div className="absolute inset-x-0 top-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-pulse" />
        <div className="absolute inset-x-0 top-2/3 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_15px_rgba(236,0,140,0.8)] animate-pulse" />
      </div>

      {/* 3. Top Cinematic Waypoint Banner HUD */}
      <div className="fixed top-18 left-4 sm:top-20 sm:left-6 z-30 pointer-events-none select-none">
        <div className="bg-black/75 backdrop-blur-md border-l-3 border-pink-500 px-3 py-1.5 shadow-xl font-hud">
          <div className="flex items-center gap-1.5 text-pink-400 text-[10px] tracking-widest uppercase font-bold">
            <Navigation className="w-3 h-3 text-pink-400 animate-pulse" />
            <span>WAYPOINT [{activeMeta.waypointNum}]: {activeMeta.title}</span>
          </div>
          <div className="text-white/80 text-[11px] font-semibold tracking-wider">
            {activeMeta.subtitle}
          </div>
        </div>
      </div>

      {/* 4. Top Camera Angle & Next/Prev Controls HUD */}
      <WorldCameraControl
        cameraMode={cameraMode}
        onCycleCameraMode={handleCycleCameraMode}
        currentSection={currentSection}
        onNextSection={handleNextSection}
        onPrevSection={handlePrevSection}
      />

      {/* 5. Left Bottom Authentic GTA Radar Minimap */}
      <WorldMinimap
        currentSection={currentSection}
        onSelectSection={handleTravelToSection}
      />

      {/* 6. ONE CONTINUOUS WORLD: All Stages Contiguously Rendered in 3D Canvas */}
      <div
        className="relative z-10 w-full flex flex-col will-change-transform"
        style={getCameraRigStyles()}
      >
        {/* STAGE 1: HERO (Sunset Ocean Drive & Sports Car Staging) */}
        <section
          id="stage-start"
          data-section-id="start"
          ref={(el) => (stageRefs.current.start = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <HeroView
            currentSection={currentSection}
            onSelectSection={handleTravelToSection}
            customHeroPhoto={customHeroPhoto}
            onUpdateHeroPhoto={onUpdateHeroPhoto}
          />
        </section>

        {/* STAGE 2: ABOUT (Penthouse Safehouse & Character Briefing Dossier) */}
        <section
          id="stage-about"
          data-section-id="about"
          ref={(el) => (stageRefs.current.about = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <AboutView
            profile={profile}
            onSelectSection={handleTravelToSection}
            customHeroPhoto={customHeroPhoto}
          />
        </section>

        {/* STAGE 3: SKILLS (Underground Cyber Armory & Weapon Wheel) */}
        <section
          id="stage-skills"
          data-section-id="skills"
          ref={(el) => (stageRefs.current.skills = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <SkillsView onSelectSection={handleTravelToSection} />
        </section>

        {/* STAGE 4: PROJECTS (Tactical Ops Room & Holographic Mission Selection) */}
        <section
          id="stage-projects"
          data-section-id="projects"
          ref={(el) => (stageRefs.current.projects = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <ProjectsView onSelectSection={handleTravelToSection} />
        </section>

        {/* STAGE 5: EXPERIENCE (San Andreas Night Highway & Field Operations) */}
        <section
          id="stage-experience"
          data-section-id="experience"
          ref={(el) => (stageRefs.current.experience = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <ExperienceView onSelectSection={handleTravelToSection} />
        </section>

        {/* STAGE 6: ACHIEVEMENTS (Trophy Vault & Credentials) */}
        <section
          id="stage-achievements"
          data-section-id="achievements"
          ref={(el) => (stageRefs.current.achievements = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <AchievementsView onSelectSection={handleTravelToSection} />
        </section>

        {/* STAGE 7: ACADEMY (Institutional Credentials) */}
        <section
          id="stage-academy"
          data-section-id="academy"
          ref={(el) => (stageRefs.current.academy = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <AcademyView onSelectSection={handleTravelToSection} />
        </section>

        {/* STAGE 8: CONTACT (Rooftop Satellite Mast // Final Cinematic Transmission) */}
        <section
          id="stage-contact"
          data-section-id="contact"
          ref={(el) => (stageRefs.current.contact = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <ContactView
            profile={profile}
            onSelectSection={handleTravelToSection}
            customHeroPhoto={customHeroPhoto}
          />
        </section>

        {/* STAGE 9: EXIT / MISSION COMPLETE (Golden Victory Sunset & Respect +) */}
        <section
          id="stage-exit"
          data-section-id="exit"
          ref={(el) => (stageRefs.current.exit = el)}
          className="relative w-full min-h-screen flex items-center"
        >
          <MissionCompleteModal onSelectSection={handleTravelToSection} />
        </section>
      </div>
    </div>
  );
};
