import React from 'react';
import { profileData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  User,
  ShieldCheck,
  MapPin,
  GraduationCap,
  Calendar,
  Sparkles,
  Award,
  FileCode,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface AboutPageProps {
  onBack?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-start p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-pink-500/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-pink-600/30 border-2 border-pink-500 flex items-center justify-center text-pink-400 shadow-[0_0_20px_rgba(236,0,140,0.4)]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="font-hud text-xs text-pink-400 tracking-widest font-black uppercase flex items-center gap-2">
              <span>DOSSIER // LOCATION 01</span>
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            </div>
            <h1 className="font-vice text-4xl sm:text-5xl text-white tracking-wide">
              ABOUT MANIKANTA
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">OPERATIVE IDENTITY:</span>
          <span className="px-3 py-1 bg-black/80 border border-pink-500/50 text-pink-300 font-mono rounded">
            LEVEL 99 SENIOR ARCHITECT
          </span>
        </div>
      </div>

      {/* Main Profile Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ID Badge & Quick Metrics */}
        <div className="bg-black/85 backdrop-blur-md border border-pink-500/35 p-6 rounded-sm space-y-5 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-28 h-28 mx-auto rounded-full border-2 border-pink-500 p-1 bg-black shadow-[0_0_25px_rgba(236,0,140,0.5)] overflow-hidden">
              <img
                src="/hero-profile.png"
                alt={profileData.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            <div className="text-center space-y-1">
              <h2 className="font-vice text-2xl text-white tracking-wide">{profileData.name}</h2>
              <div className="font-hud text-xs text-pink-400 font-bold uppercase tracking-wider">
                {profileData.title}
              </div>
              <div className="flex items-center justify-center gap-1.5 font-hud text-xs text-neutral-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{profileData.location}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 font-hud text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">ACADEMIC CGPA</span>
                <span className="text-cyan-400 font-bold">8.6 / 10.0</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">IEEE PUBLICATIONS</span>
                <span className="text-purple-400 font-bold">4 PAPERS</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">VERIFIED CERTS</span>
                <span className="text-amber-400 font-bold">17 CREDENTIALS</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">MENTORED</span>
                <span className="text-emerald-400 font-bold">500+ STUDENTS</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href="mailto:massmanikanta70@gmail.com"
              className="w-full py-2.5 px-4 rounded bg-pink-600 hover:bg-pink-500 text-white font-hud font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>DISPATCH TRANSMISSION</span>
            </a>
          </div>
        </div>

        {/* Right Column: Narrative Biography & Philosophy */}
        <div className="lg:col-span-2 bg-black/85 backdrop-blur-md border border-pink-500/35 p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl">
          <div className="space-y-3">
            <div className="font-hud text-xs text-pink-400 uppercase tracking-wider font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>EXECUTIVE PROFILE & BACKGROUND</span>
            </div>
            <h3 className="font-hud text-2xl font-bold text-white leading-snug">
              Computer Science & Engineering Specialist at BVC Engineering College
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {profileData.bioFull || profileData.bioIntro}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="font-hud text-xs text-pink-400 uppercase tracking-wider font-bold">
              CORE PHILOSOPHY & CAPABILITIES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded border border-white/10 space-y-1.5">
                <h4 className="font-hud text-sm font-bold text-cyan-300">Engineering Rigor</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Building fault-tolerant systems with clean architecture, verifiable cryptographic security, and real-time responsiveness.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 space-y-1.5">
                <h4 className="font-hud text-sm font-bold text-purple-300">Peer-Reviewed Research</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Translating theoretical machine learning and cryptography research into production-grade implementations indexed in IEEE Xplore.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 space-y-1.5">
                <h4 className="font-hud text-sm font-bold text-emerald-300">Student Leadership</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Technical coordinator and peer mentor empowering over 500 undergraduate engineers through hands-on hackathons and workshops.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 space-y-1.5">
                <h4 className="font-hud text-sm font-bold text-amber-300">Continuous Mastery</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Accumulating 17 industry certifications and 10 competitive trophies across Cloud, Cybersecurity, AI/ML, and Algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
