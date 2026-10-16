import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';

import { CityWorldCanvas, PlayerControlMode } from './CityWorldCanvas';
import { CityHUD } from './CityHUD';
import { CityMap } from './CityMap';
import { ProjectDirectory } from './ProjectDirectory';
import { ProjectDossier } from './ProjectDossier';

interface ProjectVaultProps {
  onBack?: () => void;
  onGoHome?: () => void;
  initialSelectedSlug?: string;
  onNavigate?: (route: string) => void;
}

interface Mission {
  id: number;
  title: string;
  objective: string;
  targetSlug: string;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'THE FIRST VENTURE',
    objective: 'Enter your sports car and drive to Servify HQ in the Full Stack District',
    targetSlug: 'proj-servify-apps',
  },
  {
    id: 2,
    title: 'DEEP VISION RESEARCH',
    objective: 'Travel to the AI & Vision District and locate NeuroScan / MILA Lab',
    targetSlug: 'proj-neuroscan',
  },
  {
    id: 3,
    title: 'ZERO-DAY CYBER DEFENSE',
    objective: 'Investigate the high-security PhishAlert Center in the Cyber Defense District',
    targetSlug: 'proj-phishalert',
  },
  {
    id: 4,
    title: 'INNOVATION COMMONS',
    objective: 'Discover the Academic Research Wings in the Innovation Commons',
    targetSlug: 'proj-multi-disorder',
  },
];

export const ProjectVault: React.FC<ProjectVaultProps> = ({
  onBack,
  onGoHome,
  initialSelectedSlug,
  onNavigate,
}) => {
  // 1. Cinematic Opening Intro State
  const [cinematicIntro, setCinematicIntro] = useState(true);

  // 2. Control Mode: 'walking' | 'driving' | 'interior'
  const [controlMode, setControlMode] = useState<PlayerControlMode>('walking');

  // 3. Player Coordinates & Heading (Standing in front of the red car on the avenue)
  const [playerPos, setPlayerPos] = useState({ x: -0.5, z: 4.8, heading: 0 });

  // 4. Red Muscle Sedan Coordinates & Heading (Parked on the road next to the sidewalk)
  const [carPos, setCarPos] = useState({ x: -2.2, z: 0, heading: 0, speed: 0 });

  // 5. Speedometer
  const [speedKmh, setSpeedKmh] = useState(0);

  // 6. Active Interior Project (When inside a building)
  const [activeInteriorProject, setActiveInteriorProject] = useState<ProjectItem | null>(null);

  // 7. Movement & Driving Input Keys
  const [moveInput, setMoveInput] = useState({
    forward: 0,
    strafe: 0,
    isSprinting: false,
    isJumping: false,
    isHandbraking: false,
  });
  const activeKeys = useRef(new Set<string>());

  // 8. Proximity Contextual Interaction
  const [nearbyInteraction, setNearbyInteraction] = useState<{
    type: 'project' | 'car' | 'interior_node' | 'interior_exit';
    target: ProjectItem | string;
    distance: number;
    index?: number;
    title: string;
  } | null>(null);

  // 9. District Tracking & Discovery System
  const [currentDistrict, setCurrentDistrict] = useState('DOWNTOWN TECH BOULEVARD');
  const [discoveredProjectIds, setDiscoveredProjectIds] = useState<Set<string>>(() => new Set());
  const [activeWaypointId, setActiveWaypointId] = useState<string | null>(null);

  // 10. Mission System
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const currentMission = MISSIONS[currentMissionIndex] || {
    id: 5,
    title: 'FREE ROAM MASTER',
    objective: 'Explore all remaining technology facilities across the metropolitan city',
    targetSlug: '',
  };

  // 11. Modals State
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);

  // 12. Ambient Radio Audio
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  // Deep-linking support
  useEffect(() => {
    if (initialSelectedSlug) {
      const match = projectsData.find(
        (p) => p.slug === initialSelectedSlug || p.id === initialSelectedSlug
      );
      if (match) {
        setInspectedProject(match);
      }
    }
  }, [initialSelectedSlug]);

  // Initial sound on launch
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        gtaAudio.playCameraSwoosh();
      } catch {
        // Safety
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Update input loop
  const updateMovement = useCallback(() => {
    if (inspectedProject !== null || isMapOpen || isDirectoryOpen) {
      setMoveInput({ forward: 0, strafe: 0, isSprinting: false, isJumping: false, isHandbraking: false });
      return;
    }

    let forward = 0;
    let strafe = 0;
    const isSprinting = activeKeys.current.has('Shift') || activeKeys.current.has('shift');
    const isJumping = activeKeys.current.has(' ') && controlMode === 'walking';
    const isHandbraking = activeKeys.current.has(' ') && controlMode === 'driving';

    if (activeKeys.current.has('w') || activeKeys.current.has('W') || activeKeys.current.has('ArrowUp')) {
      forward += 1;
    }
    if (activeKeys.current.has('s') || activeKeys.current.has('S') || activeKeys.current.has('ArrowDown')) {
      forward -= 1;
    }
    if (activeKeys.current.has('d') || activeKeys.current.has('D') || activeKeys.current.has('ArrowRight')) {
      strafe += 1;
    }
    if (activeKeys.current.has('a') || activeKeys.current.has('A') || activeKeys.current.has('ArrowLeft')) {
      strafe -= 1;
    }

    setMoveInput({ forward, strafe, isSprinting, isJumping, isHandbraking });
  }, [inspectedProject, isMapOpen, isDirectoryOpen, controlMode]);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip cinematic intro with Space or Enter
      if (cinematicIntro && (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape')) {
        setCinematicIntro(false);
        try {
          gtaAudio.playSelect();
        } catch {
          // Safety
        }
        return;
      }

      // Escape Menu / Modal Closes
      if (e.key === 'Escape') {
        e.preventDefault();
        try {
          gtaAudio.playBack();
        } catch {
          // Safety
        }

        if (inspectedProject !== null) {
          setInspectedProject(null);
          return;
        }
        if (isMapOpen) {
          setIsMapOpen(false);
          return;
        }
        if (isDirectoryOpen) {
          setIsDirectoryOpen(false);
          return;
        }

        if (controlMode === 'interior') {
          // Exit interior to city street
          setControlMode('walking');
          setActiveInteriorProject(null);
          return;
        }

        if (onBack) onBack();
        return;
      }

      // Open Map [M]
      if ((e.key === 'm' || e.key === 'M') && inspectedProject === null && !isDirectoryOpen && controlMode !== 'interior') {
        e.preventDefault();
        try {
          gtaAudio.playMapToggle();
        } catch {
          // Safety
        }
        setIsMapOpen((prev) => !prev);
        return;
      }

      // Open Directory [I]
      if ((e.key === 'i' || e.key === 'I') && inspectedProject === null && !isMapOpen) {
        e.preventDefault();
        try {
          gtaAudio.playSelect();
        } catch {
          // Safety
        }
        setIsDirectoryOpen((prev) => !prev);
        return;
      }

      // Interact [E] or Vehicle [F]
      if (e.key === 'e' || e.key === 'E' || e.key === 'f' || e.key === 'F') {
        if (inspectedProject === null && !isMapOpen && !isDirectoryOpen) {
          handleInteractionTrigger();
          return;
        }
      }

      // Car Horn [H]
      if ((e.key === 'h' || e.key === 'H') && controlMode === 'driving') {
        e.preventDefault();
        try {
          gtaAudio.playCarHorn();
        } catch {}
        return;
      }

      // Radio Toggle [R]
      if ((e.key === 'r' || e.key === 'R') && inspectedProject === null && !isMapOpen && !isDirectoryOpen) {
        e.preventDefault();
        try {
          gtaAudio.toggleRadio();
          setIsRadioPlaying(gtaAudio.getIsRadioPlaying());
        } catch {}
        return;
      }

      activeKeys.current.add(e.key);
      updateMovement();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      activeKeys.current.delete(e.key);
      updateMovement();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    cinematicIntro,
    inspectedProject,
    isMapOpen,
    isDirectoryOpen,
    controlMode,
    updateMovement,
    onBack,
  ]);

  // Handle Dynamic Interactions (Enter Car, Exit Car, Enter Building, Inspect Station)
  const handleInteractionTrigger = useCallback(() => {
    // 1. If currently driving, [F] or [E] exits car
    if (controlMode === 'driving') {
      try {
        gtaAudio.playCarDoor();
        gtaAudio.stopCarEngine();
      } catch {
        // Safety
      }
      setControlMode('walking');
      // Place player on sidewalk beside driver door
      setPlayerPos({
        x: carPos.x - Math.cos(carPos.heading) * 1.8,
        z: carPos.z + Math.sin(carPos.heading) * 1.8,
        heading: carPos.heading,
      });
      return;
    }

    // 2. If inside 3D interior
    if (controlMode === 'interior') {
      if (nearbyInteraction?.type === 'interior_exit') {
        try {
          gtaAudio.playCarDoor();
        } catch {
          // Safety
        }
        setControlMode('walking');
        setActiveInteriorProject(null);
        return;
      }

      if (nearbyInteraction?.type === 'interior_node' && activeInteriorProject) {
        try {
          gtaAudio.playSelect();
        } catch {
          // Safety
        }
        setInspectedProject(activeInteriorProject);
        return;
      }

      // Fallback inside interior: open full dossier
      if (activeInteriorProject) {
        setInspectedProject(activeInteriorProject);
        return;
      }
    }

    // 3. If walking on foot
    if (controlMode === 'walking' && nearbyInteraction) {
      if (nearbyInteraction.type === 'car') {
        // Enter Sports Car
        try {
          gtaAudio.playCarDoor();
          gtaAudio.playCarEngineStart();
          gtaAudio.startCarEngine();
        } catch {
          // Safety
        }
        setControlMode('driving');
        return;
      }

      if (nearbyInteraction.type === 'project' && typeof nearbyInteraction.target === 'object') {
        const targetProj = nearbyInteraction.target as ProjectItem;
        try {
          gtaAudio.playSceneTransform();
        } catch {
          // Safety
        }

        // Mark discovered
        setDiscoveredProjectIds((prev) => {
          if (!prev.has(targetProj.id)) {
            const next = new Set(prev);
            next.add(targetProj.id);
            try {
              gtaAudio.playProjectDiscovered();
            } catch {
              // Safety
            }
            return next;
          }
          return prev;
        });

        // Advance mission if this was the mission target
        if (targetProj.slug === currentMission.targetSlug || targetProj.id === currentMission.targetSlug) {
          try {
            gtaAudio.playMissionPassed();
          } catch {
            // Safety
          }
          setCurrentMissionIndex((prev) => Math.min(prev + 1, MISSIONS.length));
        }

        // Enter 3D Project Interior!
        setActiveInteriorProject(targetProj);
        setControlMode('interior');
        return;
      }
    }
  }, [controlMode, nearbyInteraction, activeInteriorProject, carPos, currentMission]);

  // Mobile Touch D-pad
  const handleTouchMoveDown = (dir: 'w' | 's' | 'a' | 'd') => {
    activeKeys.current.add(dir);
    updateMovement();
  };

  const handleTouchMoveUp = (dir: 'w' | 's' | 'a' | 'd') => {
    activeKeys.current.delete(dir);
    updateMovement();
  };

  return (
    <div
      id="project-vault-open-world"
      className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans select-none"
    >
      {/* Cinematic Intro Banner Overlay */}
      {cinematicIntro && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-between p-8 bg-gradient-to-b from-black/80 via-transparent to-black/90 animate-in fade-in duration-700">
          <div className="pt-8 text-center space-y-1 pointer-events-auto">
            <div className="font-mono text-xs text-amber-400 tracking-widest uppercase">
              OPEN-WORLD 3D PORTFOLIO GAME
            </div>
            <h1 className="font-hud text-3xl sm:text-6xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">
              PROJECT VAULT
            </h1>
            <div className="text-xs font-mono text-cyan-300 tracking-wider">
              FEATURING PROTAGONIST BOLNIDI MANIKANTA
            </div>
          </div>

          <div className="pb-10 text-center space-y-3 pointer-events-auto">
            <div className="px-5 py-2.5 rounded-xs bg-black/90 border border-amber-400 text-amber-300 font-mono text-xs sm:text-sm tracking-widest uppercase shadow-lg animate-pulse">
              MISSION // EXPLORE THE METROPOLITAN WORLD & DISCOVER PROJECTS
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              PRESS <span className="text-white font-bold">[SPACE]</span> TO START EXPLORATION
            </div>
          </div>
        </div>
      )}

      {/* 3D City Open World Canvas */}
      <CityWorldCanvas
        projects={projectsData}
        playerPos={playerPos}
        onUpdatePlayerPos={setPlayerPos}
        carPos={carPos}
        onUpdateCarPos={setCarPos}
        controlMode={controlMode}
        onSetControlMode={setControlMode}
        activeInteriorProject={activeInteriorProject}
        onSetInteriorProject={setActiveInteriorProject}
        onProximityChange={setNearbyInteraction}
        onDistrictChange={setCurrentDistrict}
        onSpeedChange={setSpeedKmh}
        waypointProjectId={activeWaypointId}
        moveInput={moveInput}
        onInspectDossier={(proj) => setInspectedProject(proj)}
        cinematicIntro={cinematicIntro}
        onCinematicComplete={() => setCinematicIntro(false)}
      />

      {/* Cinematic Vignette */}
      <div className="fixed inset-0 gta-vignette pointer-events-none z-10 opacity-70" />

      {/* In-Game City HUD */}
      {!cinematicIntro && (
        <CityHUD
          currentDistrict={currentDistrict}
          totalProjects={projectsData.length}
          discoveredCount={discoveredProjectIds.size}
          activeObjective={currentMission.objective}
          missionTitle={currentMission.title}
          nearbyInteraction={nearbyInteraction}
          playerPos={playerPos}
          carPos={carPos}
          controlMode={controlMode}
          speedKmh={speedKmh}
          activeInteriorProject={activeInteriorProject}
          projects={projectsData}
          activeWaypointId={activeWaypointId}
          onInteract={handleInteractionTrigger}
          onOpenMap={() => setIsMapOpen(true)}
          onOpenDirectory={() => setIsDirectoryOpen(true)}
          onOpenDossier={() => {
            if (activeInteriorProject) setInspectedProject(activeInteriorProject);
          }}
          onExit={() => {
            if (controlMode === 'interior') {
              setControlMode('walking');
              setActiveInteriorProject(null);
              return;
            }
            if (onBack) onBack();
          }}
          onGoHome={() => {
            if (onGoHome) onGoHome();
          }}
          isRadioPlaying={isRadioPlaying}
          onToggleRadio={() => {
            try {
              gtaAudio.toggleRadio();
              setIsRadioPlaying(gtaAudio.getIsRadioPlaying());
            } catch {
              // Safety
            }
          }}
          onMoveButtonDown={handleTouchMoveDown}
          onMoveButtonUp={handleTouchMoveUp}
        />
      )}

      {/* Full City Satellite Map [M] */}
      <CityMap
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        projects={projectsData}
        playerPos={playerPos}
        carPos={carPos}
        discoveredProjectIds={discoveredProjectIds}
        activeWaypointId={activeWaypointId}
        onSetWaypoint={(pid) => setActiveWaypointId(pid)}
        onFastTravel={(tx, tz, projIdx) => {
          setPlayerPos({ x: tx, z: tz + 3.5, heading: 0 });
          setCarPos({ x: tx + 4, z: tz + 3.5, heading: 0, speed: 0 });
          setControlMode('walking');
          setIsMapOpen(false);
          setInspectedProject(projectsData[projIdx]);
        }}
      />

      {/* Projects Catalog [I] */}
      <ProjectDirectory
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        projects={projectsData}
        discoveredProjectIds={discoveredProjectIds}
        onSelectProject={(idx) => {
          const target = projectsData[idx];
          if (target) {
            setInspectedProject(target);
          }
        }}
        onSetWaypoint={(pid) => {
          setActiveWaypointId(pid);
          setIsDirectoryOpen(false);
        }}
      />

      {/* Classified Project Dossier */}
      {inspectedProject && (
        <ProjectDossier
          project={inspectedProject}
          currentIndex={projectsData.findIndex((p) => p.id === inspectedProject.id)}
          totalProjects={projectsData.length}
          onClose={() => setInspectedProject(null)}
          onNextProject={() => {
            const curIdx = projectsData.findIndex((p) => p.id === inspectedProject.id);
            const nextIdx = (curIdx + 1) % projectsData.length;
            setInspectedProject(projectsData[nextIdx]);
          }}
          onPrevProject={() => {
            const curIdx = projectsData.findIndex((p) => p.id === inspectedProject.id);
            const prevIdx = (curIdx - 1 + projectsData.length) % projectsData.length;
            setInspectedProject(projectsData[prevIdx]);
          }}
        />
      )}
    </div>
  );
};
