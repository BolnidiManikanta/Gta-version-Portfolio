import React from 'react';
import { DistrictId } from '../../types';
import { achievementsData, certificationsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Trophy,
  Award,
  Star,
  ChevronRight,
  Medal,
  CheckCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface AchievementHQDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
}

export const AchievementHQDistrictView: React.FC<AchievementHQDistrictViewProps> = ({
  onSelectDistrict,
}) => {
  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-amber-600/30 border border-amber-500 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-amber-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 05 // THE TROPHY VAULT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              ACHIEVEMENT HQ
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-amber-500/40 text-amber-400 font-mono rounded">
            VICE POINT • THE MANSION VAULT
          </span>
        </div>
      </div>

      {/* Center Trophies & Certifications Content */}
      <div className="my-auto py-6 space-y-6">
        {/* District Overview */}
        <div className="bg-black/75 backdrop-blur-md border border-amber-500/40 p-5 rounded shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                RESPECT +99
              </span>
              <span className="font-hud text-xs text-neutral-400">
                12+ UNLOCKED TROPHIES • INDUSTRY RECOGNIZED CREDENTIALS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Showcase of competitive hackathons, national coding symposiums, academic honors,
              and authenticated certifications from premier cloud and cybersecurity organizations.
            </p>
          </div>

          <div
            onClick={() => gtaAudio.playMissionPassed()}
            className="w-full sm:w-auto px-4 py-2.5 bg-amber-950/70 hover:bg-amber-600 border border-amber-500/60 rounded text-amber-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 font-hud text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>[ E ] INSPECT TROPHY VAULT</span>
          </div>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementsData.slice(0, 6).map((ach) => (
            <div
              key={ach.id}
              className="bg-black/80 backdrop-blur-md border border-amber-500/30 hover:border-amber-400 p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-hud">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
                    {ach.category}
                  </span>
                  <span className="text-xs font-hud text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {ach.status}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Medal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-hud text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {ach.title}
                    </h3>
                    <div className="text-[10px] font-hud text-neutral-400">{ach.date}</div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-hud text-xs">
                <span className="text-neutral-400">REWARD:</span>
                <span className="text-amber-400 font-black tracking-wider">{ach.xp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Row */}
        <div className="bg-black/70 border border-white/10 p-4 rounded space-y-3">
          <div className="font-hud text-xs font-bold text-neutral-300 tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>AUTHENTICATED ACCREDITATIONS:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {certificationsData.slice(0, 4).map((cert) => (
              <div
                key={cert.title}
                className="p-3 bg-white/5 border border-white/10 rounded space-y-1 text-xs"
              >
                <div className="font-bold text-white text-xs truncate">{cert.title}</div>
                <div className="text-[10px] font-hud text-amber-400">{cert.issuer}</div>
                <div className="text-[9px] text-neutral-400">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('dev_district');
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
        >
          &larr; RETURN TO DEV DISTRICT
        </button>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('career_district');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA TO CAREER DISTRICT</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
