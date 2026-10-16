import React from 'react';
import { SectionId, ProfileData } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, Download, ShieldCheck, Zap, Mail, Terminal, ChevronRight } from 'lucide-react';

interface AboutViewProps {
  profile: ProfileData;
  onSelectSection: (section: SectionId) => void;
  customHeroPhoto?: string;
}

export const AboutView: React.FC<AboutViewProps> = ({
  profile,
  onSelectSection,
  customHeroPhoto,
}) => {
  const photoSrc = customHeroPhoto || '/about-page.png';

  const handleDownloadResume = () => {
    gtaAudio.playSelect();
    // Simulate resume download / open CV document
    const element = document.createElement('a');
    const file = new Blob(
      [
        `BOLNIDI MANIKANTA - RESUME / DOSSIER\n` +
        `Role: ${profile.title}\n` +
        `Email: ${profile.socialLinks.email}\n` +
        `GitHub: ${profile.socialLinks.github}\n` +
        `LinkedIn: ${profile.socialLinks.linkedin}\n\n` +
        `BIOGRAPHY:\n${profile.bioIntro}\n\n${profile.bioFull}\n\n` +
        `SPECIALIZATIONS:\n` +
        profile.specializations.map((s) => `• ${s}`).join('\n')
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Bolnidi_Manikanta_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background layer with dark twilight city & subtle ambient tint */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="/about-page.png"
          alt="Night City Skyline"
          className="w-full h-full object-cover filter contrast-125 brightness-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-purple-950/40" />
      </div>

      {/* Top Header: Big GTA style ABOUT + Cursive Character Bio */}
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
              DOSSIER FILE #BM-007
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              ABOUT
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Character Bio
            </span>
          </div>
        </div>

        {/* Status Indicator Stamp */}
        <div className="mt-3 sm:mt-0 px-4 py-2 border-2 border-emerald-500 bg-emerald-950/40 rotate-1 shadow-lg">
          <div className="font-hud text-[10px] text-emerald-400 tracking-widest uppercase">
            CLEARANCE STATUS
          </div>
          <div className="font-gta text-xl text-emerald-300 tracking-wider">
            AVAILABLE FOR MISSIONS
          </div>
        </div>
      </div>

      {/* Main Content Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stats, Bio, Specializations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Character Identity Card */}
          <div className="bg-black/75 backdrop-blur-md border-l-4 border-pink-500 p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="font-hud text-xs text-pink-400 tracking-widest uppercase">
                TARGET IDENTIFICATION
              </span>
              <span className="font-hud text-xs text-white/50">
                CLASS: SYSTEM ARCHITECT
              </span>
            </div>

            <h2 className="font-gta text-4xl sm:text-5xl text-white tracking-wide">
              {profile.name}
            </h2>
            <div className="font-hud text-sm text-cyan-400 tracking-wider mb-4 font-semibold">
              {profile.title}
            </div>

            {/* Core Bio from User Prompt */}
            <div className="space-y-3 text-neutral-200 text-sm sm:text-base leading-relaxed">
              <p className="border-l-2 border-white/20 pl-3 italic text-neutral-300">
                "{profile.bioIntro}"
              </p>
              <p className="text-neutral-300">
                {profile.bioFull}
              </p>
            </div>

            {/* Specialization Pills */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <span className="font-hud text-xs text-pink-400 tracking-widest block mb-2">
                CORE SPECIALIZATIONS
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="font-hud text-xs bg-white/10 border border-white/20 text-white px-2.5 py-1 rounded-xs flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Character Skill Attributes / Stats Meters (Exact GTA Style) */}
          <div className="bg-black/75 backdrop-blur-md border border-white/10 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4 border-b border-pink-500/30 pb-2">
              <div className="flex items-center gap-2 font-hud text-xs text-pink-400 tracking-widest">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>COMBAT / TECHNICAL ATTRIBUTES</span>
              </div>
              <span className="font-hud text-xs text-white/60">MAX LEVEL: 99</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'CODING & ALGORITHMS', val: profile.stats.coding, color: 'from-pink-500 to-rose-400' },
                { label: 'AI & DEEP LEARNING', val: profile.stats.aiMl, color: 'from-purple-500 to-indigo-400' },
                { label: 'CYBERSECURITY DEFENSE', val: profile.stats.cybersecurity, color: 'from-cyan-500 to-blue-400' },
                { label: 'SOFTWARE ARCHITECTURE', val: profile.stats.softwareEng, color: 'from-emerald-500 to-green-400' },
                { label: 'STAMINA / ENDURANCE', val: profile.stats.stamina, color: 'from-yellow-500 to-amber-400' },
                { label: 'STEALTH & PEN-TESTING', val: profile.stats.stealth, color: 'from-red-500 to-pink-500' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-hud tracking-wider">
                    <span className="text-white/80">{stat.label}</span>
                    <span className="text-pink-400 font-bold">{stat.val}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/90 border border-white/20 rounded-xs overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 shadow-md`}
                      style={{ width: `${stat.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-[#ec008c] hover:bg-[#ff007f] text-white px-6 py-3 font-gta text-2xl tracking-wider shadow-[0_0_20px_rgba(236,0,140,0.6)] cursor-pointer transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD RESUME / DOSSIER</span>
            </button>

            <button
              onClick={() => {
                gtaAudio.playSelect();
                onSelectSection('contact');
              }}
              className="flex items-center gap-2 bg-black/80 hover:bg-white/10 border border-pink-500 text-white px-6 py-3 font-gta text-2xl tracking-wider cursor-pointer transition-all hover:border-white"
            >
              <Mail className="w-5 h-5 text-pink-400" />
              <span>TRANSMIT MESSAGE</span>
            </button>
          </div>
        </div>

        {/* Right Column: Character Portrait & Wanted/Dossier Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[420px] bg-black/80 border-2 border-pink-500/60 p-4 shadow-2xl rounded-xs">
            {/* Wanted Header / Bounty Header */}
            <div className="text-center pb-3 border-b-2 border-pink-500/40">
              <div className="font-gta text-4xl text-amber-400 tracking-widest leading-none">
                TOP OPERATOR
              </div>
              <div className="font-hud text-xs tracking-widest text-white/70">
                WANTED FOR: EXCEPTIONAL FULL STACK SYSTEMS
              </div>
            </div>

            {/* Character Photo in Dossier Frame */}
            <div className="relative my-3 overflow-hidden border border-white/20">
              <img
                src={photoSrc}
                alt="Bolnidi Manikanta Portrait"
                className="w-full h-[400px] object-cover object-top filter contrast-120 saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex justify-between font-hud text-[11px] text-white/90">
                <span className="bg-black/60 px-2 py-0.5 border border-pink-500/40">
                  ID: BM-2026-X
                </span>
                <span className="bg-black/60 px-2 py-0.5 border border-emerald-500/40 text-emerald-400">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Bottom Dossier Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-hud pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 border border-white/10">
                <span className="text-white/50 block text-[10px]">TOTAL OPERATIONS</span>
                <span className="text-pink-400 font-bold text-sm">17+ PROJECTS</span>
              </div>
              <div className="bg-white/5 p-2 border border-white/10">
                <span className="text-white/50 block text-[10px]">THREAT LEVEL</span>
                <span className="text-yellow-400 font-bold text-sm">MAXIMUM</span>
              </div>
            </div>

            {/* In-Game Next Objective Waypoint Prompt */}
            <div className="pt-3 border-t border-pink-500/30 flex items-center justify-between">
              <button
                onClick={() => {
                  gtaAudio.playCameraSwoosh();
                  onSelectSection('skills');
                }}
                className="w-full bg-black/70 hover:bg-[#ec008c] border border-pink-500/60 hover:border-white p-2.5 text-left font-hud transition-all cursor-pointer group flex items-center justify-between shadow-lg"
              >
                <div>
                  <div className="text-[10px] text-pink-300 group-hover:text-white tracking-widest uppercase">
                    NEXT WAYPOINT [3/6] • CAMERA PANS
                  </div>
                  <div className="font-gta text-lg text-white group-hover:text-white">
                    PROCEED TO SKILLS ARMORY →
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-pink-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
