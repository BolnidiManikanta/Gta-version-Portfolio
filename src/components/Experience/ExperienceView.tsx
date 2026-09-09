import React from 'react';
import { SectionId } from '../../types';
import { experienceData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, Shield, Zap } from 'lucide-react';

interface ExperienceViewProps {
  onSelectSection: (section: SectionId) => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onSelectSection }) => {
  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background layer: Night skyline overlooking glowing highway traffic streaks (matching video 00:13) */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80"
          alt="Night City Highway"
          className="w-full h-full object-cover filter contrast-125 brightness-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-purple-950/40" />
      </div>

      {/* Header: EXPERIENCE + Cursive Journey */}
      <div className="flex flex-wrap items-end justify-between border-b border-pink-500/40 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                gtaAudio.playBack();
                onSelectSection('start');
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-pink-500/50 hover:bg-[#ec008c] text-white font-hud text-xs tracking-wider rounded-xs cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ESC / BACK</span>
            </button>
            <span className="font-hud text-xs text-pink-400 uppercase tracking-widest">
              FIELD DEPLOYMENTS TIMELINE
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              EXPERIENCE
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Journey
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 font-hud text-xs text-white/70 bg-black/60 border border-white/20 px-3 py-2">
          STATUS: <span className="text-emerald-400 font-bold">ACTIVE COMBAT TRACK RECORD</span>
        </div>
      </div>

      {/* Timeline of Field Deployments */}
      <div className="space-y-6 max-w-5xl mx-auto w-full">
        {experienceData.map((exp, idx) => (
          <div
            key={idx}
            onMouseEnter={() => gtaAudio.playHover()}
            className="bg-black/80 backdrop-blur-md border-l-4 border-pink-500 border-y border-r border-white/10 p-5 sm:p-7 shadow-2xl transition-all duration-200 hover:border-pink-400 hover:translate-x-1"
          >
            {/* Mission Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-hud text-xs bg-pink-950/80 border border-pink-500 text-pink-300 px-2 py-0.5 uppercase tracking-wider">
                    {exp.badge}
                  </span>
                  <div className="flex items-center gap-1 font-hud text-xs text-white/60">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <h3 className="font-gta text-3xl sm:text-4xl text-white tracking-wider">
                  {exp.role}
                </h3>
                <div className="font-hud text-sm text-cyan-400 font-semibold tracking-wider">
                  {exp.organization}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 px-3 py-1.5 text-right font-hud">
                <span className="text-[10px] text-white/50 block">DIRECTIVE</span>
                <span className="text-xs text-amber-400 font-bold tracking-wider">
                  {exp.mission}
                </span>
              </div>
            </div>

            {/* Responsibilities list */}
            <div className="space-y-2 mb-4">
              <span className="font-hud text-xs text-pink-400 tracking-widest block uppercase">
                KEY MISSION OBJECTIVES COMPLETED:
              </span>
              <ul className="space-y-2 text-neutral-300 text-sm sm:text-base">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tactical Technologies & Mission Outcome */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-hud text-xs text-white/50 mr-1">ARSENAL:</span>
                {exp.technologies.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-hud text-xs bg-white/10 border border-white/20 text-white/90 px-2.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="font-hud text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-3 py-1">
                OUTCOME: {exp.outcome}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
