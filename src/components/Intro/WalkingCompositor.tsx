import React, { useEffect, useRef, useState, useCallback } from 'react';
import { WorldAlignmentSettings } from './types';

interface WalkingCompositorProps {
  videoSrc: string;
  bgImageSrc: string | null;
  settings: WorldAlignmentSettings;
  isMuted: boolean;
  onVideoReady?: () => void;
  onVideoError?: () => void;
  showGuide?: boolean;
  webcamStream?: MediaStream | null;
}

export const WalkingCompositor: React.FC<WalkingCompositorProps> = ({
  videoSrc,
  bgImageSrc,
  settings,
  isMuted,
  onVideoReady,
  onVideoError,
  showGuide = false,
  webcamStream = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const shadowCanvasRef = useRef<HTMLCanvasElement>(null);
  const reflectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [dollyScale, setDollyScale] = useState(1.0);
  const [cameraBob, setCameraBob] = useState({ x: 0, y: 0 });

  // WebGL context and program refs
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glTextureRef = useRef<WebGLTexture | null>(null);
  const useWebGLRef = useRef<boolean>(true);

  // Synchronize webcam stream if active
  useEffect(() => {
    const video = hiddenVideoRef.current;
    if (!video) return;

    if (webcamStream) {
      video.srcObject = webcamStream;
      video.play().catch(() => {});
    } else {
      video.srcObject = null;
      video.src = videoSrc;
      video.play().catch(() => {});
    }
  }, [webcamStream, videoSrc]);

  // Handle Mute
  useEffect(() => {
    if (hiddenVideoRef.current) {
      hiddenVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Initialize WebGL Shaders for high-performance hardware keying & grading
  const initWebGL = useCallback((canvas: HTMLCanvasElement) => {
    try {
      const gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
      });

      if (!gl) {
        useWebGLRef.current = false;
        return;
      }

      const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
          v_texCoord = a_texCoord;
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_image;
        uniform float u_lumaThreshold;
        uniform float u_lumaSmoothness;
        uniform float u_brightness;
        uniform float u_contrast;
        uniform float u_ambientTint;
        uniform vec3 u_tintColor;
        uniform int u_keyMode; // 0=luma, 1=chroma, 2=screen
        uniform vec3 u_chromaTarget;

        void main() {
          vec4 color = texture2D(u_image, v_texCoord);

          // Alpha computation
          float alpha = 1.0;

          if (u_keyMode == 0) {
            // Luma key: remove black background
            float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            alpha = smoothstep(u_lumaThreshold, u_lumaThreshold + u_lumaSmoothness, luma);
          } else if (u_keyMode == 1) {
            // Chroma key: remove green background
            float diff = distance(color.rgb, u_chromaTarget);
            alpha = smoothstep(u_lumaThreshold, u_lumaThreshold + u_lumaSmoothness, diff);
            // Green despill
            if (color.g > (color.r + color.b) * 0.5) {
              color.g = (color.r + color.b) * 0.5;
            }
          }

          // Graded color
          vec3 graded = (color.rgb - 0.5) * u_contrast + 0.5;
          graded = graded * u_brightness;

          // Ambient lighting wrap from world
          if (u_ambientTint > 0.0) {
            graded = mix(graded, graded * u_tintColor, u_ambientTint);
          }

          gl_FragColor = vec4(graded, color.a * alpha);
        }
      `;

      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) {
        useWebGLRef.current = false;
        return;
      }

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        useWebGLRef.current = false;
        return;
      }

      gl.useProgram(program);

      // Vertex Quad
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      // TexCoord Quad (flipped Y for WebGL texture)
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0, 1,
          1, 1,
          0, 0,
          0, 0,
          1, 1,
          1, 0,
        ]),
        gl.STATIC_DRAW
      );

      const texLoc = gl.getAttribLocation(program, 'a_texCoord');
      gl.enableVertexAttribArray(texLoc);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      // Texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      glRef.current = gl;
      glProgramRef.current = program;
      glTextureRef.current = texture;
      useWebGLRef.current = true;
    } catch {
      useWebGLRef.current = false;
    }
  }, []);

  // Main Render Loop: 60fps WebGL/Canvas2D Compositing & Parallax Kinematics
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const renderLoop = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const video = hiddenVideoRef.current;

      // 1. Calculate camera kinematics (walking cadence bob & forward dolly)
      if (settings.worldMotion !== 'static') {
        const walkFreq = 1.6 * settings.walkSpeed;
        const bobAmount = settings.cameraBobAmount;

        // Subtle step bounce and lateral hip sway
        const bobY = Math.sin(elapsed * Math.PI * 2 * walkFreq) * (3.5 * bobAmount);
        const swayX = Math.cos(elapsed * Math.PI * walkFreq) * (2.0 * bobAmount);
        setCameraBob({ x: swayX, y: bobY });

        // Forward dolly motion: continuous cinematic forward travel
        if (settings.worldMotion === 'forward_dolly') {
          // Slow cinematic zoom cycle (1.0 to 1.08)
          const cycle = (elapsed * 0.12 * settings.dollySpeed) % 1.0;
          const currentDolly = 1.0 + Math.sin(cycle * Math.PI) * 0.08;
          setDollyScale(currentDolly);
        } else if (settings.worldMotion === 'parallax_drift') {
          const drift = 1.0 + Math.sin(elapsed * 0.3) * 0.04;
          setDollyScale(drift);
        } else {
          setDollyScale(1.0);
        }
      } else {
        setCameraBob({ x: 0, y: 0 });
        setDollyScale(1.0);
      }

      // 2. Render Video Frame to Main Canvas
      if (video && video.readyState >= 2 && video.videoWidth > 0) {
        const canvas = mainCanvasRef.current;
        if (canvas) {
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            if (useWebGLRef.current && !glRef.current) {
              initWebGL(canvas);
            }
          }

          const gl = glRef.current;
          const program = glProgramRef.current;
          const texture = glTextureRef.current;

          if (useWebGLRef.current && gl && program && texture) {
            // WebGL Path
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

            gl.useProgram(program);

            // Set uniforms
            const uLumaThresh = gl.getUniformLocation(program, 'u_lumaThreshold');
            const uLumaSmooth = gl.getUniformLocation(program, 'u_lumaSmoothness');
            const uBrightness = gl.getUniformLocation(program, 'u_brightness');
            const uContrast = gl.getUniformLocation(program, 'u_contrast');
            const uAmbientTint = gl.getUniformLocation(program, 'u_ambientTint');
            const uTintColor = gl.getUniformLocation(program, 'u_tintColor');
            const uKeyMode = gl.getUniformLocation(program, 'u_keyMode');
            const uChromaTarget = gl.getUniformLocation(program, 'u_chromaTarget');

            gl.uniform1f(uLumaThresh, settings.lumaThreshold);
            gl.uniform1f(uLumaSmooth, settings.lumaSmoothness);
            gl.uniform1f(uBrightness, settings.brightness);
            gl.uniform1f(uContrast, settings.contrast);
            gl.uniform1f(uAmbientTint, settings.ambientTint);

            // Convert tint color to RGB
            const hexToRgb = (hex: string) => {
              const r = parseInt(hex.slice(1, 3), 16) / 255;
              const g = parseInt(hex.slice(3, 5), 16) / 255;
              const b = parseInt(hex.slice(5, 7), 16) / 255;
              return [r, g, b];
            };

            const tintRgb = hexToRgb(settings.highlightColor);
            gl.uniform3f(uTintColor, tintRgb[0], tintRgb[1], tintRgb[2]);

            const modeInt = settings.keyingMode === 'chroma' ? 1 : settings.keyingMode === 'screen' ? 2 : 0;
            gl.uniform1i(uKeyMode, modeInt);

            const chromaRgb = hexToRgb(settings.chromaColor || '#00ff00');
            gl.uniform3f(uChromaTarget, chromaRgb[0], chromaRgb[1], chromaRgb[2]);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
          } else {
            // Canvas 2D Fallback Path
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.filter = `contrast(${settings.contrast}) brightness(${settings.brightness})`;
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
          }

          // 3. Render Ground Shadow Canvas
          const shadowCanvas = shadowCanvasRef.current;
          if (shadowCanvas && settings.shadowIntensity > 0) {
            if (shadowCanvas.width !== canvas.width || shadowCanvas.height !== canvas.height) {
              shadowCanvas.width = canvas.width;
              shadowCanvas.height = canvas.height;
            }
            const sCtx = shadowCanvas.getContext('2d');
            if (sCtx) {
              sCtx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);
              sCtx.drawImage(canvas, 0, 0);
              // Darken to solid shadow
              sCtx.globalCompositeOperation = 'source-in';
              sCtx.fillStyle = 'rgba(5, 2, 10, 0.95)';
              sCtx.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);
              sCtx.globalCompositeOperation = 'source-over';
            }
          }

          // 4. Render Wet Pavement Floor Reflection Canvas
          const refCanvas = reflectionCanvasRef.current;
          if (refCanvas && settings.reflectionIntensity > 0) {
            if (refCanvas.width !== canvas.width || refCanvas.height !== canvas.height) {
              refCanvas.width = canvas.width;
              refCanvas.height = canvas.height;
            }
            const rCtx = refCanvas.getContext('2d');
            if (rCtx) {
              rCtx.clearRect(0, 0, refCanvas.width, refCanvas.height);
              rCtx.save();
              rCtx.translate(0, refCanvas.height);
              rCtx.scale(1, -1);
              rCtx.drawImage(canvas, 0, 0);
              rCtx.restore();
            }
          }
        }
      }

      // 5. Render Atmospheric Depth Particles (Rain / Mist / Dust Motes)
      const pCanvas = particlesCanvasRef.current;
      if (pCanvas && (settings.atmosphericParticles || settings.rainEffect)) {
        const pCtx = pCanvas.getContext('2d');
        if (pCtx) {
          pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

          // Draw drifting neon particles (passing in front of & around walker)
          if (settings.atmosphericParticles) {
            for (let i = 0; i < 28; i++) {
              const seed = i * 137.5;
              const px = ((seed + elapsed * (15 + (i % 10) * 4)) % pCanvas.width);
              const py = ((seed * 1.3 + Math.sin(elapsed + i) * 35) % pCanvas.height);
              const radius = 1.0 + (i % 4) * 0.8;
              const alpha = 0.25 + Math.sin(elapsed * 2 + i) * 0.2;

              pCtx.beginPath();
              pCtx.arc(px, py, radius, 0, Math.PI * 2);
              pCtx.fillStyle = i % 2 === 0 ? `rgba(255, 0, 128, ${alpha})` : `rgba(0, 240, 255, ${alpha})`;
              pCtx.shadowColor = i % 2 === 0 ? '#ff007f' : '#00f0ff';
              pCtx.shadowBlur = 8;
              pCtx.fill();
            }
          }

          // Draw Rain streaks if enabled
          if (settings.rainEffect) {
            pCtx.strokeStyle = 'rgba(180, 230, 255, 0.45)';
            pCtx.lineWidth = 1.2;
            for (let r = 0; r < 40; r++) {
              const rx = (r * 47 + elapsed * 120) % pCanvas.width;
              const ry = (r * 83 + elapsed * 850) % pCanvas.height;
              pCtx.beginPath();
              pCtx.moveTo(rx, ry);
              pCtx.lineTo(rx - 8, ry + 22);
              pCtx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [settings, initWebGL]);

  // Handle particle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const pCanvas = particlesCanvasRef.current;
      if (pCanvas) {
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute CSS Drop-Shadow for the "Highlight Video" effect requested by user
  const highlightDropShadow = settings.highlightIntensity > 0
    ? `drop-shadow(0 0 ${settings.highlightWidth * settings.highlightIntensity}px ${settings.highlightColor}) drop-shadow(0 0 ${Math.max(2, settings.highlightWidth * 0.35 * settings.highlightIntensity)}px #ffffff)`
    : 'none';

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
    >
      {/* Hidden Source Video (Element used purely to decode frames) */}
      <video
        ref={hiddenVideoRef}
        autoPlay
        playsInline
        loop
        muted={isMuted}
        crossOrigin="anonymous"
        onLoadedData={() => {
          setIsVideoLoaded(true);
          onVideoReady?.();
        }}
        onCanPlay={() => {
          setIsVideoLoaded(true);
          onVideoReady?.();
        }}
        onError={() => {
          onVideoError?.();
        }}
        className="hidden"
      />

      {/* =========================================================================
          LAYER 0: CINEMATIC BACKGROUND WORLD (WITH CAMERA SWAY & DOLLY TRAVEL)
         ========================================================================= */}
      <div
        className="absolute inset-0 z-0 overflow-hidden transition-transform duration-75 ease-out origin-center"
        style={{
          transform: `scale(${dollyScale}) translate(${cameraBob.x * 0.4}px, ${cameraBob.y * 0.4}px)`,
        }}
      >
        {bgImageSrc ? (
          <img
            src={bgImageSrc}
            alt="World Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#0a0216] via-[#16062b] to-[#04000a]" />
        )}

        {/* Ambient Ground Fog hugging the floor in background */}
        {settings.fogEffect && (
          <div
            className="absolute bottom-0 inset-x-0 h-48 pointer-events-none opacity-40 bg-gradient-to-t from-pink-950/50 via-purple-950/25 to-transparent blur-md"
            style={{
              transform: `translateY(${cameraBob.y * 0.2}px)`,
            }}
          />
        )}
      </div>

      {/* =========================================================================
          LAYER 1: GROUND PERSPECTIVE CAST SHADOW & CONTACT OCCLUSION SHADOW
          Makes the character physically cast a shadow on the floor matching footsteps!
         ========================================================================= */}
      <div
        className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none"
        style={{
          transform: `translate(${settings.offsetX + cameraBob.x}px, ${settings.groundY + cameraBob.y}px)`,
        }}
      >
        <div
          className="relative flex items-end justify-center"
          style={{
            transform: `scale(${settings.scale})`,
            transformOrigin: 'bottom center',
          }}
        >
          {/* Ground Foot Contact Occlusion Shadow (Soft dark ellipse under the shoes) */}
          {settings.shadowIntensity > 0 && (
            <div
              className="absolute -bottom-3 z-10 pointer-events-none"
              style={{
                width: `${190 * settings.scale}px`,
                height: `${34 * settings.scale}px`,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(10,2,20,0.5) 55%, transparent 75%)',
                filter: `blur(${Math.max(2, settings.shadowBlur * 0.6)}px)`,
                opacity: settings.shadowIntensity,
                transform: 'rotateX(72deg)',
              }}
            />
          )}

          {/* Dynamic Walking Silhouette Cast Shadow (Perspective skewed on the pavement) */}
          {settings.shadowIntensity > 0 && (
            <div
              className="absolute bottom-0 z-0 pointer-events-none origin-bottom"
              style={{
                transform: `scaleY(-${settings.shadowLength}) skewX(-24deg) translateY(${18 * settings.scale}px)`,
                filter: `blur(${settings.shadowBlur}px)`,
                opacity: settings.shadowIntensity * 0.65,
                maskImage: 'linear-gradient(to bottom, black 15%, transparent 85%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 15%, transparent 85%)',
              }}
            >
              <canvas
                ref={shadowCanvasRef}
                className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[440px] h-[68vh] sm:h-[75vh] md:h-[80vh] object-contain object-bottom pointer-events-none"
              />
            </div>
          )}

          {/* Wet Pavement Floor Reflection (Vice City wet neon street mirror) */}
          {settings.reflectionIntensity > 0 && (
            <div
              className="absolute bottom-0 z-0 pointer-events-none origin-bottom"
              style={{
                transform: `scaleY(-0.75) translateY(-${6 * settings.scale}px)`,
                filter: 'blur(3px) contrast(0.9)',
                opacity: settings.reflectionIntensity * 0.35,
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 75%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 75%)',
              }}
            >
              <canvas
                ref={reflectionCanvasRef}
                className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[440px] h-[68vh] sm:h-[75vh] md:h-[80vh] object-contain object-bottom pointer-events-none"
              />
            </div>
          )}

          {/* =========================================================================
              LAYER 2: HIGHLIGHTED WALKING SUBJECT (REAL-TIME KEYED & COLOR GRADED)
              - No arbitrary box cropping!
              - Edge highlight contour & neon rim lighting requested by user
              - Feet naturally touching the ground plane
             ========================================================================= */}
          <div
            className="relative z-20 flex items-end justify-center pointer-events-none"
            style={{
              filter: highlightDropShadow,
            }}
          >
            <canvas
              ref={mainCanvasRef}
              className={`w-[280px] sm:w-[340px] md:w-[400px] lg:w-[440px] h-[68vh] sm:h-[75vh] md:h-[80vh] object-contain object-bottom select-none transition-opacity duration-300 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-80'
              }`}
            />
          </div>

          {/* Alignment Horizon Guide Overlay (When user calibrates in Studio) */}
          {showGuide && (
            <div className="absolute inset-x-0 bottom-0 pointer-events-none flex flex-col items-center z-50">
              {/* Feet contact line */}
              <div className="w-[120%] h-0.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff] relative">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-hud text-[10px] text-cyan-300 tracking-widest uppercase bg-black/80 px-2 py-0.5 rounded border border-cyan-500/50">
                  GROUND FEET CONTACT HORIZON: {settings.groundY}px
                </span>
              </div>
              {/* Vertical center axis */}
              <div className="w-0.5 h-32 bg-pink-500/60 -top-32 absolute shadow-[0_0_6px_#ff007f]" />
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: FOREGROUND ATMOSPHERIC DEPTH (RAIN & NEON PARTICLES)
          Drifts in front of the walker to guarantee true 3D spatial integration!
         ========================================================================= */}
      <canvas
        ref={particlesCanvasRef}
        className="absolute inset-0 z-30 pointer-events-none"
      />
    </div>
  );
};
