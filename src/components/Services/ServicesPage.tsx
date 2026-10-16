import React, { useState } from 'react';
import { servicesData, SimpleService } from '../../data/servicesData';
import { gtaAudio } from '../../utils/audio';
import {
  ArrowRight,
  Lock,
  Sparkles,
  ShieldCheck,
  Mail,
  FolderGit2,
} from 'lucide-react';

interface ServicesPageProps {
  onBack?: () => void;
  onNavigateContact?: () => void;
  onNavigateProjects?: () => void;
}

type FilterCategory = 'ALL' | 'WEB' | 'MOBILE' | 'AI_AUTOMATION' | 'BUSINESS' | 'STARTUP';

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateContact,
  onNavigateProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('ALL');

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'ALL', label: `ALL SERVICES (${servicesData.length})` },
    { id: 'WEB', label: 'WEBSITES & WEB APPS' },
    { id: 'MOBILE', label: 'MOBILE APPS' },
    { id: 'AI_AUTOMATION', label: 'AI & AUTOMATION' },
    { id: 'BUSINESS', label: 'BUSINESS SOLUTIONS' },
    { id: 'STARTUP', label: 'STARTUPS & NDA' },
  ];

  const filteredServices = servicesData.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.categoryGroup === selectedCategory;
  });

  const handleContactAction = (serviceTitle?: string) => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      const subject = serviceTitle
        ? encodeURIComponent(`Inquiry: ${serviceTitle} - Project Discussion`)
        : encodeURIComponent('Project Inquiry - Bolnidi Manikanta');
      window.location.href = `mailto:massmanikanta70@gmail.com?subject=${subject}`;
    }
  };

  const handleProjectsAction = () => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    if (onNavigateProjects) {
      onNavigateProjects();
    } else {
      window.location.href = '/projects';
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-start p-4 sm:p-8 max-w-7xl mx-auto space-y-12 select-none">
      {/* ========================================================
          SERVICES PAGE HERO
          ======================================================== */}
      <header className="border-b border-pink-500/40 pb-8 space-y-3">
        <div className="flex items-center gap-2 font-hud text-xs text-pink-400 tracking-widest uppercase font-bold">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>SERVICES & SOLUTIONS</span>
        </div>
        <h1 className="font-vice text-5xl sm:text-6xl md:text-7xl text-white tracking-wide uppercase leading-none">
          SERVICES
        </h1>
        <p className="font-hud text-sm sm:text-base text-cyan-300 tracking-wide max-w-3xl">
          Digital solutions built around your ideas, business and requirements.
        </p>
        <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
          I design and build websites, applications and automation solutions for businesses, startups, professionals and individuals.
        </p>
      </header>

      {/* ========================================================
          SERVICE CATEGORY FILTER
          ======================================================== */}
      <nav aria-label="Service categories" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {filterTabs.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                try {
                  gtaAudio.playHover();
                } catch {
                  // ignore
                }
                setSelectedCategory(tab.id);
              }}
              className={`px-4 py-2 text-xs font-hud tracking-wider uppercase whitespace-nowrap rounded-xs border transition-all cursor-pointer ${
                isActive
                  ? 'bg-pink-600 text-white font-black border-pink-400 shadow-[0_0_15px_rgba(236,0,140,0.5)]'
                  : 'bg-black/75 text-neutral-400 border-white/10 hover:border-pink-500/40 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ========================================================
          SERVICE CARDS GRID (3 col desktop, 2 col tablet, 1 col mobile)
          ======================================================== */}
      <section aria-label="Available services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service: SimpleService) => {
          const isConfidential = service.isConfidential;

          return (
            <article
              key={service.id}
              className={`bg-black/85 backdrop-blur-md p-6 rounded-xs shadow-xl transition-all duration-300 flex flex-col justify-between border ${
                isConfidential
                  ? 'border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:border-amber-400'
                  : 'border-white/15 hover:border-pink-500/70 hover:shadow-[0_0_20px_rgba(236,0,140,0.3)]'
              }`}
            >
              {/* Top Details */}
              <div className="space-y-4">
                {/* Number & Optional Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-xs border ${
                      isConfidential
                        ? 'text-amber-400 bg-amber-950/70 border-amber-500/50'
                        : 'text-pink-400 bg-pink-950/60 border-pink-500/40'
                    }`}
                  >
                    {service.number}
                  </span>

                  {service.badge && (
                    <span className="text-[10px] font-hud font-bold px-2 py-0.5 rounded-xs bg-amber-950 border border-amber-400/80 text-amber-300 tracking-wider uppercase flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-400" />
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Name */}
                <h2
                  className={`font-vice text-2xl tracking-wide uppercase leading-tight ${
                    isConfidential ? 'text-amber-200' : 'text-white'
                  }`}
                >
                  {service.title}
                </h2>

                {/* 2-3 sentence simple explanation */}
                <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                  {service.description}
                </p>

                {/* What You Get */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <span className="font-hud text-[11px] text-cyan-300 font-bold uppercase tracking-wider block">
                    WHAT YOU GET
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
                    {service.whatYouGet.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => handleContactAction(service.title)}
                  className={`w-full py-2.5 px-4 rounded-xs font-hud text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isConfidential
                      ? 'bg-amber-600 hover:bg-amber-500 text-black border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-white/10 hover:bg-[#ec008c] hover:text-white text-neutral-200 border border-white/20 hover:border-pink-400 shadow-sm'
                  }`}
                >
                  <span>{service.ctaText || 'INQUIRE ABOUT THIS SERVICE →'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* ========================================================
          HOW WE WORK
          ======================================================== */}
      <section className="bg-black/80 border border-cyan-500/40 p-6 sm:p-8 rounded-xs shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="font-hud text-xs text-cyan-400 tracking-widest uppercase font-bold">
            PROCESS
          </div>
          <h2 className="font-vice text-3xl sm:text-4xl text-white tracking-wide uppercase">
            HOW WE WORK
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-2">
            <div className="font-hud text-xs text-pink-400 font-bold uppercase tracking-wider">
              DISCUSS
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Understand your idea and requirements.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-2">
            <div className="font-hud text-xs text-cyan-400 font-bold uppercase tracking-wider">
              PLAN
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Define the scope and solution.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-2">
            <div className="font-hud text-xs text-pink-400 font-bold uppercase tracking-wider">
              BUILD
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Develop the website, app or automation.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-2">
            <div className="font-hud text-xs text-cyan-400 font-bold uppercase tracking-wider">
              TEST
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Review and refine the result.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-2 sm:col-span-2 lg:col-span-1">
            <div className="font-hud text-xs text-emerald-400 font-bold uppercase tracking-wider">
              DELIVER
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Provide the completed solution.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          ENGINEERING APPROACH
          ======================================================== */}
      <section className="bg-black/80 border border-pink-500/40 p-6 sm:p-8 rounded-xs shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="font-hud text-xs text-pink-400 tracking-widest uppercase font-bold">
            PRINCIPLES
          </div>
          <h2 className="font-vice text-3xl sm:text-4xl text-white tracking-wide uppercase">
            ENGINEERING APPROACH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
            <div className="font-mono text-xs text-cyan-400 font-bold">
              01 — UNDERSTAND
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Understand the idea, users and requirements first.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
            <div className="font-mono text-xs text-pink-400 font-bold">
              02 — PLAN
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Define the scope and the right approach before building.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
            <div className="font-mono text-xs text-cyan-400 font-bold">
              03 — BUILD
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Develop the solution around the actual requirement.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
            <div className="font-mono text-xs text-pink-400 font-bold">
              04 — TEST
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Check functionality, responsiveness and reliability.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
            <div className="font-mono text-xs text-cyan-400 font-bold">
              05 — DELIVER
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Prepare the solution for practical use or deployment.
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
            <div className="font-mono text-xs text-pink-400 font-bold">
              06 — IMPROVE
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Continue improving the product when new requirements arise.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          CONFIDENTIAL STARTUP WORK
          ======================================================== */}
      <section className="bg-gradient-to-r from-amber-950/40 via-black to-amber-950/40 border-2 border-amber-500/70 p-6 sm:p-8 rounded-xs shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 font-hud text-xs text-amber-300 uppercase tracking-widest font-bold">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>CONFIDENTIAL COLLABORATION</span>
          </div>
          <h2 className="font-vice text-3xl sm:text-4xl text-amber-100 tracking-wide uppercase">
            BUILDING SOMETHING PRIVATE?
          </h2>
          <p className="text-sm text-neutral-300 font-sans leading-relaxed">
            Have an unreleased startup idea, application or product?
          </p>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            Confidential discussions and NDA-based collaboration are available upon request.
          </p>
        </div>

        <button
          onClick={() => handleContactAction('Confidential Startup Project')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-hud text-xs sm:text-sm font-bold tracking-wider rounded-xs border border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 shrink-0 cursor-pointer transition-all"
        >
          <Lock className="w-4 h-4 text-black" />
          <span>DISCUSS CONFIDENTIAL PROJECT</span>
        </button>
      </section>

      {/* ========================================================
          FINAL CTA
          ======================================================== */}
      <footer className="bg-black/90 border border-pink-500/50 p-8 sm:p-10 rounded-xs shadow-2xl space-y-5 text-center max-w-3xl mx-auto w-full">
        <h2 className="font-vice text-4xl sm:text-5xl text-white uppercase tracking-wide">
          HAVE AN IDEA?
        </h2>
        <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed">
          Let&apos;s build something useful.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleContactAction()}
            className="px-7 py-3 bg-[#ec008c] hover:bg-[#ff007f] text-white font-hud text-xs sm:text-sm font-bold tracking-wider rounded-xs border border-pink-300 shadow-[0_0_25px_rgba(236,0,140,0.5)] flex items-center gap-2 cursor-pointer transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>DISCUSS YOUR PROJECT →</span>
          </button>

          <button
            onClick={handleProjectsAction}
            className="px-7 py-3 bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white font-hud text-xs sm:text-sm font-bold tracking-wider rounded-xs border border-white/25 flex items-center gap-2 cursor-pointer transition-all"
          >
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>VIEW PROJECTS →</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
