import React from 'react';
import { UnifiedExhibitionItem } from './AchievementSpatialStage';
import { BrandLogo } from './BrandLogo';
import { gtaAudio } from '../../utils/audio';
import { CheckCircle2, ArrowRight, ExternalLink, Sparkles, Trophy, Award } from 'lucide-react';

interface AchievementPortraitCardProps {
  item: UnifiedExhibitionItem;
  index: number;
  total: number;
  isHero: boolean;
  isHovered: boolean;
  onOpenDetail: (item: UnifiedExhibitionItem) => void;
  onSelectHero?: () => void;
}

export const AchievementPortraitCard: React.FC<AchievementPortraitCardProps> = ({
  item,
  index,
  total,
  isHero,
  isHovered,
  onOpenDetail,
  onSelectHero,
}) => {
  const displayIndex = String(index + 1).padStart(2, '0');

  // =========================================================================
  // CENTRAL FEATURED ACHIEVEMENT CARD (THE HOLOGRAPHIC HERO CREDENTIAL)
  // Height: ~485px, width: ~390px (responsive on mobile: ~320px).
  // Tall, vertical, dark smoked obsidian glass with glowing amber edge lighting.
  // =========================================================================
  if (isHero) {
    return (
      <div className="relative group select-none flex flex-col items-center">
        {/* Holographic Glowing Card Container */}
        <div
          className={`relative w-[315px] sm:w-[365px] md:w-[390px] h-[460px] sm:h-[480px] md:h-[495px] rounded-2xl flex flex-col justify-between overflow-hidden backdrop-blur-2xl transition-all duration-300 border ${
            isHovered
              ? 'border-amber-300 bg-gradient-to-b from-[#1c1308]/96 via-[#0e0904]/98 to-[#040302] shadow-[0_0_50px_rgba(245,158,11,0.55),inset_0_0_30px_rgba(245,158,11,0.2)]'
              : 'border-amber-400/85 bg-gradient-to-b from-[#160f07]/93 via-[#0b0804]/97 to-[#030201]/99 shadow-[0_0_38px_rgba(245,158,11,0.38),inset_0_0_22px_rgba(245,158,11,0.12)]'
          }`}
        >
          {/* Top golden neon highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          {/* Vertical edge light lines */}
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-400/50 via-amber-300/30 to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-400/50 via-amber-300/30 to-transparent" />

          {/* Bottom subtle cyan accent line */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

          {/* Optical corner alignment brackets */}
          <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/90 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400/90 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400/90 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/90 pointer-events-none" />

          {/* Top volumetric ambient glow */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-amber-400/25 to-transparent blur-xl pointer-events-none" />

          {/* 1. TOP STATUS BAR: INDEX + "FEATURED" + CYAN "✓ VERIFIED" */}
          <div className="relative z-10 px-5 pt-3.5 pb-2.5 flex items-center justify-between border-b border-amber-500/25 bg-black/30">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-amber-300 bg-amber-950/90 border border-amber-400/70 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(245,158,11,0.35)]">
                #{displayIndex}
              </span>
              <span className="font-hud text-[10px] font-black tracking-widest text-amber-300 uppercase bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/40 shadow-sm">
                FEATURED
              </span>
            </div>

            {/* Cyan Verified Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 font-hud text-[10px] font-black tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.35)]">
              <CheckCircle2 className="w-3 h-3 text-cyan-300 animate-pulse" />
              <span>VERIFIED</span>
            </div>
          </div>

          {/* 2. CARD BODY: BRAND LOGO + TITLE + METADATA + DESCRIPTION */}
          <div className="relative z-10 px-5 sm:px-6 py-3 flex-1 flex flex-col items-center justify-center text-center space-y-2.5">
            {/* Logo Showcase Platform Inset */}
            <div className="relative w-full py-3 px-3 rounded-xl bg-black/65 border border-amber-500/35 flex items-center justify-center min-h-[66px] shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] group-hover:border-amber-400/70 transition-colors">
              <BrandLogo
                organization={item.organization}
                title={item.title}
                category={item.category}
                size="lg"
              />
              <div className="absolute -bottom-1 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            </div>

            {/* Title */}
            <h3 className="font-vice text-lg sm:text-xl text-white tracking-wide leading-snug drop-shadow-[0_0_15px_rgba(245,158,11,0.35)] line-clamp-2">
              {item.title}
            </h3>

            {/* Organization & Date */}
            <div className="flex items-center justify-center gap-2 text-xs font-hud text-neutral-300">
              <span className="text-amber-300 font-bold truncate max-w-[190px]">
                {item.organization}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-amber-400/90 font-mono text-[11px] shrink-0 font-bold">
                {item.date}
              </span>
            </div>

            {/* Category Pill + Trophy Icon */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-hud font-black uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>{item.category}</span>
              </div>
              {item.type === 'trophy' ? (
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                  <Trophy className="w-3 h-3" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                  <Award className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Concise Verified Description */}
            <p className="font-sans text-xs text-neutral-300 leading-relaxed line-clamp-2 px-1">
              {item.description}
            </p>

            {/* Credential ID or Metric Badge */}
            {(item.verifiedMetric || item.credentialId) && (
              <div className="font-mono text-[10px] text-amber-200/90 bg-black/70 px-2.5 py-0.5 rounded border border-amber-500/25 max-w-full truncate">
                {item.verifiedMetric ? (
                  <span>METRIC: {item.verifiedMetric}</span>
                ) : (
                  <span>ID: {item.credentialId}</span>
                )}
              </div>
            )}
          </div>

          {/* 3. ACTION BAR: VIEW DETAILS BUTTON */}
          <div className="relative z-10 px-5 pb-4 pt-2.5 border-t border-amber-500/25 bg-black/40 flex items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                gtaAudio.playSelect();
                onOpenDetail(item);
              }}
              aria-label={`View details for ${item.title}`}
              className="flex-1 py-2 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-hud font-black text-xs tracking-wider rounded transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.9)] hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>VIEW DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {item.verificationUrl && (
              <a
                href={item.verificationUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Verify Credential Online"
                aria-label={`Verify credential for ${item.title} online`}
                className="py-2 px-2.5 bg-black/80 hover:bg-neutral-900 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white rounded transition-colors shadow-sm flex items-center justify-center cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* =========================================================================
            DOWNWARD REALISTIC FLOOR REFLECTION
            Mirrors bottom portion of card fading into the wet platform
        ========================================================================= */}
        <div className="relative w-[280px] sm:w-[320px] h-[55px] overflow-hidden pointer-events-none opacity-30 blur-[0.8px] -mt-1 scale-y-[-1] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,transparent_85%)]">
          <div className="w-full h-full bg-gradient-to-b from-amber-500/30 via-black/80 to-transparent rounded-b-2xl border-t border-amber-400/50" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // SURROUNDING 3D REPOSING EXHIBIT CARD (SIDE RECEDING CARD)
  // Height: ~340px, Width: ~225px.
  // Sits along the 3D parabolic arc, facing inward with glowing edge.
  // =========================================================================
  return (
    <div
      onClick={onSelectHero}
      className="relative group select-none flex flex-col items-center cursor-pointer"
    >
      <div
        className={`relative w-[195px] sm:w-[215px] md:w-[230px] h-[310px] sm:h-[330px] md:h-[345px] rounded-xl flex flex-col justify-between overflow-hidden backdrop-blur-xl transition-all duration-300 border ${
          isHovered
            ? 'border-amber-400 bg-gradient-to-b from-[#181107]/96 via-[#0e0904]/98 to-[#050302] shadow-[0_0_30px_rgba(245,158,11,0.55),inset_0_0_15px_rgba(245,158,11,0.18)] scale-[1.03]'
            : 'border-amber-500/35 bg-gradient-to-b from-[#120c05]/88 via-[#090603]/92 to-[#030201]/96 shadow-[0_12px_30px_rgba(0,0,0,0.85),inset_0_0_10px_rgba(245,158,11,0.06)]'
        }`}
      >
        {/* Top Edge Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

        {/* Corner alignment marks */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-amber-400/60 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-amber-400/60 pointer-events-none" />

        {/* 1. TOP BAR: INDEX + VERIFIED */}
        <div className="relative z-10 px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-white/10 bg-black/25">
          <span className="font-mono text-[11px] font-black text-amber-300 bg-black/75 border border-amber-500/35 px-1.5 py-0.5 rounded shadow-sm">
            #{displayIndex}
          </span>

          <span className="flex items-center gap-1 font-mono text-[9px] text-cyan-300 bg-cyan-950/80 border border-cyan-400/35 px-1.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
            <span>VERIFIED</span>
          </span>
        </div>

        {/* 2. BODY: BRAND LOGO + TITLE + ORG + DATE */}
        <div className="relative z-10 px-3 py-2 flex-1 flex flex-col items-center text-center space-y-1.5 justify-center">
          {/* Brand Logo Container */}
          <div className="w-full py-1.5 px-2 rounded-lg bg-black/60 border border-amber-500/25 flex items-center justify-center min-h-[46px]">
            <BrandLogo
              organization={item.organization}
              title={item.title}
              category={item.category}
              size="sm"
            />
          </div>

          {/* Title */}
          <h4 className="font-sans font-bold text-xs text-white leading-snug line-clamp-2 drop-shadow-sm">
            {item.title}
          </h4>

          {/* Organization & Date */}
          <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1">
            <span className="text-amber-300/95 truncate max-w-[110px] font-hud">
              {item.organization}
            </span>
            <span>•</span>
            <span className="text-amber-400/80 font-bold shrink-0">{item.date}</span>
          </div>

          {/* Category */}
          <div className="px-2 py-0.5 rounded-full text-[8px] font-hud font-black uppercase tracking-wider bg-amber-950/70 text-amber-300 border border-amber-500/35">
            {item.category}
          </div>

          {/* Description snippet */}
          <p className="font-sans text-[10px] text-neutral-300/80 line-clamp-2 leading-tight px-0.5">
            {item.description}
          </p>
        </div>

        {/* 3. BOTTOM CTA: COMPACT VIEW */}
        <div className="relative z-10 px-3 pb-2.5 pt-1.5 border-t border-white/10 bg-black/35 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              gtaAudio.playSelect();
              onOpenDetail(item);
            }}
            aria-label={`View details for ${item.title}`}
            className="w-full py-1 px-2.5 bg-black/80 hover:bg-amber-500 hover:text-black border border-amber-500/50 hover:border-amber-400 text-amber-300 font-hud font-bold text-[10px] tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-1 shadow-sm"
          >
            <span>VIEW</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Downward side reflection slit */}
      <div className="relative w-[140px] h-[20px] overflow-hidden pointer-events-none opacity-20 blur-[1px] -mt-1 scale-y-[-1] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,transparent_85%)]">
        <div className="w-full h-full bg-gradient-to-b from-amber-500/20 via-black/80 to-transparent" />
      </div>
    </div>
  );
};
