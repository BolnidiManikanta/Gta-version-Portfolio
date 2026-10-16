import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DistrictId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import { LEADER_PAGE_IMAGE } from '../../config/backgroundTheme';
import {
  HolographicTimelineEntry,
  TimelineMilestone,
} from '../Experience/HolographicTimelineEntry';
import {
  Briefcase,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface CareerDistrictViewProps {
  onSelectDistrict: (district: DistrictId) => void;
}

type TrackKey = 'industry' | 'research' | 'leadership' | 'academy';

export const CareerDistrictView: React.FC<CareerDistrictViewProps> = ({
  onSelectDistrict,
}) => {
  const [activeTrack, setActiveTrack] = useState<TrackKey>('industry');
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);

  const industryMilestones: TimelineMilestone[] = [
    {
      id: 'ind-1',
      yearOrPeriod: 'VERIFIED INTERNSHIP',
      category: 'ENTERPRISE CYBERSECURITY',
      title: 'Cybersecurity Analyst Virtual Intern',
      organization: 'Tata Group (via Forage)',
      description:
        'Conducted enterprise perimeter security analysis, vulnerability assessments, and technical incident remediation blueprints adhering to global compliance benchmarks.',
      keyContribution:
        'Performed email header threat decoding, enterprise vulnerability scans, and defended simulated corporate network perimeters against multi-stage phishing vectors.',
      status: 'VERIFIED DOSSIER',
      statusVariant: 'purple',
      accentColor: 'purple',
    },
    {
      id: 'ind-2',
      yearOrPeriod: 'VERIFIED INTERNSHIP',
      category: 'FINANCIAL SOFTWARE ENGINEERING',
      title: 'Software Engineering Virtual Experience',
      organization: 'JPMorgan Chase & Co. (via Forage)',
      description:
        'Engineered real-time financial market data integration systems and trader analytics visualizers using high-frequency streaming perspectives.',
      keyContribution:
        'Integrated streaming financial feeds, formulated algorithmic price-ratio anomaly detection signals, and verified institutional market data consistency across high-throughput intervals.',
      status: 'VERIFIED DOSSIER',
      statusVariant: 'cyan',
      accentColor: 'cyan',
    },
    {
      id: 'ind-3',
      yearOrPeriod: 'VERIFIED INTERNSHIP',
      category: 'TECHNOLOGY CONSULTING',
      title: 'Technology Consulting Virtual Experience',
      organization: 'Deloitte (via Forage)',
      description:
        'Evaluated enterprise cloud infrastructure modernization strategies and formulated risk migration models aligning legacy systems with business continuity objectives.',
      keyContribution:
        'Synthesized cloud migration roadmaps, audited microservices architecture for bottlenecks, and delivered SLA-aligned transformation blueprints evaluated against enterprise standards.',
      status: 'VERIFIED DOSSIER',
      statusVariant: 'pink',
      accentColor: 'pink',
    },
    {
      id: 'ind-4',
      yearOrPeriod: 'SECURITY ENGAGEMENT',
      category: 'VULNERABILITY RESEARCH',
      title: 'Research Student',
      organization: 'Infoziant Security',
      description:
        'Investigated emerging web threat vectors, client-server security surfaces, and cryptographic defense frameworks against modern attack vectors.',
      keyContribution:
        'Mapped web vulnerability surfaces including SQL injection and XSS, and contributed structured findings toward hardened threat detection architectures.',
      status: 'RESEARCH FELLOW',
      statusVariant: 'purple',
      accentColor: 'purple',
    },
  ];

  const researchMilestones: TimelineMilestone[] = [
    {
      id: 'res-1',
      yearOrPeriod: '2026',
      category: 'IEEE XPLORE PROCEEDINGS',
      title: 'Servify: A Hybrid Marketplace Architecture for Blue-Collar Services',
      organization: 'IEEE ICSFT 2026',
      description:
        'Published in IEEE Xplore proceedings. Investigates decentralized marketplace matchmaking, real-time trust scoring, and fair pricing mechanisms for gig economy service providers.',
      keyContribution:
        'Engineered dynamic bipartite matching algorithms optimizing service provider dispatch radius and designed tamper-resistant cryptographic service completion verification (DOI: 10.1109/icsft67370.2026.11566098).',
      status: 'PUBLISHED ON IEEE XPLORE',
      statusVariant: 'emerald',
      actionUrl: 'https://ieeexplore.ieee.org/document/11566098',
      actionLabel: 'ACCESS ON IEEE XPLORE',
      accentColor: 'cyan',
    },
    {
      id: 'res-2',
      yearOrPeriod: '2025',
      category: 'IEEE & PEER REVIEW CONFERENCE',
      title: 'Cryptographic Key Delegation in Decentralized Cloud Storage',
      organization: 'ICIRCA 2025',
      description:
        'Investigates multi-authority cryptographic key delegation and hybrid ciphertext encryption to eliminate single-point-of-compromise vulnerabilities in public cloud storage.',
      keyContribution:
        'Devised multi-authority threshold key distribution matrices and client-side AES-256 GCM encryption pipelines preventing rogue credential hijacking in shared storage architectures.',
      status: 'ACCEPTED (MAJOR REVISION)',
      statusVariant: 'purple',
      accentColor: 'purple',
    },
    {
      id: 'res-3',
      yearOrPeriod: '2024',
      category: 'IEEE CONFERENCE PROCEEDINGS',
      title: 'Phishing Email Detection using ClamAV & VirusTotal',
      organization: 'ICMLAS IEEE Conference',
      description:
        'Proposes a dual-layer threat verification pipeline combining ClamAV antivirus signature heuristics with automated VirusTotal multi-engine reputational scoring.',
      keyContribution:
        'Constructed automated attachment extraction, lexical URL tokenization, and real-time quarantine dispatch isolating weaponized phishing attachments and deceptive hyperlinks.',
      status: 'ACCEPTED FOR PRESENTATION',
      statusVariant: 'emerald',
      accentColor: 'emerald',
    },
    {
      id: 'res-4',
      yearOrPeriod: '2025',
      category: 'ENVIRONMENTAL AI PROCEEDINGS',
      title: 'Sustainable Biomedical Waste Reuse',
      organization: 'INSDAM Conference Proceedings',
      description:
        'Analyzes computer vision classification and machine learning-assisted waste segregation pipelines for non-infectious hospital plastics and municipal items.',
      keyContribution:
        'Engineered automated classification protocols reducing incinerator overhead and environmental contamination in healthcare facilities through vision-based material sorting.',
      status: 'PUBLISHED PROCEEDINGS',
      statusVariant: 'pink',
      accentColor: 'pink',
    },
  ];

  const leadershipMilestones: TimelineMilestone[] = [
    {
      id: 'lead-1',
      yearOrPeriod: '2023 – 2025',
      category: 'CAMPUS & COMMUNITY LEADERSHIP',
      title: 'Web Developer & Event Coordinator',
      organization: 'Microsoft Learn Student Club (MLSC) & ACM – KARE',
      description:
        'Directed flagship technical initiatives, built responsive event and competition portals, and mentored student developers across Kalasalingam Academy of Research and Education.',
      keyContribution: [
        'Designed and deployed responsive event portals and live competition dashboards for campus technology symposiums.',
        'Organized hackathons, hands-on coding workshops, and tech webinars reaching over 500+ student participants.',
        'Mentored junior students in Git/GitHub workflows, web development fundamentals, and competitive programming.',
      ],
      status: '500+ STUDENTS REACHED',
      statusVariant: 'emerald',
      accentColor: 'purple',
    },
  ];

  const academyMilestones: TimelineMilestone[] = [
    {
      id: 'acad-1',
      yearOrPeriod: '2022 – 2026',
      category: 'UNDERGRADUATE DEGREE',
      title: 'Bachelor of Technology in Computer Science and Engineering',
      organization: 'Kalasalingam Academy of Research and Education (KARE)',
      description:
        'Undergraduate curriculum emphasizing applied cryptography, algorithms, distributed systems, and computer vision with consistent top-tier academic performance.',
      keyContribution: [
        'Maintained consistent academic standing of 8.6 / 10.0 CGPA throughout the Computer Science curriculum.',
        'Published IEEE conference paper on Servify platform architecture (DOI: 10.1109/icsft67370.2026.11566098).',
        'Finalist & Grand Finale participant in the IEEE Smart KARE Hackathon 2025.',
        'Built Virtual Lab cryptography simulator adopted by 150+ students for practical coursework.',
        'Core Technical Focus: Algorithms, Cryptography & Network Security, DBMS, Artificial Intelligence, Operating Systems.',
      ],
      status: 'CGPA: 8.6 / 10.0',
      statusVariant: 'cyan',
      accentColor: 'cyan',
    },
  ];

  const currentMilestones =
    activeTrack === 'industry'
      ? industryMilestones
      : activeTrack === 'research'
      ? researchMilestones
      : activeTrack === 'leadership'
      ? leadershipMilestones
      : academyMilestones;

  return (
    <div className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Dedicated Career & Leadership District Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={LEADER_PAGE_IMAGE || '/leader-page.png'}
          alt="Career & Leadership District Background"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('leader-page.png')) {
              target.src = '/leader%20page.png';
            } else {
              target.src = '/leader-page.png';
            }
          }}
          className="w-full h-full object-cover object-center filter contrast-125 brightness-90 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/75 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col justify-between flex-grow max-w-7xl mx-auto w-full space-y-6">
        {/* District Header Watermark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-500/30 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-purple-600/30 border border-purple-500 flex items-center justify-center text-purple-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="font-hud text-[11px] text-purple-400 tracking-widest font-black uppercase flex items-center gap-1.5">
                <span>LOCATION 06 // SAN ANDREAS CORRIDOR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              </div>
              <h1 className="font-vice text-3xl sm:text-4xl text-white">
                CAREER & RESEARCH DISTRICT
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-hud">
            <span className="text-neutral-400">COORDINATES:</span>
            <span className="px-2 py-1 bg-black/60 border border-purple-500/40 text-purple-400 font-mono rounded">
              MULHOLLAND OVERLOOK • HIGHWAY JUNCTION
            </span>
          </div>
        </div>

        {/* Center Tabs and Controls */}
        <div className="my-auto py-4 space-y-6">
          <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 p-5 rounded-lg shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-hud font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">
                  3D CAREER TIMELINE
                </span>
                <span className="font-hud text-xs text-neutral-400">
                  Select a track to navigate the holographic corridor
                </span>
              </div>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-hud text-neutral-300">
                <span className="text-purple-400 font-bold">CAREER JOURNEY</span>
                <span className="text-white/40">●──────────────●──────────────●</span>
                <span className="text-cyan-400 font-mono font-bold uppercase">TRACK: {activeTrack}</span>
              </div>
            </div>

            {/* Tab Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  gtaAudio.playSelect();
                  setActiveTrack('industry');
                  setActiveMilestoneIndex(0);
                }}
                className={`px-3.5 py-2 rounded text-xs font-hud font-bold transition-all cursor-pointer uppercase ${
                  activeTrack === 'industry'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:border-purple-500/40'
                }`}
              >
                INDUSTRY ({industryMilestones.length})
              </button>
              <button
                onClick={() => {
                  gtaAudio.playSelect();
                  setActiveTrack('research');
                  setActiveMilestoneIndex(0);
                }}
                className={`px-3.5 py-2 rounded text-xs font-hud font-bold transition-all cursor-pointer uppercase ${
                  activeTrack === 'research'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:border-purple-500/40'
                }`}
              >
                RESEARCH ({researchMilestones.length})
              </button>
              <button
                onClick={() => {
                  gtaAudio.playSelect();
                  setActiveTrack('leadership');
                  setActiveMilestoneIndex(0);
                }}
                className={`px-3.5 py-2 rounded text-xs font-hud font-bold transition-all cursor-pointer uppercase ${
                  activeTrack === 'leadership'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:border-purple-500/40'
                }`}
              >
                LEADERSHIP ({leadershipMilestones.length})
              </button>
              <button
                onClick={() => {
                  gtaAudio.playSelect();
                  setActiveTrack('academy');
                  setActiveMilestoneIndex(0);
                }}
                className={`px-3.5 py-2 rounded text-xs font-hud font-bold transition-all cursor-pointer uppercase ${
                  activeTrack === 'academy'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:border-purple-500/40'
                }`}
              >
                ACADEMY (8.6 CGPA)
              </button>
            </div>
          </div>

          {/* Central 3D Timeline Corridor */}
          <div className="relative w-full py-4 max-w-5xl mx-auto">
            {/* Continuous Neon Energy Rail Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-400 to-pink-500 opacity-60 z-10">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-white to-transparent animate-energy-pulse pointer-events-none" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, scale: 0.94, z: -40 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.94, z: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full space-y-4 md:space-y-0"
              >
                {currentMilestones.map((milestone, idx) => {
                  const position: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
                  const isActive = activeMilestoneIndex === idx;

                  return (
                    <HolographicTimelineEntry
                      key={milestone.id}
                      entry={milestone}
                      index={idx}
                      total={currentMilestones.length}
                      isActive={isActive}
                      onActivate={() => {
                        gtaAudio.playHover();
                        setActiveMilestoneIndex(idx);
                      }}
                      position={position}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="relative flex flex-col items-center justify-center pt-8 z-20">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4] ring-4 ring-cyan-500/30" />
              <span className="mt-2 font-hud text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                END OF {activeTrack.toUpperCase()} TRACK
              </span>
            </div>
          </div>
        </div>

        {/* District Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
          <button
            onClick={() => {
              gtaAudio.playSelect();
              gtaAudio.playCameraSwoosh();
              onSelectDistrict('achievement_hq');
            }}
            className="px-4 py-2 bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white font-hud text-xs rounded border border-white/10 cursor-pointer"
          >
            &larr; RETURN TO ACHIEVEMENT HQ
          </button>

          <button
            onClick={() => {
              gtaAudio.playSelect();
              gtaAudio.playCameraSwoosh();
              onSelectDistrict('comms_center');
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-hud font-bold text-xs tracking-widest rounded border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>DEPLOY CAMERA TO COMMUNICATION TOWER</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
