import React from 'react';
import { Trophy, Award, BookOpen, GraduationCap, Shield, Flame, Users, Code, ShieldCheck } from 'lucide-react';

interface BrandLogoProps {
  organization: string;
  title: string;
  category?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  organization = '',
  title = '',
  category = '',
  className = '',
  size = 'md',
}) => {
  const orgLower = organization.toLowerCase();
  const titleLower = title.toLowerCase();

  // Dimensions based on size
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size];

  // 1. IEEE (Hackathon, Conference, Publications)
  if (orgLower.includes('ieee') || titleLower.includes('ieee')) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 140 60"
          className={size === 'lg' ? 'w-28 h-12' : size === 'sm' ? 'w-16 h-7' : 'w-22 h-9'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diamond badge */}
          <polygon
            points="30,6 50,30 30,54 10,30"
            stroke="#38bdf8"
            strokeWidth="2.5"
            fill="rgba(56, 189, 248, 0.15)"
          />
          {/* Internal diamond vectors */}
          <line x1="30" y1="12" x2="30" y2="48" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="16" y1="30" x2="44" y2="30" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="30" cy="30" r="3" fill="#fbbf24" />
          {/* IEEE Text */}
          <text
            x="60"
            y="37"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="26"
            fontWeight="900"
            fill="#ffffff"
            letterSpacing="2"
          >
            IEEE
          </text>
        </svg>
        {size === 'lg' && (
          <span className="font-mono text-[8px] text-cyan-300/80 tracking-widest uppercase mt-0.5">
            Advancing Tech
          </span>
        )}
      </div>
    );
  }

  // 2. CISCO
  if (orgLower.includes('cisco') || titleLower.includes('cisco')) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 110 50"
          className={size === 'lg' ? 'w-26 h-12' : size === 'sm' ? 'w-16 h-7' : 'w-20 h-9'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cisco Wave Bars */}
          <rect x="12" y="16" width="3.5" height="12" rx="1.5" fill="#00bceb" />
          <rect x="22" y="10" width="3.5" height="18" rx="1.5" fill="#00bceb" />
          <rect x="32" y="4" width="3.5" height="24" rx="1.5" fill="#00bceb" />
          <rect x="42" y="10" width="3.5" height="18" rx="1.5" fill="#00bceb" />
          <rect x="52" y="16" width="3.5" height="12" rx="1.5" fill="#00bceb" />
          {/* CISCO Wordmark */}
          <text
            x="64"
            y="26"
            fontFamily="system-ui, sans-serif"
            fontSize="18"
            fontWeight="900"
            fill="#00bceb"
            letterSpacing="2.5"
          >
            CISCO
          </text>
        </svg>
      </div>
    );
  }

  // 3. ORACLE
  if (orgLower.includes('oracle') || titleLower.includes('oracle')) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div
          className={`px-3 py-1 rounded bg-[#c74634]/20 border border-[#c74634]/70 shadow-[0_0_15px_rgba(199,70,52,0.3)] flex items-center justify-center`}
        >
          <span className="font-mono text-sm sm:text-base font-black tracking-widest text-[#f87171]">
            ORACLE
          </span>
        </div>
      </div>
    );
  }

  // 4. MICROSOFT (MLSC / Leadership)
  if (orgLower.includes('microsoft') || titleLower.includes('microsoft')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="grid grid-cols-2 gap-1 w-6 h-6 shrink-0">
          <div className="w-2.5 h-2.5 bg-[#f25022] rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-[#7fba00] rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-[#00a4ef] rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-[#ffb900] rounded-[1px]" />
        </div>
        <span className="font-sans font-bold text-xs sm:text-sm text-neutral-100 tracking-tight">
          Microsoft
        </span>
      </div>
    );
  }

  // 5. ICIRCA CONFERENCE
  if (orgLower.includes('icirca') || titleLower.includes('icirca')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-600 to-blue-400 border border-cyan-300/60 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          <div className="w-2.5 h-2.5 rotate-45 border-2 border-white" />
        </div>
        <span className="font-mono font-black text-xs sm:text-sm text-cyan-200 tracking-wider">
          ICIRCA
        </span>
      </div>
    );
  }

  // 6. TATA GROUP / FORAGE SIMULATION
  if (orgLower.includes('tata') || titleLower.includes('tata')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600 border border-amber-300/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          <Award className="w-4 h-4 text-black" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-black text-xs sm:text-sm text-amber-300 tracking-wide">
            TATA
          </span>
          <span className="text-[8px] font-mono text-neutral-400 -mt-0.5">Top Defender</span>
        </div>
      </div>
    );
  }

  // 7. GEEKSFORGEEKS
  if (orgLower.includes('geeksforgeeks') || titleLower.includes('geeksforgeeks')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
          <span className="font-mono font-black text-xs sm:text-sm text-emerald-400">{`{ }`}</span>
        </div>
        <span className="font-sans font-bold text-xs text-neutral-200 tracking-tight hidden sm:inline">
          GeeksforGeeks
        </span>
      </div>
    );
  }

  // 8. IBM / SKILLSBUILD
  if (orgLower.includes('ibm') || titleLower.includes('ibm')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
          <span className="font-mono font-black text-xs sm:text-sm tracking-widest text-blue-400">
            IBM
          </span>
        </div>
        <span className="font-mono text-[10px] text-blue-300/80 uppercase">SkillsBuild</span>
      </div>
    );
  }

  // 9. CODECHEF
  if (orgLower.includes('codechef') || titleLower.includes('codechef')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
          <Code className="w-4 h-4" />
        </div>
        <span className="font-mono font-bold text-xs sm:text-sm text-neutral-200">CodeChef</span>
      </div>
    );
  }

  // 10. COURSERA
  if (orgLower.includes('coursera') || titleLower.includes('coursera')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.4)]">
          <span className="font-sans font-black text-xs text-blue-400">C</span>
        </div>
        <span className="font-sans font-bold text-xs text-neutral-200">coursera</span>
      </div>
    );
  }

  // 11. JP MORGAN CHASE
  if (orgLower.includes('morgan') || titleLower.includes('jpmorgan') || titleLower.includes('jp morgan')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 rotate-45 border border-cyan-400/70 bg-cyan-950/70 flex items-center justify-center">
          <div className="w-2 h-2 -rotate-45 bg-cyan-300" />
        </div>
        <span className="font-sans font-bold text-xs text-cyan-200">JPMorgan Chase</span>
      </div>
    );
  }

  // 12. DELOITTE
  if (orgLower.includes('deloitte') || titleLower.includes('deloitte')) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <span className="font-sans font-bold text-xs sm:text-sm text-white">Deloitte</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
      </div>
    );
  }

  // 13. UNSTOP
  if (orgLower.includes('unstop') || titleLower.includes('unstop')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-400">
          <Award className="w-3.5 h-3.5" />
        </div>
        <span className="font-sans font-black text-xs text-amber-300">unstop</span>
      </div>
    );
  }

  // Generic/Category Fallbacks with glowing crest icons
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${iconDimensions} rounded-xl bg-amber-950/70 border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)] shrink-0`}
      >
        {category === 'RESEARCH' ? (
          <BookOpen className="w-4 h-4" />
        ) : category === 'HACKATHONS' ? (
          <Trophy className="w-4 h-4" />
        ) : category === 'ACADEMIC' ? (
          <GraduationCap className="w-4 h-4" />
        ) : category === 'SECURITY & CTF' || category === 'CYBERSECURITY' ? (
          <Shield className="w-4 h-4" />
        ) : category === 'LEADERSHIP' ? (
          <Users className="w-4 h-4" />
        ) : (
          <ShieldCheck className="w-4 h-4" />
        )}
      </div>
      <span className="font-hud text-xs text-neutral-300 truncate font-bold">
        {organization || category}
      </span>
    </div>
  );
};
