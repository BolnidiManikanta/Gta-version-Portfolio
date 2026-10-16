import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, Sparkles } from 'lucide-react';

interface CenterpieceGlobeProps {
  mousePos?: { x: number; y: number };
  activeSectorName?: string;
  activeSectorId?: string;
  selectedSkillName?: string;
  totalSkillsCount?: number;
}

const SECTOR_PIPELINES: Record<string, { id: string; label: string; color: string }[]> = {
  all: [
    { id: 'ideas', label: 'IDEAS', color: 'text-cyan-300' },
    { id: 'code', label: 'CODE', color: 'text-sky-300' },
    { id: 'secure', label: 'SECURE', color: 'text-emerald-400' },
    { id: 'build', label: 'BUILD', color: 'text-amber-400' },
    { id: 'deploy', label: 'DEPLOY', color: 'text-indigo-300' },
    { id: 'impact', label: 'IMPACT', color: 'text-cyan-200' },
  ],
  'ai-ml': [
    { id: 'data', label: 'DATA STREAMS', color: 'text-purple-300' },
    { id: 'neural', label: 'NEURAL TENSORS', color: 'text-fuchsia-300' },
    { id: 'cv-nlp', label: 'VISION & NLP', color: 'text-cyan-300' },
    { id: 'models', label: 'MODEL EVAL', color: 'text-amber-400' },
    { id: 'inference', label: 'AI INFERENCE', color: 'text-purple-200' },
    { id: 'systems', label: 'AI SYSTEMS', color: 'text-cyan-200' },
  ],
  cybersecurity: [
    { id: 'recon', label: 'THREAT AUDIT', color: 'text-rose-400' },
    { id: 'pen', label: 'PENETRATION TEST', color: 'text-amber-400' },
    { id: 'crypto', label: 'ENCRYPTION', color: 'text-cyan-300' },
    { id: 'forensics', label: 'FORENSICS', color: 'text-purple-300' },
    { id: 'defense', label: 'ZERO TRUST DEFENSE', color: 'text-emerald-400' },
    { id: 'secops', label: 'SECURE MATRIX', color: 'text-rose-300' },
  ],
  programming: [
    { id: 'syntax', label: 'SYNTAX & TYPES', color: 'text-amber-400' },
    { id: 'algo', label: 'ALGORITHMS', color: 'text-cyan-300' },
    { id: 'compile', label: 'COMPILATION', color: 'text-sky-300' },
    { id: 'debug', label: 'PROFILING & RUN', color: 'text-amber-300' },
    { id: 'test', label: 'TEST SUITE', color: 'text-emerald-400' },
    { id: 'prod', label: 'OPTIMIZED BINARY', color: 'text-cyan-200' },
  ],
  fullstack: [
    { id: 'ui', label: 'CLIENT FRONTEND', color: 'text-cyan-300' },
    { id: 'api', label: 'REST / RPC API', color: 'text-sky-300' },
    { id: 'logic', label: 'BACKEND SERVICES', color: 'text-emerald-400' },
    { id: 'state', label: 'STATE ARCHITECTURE', color: 'text-amber-400' },
    { id: 'db', label: 'PERSISTENCE LAYER', color: 'text-indigo-300' },
    { id: 'app', label: 'DISTRIBUTED APP', color: 'text-cyan-200' },
  ],
  databases: [
    { id: 'schema', label: 'SCHEMA DDL', color: 'text-amber-400' },
    { id: 'acid', label: 'ACID TRANSACTIONS', color: 'text-emerald-400' },
    { id: 'index', label: 'B-TREE INDEXING', color: 'text-cyan-300' },
    { id: 'query', label: 'QUERY PLANNER', color: 'text-sky-300' },
    { id: 'cluster', label: 'HIGH AVAILABILITY', color: 'text-indigo-300' },
    { id: 'data', label: 'DATA INTEGRITY', color: 'text-amber-300' },
  ],
  'cloud-devops': [
    { id: 'oci', label: 'OCI CONTAINERS', color: 'text-emerald-400' },
    { id: 'orchestrate', label: 'KUBERNETES MESH', color: 'text-cyan-300' },
    { id: 'cicd', label: 'CI/CD PIPELINE', color: 'text-sky-300' },
    { id: 'infra', label: 'INFRA AS CODE', color: 'text-amber-400' },
    { id: 'monitor', label: 'TELEMETRY & LOGS', color: 'text-purple-300' },
    { id: 'cloud', label: 'CLOUD CLUSTER', color: 'text-emerald-300' },
  ],
  tools: [
    { id: 'env', label: 'DEV ENVIRONMENT', color: 'text-sky-300' },
    { id: 'git', label: 'GIT VCS FLOW', color: 'text-amber-400' },
    { id: 'cli', label: 'CLI & SHELL TOOLS', color: 'text-cyan-300' },
    { id: 'lint', label: 'ANALYZER & LINT', color: 'text-purple-300' },
    { id: 'build', label: 'BUNDLER & BUILD', color: 'text-emerald-400' },
    { id: 'suite', label: 'TOOLCHAIN SUITE', color: 'text-sky-200' },
  ],
};

export const CenterpieceGlobe: React.FC<CenterpieceGlobeProps> = ({
  mousePos = { x: 0, y: 0 },
  activeSectorName = 'ALL SECTORS',
  activeSectorId = 'all',
  selectedSkillName,
  totalSkillsCount = 49,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef(mousePos);
  mouseRef.current = mousePos;
  const [activeStep, setActiveStep] = useState(0);

  const currentPipeline = SECTOR_PIPELINES[activeSectorId] || SECTOR_PIPELINES.all;

  // Soft pipeline animation interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentPipeline.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [currentPipeline.length]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Theme color for active sector
    const sectorWireColors: Record<string, number> = {
      all: 0x00f0ff,
      'ai-ml': 0xa855f7,
      cybersecurity: 0xf43f5e,
      programming: 0xf59e0b,
      fullstack: 0x06b6d4,
      databases: 0xeab308,
      'cloud-devops': 0x10b981,
      tools: 0x38bdf8,
    };
    const wireColor = sectorWireColors[activeSectorId] || 0x00f0ff;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Digital Wireframe Sphere (Inner & Outer)
    const globeRadius = 5.2;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 24, 20);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframeSphere);

    // Inner Glowing Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius * 0.94, 20, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x032147,
      transparent: true,
      opacity: 0.65,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerMat);
    globeGroup.add(innerSphere);

    // 2. Latitude and Longitude Rings
    const ringCount = 7;
    for (let i = 0; i < ringCount; i++) {
      const phi = ((i + 1) / (ringCount + 1)) * Math.PI - Math.PI / 2;
      const r = globeRadius * Math.cos(phi);
      const y = globeRadius * Math.sin(phi);

      const latRingGeo = new THREE.BufferGeometry();
      const segments = 48;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      latRingGeo.setFromPoints(points);
      const latRingMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
      });
      const latRing = new THREE.Line(latRingGeo, latRingMat);
      globeGroup.add(latRing);
    }

    // 3. Glowing Data Nodes on the Globe Surface
    const nodeCount = 38;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution for aesthetic uniform placement
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      // Color variation: mostly cyan/sky, a few gold
      if (i % 6 === 0) {
        // Gold / Amber
        nodeColors[i * 3] = 0.98;
        nodeColors[i * 3 + 1] = 0.75;
        nodeColors[i * 3 + 2] = 0.15;
      } else {
        // Electric Cyan
        nodeColors[i * 3] = 0.0;
        nodeColors[i * 3 + 1] = 0.94;
        nodeColors[i * 3 + 2] = 1.0;
      }
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(nodePoints);

    // 4. Moving Energy Paths / Arcs Across the Globe
    const arcCount = 5;
    const arcs: { curve: THREE.QuadraticBezierCurve3; line: THREE.Line; runner: THREE.Mesh }[] = [];

    for (let a = 0; a < arcCount; a++) {
      const idxA = (a * 7) % nodeCount;
      const idxB = (a * 7 + 13) % nodeCount;

      const pA = new THREE.Vector3(
        nodePositions[idxA * 3],
        nodePositions[idxA * 3 + 1],
        nodePositions[idxA * 3 + 2]
      );
      const pB = new THREE.Vector3(
        nodePositions[idxB * 3],
        nodePositions[idxB * 3 + 1],
        nodePositions[idxB * 3 + 2]
      );

      const mid = pA.clone().add(pB).multiplyScalar(0.5);
      const midElevated = mid.clone().normalize().multiplyScalar(globeRadius * 1.35);

      const curve = new THREE.QuadraticBezierCurve3(pA, midElevated, pB);
      const curvePoints = curve.getPoints(32);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: a % 2 === 0 ? 0x00f0ff : 0xf59e0b,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(line);

      // Moving photon light runner
      const runnerGeo = new THREE.SphereGeometry(0.16, 8, 8);
      const runnerMat = new THREE.MeshBasicMaterial({
        color: a % 2 === 0 ? 0x22d3ee : 0xfbbf24,
      });
      const runner = new THREE.Mesh(runnerGeo, runnerMat);
      globeGroup.add(runner);

      arcs.push({ curve, line, runner });
    }

    // 5. Tilted Gyroscopic Orbital Rings
    const orbitGroup = new THREE.Group();
    globeGroup.add(orbitGroup);

    // Ring A: Equator-ish tilted ring
    const ringRadiusA = globeRadius * 1.38;
    const ringGeoA = new THREE.RingGeometry(ringRadiusA, ringRadiusA + 0.05, 64);
    const ringMatA = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ringA = new THREE.Mesh(ringGeoA, ringMatA);
    ringA.rotation.x = Math.PI / 2.8;
    orbitGroup.add(ringA);

    // Ring B: Orthogonal tilted dotted ring
    const ringRadiusB = globeRadius * 1.55;
    const ringGeoB = new THREE.BufferGeometry();
    const ringPointsB: THREE.Vector3[] = [];
    for (let k = 0; k <= 72; k++) {
      const th = (k / 72) * Math.PI * 2;
      ringPointsB.push(new THREE.Vector3(Math.cos(th) * ringRadiusB, 0, Math.sin(th) * ringRadiusB));
    }
    ringGeoB.setFromPoints(ringPointsB);
    const ringMatB = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.3,
      gapSize: 0.2,
      transparent: true,
      opacity: 0.4,
    });
    const ringB = new THREE.Line(ringGeoB, ringMatB);
    ringB.computeLineDistances();
    ringB.rotation.x = -Math.PI / 3.2;
    ringB.rotation.z = Math.PI / 5;
    orbitGroup.add(ringB);

    // 6. Surrounding Ambient Particles
    const starCount = 140;
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      const r = globeRadius * (1.3 + Math.random() * 1.8);
      const p = Math.random() * Math.PI * 2;
      const t = Math.acos(Math.random() * 2 - 1);
      starPositions[s * 3] = r * Math.sin(t) * Math.cos(p);
      starPositions[s * 3 + 1] = r * Math.sin(t) * Math.sin(p);
      starPositions[s * 3 + 2] = r * Math.cos(t);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.6,
    });
    const starField = new THREE.Points(starGeo, starMat);
    globeGroup.add(starField);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle, smooth continuous rotation
      globeGroup.rotation.y = elapsedTime * 0.12;

      // Mouse parallax tilt
      globeGroup.rotation.x = THREE.MathUtils.lerp(
        globeGroup.rotation.x,
        mouseRef.current.y * -0.25,
        0.05
      );
      globeGroup.rotation.z = THREE.MathUtils.lerp(
        globeGroup.rotation.z,
        mouseRef.current.x * 0.25,
        0.05
      );

      // Gyroscopic counter-rotation
      orbitGroup.rotation.z = elapsedTime * -0.08;

      // Move energy arc photons
      arcs.forEach((arc, i) => {
        const t = (elapsedTime * 0.35 + i * 0.2) % 1;
        const pos = arc.curve.getPoint(t);
        arc.runner.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeSectorId]);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] flex items-center justify-center select-none overflow-visible">
      {/* Three.js 3D WebGL Globe Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Ambient Radial Glow Behind Globe */}
      <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-sky-500/15 to-transparent blur-3xl pointer-events-none" />

      {/* =========================================================================
          SECTION 11: SUBTLE CENTRAL HOLOGRAPHIC CORE
          "Behind/in front of the globe create a subtle central holographic core.
           Text: IDEAS CODE SECURE BUILD DEPLOY IMPACT
           Animate the text softly. Do NOT make this overpower the globe."
          ========================================================================= */}
      <div
        className="relative z-10 w-[210px] sm:w-[240px] rounded-2xl backdrop-blur-md bg-[#020716]/65 border border-cyan-500/35 p-3.5 shadow-[0_0_28px_rgba(6,182,212,0.22),inset_0_0_15px_rgba(6,182,212,0.08)] flex flex-col items-center justify-between pointer-events-auto transition-all"
        style={{
          boxShadow: '0 0 25px rgba(6,182,212,0.22), inset 0 0 16px rgba(6,182,212,0.06)',
        }}
      >
        {/* Subtle Scanline Overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 animate-[scanline_5s_linear_infinite]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Top Header inside Core */}
        <div className="w-full flex items-center justify-between border-b border-cyan-500/20 pb-1.5 z-10">
          <div className="flex items-center gap-1.5 truncate max-w-[150px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22D3EE] shrink-0" />
            <span className="font-mono text-[9px] tracking-widest text-cyan-300 font-bold uppercase truncate">
              {selectedSkillName ? `FOCUS: ${selectedSkillName}` : 'CENTRAL CORE'}
            </span>
          </div>
          <span className="font-mono text-[8px] text-cyan-400/80 bg-cyan-950/70 border border-cyan-500/30 px-1.5 py-0.2 rounded shrink-0">
            {activeSectorId !== 'all' ? activeSectorId.toUpperCase() : 'NODE.49'}
          </span>
        </div>

        {/* Center Pipeline Display based on Active Sector */}
        <div className="w-full flex flex-col items-center justify-center py-2 z-10 gap-0.5">
          {currentPipeline.map((stage, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <React.Fragment key={stage.id}>
                <div
                  className={`w-full max-w-[170px] py-0.5 px-2.5 rounded transition-all duration-300 flex items-center justify-between ${
                    isCurrent
                      ? 'bg-cyan-500/25 border border-cyan-400/70 shadow-[0_0_10px_rgba(6,182,212,0.4)] scale-105'
                      : 'bg-black/25 border border-cyan-500/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isCurrent
                          ? 'bg-cyan-300 shadow-[0_0_6px_#00F0FF]'
                          : 'bg-slate-600'
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] font-bold tracking-widest transition-colors ${
                        isCurrent
                          ? 'text-cyan-200 drop-shadow-[0_0_6px_#00F0FF]'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>

                  {isCurrent && (
                    <span className="flex items-center text-[8px] font-mono font-bold text-amber-400 tracking-wider">
                      <Sparkles className="w-2 h-2 mr-0.5 animate-spin" />
                      ACTIVE
                    </span>
                  )}
                </div>

                {idx < currentPipeline.length - 1 && (
                  <ArrowDown
                    className={`w-2.5 h-2.5 transition-colors ${
                      isCurrent ? 'text-cyan-300 animate-bounce' : 'text-cyan-500/20'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Core Telemetry */}
        <div className="w-full pt-1.5 border-t border-cyan-500/20 flex items-center justify-between z-10 font-mono text-[8px]">
          <span className="text-slate-400 uppercase truncate max-w-[110px]">
            {activeSectorName}
          </span>
          <span className="text-cyan-300 font-bold">
            {totalSkillsCount} VERIFIED
          </span>
        </div>

        {/* Futuristic Corner Tech Markers */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-cyan-400 pointer-events-none" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-cyan-400 pointer-events-none" />
      </div>
    </div>
  );
};
