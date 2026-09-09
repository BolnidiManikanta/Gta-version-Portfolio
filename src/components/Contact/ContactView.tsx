import React, { useState } from 'react';
import { SectionId, ProfileData } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, Send, Github, Linkedin, Mail, Radio, CheckCircle, Terminal } from 'lucide-react';

interface ContactViewProps {
  profile: ProfileData;
  onSelectSection: (section: SectionId) => void;
  customHeroPhoto?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  profile,
  onSelectSection,
  customHeroPhoto,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gtaAudio.playMissionPassed();
    setSubmitted(true);
  };

  const photoSrc =
    customHeroPhoto ||
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&auto=format&fit=crop&q=80';

  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background layer with night neon city */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&auto=format&fit=crop&q=80"
          alt="Night Cyber City"
          className="w-full h-full object-cover filter contrast-125 brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-purple-950/40" />
      </div>

      {/* Header: CONTACT + Cursive Get in Touch */}
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
              ENCRYPTED FREQUENCY // CHANNEL 007
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              CONTACT
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Get in Touch
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 font-hud text-xs text-white/70 bg-black/60 border border-white/20 px-3 py-2">
          SIGNAL STRENGTH: <span className="text-emerald-400 font-bold">100% MAXIMUM</span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto w-full">
        {/* Left Column: Mission Transmission Form */}
        <div className="lg:col-span-7">
          <div className="bg-black/85 backdrop-blur-md border-2 border-pink-500/60 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-pink-500/30 pb-2">
              <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
              <span className="font-hud text-xs text-pink-400 tracking-widest uppercase">
                TRANSMIT SECURE DISPATCH
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-gta text-4xl text-white tracking-wider">
                  TRANSMISSION DISPATCHED!
                </h3>
                <p className="font-hud text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                  Your message has been encrypted and relayed directly to Bolnidi Manikanta. Expected response window: &lt; 24 Hours.
                </p>
                <button
                  onClick={() => {
                    gtaAudio.playSelect();
                    setSubmitted(false);
                  }}
                  className="mt-4 bg-[#ec008c] text-white px-6 py-2 font-gta text-xl tracking-wider cursor-pointer"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-hud text-[11px] text-pink-400 tracking-widest block uppercase mb-1">
                      CALL SIGN / YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commander Smith"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/20 focus:border-pink-500 p-3 text-white font-hud text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-hud text-[11px] text-pink-400 tracking-widest block uppercase mb-1">
                      FREQUENCY / EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. agent@agency.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/20 focus:border-pink-500 p-3 text-white font-hud text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-hud text-[11px] text-pink-400 tracking-widest block uppercase mb-1">
                    MISSION OBJECTIVE / SUBJECT
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Stack Engineering Role / Project Collaboration"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/20 focus:border-pink-500 p-3 text-white font-hud text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-hud text-[11px] text-pink-400 tracking-widest block uppercase mb-1">
                    ENCRYPTED MESSAGE / INTEL *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter project specifications, technical requirements, or inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/20 focus:border-pink-500 p-3 text-white font-hud text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ec008c] hover:bg-[#ff007f] text-white py-3.5 font-gta text-3xl tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(236,0,140,0.6)] transition-all hover:scale-[1.01]"
                >
                  <Send className="w-5 h-5" />
                  <span>TRANSMIT MESSAGE NOW</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Satellite Coordinates & Social Links */}
        <div className="lg:col-span-5 space-y-5">
          {/* Direct Channels Box */}
          <div className="bg-black/85 backdrop-blur-md border border-white/10 p-6">
            <span className="font-hud text-xs text-pink-400 tracking-widest block uppercase mb-4 border-b border-pink-500/30 pb-2">
              DIRECT SATELLITE CHANNELS
            </span>

            <div className="space-y-3">
              {/* GitHub */}
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => gtaAudio.playSelect()}
                className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-white group-hover:text-pink-400 transition-colors" />
                  <div>
                    <span className="font-gta text-2xl text-white tracking-wider block leading-none">
                      GITHUB
                    </span>
                    <span className="font-hud text-[11px] text-white/50">
                      BolnidiManikanta
                    </span>
                  </div>
                </div>
                <span className="font-hud text-xs text-pink-400 group-hover:translate-x-1 transition-transform">
                  EXPLORE REPOS ▶
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => gtaAudio.playSelect()}
                className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-cyan-400 transition-colors" />
                  <div>
                    <span className="font-gta text-2xl text-white tracking-wider block leading-none">
                      LINKEDIN
                    </span>
                    <span className="font-hud text-[11px] text-white/50">
                      bolnidi-manikanta
                    </span>
                  </div>
                </div>
                <span className="font-hud text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
                  CONNECT ▶
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.socialLinks.email}`}
                onClick={() => gtaAudio.playSelect()}
                className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 transition-colors" />
                  <div>
                    <span className="font-gta text-2xl text-white tracking-wider block leading-none">
                      DIRECT EMAIL
                    </span>
                    <span className="font-hud text-[11px] text-white/50">
                      {profile.socialLinks.email}
                    </span>
                  </div>
                </div>
                <span className="font-hud text-xs text-amber-400 group-hover:translate-x-1 transition-transform">
                  SEND MAIL ▶
                </span>
              </a>
            </div>
          </div>

          {/* Operator Status Card */}
          <div className="bg-black/80 border-2 border-pink-500/50 p-4 flex items-center gap-4">
            <div className="relative w-20 h-20 overflow-hidden border border-white/20 flex-shrink-0">
              <img
                src={photoSrc}
                alt="Manikanta"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="font-hud">
              <div className="text-xs text-pink-400 font-bold tracking-wider">
                BOLNIDI MANIKANTA
              </div>
              <div className="text-[11px] text-white/60">
                AVAILABLE FOR FULL-TIME ROLES & HIGH-IMPACT PROJECTS
              </div>
              <div className="mt-1 text-emerald-400 text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                STATUS: READY FOR INTERVIEW
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
