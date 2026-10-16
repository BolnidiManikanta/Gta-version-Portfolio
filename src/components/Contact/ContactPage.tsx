import React from 'react';
import { profileData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  MapPin,
  Send,
  Radio,
  CheckCircle2,
  Phone,
} from 'lucide-react';

interface ContactPageProps {
  onBack?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-start p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-pink-500/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-pink-600/30 border-2 border-pink-500 flex items-center justify-center text-pink-400 shadow-[0_0_20px_rgba(236,0,140,0.4)]">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <div className="font-hud text-xs text-pink-400 tracking-widest font-black uppercase flex items-center gap-2">
              <span>COMMUNICATIONS TOWER // ROOFTOP RELAY</span>
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            </div>
            <h1 className="font-vice text-4xl sm:text-5xl text-white tracking-wide">
              CONTACT TERMINAL
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">CHANNEL:</span>
          <span className="px-3 py-1 bg-black/80 border border-pink-500/50 text-pink-300 font-mono rounded">
            TRANSMISSION SECURE 256-BIT
          </span>
        </div>
      </div>

      {/* Terminal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Channels */}
        <div className="bg-black/85 backdrop-blur-md border border-pink-500/35 p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl">
          <div className="space-y-2">
            <div className="font-hud text-xs text-pink-400 font-bold uppercase tracking-wider">
              OFFICIAL FREQUENCIES
            </div>
            <h3 className="font-hud text-2xl font-bold text-white">Direct Transmission Lines</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Reach out directly for software engineering opportunities, research collaborations, or speaking engagements.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={`mailto:${profileData.socialLinks.email}`}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-pink-400 hover:bg-pink-950/30 rounded transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-pink-950/80 border border-pink-500/50 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-hud text-neutral-400">PRIMARY EMAIL</div>
                  <div className="text-xs sm:text-sm font-mono text-white font-bold">{profileData.socialLinks.email}</div>
                </div>
              </div>
              <Send className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-blue-400 hover:bg-blue-950/30 rounded transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-hud text-neutral-400">PROFESSIONAL NETWORK</div>
                  <div className="text-xs sm:text-sm font-mono text-white font-bold">LinkedIn Profile</div>
                </div>
              </div>
              <Send className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-950/30 rounded transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-hud text-neutral-400">CODE REPOSITORY</div>
                  <div className="text-xs sm:text-sm font-mono text-white font-bold">GitHub Portfolio</div>
                </div>
              </div>
              <Send className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Location & Resume */}
        <div className="bg-black/85 backdrop-blur-md border border-pink-500/35 p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="font-hud text-xs text-pink-400 font-bold uppercase tracking-wider">
                PHYSICAL COORDINATES
              </div>
              <h3 className="font-hud text-2xl font-bold text-white">Location & Availability</h3>
              <div className="flex items-center gap-2 font-hud text-sm text-neutral-300">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>{profileData.location}</span>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5 text-emerald-400 font-hud font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>OPEN FOR ROLES & COLLABORATIONS</span>
              </div>
              <p>
                Available for Full-Stack, AI/ML Engineering, Cybersecurity Analyst, and Cloud infrastructure positions.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-hud font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(236,0,140,0.5)] cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
