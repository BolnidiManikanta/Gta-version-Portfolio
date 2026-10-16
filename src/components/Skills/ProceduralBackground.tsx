import React, { useEffect, useRef } from 'react';

interface ProceduralBackgroundProps {
  mousePos: { x: number; y: number };
  reducedMotion?: boolean;
}

export const ProceduralBackground: React.FC<ProceduralBackgroundProps> = ({
  mousePos,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition: computational data nodes (not stars)
    const particleCount = Math.min(140, Math.floor((width * height) / 10000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.35),
      vy: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.35),
      size: Math.random() * 1.8 + 0.6,
      depth: Math.random() * 0.8 + 0.2, // 0.2 to 1.0 depth factor
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseOffset: Math.random() * Math.PI * 2,
      isHex: Math.random() > 0.75, // some nodes rendered as tech hexes/crosses
    }));

    // Data streams (glowing lines floating across computational space)
    const streams = Array.from({ length: 9 }, (_, i) => ({
      x: (width / 9) * i + Math.random() * 40,
      y: Math.random() * height,
      length: Math.random() * 180 + 90,
      speed: (Math.random() * 0.8 + 0.4) * (reducedMotion ? 0.2 : 1),
      angle: (Math.random() - 0.5) * 0.35, // slight tilt
      alpha: Math.random() * 0.25 + 0.1,
      width: Math.random() * 1.2 + 0.6,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Mouse parallax shift
      const pX = reducedMotion ? 0 : mousePos.x * 12;
      const pY = reducedMotion ? 0 : mousePos.y * 12;

      // 1. Draw glowing data streams
      streams.forEach((stream) => {
        stream.y += stream.speed;
        if (stream.y - stream.length > height) {
          stream.y = -stream.length;
          stream.x = Math.random() * width;
        }

        const grad = ctx.createLinearGradient(
          stream.x + pX * 0.3,
          stream.y - stream.length + pY * 0.3,
          stream.x + stream.angle * stream.length + pX * 0.3,
          stream.y + pY * 0.3
        );
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.7, `rgba(6, 182, 212, ${stream.alpha})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = stream.width;
        ctx.beginPath();
        ctx.moveTo(stream.x + pX * 0.3, stream.y - stream.length + pY * 0.3);
        ctx.lineTo(
          stream.x + stream.angle * stream.length + pX * 0.3,
          stream.y + pY * 0.3
        );
        ctx.stroke();

        // Lead particle for the stream
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(
          stream.x + stream.angle * stream.length + pX * 0.3,
          stream.y + pY * 0.3,
          stream.width * 1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // 2. Draw computational particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha =
          p.alpha * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset));
        const drawX = p.x + pX * p.depth;
        const drawY = p.y + pY * p.depth;

        ctx.fillStyle = `rgba(6, 182, 212, ${currentAlpha * 0.85})`;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = p.depth > 0.6 ? 4 : 0;

        if (p.isHex) {
          // Draw tiny tech cross
          const arm = p.size * 1.4;
          ctx.beginPath();
          ctx.moveTo(drawX - arm, drawY);
          ctx.lineTo(drawX + arm, drawY);
          ctx.moveTo(drawX, drawY - arm);
          ctx.lineTo(drawX, drawY + arm);
          ctx.strokeStyle = `rgba(56, 189, 248, ${currentAlpha * 0.9})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * p.depth, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;

      // 3. Draw rare dynamic network connections between close nodes
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 7200) {
            // ~85px threshold
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 85) * 0.16;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(
              particles[i].x + pX * particles[i].depth,
              particles[i].y + pY * particles[i].depth
            );
            ctx.lineTo(
              particles[j].x + pX * particles[j].depth,
              particles[j].y + pY * particles[j].depth
            );
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, reducedMotion]);

  // Compute parallax transforms for static CSS/SVG layers
  const gridX = reducedMotion ? 0 : mousePos.x * -4;
  const gridY = reducedMotion ? 0 : mousePos.y * -4;
  const orbX = reducedMotion ? 0 : mousePos.x * -7;
  const orbY = reducedMotion ? 0 : mousePos.y * -7;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* LAYER 1: BASE DEEP-NAVY ENVIRONMENT & ATMOSPHERIC GRADIENTS */}
      <div className="absolute inset-0 bg-[#020612]" />

      {/* Atmospheric deep cyan / indigo radial glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,rgba(14,165,233,0.03)_40%,transparent_75%)] pointer-events-none" />

      {/* Subtle secondary amber warmth in far top-right horizon */}
      <div className="absolute top-0 right-0 w-[550px] h-[400px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* LAYER 2: DIGITAL PERSPECTIVE GRID (Slow subtle drift & perspective plane) */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${gridX}px, ${gridY}px, 0)`,
        }}
      >
        {/* Top/Back Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Perspective Ground Grid (Bottom floor plane with horizon fade) */}
        <div
          className="absolute bottom-0 inset-x-0 h-[48%] opacity-[0.14] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transform: 'perspective(450px) rotateX(65deg) translateY(60px)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 15%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 15%, transparent 95%)',
          }}
        />
      </div>

      {/* LAYER 3: COMPUTATIONAL PARTICLES & DATA STREAMS CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* LAYER 4: ORBITAL BACKGROUND SYSTEM (Concentric SVG rings rotating in depth) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) translate3d(${orbX}px, ${orbY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full opacity-[0.16] animate-[spin_120s_linear_infinite]"
        >
          <circle
            cx="400"
            cy="400"
            r="380"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="400"
            cy="400"
            r="310"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="1"
            strokeDasharray="12 24"
          />
          <circle
            cx="400"
            cy="400"
            r="230"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="0.8"
            strokeDasharray="2 6"
          />
          {/* Orbital nodes traveling along circumference */}
          <circle cx="780" cy="400" r="3.5" fill="#00F0FF" />
          <circle cx="90" cy="400" r="2.5" fill="#38BDF8" />
          <circle cx="400" cy="90" r="3" fill="#F59E0B" />
          <circle cx="400" cy="710" r="2" fill="#06B6D4" />
        </svg>

        {/* Counter-rotating secondary elliptical ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 600 600"
            className="w-[620px] h-[620px] opacity-[0.12] animate-[spin_90s_linear_infinite_reverse]"
            style={{ transform: 'rotateX(55deg) rotateY(15deg)' }}
          >
            <circle
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="1.2"
              strokeDasharray="8 16"
            />
            <circle
              cx="300"
              cy="300"
              r="210"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.8"
              strokeDasharray="3 6"
            />
            <circle cx="580" cy="300" r="3" fill="#00F0FF" />
            <circle cx="20" cy="300" r="2" fill="#FBBF24" />
          </svg>
        </div>
      </div>

      {/* Deep Vignette: Darkens extreme edges for high-contrast HUD legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,18,0.92)_95%)] pointer-events-none" />
    </div>
  );
};
