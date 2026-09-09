import React, { useState } from 'react';
import { SectionId } from '../../types';
import { skillsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, Crosshair, Terminal, Cpu, ShieldAlert, LayoutGrid, Wrench } from 'lucide-react';

interface SkillsViewProps {
  onSelectSection: (section: SectionId) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  programming: <Terminal className="w-4 h-4" />,
  'ai-ml': <Cpu className="w-4 h-4" />,
  cybersecurity: <ShieldAlert className="w-4 h-4" />,
  'web-software': <LayoutGrid className="w-4 h-4" />,
  'tools-tech': <Wrench className="w-4 h-4" />,
};

export const SkillsView: React.FC<SkillsViewProps> = ({ onSelectSection }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(skillsData[0].id);

  const activeCategory =
    skillsData.find((c) => c.id === activeCategoryId) || skillsData[0];

  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background layer: Cyber hacker workstation in night city */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&auto=format&fit=crop&q=80"
          alt="Cyber Matrix Station"
          className="w-full h-full object-cover filter contrast-125 brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-purple-950/40" />
      </div>

      {/* Header: SKILLS + Cursive Unlocked */}
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
              TACTICAL ARSENAL LOADOUT
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              SKILLS
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Unlocked
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 font-hud text-xs text-white/70 bg-black/60 border border-white/20 px-3 py-2">
          ARMORY CAPACITY: <span className="text-pink-400 font-bold">100% UNLOCKED</span>
        </div>
      </div>

      {/* Main Grid: Category Loadout Switcher + Weapons / Skills Inventory + Visual Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Category Tabs & Skills List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tactical Category Switcher Tabs */}
          <div className="flex flex-wrap gap-2 bg-black/70 p-2 border border-pink-500/30">
            {skillsData.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    gtaAudio.playWeaponSwitch();
                    setActiveCategoryId(cat.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 font-hud text-xs tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ec008c] text-white font-bold shadow-[0_0_15px_rgba(236,0,140,0.6)]'
                      : 'bg-white/5 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {CATEGORY_ICONS[cat.id] || <Crosshair className="w-4 h-4" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Skills Cards */}
          <div className="space-y-3">
            {activeCategory.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-black/80 backdrop-blur-md border border-white/10 hover:border-pink-500/80 p-4 transition-all duration-200 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full group-hover:animate-ping" />
                    <h3 className="font-gta text-2xl sm:text-3xl text-white tracking-wider">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-hud text-[10px] bg-pink-950/60 border border-pink-500/40 text-pink-300 px-2 py-0.5 tracking-wider uppercase">
                      {skill.tag}
                    </span>
                    <span className="font-hud text-sm text-cyan-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 mb-2.5 font-normal">
                  {skill.description}
                </p>

                {/* Stat Progress Bar */}
                <div className="h-2 w-full bg-neutral-900 border border-white/10 rounded-xs overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-600 via-pink-500 to-cyan-400 group-hover:brightness-125 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Character at Cyber Terminal / Dual Monitor Visual (matching video 00:17) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[440px] bg-black/80 border-2 border-pink-500/60 p-4 shadow-2xl rounded-xs">
            <div className="flex items-center justify-between pb-2 border-b border-pink-500/40 mb-3">
              <span className="font-hud text-xs text-pink-400 tracking-widest uppercase">
                OPERATIONAL TERMINAL
              </span>
              <span className="font-hud text-[10px] text-emerald-400">
                ● LIVE MONITOR
              </span>
            </div>

            {/* Hacker Workstation Photo */}
            <div className="relative overflow-hidden border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80"
                alt="Cyber Terminal"
                className="w-full h-[320px] object-cover filter contrast-125 saturate-120"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
              {/* Code matrix overlay */}
              <div className="absolute top-2 left-3 font-hud text-[10px] text-cyan-400 opacity-70 pointer-events-none">
                $ init_arsenal --module={activeCategoryId}
                <br />
                $ status: ALL SYSTEMS ARMED
              </div>
            </div>

            {/* Weapon Wheel Info Summary */}
            <div className="mt-3 p-3 bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-hud">
                <span className="text-white/60">ACTIVE WEAPON:</span>
                <span className="text-pink-400 font-bold">{activeCategory.name}</span>
              </div>
              <div className="flex justify-between text-xs font-hud">
                <span className="text-white/60">TOTAL CAPABILITIES:</span>
                <span className="text-cyan-400 font-bold">25+ ARMED SKILLS</span>
              </div>
              <div className="flex justify-between text-xs font-hud">
                <span className="text-white/60">TACTICAL EFFICIENCY:</span>
                <span className="text-emerald-400 font-bold">96.8% HIGH IMPACT</span>
              </div>
            </div>

            {/* Link to Projects Mission Screen */}
            <button
              onClick={() => {
                gtaAudio.playSceneTransform();
                onSelectSection('projects');
              }}
              className="mt-4 w-full bg-[#ec008c] hover:bg-[#ff007f] text-white py-2.5 font-gta text-2xl tracking-wider text-center cursor-pointer transition-colors shadow-lg"
            >
              DEPLOY WEAPONS IN MISSIONS ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
