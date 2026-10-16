import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gtaAudio } from '../../utils/audio';
import { INTRO_VIDEO_URL } from '../../config/backgroundTheme';

interface CinematicWalkingIntroProps {
  onEnter: () => void;
}

export const CinematicWalkingIntro: React.FC<CinematicWalkingIntroProps> = ({
  onEnter,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>(INTRO_VIDEO_URL || '/Intro.mp4');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Smooth entrance transition into the home page
  const handleFinishIntro = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    try {
      gtaAudio.playCameraSwoosh();
    } catch {
      // Safe audio
    }

    setTimeout(() => {
      onEnter();
    }, 450);
  }, [isTransitioning, onEnter]);

  // Auto-play attempt on mount: try unmuted, fall back to muted if browser blocks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked unmuted autoplay -> play muted and unmute on first user click
        video.muted = true;
        video.play().catch((err) => {
          console.warn('Video playback was blocked:', err);
        });
      });
    }
  }, [videoSrc]);

  // Video error fallback resolution (casing fallback)
  const handleVideoError = () => {
    console.warn('Intro video failed to load from:', videoSrc);
    if (videoSrc === '/Intro.mp4') {
      setVideoSrc('/intro.mp4');
    } else if (videoSrc === '/intro.mp4') {
      setVideoSrc('Intro.mp4');
    } else if (videoSrc === 'Intro.mp4') {
      setVideoSrc('intro.mp4');
    }
  };

  // Keyboard shortcut listener (Enter, Space, Escape to proceed to home)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleFinishIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinishIntro]);

  // Handle click on screen: if video is muted, unmute it; also allow immediate enter on click
  const handleClick = () => {
    const video = videoRef.current;
    if (video && video.muted) {
      video.muted = false;
      return;
    }
    handleFinishIntro();
  };

  return (
    <div
      id="cinematic-intro-player"
      onClick={handleClick}
      className="fixed inset-0 w-screen h-screen z-50 overflow-hidden bg-black select-none pointer-events-auto cursor-pointer"
      title="Click or press Enter to skip"
    >
      {/* PURE INTRO VIDEO - NO EXTRA OVERLAY LAYERS */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        playsInline
        onEnded={() => handleFinishIntro()}
        onError={handleVideoError}
        className="w-full h-full object-cover"
      />

      {/* Cinematic Flash & Entrance Transition */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-gradient-to-tr from-pink-600 via-white to-cyan-400 animate-in fade-in duration-500 pointer-events-none opacity-95 flex items-center justify-center">
          <div className="font-hud text-3xl sm:text-5xl text-black font-black tracking-widest animate-pulse">
            ENTERING HOME...
          </div>
        </div>
      )}
    </div>
  );
};
