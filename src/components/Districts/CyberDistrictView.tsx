import React from 'react';
import { DistrictId, ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Shield,
  Lock,
  ChevronRight,
  Terminal,
  AlertTriangle,
  Sparkles,
  Key,
  Flame,
} from 'lucide-react';

interface CyberDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
  onOpenMissionModal: (mission: ProjectItem, index: number) => void;
}

// 5 Cybersecurity & Offensive/Defensive Missions
const CYBER_MISSION_IDS = ['proj-12', 'proj-10', 'proj-8', 'proj-13', 'proj-15'];

export const CyberDistrictView: React.FC<CyberDistrictViewProps> = ({
  onSelectDistrict,
  onOpenMissionModal,
}) => {
  const cyberMissions = projectsData.filter((p) => CYBER_MISSION_IDS.includes(p.id));

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-600/30 border border-emerald-500 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-emerald-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 03 // BLACK CELL DIGITAL ARMORY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              CYBERSECURITY ZONE
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-emerald-500/40 text-emerald-400 font-mono rounded">
            DOWNTOWN SERVER VAULT • SECTOR 09
          </span>
        </div>
      </div>

      {/* Center Missions Section */}
      <div className="my-auto py-6 space-y-6">
        {/* District Intel Card */}
        <div className="bg-black/75 backdrop-blur-md border border-emerald-500/40 p-5 rounded shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                AIR-GAPPED NETWORK
              </span>
              <span className="font-hud text-xs text-neutral-400">
                {cyberMissions.length} ACTIVE PENETRATION & HARDENING MISSIONS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Tactical digital defense laboratory executing automated penetration testing,
              reflected XSS & SQLi auditing, domain phishing neutralization, zero-knowledge AES-256 cloud encryption,
              and generative synthetic media (deepfake) forensics.
            </p>
          </div>

          <div
            onClick={() => {
              gtaAudio.playInteract();
              if (cyberMissions.length > 0) {
                onOpenMissionModal(cyberMissions[0], 0);
              }
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-950/70 hover:bg-emerald-600 border border-emerald-500/60 rounded text-emerald-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 font-hud text-xs font-bold"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>[ E ] PENETRATION WORKSTATION</span>
          </div>
        </div>

        {/* 5 Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cyberMissions.map((mission, idx) => (
            <div
              key={mission.id}
              onClick={() => {
                gtaAudio.playSelect();
                const globalIdx = projectsData.findIndex((p) => p.id === mission.id);
                onOpenMissionModal(mission, globalIdx >= 0 ? globalIdx : idx);
              }}
              className="bg-black/80 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-400 p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-hud">
                  <span className="text-xs font-black text-emerald-400 tracking-wider">
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
                    <h3 className="font-vice text-2xl text-white group-hover:text-emerald-300 transition-colors">
                      {mission.title}
                    </h3>
                    <div className="text-[11px] font-hud text-neutral-400">
                      CATEGORY: <span className="text-emerald-400 font-bold">{mission.category}</span>
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
                <div className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
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
            onSelectDistrict('ai_lab');
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
        >
          &larr; RETURN TO AI LAB
        </button>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('dev_district');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA TO DEV DISTRICT</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
