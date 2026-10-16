import React, { useEffect } from 'react';
import { UnifiedExhibitionItem } from './AchievementSpatialStage';
import { gtaAudio } from '../../utils/audio';
import {
  X,
  ShieldCheck,
  Trophy,
  Building,
  Calendar,
  ExternalLink,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AchievementDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: UnifiedExhibitionItem | null;
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({
  isOpen,
  onClose,
  item,
  currentIndex,
  totalItems,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        gtaAudio.playBack();
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !item) return null;

  const isTrophy = item.type === 'trophy';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#181108]/95 via-[#0e0a05]/98 to-[#050402] border-2 border-amber-500/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(245,158,11,0.5),inset_0_0_40px_rgba(245,158,11,0.15)] max-h-[90vh] overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-amber-500/40 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-950/90 border border-amber-400/60 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              {isTrophy ? <Trophy className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-hud text-xs text-amber-400 font-black uppercase tracking-wider flex items-center gap-2">
                <span>{isTrophy ? 'OFFICIAL TROPHY DOSSIER' : 'ACCREDITATION RECORD'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="font-mono text-[11px] text-neutral-400">
                EXHIBIT {currentIndex + 1} OF {totalItems}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              gtaAudio.playBack();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
            title="Close Dossier"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title, Category & Issuer */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-hud font-black uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow-sm">
              {item.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-hud font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-400/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-300" />
              <span>{item.status}</span>
            </span>
            {item.xp && (
              <span className="font-mono text-xs text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded">
                {item.xp}
              </span>
            )}
          </div>

          <h2 className="font-vice text-2xl sm:text-3xl text-white tracking-wide leading-tight drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            {item.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-hud text-neutral-300 pt-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Building className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{item.organization}</span>
            </div>
            <span className="text-neutral-600">•</span>
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
              <Calendar className="w-4 h-4 text-amber-400/80 shrink-0" />
              <span>{item.date}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <span className="font-hud text-xs text-amber-400 font-bold uppercase tracking-wider block">
            VERIFIED SYNOPSIS
          </span>
          <p className="font-sans text-sm text-neutral-200 leading-relaxed bg-black/60 p-4 rounded-xl border border-white/10">
            {item.description}
          </p>
        </div>

        {/* Verified Metric or Credential ID */}
        {(item.verifiedMetric || item.credentialId) && (
          <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-2">
            {item.verifiedMetric && (
              <div className="flex items-center justify-between text-xs font-hud">
                <span className="text-amber-400 font-bold">AUTHENTICATED METRIC:</span>
                <span className="text-white font-mono font-bold bg-amber-900/60 px-2.5 py-0.5 rounded border border-amber-400/30">
                  {item.verifiedMetric}
                </span>
              </div>
            )}
            {item.credentialId && (
              <div className="space-y-1">
                <span className="text-[11px] font-hud text-neutral-400 block">
                  ACCREDITATION CREDENTIAL ID:
                </span>
                <div className="font-mono text-xs text-amber-300 bg-black/80 px-3 py-1.5 rounded border border-white/10 select-all break-all">
                  {item.credentialId}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Skills & Competencies */}
        {item.skills && item.skills.length > 0 && (
          <div className="space-y-2">
            <span className="font-hud text-xs text-amber-400 font-bold uppercase tracking-wider block">
              ACCREDITED COMPETENCIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={`${item.id || item.title}-${skill}-${sIdx}`}
                  className="px-2.5 py-1 rounded text-xs font-hud bg-amber-950/70 text-amber-200 border border-amber-500/30 shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation & Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Previous exhibit"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-neutral-400">
              {currentIndex + 1} / {totalItems}
            </span>
            <button
              type="button"
              onClick={onNext}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Next exhibit"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {item.verificationUrl && (
              <a
                href={item.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-hud text-xs font-black tracking-wider rounded transition-all shadow-[0_0_20px_rgba(245,158,11,0.6)] cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>AUTHENTICATE ONLINE</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                gtaAudio.playBack();
                onClose();
              }}
              className="px-4 py-2 bg-black/60 hover:bg-white/10 border border-white/20 text-white font-hud text-xs tracking-wider rounded transition-colors cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
