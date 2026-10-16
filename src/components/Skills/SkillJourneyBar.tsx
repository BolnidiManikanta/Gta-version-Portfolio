import React from 'react';
import { BookOpen, Crosshair, Code, Sparkles } from 'lucide-react';

export const SkillJourneyBar: React.FC = () => {
  const steps = [
    {
      label: 'LEARN',
      desc: 'Build Foundation',
      icon: <BookOpen className="w-3.5 h-3.5 text-amber-400" />,
      glowColor: 'bg-amber-400/20 border-amber-400/60 text-amber-300',
    },
    {
      label: 'PRACTICE',
      desc: 'Apply Knowledge',
      icon: <Crosshair className="w-3.5 h-3.5 text-cyan-400" />,
      glowColor: 'bg-cyan-400/20 border-cyan-400/60 text-cyan-300',
    },
    {
      label: 'BUILD',
      desc: 'Create Projects',
      icon: <Code className="w-3.5 h-3.5 text-white" />,
      glowColor: 'bg-white/10 border-white/30 text-white',
    },
    {
      label: 'GROW',
      desc: 'Advance Expertise',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-300" />,
      glowColor: 'bg-purple-400/20 border-purple-400/60 text-purple-300',
    },
  ];

  return (
    <div className="w-full flex items-center justify-center py-2 select-none text-hd-sharp">
      <div className="flex items-center gap-3 sm:gap-6 px-6 py-3 rounded-full bg-neutral-950/95 border border-white/20 shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
        {steps.map((step, idx) => (
          <React.Fragment key={step.label}>
            {/* Step Node */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center ${step.glowColor} shadow-inner shrink-0`}
              >
                {step.icon}
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-hud font-extrabold text-xs sm:text-[13px] tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {step.label}
                </span>
                <span className="text-[11px] font-sans text-neutral-300 font-medium">
                  {step.desc}
                </span>
              </div>
            </div>

            {/* Connecting Dashed Line */}
            {idx < steps.length - 1 && (
              <div className="w-6 sm:w-10 h-0.5 border-t border-dashed border-white/25 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
