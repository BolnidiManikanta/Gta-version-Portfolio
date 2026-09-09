import React, { useState, useEffect, useRef } from 'react';
import { DistrictId } from '../../types';
import { gtaAudio } from '../../utils/audio';
import {
  UploadCloud,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  Play,
  ArrowRight,
} from 'lucide-react';
import {
  saveVideoToIndexedDB,
  getVideoFromIndexedDB,
  saveBgImageToIndexedDB,
  getBgImageFromIndexedDB,
} from '../../utils/videoStorage';
import { INTRO_BACKGROUND_IMAGE } from '../../config/backgroundTheme';
import { WalkingCompositor } from './WalkingCompositor';
import { WorldAlignmentControls } from './WorldAlignmentControls';
import {
  WorldAlignmentSettings,
  DEFAULT_ALIGNMENT_SETTINGS,
  PRESET_BACKGROUND_WORLDS,
} from './types';

interface CinematicWalkingIntroProps {
  onEnter: (targetDistrict?: DistrictId) => void;
}

export const CinematicWalkingIntro: React.FC<CinematicWalkingIntroProps> = ({
  onEnter,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadModeRef = useRef<'image' | 'video'>('video');

  // Media sources
  const [videoSrc, setVideoSrc] = useState<string>('/walking.mp4');
  const [bgImageSrc, setBgImageSrc] = useState<string | null>(
    INTRO_BACKGROUND_IMAGE || '/bg-intro.png'
  );

  // Alignment Settings with LocalStorage persistence
  const [settings, setSettings] = useState<WorldAlignmentSettings>(() => {
    try {
      const saved = localStorage.getItem('world_alignment_settings_v2');
      if (saved) {
        return { ...DEFAULT_ALIGNMENT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ALIGNMENT_SETTINGS;
  });

  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);

  const [videoReady, setVideoReady] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save settings on update
  const handleSettingsChange = (newSettings: WorldAlignmentSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('world_alignment_settings_v2', JSON.stringify(newSettings));
    } catch {
      // Ignore
    }
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_ALIGNMENT_SETTINGS);
    try {
      localStorage.removeItem('world_alignment_settings_v2');
    } catch {}
    setToastMessage('Reset to Golden Alignment Preset!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 1. Check background image and cached media
  useEffect(() => {
    let isCancelled = false;

    if (
      INTRO_BACKGROUND_IMAGE &&
      (INTRO_BACKGROUND_IMAGE.startsWith('http') ||
        INTRO_BACKGROUND_IMAGE.startsWith('data:') ||
        INTRO_BACKGROUND_IMAGE.startsWith('blob:'))
    ) {
      setBgImageSrc(INTRO_BACKGROUND_IMAGE);
      return;
    }

    const candidates = [
      INTRO_BACKGROUND_IMAGE,
      '/bg-intro.png',
      '/intro-bg.png',
      '/image.png',
    ].filter(Boolean) as string[];

    const tryNextCandidate = (index: number) => {
      if (isCancelled) return;
      if (index >= candidates.length) {
        getBgImageFromIndexedDB().then((blob) => {
          if (!isCancelled && blob) {
            const localImgUrl = URL.createObjectURL(blob);
            setBgImageSrc(localImgUrl);
          }
        });
        return;
      }

      const candidate = candidates[index];
      const testImg = new Image();
      testImg.src = candidate;
      testImg.onload = () => {
        if (!isCancelled && testImg.naturalWidth > 10) {
          setBgImageSrc(candidate);
        } else {
          tryNextCandidate(index + 1);
        }
      };
      testImg.onerror = () => {
        tryNextCandidate(index + 1);
      };
    };

    tryNextCandidate(0);

    // Check cached video
    getVideoFromIndexedDB().then((blob) => {
      if (!isCancelled && blob) {
        const localBlobUrl = URL.createObjectURL(blob);
        setVideoSrc(localBlobUrl);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Cleanup webcam stream on unmount
  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [webcamStream]);

  // Video error fallback resolution
  const handleVideoError = () => {
    if (videoSrc === '/walking.mp4') {
      setVideoSrc('/walking(2).mp4');
    } else if (videoSrc === '/walking(2).mp4') {
      setVideoSrc('walking.mp4');
    } else if (videoSrc === 'walking.mp4') {
      setVideoSrc('walking(2).mp4');
    }
  };

  // Video Source Switcher
  const handleSelectVideoSource = async (type: 'default' | 'alt' | 'webcam') => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }

    if (type === 'default') {
      setVideoSrc('/walking.mp4');
      setToastMessage('Loaded Default Walking Video (walking.mp4)');
    } else if (type === 'alt') {
      setVideoSrc('/walking(2).mp4');
      setToastMessage('Loaded Alternate Walking Video (walking(2).mp4)');
    } else if (type === 'webcam') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false,
        });
        setWebcamStream(stream);
        setToastMessage('Live Webcam Activated! Walk in front of camera');
      } catch (err) {
        console.warn('Webcam permission error:', err);
        setToastMessage('Camera permission not granted or unavailable');
      }
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Background Selection
  const handleSelectBackground = (
    url: string,
    tintColor?: string,
    groundY?: number,
    scale?: number
  ) => {
    setBgImageSrc(url);
    if (tintColor || groundY !== undefined || scale !== undefined) {
      setSettings((prev) => ({
        ...prev,
        highlightColor: (tintColor as any) || prev.highlightColor,
        groundY: groundY !== undefined ? groundY : prev.groundY,
        scale: scale !== undefined ? scale : prev.scale,
      }));
    }
    setToastMessage('Background world updated!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Handle Enter Action -> Redirect to Home Page or direct district
  const handleEnterWorld = (targetDistrict?: DistrictId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    try {
      gtaAudio.playCameraSwoosh();
    } catch {
      // Safe audio
    }

    setTimeout(() => {
      onEnter(targetDistrict);
    }, 650);
  };

  // Keyboard shortcut listener (Enter / Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is interacting with form controls or inputs
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnterWorld();
      } else if (e.key === 'g' || e.key === 'G') {
        setShowGuide((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  // Handle image upload / drop
  const processUploadedImage = async (file: File) => {
    try {
      const blobUrl = URL.createObjectURL(file);
      setBgImageSrc(blobUrl);
      await saveBgImageToIndexedDB(file);
      setToastMessage('Custom background world updated!');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error('Error processing background image:', err);
    }
  };

  // Handle video upload / drop
  const processUploadedVideo = async (file: File) => {
    try {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
        setWebcamStream(null);
      }
      const blobUrl = URL.createObjectURL(file);
      setVideoSrc(blobUrl);
      setVideoReady(true);
      await saveVideoToIndexedDB(file);
      setToastMessage('Custom walking video loaded & aligned!');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error('Error loading video:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/') || file.name.match(/\.(png|jpe?g|webp)$/i)) {
      processUploadedImage(file);
    } else if (file.type.startsWith('video/') || file.name.endsWith('.mp4')) {
      processUploadedVideo(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadModeRef.current === 'image') {
      processUploadedImage(file);
    } else {
      processUploadedVideo(file);
    }
  };

  const triggerUpload = (mode: 'image' | 'video') => {
    uploadModeRef.current = mode;
    if (fileInputRef.current) {
      fileInputRef.current.accept = mode === 'image' ? 'image/*' : 'video/*,video/mp4';
      fileInputRef.current.click();
    }
  };

  return (
    <div
      id="cinematic-walking-intro"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="fixed inset-0 w-screen h-screen z-50 overflow-hidden bg-black select-none pointer-events-auto font-sans text-white cursor-pointer"
      onClick={(e) => {
        // Only trigger enter world if clicking on the background, not on interactive studio controls
        const target = e.target as HTMLElement;
        if (target.closest('.pointer-events-auto') && !target.closest('#cinematic-walking-intro')) {
          return;
        }
        handleEnterWorld();
      }}
      title="Click or press Enter to explore"
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* =========================================================================
          REAL-TIME WALKING COMPOSITOR (KEYED, HIGHLIGHTED & PERSPECTIVELY ALIGNED)
         ========================================================================= */}
      <WalkingCompositor
        videoSrc={videoSrc}
        bgImageSrc={bgImageSrc}
        settings={settings}
        isMuted={isMuted}
        onVideoReady={() => setVideoReady(true)}
        onVideoError={handleVideoError}
        showGuide={showGuide}
        webcamStream={webcamStream}
      />

      {/* =========================================================================
          TOP BAR: SOUND TOGGLE & QUICK ENTER BUTTON
         ========================================================================= */}
      <div
        className="absolute top-4 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Left: Logo & Alignment Status Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-pink-500/50 shadow-[0_0_15px_rgba(236,0,140,0.4)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="font-hud text-xs font-bold text-pink-300 tracking-wider uppercase">
              WORLD COMPOSITOR ACTIVE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-hud text-white/70 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>
              Subject Highlight: <strong className="text-pink-300">{(settings.highlightIntensity * 100).toFixed(0)}%</strong>
            </span>
            <span className="text-white/30">•</span>
            <span>
              Ground Contact: <strong className="text-cyan-300">Aligned</strong>
            </span>
          </div>
        </div>

        {/* Top Right: Audio Mute & Enter Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="p-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 hover:border-pink-500 text-white hover:text-pink-300 transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-400" />}
          </button>

          <button
            id="enter-home-top-btn"
            type="button"
            onClick={() => handleEnterWorld()}
            className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-hud text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(236,0,140,0.7)] flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
          >
            <span>ENTER WORLD</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          CENTER / BOTTOM PROMPT: "PRESS ENTER >>"
         ========================================================================= */}
      <div
        className="absolute bottom-20 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          handleEnterWorld();
        }}
      >
        <button
          type="button"
          className="group px-6 py-3 rounded-xl bg-black/85 backdrop-blur-md border-2 border-pink-500 hover:border-cyan-400 shadow-[0_0_30px_rgba(236,0,140,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all cursor-pointer flex items-center gap-3"
        >
          <Play className="w-4 h-4 text-pink-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          <div className="text-left">
            <div className="font-hud text-xs sm:text-sm font-black text-white tracking-widest uppercase group-hover:text-cyan-200 transition-colors">
              PRESS ENTER TO ENTER WORLD [ ↵ ]
            </div>
            <div className="text-[10px] text-pink-300/80 font-hud tracking-wider">
              Bolnidi Manikanta • GTA Cinematic Portfolio
            </div>
          </div>
        </button>
      </div>

      {/* =========================================================================
          LEFT SIDE: QUICK DISTRICT HOTSPOTS
         ========================================================================= */}
      <div
        className="absolute z-20 left-4 top-24 hidden md:flex flex-col gap-1.5 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-hud text-[10px] font-bold text-white/50 tracking-widest uppercase px-2 mb-1">
          DIRECT JUMP:
        </div>
        {[
          { label: 'PLAYER HQ', district: 'player_hq' as DistrictId },
          { label: 'AI LAB', district: 'ai_lab' as DistrictId },
          { label: 'CYBER DISTRICT', district: 'cyber_district' as DistrictId },
          { label: 'DEV PROJECTS', district: 'dev_district' as DistrictId },
          { label: 'ACHIEVEMENTS', district: 'achievement_hq' as DistrictId },
          { label: 'COMMS TERMINAL', district: 'comms_center' as DistrictId },
        ].map((item) => (
          <button
            key={item.district}
            type="button"
            onClick={() => handleEnterWorld(item.district)}
            className="px-3 py-1.5 rounded bg-black/60 hover:bg-pink-900/60 border border-white/10 hover:border-pink-500 text-left font-hud text-xs text-white/80 hover:text-pink-200 transition-all cursor-pointer backdrop-blur-sm"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          INTERACTIVE ALIGN & HIGHLIGHT STUDIO (DOCK CONTROLS)
         ========================================================================= */}
      <div onClick={(e) => e.stopPropagation()}>
        <WorldAlignmentControls
          settings={settings}
          onChange={handleSettingsChange}
          onReset={handleResetSettings}
          showGuide={showGuide}
          onToggleGuide={() => setShowGuide((prev) => !prev)}
          onSelectBackground={handleSelectBackground}
          onSelectVideoSource={handleSelectVideoSource}
          currentVideoSource={videoSrc}
          onUploadVideoClick={() => triggerUpload('video')}
          onUploadBgClick={() => triggerUpload('image')}
          isWebcamActive={!!webcamStream}
        />
      </div>

      {/* Drag & drop overlay indicator */}
      {isDraggingOver && (
        <div className="fixed inset-0 z-50 bg-pink-900/70 border-4 border-dashed border-pink-400 backdrop-blur-sm flex flex-col items-center justify-center gap-3 pointer-events-none">
          <UploadCloud className="w-16 h-16 text-pink-300 animate-bounce" />
          <div className="font-hud text-2xl font-black text-white tracking-widest uppercase">
            DROP IMAGE OR VIDEO TO ALIGN IN WORLD
          </div>
          <p className="text-sm text-pink-200 font-hud">
            Release to instantly composite and synchronize!
          </p>
        </div>
      )}

      {/* Success toast notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-pink-600/90 border border-white/40 text-white font-hud text-xs tracking-wider rounded shadow-[0_0_20px_rgba(236,0,140,0.8)] flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cinematic Flash & Entrance Transition */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-gradient-to-tr from-pink-500 via-white to-cyan-400 animate-in fade-in duration-600 pointer-events-none opacity-95 flex items-center justify-center">
          <div className="font-hud text-4xl sm:text-6xl text-black font-black tracking-widest animate-pulse">
            ENTERING BOLNIDI WORLD...
          </div>
        </div>
      )}
    </div>
  );
};
