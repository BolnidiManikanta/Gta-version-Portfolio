import React, { useEffect } from 'react';
import { SectionId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { RotateCcw, Mail, Award, CheckCircle2, Star } from 'lucide-react';

interface MissionCompleteModalProps {
  onSelectSection: (section: SectionId) => void;
}

export const MissionCompleteModal: React.FC<MissionCompleteModalProps> = ({
  onSelectSection,
}) => {
  useEffect(() => {
    // Play iconic GTA Mission Passed sound fanfare when entering this screen!
    gtaAudio.playMissionPassed();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 py-20 z-30 select-none">
      {/* Background layer with cinematic sunset & palms */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=80"
          alt="Sunset Beach Palms"
          className="w-full h-full object-cover filter contrast-125 brightness-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-purple-950/50" />
      </div>

      {/* Main Mission Complete Billboard */}
      <div className="relative max-w-2xl w-full bg-black/90 backdrop-blur-xl border-4 border-pink-500 p-6 sm:p-10 text-center shadow-[0_0_50px_rgba(236,0,140,0.6)] animate-in fade-in zoom-in-95 duration-500">
        {/* Top Accent Star Badge */}
        <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
          <Star className="w-5 h-5 fill-amber-400 animate-pulse" />
          <Star className="w-6 h-6 fill-amber-400 animate-bounce" />
          <Star className="w-5 h-5 fill-amber-400 animate-pulse" />
        </div>

        <div className="font-hud text-xs text-pink-400 tracking-widest uppercase mb-1">
          SAN ANDREAS // LOS SANTOS DISPATCH
        </div>

        {/* Big Mission Complete Banner */}
        <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-widest leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
          MISSION COMPLETE
        </h1>

        <div className="font-script text-4xl sm:text-5xl text-[#ec008c] mt-1 -rotate-3 glow-pink">
          See you soon
        </div>

        {/* RESPECT + */}
        <div className="my-6 py-3 px-6 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent border-y-2 border-amber-400/60 inline-block">
          <div className="font-gta text-4xl sm:text-5xl text-amber-300 tracking-widest glow-yellow animate-pulse">
            RESPECT +
          </div>
          <div className="font-hud text-xs text-emerald-400 font-bold tracking-wider mt-1">
            BOUNTY ACCREDITED: +$2,450,000
          </div>
        </div>

        {/* Mission Statistics Overview */}
        <div className="grid grid-cols-3 gap-3 my-6 text-center font-hud">
          <div className="bg-white/5 border border-white/10 p-3">
            <span className="text-[10px] text-white/50 block">OPERATIONS</span>
            <span className="font-gta text-3xl text-pink-400">17+</span>
            <span className="text-[9px] text-emerald-400 block">COMPLETED</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3">
            <span className="text-[10px] text-white/50 block">TECH ARSENAL</span>
            <span className="font-gta text-3xl text-cyan-400">25+</span>
            <span className="text-[9px] text-emerald-400 block">UNLOCKED</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-3">
            <span className="text-[10px] text-white/50 block">CREDENTIALS</span>
            <span className="font-gta text-3xl text-amber-400">11+</span>
            <span className="text-[9px] text-emerald-400 block">VERIFIED</span>
          </div>
        </div>

        <p className="font-hud text-xs sm:text-sm text-neutral-300 mb-8 max-w-lg mx-auto leading-relaxed">
          You have toured the complete operational dossier of <span className="text-white font-bold">Bolnidi Manikanta</span>.
          Ready to deploy him on your next high-impact engineering mission?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              gtaAudio.playSelect();
              onSelectSection('start');
            }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 font-gta text-2xl tracking-wider cursor-pointer transition-all hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 text-pink-400" />
            <span>RESTART GAME / MENU</span>
          </button>

          <button
            onClick={() => {
              gtaAudio.playSelect();
              onSelectSection('contact');
            }}
            className="flex items-center gap-2 bg-[#ec008c] hover:bg-[#ff007f] text-white px-8 py-3 font-gta text-2xl tracking-wider shadow-[0_0_25px_rgba(236,0,140,0.8)] cursor-pointer transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            <span>HIRE AGENT NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
