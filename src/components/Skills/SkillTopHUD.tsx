import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Home,
  User,
  Milestone,
  Briefcase,
  Terminal,
  FlaskConical,
  Award,
  Wrench,
  SearchCode,
  Mail,
} from 'lucide-react';
import { gtaAudio } from '../../utils/audio';

interface SkillTopHUDProps {
  onBack?: () => void;
  onNavigate?: (route: string) => void;
  onGoHome?: () => void;
}

export const SkillTopHUD: React.FC<SkillTopHUDProps> = ({
  onBack,
  onNavigate,
  onGoHome,
}) => {
  // Real-time clock and dynamic date formatted to user's requested style
  const [currentDateTime, setCurrentDateTime] = useState({
    dateStr: 'MON, 28 SEP 2026',
    timeStr: '09:56:00 AM',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ];
      const dayName = days[now.getDay()];
      const dayNum = String(now.getDate()).padStart(2, '0');
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();

      const timeFormatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      setCurrentDateTime({
        dateStr: `${dayName}, ${dayNum} ${monthName} ${year}`,
        timeStr: timeFormatted,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (route: string) => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    if (route === '/' && onGoHome) {
      onGoHome();
      return;
    }
    if (onNavigate) {
      onNavigate(route);
      return;
    }
    if (route === '/' && onBack) {
      onBack();
      return;
    }
    try {
      window.history.pushState({}, '', route);
    } catch {
      // ignore
    }
  };

  const handleBack = () => {
    try {
      gtaAudio.playSelect();
    } catch {
      // ignore
    }
    if (onBack) {
      onBack();
      return;
    }
    if (window.history.length > 1) {
      window.history.back();
    } else if (onNavigate) {
      onNavigate('/');
    }
  };

  const NAV_ITEMS = [
    { label: 'HOME', route: '/', icon: <Home className="w-3 h-3" /> },
    { label: 'ABOUT', route: '/about', icon: <User className="w-3 h-3" /> },
    { label: 'JOURNEY', route: '/journey', icon: <Milestone className="w-3 h-3" /> },
    { label: 'PROJECTS', route: '/projects', icon: <Briefcase className="w-3 h-3" /> },
    { label: 'SKILLS', route: '/skills', icon: <Terminal className="w-3 h-3" />, active: true },
    { label: 'RESEARCH', route: '/research', icon: <FlaskConical className="w-3 h-3" /> },
    { label: 'ACHIEVEMENTS', route: '/achievements', icon: <Award className="w-3 h-3" /> },
    { label: 'SERVICES', route: '/services', icon: <Wrench className="w-3 h-3" /> },
    { label: 'RECRUITER', route: '/recruiter', icon: <SearchCode className="w-3 h-3" /> },
    { label: 'CONTACT', route: '/contact', icon: <Mail className="w-3 h-3" /> },
  ];

  return (
    <header className="relative w-full z-20 flex flex-col gap-2.5 py-1 select-none">
      {/* Top Banner Row */}
      <div className="w-full flex items-center justify-between gap-4">
        {/* =========================================================================
            SECTION 3: TOP-LEFT - BM Logo & Identity (Clickable to Home)
            ========================================================================= */}
        <div
          onClick={() => handleNav('/')}
          className="flex items-center gap-3.5 min-w-[220px] cursor-pointer group"
          title="Return to Home Portfolio"
        >
          {/* BM Monogram Logo */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#051530] to-[#020716] border border-cyan-400/50 shadow-[0_0_16px_rgba(6,182,212,0.3)] flex items-center justify-center font-mono font-black text-cyan-200 tracking-tighter text-sm group-hover:border-cyan-300 group-hover:shadow-[0_0_22px_rgba(6,182,212,0.5)] transition-all">
              BM
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
            </div>
          </div>

          {/* Name and Subtitle */}
          <div className="flex flex-col">
            <h2 className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-cyan-100 uppercase group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              BOLNIDI MANIKANTA
            </h2>
            <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
              BUILD <span className="text-cyan-500">|</span> LEARN{' '}
              <span className="text-cyan-500">|</span> SOLVE{' '}
              <span className="text-cyan-500">|</span> GROW
            </span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: TOP-CENTER - SKILLS Title
            ========================================================================= */}
        <div className="relative flex flex-col items-center justify-center text-center">
          {/* Thin Futuristic Orbital Ring Behind Title */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-16 pointer-events-none opacity-40">
            <svg
              viewBox="0 0 200 60"
              className="w-full h-full animate-[spin_50s_linear_infinite]"
              style={{ transform: 'rotateX(72deg)' }}
            >
              <ellipse
                cx="100"
                cy="30"
                rx="90"
                ry="25"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
              <circle cx="190" cy="30" r="2.5" fill="#38BDF8" />
              <circle cx="10" cy="30" r="2" fill="#F59E0B" />
            </svg>
          </div>

          <h1 className="relative font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-300 to-sky-100 drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]">
            SKILLS
          </h1>

          <p className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.35em] text-cyan-300/90 mt-1 uppercase flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
            POWERED BY CURIOSITY
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
          </p>
        </div>

        {/* =========================================================================
            SECTION 3: TOP-RIGHT - Real-time Status & Date
            ========================================================================= */}
        <div className="relative rounded-xl backdrop-blur-md bg-[#040a18]/85 border border-cyan-500/25 p-2 px-3 sm:px-4 shadow-[0_0_20px_rgba(6,182,212,0.12)] flex flex-col gap-1 min-w-[200px] overflow-hidden">
          {/* Glowing Scan Animation Line */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scanline_3s_ease-in-out_infinite]" />

          <div className="flex items-center justify-between gap-3 border-b border-cyan-500/15 pb-1">
            <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold tracking-wider">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{currentDateTime.dateStr}</span>
            </div>
            <div className="font-mono text-[11px] sm:text-xs font-black text-cyan-200 tracking-wider">
              {currentDateTime.timeStr}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
              SYSTEM ONLINE
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 font-mono text-[8px] font-bold text-cyan-300 tracking-widest uppercase">
              <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
              FOCUSED MODE
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 11, 12, 13: TOP CYBER HUD ROUTE NAVIGATION BAR
          ========================================================================= */}
      <div className="w-full flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-b border-cyan-500/20 py-1.5 bg-[#020714]/80 backdrop-blur-md px-2 rounded-xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          onMouseEnter={() => {
            try {
              gtaAudio.playHover();
            } catch {}
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] cursor-pointer shrink-0"
          title="Return to previous view [ESC]"
        >
          <ArrowLeft className="w-3 h-3 text-cyan-400" />
          <span>BACK [ESC]</span>
        </button>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto" aria-label="Quick Navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.route}
              type="button"
              onClick={() => handleNav(item.route)}
              onMouseEnter={() => {
                try {
                  gtaAudio.playHover();
                } catch {}
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase transition-all shrink-0 cursor-pointer border ${
                item.active
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.45)]'
                  : 'bg-black/30 border-cyan-500/10 text-slate-400 hover:text-cyan-200 hover:border-cyan-400/50 hover:bg-cyan-950/40'
              }`}
            >
              <span className={item.active ? 'text-cyan-300' : 'text-slate-500'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
