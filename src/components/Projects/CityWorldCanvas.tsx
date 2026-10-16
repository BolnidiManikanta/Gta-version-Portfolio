import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ProjectItem } from '../../types';
import { gtaAudio } from '../../utils/audio';

export interface CityProjectLocation {
  project: ProjectItem;
  index: number;
  x: number;
  z: number;
  district: string;
  districtIndex: number;
  buildingName: string;
  rotationY: number;
  color: number;
  accentColor: number;
}

export type PlayerControlMode = 'walking' | 'driving' | 'interior';

interface CityWorldCanvasProps {
  projects: ProjectItem[];
  playerPos: { x: number; z: number; heading: number };
  onUpdatePlayerPos: (pos: { x: number; z: number; heading: number }) => void;
  carPos: { x: number; z: number; heading: number; speed: number };
  onUpdateCarPos: (car: { x: number; z: number; heading: number; speed: number }) => void;
  controlMode: PlayerControlMode;
  onSetControlMode: (mode: PlayerControlMode) => void;
  activeInteriorProject: ProjectItem | null;
  onSetInteriorProject: (proj: ProjectItem | null) => void;
  onProximityChange: (nearest: {
    type: 'project' | 'car' | 'interior_node' | 'interior_exit';
    target: ProjectItem | string;
    distance: number;
    index?: number;
    title: string;
  } | null) => void;
  onDistrictChange: (district: string) => void;
  onSpeedChange: (speedKmh: number) => void;
  waypointProjectId: string | null;
  moveInput: { forward: number; strafe: number; isSprinting: boolean; isJumping: boolean; isHandbraking: boolean };
  onInspectDossier: (proj: ProjectItem) => void;
  cinematicIntro: boolean;
  onCinematicComplete: () => void;
}

export const CityWorldCanvas: React.FC<CityWorldCanvasProps> = ({
  projects,
  playerPos,
  onUpdatePlayerPos,
  carPos,
  onUpdateCarPos,
  controlMode,
  onSetControlMode,
  activeInteriorProject,
  onSetInteriorProject,
  onProximityChange,
  onDistrictChange,
  onSpeedChange,
  waypointProjectId,
  moveInput,
  onInspectDossier,
  cinematicIntro,
  onCinematicComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronized refs for 60fps animation loop
  const moveInputRef = useRef(moveInput);
  moveInputRef.current = moveInput;

  const controlModeRef = useRef(controlMode);
  controlModeRef.current = controlMode;

  const activeInteriorProjectRef = useRef(activeInteriorProject);
  activeInteriorProjectRef.current = activeInteriorProject;

  const waypointProjectIdRef = useRef(waypointProjectId);
  waypointProjectIdRef.current = waypointProjectId;

  const onUpdatePlayerPosRef = useRef(onUpdatePlayerPos);
  onUpdatePlayerPosRef.current = onUpdatePlayerPos;

  const onUpdateCarPosRef = useRef(onUpdateCarPos);
  onUpdateCarPosRef.current = onUpdateCarPos;

  const onProximityChangeRef = useRef(onProximityChange);
  onProximityChangeRef.current = onProximityChange;

  const onDistrictChangeRef = useRef(onDistrictChange);
  onDistrictChangeRef.current = onDistrictChange;

  const onSpeedChangeRef = useRef(onSpeedChange);
  onSpeedChangeRef.current = onSpeedChange;

  const onInspectDossierRef = useRef(onInspectDossier);
  onInspectDossierRef.current = onInspectDossier;

  const onSetControlModeRef = useRef(onSetControlMode);
  onSetControlModeRef.current = onSetControlMode;

  const onSetInteriorProjectRef = useRef(onSetInteriorProject);
  onSetInteriorProjectRef.current = onSetInteriorProject;

  const cinematicIntroRef = useRef(cinematicIntro);
  cinematicIntroRef.current = cinematicIntro;

  const onCinematicCompleteRef = useRef(onCinematicComplete);
  onCinematicCompleteRef.current = onCinematicComplete;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;

    // 1. Scene & Iconic Vice City Golden Sunset Sky
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb45309); // Rich sunset amber
    scene.fog = new THREE.FogExp2(0xb45309, 0.0032);

    // 2. Camera Setup (Perspective tuned for 3rd person immersion)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 650);

    // 3. Renderer Setup with PCFSoftShadowMap & Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig (Golden Sunset Sun + Warm Skylight + Ocean Glow)
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.8);
    scene.add(ambientLight);

    // Directional Sun Light (Low golden angle from ocean side)
    const sunLight = new THREE.DirectionalLight(0xffedd5, 3.1);
    sunLight.position.set(120, 52, -35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 400;
    const shadowSize = 140;
    sunLight.shadow.camera.left = -shadowSize;
    sunLight.shadow.camera.right = shadowSize;
    sunLight.shadow.camera.top = shadowSize;
    sunLight.shadow.camera.bottom = -shadowSize;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0xfde047, 0x1e1b4b, 1.4);
    scene.add(hemiLight);

    // Sunset Sky Hemisphere with Gradient Canvas
    const createSkyDomeTexture = () => {
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const sctx = skyCanvas.getContext('2d');
      if (sctx) {
        const grad = sctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#1e1b4b'); // Deep dusk zenith
        grad.addColorStop(0.3, '#831843'); // Pink-magenta horizon band
        grad.addColorStop(0.65, '#ea580c'); // Warm sunset orange
        grad.addColorStop(0.95, '#fbbf24'); // Golden sun glow
        grad.addColorStop(1, '#fde68a'); // Warm horizon
        sctx.fillStyle = grad;
        sctx.fillRect(0, 0, 512, 512);
      }
      return new THREE.CanvasTexture(skyCanvas);
    };

    const skyGeo = new THREE.SphereGeometry(490, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({ map: createSkyDomeTexture(), side: THREE.BackSide });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);

    // City & Interior Groups
    const cityWorldGroup = new THREE.Group();
    scene.add(cityWorldGroup);

    const interiorGroup = new THREE.Group();
    interiorGroup.position.set(0, -500, 0);
    scene.add(interiorGroup);

    // ==========================================
    // PROCEDURAL HIGH-RES TEXTURE GENERATORS
    // ==========================================

    // A. High-Fidelity Teal Palm-Tree Hawaiian / Streetwear Shirt Texture
    const createTealPalmShirtTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Base tropical turquoise / teal background
        const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
        grad.addColorStop(0, '#0d9488');
        grad.addColorStop(1, '#0891b2');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 1024);

        // Linen cloth weave micro-texture
        ctx.fillStyle = 'rgba(15, 118, 110, 0.25)';
        for (let y = 0; y < 1024; y += 4) {
          ctx.fillRect(0, y, 1024, 2);
        }

        // Draw botanical palm fronds & tropical foliage
        const drawPalmBranch = (cx: number, cy: number, scale: number, rot: number) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);

          // Central curved stem
          ctx.strokeStyle = '#134e4a';
          ctx.lineWidth = 4 * scale;
          ctx.beginPath();
          ctx.moveTo(0, 40 * scale);
          ctx.quadraticCurveTo(15 * scale, 0, 35 * scale, -50 * scale);
          ctx.stroke();

          // Palm leaflets
          ctx.fillStyle = '#065f46'; // Deep emerald leaf
          for (let i = -6; i <= 6; i++) {
            ctx.beginPath();
            ctx.ellipse(
              i * 5 * scale,
              i * 7 * scale,
              18 * scale,
              4.5 * scale,
              i * 0.18 + 0.4,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }

          // Accent leaflets (Lighter sage green)
          ctx.fillStyle = '#10b981';
          for (let i = -5; i <= 5; i += 2) {
            ctx.beginPath();
            ctx.ellipse(
              i * 4 * scale,
              i * 6 * scale,
              12 * scale,
              3.5 * scale,
              i * 0.18 + 0.3,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }

          // Cream/white hibiscus floral accent
          ctx.fillStyle = '#f0fdf4';
          ctx.beginPath();
          ctx.arc(10 * scale, -45 * scale, 6 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(10 * scale, -45 * scale, 2.5 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        // Scatter lush palm branches across shirt
        const leafCoords = [
          { x: 120, y: 150, s: 1.4, r: 0.3 },
          { x: 380, y: 180, s: 1.6, r: -0.7 },
          { x: 680, y: 140, s: 1.5, r: 0.5 },
          { x: 890, y: 220, s: 1.3, r: -0.4 },
          { x: 220, y: 460, s: 1.5, r: 1.1 },
          { x: 520, y: 440, s: 1.7, r: -0.3 },
          { x: 820, y: 480, s: 1.4, r: 0.8 },
          { x: 140, y: 760, s: 1.6, r: -0.6 },
          { x: 440, y: 740, s: 1.5, r: 0.4 },
          { x: 740, y: 780, s: 1.6, r: -0.9 },
          { x: 920, y: 880, s: 1.3, r: 0.6 },
        ];
        leafCoords.forEach((l) => drawPalmBranch(l.x, l.y, l.s, l.r));

        // Center shirt button placket
        ctx.fillStyle = '#0f766e';
        ctx.fillRect(498, 0, 28, 1024);
        ctx.strokeStyle = '#042f2e';
        ctx.lineWidth = 2;
        ctx.strokeRect(498, 0, 28, 1024);

        // Pearlescent white shirt buttons
        for (let b = 100; b < 1000; b += 160) {
          ctx.fillStyle = '#f8fafc';
          ctx.beginPath();
          ctx.arc(512, b, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.arc(512, b, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    // B. High-Fidelity Protagonist Face & Facial Hair Texture
    const createProtagonistFaceTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Base warm medium skin tone
        ctx.fillStyle = '#c68b59';
        ctx.fillRect(0, 0, 1024, 1024);

        // Cheekbone & jaw shading contours
        ctx.fillStyle = 'rgba(160, 95, 50, 0.22)';
        ctx.fillRect(150, 420, 220, 180);
        ctx.fillRect(654, 420, 220, 180);

        // Eyes (White sclera)
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.ellipse(360, 410, 44, 20, 0, 0, Math.PI * 2);
        ctx.ellipse(664, 410, 44, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark Brown Iris
        ctx.fillStyle = '#2c1810';
        ctx.beginPath();
        ctx.arc(360, 410, 18, 0, Math.PI * 2);
        ctx.arc(664, 410, 18, 0, Math.PI * 2);
        ctx.fill();

        // Black Pupil
        ctx.fillStyle = '#090503';
        ctx.beginPath();
        ctx.arc(360, 410, 8, 0, Math.PI * 2);
        ctx.arc(664, 410, 8, 0, Math.PI * 2);
        ctx.fill();

        // Specular Eye Reflection Glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(365, 406, 4, 0, Math.PI * 2);
        ctx.arc(669, 406, 4, 0, Math.PI * 2);
        ctx.fill();

        // Upper Eyelashes / Eye Crease
        ctx.strokeStyle = '#1c1917';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(360, 405, 44, Math.PI, 0, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(664, 405, 44, Math.PI, 0, false);
        ctx.stroke();

        // Masculine Eyebrows
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.moveTo(300, 365);
        ctx.lineTo(425, 360);
        ctx.lineTo(410, 380);
        ctx.lineTo(300, 375);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(600, 360);
        ctx.lineTo(724, 365);
        ctx.lineTo(724, 375);
        ctx.lineTo(610, 380);
        ctx.closePath();
        ctx.fill();

        // Nose Bridge & Nostril shading
        ctx.fillStyle = '#a96a3a';
        ctx.fillRect(498, 410, 28, 95);
        ctx.fillStyle = '#5c2c12';
        ctx.beginPath();
        ctx.arc(488, 510, 9, 0, Math.PI * 2);
        ctx.arc(536, 510, 9, 0, Math.PI * 2);
        ctx.fill();

        // Upper Lip & Lower Lip
        ctx.fillStyle = '#9b5b52';
        ctx.fillRect(455, 595, 114, 18);
        ctx.fillStyle = '#b76e64';
        ctx.fillRect(465, 615, 94, 20);

        // Neat Trimmed Mustache
        ctx.fillStyle = '#18181b';
        ctx.beginPath();
        ctx.moveTo(435, 570);
        ctx.lineTo(512, 555);
        ctx.lineTo(589, 570);
        ctx.lineTo(575, 592);
        ctx.lineTo(512, 584);
        ctx.lineTo(449, 592);
        ctx.closePath();
        ctx.fill();

        // Trimmed Beard / Stubble along Jawline & Chin
        ctx.fillStyle = '#18181b';
        ctx.beginPath();
        ctx.moveTo(250, 480);
        ctx.lineTo(310, 720);
        ctx.lineTo(420, 830);
        ctx.lineTo(512, 850);
        ctx.lineTo(604, 830);
        ctx.lineTo(714, 720);
        ctx.lineTo(774, 480);
        ctx.lineTo(710, 620);
        ctx.lineTo(620, 740);
        ctx.lineTo(512, 770);
        ctx.lineTo(404, 740);
        ctx.lineTo(314, 620);
        ctx.closePath();
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    // C. Realistic Dark Denim Jeans Texture
    const createDenimJeansTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#172554'; // Deep navy indigo
        ctx.fillRect(0, 0, 512, 512);

        // Twill weave diagonals
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 2;
        for (let i = -512; i < 1024; i += 6) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + 512, 512);
          ctx.stroke();
        }

        // Fading / Stone-wash highlights along thigh front
        ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.fillRect(120, 80, 272, 350);

        // Golden-tan seam stitching line
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(40, 0);
        ctx.lineTo(40, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(472, 0);
        ctx.lineTo(472, 512);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    // D. Realistic Asphalt Road Surface Texture with Aggregate Grain
    const createAsphaltTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#171d25';
        ctx.fillRect(0, 0, 512, 512);

        // Aggregate mineral flecks
        for (let i = 0; i < 3500; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const val = 30 + Math.random() * 35;
          ctx.fillStyle = `rgb(${val},${val + 2},${val + 6})`;
          ctx.fillRect(x, y, 1.8, 1.8);
        }

        // Subtle road tire wear sheen
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(80, 0, 140, 512);
        ctx.fillRect(290, 0, 140, 512);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(8, 24);
      return tex;
    };

    // E. Illuminated Building Window Matrix Texture
    const createWindowMatrixTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a'; // Dark glass framework
        ctx.fillRect(0, 0, 512, 512);

        // Grid of office windows
        const rows = 16;
        const cols = 16;
        const w = 512 / cols;
        const h = 512 / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const seed = Math.sin(r * 31 + c * 17);
            if (seed > 0.1) {
              // Lit office window (warm amber or cool white)
              ctx.fillStyle = seed > 0.5 ? '#fef08a' : '#bae6fd';
              ctx.fillRect(c * w + 4, r * h + 4, w - 8, h - 8);
            } else {
              // Unlit dark window
              ctx.fillStyle = '#1e293b';
              ctx.fillRect(c * w + 4, r * h + 4, w - 8, h - 8);
            }
          }
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const shirtTexture = createTealPalmShirtTexture();
    const faceTexture = createProtagonistFaceTexture();
    const jeansTexture = createDenimJeansTexture();
    const asphaltTexture = createAsphaltTexture();
    const windowTexture = createWindowMatrixTexture();

    // ==========================================
    // 5. OPEN-WORLD CITY ARCHITECTURE & ROADS
    // ==========================================
    const citySize = 420;

    // Ground Plane with Asphalt Texture
    const groundGeo = new THREE.PlaneGeometry(citySize, citySize);
    const groundMat = new THREE.MeshStandardMaterial({
      map: asphaltTexture,
      roughness: 0.62,
      metalness: 0.25,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    cityWorldGroup.add(ground);

    // Concrete Sidewalk Tile Material
    const sidewalkMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.72,
      metalness: 0.12,
    });
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });

    // Road Markings
    const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const whiteLineMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

    const avenueWidth = 18;
    const roadCoords = [-80, 0, 80];

    // North-South Avenues
    roadCoords.forEach((rx) => {
      // Asphalt Road Deck
      const road = new THREE.Mesh(new THREE.PlaneGeometry(avenueWidth, citySize), groundMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(rx, 0.02, 0);
      road.receiveShadow = true;
      cityWorldGroup.add(road);

      // Double Yellow Centerline
      const line1 = new THREE.Mesh(new THREE.PlaneGeometry(0.25, citySize), yellowLineMat);
      line1.rotation.x = -Math.PI / 2;
      line1.position.set(rx - 0.2, 0.035, 0);
      cityWorldGroup.add(line1);

      const line2 = new THREE.Mesh(new THREE.PlaneGeometry(0.25, citySize), yellowLineMat);
      line2.rotation.x = -Math.PI / 2;
      line2.position.set(rx + 0.2, 0.035, 0);
      cityWorldGroup.add(line2);

      // Dashed White Lane Dividers
      [-4.5, 4.5].forEach((offset) => {
        const laneLine = new THREE.Mesh(new THREE.PlaneGeometry(0.22, citySize), whiteLineMat);
        laneLine.rotation.x = -Math.PI / 2;
        laneLine.position.set(rx + offset, 0.035, 0);
        cityWorldGroup.add(laneLine);
      });

      // Pedestrian Crosswalks (Zebra stripes at intersections)
      [-80, 0, 80].forEach((intZ) => {
        for (let s = -avenueWidth / 2 + 1.2; s <= avenueWidth / 2 - 1.2; s += 1.6) {
          const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 3.2), whiteLineMat);
          stripe.rotation.x = -Math.PI / 2;
          stripe.position.set(rx + s, 0.038, intZ + 11);
          cityWorldGroup.add(stripe);

          const stripe2 = stripe.clone();
          stripe2.position.z = intZ - 11;
          cityWorldGroup.add(stripe2);
        }
      });
    });

    // East-West Streets
    roadCoords.forEach((rz) => {
      const road = new THREE.Mesh(new THREE.PlaneGeometry(citySize, avenueWidth), groundMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0.025, rz);
      road.receiveShadow = true;
      cityWorldGroup.add(road);

      const line1 = new THREE.Mesh(new THREE.PlaneGeometry(citySize, 0.25), yellowLineMat);
      line1.rotation.x = -Math.PI / 2;
      line1.position.set(0, 0.036, rz - 0.2);
      cityWorldGroup.add(line1);

      const line2 = new THREE.Mesh(new THREE.PlaneGeometry(citySize, 0.25), yellowLineMat);
      line2.rotation.x = -Math.PI / 2;
      line2.position.set(0, 0.036, rz + 0.2);
      cityWorldGroup.add(line2);

      [-4.5, 4.5].forEach((offset) => {
        const laneLine = new THREE.Mesh(new THREE.PlaneGeometry(citySize, 0.22), whiteLineMat);
        laneLine.rotation.x = -Math.PI / 2;
        laneLine.position.set(0, 0.036, rz + offset);
        cityWorldGroup.add(laneLine);
      });
    });

    // Raised Concrete Sidewalk Blocks with Curbs
    const blockCenters = [
      { x: -40, z: -40 }, { x: 40, z: -40 },
      { x: -40, z: 40 }, { x: 40, z: 40 },
      { x: -120, z: -40 }, { x: 120, z: -40 },
      { x: -120, z: 40 }, { x: 120, z: 40 },
      { x: -40, z: -120 }, { x: 40, z: -120 },
      { x: -40, z: 120 }, { x: 40, z: 120 },
    ];

    blockCenters.forEach((bc) => {
      const blockWidth = 60;
      const blockGeo = new THREE.BoxGeometry(blockWidth, 0.24, blockWidth);
      const blockMesh = new THREE.Mesh(blockGeo, sidewalkMat);
      blockMesh.position.set(bc.x, 0.12, bc.z);
      blockMesh.receiveShadow = true;
      blockMesh.castShadow = true;
      cityWorldGroup.add(blockMesh);

      // Granite Curb Rim
      const curbGeo = new THREE.BoxGeometry(blockWidth + 0.3, 0.26, blockWidth + 0.3);
      const curbMesh = new THREE.Mesh(curbGeo, curbMat);
      curbMesh.position.set(bc.x, 0.11, bc.z);
      curbMesh.receiveShadow = true;
      cityWorldGroup.add(curbMesh);
    });

    // Organic Palm Trees with Segmented Trunk & Arched Fronds
    const palmTrunkMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.9 });
    const palmFrondMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });

    const createRealisticPalmTree = (px: number, pz: number, heightScale = 1.0) => {
      const palm = new THREE.Group();
      palm.position.set(px, 0.24, pz);

      // Multi-segment organic curved trunk
      const totalH = 7.5 * heightScale;
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24 * heightScale, 0.42 * heightScale, totalH, 9),
        palmTrunkMat
      );
      trunk.position.y = totalH / 2;
      trunk.rotation.z = (Math.random() - 0.5) * 0.16;
      trunk.castShadow = true;
      palm.add(trunk);

      // Coconut cluster at crown
      const cocoMat = new THREE.MeshStandardMaterial({ color: 0x27170e, roughness: 0.8 });
      for (let c = 0; c < 4; c++) {
        const coco = new THREE.Mesh(new THREE.SphereGeometry(0.22 * heightScale, 8, 8), cocoMat);
        const ang = (c / 4) * Math.PI * 2;
        coco.position.set(Math.cos(ang) * 0.3, totalH - 0.2, Math.sin(ang) * 0.3);
        palm.add(coco);
      }

      // Radial Cascading Palm Fronds
      const numFronds = 12;
      for (let i = 0; i < numFronds; i++) {
        const angle = (i / numFronds) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const frondGroup = new THREE.Group();
        frondGroup.position.set(0, totalH, 0);
        frondGroup.rotation.y = angle;

        // Curved frond leaf
        const frond = new THREE.Mesh(
          new THREE.PlaneGeometry(1.1 * heightScale, 4.2 * heightScale),
          palmFrondMat
        );
        frond.position.set(0, 0, 1.8 * heightScale);
        frond.rotation.x = Math.PI / 2.8;
        frond.castShadow = true;
        frondGroup.add(frond);

        palm.add(frondGroup);
      }
      cityWorldGroup.add(palm);
    };

    // Plant palm trees along sidewalk edges
    [-10.8, 10.8].forEach((sx) => {
      for (let sz = -110; sz <= 110; sz += 22) {
        if (Math.abs(sz) > 12) createRealisticPalmTree(sx, sz, 0.95 + Math.random() * 0.2);
      }
    });
    [-10.8, 10.8].forEach((sz) => {
      for (let sx = -110; sx <= 110; sx += 22) {
        if (Math.abs(sx) > 12) createRealisticPalmTree(sx, sz, 0.95 + Math.random() * 0.2);
      }
    });

    // Modern Curved Street Lamps with Volumetric Downward Cones
    const streetLampMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 });
    const lampBulbMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });

    const createStreetLamp = (lx: number, lz: number, rotY: number) => {
      const lamp = new THREE.Group();
      lamp.position.set(lx, 0.24, lz);
      lamp.rotation.y = rotY;

      // Vertical post
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 6.8, 8), streetLampMat);
      post.position.y = 3.4;
      lamp.add(post);

      // Curved cantilever arm
      const arm = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.14), streetLampMat);
      arm.position.set(1.1, 6.7, 0);
      lamp.add(arm);

      // Lamp fixture housing
      const fixture = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 0.35), streetLampMat);
      fixture.position.set(2.0, 6.62, 0);
      lamp.add(fixture);

      // Glowing bulb
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), lampBulbMat);
      bulb.position.set(2.0, 6.5, 0);
      lamp.add(bulb);

      // Downward Warm Streetlight
      const light = new THREE.PointLight(0xffedd5, 1.8, 22, 1.3);
      light.position.set(2.0, 6.2, 0);
      lamp.add(light);

      cityWorldGroup.add(lamp);
    };

    [-10.4, 10.4].forEach((lx) => {
      const rot = lx < 0 ? Math.PI : 0;
      for (let lz = -90; lz <= 90; lz += 32) {
        if (Math.abs(lz) > 14) createStreetLamp(lx, lz, rot);
      }
    });

    // Street Furniture: Park Benches & Stainless Trash Cans along sidewalks
    const benchWoodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
    const benchMetalMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });

    const createParkBench = (bx: number, bz: number, rotY: number) => {
      const bench = new THREE.Group();
      bench.position.set(bx, 0.24, bz);
      bench.rotation.y = rotY;

      // Seat planks
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.5), benchWoodMat);
      seat.position.y = 0.45;
      bench.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 0.08), benchWoodMat);
      back.position.set(0, 0.75, -0.22);
      bench.add(back);

      // Metal legs
      [-0.8, 0.8].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.5), benchMetalMat);
        leg.position.set(lx, 0.225, 0);
        bench.add(leg);
      });

      cityWorldGroup.add(bench);
    };

    [-11.2, 11.2].forEach((bx) => {
      const rot = bx < 0 ? -Math.PI / 2 : Math.PI / 2;
      for (let bz = -75; bz <= 75; bz += 36) {
        if (Math.abs(bz) > 18) createParkBench(bx, bz, rot);
      }
    });

    // Distant City Skyline Skyscrapers with Window Grids & Rooftop Beacons
    const towerGlassMat = new THREE.MeshStandardMaterial({
      map: windowTexture,
      roughness: 0.2,
      metalness: 0.85,
    });
    const towerConcreteMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const beaconLightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    const skylineTowers = [
      { x: -160, z: -160, w: 32, d: 32, h: 110 },
      { x: 0, z: -180, w: 38, d: 38, h: 145 },
      { x: 160, z: -160, w: 34, d: 34, h: 125 },
      { x: -180, z: 0, w: 36, d: 36, h: 130 },
      { x: 180, z: 0, w: 40, d: 40, h: 150 },
      { x: -160, z: 160, w: 30, d: 30, h: 105 },
      { x: 0, z: 180, w: 38, d: 38, h: 140 },
      { x: 160, z: 160, w: 34, d: 34, h: 120 },
      { x: -95, z: -170, w: 28, d: 28, h: 95 },
      { x: 95, z: -170, w: 28, d: 28, h: 100 },
      { x: -170, z: -95, w: 30, d: 30, h: 105 },
      { x: 170, z: -95, w: 30, d: 30, h: 110 },
    ];

    skylineTowers.forEach((t) => {
      const towerGroup = new THREE.Group();
      towerGroup.position.set(t.x, 0, t.z);

      // Main tower shaft
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(t.w, t.h, t.d), towerGlassMat);
      shaft.position.y = t.h / 2;
      towerGroup.add(shaft);

      // Mechanical rooftop penthouse
      const roof = new THREE.Mesh(new THREE.BoxGeometry(t.w * 0.65, 8, t.d * 0.65), towerConcreteMat);
      roof.position.y = t.h + 4;
      towerGroup.add(roof);

      // Antenna Spire with blinking red warning beacon
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 18, 6), towerConcreteMat);
      antenna.position.y = t.h + 17;
      towerGroup.add(antenna);

      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), beaconLightMat);
      beacon.position.y = t.h + 26;
      towerGroup.add(beacon);

      cityWorldGroup.add(towerGroup);
    });

    // ==========================================
    // 6. ALL 25 PHYSICAL PROJECT HEADQUARTERS
    // ==========================================
    const projectBuildings: {
      location: CityProjectLocation;
      group: THREE.Group;
      doorPos: THREE.Vector3;
      parkingPos: THREE.Vector3;
      signMesh: THREE.Mesh;
    }[] = [];

    const getProjectLocation = (proj: ProjectItem, idx: number): CityProjectLocation => {
      const cat = (proj.category || '').toUpperCase();
      const techs = (proj.technologies || []).join(' ').toUpperCase();

      let district = 'DOWNTOWN TECH BOULEVARD';
      let districtIndex = 1;
      let buildingName = `${proj.title.toUpperCase()} HQ`;
      let x = 0;
      let z = 0;
      let rotationY = 0;
      let color = 0x2563eb;
      let accentColor = 0x38bdf8;

      if (cat.includes('AI') || cat.includes('VISION') || cat.includes('HEALTHCARE') || techs.includes('OPENCV')) {
        district = 'NORTH AI & VISION DISTRICT';
        districtIndex = 2;
        buildingName = `${proj.title.toUpperCase()} AI LAB`;
        color = 0x0284c7;
        accentColor = 0x00f0ff;
        const row = idx % 6;
        const isLeft = idx % 2 === 0;
        x = isLeft ? -28 : 28;
        z = -26 - row * 18;
        rotationY = isLeft ? Math.PI / 2 : -Math.PI / 2;
      } else if (cat.includes('SECURITY') || cat.includes('CYBER') || cat.includes('VULN') || techs.includes('CLAMAV')) {
        district = 'EAST CYBER DEFENSE DISTRICT';
        districtIndex = 3;
        buildingName = `${proj.title.toUpperCase()} SECURITY CENTER`;
        color = 0xd97706;
        accentColor = 0xfbbf24;
        const row = idx % 6;
        const isNorth = idx % 2 === 0;
        x = 28 + row * 18;
        z = isNorth ? -26 : 26;
        rotationY = isNorth ? 0 : Math.PI;
      } else if (cat.includes('RESEARCH') || cat.includes('CLOUD') || cat.includes('ACADEMIC') || !!proj.relatedResearch) {
        district = 'SOUTH RESEARCH & INNOVATION COMMONS';
        districtIndex = 4;
        buildingName = `${proj.title.toUpperCase()} RESEARCH WING`;
        color = 0x7c3aed;
        accentColor = 0xa78bfa;
        const row = idx % 6;
        const isLeft = idx % 2 === 0;
        x = isLeft ? -28 : 28;
        z = 26 + row * 18;
        rotationY = isLeft ? Math.PI / 2 : -Math.PI / 2;
      } else {
        district = 'WEST FULL STACK VALLEY';
        districtIndex = 1;
        buildingName = `${proj.title.toUpperCase()} TECH BUILDING`;
        color = 0x059669;
        accentColor = 0x34d399;
        const row = idx % 6;
        const isNorth = idx % 2 === 0;
        x = -28 - row * 18;
        z = isNorth ? -26 : 26;
        rotationY = isNorth ? 0 : Math.PI;
      }

      return {
        project: proj,
        index: idx,
        x,
        z,
        district,
        districtIndex,
        buildingName,
        rotationY,
        color,
        accentColor,
      };
    };

    projects.forEach((proj, idx) => {
      const loc = getProjectLocation(proj, idx);
      const bldgGroup = new THREE.Group();
      bldgGroup.position.set(loc.x, 0.24, loc.z);
      bldgGroup.rotation.y = loc.rotationY;

      // Realistic Multi-Tier Building Architecture
      const facadeMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.45,
        metalness: 0.65,
      });
      const glassMat = new THREE.MeshStandardMaterial({
        color: loc.accentColor,
        roughness: 0.08,
        metalness: 0.92,
        transparent: true,
        opacity: 0.88,
      });

      // Main Architectural Block
      const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(13, 20, 13), facadeMat);
      mainBlock.position.y = 10;
      mainBlock.castShadow = true;
      mainBlock.receiveShadow = true;
      bldgGroup.add(mainBlock);

      // Glass Curtain Wall Ribbon
      const glassRibbon = new THREE.Mesh(new THREE.BoxGeometry(11.4, 15, 0.4), glassMat);
      glassRibbon.position.set(0, 9.5, 6.6);
      bldgGroup.add(glassRibbon);

      // Architectural Entrance Canopy Portico
      const canopy = new THREE.Mesh(
        new THREE.BoxGeometry(7.5, 0.6, 4.2),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.8 })
      );
      canopy.position.set(0, 4.5, 8.2);
      canopy.castShadow = true;
      bldgGroup.add(canopy);

      // Double Glass Entrance Doors
      const entranceDoor = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 3.6, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.85 })
      );
      entranceDoor.position.set(0, 1.8, 6.6);
      bldgGroup.add(entranceDoor);

      // Illuminated Architectural Signboard
      const signCanvas = document.createElement('canvas');
      signCanvas.width = 512;
      signCanvas.height = 128;
      const sctx = signCanvas.getContext('2d');
      if (sctx) {
        sctx.fillStyle = '#090d16';
        sctx.fillRect(0, 0, 512, 128);

        sctx.strokeStyle = '#00f0ff';
        sctx.lineWidth = 6;
        sctx.strokeRect(4, 4, 504, 120);

        sctx.fillStyle = '#ffffff';
        sctx.font = 'bold 36px monospace';
        sctx.textAlign = 'center';
        sctx.fillText(proj.title.toUpperCase().slice(0, 20), 256, 52);

        sctx.fillStyle = '#f59e0b';
        sctx.font = 'bold 22px monospace';
        sctx.fillText(loc.district.slice(0, 28), 256, 94);
      }
      const signTex = new THREE.CanvasTexture(signCanvas);
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(6.2, 1.55),
        new THREE.MeshBasicMaterial({ map: signTex })
      );
      signMesh.position.set(0, 5.4, 10.3);
      bldgGroup.add(signMesh);

      // Dedicated Parking Bay on the Street Curb
      const parkArea = new THREE.Mesh(
        new THREE.PlaneGeometry(4.8, 8.5),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 })
      );
      parkArea.rotation.x = -Math.PI / 2;
      parkArea.position.set(6.5, 0.035, 11);
      bldgGroup.add(parkArea);

      cityWorldGroup.add(bldgGroup);

      const worldDoorPos = new THREE.Vector3(0, 0, 8.2)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), loc.rotationY)
        .add(new THREE.Vector3(loc.x, 0, loc.z));
      const worldParkPos = new THREE.Vector3(6.5, 0, 11)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), loc.rotationY)
        .add(new THREE.Vector3(loc.x, 0, loc.z));

      projectBuildings.push({
        location: loc,
        group: bldgGroup,
        doorPos: worldDoorPos,
        parkingPos: worldParkPos,
        signMesh,
      });
    });

    // GPS Vertical Light Beam into the sky
    const waypointBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.9, 150, 16),
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      })
    );
    waypointBeam.position.set(0, 75, 0);
    waypointBeam.visible = false;
    cityWorldGroup.add(waypointBeam);

    // ==========================================
    // 7. AMBIENT MOVING TRAFFIC & PEDESTRIANS
    // ==========================================
    const trafficCars: { mesh: THREE.Group; speed: number; axis: 'x' | 'z'; min: number; max: number; dir: number }[] = [];
    const trafficColors = [0xd97706, 0xef4444, 0x3b82f6, 0x10b981, 0x64748b, 0xffffff];

    const createTrafficCar = (color: number) => {
      const tg = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.75, 4.4),
        new THREE.MeshStandardMaterial({ color, metalness: 0.85, roughness: 0.28 })
      );
      body.position.y = 0.58;
      body.castShadow = true;
      tg.add(body);

      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.72, 0.62, 2.3),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.08, metalness: 0.92 })
      );
      cabin.position.set(0, 1.22, -0.2);
      tg.add(cabin);

      // Headlights
      const hlMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
      const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.1), hlMat);
      hl1.position.set(-0.7, 0.62, 2.22);
      tg.add(hl1);
      const hl2 = hl1.clone();
      hl2.position.x = 0.7;
      tg.add(hl2);

      // Taillights
      const tlMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.1), tlMat);
      tl1.position.set(-0.7, 0.62, -2.22);
      tg.add(tl1);
      const tl2 = tl1.clone();
      tl2.position.x = 0.7;
      tg.add(tl2);

      return tg;
    };

    for (let c = 0; c < 6; c++) {
      const tc = createTrafficCar(trafficColors[c % trafficColors.length]);
      const lane = c % 2 === 0 ? -4.5 : 4.5;
      const dir = c % 2 === 0 ? 1 : -1;
      tc.position.set(lane, 0, (c - 3) * 50);
      if (dir === -1) tc.rotation.y = Math.PI;
      cityWorldGroup.add(tc);
      trafficCars.push({ mesh: tc, speed: 12 + c * 2, axis: 'z', min: -140, max: 140, dir });
    }

    // Ambient Pedestrians
    const pedestrians: { mesh: THREE.Group; speed: number; targetZ: number; dir: number }[] = [];
    const pedColors = [0x1e3a8a, 0x475569, 0x334155, 0x047857];

    const createPedestrian = (color: number) => {
      const ped = new THREE.Group();
      const torso = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.24, 0.9, 8),
        new THREE.MeshStandardMaterial({ color, roughness: 0.75 })
      );
      torso.position.y = 1.05;
      torso.castShadow = true;
      ped.add(torso);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.65 })
      );
      head.position.y = 1.68;
      ped.add(head);

      const legs = new THREE.Mesh(
        new THREE.CylinderGeometry(0.19, 0.19, 0.75, 8),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
      );
      legs.position.y = 0.38;
      ped.add(legs);

      return ped;
    };

    for (let p = 0; p < 8; p++) {
      const ped = createPedestrian(pedColors[p % pedColors.length]);
      const sideX = p % 2 === 0 ? -11 : 11;
      ped.position.set(sideX, 0.24, (p - 4) * 32);
      cityWorldGroup.add(ped);
      pedestrians.push({ mesh: ped, speed: 1.8 + Math.random() * 0.8, targetZ: 110, dir: p % 2 === 0 ? 1 : -1 });
    }

    // ==========================================
    // 7B. PROTAGONIST MATERIALS (TOMMY VERCETTI)
    // ==========================================
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xc88b58, roughness: 0.55, metalness: 0.05 });
    const palmShirtMat = new THREE.MeshStandardMaterial({ map: shirtTexture, roughness: 0.65 });
    const denimJeansMat = new THREE.MeshStandardMaterial({ map: jeansTexture, roughness: 0.72 });
    const sneakerLeatherMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const sneakerSoleMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });
    const sneakerStripeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
    const goldJewelryMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.12 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.88 });
    const headMat = new THREE.MeshStandardMaterial({ map: faceTexture, roughness: 0.58 });
    const sunglassesFrameMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.98, roughness: 0.08 });
    const sunglassesLensMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      transparent: true,
      opacity: 0.88,
      roughness: 0.05,
      metalness: 0.9,
    });
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x3e1d0f, roughness: 0.6 });
    const buckleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });

    // ==========================================
    // 8. PLAYER CAR: CLASSIC 80s RED MUSCLE SEDAN (MATCHING REFERENCE IMAGE)
    // ==========================================
    const playerCar = new THREE.Group();
    playerCar.position.set(carPos.x, 0, carPos.z);
    playerCar.rotation.y = carPos.heading;
    cityWorldGroup.add(playerCar);

    // Deep Crimson / Cherry Red Glossy Paint
    const carBodyMat = new THREE.MeshStandardMaterial({
      color: 0xc5221f, // Rich iconic GTA red
      metalness: 0.85,
      roughness: 0.22,
    });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.96, roughness: 0.1 });
    const rubberMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
    const glassCarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.08, metalness: 0.9 });

    // Main 80s Boxy Sedan Body Chassis
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.65, 4.6), carBodyMat);
    chassis.position.y = 0.54;
    chassis.castShadow = true;
    playerCar.add(chassis);

    // Long Front Hood with central power ridge
    const hoodRidge = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 1.8), carBodyMat);
    hoodRidge.position.set(0, 0.88, 1.2);
    playerCar.add(hoodRidge);

    // Classic Chrome Front Grille with horizontal/vertical slats
    const grille = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.35, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 })
    );
    grille.position.set(0, 0.56, 2.32);
    playerCar.add(grille);

    // Chrome Front Bumper Bar with License Plate
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.18, 0.25), chromeMat);
    frontBumper.position.set(0, 0.38, 2.36);
    playerCar.add(frontBumper);

    // White Front License Plate ("VICE CITY")
    const plateCanvas = document.createElement('canvas');
    plateCanvas.width = 128;
    plateCanvas.height = 48;
    const pctx = plateCanvas.getContext('2d');
    if (pctx) {
      pctx.fillStyle = '#f8fafc';
      pctx.fillRect(0, 0, 128, 48);
      pctx.fillStyle = '#0f172a';
      pctx.font = 'bold 20px monospace';
      pctx.textAlign = 'center';
      pctx.fillText('VICE CITY', 64, 32);
    }
    const plateTex = new THREE.CanvasTexture(plateCanvas);
    const licensePlate = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.22), new THREE.MeshBasicMaterial({ map: plateTex }));
    licensePlate.position.set(0, 0.38, 2.5);
    playerCar.add(licensePlate);

    // Dual Rectangular Sealed-Beam Headlights with Amber Turn Indicators
    const carHeadlightMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
    const amberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    [-0.72, 0.72].forEach((hlX) => {
      // Main beam
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.12), carHeadlightMat);
      hl.position.set(hlX, 0.6, 2.32);
      playerCar.add(hl);

      // Amber corner indicator
      const cornerSign = hlX > 0 ? 1 : -1;
      const amber = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.12), amberMat);
      amber.position.set(hlX + cornerSign * 0.22, 0.6, 2.31);
      playerCar.add(amber);
    });

    // Forward Spot Light illuminating the road
    const carSpotLight = new THREE.SpotLight(0xfff7ed, 4.2, 45, Math.PI / 4.6, 0.25, 1.4);
    carSpotLight.position.set(0, 0.75, 2.45);
    carSpotLight.target.position.set(0, 0.2, 28);
    playerCar.add(carSpotLight);
    playerCar.add(carSpotLight.target);

    // Classic 4-Door Sedan Greenhouse Cabin with Chrome Pillars
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.62, 2.2), glassCarMat);
    cabin.position.set(0, 1.15, -0.28);
    playerCar.add(cabin);

    // Chrome A/B/C Pillars
    const roofCap = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.06, 2.1), carBodyMat);
    roofCap.position.set(0, 1.48, -0.28);
    playerCar.add(roofCap);

    // Sports Bucket Seats
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
    const driverSeat = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.44, 0.52), seatMat);
    driverSeat.position.set(-0.42, 0.72, -0.22);
    playerCar.add(driverSeat);

    const passengerSeat = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.44, 0.52), seatMat);
    passengerSeat.position.set(0.42, 0.72, -0.22);
    playerCar.add(passengerSeat);

    // 80s 3-Spoke Sports Steering Wheel
    const steeringGroup = new THREE.Group();
    steeringGroup.position.set(-0.42, 1.05, 0.26);
    steeringGroup.rotation.x = -Math.PI / 4.6;
    const steeringRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.022, 8, 16), rubberMat);
    steeringGroup.add(steeringRing);
    const steeringCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 8), chromeMat);
    steeringCenter.rotation.x = Math.PI / 2;
    steeringGroup.add(steeringCenter);
    playerCar.add(steeringGroup);

    // In-Car Driver Figure (Tommy Vercetti seated behind the wheel)
    const driverFigure = new THREE.Group();
    driverFigure.position.set(-0.42, 0.82, -0.18);

    const driverTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.21, 0.42, 16),
      palmShirtMat
    );
    driverTorso.position.y = 0.22;
    driverTorso.scale.set(1.15, 1.0, 0.8);
    driverFigure.add(driverTorso);

    const driverChest = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.22, 0.18),
      skinMat
    );
    driverChest.position.set(0, 0.28, 0.08);
    driverFigure.add(driverChest);

    const driverHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.165, 16, 16),
      headMat
    );
    driverHead.position.set(0, 0.52, 0.02);
    driverHead.scale.set(1.0, 1.2, 1.1);
    driverFigure.add(driverHead);

    // Driver Aviator Sunglasses
    const driverGlasses = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.045, 0.02),
      sunglassesLensMat
    );
    driverGlasses.position.set(0, 0.53, 0.18);
    driverFigure.add(driverGlasses);

    const driverHair = new THREE.Mesh(
      new THREE.SphereGeometry(0.175, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.6),
      hairMat
    );
    driverHair.position.set(0, 0.54, 0);
    driverFigure.add(driverHair);

    const driverChain = new THREE.Mesh(
      new THREE.TorusGeometry(0.11, 0.016, 6, 16),
      goldJewelryMat
    );
    driverChain.rotation.x = Math.PI / 2.6;
    driverChain.position.set(0, 0.38, 0.1);
    driverFigure.add(driverChain);

    const driverArmLeft = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.055, 0.32, 6, 10),
      skinMat
    );
    driverArmLeft.position.set(-0.19, 0.24, 0.2);
    driverArmLeft.rotation.x = Math.PI / 2.8;
    driverArmLeft.rotation.z = 0.2;
    driverFigure.add(driverArmLeft);

    const driverArmRight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.055, 0.32, 6, 10),
      skinMat
    );
    driverArmRight.position.set(0.19, 0.24, 0.2);
    driverArmRight.rotation.x = Math.PI / 2.8;
    driverArmRight.rotation.z = -0.2;
    driverFigure.add(driverArmRight);

    driverFigure.visible = false;
    playerCar.add(driverFigure);

    // Chrome Rear Bumper & Red Rectangular Taillights
    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.18, 0.25), chromeMat);
    rearBumper.position.set(0, 0.38, -2.36);
    playerCar.add(rearBumper);

    const carTaillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    [-0.72, 0.72].forEach((tlX) => {
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.18, 0.12), carTaillightMat);
      tl.position.set(tlX, 0.62, -2.32);
      playerCar.add(tl);
    });

    // Dual Chrome Exhaust Pipes
    [-0.45, 0.45].forEach((exX) => {
      const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.24, 8), chromeMat);
      exhaust.rotation.x = Math.PI / 2;
      exhaust.position.set(exX, 0.24, -2.42);
      playerCar.add(exhaust);
    });

    // Driver Side Door
    const driverDoor = new THREE.Group();
    driverDoor.position.set(-1.06, 0.54, 0.5);
    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.62, 1.3), carBodyMat);
    doorPanel.position.set(0, 0, -0.65);
    driverDoor.add(doorPanel);
    playerCar.add(driverDoor);

    // Chrome Side Mirrors
    [-1.12, 1.12].forEach((mX) => {
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.14), chromeMat);
      mirror.position.set(mX, 0.95, 0.55);
      playerCar.add(mirror);
    });

    // 80s Turbine Alloy Wheels & Rubber Tires
    const createClassicWheel = () => {
      const wg = new THREE.Group();
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 18), rubberMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wg.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.29, 18), chromeMat);
      rim.rotation.z = Math.PI / 2;
      wg.add(rim);

      return wg;
    };

    const frontLeftWheel = createClassicWheel();
    frontLeftWheel.position.set(-1.08, 0.38, 1.45);
    playerCar.add(frontLeftWheel);

    const frontRightWheel = createClassicWheel();
    frontRightWheel.position.set(1.08, 0.38, 1.45);
    playerCar.add(frontRightWheel);

    const rearLeftWheel = createClassicWheel();
    rearLeftWheel.position.set(-1.08, 0.38, -1.45);
    playerCar.add(rearLeftWheel);

    const rearRightWheel = createClassicWheel();
    rearRightWheel.position.set(1.08, 0.38, -1.45);
    playerCar.add(rearRightWheel);

    // ==========================================
    // OCEAN DRIVE SCENERY: ART DECO HOTELS & POTTED PALMS
    // ==========================================
    // Foreground Terracotta Potted Plant (Matching the large plant on the left of user's screenshot!)
    const potMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.85 }); // Terracotta
    const plantMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.7, side: THREE.DoubleSide });

    const createPottedPalm = (px: number, pz: number) => {
      const potGroup = new THREE.Group();
      potGroup.position.set(px, 0.24, pz);

      // Terracotta planter pot
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.45, 0.85, 14), potMat);
      pot.position.y = 0.42;
      pot.castShadow = true;
      potGroup.add(pot);

      // Ficus / Palm Plant Leaves
      for (let l = 0; l < 14; l++) {
        const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 1.8), plantMat);
        const lAng = (l / 14) * Math.PI * 2;
        leaf.position.set(Math.cos(lAng) * 0.3, 1.3, Math.sin(lAng) * 0.3);
        leaf.rotation.y = lAng;
        leaf.rotation.x = Math.PI / 3.2;
        leaf.castShadow = true;
        potGroup.add(leaf);
      }
      cityWorldGroup.add(potGroup);
    };

    // Plant the prominent foreground potted palm right by the left curb!
    createPottedPalm(-9.8, 4.5);
    createPottedPalm(-9.8, -12);
    createPottedPalm(-9.8, 22);

    // Art Deco Hotel Building Facade (Left Side - Ocean Drive)
    const artDecoYellowMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.5 }); // Sunny yellow
    const artDecoMintMat = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, roughness: 0.4 }); // Mint turquoise
    const artDecoWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.45 });

    const createArtDecoHotel = (hx: number, hz: number) => {
      const hotel = new THREE.Group();
      hotel.position.set(hx, 0.24, hz);

      // Main yellow 3-story Art Deco block
      const mainH = new THREE.Mesh(new THREE.BoxGeometry(16, 15, 26), artDecoYellowMat);
      mainH.position.set(0, 7.5, 0);
      mainH.castShadow = true;
      hotel.add(mainH);

      // Mint turquoise decorative horizontal speedlines & vertical fins
      [-2, 2, 6, 10].forEach((lineY) => {
        const band = new THREE.Mesh(new THREE.BoxGeometry(16.4, 0.5, 26.2), artDecoMintMat);
        band.position.set(0, lineY, 0);
        hotel.add(band);
      });

      // Curved white balconies on street side
      const balcony = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 18), artDecoWhiteMat);
      balcony.position.set(8.5, 6, 0);
      balcony.castShadow = true;
      hotel.add(balcony);

      // Striped Green & White Sidewalk Canopy Awning
      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 0.4, 12),
        new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 })
      );
      awning.position.set(8.5, 3.4, 0);
      hotel.add(awning);

      cityWorldGroup.add(hotel);
    };

    createArtDecoHotel(-22, 6);
    createArtDecoHotel(-22, -26);

    // Right-Hand Parkway Lawn (Ocean Beach Strip with Palms)
    const oceanLawnMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const parkwayLawn = new THREE.Mesh(new THREE.PlaneGeometry(36, 180), oceanLawnMat);
    parkwayLawn.rotation.x = -Math.PI / 2;
    parkwayLawn.position.set(28, 0.24, 0);
    parkwayLawn.receiveShadow = true;
    cityWorldGroup.add(parkwayLawn);

    // Right-Hand Palm Tree Avenue (Dense tropical palms along the parkway)
    [16, 26, 36].forEach((px) => {
      for (let pz = -70; pz <= 70; pz += 16) {
        createRealisticPalmTree(px, pz, 0.95 + Math.random() * 0.25);
      }
    });

    // ==========================================
    // 9. REAL TOMMY VERCETTI PROTAGONIST CHARACTER
    // (Authentic GTA Vice City Hero with Articulated Skeleton)
    // ==========================================
    const playerGroup = new THREE.Group();
    playerGroup.position.set(playerPos.x, 0.24, playerPos.z);
    cityWorldGroup.add(playerGroup);

    // Soft Contact Shadow Decal
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.65, 1.65),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.65 })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    playerGroup.add(shadowMesh);

    // ROOT PELVIS (Central Root of Articulated Skeleton)
    const rootPelvis = new THREE.Group();
    rootPelvis.position.y = 1.04;
    playerGroup.add(rootPelvis);

    // Pelvis Body Core (Smooth anatomical hip curvature in denim jeans)
    const pelvisMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.18, 0.16, 12, 16),
      denimJeansMat
    );
    pelvisMesh.rotation.x = Math.PI / 2;
    pelvisMesh.castShadow = true;
    rootPelvis.add(pelvisMesh);

    // Brown Saddle Leather Belt
    const belt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.245, 0.245, 0.065, 24),
      beltMat
    );
    belt.position.y = 0.08;
    rootPelvis.add(belt);

    // Chrome Metallic Belt Buckle
    const buckle = new THREE.Mesh(
      new THREE.BoxGeometry(0.11, 0.075, 0.04),
      buckleMat
    );
    buckle.position.set(0, 0.08, 0.245);
    rootPelvis.add(buckle);

    // TORSO GROUP (Child of rootPelvis: V-Taper Chest, Hawaiian Shirt, Neck, Head, Shoulders)
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 0.12, 0);
    rootPelvis.add(torsoGroup);

    // Lower Shirt Hem hanging naturally over belt
    const shirtHem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.255, 0.22, 20),
      palmShirtMat
    );
    shirtHem.position.y = 0.08;
    shirtHem.castShadow = true;
    torsoGroup.add(shirtHem);

    // Athletic V-Taper Muscular Upper Torso & Chest in Turquoise Hawaiian Shirt
    const upperTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.285, 0.235, 0.44, 20),
      palmShirtMat
    );
    upperTorso.position.y = 0.36;
    upperTorso.scale.set(1.22, 1.0, 0.78); // Broad masculine shoulder width
    upperTorso.castShadow = true;
    torsoGroup.add(upperTorso);

    // Pectoral Muscle Contour Curves
    [-0.14, 0.14].forEach((pecX) => {
      const pec = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.11, 0.14, 8, 12),
        palmShirtMat
      );
      pec.rotation.z = pecX > 0 ? -0.2 : 0.2;
      pec.position.set(pecX, 0.40, 0.14);
      torsoGroup.add(pec);
    });

    // Exposed Muscular Bare Chest inside open collar
    const chestExposed = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.09, 0.22, 8, 14),
      skinMat
    );
    chestExposed.position.set(0, 0.42, 0.11);
    torsoGroup.add(chestExposed);

    // 3D Folded Hawaiian Shirt Lapels / Open V-Neck Collar
    const collarLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.32, 0.04),
      palmShirtMat
    );
    collarLeft.position.set(-0.13, 0.46, 0.18);
    collarLeft.rotation.set(0.12, 0, -0.32);
    torsoGroup.add(collarLeft);

    const collarRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.32, 0.04),
      palmShirtMat
    );
    collarRight.position.set(0.13, 0.46, 0.18);
    collarRight.rotation.set(0.12, 0, 0.32);
    torsoGroup.add(collarRight);

    // 3D Linked Gold Cuban Chain Necklace
    const goldChain = new THREE.Mesh(
      new THREE.TorusGeometry(0.135, 0.02, 10, 24),
      goldJewelryMat
    );
    goldChain.rotation.x = Math.PI / 2.6;
    goldChain.position.set(0, 0.48, 0.115);
    torsoGroup.add(goldChain);

    // Gold Medallion Pendant
    const goldMedallion = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, 0.012, 14),
      goldJewelryMat
    );
    goldMedallion.position.set(0, 0.36, 0.18);
    torsoGroup.add(goldMedallion);

    // MUSCULAR NECK
    const neck = new THREE.Group();
    neck.position.set(0, 0.58, 0);
    torsoGroup.add(neck);

    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095, 0.12, 0.18, 16),
      skinMat
    );
    neckMesh.position.y = 0.09;
    neck.add(neckMesh);

    // Adam's Apple Prominence
    const adamsApple = new THREE.Mesh(
      new THREE.ConeGeometry(0.022, 0.035, 6),
      skinMat
    );
    adamsApple.rotation.x = -Math.PI / 2;
    adamsApple.position.set(0, 0.09, 0.105);
    neck.add(adamsApple);

    // HEAD GROUP (Tommy Vercetti's Rugged 80s Head, Face, Aviator Sunglasses, and Hair)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.19, 0);
    neck.add(headGroup);

    // Sculpted Cranium / Skull
    const cranium = new THREE.Mesh(
      new THREE.SphereGeometry(0.175, 20, 20),
      headMat
    );
    cranium.scale.set(1.0, 1.25, 1.15);
    cranium.position.y = 0.08;
    cranium.castShadow = true;
    headGroup.add(cranium);

    // Sculpted Masculine Jawline & Cleft Chin
    const jaw = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.08, 0.13, 8, 14),
      skinMat
    );
    jaw.rotation.x = Math.PI / 4;
    jaw.position.set(0, 0.01, 0.07);
    headGroup.add(jaw);

    const chin = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.05, 0.045),
      skinMat
    );
    chin.position.set(0, -0.065, 0.155);
    headGroup.add(chin);

    // 3D Sculpted Nose with bridge and nostrils
    const noseBridge = new THREE.Mesh(
      new THREE.BoxGeometry(0.036, 0.08, 0.065),
      skinMat
    );
    noseBridge.rotation.x = -0.2;
    noseBridge.position.set(0, 0.095, 0.185);
    headGroup.add(noseBridge);

    const noseTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.024, 8, 8),
      skinMat
    );
    noseTip.position.set(0, 0.055, 0.22);
    headGroup.add(noseTip);

    [-0.024, 0.024].forEach((nX) => {
      const nostril = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 6, 6),
        skinMat
      );
      nostril.position.set(nX, 0.05, 0.208);
      headGroup.add(nostril);
    });

    // Realistic 3D Eyes
    [-0.062, 0.062].forEach((eyeX) => {
      const eyeBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xf8fafc })
      );
      eyeBall.position.set(eyeX, 0.11, 0.165);
      headGroup.add(eyeBall);

      const iris = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x362015 }) // Dark hazel-brown
      );
      iris.position.set(eyeX, 0.11, 0.188);
      headGroup.add(iris);

      const pupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.007, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0x090503 })
      );
      pupil.position.set(eyeX, 0.11, 0.198);
      headGroup.add(pupil);
    });

    // Sculpted Lips
    const upperLip = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.012, 0.065, 4, 8),
      new THREE.MeshStandardMaterial({ color: 0x9b5b52, roughness: 0.6 })
    );
    upperLip.rotation.z = Math.PI / 2;
    upperLip.position.set(0, 0.005, 0.185);
    headGroup.add(upperLip);

    const lowerLip = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.014, 0.055, 4, 8),
      new THREE.MeshStandardMaterial({ color: 0xb76e64, roughness: 0.6 })
    );
    lowerLip.rotation.z = Math.PI / 2;
    lowerLip.position.set(0, -0.02, 0.18);
    headGroup.add(lowerLip);

    // Realistic Ears
    [-0.18, 0.18].forEach((earX) => {
      const ear = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        skinMat
      );
      ear.scale.set(0.35, 1.2, 0.8);
      ear.position.set(earX, 0.09, -0.01);
      headGroup.add(ear);
    });

    // Tommy Vercetti's Iconic Aviator Sunglasses (Gold Wire Frames & Tinted Smoke Lenses)
    const sunglassesGroup = new THREE.Group();
    sunglassesGroup.position.set(0, 0.11, 0.18);

    [-0.062, 0.062].forEach((sgX) => {
      // Teardrop aviator lens frame
      const frameRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.048, 0.006, 6, 18),
        sunglassesFrameMat
      );
      frameRing.scale.set(1.15, 1.0, 1.0);
      frameRing.position.set(sgX, 0, 0);
      sunglassesGroup.add(frameRing);

      // Dark tinted lens
      const lens = new THREE.Mesh(
        new THREE.CircleGeometry(0.046, 16),
        sunglassesLensMat
      );
      lens.scale.set(1.15, 1.0, 1.0);
      lens.position.set(sgX, 0, 0.003);
      sunglassesGroup.add(lens);
    });

    // Double Brow Bridge Wire Bars
    const bridgeTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.06, 6),
      sunglassesFrameMat
    );
    bridgeTop.rotation.z = Math.PI / 2;
    bridgeTop.position.set(0, 0.025, 0.004);
    sunglassesGroup.add(bridgeTop);

    const bridgeBottom = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.045, 6),
      sunglassesFrameMat
    );
    bridgeBottom.rotation.z = Math.PI / 2;
    bridgeBottom.position.set(0, 0.005, 0.004);
    sunglassesGroup.add(bridgeBottom);

    headGroup.add(sunglassesGroup);

    // 80s Volumetric Dark Hair (Textured Pompadour Sweep with Sideburns)
    const hairCrown = new THREE.Mesh(
      new THREE.SphereGeometry(0.188, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.55),
      hairMat
    );
    hairCrown.scale.set(1.05, 1.22, 1.15);
    hairCrown.position.set(0, 0.12, -0.02);
    headGroup.add(hairCrown);

    // Swept-back Front Fringe Volume
    const hairFrontSweep = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.075, 0.22, 12),
      hairMat
    );
    hairFrontSweep.rotation.z = Math.PI / 2;
    hairFrontSweep.position.set(0, 0.21, 0.11);
    headGroup.add(hairFrontSweep);

    // Left & Right Sideburns
    [-0.175, 0.175].forEach((sbX) => {
      const sideburn = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, 0.10, 0.06),
        hairMat
      );
      sideburn.position.set(sbX, 0.07, 0.05);
      headGroup.add(sideburn);
    });

    // SHOULDERS & ARMS (ARTICULATED KINEMATIC HIERARCHY)
    // Left Arm Hierarchy (with Tommy's Gold Watch & Articulated Hand)
    const leftShoulderJoint = new THREE.Group();
    leftShoulderJoint.position.set(-0.35, 0.44, 0);
    torsoGroup.add(leftShoulderJoint);

    // Rolled Hawaiian Shirt Short Sleeve
    const leftSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.118, 0.22, 16),
      palmShirtMat
    );
    leftSleeve.position.set(0, -0.09, 0);
    leftSleeve.castShadow = true;
    leftShoulderJoint.add(leftSleeve);

    // Muscular Bicep / Tricep in skin tone
    const leftUpperArmMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.074, 0.22, 8, 14),
      skinMat
    );
    leftUpperArmMesh.position.set(0, -0.15, 0);
    leftUpperArmMesh.castShadow = true;
    leftShoulderJoint.add(leftUpperArmMesh);

    // Left Elbow Joint
    const leftElbowJoint = new THREE.Group();
    leftElbowJoint.position.set(0, -0.30, 0);
    leftShoulderJoint.add(leftElbowJoint);

    // Athletic Forearm with natural muscular taper
    const leftForearmMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.066, 0.24, 8, 14),
      skinMat
    );
    leftForearmMesh.position.set(0, -0.14, 0);
    leftForearmMesh.castShadow = true;
    leftElbowJoint.add(leftForearmMesh);

    // Tommy's Gold Luxury Watch on Left Wrist
    const watchStrap = new THREE.Mesh(
      new THREE.TorusGeometry(0.074, 0.015, 8, 18),
      goldJewelryMat
    );
    watchStrap.rotation.x = Math.PI / 2;
    watchStrap.position.set(0, -0.24, 0);
    leftElbowJoint.add(watchStrap);

    const watchCase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.02, 14),
      goldJewelryMat
    );
    watchCase.position.set(0, -0.24, 0.07);
    leftElbowJoint.add(watchCase);

    const watchFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.032, 14),
      new THREE.MeshBasicMaterial({ color: 0x09090b })
    );
    watchFace.position.set(0, -0.24, 0.081);
    leftElbowJoint.add(watchFace);

    // Sculpted Left Hand with articulated fingers
    const leftHand = new THREE.Group();
    leftHand.position.set(0, -0.31, 0);
    leftElbowJoint.add(leftHand);

    const leftPalm = new THREE.Mesh(
      new THREE.BoxGeometry(0.085, 0.10, 0.048),
      skinMat
    );
    leftHand.add(leftPalm);

    // Opposing Thumb
    const leftThumb = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.022, 0.05, 4, 8),
      skinMat
    );
    leftThumb.position.set(0.048, -0.01, 0.025);
    leftThumb.rotation.z = -0.55;
    leftHand.add(leftThumb);

    // 4 Curved Fingers
    [-0.028, -0.01, 0.01, 0.028].forEach((fX, i) => {
      const finger = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.017, 0.065 - Math.abs(i - 1.5) * 0.008, 4, 8),
        skinMat
      );
      finger.position.set(fX, -0.075, 0);
      leftHand.add(finger);
    });

    // Right Arm Hierarchy (Symmetrical athletic arm)
    const rightShoulderJoint = new THREE.Group();
    rightShoulderJoint.position.set(0.35, 0.44, 0);
    torsoGroup.add(rightShoulderJoint);

    const rightSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.118, 0.22, 16),
      palmShirtMat
    );
    rightSleeve.position.set(0, -0.09, 0);
    rightSleeve.castShadow = true;
    rightShoulderJoint.add(rightSleeve);

    const rightUpperArmMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.074, 0.22, 8, 14),
      skinMat
    );
    rightUpperArmMesh.position.set(0, -0.15, 0);
    rightUpperArmMesh.castShadow = true;
    rightShoulderJoint.add(rightUpperArmMesh);

    const rightElbowJoint = new THREE.Group();
    rightElbowJoint.position.set(0, -0.30, 0);
    rightShoulderJoint.add(rightElbowJoint);

    const rightForearmMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.066, 0.24, 8, 14),
      skinMat
    );
    rightForearmMesh.position.set(0, -0.14, 0);
    rightForearmMesh.castShadow = true;
    rightElbowJoint.add(rightForearmMesh);

    const rightHand = new THREE.Group();
    rightHand.position.set(0, -0.31, 0);
    rightElbowJoint.add(rightHand);

    const rightPalm = new THREE.Mesh(
      new THREE.BoxGeometry(0.085, 0.10, 0.048),
      skinMat
    );
    rightHand.add(rightPalm);

    const rightThumb = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.022, 0.05, 4, 8),
      skinMat
    );
    rightThumb.position.set(-0.048, -0.01, 0.025);
    rightThumb.rotation.z = 0.55;
    rightHand.add(rightThumb);

    [-0.028, -0.01, 0.01, 0.028].forEach((fX, i) => {
      const finger = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.017, 0.065 - Math.abs(i - 1.5) * 0.008, 4, 8),
        skinMat
      );
      finger.position.set(fX, -0.075, 0);
      rightHand.add(finger);
    });

    // LOWER BODY: LEGS & SHOES (TRUE HIERARCHICAL HIP/KNEE/ANKLE ARTICULATION)
    // Helper to build realistic 80s sneaker with gum sole and cyan stripe
    const createTommySneaker = (isLeft: boolean) => {
      const sg = new THREE.Group();

      // Curved leather upper with rounded toe box
      const upper = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.092, 0.23, 8, 14),
        sneakerLeatherMat
      );
      upper.rotation.x = Math.PI / 2;
      upper.position.set(0, 0.035, 0.06);
      upper.castShadow = true;
      sg.add(upper);

      // Retro Cyan Side Chevrons
      [-0.098, 0.098].forEach((strX) => {
        const stripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.015, 0.06, 0.17),
          sneakerStripeMat
        );
        stripe.position.set(strX, 0.04, 0.05);
        sg.add(stripe);
      });

      // Padded Tongue & White Laces
      const tongue = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.04, 0.14),
        sneakerLeatherMat
      );
      tongue.position.set(0, 0.09, 0.04);
      sg.add(tongue);

      // Cushioned White Midsole
      const midsole = new THREE.Mesh(
        new THREE.BoxGeometry(0.20, 0.045, 0.36),
        sneakerLeatherMat
      );
      midsole.position.set(0, -0.035, 0.06);
      sg.add(midsole);

      // Gum Rubber Outsole Tread
      const outsole = new THREE.Mesh(
        new THREE.BoxGeometry(0.205, 0.02, 0.365),
        sneakerSoleMat
      );
      outsole.position.set(0, -0.065, 0.06);
      sg.add(outsole);

      return sg;
    };

    // Left Leg Hierarchy (Child of rootPelvis)
    const leftHipJoint = new THREE.Group();
    leftHipJoint.position.set(-0.165, -0.02, 0);
    rootPelvis.add(leftHipJoint);

    const leftThighMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.125, 0.44, 10, 16),
      denimJeansMat
    );
    leftThighMesh.position.set(0, -0.24, 0);
    leftThighMesh.castShadow = true;
    leftHipJoint.add(leftThighMesh);

    // Left Knee Joint
    const leftKneeJoint = new THREE.Group();
    leftKneeJoint.position.set(0, -0.48, 0);
    leftHipJoint.add(leftKneeJoint);

    const leftKneeCrease = new THREE.Mesh(
      new THREE.TorusGeometry(0.118, 0.025, 6, 14),
      denimJeansMat
    );
    leftKneeJoint.add(leftKneeCrease);

    const leftShinMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.105, 0.40, 10, 16),
      denimJeansMat
    );
    leftShinMesh.position.set(0, -0.22, 0);
    leftShinMesh.castShadow = true;
    leftKneeJoint.add(leftShinMesh);

    // Left Ankle Joint
    const leftAnkleJoint = new THREE.Group();
    leftAnkleJoint.position.set(0, -0.44, 0);
    leftKneeJoint.add(leftAnkleJoint);

    const leftShoe = createTommySneaker(true);
    leftAnkleJoint.add(leftShoe);

    // Right Leg Hierarchy (Child of rootPelvis)
    const rightHipJoint = new THREE.Group();
    rightHipJoint.position.set(0.165, -0.02, 0);
    rootPelvis.add(rightHipJoint);

    const rightThighMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.125, 0.44, 10, 16),
      denimJeansMat
    );
    rightThighMesh.position.set(0, -0.24, 0);
    rightThighMesh.castShadow = true;
    rightHipJoint.add(rightThighMesh);

    // Right Knee Joint
    const rightKneeJoint = new THREE.Group();
    rightKneeJoint.position.set(0, -0.48, 0);
    rightHipJoint.add(rightKneeJoint);

    const rightKneeCrease = new THREE.Mesh(
      new THREE.TorusGeometry(0.118, 0.025, 6, 14),
      denimJeansMat
    );
    rightKneeJoint.add(rightKneeCrease);

    const rightShinMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.105, 0.40, 10, 16),
      denimJeansMat
    );
    rightShinMesh.position.set(0, -0.22, 0);
    rightShinMesh.castShadow = true;
    rightKneeJoint.add(rightShinMesh);

    // Right Ankle Joint
    const rightAnkleJoint = new THREE.Group();
    rightAnkleJoint.position.set(0, -0.44, 0);
    rightKneeJoint.add(rightAnkleJoint);

    const rightShoe = createTommySneaker(false);
    rightAnkleJoint.add(rightShoe);

    // ==========================================
    // 10. WALKABLE 3D PROJECT INTERIOR FACILITY
    // ==========================================
    const interiorFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(38, 46),
      new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.18, metalness: 0.92 })
    );
    interiorFloor.rotation.x = -Math.PI / 2;
    interiorFloor.receiveShadow = true;
    interiorGroup.add(interiorFloor);

    // Neon Floor Conduit Grid
    const conduitMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    [-7, 0, 7].forEach((cx) => {
      const conduit = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 42), conduitMat);
      conduit.rotation.x = -Math.PI / 2;
      conduit.position.set(cx, 0.02, 0);
      interiorGroup.add(conduit);
    });

    // Interior Perimeter Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.38, metalness: 0.8 });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(38, 9, 1), wallMat);
    backWall.position.set(0, 4.5, -23);
    interiorGroup.add(backWall);

    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(38, 9, 1), wallMat);
    frontWall.position.set(0, 4.5, 23);
    interiorGroup.add(frontWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(1, 9, 46), wallMat);
    leftWall.position.set(-19, 4.5, 0);
    interiorGroup.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(1, 9, 46), wallMat);
    rightWall.position.set(19, 4.5, 0);
    interiorGroup.add(rightWall);

    // Exit Door Pod at Z = 21
    const exitPod = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 4.4, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2 })
    );
    exitPod.position.set(0, 2.2, 22.5);
    interiorGroup.add(exitPod);

    // 5 Technological Nodes inside Project Architecture Room
    const architectureNodes = [
      { id: 'frontend', name: 'FRONTEND CLIENT UI', x: -8, z: -10, color: 0x38bdf8 },
      { id: 'api_gateway', name: 'API GATEWAY & AUTH', x: -4, z: -2, color: 0xf59e0b },
      { id: 'backend_core', name: 'BACKEND SERVICES CORE', x: 4, z: -2, color: 0x10b981 },
      { id: 'database', name: 'DATABASE & REPOSITORY', x: 8, z: -10, color: 0xa855f7 },
      { id: 'ai_engine', name: 'AI INFERENCE & CLOUD', x: 0, z: -16, color: 0xec4899 },
    ];

    architectureNodes.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(node.x, 0, node.z);

      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.8, 0.45, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.85 })
      );
      base.position.y = 0.22;
      nodeGroup.add(base);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.85, 1),
        new THREE.MeshStandardMaterial({
          color: node.color,
          roughness: 0.1,
          metalness: 0.9,
          emissive: node.color,
          emissiveIntensity: 0.4,
        })
      );
      core.position.y = 1.7;
      nodeGroup.add(core);

      const pLight = new THREE.PointLight(node.color, 1.6, 9, 1.5);
      pLight.position.y = 2.4;
      nodeGroup.add(pLight);

      const nodeCanvas = document.createElement('canvas');
      nodeCanvas.width = 256;
      nodeCanvas.height = 96;
      const nctx = nodeCanvas.getContext('2d');
      if (nctx) {
        nctx.fillStyle = '#090d16';
        nctx.fillRect(0, 0, 256, 96);
        nctx.strokeStyle = '#38bdf8';
        nctx.lineWidth = 4;
        nctx.strokeRect(2, 2, 252, 92);
        nctx.fillStyle = '#ffffff';
        nctx.font = 'bold 22px monospace';
        nctx.textAlign = 'center';
        nctx.fillText(node.name.slice(0, 16), 128, 42);
        nctx.fillStyle = '#38bdf8';
        nctx.font = 'bold 16px monospace';
        nctx.fillText('[E] INSPECT NODE', 128, 74);
      }
      const nodeTex = new THREE.CanvasTexture(nodeCanvas);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.95), new THREE.MeshBasicMaterial({ map: nodeTex }));
      sign.position.set(0, 2.9, 0);
      nodeGroup.add(sign);

      interiorGroup.add(nodeGroup);
    });

    // Animated 3D Data Packets
    const dataPackets: { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; progress: number; speed: number }[] = [];
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    const conduitPaths = [
      { from: new THREE.Vector3(-8, 0.25, -10), to: new THREE.Vector3(-4, 0.25, -2) },
      { from: new THREE.Vector3(-4, 0.25, -2), to: new THREE.Vector3(4, 0.25, -2) },
      { from: new THREE.Vector3(4, 0.25, -2), to: new THREE.Vector3(8, 0.25, -10) },
      { from: new THREE.Vector3(4, 0.25, -2), to: new THREE.Vector3(0, 0.25, -16) },
    ];

    conduitPaths.forEach((path) => {
      for (let p = 0; p < 2; p++) {
        const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), packetMat);
        interiorGroup.add(pMesh);
        dataPackets.push({
          mesh: pMesh,
          from: path.from,
          to: path.to,
          progress: Math.random(),
          speed: 0.65 + Math.random() * 0.4,
        });
      }
    });

    // ==========================================
    // 11. CONTROLS, CAMERA & PHYSICS GAME LOOP
    // ==========================================
    let cameraAzimuth = 0;
    let cameraElevation = 0.26;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      cameraAzimuth -= dx * 0.0055;
      cameraElevation = Math.max(0.08, Math.min(0.82, cameraElevation + dy * 0.0045));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Physics Simulation Variables
    let currentX = playerPos.x;
    let currentZ = playerPos.z;
    let currentHeading = playerPos.heading;
    let velocityX = 0;
    let velocityZ = 0;
    let verticalVelocity = 0;
    let playerY = 0.24;
    let walkCycle = 0;
    let footstepTimer = 0;

    // Car Physics Variables
    let carX = carPos.x;
    let carZ = carPos.z;
    let carHeading = carPos.heading;
    let carSpeed = carPos.speed;
    let steerAngle = 0;
    let doorOpenAngle = 0;

    // Interior Coordinates
    let interiorPlayerX = 0;
    let interiorPlayerZ = 16;
    let interiorPlayerHeading = 0;

    let introTimer = 0;
    let clock = new THREE.Clock();

    // 60FPS Game Loop
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      const mode = controlModeRef.current;
      const input = moveInputRef.current;

      // Handle Waypoint Pillar Visibility
      const wpId = waypointProjectIdRef.current;
      if (wpId && mode !== 'interior') {
        const wpBuilding = projectBuildings.find(
          (b) => b.location.project.id === wpId || b.location.project.slug === wpId
        );
        if (wpBuilding) {
          waypointBeam.visible = true;
          waypointBeam.position.set(wpBuilding.location.x, 75, wpBuilding.location.z);
        } else {
          waypointBeam.visible = false;
        }
      } else {
        waypointBeam.visible = false;
      }

      // Animate Ambient Traffic Cars
      trafficCars.forEach((tc) => {
        tc.mesh.position.z += tc.speed * tc.dir * delta;
        if (tc.dir === 1 && tc.mesh.position.z > tc.max) tc.mesh.position.z = tc.min;
        if (tc.dir === -1 && tc.mesh.position.z < tc.min) tc.mesh.position.z = tc.max;
      });

      // Animate Pedestrians
      pedestrians.forEach((p) => {
        p.mesh.position.z += p.speed * p.dir * delta;
        if (p.dir === 1 && p.mesh.position.z > p.targetZ) p.dir = -1;
        if (p.dir === -1 && p.mesh.position.z < -p.targetZ) p.dir = 1;
        p.mesh.rotation.y = p.dir === 1 ? 0 : Math.PI;
      });

      // Animate Data Packets inside Interior
      dataPackets.forEach((dp) => {
        dp.progress = (dp.progress + dp.speed * delta) % 1;
        dp.mesh.position.lerpVectors(dp.from, dp.to, dp.progress);
        dp.mesh.position.y = 0.32 + Math.sin(dp.progress * Math.PI) * 0.45;
      });

      // ==========================================
      // A. CINEMATIC INTRO SEQUENCE
      // ==========================================
      if (cinematicIntroRef.current) {
        introTimer += delta;
        const introT = Math.min(introTimer / 3.4, 1);
        const easeT = 1 - Math.pow(1 - introT, 3);

        const startCam = new THREE.Vector3(30, 65, 75);
        const endCam = new THREE.Vector3(currentX + 3.4, 2.3, currentZ + 4.4);
        camera.position.lerpVectors(startCam, endCam, easeT);
        camera.lookAt(currentX, 1.45, currentZ);

        if (introTimer >= 3.4) {
          onCinematicCompleteRef.current();
        }
        renderer.render(scene, camera);
        return;
      }

      // ==========================================
      // B. VEHICLE DRIVING GAMEPLAY
      // ==========================================
      if (mode === 'driving') {
        playerGroup.visible = false;
        driverFigure.visible = true;
        steeringRing.rotation.z = -steerAngle * 2.2;
        doorOpenAngle = THREE.MathUtils.lerp(doorOpenAngle, 0, delta * 12);
        driverDoor.rotation.y = doorOpenAngle;

        const maxSteer = 0.55;
        if (input.strafe < 0) steerAngle = THREE.MathUtils.lerp(steerAngle, maxSteer, delta * 8);
        else if (input.strafe > 0) steerAngle = THREE.MathUtils.lerp(steerAngle, -maxSteer, delta * 8);
        else steerAngle = THREE.MathUtils.lerp(steerAngle, 0, delta * 10);

        frontLeftWheel.rotation.y = steerAngle;
        frontRightWheel.rotation.y = steerAngle;

        const accelRate = 22;
        const maxSpeed = 34; // ~122 km/h
        const brakeRate = 28;
        const friction = 0.985;

        let isAccelerating = false;

        if (input.forward > 0) {
          carSpeed += accelRate * delta;
          if (carSpeed > maxSpeed) carSpeed = maxSpeed;
          isAccelerating = true;
        } else if (input.forward < 0) {
          if (carSpeed > 0.5) {
            carSpeed -= brakeRate * delta;
            try {
              gtaAudio.playTireScreech();
            } catch {
              // Safety
            }
          } else {
            carSpeed -= accelRate * 0.5 * delta;
            if (carSpeed < -10) carSpeed = -10;
          }
        } else {
          carSpeed *= Math.pow(friction, delta * 60);
          if (Math.abs(carSpeed) < 0.1) carSpeed = 0;
        }

        if (input.isHandbraking) {
          carSpeed *= Math.pow(0.85, delta * 60);
          try {
            gtaAudio.playTireScreech();
          } catch {
            // Safety
          }
        }

        if (Math.abs(carSpeed) > 0.1) {
          const turnDir = carSpeed > 0 ? 1 : -1;
          carHeading += steerAngle * turnDir * (Math.abs(carSpeed) / maxSpeed) * delta * 2.8;
        }

        carX += Math.sin(carHeading) * carSpeed * delta;
        carZ += Math.cos(carHeading) * carSpeed * delta;

        const wheelRotSpeed = carSpeed * delta * 3.5;
        frontLeftWheel.rotation.x += wheelRotSpeed;
        frontRightWheel.rotation.x += wheelRotSpeed;
        rearLeftWheel.rotation.x += wheelRotSpeed;
        rearRightWheel.rotation.x += wheelRotSpeed;

        playerCar.position.set(carX, 0, carZ);
        playerCar.rotation.y = carHeading;

        currentX = carX - Math.cos(carHeading) * 1.5;
        currentZ = carZ + Math.sin(carHeading) * 1.5;
        currentHeading = carHeading;

        if (input.forward < 0 || input.isHandbraking) {
          carTaillightMat.color.setHex(0xff0000);
        } else {
          carTaillightMat.color.setHex(0x7f1d1d);
        }

        const speedRatio = Math.abs(carSpeed) / maxSpeed;
        try {
          gtaAudio.updateCarEngine(speedRatio, isAccelerating);
        } catch {
          // Safety
        }

        const speedKmh = Math.round(Math.abs(carSpeed) * 3.6);
        onSpeedChangeRef.current(speedKmh);

        onUpdateCarPosRef.current({ x: carX, z: carZ, heading: carHeading, speed: carSpeed });
        onUpdatePlayerPosRef.current({ x: currentX, z: currentZ, heading: currentHeading });

        // Dynamic Chase Camera
        const camDistance = 6.2 + speedRatio * 2.4;
        const camHeight = 2.4 + speedRatio * 0.6;
        const camOffsetX = -Math.sin(carHeading) * camDistance;
        const camOffsetZ = -Math.cos(carHeading) * camDistance;

        const targetCam = new THREE.Vector3(carX + camOffsetX, camHeight, carZ + camOffsetZ);
        camera.position.lerp(targetCam, 0.12);
        camera.lookAt(carX, 1.2, carZ);

        let nearestBldg: { project: ProjectItem; distance: number; index: number } | null = null;
        let minBldgDist = Infinity;
        projectBuildings.forEach((b) => {
          const d = Math.hypot(carX - b.location.x, carZ - b.location.z);
          if (d < minBldgDist) {
            minBldgDist = d;
            nearestBldg = { project: b.location.project, distance: Math.round(d), index: b.location.index };
          }
        });

        if (minBldgDist <= 24 && nearestBldg) {
          onProximityChangeRef.current({
            type: 'project',
            target: nearestBldg.project,
            distance: nearestBldg.distance,
            index: nearestBldg.index,
            title: `APPROACHING ${nearestBldg.project.title.toUpperCase()}`,
          });
        } else {
          onProximityChangeRef.current(null);
        }
      }

      // ==========================================
      // C. ON-FOOT THIRD-PERSON WALKING GAMEPLAY
      // ==========================================
      else if (mode === 'walking') {
        playerGroup.visible = true;
        driverFigure.visible = false;

        const forwardVector = new THREE.Vector3(Math.sin(cameraAzimuth), 0, Math.cos(cameraAzimuth)).normalize();
        const rightVector = new THREE.Vector3(Math.cos(cameraAzimuth), 0, -Math.sin(cameraAzimuth)).normalize();

        const moveDir = new THREE.Vector3();
        if (input.forward !== 0) moveDir.addScaledVector(forwardVector, input.forward);
        if (input.strafe !== 0) moveDir.addScaledVector(rightVector, input.strafe);

        const moveSpeed = input.isSprinting ? 14 : 7.5;

        if (moveDir.lengthSq() > 0.001) {
          moveDir.normalize();

          velocityX += moveDir.x * moveSpeed * delta * 7;
          velocityZ += moveDir.z * moveSpeed * delta * 7;

          const targetHeading = Math.atan2(moveDir.x, moveDir.z);
          currentHeading += (targetHeading - currentHeading) * 0.2;
          playerGroup.rotation.y = currentHeading;

          // Biomechanically Natural Walking & Sprinting Kinematics (Articulated Human Locomotion)
          const cycleSpeed = input.isSprinting ? 14.5 : 9.2;
          walkCycle += delta * cycleSpeed;
          const strideAmp = input.isSprinting ? 0.75 : 0.55;

          // Leg swings from hip joints
          leftHipJoint.rotation.x = Math.sin(walkCycle) * strideAmp;
          rightHipJoint.rotation.x = -Math.sin(walkCycle) * strideAmp;

          // Anatomical backward knee bend when leg kicks back
          leftKneeJoint.rotation.x = Math.max(0, -Math.sin(walkCycle) * strideAmp * 1.35);
          rightKneeJoint.rotation.x = Math.max(0, Math.sin(walkCycle) * strideAmp * 1.35);

          // Ankle flex for foot planting
          leftAnkleJoint.rotation.x = Math.sin(walkCycle - 0.4) * (strideAmp * 0.35);
          rightAnkleJoint.rotation.x = -Math.sin(walkCycle - 0.4) * (strideAmp * 0.35);

          // Arm swing from shoulder joints with natural elbow pumping
          leftShoulderJoint.rotation.x = -Math.sin(walkCycle) * (strideAmp * 0.82);
          leftShoulderJoint.rotation.z = 0.08 + Math.sin(walkCycle * 0.5) * 0.02;
          leftElbowJoint.rotation.x = -Math.abs(Math.sin(walkCycle)) * 0.45 - 0.22;

          rightShoulderJoint.rotation.x = Math.sin(walkCycle) * (strideAmp * 0.82);
          rightShoulderJoint.rotation.z = -0.08 - Math.sin(walkCycle * 0.5) * 0.02;
          rightElbowJoint.rotation.x = -Math.abs(Math.cos(walkCycle)) * 0.45 - 0.22;

          // Pelvic roll and torso counter-rotation
          rootPelvis.position.y = 1.04 + Math.abs(Math.sin(walkCycle * 2)) * (input.isSprinting ? 0.07 : 0.04);
          torsoGroup.rotation.y = Math.sin(walkCycle) * 0.07;
          torsoGroup.rotation.z = Math.cos(walkCycle) * 0.035;
          torsoGroup.rotation.x = input.isSprinting ? 0.22 : 0.06;
          headGroup.rotation.y = -Math.sin(walkCycle) * 0.035; // head stays locked forward

          // Synced Footstep Sounds
          footstepTimer += delta;
          if (footstepTimer >= (input.isSprinting ? 0.28 : 0.42)) {
            footstepTimer = 0;
            try {
              gtaAudio.playFootstep(input.isSprinting);
            } catch {
              // Safety
            }
          }
        } else {
          // Natural Idle Breathing & Relaxed Stance
          const idleBreath = Math.sin(clock.getElapsedTime() * 1.8) * 0.015;
          leftHipJoint.rotation.x = THREE.MathUtils.lerp(leftHipJoint.rotation.x, 0.04, delta * 6);
          rightHipJoint.rotation.x = THREE.MathUtils.lerp(rightHipJoint.rotation.x, -0.04, delta * 6);
          leftKneeJoint.rotation.x = THREE.MathUtils.lerp(leftKneeJoint.rotation.x, 0.05, delta * 6);
          rightKneeJoint.rotation.x = THREE.MathUtils.lerp(rightKneeJoint.rotation.x, 0.05, delta * 6);
          leftAnkleJoint.rotation.x = THREE.MathUtils.lerp(leftAnkleJoint.rotation.x, 0, delta * 6);
          rightAnkleJoint.rotation.x = THREE.MathUtils.lerp(rightAnkleJoint.rotation.x, 0, delta * 6);

          leftShoulderJoint.rotation.x = THREE.MathUtils.lerp(leftShoulderJoint.rotation.x, 0.05, delta * 6);
          leftShoulderJoint.rotation.z = THREE.MathUtils.lerp(leftShoulderJoint.rotation.z, 0.08, delta * 6);
          leftElbowJoint.rotation.x = THREE.MathUtils.lerp(leftElbowJoint.rotation.x, -0.22, delta * 6);

          rightShoulderJoint.rotation.x = THREE.MathUtils.lerp(rightShoulderJoint.rotation.x, 0.05, delta * 6);
          rightShoulderJoint.rotation.z = THREE.MathUtils.lerp(rightShoulderJoint.rotation.z, -0.08, delta * 6);
          rightElbowJoint.rotation.x = THREE.MathUtils.lerp(rightElbowJoint.rotation.x, -0.22, delta * 6);

          rootPelvis.position.y = THREE.MathUtils.lerp(rootPelvis.position.y, 1.04, delta * 6);
          torsoGroup.position.y = idleBreath;
          torsoGroup.rotation.y = 0;
          torsoGroup.rotation.z = 0;
          torsoGroup.rotation.x = 0;
          headGroup.rotation.y = 0;
        }

        // Jump Physics
        if (input.isJumping && playerY <= 0.25) {
          verticalVelocity = 6.4;
        }
        if (playerY > 0.24 || verticalVelocity > 0) {
          verticalVelocity -= 18 * delta;
          playerY += verticalVelocity * delta;
          if (playerY <= 0.24) {
            playerY = 0.24;
            verticalVelocity = 0;
          }
        }

        velocityX *= Math.pow(0.06, delta);
        velocityZ *= Math.pow(0.06, delta);

        currentX += velocityX * delta;
        currentZ += velocityZ * delta;

        const maxBound = 160;
        currentX = Math.max(-maxBound, Math.min(maxBound, currentX));
        currentZ = Math.max(-maxBound, Math.min(maxBound, currentZ));

        playerGroup.position.set(currentX, playerY, currentZ);
        onUpdatePlayerPosRef.current({ x: currentX, z: currentZ, heading: currentHeading });

        // Over-The-Shoulder Third-Person Camera Framing (3-5m behind, slightly elevated)
        const camDist = input.isSprinting ? 4.6 : 3.6;
        const camHeight = 1.98;

        const offsetX = Math.sin(cameraAzimuth) * Math.cos(cameraElevation) * camDist;
        const offsetZ = Math.cos(cameraAzimuth) * Math.cos(cameraElevation) * camDist;
        const offsetY = Math.sin(cameraElevation) * camDist + camHeight;

        const targetCam = new THREE.Vector3(currentX + offsetX, playerY + offsetY, currentZ + offsetZ);
        camera.position.lerp(targetCam, 0.16);
        camera.lookAt(currentX, playerY + 1.5, currentZ);

        // Proximity checks: Car vs Building Entrances
        const distToCar = Math.hypot(currentX - carX, currentZ - carZ);
        if (distToCar <= 4.0) {
          onProximityChangeRef.current({
            type: 'car',
            target: 'car',
            distance: Math.round(distToCar),
            title: 'PLAYER SPORTS CAR',
          });
        } else {
          let nearestBldg: { project: ProjectItem; distance: number; index: number } | null = null;
          let minBldgDist = Infinity;

          projectBuildings.forEach((b) => {
            const d = Math.hypot(currentX - b.doorPos.x, currentZ - b.doorPos.z);
            if (d < minBldgDist) {
              minBldgDist = d;
              nearestBldg = { project: b.location.project, distance: Math.round(d), index: b.location.index };
            }
          });

          if (minBldgDist <= 14 && nearestBldg) {
            onProximityChangeRef.current({
              type: 'project',
              target: nearestBldg.project,
              distance: nearestBldg.distance,
              index: nearestBldg.index,
              title: nearestBldg.project.title.toUpperCase(),
            });
          } else {
            onProximityChangeRef.current(null);
          }
        }

        let currentDistrict = 'DOWNTOWN TECH BOULEVARD';
        if (currentZ < -26) currentDistrict = 'NORTH AI & VISION DISTRICT';
        else if (currentX < -26) currentDistrict = 'WEST FULL STACK VALLEY';
        else if (currentX > 26) currentDistrict = 'EAST CYBER DEFENSE DISTRICT';
        else if (currentZ > 26) currentDistrict = 'SOUTH RESEARCH COMMONS';
        onDistrictChangeRef.current(currentDistrict);
      }

      // ==========================================
      // D. WALKABLE 3D PROJECT INTERIOR GAMEPLAY
      // ==========================================
      else if (mode === 'interior') {
        playerGroup.visible = true;

        const forwardVector = new THREE.Vector3(Math.sin(cameraAzimuth), 0, Math.cos(cameraAzimuth)).normalize();
        const rightVector = new THREE.Vector3(Math.cos(cameraAzimuth), 0, -Math.sin(cameraAzimuth)).normalize();

        const moveDir = new THREE.Vector3();
        if (input.forward !== 0) moveDir.addScaledVector(forwardVector, input.forward);
        if (input.strafe !== 0) moveDir.addScaledVector(rightVector, input.strafe);

        const moveSpeed = 6.5;

        if (moveDir.lengthSq() > 0.001) {
          moveDir.normalize();
          interiorPlayerX += moveDir.x * moveSpeed * delta;
          interiorPlayerZ += moveDir.z * moveSpeed * delta;

          interiorPlayerHeading = Math.atan2(moveDir.x, moveDir.z);
          playerGroup.rotation.y = interiorPlayerHeading;

          walkCycle += delta * 9;
          leftHipJoint.rotation.x = Math.sin(walkCycle) * 0.5;
          rightHipJoint.rotation.x = -Math.sin(walkCycle) * 0.5;
          leftKneeJoint.rotation.x = Math.max(0, -Math.sin(walkCycle) * 0.7);
          rightKneeJoint.rotation.x = Math.max(0, Math.sin(walkCycle) * 0.7);
          leftShoulderJoint.rotation.x = -Math.sin(walkCycle) * 0.45;
          rightShoulderJoint.rotation.x = Math.sin(walkCycle) * 0.45;
          rootPelvis.position.y = 1.04 + Math.abs(Math.sin(walkCycle * 2)) * 0.03;
        } else {
          leftHipJoint.rotation.x *= 0.8;
          rightHipJoint.rotation.x *= 0.8;
          leftKneeJoint.rotation.x *= 0.8;
          rightKneeJoint.rotation.x *= 0.8;
          leftShoulderJoint.rotation.x *= 0.8;
          rightShoulderJoint.rotation.x *= 0.8;
          rootPelvis.position.y = 1.04;
        }

        interiorPlayerX = Math.max(-17, Math.min(17, interiorPlayerX));
        interiorPlayerZ = Math.max(-21, Math.min(21, interiorPlayerZ));

        playerGroup.position.set(interiorPlayerX, -500 + 0.1, interiorPlayerZ);

        const camDist = 3.6;
        const camHeight = 1.8;
        const offsetX = Math.sin(cameraAzimuth) * camDist;
        const offsetZ = Math.cos(cameraAzimuth) * camDist;

        camera.position.set(interiorPlayerX + offsetX, -500 + camHeight, interiorPlayerZ + offsetZ);
        camera.lookAt(interiorPlayerX, -500 + 1.45, interiorPlayerZ);

        const distToExit = Math.hypot(interiorPlayerX, interiorPlayerZ - 21);
        if (distToExit <= 3.6) {
          onProximityChangeRef.current({
            type: 'interior_exit',
            target: 'exit',
            distance: Math.round(distToExit),
            title: 'EXIT TO CITY STREET',
          });
        } else {
          let nearestNode: { id: string; name: string; dist: number } | null = null;
          let minNodeDist = Infinity;

          architectureNodes.forEach((node) => {
            const d = Math.hypot(interiorPlayerX - node.x, interiorPlayerZ - node.z);
            if (d < minNodeDist) {
              minNodeDist = d;
              nearestNode = { id: node.id, name: node.name, dist: Math.round(d) };
            }
          });

          if (minNodeDist <= 3.2 && nearestNode) {
            onProximityChangeRef.current({
              type: 'interior_node',
              target: nearestNode.name,
              distance: nearestNode.dist,
              title: nearestNode.name,
            });
          } else {
            onProximityChangeRef.current(null);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);

      try {
        gtaAudio.stopCarEngine();
      } catch {
        // Safety
      }

      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [projects]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-crosshair select-none"
    />
  );
};
