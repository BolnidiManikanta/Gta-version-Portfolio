import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeSkillEnvironmentProps {
  mousePos: { x: number; y: number };
  reducedMotion?: boolean;
  coreElementRef?: React.RefObject<HTMLDivElement | null>;
}

export const ThreeSkillEnvironment: React.FC<ThreeSkillEnvironmentProps> = ({
  mousePos,
  reducedMotion = false,
  coreElementRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const foregroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // WebGL 3D Scene Initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020612, 0.0016);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Texture Generator Helper for Soft Luminous Particle Glow
    const createParticleTexture = (color = '#00F0FF') => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.2, color);
      gradient.addColorStop(0.55, 'rgba(6, 182, 212, 0.45)');
      gradient.addColorStop(1, 'rgba(2, 6, 18, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const cyanTexture = createParticleTexture('#00F0FF');
    const goldTexture = createParticleTexture('#F59E0B');

    // =========================================================================
    // 3. CINEMATIC LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x051329, 1.4);
    scene.add(ambientLight);

    // Primary Cyan PointLight (positioned at the Core)
    const corePointLight = new THREE.PointLight(0x00f0ff, 4.0, 75);
    corePointLight.position.set(0, 5, 0);
    scene.add(corePointLight);

    // Secondary Warm Amber PointLight (Lower Right depth)
    const amberPointLight = new THREE.PointLight(0xf59e0b, 2.2, 85);
    amberPointLight.position.set(28, -15, -15);
    scene.add(amberPointLight);

    // Deep Sky Blue Accent Light (Left depth)
    const bluePointLight = new THREE.PointLight(0x0284c7, 2.8, 80);
    bluePointLight.position.set(-30, 10, -20);
    scene.add(bluePointLight);

    // Sweeping Scanning Spot Beam
    const scanSpotLight = new THREE.SpotLight(0x00f0ff, 3.5, 90, Math.PI / 6, 0.4);
    scanSpotLight.position.set(0, 40, 20);
    scanSpotLight.target.position.set(0, 0, -20);
    scene.add(scanSpotLight);
    scene.add(scanSpotLight.target);

    // =========================================================================
    // 4. DEPTH 1: FAR BACKGROUND (Holographic Architecture & Monolithic Towers)
    // =========================================================================
    const farArchitectureGroup = new THREE.Group();
    scene.add(farArchitectureGroup);

    // Server-like vertical computational pillars in distant fog
    const pillarGeometry = new THREE.BoxGeometry(3, 40, 3);
    const pillarEdges = new THREE.EdgesGeometry(pillarGeometry);
    const pillarLineMaterial = new THREE.LineBasicMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.22,
    });

    const towerCount = 14;
    for (let i = 0; i < towerCount; i++) {
      const lineMesh = new THREE.LineSegments(pillarEdges, pillarLineMaterial);
      const angle = (i / towerCount) * Math.PI * 2;
      const radius = 65 + (i % 3) * 15;
      lineMesh.position.x = Math.cos(angle) * radius;
      lineMesh.position.y = ((i % 4) - 1.5) * 12;
      lineMesh.position.z = -70 - (i % 4) * 20;
      lineMesh.scale.set(1 + (i % 2) * 0.5, 0.8 + (i % 3) * 0.4, 1 + (i % 2) * 0.5);
      farArchitectureGroup.add(lineMesh);
    }

    // Infinite Digital Horizon Floor Grid
    const gridHelper = new THREE.GridHelper(260, 60, 0x00f0ff, 0x0c4a6e);
    gridHelper.position.set(0, -32, -30);
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.16;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.16;
    }
    scene.add(gridHelper);

    // Far Particle Dust
    const farParticleCount = 650;
    const farParticleGeo = new THREE.BufferGeometry();
    const farPositions = new Float32Array(farParticleCount * 3);
    const farColors = new Float32Array(farParticleCount * 3);

    for (let i = 0; i < farParticleCount; i++) {
      farPositions[i * 3] = (Math.random() - 0.5) * 180;
      farPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      farPositions[i * 3 + 2] = -120 + Math.random() * 80;

      // Mostly deep cyan / blue, occasional faint amber
      if (Math.random() > 0.85) {
        farColors[i * 3] = 0.96;
        farColors[i * 3 + 1] = 0.62;
        farColors[i * 3 + 2] = 0.04;
      } else {
        farColors[i * 3] = 0.02;
        farColors[i * 3 + 1] = 0.7;
        farColors[i * 3 + 2] = 0.9;
      }
    }

    farParticleGeo.setAttribute('position', new THREE.BufferAttribute(farPositions, 3));
    farParticleGeo.setAttribute('color', new THREE.BufferAttribute(farColors, 3));

    const farParticleMat = new THREE.PointsMaterial({
      size: 1.6,
      map: cyanTexture,
      transparent: true,
      opacity: 0.45,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const farPoints = new THREE.Points(farParticleGeo, farParticleMat);
    scene.add(farPoints);

    // =========================================================================
    // 5. DEPTH 2: MID BACKGROUND (Huge Translucent Orbital Rings & Circular Structures)
    // =========================================================================
    const orbitalSystemGroup = new THREE.Group();
    scene.add(orbitalSystemGroup);

    interface OrbitalRingData {
      mesh: THREE.Object3D;
      speed: number;
      rotAxis: 'x' | 'y' | 'z';
    }
    const orbitalRings: OrbitalRingData[] = [];

    // Helper to generate a segmented technical ring with node markers
    const createTechRing = (
      radius: number,
      tube: number,
      color: number,
      opacity: number,
      tiltX: number,
      tiltY: number,
      speed: number,
      dashLength = 48
    ) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.x = tiltX;
      ringGroup.rotation.y = tiltY;

      // Thin Torus Line
      const torusGeo = new THREE.TorusGeometry(radius, tube, 8, dashLength);
      const torusMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        wireframe: true,
        blending: THREE.AdditiveBlending,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      ringGroup.add(torusMesh);

      // Add 2-4 glowing technical nodes along the ring
      const nodeCount = 3;
      for (let n = 0; n < nodeCount; n++) {
        const theta = (n / nodeCount) * Math.PI * 2;
        const nodeGeo = new THREE.SphereGeometry(0.35, 8, 8);
        const nodeMat = new THREE.MeshBasicMaterial({
          color: n === 0 ? 0xf59e0b : 0x00f0ff,
          blending: THREE.AdditiveBlending,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
        ringGroup.add(nodeMesh);
      }

      orbitalSystemGroup.add(ringGroup);
      orbitalRings.push({ mesh: ringGroup, speed, rotAxis: 'z' });
      return ringGroup;
    };

    // Ring 1: Giant Horizon Orbital Ring (Radius 48, 70s period)
    createTechRing(48, 0.08, 0x0284c7, 0.18, Math.PI / 2.3, 0.2, 0.0009);

    // Ring 2: Central Tilted Ring (Radius 36, 50s period)
    createTechRing(36, 0.09, 0x00f0ff, 0.28, Math.PI / 3, -0.3, -0.0013);

    // Ring 3: Core Surrounding Ring (Radius 24, 35s period)
    createTechRing(24, 0.07, 0x38bdf8, 0.35, -Math.PI / 4, 0.4, 0.0018);

    // Ring 4: Inner High-Speed Ring (Radius 16, 20s period)
    createTechRing(16, 0.06, 0x00f0ff, 0.4, Math.PI / 5, -0.15, -0.0031);

    // Mid Particle Cloud
    const midParticleCount = 350;
    const midParticleGeo = new THREE.BufferGeometry();
    const midPositions = new Float32Array(midParticleCount * 3);
    const midSpeeds = new Float32Array(midParticleCount);

    for (let i = 0; i < midParticleCount; i++) {
      midPositions[i * 3] = (Math.random() - 0.5) * 110;
      midPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      midPositions[i * 3 + 2] = -40 + Math.random() * 45;
      midSpeeds[i] = 0.04 + Math.random() * 0.08;
    }

    midParticleGeo.setAttribute('position', new THREE.BufferAttribute(midPositions, 3));
    const midParticleMat = new THREE.PointsMaterial({
      size: 1.9,
      map: cyanTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const midPoints = new THREE.Points(midParticleGeo, midParticleMat);
    scene.add(midPoints);

    // =========================================================================
    // 6. CENTRAL 3D SKILL CORE / GLOWING NEURAL NETWORK GLOBE (Behind Core Matrix)
    // =========================================================================
    const neuralGlobeGroup = new THREE.Group();
    // Positioned directly in line with Core Matrix
    neuralGlobeGroup.position.set(0, 5, -2);
    scene.add(neuralGlobeGroup);

    // 6a. Latitude / Longitude Digital Wireframe Globe
    const globeRadius = 6.2;
    const globeWireGeo = new THREE.SphereGeometry(globeRadius, 24, 18);
    const globeWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const globeWireMesh = new THREE.Mesh(globeWireGeo, globeWireMat);
    neuralGlobeGroup.add(globeWireMesh);

    // 6b. Inner Glowing Core Energy Sphere
    const innerCoreGeo = new THREE.SphereGeometry(globeRadius * 0.62, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x0891b2,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    neuralGlobeGroup.add(innerCoreMesh);

    // 6c. Neural Network Synaptic Nodes & Connection Lines
    const nodeCount = 180;
    const nodePositions: THREE.Vector3[] = [];

    // Distribute nodes evenly on sphere surface (Fibonacci sphere)
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const r = globeRadius * (0.95 + Math.random() * 0.1);
      nodePositions.push(new THREE.Vector3(x * r, y * r, z * r));
    }

    // Node Point Cloud
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodePositions);
    const nodeMat = new THREE.PointsMaterial({
      size: 1.4,
      map: cyanTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    neuralGlobeGroup.add(nodePoints);

    // Synaptic Lines connecting nearby nodes
    const linePositions: number[] = [];
    const maxConnectionDist = 2.4;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < maxConnectionDist) {
          linePositions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );
        }
      }
    }

    const synapseGeo = new THREE.BufferGeometry();
    synapseGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const synapseMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const synapseLines = new THREE.LineSegments(synapseGeo, synapseMat);
    neuralGlobeGroup.add(synapseLines);

    // 6d. Close Gyroscopic Micro-Rings around Neural Globe
    const microRing1Geo = new THREE.TorusGeometry(globeRadius * 1.25, 0.04, 6, 40);
    const microRing1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const microRing1 = new THREE.Mesh(microRing1Geo, microRing1Mat);
    microRing1.rotation.x = Math.PI / 2.6;
    neuralGlobeGroup.add(microRing1);

    const microRing2Geo = new THREE.TorusGeometry(globeRadius * 1.38, 0.03, 6, 40);
    const microRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const microRing2 = new THREE.Mesh(microRing2Geo, microRing2Mat);
    microRing2.rotation.x = -Math.PI / 3;
    microRing2.rotation.y = Math.PI / 6;
    neuralGlobeGroup.add(microRing2);

    // =========================================================================
    // 7. 3D FLOWING DATA STREAMS (Curves Traveling Through Space)
    // =========================================================================
    const dataStreamGroup = new THREE.Group();
    scene.add(dataStreamGroup);

    interface StreamPath {
      curve: THREE.CatmullRomCurve3;
      headMesh: THREE.Mesh;
      progress: number;
      speed: number;
    }
    const streams: StreamPath[] = [];

    const streamConfigs = [
      { start: [-35, -20, -10], mid: [-12, 0, 5], end: [10, 25, -25], speed: 0.0018 },
      { start: [35, -25, -5], mid: [15, -5, 2], end: [-15, 30, -30], speed: 0.0022 },
      { start: [-25, 25, -15], mid: [-5, 8, 8], end: [28, -18, -10], speed: 0.0015 },
      { start: [20, 28, -20], mid: [2, 10, 6], end: [-25, -22, -15], speed: 0.002 },
      { start: [-40, -5, -25], mid: [0, -12, 10], end: [40, 15, -20], speed: 0.0016 },
    ];

    streamConfigs.forEach((cfg) => {
      const p0 = new THREE.Vector3(cfg.start[0], cfg.start[1], cfg.start[2]);
      const p1 = new THREE.Vector3(cfg.mid[0], cfg.mid[1], cfg.mid[2]);
      const p2 = new THREE.Vector3(cfg.end[0], cfg.end[1], cfg.end[2]);
      const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);

      // Path curve tube line
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.03, 4, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      dataStreamGroup.add(tubeMesh);

      // Glowing traveling node head
      const headGeo = new THREE.SphereGeometry(0.3, 8, 8);
      const headMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.3 ? 0x00f0ff : 0xf59e0b,
        blending: THREE.AdditiveBlending,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      dataStreamGroup.add(headMesh);

      streams.push({
        curve,
        headMesh,
        progress: Math.random(),
        speed: cfg.speed,
      });
    });

    // =========================================================================
    // 8. DEPTH 4: FOREGROUND FLOATING PARTICLES (Near Camera, in front of UI plane)
    // =========================================================================
    const fgParticleCount = 75;
    const fgParticleGeo = new THREE.BufferGeometry();
    const fgPositions = new Float32Array(fgParticleCount * 3);
    const fgColors = new Float32Array(fgParticleCount * 3);

    for (let i = 0; i < fgParticleCount; i++) {
      fgPositions[i * 3] = (Math.random() - 0.5) * 55;
      fgPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      // Z between 15 and 35 (in front of the main UI focus plane at Z=0)
      fgPositions[i * 3 + 2] = 12 + Math.random() * 26;

      if (Math.random() > 0.85) {
        fgColors[i * 3] = 0.98;
        fgColors[i * 3 + 1] = 0.72;
        fgColors[i * 3 + 2] = 0.1;
      } else {
        fgColors[i * 3] = 0.1;
        fgColors[i * 3 + 1] = 0.85;
        fgColors[i * 3 + 2] = 1.0;
      }
    }

    fgParticleGeo.setAttribute('position', new THREE.BufferAttribute(fgPositions, 3));
    fgParticleGeo.setAttribute('color', new THREE.BufferAttribute(fgColors, 3));

    const fgParticleMat = new THREE.PointsMaterial({
      size: 2.8,
      map: cyanTexture,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fgPoints = new THREE.Points(fgParticleGeo, fgParticleMat);
    scene.add(fgPoints);

    // =========================================================================
    // 9. ANIMATION & RENDER LOOP WITH CAMERA PARALLAX & SCROLL DEPTH
    // =========================================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    // Lerped camera target coordinates
    let currentCamX = 0;
    let currentCamY = 0;
    let currentCamZ = 45;

    // Window scroll tracking
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // 9a. Smooth Mouse Parallax Lerp
      const targetX = reducedMotion ? 0 : mousePos.x * 3.8;
      const targetY = reducedMotion ? 0 : -mousePos.y * 2.6;

      // Scroll depth translation: as user scrolls down, camera moves deeper into scene
      const scrollFactor = Math.min(scrollY / 1000, 1.5);
      const targetZ = 45 - scrollFactor * 10;
      const targetCamYWithScroll = targetY - scrollFactor * 6;

      // Subtle breathing idle camera drift (Lissajous organic float)
      const idleFloatX = Math.sin(time * 0.35) * 0.45;
      const idleFloatY = Math.cos(time * 0.28) * 0.35;

      currentCamX += (targetX + idleFloatX - currentCamX) * 0.05;
      currentCamY += (targetCamYWithScroll + idleFloatY - currentCamY) * 0.05;
      currentCamZ += (targetZ - currentCamZ) * 0.05;

      camera.position.x = currentCamX;
      camera.position.y = currentCamY;
      camera.position.z = currentCamZ;

      // Look slightly at the center of the vault
      camera.lookAt(currentCamX * 0.15, currentCamY * 0.15 + 2, 0);

      // 9b. Rotate Orbital Rings at Different Unsynchronized Speeds
      if (!reducedMotion) {
        orbitalRings.forEach((ring) => {
          ring.mesh.rotation.z += ring.speed;
        });

        // 9c. Rotate & Pulse Central Neural Skill Core
        neuralGlobeGroup.rotation.y += 0.003;
        neuralGlobeGroup.rotation.x = Math.sin(time * 0.4) * 0.08;
        microRing1.rotation.z += 0.012;
        microRing2.rotation.z -= 0.009;

        // Subtle core pulsation
        const pulseScale = 1.0 + Math.sin(time * 1.8) * 0.03;
        innerCoreMesh.scale.set(pulseScale, pulseScale, pulseScale);

        // Core light breathing intensity
        corePointLight.intensity = 3.6 + Math.sin(time * 2.2) * 0.8;

        // 9d. Animate Data Stream Heads along 3D splines
        streams.forEach((stream) => {
          stream.progress = (stream.progress + stream.speed) % 1;
          const pos = stream.curve.getPointAt(stream.progress);
          stream.headMesh.position.copy(pos);
        });

        // 9e. Periodic Scanning Beam Sweep
        const scanAngle = (time * 0.4) % (Math.PI * 2);
        scanSpotLight.position.x = Math.sin(scanAngle) * 35;
        scanSpotLight.position.z = 20 + Math.cos(scanAngle) * 15;

        // 9f. Distant Architecture & Particles Slow Drift
        farArchitectureGroup.rotation.y += 0.0004;
        farPoints.rotation.y += 0.0003;

        // Drift foreground particles slowly upward
        const fgPositionsArr = fgParticleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < fgParticleCount; i++) {
          fgPositionsArr[i * 3 + 1] += 0.025;
          if (fgPositionsArr[i * 3 + 1] > 28) {
            fgPositionsArr[i * 3 + 1] = -28;
          }
        }
        fgParticleGeo.attributes.position.needsUpdate = true;

        // Drift mid particles
        const midPositionsArr = midParticleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < midParticleCount; i++) {
          midPositionsArr[i * 3 + 1] += 0.015;
          if (midPositionsArr[i * 3 + 1] > 40) {
            midPositionsArr[i * 3 + 1] = -40;
          }
        }
        midParticleGeo.attributes.position.needsUpdate = true;
      }

      // Update 3D Neural Globe World Position based on Core DOM Element if available
      if (coreElementRef?.current) {
        const rect = coreElementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const ndcX = (centerX / width) * 2 - 1;
        const ndcY = -(centerY / height) * 2 + 1;

        // Project into 3D world space at target depth Z = -2
        const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const targetDistance = (-2 - camera.position.z) / dir.z;
        const worldPos = camera.position.clone().add(dir.multiplyScalar(targetDistance));

        // Smoothly position globe behind Core Matrix
        neuralGlobeGroup.position.x += (worldPos.x - neuralGlobeGroup.position.x) * 0.1;
        neuralGlobeGroup.position.y += (worldPos.y - neuralGlobeGroup.position.y) * 0.1;
        corePointLight.position.copy(neuralGlobeGroup.position);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      farParticleGeo.dispose();
      farParticleMat.dispose();
      midParticleGeo.dispose();
      midParticleMat.dispose();
      fgParticleGeo.dispose();
      fgParticleMat.dispose();
      cyanTexture.dispose();
      goldTexture.dispose();
    };
  }, [reducedMotion, coreElementRef]);

  // Foreground Canvas for Subtle Ambient Light Streaks & Scanning Overlay
  useEffect(() => {
    const canvas = foregroundCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let scanY = 0;

    const renderOverlay = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle Scanning Laser Line traversing down screen periodically
      scanY = (scanY + 1.2) % (height + 200);
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradient.addColorStop(0.8, 'rgba(0, 240, 255, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0.12)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, width, 30);

      animId = requestAnimationFrame(renderOverlay);
    };

    renderOverlay();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas Container behind the UI (z-index 0) */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Atmospheric Depth Vignette & Radial Glow (Overlay) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,18,0.7)_90%)]"
      />

      {/* Foreground Subtle Scan Beam Canvas (Over UI, pointer-events-none, z-20) */}
      <canvas
        ref={foregroundCanvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-20"
      />
    </>
  );
};
