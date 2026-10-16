import React, { useState } from 'react';
import { VerifiedSkill, SKILLS_CATEGORIES } from '../../data/skillsCatalog';
import { getSkillIcon } from './SkillIcons';
import { gtaAudio } from '../../utils/audio';
import {
  Brain,
  ShieldCheck,
  Layers,
  Terminal,
  Sparkles,
  Lock,
  Network,
  Cpu,
  Database,
  Server,
  Binary,
  Shield,
  Radio,
  Eye,
  Activity,
} from 'lucide-react';

interface SkillFourDirectionHUDProps {
  selectedSkill: VerifiedSkill;
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectSkill: (skill: VerifiedSkill) => void;
  reducedMotion?: boolean;
}

export const SkillFourDirectionHUD: React.FC<SkillFourDirectionHUDProps> = ({
  selectedSkill,
  activeCategoryId,
  onSelectCategory,
  onSelectSkill,
  reducedMotion = false,
}) => {
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  // Helper to find a verified skill across the catalog
  const findSkill = (catId: string, searchKey: string): VerifiedSkill | null => {
    const key = searchKey.toLowerCase().trim();
    // 1. Search within target category first (exact match first)
    const cat = SKILLS_CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      const exact = cat.skills.find(
        (s) => s.name.toLowerCase() === key || s.id.toLowerCase() === key
      );
      if (exact) return exact;
      const contains = cat.skills.find((s) => s.name.toLowerCase().includes(key));
      if (contains) return contains;
    }
    // 2. Search globally across all categories (exact match first)
    for (const c of SKILLS_CATEGORIES) {
      const exact = c.skills.find(
        (s) => s.name.toLowerCase() === key || s.id.toLowerCase() === key
      );
      if (exact) return exact;
    }
    for (const c of SKILLS_CATEGORIES) {
      const contains = c.skills.find((s) => s.name.toLowerCase().includes(key));
      if (contains) return contains;
    }
    return cat ? cat.skills[0] : null;
  };

  // 1. TOP: AI / ML Module Skills (Exact 6 skills from user prompt)
  const aimlSkills = [
    { name: 'Machine Learning', short: 'ML', search: 'Machine Learning', icon: <Brain className="w-4 h-4" /> },
    { name: 'Deep Learning', short: 'DL', search: 'Deep Learning', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Computer Vision', short: 'VISION', search: 'Computer Vision', icon: <Eye className="w-4 h-4" /> },
    { name: 'NLP', short: 'NLP', search: 'Natural Language', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Model Evaluation', short: 'EVAL', search: 'Model Experimentation', icon: <Activity className="w-4 h-4" /> },
    { name: 'AI Systems', short: 'SYSTEMS', search: 'AI/ML Systems', icon: <Network className="w-4 h-4" /> },
  ];

  // 2. LEFT: CYBERSECURITY Module Skills (Exact 6 skills from user prompt)
  const cyberSkills = [
    { name: 'Web Security', short: 'WEB SEC', search: 'Web Security', icon: <Shield className="w-4 h-4" /> },
    { name: 'Penetration Testing', short: 'PEN-TEST', search: 'Penetration Testing', icon: <Radio className="w-4 h-4" /> },
    { name: 'Threat Analysis', short: 'THREAT', search: 'Threat Analysis', icon: <Activity className="w-4 h-4" /> },
    { name: 'Digital Forensics', short: 'FORENSICS', search: 'Digital Forensics', icon: <Lock className="w-4 h-4" /> },
    { name: 'Email Security', short: 'EMAIL', search: 'Email Security', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Cryptography', short: 'CRYPTO', search: 'Applied Cryptography', icon: <Binary className="w-4 h-4" /> },
  ];

  // 3. RIGHT: FULL-STACK Module Skills (Exact 6 skills from user prompt with layered architecture)
  const fullstackSkills = [
    { name: 'React', tier: 'UI LAYER', search: 'React', icon: getSkillIcon('React', 'FULL-STACK', 'w-4 h-4') },
    { name: 'Node.js', tier: 'RUNTIME', search: 'Node.js', icon: getSkillIcon('Node.js & Express', 'FULL-STACK', 'w-4 h-4') },
    { name: 'TypeScript', tier: 'TYPE SYSTEM', search: 'TypeScript', icon: getSkillIcon('TypeScript', 'PROGRAMMING', 'w-4 h-4') },
    { name: 'REST APIs', tier: 'API LAYER', search: 'REST APIs', icon: <Network className="w-4 h-4 text-cyan-400" /> },
    { name: 'Firebase', tier: 'SERVICES', search: 'Firebase', icon: getSkillIcon('Firebase', 'FULL-STACK', 'w-4 h-4') },
    { name: 'Tailwind CSS', tier: 'DESIGN SYSTEM', search: 'Frontend Development', icon: <Layers className="w-4 h-4 text-teal-400" /> },
  ];

  // 4. BOTTOM: PROGRAMMING Module Skills (Exact 7 skills from user prompt with official logos)
  const programmingSkills = [
    { name: 'Python', search: 'Python' },
    { name: 'Java', search: 'Java' },
    { name: 'JavaScript', search: 'JavaScript' },
    { name: 'TypeScript', search: 'TypeScript' },
    { name: 'C / C++', search: 'C / C++' },
    { name: 'Bash', search: 'Bash' },
    { name: 'SQL', search: 'SQL' },
  ];

  const isAiActive = activeCategoryId === 'ai-ml';
  const isCyberActive = activeCategoryId === 'cybersecurity';
  const isFullStackActive = activeCategoryId === 'fullstack';
  const isProgActive = activeCategoryId === 'programming';
  const isAllActive = activeCategoryId === 'all';

  // Hexagon CSS clip path
  const hexClip = {
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* =========================================================================
          1. TOP: AI / ML HOLOGRAPHIC NEURAL SYSTEM
          Position: Directly above developer's head
          Structure: Large curved holographic structure with neural connections
          ========================================================================= */}
      <div
        className="absolute top-0 sm:top-2 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-700 z-30"
        style={{
          transform: `translate3d(-50%, 0, ${isAiActive ? 90 : 30}px) scale(${isAiActive ? 1.04 : isAllActive ? 1 : 0.92})`,
          opacity: isAllActive || isAiActive ? 1 : 0.45,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          onClick={() => {
            gtaAudio.playSelect();
            onSelectCategory('ai-ml');
          }}
          className={`cursor-pointer group flex flex-col items-center px-4 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-500 border ${
            isAiActive
              ? 'bg-neutral-950/95 border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.5)]'
              : 'bg-black/90 border-white/20 hover:border-purple-400/80 hover:bg-neutral-950/95 shadow-xl'
          }`}
        >
          {/* Header Title & Subtitle */}
          <div className="flex flex-col items-center text-center mb-2">
            <div className="flex items-center gap-2">
              <Brain
                className={`w-4 h-4 transition-colors ${
                  isAiActive ? 'text-purple-400 animate-pulse' : 'text-purple-300'
                }`}
              />
              <h3 className="font-vice text-lg sm:text-xl tracking-wider text-white group-hover:text-purple-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                AI / ML
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-hud font-bold tracking-[0.2em] text-amber-400 uppercase">
              INTELLIGENCE FOR A BRIGHTER TOMORROW
            </span>
          </div>

          {/* Holographic Neural Conduit Line */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-2" />

          {/* 6 Embedded Hexagonal Technology Nodes */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {aimlSkills.map((item, idx) => {
              const matched = findSkill('ai-ml', item.search);
              const isSelected = matched && selectedSkill.id === matched.id;
              const isHovered = hoveredSkillName === item.name;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center group/node"
                  onMouseEnter={() => setHoveredSkillName(item.name)}
                  onMouseLeave={() => setHoveredSkillName(null)}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      gtaAudio.playSelect();
                      onSelectCategory('ai-ml');
                      if (matched) onSelectSkill(matched);
                    }}
                    className={`relative w-11 h-12 sm:w-12 sm:h-13 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'scale-110 -translate-y-1 shadow-[0_0_20px_#A855F7]'
                        : isHovered
                        ? 'scale-108 -translate-y-0.5'
                        : 'hover:scale-105'
                    }`}
                  >
                    {/* Hexagon Outer Rim */}
                    <div
                      style={hexClip}
                      className={`absolute inset-0 transition-colors duration-300 ${
                        isSelected
                          ? 'bg-purple-400'
                          : isAiActive
                          ? 'bg-purple-500/60 group-hover/node:bg-purple-400'
                          : 'bg-white/20 group-hover/node:bg-purple-400/70'
                      }`}
                    />

                    {/* Hexagon Facet Center */}
                    <div
                      style={hexClip}
                      className={`absolute inset-[1.5px] flex items-center justify-center transition-colors duration-300 ${
                        isSelected
                          ? 'bg-purple-950 text-white'
                          : 'bg-neutral-950/95 text-purple-200 group-hover/node:text-white'
                      }`}
                    >
                      {item.icon}
                    </div>
                  </button>

                  {/* Clean Technology Label Below */}
                  <span
                    className={`mt-1 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase truncate max-w-[68px] text-center transition-colors ${
                      isSelected
                        ? 'text-purple-300 font-extrabold drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]'
                        : 'text-neutral-300 group-hover/node:text-white'
                    }`}
                  >
                    {item.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. LEFT: CYBERSECURITY HOLOGRAPHIC DEFENSE SYSTEM
          Position: Left of developer
          Structure: Unified cyber defense module with threat radar & shield nodes
          ========================================================================= */}
      <div
        className="absolute top-1/2 -left-2 sm:left-1 -translate-y-1/2 pointer-events-auto transition-all duration-700 z-20 w-[190px] sm:w-[215px]"
        style={{
          transform: `translate3d(0, -50%, ${isCyberActive ? 90 : 25}px) scale(${isCyberActive ? 1.04 : isAllActive ? 1 : 0.92})`,
          opacity: isAllActive || isCyberActive ? 1 : 0.45,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          onClick={() => {
            gtaAudio.playSelect();
            onSelectCategory('cybersecurity');
          }}
          className={`cursor-pointer group flex flex-col p-3 rounded-2xl backdrop-blur-md transition-all duration-500 border ${
            isCyberActive
              ? 'bg-neutral-950/95 border-rose-500 shadow-[0_0_35px_rgba(244,63,94,0.45)]'
              : 'bg-black/90 border-white/20 hover:border-rose-400/80 hover:bg-neutral-950/95 shadow-xl'
          }`}
        >
          {/* Header Title & Subtitle */}
          <div className="flex flex-col border-b border-white/15 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className={`w-4 h-4 transition-colors ${
                  isCyberActive ? 'text-rose-400 animate-pulse' : 'text-rose-300'
                }`}
              />
              <h3 className="font-vice text-base sm:text-lg tracking-wider text-white group-hover:text-rose-300">
                CYBERSECURITY
              </h3>
            </div>
            <span className="text-[8px] sm:text-[9px] font-hud font-bold tracking-[0.15em] text-cyan-300 uppercase mt-0.5">
              SECURE SYSTEMS • SAFER TOMORROW
            </span>
          </div>

          {/* 6 Integrated Hexagonal Nodes */}
          <div className="flex flex-col gap-1.5">
            {cyberSkills.map((item, idx) => {
              const matched = findSkill('cybersecurity', item.search);
              const isSelected = matched && selectedSkill.id === matched.id;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    gtaAudio.playSelect();
                    onSelectCategory('cybersecurity');
                    if (matched) onSelectSkill(matched);
                  }}
                  className={`group/btn w-full px-2 py-1.5 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-rose-950/80 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-102'
                      : 'bg-white/[0.03] border-white/10 hover:border-rose-400/60 hover:bg-neutral-900/90 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Hexagonal Mini Badge */}
                    <div
                      style={hexClip}
                      className={`w-7 h-7 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-neutral-800 text-cyan-300 group-hover/btn:bg-rose-900'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wide truncate">
                      {item.name}
                    </span>
                  </div>

                  <span className="font-mono text-[8px] text-cyan-400 font-bold shrink-0 ml-1">
                    [0{idx + 1}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. RIGHT: FULL-STACK APPLICATION ENGINE
          Position: Right of developer
          Structure: Futuristic tiered application engine (UI ↓ API ↓ Backend ↓ Services)
          ========================================================================= */}
      <div
        className="absolute top-1/2 -right-2 sm:right-1 -translate-y-1/2 pointer-events-auto transition-all duration-700 z-20 w-[190px] sm:w-[215px]"
        style={{
          transform: `translate3d(0, -50%, ${isFullStackActive ? 90 : 25}px) scale(${isFullStackActive ? 1.04 : isAllActive ? 1 : 0.92})`,
          opacity: isAllActive || isFullStackActive ? 1 : 0.45,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          onClick={() => {
            gtaAudio.playSelect();
            onSelectCategory('fullstack');
          }}
          className={`cursor-pointer group flex flex-col p-3 rounded-2xl backdrop-blur-md transition-all duration-500 border ${
            isFullStackActive
              ? 'bg-neutral-950/95 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.45)]'
              : 'bg-black/90 border-white/20 hover:border-cyan-400/80 hover:bg-neutral-950/95 shadow-xl'
          }`}
        >
          {/* Header Title & Subtitle */}
          <div className="flex flex-col border-b border-white/15 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <Layers
                className={`w-4 h-4 transition-colors ${
                  isFullStackActive ? 'text-cyan-400 animate-pulse' : 'text-cyan-300'
                }`}
              />
              <h3 className="font-vice text-base sm:text-lg tracking-wider text-white group-hover:text-cyan-300">
                FULL-STACK
              </h3>
            </div>
            <span className="text-[8px] sm:text-[9px] font-hud font-bold tracking-[0.15em] text-amber-300 uppercase mt-0.5">
              IDEAS TO APPLICATIONS
            </span>
          </div>

          {/* Tiered Application Architecture Flow */}
          <div className="flex flex-col gap-1.5">
            {fullstackSkills.map((item, idx) => {
              const matched = findSkill('fullstack', item.search);
              const isSelected = matched && selectedSkill.id === matched.id;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    gtaAudio.playSelect();
                    onSelectCategory('fullstack');
                    if (matched) onSelectSkill(matched);
                  }}
                  className={`group/btn w-full px-2 py-1.5 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-102'
                      : 'bg-white/[0.03] border-white/10 hover:border-cyan-400/60 hover:bg-neutral-900/90 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Hexagonal Mini Badge */}
                    <div
                      style={hexClip}
                      className={`w-7 h-7 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-neutral-800 text-cyan-300 group-hover/btn:bg-cyan-900'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wide truncate">
                      {item.name}
                    </span>
                  </div>

                  <span className="font-mono text-[8px] text-amber-300 font-bold shrink-0 ml-1">
                    {item.tier}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM: PROGRAMMING LANGUAGES MODULE
          Position: Lower Center, framing workstation perimeter
          Structure: Curved holographic console surrounding the lower workstation
          ========================================================================= */}
      <div
        className="absolute bottom-0 sm:bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-700 z-30"
        style={{
          transform: `translate3d(-50%, 0, ${isProgActive ? 90 : 30}px) scale(${isProgActive ? 1.04 : isAllActive ? 1 : 0.92})`,
          opacity: isAllActive || isProgActive ? 1 : 0.45,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          onClick={() => {
            gtaAudio.playSelect();
            onSelectCategory('programming');
          }}
          className={`cursor-pointer group flex flex-col items-center px-4 py-2.5 rounded-2xl backdrop-blur-md transition-all duration-500 border ${
            isProgActive
              ? 'bg-neutral-950/95 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)]'
              : 'bg-black/90 border-white/20 hover:border-amber-400/80 hover:bg-neutral-950/95 shadow-xl'
          }`}
        >
          {/* Header Title & Subtitle */}
          <div className="flex flex-col items-center text-center mb-2">
            <div className="flex items-center gap-2">
              <Terminal
                className={`w-4 h-4 transition-colors ${
                  isProgActive ? 'text-amber-400 animate-pulse' : 'text-amber-300'
                }`}
              />
              <h3 className="font-vice text-lg sm:text-xl tracking-wider text-white group-hover:text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                PROGRAMMING
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-hud font-bold tracking-[0.2em] text-amber-400 uppercase">
              LANGUAGES THAT CREATE POSSIBILITIES
            </span>
          </div>

          {/* Curved Console Conduit Line */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-2" />

          {/* 7 Hexagonal Language Nodes with Official Recognizable Logos */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {programmingSkills.map((item, idx) => {
              const matched = findSkill('programming', item.search);
              const isSelected = matched && selectedSkill.id === matched.id;
              const isHovered = hoveredSkillName === item.name;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center group/node"
                  onMouseEnter={() => setHoveredSkillName(item.name)}
                  onMouseLeave={() => setHoveredSkillName(null)}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      gtaAudio.playSelect();
                      onSelectCategory('programming');
                      if (matched) onSelectSkill(matched);
                    }}
                    className={`relative w-11 h-12 sm:w-12 sm:h-13 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'scale-110 -translate-y-1 shadow-[0_0_20px_#F59E0B]'
                        : isHovered
                        ? 'scale-108 -translate-y-0.5'
                        : 'hover:scale-105'
                    }`}
                  >
                    {/* Hexagon Outer Rim */}
                    <div
                      style={hexClip}
                      className={`absolute inset-0 transition-colors duration-300 ${
                        isSelected
                          ? 'bg-amber-400'
                          : isProgActive
                          ? 'bg-amber-500/60 group-hover/node:bg-amber-400'
                          : 'bg-white/20 group-hover/node:bg-amber-400/70'
                      }`}
                    />

                    {/* Hexagon Facet Center */}
                    <div
                      style={hexClip}
                      className={`absolute inset-[1.5px] flex items-center justify-center transition-colors duration-300 ${
                        isSelected
                          ? 'bg-amber-950 text-white'
                          : 'bg-neutral-950/95 text-amber-200 group-hover/node:text-white'
                      }`}
                    >
                      {getSkillIcon(item.name, 'PROGRAMMING', 'w-4 h-4')}
                    </div>
                  </button>

                  {/* Clean Technology Label Below */}
                  <span
                    className={`mt-1 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase truncate max-w-[68px] text-center transition-colors ${
                      isSelected
                        ? 'text-amber-300 font-extrabold drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]'
                        : 'text-neutral-300 group-hover/node:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
