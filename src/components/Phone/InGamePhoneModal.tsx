import React, { useState } from 'react';
import { ProfileData, DistrictId } from '../../types';
import { projectsData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import {
  X,
  Phone,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  Radio,
  Map,
  Shield,
  Send,
  CheckCircle,
  Wifi,
  Battery,
  User,
  ArrowLeft,
  Terminal,
  FolderGit2,
} from 'lucide-react';

interface InGamePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onOpenMap: () => void;
  onSelectDistrict: (district: DistrictId) => void;
  onOpenSkills?: () => void;
  onOpenProjects?: () => void;
  isRadioPlaying: boolean;
  onToggleRadio: () => void;
}

type PhoneApp = 'home' | 'messages' | 'contacts' | 'missions' | 'attributes';

export const InGamePhoneModal: React.FC<InGamePhoneModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenMap,
  onSelectDistrict,
  onOpenSkills,
  onOpenProjects,
  isRadioPlaying,
  onToggleRadio,
}) => {
  const [activeApp, setActiveApp] = useState<PhoneApp>('home');
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgText, setMsgText] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    gtaAudio.playSelect();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setMsgText('');
      setActiveApp('home');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-end p-4 sm:p-8 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Backdrop click barrier */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
        onClick={() => {
          gtaAudio.playPhone();
          onClose();
        }}
      />

      {/* Phone Body Container */}
      <div className="relative pointer-events-auto z-10 w-[340px] sm:w-[360px] h-[640px] bg-neutral-900 border-4 border-pink-500/70 rounded-[44px] shadow-[0_0_50px_rgba(236,0,140,0.6)] flex flex-col overflow-hidden select-none">
        {/* Top Speaker & Camera Notch */}
        <div className="relative pt-3 pb-1 bg-black text-center flex flex-col items-center">
          {/* Status Bar */}
          <div className="w-full px-6 flex items-center justify-between text-[10px] font-hud text-neutral-400">
            <span>09:42 PM</span>
            <div className="w-16 h-3.5 bg-neutral-800 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-cyan-400" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 bg-gradient-to-b from-neutral-950 via-[#110e1e] to-black text-white p-4 flex flex-col overflow-hidden relative">
          {/* App Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            {activeApp !== 'home' ? (
              <button
                onClick={() => {
                  gtaAudio.playHover();
                  setActiveApp('home');
                }}
                className="flex items-center gap-1 text-xs font-hud text-pink-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            ) : (
              <div className="text-xs font-hud font-bold text-pink-400 tracking-wider">
                VICE MOBILE OS v5.2
              </div>
            )}

            <button
              onClick={() => {
                gtaAudio.playPhone();
                onClose();
              }}
              title="Close Phone [P]"
              className="p-1 rounded bg-white/10 hover:bg-pink-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SCREEN: HOME APP GRID */}
          {activeApp === 'home' && (
            <div className="flex-1 flex flex-col justify-between pt-4">
              <div className="text-center space-y-1 my-2">
                <div className="font-vice text-3xl text-pink-500 drop-shadow-[0_0_15px_rgba(236,0,140,0.8)]">
                  MANI PHONE
                </div>
                <div className="text-[11px] font-hud text-neutral-400">
                  CONNECTED • MAZE BANK SPIRE UPLINK
                </div>
              </div>

              {/* 6 App Icons Grid */}
              <div className="grid grid-cols-3 gap-4 my-auto px-2">
                {/* 1. Comms / Dispatch */}
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    setActiveApp('messages');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-hud text-neutral-300 font-bold">DISPATCH</span>
                </button>

                {/* 2. Contacts */}
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    setActiveApp('contacts');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-cyan-600/30 border border-white/10 hover:border-cyan-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-hud text-neutral-300 font-bold">CONTACTS</span>
                </button>

                {/* 3. Missions Log */}
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    setActiveApp('missions');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-hud text-neutral-300 font-bold">MISSIONS</span>
                </button>

                {/* 4. Attributes */}
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    setActiveApp('attributes');
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-amber-600/30 border border-white/10 hover:border-amber-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-hud text-neutral-300 font-bold">STATS</span>
                </button>

                {/* 5. Radio Player */}
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    onToggleRadio();
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500 transition-all cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${
                      isRadioPlaying
                        ? 'bg-pink-600 animate-pulse'
                        : 'bg-gradient-to-tr from-purple-700 to-pink-700'
                    }`}
                  >
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-hud text-neutral-300 font-bold">
                    {isRadioPlaying ? 'RADIO: ON' : 'RADIO: OFF'}
                  </span>
                </button>

                {/* 6. City GPS Map */}
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    onOpenMap();
                    onClose();
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-hud text-neutral-300 font-bold">CITY GPS</span>
                </button>

                {/* 7. Skills Arsenal */}
                {onOpenSkills && (
                  <button
                    onClick={() => {
                      gtaAudio.playSelect();
                      onOpenSkills();
                      onClose();
                    }}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-hud text-neutral-300 font-bold">SKILLS</span>
                  </button>
                )}

                {/* 8. Project Vault */}
                {onOpenProjects && (
                  <button
                    onClick={() => {
                      gtaAudio.playSelect();
                      onOpenProjects();
                      onClose();
                    }}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FolderGit2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-hud text-neutral-300 font-bold">PROJECTS</span>
                  </button>
                )}
              </div>

              {/* Bottom Quick Call Bar */}
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center justify-between text-[11px] font-hud">
                <span className="text-neutral-400">STATUS:</span>
                <span className="text-emerald-400 font-bold">READY FOR CONTRACTS</span>
              </div>
            </div>
          )}

          {/* SCREEN: MESSAGES / DISPATCH FORM */}
          {activeApp === 'messages' && (
            <div className="flex-1 flex flex-col justify-between pt-2 overflow-y-auto">
              <div className="space-y-2">
                <div className="font-hud text-xs font-bold text-pink-400">
                  ENCRYPTED DISPATCH TERMINAL
                </div>
                <div className="text-[11px] text-neutral-400">
                  Direct message uplink to Bolnidi Manikanta.
                </div>

                {isSent ? (
                  <div className="p-4 bg-emerald-950/60 border border-emerald-500 rounded-lg text-center space-y-2 my-6 animate-in zoom-in-95">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div className="font-hud text-xs font-bold text-emerald-300">
                      TRANSMISSION SENT!
                    </div>
                    <div className="text-[10px] text-neutral-300">
                      Dispatched to Bolnidi's secure queue.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2.5 pt-1">
                    <div>
                      <label className="text-[10px] font-hud text-neutral-400 block mb-1">YOUR NAME</label>
                      <input
                        type="text"
                        value={msgName}
                        onChange={(e) => setMsgName(e.target.value)}
                        placeholder="Agent / Recruiter"
                        className="w-full bg-black/60 border border-white/20 rounded px-2.5 py-1.5 text-xs font-hud text-white focus:border-pink-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-hud text-neutral-400 block mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        value={msgEmail}
                        onChange={(e) => setMsgEmail(e.target.value)}
                        placeholder="contact@agency.com"
                        className="w-full bg-black/60 border border-white/20 rounded px-2.5 py-1.5 text-xs font-hud text-white focus:border-pink-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-hud text-neutral-400 block mb-1">MISSION BRIEF</label>
                      <textarea
                        rows={4}
                        required
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                        placeholder="Discussing software roles, AI projects, or security contracts..."
                        className="w-full bg-black/60 border border-white/20 rounded px-2.5 py-1.5 text-xs font-hud text-white focus:border-pink-500 outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white font-hud font-bold text-xs tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>TRANSMIT DISPATCH</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* SCREEN: CONTACTS LIST */}
          {activeApp === 'contacts' && (
            <div className="flex-1 flex flex-col pt-2 overflow-y-auto space-y-3">
              <div className="font-hud text-xs font-bold text-cyan-400">
                DIRECT CONTACT CHANNELS
              </div>

              {/* GitHub */}
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-hud text-xs font-bold text-white group-hover:text-pink-400">
                      GITHUB PROFILE
                    </div>
                    <div className="text-[10px] text-neutral-400">@BolnidiManikanta</div>
                  </div>
                </div>
                <span className="text-[10px] font-hud text-pink-400 font-bold">OPEN &rarr;</span>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-900/60 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-hud text-xs font-bold text-white group-hover:text-cyan-400">
                      LINKEDIN NETWORK
                    </div>
                    <div className="text-[10px] text-neutral-400">/in/bolnidi-manikanta</div>
                  </div>
                </div>
                <span className="text-[10px] font-hud text-cyan-400 font-bold">OPEN &rarr;</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.socialLinks.email}`}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-pink-950/60 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <div className="font-hud text-xs font-bold text-white group-hover:text-pink-400">
                      OFFICIAL EMAIL
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate max-w-[150px]">
                      {profile.socialLinks.email}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-hud text-pink-400 font-bold">SEND &rarr;</span>
              </a>
            </div>
          )}

          {/* SCREEN: MISSIONS APP */}
          {activeApp === 'missions' && (
            <div className="flex-1 flex flex-col pt-2 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-1">
                <span className="font-hud text-xs font-bold text-emerald-400">
                  CLASSIFIED MISSIONS
                </span>
                <span className="text-[10px] font-hud text-neutral-400">
                  {projectsData.length} TOTAL
                </span>
              </div>
              <div className="space-y-1.5 overflow-y-auto max-h-[440px] pr-1">
                {projectsData.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between font-hud">
                      <span className="text-pink-400 font-bold">MISSION #{String(idx + 1).padStart(2, '0')}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        {proj.status}
                      </span>
                    </div>
                    <div className="font-bold text-white text-xs">{proj.title}</div>
                    <div className="text-[10px] text-neutral-400">{proj.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN: PLAYER ATTRIBUTES */}
          {activeApp === 'attributes' && (
            <div className="flex-1 flex flex-col pt-2 overflow-y-auto space-y-3">
              <div className="font-hud text-xs font-bold text-amber-400">
                PLAYER ATTRIBUTES // LVL 24
              </div>
              <div className="space-y-2">
                {[
                  { label: 'CODING POWER', val: profile.stats.coding, col: 'bg-pink-500' },
                  { label: 'AI / COMPUTER VISION', val: profile.stats.aiMl, col: 'bg-cyan-500' },
                  { label: 'CYBER DEFENSE', val: profile.stats.cybersecurity, col: 'bg-emerald-500' },
                  { label: 'FULL STACK SYSTEMS', val: profile.stats.softwareEng, col: 'bg-blue-500' },
                  { label: 'SYSTEM STAMINA', val: profile.stats.stamina, col: 'bg-amber-500' },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1 font-hud text-[10px]">
                    <div className="flex justify-between text-neutral-300">
                      <span>{stat.label}</span>
                      <span className="font-bold text-white">{stat.val}%</span>
                    </div>
                    <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/20">
                      <div className={`h-full ${stat.col} rounded-full`} style={{ width: `${stat.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="py-2.5 bg-black flex justify-center">
          <button
            onClick={() => {
              gtaAudio.playHover();
              setActiveApp('home');
            }}
            className="w-28 h-1 bg-neutral-600 hover:bg-pink-500 rounded-full cursor-pointer transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
