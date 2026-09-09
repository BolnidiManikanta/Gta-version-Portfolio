import React, { useState } from 'react';
import { SectionId } from '../../types';
import { achievementsData, certificationsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, Trophy, Award, ShieldCheck, Star, CheckCircle, Flame } from 'lucide-react';

interface AchievementsViewProps {
  onSelectSection: (section: SectionId) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onSelectSection }) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'certifications'>('achievements');

  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background with dark purple twilight */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80"
          alt="Night City Lights"
          className="w-full h-full object-cover filter contrast-125 brightness-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-purple-950/40" />
      </div>

      {/* Header: ACHIEVEMENTS + Cursive Unlocked */}
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
              TROPHY & CREDENTIALS VAULT
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              ACHIEVEMENTS
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Unlocked
            </span>
          </div>
        </div>

        {/* Tab Switcher: Major Achievements vs Official Certifications */}
        <div className="mt-3 sm:mt-0 flex gap-2">
          <button
            onClick={() => {
              gtaAudio.playSelect();
              setActiveTab('achievements');
            }}
            className={`px-4 py-2 font-hud text-xs tracking-wider uppercase cursor-pointer transition-all ${
              activeTab === 'achievements'
                ? 'bg-[#ec008c] text-white font-bold shadow-[0_0_15px_rgba(236,0,140,0.6)]'
                : 'bg-black/60 border border-white/20 text-white/70 hover:text-white'
            }`}
          >
            TROPHIES & HACKATHONS
          </button>
          <button
            onClick={() => {
              gtaAudio.playSelect();
              setActiveTab('certifications');
            }}
            className={`px-4 py-2 font-hud text-xs tracking-wider uppercase cursor-pointer transition-all ${
              activeTab === 'certifications'
                ? 'bg-[#ec008c] text-white font-bold shadow-[0_0_15px_rgba(236,0,140,0.6)]'
                : 'bg-black/60 border border-white/20 text-white/70 hover:text-white'
            }`}
          >
            CERTIFICATIONS ({certificationsData.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'achievements' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievementsData.map((ach) => (
            <div
              key={ach.id}
              onMouseEnter={() => gtaAudio.playHover()}
              className="bg-black/80 backdrop-blur-md border border-pink-500/40 hover:border-pink-400 p-5 shadow-2xl transition-all duration-200 hover:-translate-y-1 relative group"
            >
              {/* Gold Trophy Accent */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xs bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 fill-amber-400/30" />
                </div>
                <div className="text-right">
                  <span className="font-hud text-xs text-[#55e055] font-bold block">
                    {ach.xp}
                  </span>
                  <span className="font-hud text-[10px] text-amber-400 uppercase tracking-widest">
                    ★ {ach.status}
                  </span>
                </div>
              </div>

              <div className="font-hud text-[10px] text-pink-400 tracking-wider uppercase mb-1">
                {ach.category} • {ach.date}
              </div>

              <h3 className="font-gta text-2xl sm:text-3xl text-white tracking-wider mb-2 leading-tight">
                {ach.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {ach.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-hud text-white/60">
                <span>BADGE UNLOCKED</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Certifications Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationsData.map((cert, index) => (
            <div
              key={index}
              onMouseEnter={() => gtaAudio.playHover()}
              className="bg-black/80 backdrop-blur-md border border-white/10 hover:border-cyan-400/80 p-4 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-hud text-[10px] text-cyan-400 tracking-wider uppercase mb-1.5">
                  <span>{cert.category}</span>
                  <span className="text-white/50">{cert.date}</span>
                </div>
                <h4 className="font-gta text-2xl text-white tracking-wide mb-1 leading-snug">
                  {cert.title}
                </h4>
                <div className="font-hud text-xs text-neutral-300">
                  ISSUER: <span className="text-white font-bold">{cert.issuer}</span>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between font-hud text-[11px]">
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED CREDENTIAL
                </span>
                <span className="text-pink-400 font-bold">100% PASS</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
