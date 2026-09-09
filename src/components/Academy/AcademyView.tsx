import React from 'react';
import { SectionId } from '../../types';
import { educationData } from '../../data/portfolioData';
import { gtaAudio } from '../../utils/audio';
import { ArrowLeft, GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';

interface AcademyViewProps {
  onSelectSection: (section: SectionId) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({ onSelectSection }) => {
  return (
    <div className="relative w-full min-h-screen pt-20 pb-16 px-4 sm:px-8 md:px-14 lg:px-20 flex flex-col justify-start">
      {/* Background layer: University campus in golden hour (matching video 00:30) */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&auto=format&fit=crop&q=80"
          alt="Academy Campus"
          className="w-full h-full object-cover filter contrast-110 brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-purple-950/40" />
      </div>

      {/* Header: ACADEMY + Cursive Education */}
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
              INSTITUTIONAL DOSSIER
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="font-gta text-6xl sm:text-7xl md:text-8xl text-white tracking-wider leading-none">
              ACADEMY
            </h1>
            <span className="font-script text-3xl sm:text-4xl text-[#ec008c] -rotate-3 glow-pink">
              Education
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 font-hud text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/50 px-3 py-2">
          DEGREE STATUS: <span className="font-bold">{educationData.gpaOrScore}</span>
        </div>
      </div>

      {/* Academic Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto w-full">
        {/* Left Column: Degree & Academic Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-black/80 backdrop-blur-md border-l-4 border-pink-500 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-2 font-hud text-xs text-pink-400 tracking-widest">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              <span>UNDERGRADUATE STUDIES</span>
            </div>

            <h2 className="font-gta text-4xl sm:text-5xl text-white tracking-wider mb-1">
              {educationData.degree}
            </h2>
            <div className="font-hud text-base text-cyan-400 font-bold mb-4">
              {educationData.institution}
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-hud text-white/70 mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-white/40 block">TIMELINE:</span>
                <span className="text-white">{educationData.period}</span>
              </div>
              <div>
                <span className="text-white/40 block">LOCATION:</span>
                <span className="text-white">{educationData.location}</span>
              </div>
              <div>
                <span className="text-white/40 block">HONORS:</span>
                <span className="text-emerald-400 font-bold">{educationData.gpaOrScore}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <span className="font-hud text-xs text-pink-400 tracking-widest block uppercase">
                ACADEMIC MILESTONES & LEADERSHIP:
              </span>
              <ul className="space-y-2.5 text-neutral-200 text-sm sm:text-base">
                {educationData.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Relevant Coursework & Focus Areas */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-pink-500/30 pb-2">
              <BookOpen className="w-4 h-4 text-pink-400" />
              <span className="font-hud text-xs text-pink-400 tracking-widest uppercase">
                CURRICULUM ARSENAL
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {educationData.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 p-3 font-hud text-xs text-white/90 flex items-center justify-between hover:border-pink-500/60 transition-colors"
                >
                  <span className="font-semibold">{course}</span>
                  <span className="text-emerald-400 text-[10px] uppercase font-bold">
                    PASSED
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-pink-950/40 border border-pink-500/40 text-xs font-hud text-pink-200">
              <span className="font-bold block mb-1">MISSION CLEARANCE:</span>
              Demonstrated mastery across low-level operating system architectures, high-level artificial intelligence models, and enterprise software engineering.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
