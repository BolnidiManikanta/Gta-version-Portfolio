import React, { useState } from 'react';
import { DistrictId, ProjectItem } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Brain,
  Zap,
  ChevronRight,
  Shield,
  Eye,
  Cpu,
  Play,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface AILabDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
  onOpenMissionModal: (mission: ProjectItem, index: number) => void;
}

// 4 Featured AI & Computer Vision Missions
const AI_MISSION_IDS = ['proj-1', 'proj-2', 'proj-11', 'proj-4'];

export const AILabDistrictView: React.FC<AILabDistrictViewProps> = ({
  onSelectDistrict,
  onOpenMissionModal,
}) => {
  const [activeTab, setActiveTab] = useState<'missions' | 'architecture'>('missions');

  const aiMissions = projectsData.filter((p) => AI_MISSION_IDS.includes(p.id));

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cyan-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-cyan-600/30 border border-cyan-500 flex items-center justify-center text-cyan-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-cyan-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 02 // NEURAL RESEARCH FACILITY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              AI & COMPUTER VISION LAB
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-cyan-500/40 text-cyan-400 font-mono rounded">
            LITTLE HAITI • SUB-LEVEL 3
          </span>
        </div>
      </div>

      {/* Center Mission Showcase */}
      <div className="my-auto py-6 space-y-6">
        {/* District Overview Card */}
        <div className="bg-black/75 backdrop-blur-md border border-cyan-500/40 p-5 rounded shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                ACTIVE LAB TERMINAL
              </span>
              <span className="font-hud text-xs text-neutral-400">
                {aiMissions.length} DEPLOYED ARTIFICIAL INTELLIGENCE MISSIONS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Specialized neural network skunkworks implementing edge computer vision inspection,
              biometric medical disorder classification, automated waste sorting (YOLOv8), and
              stylometric natural language content filters.
            </p>
          </div>

          {/* Interactive Rig [E] */}
          <div
            onClick={() => {
              gtaAudio.playInteract();
              if (aiMissions.length > 0) {
                onOpenMissionModal(aiMissions[0], 0);
              }
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-cyan-950/70 hover:bg-cyan-600 border border-cyan-500/60 rounded text-cyan-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 font-hud text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>[ E ] ACCESS NEURAL RIG</span>
          </div>
        </div>

        {/* 4 AI Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiMissions.map((mission, idx) => (
            <div
              key={mission.id}
              onClick={() => {
                gtaAudio.playSelect();
                const globalIdx = projectsData.findIndex((p) => p.id === mission.id);
                onOpenMissionModal(mission, globalIdx >= 0 ? globalIdx : idx);
              }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Mission Status Header */}
                <div className="flex items-center justify-between font-hud">
                  <span className="text-xs font-black text-cyan-400 tracking-wider">
                    MISSION #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold">
                    {mission.status}
                  </span>
                </div>

                {/* Title & Image */}
                <div className="flex items-start gap-3">
                  <img
                    src={mission.image}
                    alt={mission.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border border-white/20 filter brightness-90 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-vice text-2xl text-white group-hover:text-cyan-300 transition-colors">
                      {mission.title}
                    </h3>
                    <div className="text-[11px] font-hud text-neutral-400">
                      CATEGORY: <span className="text-cyan-400 font-bold">{mission.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {mission.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mission.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-hud bg-white/5 border border-white/15 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Bounty & Action */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 font-hud text-xs">
                <div className="text-neutral-400">
                  BOUNTY: <span className="text-emerald-400 font-bold font-mono">{mission.bounty}</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>START MISSION</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom District Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('player_hq');
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
        >
          &larr; RETURN TO PLAYER HQ
        </button>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('cyber_district');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA TO CYBERSECURITY ZONE</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
