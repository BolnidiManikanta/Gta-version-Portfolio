import React from 'react';
import { DistrictId } from '../../types';
import { experienceData, educationData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Briefcase,
  GraduationCap,
  ChevronRight,
  Shield,
  Building,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';

interface CareerDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
}

export const CareerDistrictView: React.FC<CareerDistrictViewProps> = ({
  onSelectDistrict,
}) => {
  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-purple-600/30 border border-purple-500 flex items-center justify-center text-purple-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-purple-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 06 // SAN ANDREAS CORRIDOR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              CAREER & FIELD OPERATIONS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-purple-500/40 text-purple-400 font-mono rounded">
            MULHOLLAND OVERLOOK • HIGHWAY JUNCTION
          </span>
        </div>
      </div>

      {/* Center Career & Education Timeline */}
      <div className="my-auto py-6 space-y-6">
        {/* District Overview */}
        <div className="bg-black/75 backdrop-blur-md border border-purple-500/40 p-5 rounded shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                FIELD HISTORY
              </span>
              <span className="font-hud text-xs text-neutral-400">
                OPERATIONAL TIMELINE & ACADEMIC GROUNDWORK
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Chronological log of industry internships, institutional cybersecurity simulations,
              and formal computer science foundations.
            </p>
          </div>

          <div
            onClick={() => gtaAudio.playSelect()}
            className="w-full sm:w-auto px-4 py-2.5 bg-purple-950/70 hover:bg-purple-600 border border-purple-500/60 rounded text-purple-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 font-hud text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>[ E ] BRIEFCASE DOSSIER</span>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Work / Internships */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-hud text-xs font-bold text-purple-400">
              <Briefcase className="w-4 h-4" />
              <span>INDUSTRY OPERATIONS:</span>
            </div>

            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="bg-black/80 backdrop-blur-md border border-purple-500/30 p-5 rounded space-y-3 shadow-xl"
              >
                <div className="flex items-center justify-between font-hud">
                  <span className="text-xs font-black text-purple-400">{exp.period}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                    {exp.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-hud text-lg font-bold text-white">{exp.role}</h3>
                  <div className="text-xs font-hud text-neutral-400 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.organization}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/5 rounded text-[11px] font-hud text-purple-300 border border-white/10">
                  MISSION: {exp.mission}
                </div>

                <ul className="space-y-1.5 text-xs text-neutral-300 pl-4 list-disc marker:text-purple-500">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">
                      {resp}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-hud bg-purple-950/60 border border-purple-500/30 text-purple-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Foundations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-hud text-xs font-bold text-cyan-400">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATIONS:</span>
            </div>

            <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 p-5 rounded space-y-3 shadow-xl">
              <div className="flex items-center justify-between font-hud">
                <span className="text-xs font-black text-cyan-400">{educationData.period}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                  {educationData.gpaOrScore || 'ACTIVE CANDIDATE'}
                </span>
              </div>

              <div>
                <h3 className="font-hud text-lg font-bold text-white">{educationData.degree}</h3>
                <div className="text-xs font-hud text-neutral-400 flex items-center gap-1 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{educationData.institution} • {educationData.location}</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-neutral-300 pl-4 list-disc marker:text-cyan-500">
                {educationData.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-white/10">
                <div className="text-[10px] font-hud text-neutral-400 mb-1.5">
                  CORE DOMAINS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {educationData.courses.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded text-[10px] font-hud bg-white/5 border border-cyan-500/30 text-neutral-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* District Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('achievement_hq');
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
        >
          &larr; RETURN TO ACHIEVEMENT HQ
        </button>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('comms_center');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA TO COMMUNICATION TOWER</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
