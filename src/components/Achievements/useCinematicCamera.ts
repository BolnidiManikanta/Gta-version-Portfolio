import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface CameraState {
  x: number; // percentage or px
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  dolly: number;
  worldBreath: number; // 0 to 1 organic world breathing wave
  transitionProgress: number; // 0 to 1
  transitionPhase: number; // 1 to 6
  isTransitioning: boolean;
  flashIntensity: number; // 0 to 1 golden flash on dais
}

interface UseCinematicCameraOptions {
  activeIndex: number;
  reducedMotion?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export function useCinematicCamera({
  activeIndex,
  reducedMotion = false,
  onNext,
  onPrev,
}: UseCinematicCameraOptions) {
  // Target coordinates (raw input)
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef<number>(0);
  const targetScrollOffset = useRef<number>(0);

  // Transition state
  const prevIndex = useRef(activeIndex);
  const transitionStart = useRef<number>(0);
  const [transitionState, setTransitionState] = useState({
    isTransitioning: false,
    phase: 6,
    progress: 1,
    flashIntensity: 0,
  });

  const [camera, setCamera] = useState<CameraState>({
    x: 0,
    y: 0,
    z: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    dolly: 0,
    worldBreath: 0,
    transitionProgress: 1,
    transitionPhase: 6,
    isTransitioning: false,
    flashIntensity: 0,
  });

  // Handle activeIndex changes -> trigger the 6-phase mini cinematic sequence
  useEffect(() => {
    if (prevIndex.current !== activeIndex) {
      prevIndex.current = activeIndex;
      if (!reducedMotion) {
        transitionStart.current = performance.now();
        setTransitionState({
          isTransitioning: true,
          phase: 1,
          progress: 0,
          flashIntensity: 0.2,
        });
      }
    }
  }, [activeIndex, reducedMotion]);

  // Window mouse movement listener
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
      targetMouse.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      };
    };

    const handleMouseLeave = () => {
      targetMouse.current = { x: 0, y: 0 };
    };

    // Mobile device orientation (gyroscope)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: -90 to 90 (left to right tilt)
        // beta: -180 to 180 (front to back tilt)
        const gx = Math.max(-1, Math.min(1, e.gamma / 35));
        const gy = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
        targetMouse.current = { x: gx, y: gy };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    if (window.DeviceOrientationEvent && typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [reducedMotion]);

  // Wheel scroll camera depth handler
  const handleWheel = useCallback(
    (e: React.WheelEvent | WheelEvent) => {
      if (reducedMotion) return;
      const dy = e.deltaY;
      if (Math.abs(dy) > 20) {
        targetScrollOffset.current += Math.sign(dy) * 25;
        // Limit scroll accumulation
        targetScrollOffset.current = Math.max(-80, Math.min(80, targetScrollOffset.current));
      }
    },
    [reducedMotion]
  );

  // Main 60 FPS Camera Animation Loop
  useEffect(() => {
    if (reducedMotion) {
      setCamera({
        x: 0,
        y: 0,
        z: 0,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        dolly: 0,
        worldBreath: 0.5,
        transitionProgress: 1,
        transitionPhase: 6,
        isTransitioning: false,
        flashIntensity: 0,
      });
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // 1. Smoothly interpolate mouse (spring damping)
      const lerpFactor = 0.055;
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * lerpFactor;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * lerpFactor;

      // 2. Smoothly decay scroll offset back to 0
      scrollOffset.current += (targetScrollOffset.current - scrollOffset.current) * 0.08;
      targetScrollOffset.current *= 0.92;

      // 3. Cinematic Virtual Camera Continuous Breathing (Subtle: -1% to +1% X, -0.5% to +0.5% Y, 0.3°-0.6° Rot)
      const breatheX = Math.sin(elapsed * 0.28) * 1.0; // %
      const breatheY = Math.cos(elapsed * 0.22) * 0.5; // %
      // 18-24 second slow cinematic camera push-pull dolly
      const dolly = Math.sin(elapsed * (Math.PI * 2 / 21)) * 24; // px depth
      const breatheRotZ = Math.sin(elapsed * 0.19) * 0.45; // deg

      // 4. "Living World Breathing" system (every 14s subtle atmospheric swell)
      // Cycle: 0 to 1 smooth bell curve
      const worldCycle = (elapsed % 14.0) / 14.0;
      const worldBreath = Math.pow(Math.sin(worldCycle * Math.PI), 2); // 0 -> 1 -> 0

      // 5. 6-Phase Mini Cinematic Transition
      let tPhase = 6;
      let tProg = 1;
      let tFlash = 0;
      let transitionZOffset = 0;
      let transitionRotY = 0;

      if (transitionStart.current > 0) {
        const transElapsed = now - transitionStart.current;
        const totalDuration = 1200; // 1.2s

        if (transElapsed < totalDuration) {
          tProg = transElapsed / totalDuration;

          // PHASE 1 (0-180ms): Current exhibit slightly pulls backward
          if (transElapsed < 180) {
            tPhase = 1;
            const p1 = transElapsed / 180;
            transitionZOffset = -p1 * 40;
            tFlash = 0.2 * p1;
          }
          // PHASE 2 (180-450ms): Camera shifts toward new position
          else if (transElapsed < 450) {
            tPhase = 2;
            const p2 = (transElapsed - 180) / 270;
            transitionZOffset = -40 - Math.sin(p2 * Math.PI) * 15;
            transitionRotY = Math.sin(p2 * Math.PI) * 1.8;
            tFlash = 0.2 + p2 * 0.3;
          }
          // PHASE 3 (450-750ms): New exhibit moves from background toward foreground
          else if (transElapsed < 750) {
            tPhase = 3;
            const p3 = (transElapsed - 450) / 300;
            transitionZOffset = -40 + p3 * 65; // swoops forward
            transitionRotY = (1 - p3) * 1.8;
            tFlash = 0.5 + p3 * 0.5; // reaches peak golden flash
          }
          // PHASE 4 (750-950ms): Gold light activates around new exhibit
          else if (transElapsed < 950) {
            tPhase = 4;
            const p4 = (transElapsed - 750) / 200;
            transitionZOffset = 25 * (1 - p4 * 0.4);
            tFlash = 1.0 - p4 * 0.4;
          }
          // PHASE 5 (950-1100ms): New exhibit becomes sharp and dominant
          else if (transElapsed < 1100) {
            tPhase = 5;
            const p5 = (transElapsed - 950) / 150;
            transitionZOffset = 15 * (1 - p5);
            tFlash = 0.6 * (1 - p5 * 0.6);
          }
          // PHASE 6 (1100-1200ms): Background settles
          else {
            tPhase = 6;
            const p6 = (transElapsed - 1100) / 100;
            transitionZOffset = 0;
            tFlash = 0.24 * (1 - p6);
          }
        } else {
          transitionStart.current = 0;
          tPhase = 6;
          tProg = 1;
          tFlash = 0;
        }
      }

      // Camera composites
      const finalX = breatheX + currentMouse.current.x * -1.5;
      const finalY = breatheY + currentMouse.current.y * -1.0;
      const finalZ = dolly + scrollOffset.current + transitionZOffset;
      const finalRotX = currentMouse.current.y * -0.45;
      const finalRotY = currentMouse.current.x * 0.55 + transitionRotY;
      const finalRotZ = breatheRotZ;

      setCamera({
        x: finalX,
        y: finalY,
        z: finalZ,
        rotX: finalRotX,
        rotY: finalRotY,
        rotZ: finalRotZ,
        dolly,
        worldBreath,
        transitionProgress: tProg,
        transitionPhase: tPhase,
        isTransitioning: tPhase < 6,
        flashIntensity: tFlash,
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  return {
    camera,
    handleWheel,
    setTargetMouse: (x: number, y: number) => {
      targetMouse.current = { x, y };
    },
  };
}
