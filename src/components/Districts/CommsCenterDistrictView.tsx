import React, { useState } from 'react';
import { ProfileData, DistrictId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  Radio,
  Send,
  Github,
  Linkedin,
  Mail,
  FileText,
  CheckCircle,
  Sparkles,
  Phone,
  Terminal,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface CommsCenterDistrictViewProps {
  profile: ProfileData;
  onSelectDistrict: (district: DistrictId) => void;
  onOpenPhone: () => void;
}

export const CommsCenterDistrictView: React.FC<CommsCenterDistrictViewProps> = ({
  profile,
  onSelectDistrict,
  onOpenPhone,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    gtaAudio.playSelect();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
    }, 3500);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* District Header Watermark */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-pink-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-pink-600/30 border border-pink-500 flex items-center justify-center text-pink-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="font-hud text-[11px] text-pink-400 tracking-widest font-black uppercase flex items-center gap-1.5">
              <span>LOCATION 07 // SATELLITE BROADCAST SPIRE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
            </div>
            <h1 className="font-vice text-3xl sm:text-4xl text-white">
              COMMUNICATION TOWER
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-hud">
          <span className="text-neutral-400">COORDINATES:</span>
          <span className="px-2 py-1 bg-black/60 border border-pink-500/40 text-pink-400 font-mono rounded">
            MAZE BANK ROOFTOP HELIPAD • FL 98
          </span>
        </div>
      </div>

      {/* Center Comms Grid: Dispatch Terminal + Contact Channels */}
      <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Dispatch Console Form (7 Cols) */}
        <div className="lg:col-span-7 bg-black/80 backdrop-blur-md border border-pink-500/40 p-6 rounded space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="space-y-0.5">
              <div className="font-hud text-xs font-black text-pink-400 tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>DIRECT DISPATCH CONSOLE // MISSION ENGAGEMENT</span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Send contract offers, full-time opportunities, or inquiries directly to Bolnidi.
              </div>
            </div>

            <div
              onClick={() => {
                gtaAudio.playInteract();
                onOpenPhone();
              }}
              className="px-2.5 py-1 rounded bg-pink-950/80 border border-pink-500/50 text-pink-300 font-hud text-[10px] font-bold cursor-pointer hover:bg-pink-600 hover:text-white transition-all flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>USE PHONE [P]</span>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-950/60 border border-emerald-500 rounded text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <div className="font-vice text-3xl text-emerald-300">TRANSMISSION RECEIVED!</div>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                Your dispatch brief has been queued into Bolnidi Manikanta's secure database. A prompt
                response will be initiated.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-hud text-neutral-400 block">CALLSIGN / NAME</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Lead Recruiter / Alex"
                    className="w-full bg-neutral-900 border border-white/20 focus:border-pink-500 rounded px-3 py-2 text-xs font-hud text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-hud text-neutral-400 block">RETURN FREQUENCY / EMAIL</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full bg-neutral-900 border border-white/20 focus:border-pink-500 rounded px-3 py-2 text-xs font-hud text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-hud text-neutral-400 block">CONTRACT / MISSION BRIEF</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your engineering requirements, project stack, or full-time opportunity..."
                  className="w-full bg-neutral-900 border border-white/20 focus:border-pink-500 rounded px-3 py-2 text-xs text-white outline-none resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-pink-400 shadow-[0_0_20px_rgba(236,0,140,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>BROADCAST DISPATCH TO BOLNIDI</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Contact Cards & Resume (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="font-hud text-xs font-bold text-cyan-400 tracking-wider">
              OFFICIAL FREQUENCIES:
            </div>

            {/* Email Box */}
            <a
              href={`mailto:${profile.socialLinks.email}`}
              className="p-3.5 rounded bg-black/70 border border-pink-500/30 hover:border-pink-400 flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-pink-950 flex items-center justify-center text-pink-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-hud text-xs font-bold text-white group-hover:text-pink-300">
                    EMAIL INBOX
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate max-w-[200px]">
                    {profile.socialLinks.email}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-pink-400" />
            </a>

            {/* LinkedIn Box */}
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded bg-black/70 border border-blue-500/30 hover:border-blue-400 flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-blue-950 flex items-center justify-center text-blue-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-hud text-xs font-bold text-white group-hover:text-blue-300">
                    LINKEDIN NETWORK
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    /in/bolnidi-manikanta
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-blue-400" />
            </a>

            {/* GitHub Box */}
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded bg-black/70 border border-white/15 hover:border-white/40 flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-neutral-800 flex items-center justify-center text-white">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-hud text-xs font-bold text-white group-hover:text-neutral-200">
                    GITHUB REPOSITORIES
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    @BolnidiManikanta
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white" />
            </a>
          </div>

          {/* Download Official Resume Dossier */}
          <div className="bg-black/80 border-2 border-emerald-500/60 p-4 rounded space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-hud text-xs font-bold">
              <FileText className="w-4 h-4" />
              <span>PLAYER RESUME DOSSIER</span>
            </div>
            <div className="text-[11px] text-neutral-300">
              Download complete PDF dossier including enterprise experience, computer vision research,
              and security credentials.
            </div>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => gtaAudio.playSelect()}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-hud font-bold text-xs tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      </div>

      {/* District Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('career_district');
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
        >
          &larr; RETURN TO CAREER DISTRICT
        </button>

        <button
          onClick={() => {
            gtaAudio.playSelect();
            gtaAudio.playCameraSwoosh();
            onSelectDistrict('player_hq');
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-pink-400 shadow-[0_0_15px_rgba(236,0,140,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>DEPLOY CAMERA BACK TO PLAYER HQ</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
