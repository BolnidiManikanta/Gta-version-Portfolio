export type WorldMotionMode = 'forward_dolly' | 'walking_sway' | 'parallax_drift' | 'static';
export type KeyingMode = 'luma' | 'screen' | 'chroma';
export type HighlightColor = '#ff007f' | '#00f0ff' | '#ffb700' | '#ffffff' | '#a855f7';

export interface WorldAlignmentSettings {
  // Positioning & Perspective
  groundY: number;         // Vertical offset in px (-120 to +120)
  scale: number;           // Subject scale (0.7 to 1.8)
  offsetX: number;         // Horizontal offset in px (-200 to +200)
  
  // Highlight & Subject Lighting ("need to hightlight video")
  highlightIntensity: number;  // 0.0 to 1.0 (subject rim glow and clarity)
  highlightColor: HighlightColor;
  highlightWidth: number;      // 1 to 20px
  brightness: number;          // 0.8 to 1.4
  contrast: number;            // 0.8 to 1.5
  ambientTint: number;         // 0.0 to 0.6 (bleed world neon into subject)
  
  // Ground Integration (Contact & Cast Shadows)
  shadowIntensity: number;     // 0.0 to 1.0
  shadowBlur: number;          // 2 to 20px
  shadowLength: number;        // 0.2 to 0.8 (perspective skew)
  reflectionIntensity: number; // 0.0 to 1.0 (wet pavement reflection)
  
  // Kinematics & Depth Sync ("feel iam walking in background world")
  worldMotion: WorldMotionMode;
  walkSpeed: number;           // 0.6 to 1.5
  cameraBobAmount: number;     // 0.0 to 1.0
  dollySpeed: number;          // 0.0 to 1.0
  
  // Keying & Matte
  keyingMode: KeyingMode;
  lumaThreshold: number;       // 0.01 to 0.25 (for black background removal)
  lumaSmoothness: number;      // 0.02 to 0.35
  chromaColor: string;         // '#00ff00' for green screen
  
  // Atmospheric Layers
  atmosphericParticles: boolean;
  rainEffect: boolean;
  fogEffect: boolean;
}

export const DEFAULT_ALIGNMENT_SETTINGS: WorldAlignmentSettings = {
  groundY: 15,
  scale: 1.15,
  offsetX: 0,
  highlightIntensity: 0.75,
  highlightColor: '#ff007f', // Vice City Neon Pink
  highlightWidth: 8,
  brightness: 1.12,
  contrast: 1.15,
  ambientTint: 0.25,
  shadowIntensity: 0.75,
  shadowBlur: 6,
  shadowLength: 0.45,
  reflectionIntensity: 0.35,
  worldMotion: 'forward_dolly',
  walkSpeed: 1.0,
  cameraBobAmount: 0.65,
  dollySpeed: 0.5,
  keyingMode: 'luma',
  lumaThreshold: 0.07,
  lumaSmoothness: 0.12,
  chromaColor: '#00ff00',
  atmosphericParticles: true,
  rainEffect: false,
  fogEffect: true,
};

export interface BackgroundPreset {
  id: string;
  name: string;
  category: string;
  url: string;
  tintColor: string;
  defaultGroundY: number;
  defaultScale: number;
}

export const PRESET_BACKGROUND_WORLDS: BackgroundPreset[] = [
  {
    id: 'vice_city_boulevard',
    name: 'Vice City Ocean Corridor',
    category: 'Cinematic GTA',
    url: '/bg-intro.png',
    tintColor: '#ff007f',
    defaultGroundY: 15,
    defaultScale: 1.15,
  },
  {
    id: 'cyberpunk_rain_avenue',
    name: 'Cyberpunk Neon Boulevard',
    category: 'Cyber City',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&auto=format&fit=crop&q=85',
    tintColor: '#00f0ff',
    defaultGroundY: 10,
    defaultScale: 1.12,
  },
  {
    id: 'tokyo_night_walk',
    name: 'Tokyo Rain Alley',
    category: 'Night Walk',
    url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&auto=format&fit=crop&q=85',
    tintColor: '#ffb700',
    defaultGroundY: 20,
    defaultScale: 1.18,
  },
  {
    id: 'sunset_palm_drive',
    name: 'Sunset Palm Coast',
    category: 'Golden Coast',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=85',
    tintColor: '#ff7700',
    defaultGroundY: 5,
    defaultScale: 1.1,
  },
];
