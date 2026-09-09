import React from 'react';
import { DistrictId, ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Code,
  Layers,
  ChevronRight,
  Terminal,
  Globe,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';

interface DevDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
  onOpenMissionModal: (mission: ProjectItem, index: number) => void;
}

// 6 Full Stack & Software Engineering Missions
const DEV_MISSION_IDS = ['proj-3', 'proj-6', 'proj-5', 'proj-7', 'proj-9', 'proj-14'];

export const DevDistrictView: React.FC<DevDistrictViewProps> = ({
  onSelectDistrict,
  onOpenMissionModal,
}) => {
  const devMissions = projectsData.filter((p) => DEV_MISSION_IDS.includes(p.id));

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-blue-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-blue-600/30 border border-blue-500 flex items-center justify-center text-blue-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-blue-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 04 // SILICON WATERFRONT MAINFRAME</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              DEVELOPMENT DISTRICT
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-blue-500/40 text-blue-400 font-mono rounded">
            STARFISH ISLAND • SILICON DOCK
          </span>
        </div>
      </div>

      {/* Center Missions Section */}
      <div className="my-auto py-6 space-y-6">
        {/* District Intel Card */}
        <div className="bg-black/75 backdrop-blur-md border border-blue-500/40 p-5 rounded shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-blue-950 text-blue-300 border border-blue-500/40">
                FULL STACK ENGINE
              </span>
              <span className="font-hud text-xs text-neutral-400">
                {devMissions.length} DEPLOYED ENTERPRISE & WEB ECOSYSTEM MISSIONS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              High-throughput software engineering foundry producing enterprise booking engines (Servify Apps),
              sub-second live WebSocket messaging clusters (Servify Connect), simulated virtual hardware labs,
              emergency regional blood matching platforms, and automated code grading systems.
            </p>
          </div>

          <div
            onClick={() => {
              gtaAudio.playInteract();
              if (devMissions.length > 0) {
                onOpenMissionModal(devMissions[0], 0);
              }
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-blue-950/70 hover:bg-blue-600 border border-blue-500/60 rounded text-blue-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 font-hud text-xs font-bold"
          >
            <Server className="w-4 h-4 text-blue-400" />
            <span>[ E ] DEV WORKSTATION</span>
          </div>
        </div>

        {/* 6 Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devMissions.map((mission, idx) => (
            <div
              key={mission.id}
              onClick={() => {
                gtaAudio.playSelect();
                const globalIdx = projectsData.findIndex((p) => p.id === mission.id);
                onOpenMissionModal(mission, globalIdx >= 0 ? globalIdx : idx);
              }}
              className="bg-black/80 backdrop-blur-md border border-blue-500/30 hover:border-blue-400 p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-hud">
                  <span className="text-xs font-black text-blue-400 tracking-wider">
                    MISSION #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold">
                    {mission.status}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={mission.image}
                    alt={mission.title}
                    className="w-16 h-16 object-cover rounded border border-white/20 filter brightness-90 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-vice text-2xl text-white group-hover:text-blue-300 transition-colors">
                      {mission.title}
                    </h3>
                    <div className="text-[11px] font-hud text-neutral-400">
                      CATEGORY: <span className="text-blue-400 font-bold">{mission.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {mission.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mission.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-hud bg-white/5 border border-white/15 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 font-hud text-xs">
                <div className="text-neutral-400">
                  BOUNTY: <span className="text-emerald-400 font-bold font-mono">{mission.bounty}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>START</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('cyber_district');
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
        >
          &larr; RETURN TO CYBERSECURITY ZONE
        </button>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('achievement_hq');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA TO ACHIEVEMENT HQ</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
