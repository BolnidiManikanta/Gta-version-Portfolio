import React, { useState } from 'react';
import {
  WorldAlignmentSettings,
  HighlightColor,
  WorldMotionMode,
  KeyingMode,
  PRESET_BACKGROUND_WORLDS,
} from './types';
import {
  Sliders,
  Sparkles,
  Layers,
  Move,
  Camera,
  Video,
  Image as ImageIcon,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  X,
  UploadCloud,
  Check,
} from 'lucide-react';

interface WorldAlignmentControlsProps {
  settings: WorldAlignmentSettings;
  onChange: (newSettings: WorldAlignmentSettings) => void;
  onReset: () => void;
  showGuide: boolean;
  onToggleGuide: () => void;
  onSelectBackground: (url: string, tintColor?: string, groundY?: number, scale?: number) => void;
  onSelectVideoSource: (type: 'default' | 'alt' | 'webcam') => void;
  currentVideoSource: string;
  onUploadVideoClick: () => void;
  onUploadBgClick: () => void;
  isWebcamActive: boolean;
}

export const WorldAlignmentControls: React.FC<WorldAlignmentControlsProps> = ({
  settings,
  onChange,
  onReset,
  showGuide,
  onToggleGuide,
  onSelectBackground,
  onSelectVideoSource,
  currentVideoSource,
  onUploadVideoClick,
  onUploadBgClick,
  isWebcamActive,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'align' | 'highlight' | 'world' | 'media'>('align');

  const updateSetting = <K extends keyof WorldAlignmentSettings>(
    key: K,
    value: WorldAlignmentSettings[K]
  ) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  const highlightColors: { label: string; color: HighlightColor }[] = [
    { label: 'Vice Pink', color: '#ff007f' },
    { label: 'Cyan Glow', color: '#00f0ff' },
    { label: 'Sun Amber', color: '#ffb700' },
    { label: 'Pure White', color: '#ffffff' },
    { label: 'Cyber Purple', color: '#a855f7' },
  ];

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 select-none font-sans pointer-events-auto">
      {/* Minimized Toggle Button */}
      {!isOpen && (
        <div className="flex items-center gap-2">
          <button
            id="toggle-alignment-guide-btn"
            type="button"
            onClick={onToggleGuide}
            className={`px-3 py-2 rounded-lg backdrop-blur-md border text-xs font-hud tracking-wider flex items-center gap-1.5 transition-all shadow-lg cursor-pointer ${
              showGuide
                ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-black/75 border-white/20 text-white/70 hover:text-white hover:border-white/40'
            }`}
            title="Toggle Ground Horizon Guide"
          >
            {showGuide ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showGuide ? 'GUIDE ON' : 'ALIGN GUIDE'}</span>
          </button>

          <button
            id="open-alignment-studio-btn"
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-lg bg-black/85 backdrop-blur-md border-2 border-pink-500 hover:border-pink-400 text-white font-hud text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(236,0,140,0.5)] hover:shadow-[0_0_25px_rgba(236,0,140,0.8)] transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-pink-400 group-hover:rotate-12 transition-transform" />
            <span>ALIGN & HIGHLIGHT STUDIO</span>
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </button>
        </div>
      )}

      {/* Expanded Studio Panel */}
      {isOpen && (
        <div className="w-[340px] sm:w-[390px] max-h-[85vh] flex flex-col rounded-2xl bg-[#0d0417]/95 backdrop-blur-xl border border-pink-500/60 shadow-[0_0_40px_rgba(0,0,0,0.9),0_0_20px_rgba(236,0,140,0.3)] text-white overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-pink-500/30 bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-black/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <div>
                <h3 className="font-hud text-xs font-bold tracking-widest text-white uppercase">
                  WORLD ALIGN & HIGHLIGHT STUDIO
                </h3>
                <p className="text-[10px] text-pink-300/70">
                  Embed walker naturally into the 3D world
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onReset}
                title="Reset to Perfect Preset"
                className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-pink-500/30 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-4 border-b border-white/10 bg-black/40 text-[11px] font-hud tracking-wider">
            <button
              type="button"
              onClick={() => setActiveTab('align')}
              className={`py-2 flex flex-col items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'align'
                  ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Move className="w-3.5 h-3.5" />
              <span>ALIGN</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('highlight')}
              className={`py-2 flex flex-col items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'highlight'
                  ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>HIGHLIGHT</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('world')}
              className={`py-2 flex flex-col items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'world'
                  ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>SHADOWS</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`py-2 flex flex-col items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'media'
                  ? 'border-pink-500 text-pink-300 bg-pink-500/10'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>MEDIA</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh] text-xs">
            {/* TAB 1: ALIGN & PERSPECTIVE */}
            {activeTab === 'align' && (
              <div className="space-y-3.5">
                {/* Visual Horizon Guide Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-hud font-bold text-cyan-300">Ground Alignment Guide</div>
                      <div className="text-[10px] text-white/60">Shows horizon contact line for feet</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleGuide}
                    className={`px-3 py-1 rounded text-[11px] font-hud font-bold transition-all cursor-pointer ${
                      showGuide
                        ? 'bg-cyan-500 text-black shadow-[0_0_10px_#00f0ff]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {showGuide ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Ground Y (Feet Placement) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">Feet Ground Level (Y):</span>
                    <span className="font-hud text-pink-400 font-bold">{settings.groundY} px</span>
                  </div>
                  <input
                    type="range"
                    min={-80}
                    max={80}
                    step={1}
                    value={settings.groundY}
                    onChange={(e) => updateSetting('groundY', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>Higher (Back)</span>
                    <span>Pavement (Default: +15px)</span>
                    <span>Lower (Forward)</span>
                  </div>
                </div>

                {/* Subject Scale (Z-Depth Distance) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">Subject Scale (Depth):</span>
                    <span className="font-hud text-pink-400 font-bold">{(settings.scale * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.7}
                    max={1.6}
                    step={0.02}
                    value={settings.scale}
                    onChange={(e) => updateSetting('scale', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>70% (Deep Corridor)</span>
                    <span>115% (Golden Align)</span>
                    <span>160% (Hero Close-up)</span>
                  </div>
                </div>

                {/* Horizontal X Placement */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">Horizontal Lane (X):</span>
                    <span className="font-hud text-pink-400 font-bold">{settings.offsetX} px</span>
                  </div>
                  <input
                    type="range"
                    min={-160}
                    max={160}
                    step={2}
                    value={settings.offsetX}
                    onChange={(e) => updateSetting('offsetX', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-2 border-t border-white/10">
                  <div className="font-hud text-[11px] text-white/60 mb-2">QUICK ALIGNMENT PRESETS:</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onChange({
                          ...settings,
                          groundY: 15,
                          scale: 1.15,
                          offsetX: 0,
                          highlightIntensity: 0.75,
                        });
                      }}
                      className="py-1.5 px-2 rounded bg-pink-950/60 border border-pink-500/50 hover:bg-pink-900 text-[10px] font-hud text-pink-300 font-bold text-center cursor-pointer"
                    >
                      Golden Pavement
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onChange({
                          ...settings,
                          groundY: -10,
                          scale: 0.95,
                          offsetX: 0,
                          highlightIntensity: 0.85,
                        });
                      }}
                      className="py-1.5 px-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-hud text-white/80 font-bold text-center cursor-pointer"
                    >
                      Distant Corridor
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onChange({
                          ...settings,
                          groundY: 35,
                          scale: 1.35,
                          offsetX: 0,
                          highlightIntensity: 0.65,
                        });
                      }}
                      className="py-1.5 px-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-hud text-white/80 font-bold text-center cursor-pointer"
                    >
                      Hero Walkway
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HIGHLIGHT & LIGHTING */}
            {activeTab === 'highlight' && (
              <div className="space-y-3.5">
                <div className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/30">
                  <div className="font-hud font-bold text-pink-300 text-xs">
                    Subject Highlight Engine
                  </div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    Gives the walker a luminous edge contour glow matching the background world.
                  </div>
                </div>

                {/* Highlight Glow Intensity */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">Highlight Glow & Pop:</span>
                    <span className="font-hud text-pink-400 font-bold">
                      {(settings.highlightIntensity * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    value={settings.highlightIntensity}
                    onChange={(e) => updateSetting('highlightIntensity', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>

                {/* Rim Highlight Color */}
                <div>
                  <span className="font-hud font-bold text-white/90 block mb-2">
                    Rim Light Ambient Glow Color:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {highlightColors.map((hc) => (
                      <button
                        key={hc.color}
                        type="button"
                        onClick={() => updateSetting('highlightColor', hc.color)}
                        className={`py-1.5 rounded-md flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                          settings.highlightColor === hc.color
                            ? 'border-white ring-2 ring-pink-500 bg-white/10'
                            : 'border-white/10 bg-black/40 hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shadow-md"
                          style={{ backgroundColor: hc.color }}
                        />
                        <span className="text-[9px] font-hud text-white/70">{hc.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brightness & Contrast */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <div className="flex justify-between font-hud text-[11px] mb-1">
                      <span>Brightness</span>
                      <span className="text-pink-400">{settings.brightness.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.8}
                      max={1.4}
                      step={0.02}
                      value={settings.brightness}
                      onChange={(e) => updateSetting('brightness', parseFloat(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-hud text-[11px] mb-1">
                      <span>Contrast</span>
                      <span className="text-pink-400">{settings.contrast.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.8}
                      max={1.4}
                      step={0.02}
                      value={settings.contrast}
                      onChange={(e) => updateSetting('contrast', parseFloat(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Ambient World Tint Bleed */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">World Ambient Tint Wrap:</span>
                    <span className="font-hud text-pink-400 font-bold">
                      {(settings.ambientTint * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={0.5}
                    step={0.05}
                    value={settings.ambientTint}
                    onChange={(e) => updateSetting('ambientTint', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-white/40 mt-1">
                    Blends the background neon color naturally onto the subject's clothes and skin.
                  </div>
                </div>

                {/* Keying Threshold (Black BG Removal) */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-hud font-bold text-white/90">Black Background Clean Cut:</span>
                    <span className="font-hud text-pink-400 font-bold">{settings.lumaThreshold.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.02}
                    max={0.20}
                    step={0.01}
                    value={settings.lumaThreshold}
                    onChange={(e) => updateSetting('lumaThreshold', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: SHADOWS, REFLECTIONS & WORLD KINEMATICS */}
            {activeTab === 'world' && (
              <div className="space-y-3.5">
                {/* World Motion Mode */}
                <div>
                  <span className="font-hud font-bold text-white/90 block mb-1.5">
                    Camera & World Motion Sync:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(
                      [
                        { id: 'forward_dolly', label: 'Forward Cinematic Walk' },
                        { id: 'walking_sway', label: 'Step Cadence Sway' },
                        { id: 'parallax_drift', label: 'Parallax Street Drift' },
                        { id: 'static', label: 'Fixed Locked Camera' },
                      ] as { id: WorldMotionMode; label: string }[]
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => updateSetting('worldMotion', mode.id)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          settings.worldMotion === mode.id
                            ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-hud font-bold text-[11px]">{mode.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ground Cast Shadow */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">Ground Footprint Shadow:</span>
                    <span className="font-hud text-pink-400 font-bold">
                      {(settings.shadowIntensity * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    value={settings.shadowIntensity}
                    onChange={(e) => updateSetting('shadowIntensity', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-white/40 mt-1">
                    Projects realistic perspective shadow directly beneath the feet.
                  </div>
                </div>

                {/* Wet Pavement Reflection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-hud font-bold text-white/90">Wet Street Reflection:</span>
                    <span className="font-hud text-pink-400 font-bold">
                      {(settings.reflectionIntensity * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={0.8}
                    step={0.05}
                    value={settings.reflectionIntensity}
                    onChange={(e) => updateSetting('reflectionIntensity', parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-white/40 mt-1">
                    Mirrors the character and neon lighting on the asphalt floor.
                  </div>
                </div>

                {/* Atmospheric Layers */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="font-hud font-bold text-white/90">Atmospheric Depth Layers:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateSetting('atmosphericParticles', !settings.atmosphericParticles)}
                      className={`py-1.5 px-2.5 rounded-lg border text-left font-hud text-[11px] font-bold flex items-center justify-between cursor-pointer ${
                        settings.atmosphericParticles
                          ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                          : 'bg-white/5 border-white/10 text-white/50'
                      }`}
                    >
                      <span>Neon Embers & Mist</span>
                      {settings.atmosphericParticles && <Check className="w-3.5 h-3.5 text-pink-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => updateSetting('rainEffect', !settings.rainEffect)}
                      className={`py-1.5 px-2.5 rounded-lg border text-left font-hud text-[11px] font-bold flex items-center justify-between cursor-pointer ${
                        settings.rainEffect
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-white/50'
                      }`}
                    >
                      <span>Vice City Rain</span>
                      {settings.rainEffect && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MEDIA SOURCE & BACKGROUND WORLDS */}
            {activeTab === 'media' && (
              <div className="space-y-3.5">
                {/* Walking Video Selection */}
                <div>
                  <span className="font-hud font-bold text-white/90 block mb-2">
                    Walking Subject Source:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectVideoSource('default')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        currentVideoSource === '/walking.mp4' && !isWebcamActive
                          ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-hud font-bold text-[11px]">Bolnidi Walking 1</div>
                      <div className="text-[9px] text-white/50">walking.mp4</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectVideoSource('alt')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        currentVideoSource === '/walking(2).mp4' && !isWebcamActive
                          ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-hud font-bold text-[11px]">Bolnidi Walking 2</div>
                      <div className="text-[9px] text-white/50">walking(2).mp4</div>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => onSelectVideoSource('webcam')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        isWebcamActive
                          ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-hud font-bold text-[11px] flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Live Webcam</span>
                      </div>
                      <div className="text-[9px] text-white/50">Walk in front of cam!</div>
                    </button>

                    <button
                      type="button"
                      onClick={onUploadVideoClick}
                      className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-left transition-all cursor-pointer"
                    >
                      <div className="font-hud font-bold text-[11px] flex items-center gap-1">
                        <UploadCloud className="w-3.5 h-3.5 text-pink-400" />
                        <span>Upload Video</span>
                      </div>
                      <div className="text-[9px] text-white/50">MP4 / WebM</div>
                    </button>
                  </div>
                </div>

                {/* Preset Background Worlds */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-hud font-bold text-white/90">Background Worlds:</span>
                    <button
                      type="button"
                      onClick={onUploadBgClick}
                      className="text-[10px] font-hud text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer"
                    >
                      <UploadCloud className="w-3 h-3" />
                      <span>Custom BG</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_BACKGROUND_WORLDS.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() =>
                          onSelectBackground(w.url, w.tintColor, w.defaultGroundY, w.defaultScale)
                        }
                        className="group relative h-16 rounded-lg overflow-hidden border border-white/15 hover:border-pink-500 transition-all text-left cursor-pointer"
                      >
                        <img
                          src={w.url}
                          alt={w.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-1.5 flex flex-col justify-end">
                          <span className="font-hud font-bold text-[10px] text-white leading-tight">
                            {w.name}
                          </span>
                          <span className="text-[8px] text-pink-400">{w.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Reset & Quick Close */}
          <div className="px-4 py-2.5 border-t border-white/10 bg-black/70 flex items-center justify-between text-xs">
            <span className="text-[10px] font-hud text-white/50">
              SETTINGS PERSISTED TO DEVICE
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded bg-pink-600 hover:bg-pink-500 font-hud text-xs font-bold text-white tracking-wider cursor-pointer"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
