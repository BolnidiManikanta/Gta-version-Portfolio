import React, { useMemo } from 'react';
import { VerifiedSkill } from '../../data/skillsCatalog';

interface SkillWorkstation3DProps {
  selectedSkill: VerifiedSkill;
  activeCategoryId: string;
  themeColor: string;
  glowColor: string;
  idleTime: number;
  reducedMotion?: boolean;
}

export const SkillWorkstation3D: React.FC<SkillWorkstation3DProps> = ({
  selectedSkill,
  activeCategoryId,
  themeColor,
  idleTime,
  reducedMotion = false,
}) => {
  // Screen telemetry content based on active category
  const monitorTelemetry = useMemo(() => {
    switch (activeCategoryId) {
      case 'cybersecurity':
        return {
          title: 'DEFENSE ENGINE',
          status: 'IDS / ZERO-TRUST: ENFORCED',
          lines: [
            '$ suricata -c /etc/suricata.yaml -i eth0',
            '[DEFENSE] Zero-Trust Perimeter Active',
            `[ACTIVE_NODE] ${selectedSkill.name.toUpperCase()}`,
            '[TELEMETRY] SHA-256 Hash Verified: 0x8f3c...b04a',
          ],
          metric: 'LATENCY: 0.4ms • 100% SECURE',
        };
      case 'ai-ml':
        return {
          title: 'NEURAL TENSOR RUNTIME',
          status: 'INFERENCE ENGINE: FP16 ACTIVE',
          lines: [
            'import torch.nn as nn',
            `model = build_architecture("${selectedSkill.name}")`,
            'loss = criterion(outputs, targets)',
            'optimizer.step() # Val_Acc: 98.4%',
          ],
          metric: 'BATCH: 64 • LATENCY: 2.1ms',
        };
      case 'fullstack':
        return {
          title: 'APP ARCHITECTURE RUNTIME',
          status: 'MICROSERVICES: HEALTHY',
          lines: [
            `export async function handleRequest() {`,
            `  const node = await loadService("${selectedSkill.name}");`,
            `  return Response.json({ status: 200, node });`,
            `}`,
          ],
          metric: 'UPTIME: 99.99% • FASTAPI/NODE',
        };
      case 'databases':
        return {
          title: 'DATA ENGINE RUNTIME',
          status: 'ACID TRANSACTIONS: COMMITTED',
          lines: [
            `SELECT * FROM core_skills`,
            `WHERE skill_id = '${selectedSkill.id}'`,
            `CREATE INDEX CONCURRENTLY idx_sector`,
            `[OK] 0.08ms Query Execution Plan`,
          ],
          metric: 'STORAGE POOL: SYNCHRONIZED',
        };
      case 'cloud-devops':
        return {
          title: 'KUBERNETES FLEET CONTROLLER',
          status: 'PODS: 5/5 READY',
          lines: [
            `apiVersion: apps/v1 | Deployment`,
            `image: gcr.io/tech-vault/${selectedSkill.id}`,
            `$ kubectl rollout status deployment/core`,
            `[SUCCESS] Zero Downtime Rolling Update`,
          ],
          metric: 'CLUSTER: OCI COMPLIANT',
        };
      case 'tools':
        return {
          title: 'DEVELOPER WORKSPACE CLI',
          status: 'GIT BRANCH: MAIN (CLEAN)',
          lines: [
            `$ git checkout -b feature/production-core`,
            `$ vite build --mode production`,
            `[vite] ✓ built in 380ms | 0 errors`,
            `$ ${selectedSkill.name.toLowerCase()} --version`,
          ],
          metric: 'DEV TOOLS: SYNCHRONIZED',
        };
      case 'programming':
      default:
        return {
          title: 'CORE COMPILER RUNTIME',
          status: 'OPTIMIZATION: -O3 ACTIVE',
          lines: [
            `def execute_${selectedSkill.id.replace(/-/g, '_')}_runtime():`,
            `    system = initialize_core("${selectedSkill.name}")`,
            `    return system.benchmark_latency()`,
            `# Native hardware binding: compiled`,
          ],
          metric: 'EXECUTION: SUB-MILLISECOND',
        };
    }
  }, [activeCategoryId, selectedSkill]);

  // Subtle natural posture breathing motion
  const breathY = reducedMotion ? 0 : Math.sin(idleTime * 1.4) * 1.5;

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none w-full max-w-[560px] sm:max-w-[640px]"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* =========================================================================
          1. CENTRAL SEATED DEVELOPER (OCCUPIES 35-45% OF COMPOSITION)
          Authentic Face, Seated Posture, Thoughtful Chin-Hand Pose, Looking at Monitor
          Placed behind the computer, but head, face, and shoulders fully uncovered
          ========================================================================= */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `translate3d(0, ${Math.round(breathY)}px, -20px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Developer Silhouette & Portrait Frame */}
        <div className="relative w-[340px] sm:w-[400px] md:w-[440px] h-[350px] sm:h-[390px] flex items-center justify-center">
          {/* Subtle Ambient Backlight Glow Framing the Silhouette */}
          <div
            className="absolute inset-2 rounded-3xl filter blur-2xl opacity-40 transition-colors duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${themeColor} 0%, transparent 70%)`,
            }}
          />

          {/* Authentic Portrait of Manikanta Seated at Workstation */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.95)] border border-white/10 bg-neutral-950/80">
            <img
              src="/about-page.png"
              alt="Bolnidi Manikanta seated at command workstation"
              className="w-full h-full object-cover object-top filter contrast-[1.12] brightness-[0.94] saturate-[1.08]"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('about-page.png')) {
                  target.src = '/skills-page.png';
                } else if (target.src.includes('skills-page.png')) {
                  target.src = '/about%20page.png';
                }
              }}
            />

            {/* Monitor Front Glow reflection on hands & chest (Cyan/Active Color reflection) */}
            <div
              className="absolute bottom-0 inset-x-0 h-36 pointer-events-none transition-colors duration-700 opacity-60"
              style={{
                background: `linear-gradient(to top, ${themeColor}40 0%, ${themeColor}15 50%, transparent 100%)`,
              }}
            />

            {/* Subtle Vignette on Edges for Cinematic Integration */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.85)_100%)]" />

            {/* Warm Amber Rim Lighting from Reactor Core Behind */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-amber-500/15 via-amber-400/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. REAL PHYSICAL WORKSTATION IN FRONT OF DEVELOPER
          Physically in the foreground: Real Widescreen Monitor, Metal Articulated Arm,
          Mechanical Backlit Keyboard, Mouse, Laptop, Heavy Matte Desk Surface
          ========================================================================= */}
      <div
        className="relative z-20 -mt-16 sm:-mt-20 w-full flex flex-col items-center pointer-events-none"
        style={{
          transform: 'translate3d(0, 0, 75px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* --- MAIN PHYSICAL DESKTOP MONITOR --- */}
        <div className="relative w-[92%] max-w-[500px] sm:max-w-[540px] rounded-t-xl bg-neutral-900 border-2 border-neutral-700 shadow-[0_15px_45px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col h-32 sm:h-36 pointer-events-auto">
          {/* Real Monitor Bezel with Center Webcam Notch & Activity LED */}
          <div className="h-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10B981] animate-pulse" />
              <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 uppercase font-bold tracking-wider">
                {monitorTelemetry.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-amber-400 font-bold">
                {selectedSkill.name.toUpperCase()}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: themeColor }}
              />
            </div>
          </div>

          {/* Active Screen Display (High-contrast IDE / Telemetry) */}
          <div className="p-2 sm:p-2.5 font-mono text-[9px] sm:text-[10px] text-neutral-200 leading-relaxed overflow-hidden flex flex-col justify-between flex-1 bg-gradient-to-b from-neutral-950 via-black to-neutral-950">
            <div className="space-y-0.5">
              {monitorTelemetry.lines.map((line, idx) => (
                <div key={idx} className="truncate">
                  <span className="text-neutral-500 mr-2 select-none font-normal">{idx + 1}</span>
                  <span
                    className={
                      idx === 0
                        ? 'text-amber-300 font-bold'
                        : idx === 1
                        ? 'text-cyan-300'
                        : idx === 2
                        ? 'text-emerald-300 font-semibold'
                        : 'text-neutral-300'
                    }
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {/* Monitor Bottom Status Bar */}
            <div className="flex items-center justify-between border-t border-neutral-800/80 pt-1 text-[8px] text-neutral-400">
              <span className="text-emerald-400 font-bold tracking-wider">● {monitorTelemetry.status}</span>
              <span className="font-mono text-cyan-300 font-semibold">{monitorTelemetry.metric}</span>
            </div>
          </div>

          {/* Physical Bottom Bezel with Metal Branding & Power LED */}
          <div className="h-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between px-3">
            <span className="text-[7px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
              TITAN PRECISION DISPLAY // 32-INCH UHD
            </span>
            <span
              className="w-1 h-1 rounded-full shadow-sm animate-pulse"
              style={{ backgroundColor: themeColor }}
            />
          </div>

          {/* Anti-Glare Specular Screen Coating */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
        </div>

        {/* --- MONITOR STAND ARM & BASE --- */}
        <div className="flex flex-col items-center z-10 pointer-events-none">
          {/* Heavy-Duty Metal Articulated Stand */}
          <div className="w-16 h-2 bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 border-x border-neutral-600 shadow-md" />
          <div className="w-24 h-1.5 bg-neutral-800 rounded-full border border-neutral-700 shadow" />
        </div>

        {/* --- PHYSICAL DESKTOP SURFACE & PERIPHERALS --- */}
        <div className="relative w-full rounded-xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-t-2 border-x border-neutral-700/90 p-2.5 sm:p-3 shadow-[0_20px_60px_rgba(0,0,0,0.98)] flex items-center justify-between pointer-events-auto">
          {/* Desk Edge Specular LED Strip */}
          <div
            className="absolute top-0 inset-x-6 h-[2px] rounded-full transition-colors duration-700 shadow-[0_0_12px_currentColor]"
            style={{ color: themeColor }}
          />

          {/* Left Accessory: Sleek Slim Laptop Open on Desk */}
          <div className="w-24 sm:w-28 h-12 sm:h-14 rounded-t-md bg-neutral-950 border border-neutral-700 p-1 flex flex-col justify-between shadow-md shrink-0">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-0.5">
              <span className="text-[6px] font-mono text-neutral-400">AUX_TERMINAL</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
            <div className="font-mono text-[6px] text-cyan-300 truncate">
              {selectedSkill.category}
            </div>
            <div className="h-1 bg-neutral-800 rounded-xs" />
          </div>

          {/* Center: Backlit Mechanical Keyboard on Desk Pad */}
          <div className="flex-1 mx-2.5 sm:mx-4 flex flex-col items-center">
            {/* Keyboard Chassis */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] h-9 sm:h-10 rounded-md bg-neutral-900 border border-neutral-700 p-1 shadow-inner flex flex-col justify-between">
              {/* Top Key Row */}
              <div className="flex justify-between gap-0.5">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 h-2 rounded-[1px] bg-neutral-800/90 border border-neutral-700/50 shadow-xs"
                  />
                ))}
              </div>
              {/* Home Key Row with Subtle Amber/Cyan Underglow */}
              <div className="flex justify-between gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 h-2.5 rounded-[1px] bg-neutral-800 border border-neutral-700 shadow-xs"
                    style={{
                      boxShadow: i % 3 === 0 ? `0 0 3px ${themeColor}66` : undefined,
                    }}
                  />
                ))}
              </div>
              {/* Spacebar Row */}
              <div className="flex items-center justify-center">
                <span className="w-20 h-1.5 rounded-[1px] bg-neutral-800 border border-neutral-700 shadow-xs" />
              </div>
            </div>
            <span className="text-[7px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">
              CUSTOM 75% MECHANICAL KEYBOARD
            </span>
          </div>

          {/* Right Accessory: Ergonomic Wireless Precision Mouse */}
          <div className="w-8 sm:w-9 h-12 sm:h-13 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 border border-neutral-700 p-1 flex flex-col items-center justify-between shadow-md shrink-0">
            <span
              className="w-1 h-2.5 rounded-full transition-colors duration-500 shadow-xs"
              style={{ backgroundColor: themeColor }}
            />
            <span className="w-1.5 h-0.5 rounded-full bg-neutral-600 mb-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
