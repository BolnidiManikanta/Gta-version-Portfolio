import React, { useState } from 'react';
import { DistrictId, CertificationItem } from '../../types';
import { achievementsData, certificationsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Trophy,
  Award,
  ChevronRight,
  Medal,
  CheckCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building,
  X,
} from 'lucide-react';

interface AchievementHQDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
}

export const AchievementHQDistrictView: React.FC<AchievementHQDistrictViewProps> = ({
  onSelectDistrict,
}) => {
  const [activeTab, setActiveTab] = useState<'trophies' | 'certifications'>('trophies');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

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
        {/* District Overview & Tab Bar */}
        <div className="bg-black/75 backdrop-blur-md border border-amber-500/40 p-5 rounded shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                RESPECT +99
              </span>
              <span className="font-hud text-xs text-neutral-400">
                17 VERIFIED CREDENTIALS • 12+ UNLOCKED TROPHIES
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Showcase of competitive hackathons, national coding symposiums, academic honors,
              and authenticated certifications from premier cloud and cybersecurity organizations.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                gtaAudio.playSelect();
                setActiveTab('trophies');
              }}
              className={`px-4 py-2 rounded text-xs font-hud font-bold transition-all cursor-pointer ${
                activeTab === 'trophies'
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                  : 'bg-black/60 border border-white/20 text-neutral-300 hover:text-white'
              }`}
            >
              TROPHIES ({achievementsData.length})
            </button>
            <button
              onClick={() => {
                gtaAudio.playSelect();
                setActiveTab('certifications');
              }}
              className={`px-4 py-2 rounded text-xs font-hud font-bold transition-all cursor-pointer ${
                activeTab === 'certifications'
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                  : 'bg-black/60 border border-white/20 text-neutral-300 hover:text-white'
              }`}
            >
              CERTIFICATIONS (17)
            </button>
          </div>
        </div>

        {/* Tab 1: Trophies Grid */}
        {activeTab === 'trophies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementsData.map((ach) => (
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
        )}

        {/* Tab 2: Certifications Grid */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id || cert.title}
                  className="bg-black/80 border border-amber-500/30 p-4 rounded hover:border-amber-400 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-hud">
                      <span className="text-amber-400 font-bold">{cert.category}</span>
                      <span className="text-neutral-400">{cert.issueDate || cert.date}</span>
                    </div>
                    <h4 className="font-hud text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 line-clamp-2">
                      {cert.title}
                    </h4>
                    <div className="text-[11px] font-hud text-neutral-400 flex items-center gap-1">
                      <Building className="w-3 h-3 text-neutral-400" />
                      <span>{cert.issuer}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-hud text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      VERIFIED
                    </span>
                    <button
                      onClick={() => {
                        gtaAudio.playSelect();
                        setSelectedCert(cert);
                      }}
                      className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-hud text-[11px] rounded transition-all cursor-pointer font-bold"
                    >
                      [ VIEW ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

      {/* Credential Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-lg bg-neutral-950 border-2 border-amber-500 p-6 rounded-sm shadow-[0_0_50px_rgba(245,158,11,0.5)] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-amber-500/30 pb-3">
              <div>
                <div className="font-hud text-[10px] text-amber-400 uppercase tracking-widest">
                  CREDENTIAL DOSSIER
                </div>
                <h3 className="font-gta text-2xl text-white mt-1">{selectedCert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-hud bg-black/60 p-3 rounded">
              <div>
                <span className="text-neutral-400 block text-[10px]">ISSUER</span>
                <span className="text-white font-bold">{selectedCert.issuer}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">ISSUED</span>
                <span className="text-amber-400 font-bold">{selectedCert.issueDate || selectedCert.date}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">CATEGORY</span>
                <span className="text-cyan-400 font-bold">{selectedCert.category}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">STATUS</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
            </div>

            {selectedCert.credentialId && (
              <div className="bg-amber-950/40 border border-amber-500/40 p-2.5 rounded font-mono text-xs text-white">
                <span className="text-[10px] text-amber-400 font-hud block">ID:</span>
                {selectedCert.credentialId}
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              {(selectedCert.credentialUrl || selectedCert.verificationUrl) && (
                <a
                  href={selectedCert.credentialUrl || selectedCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-amber-500 text-black font-hud text-xs font-bold rounded flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ONLINE PROOF</span>
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="px-3 py-1.5 bg-white/10 text-white font-hud text-xs rounded cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
