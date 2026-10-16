import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// =========================================================================
// AUTHENTIC RECOGNIZABLE TECHNOLOGY LOGOS (OFFICIAL SVGS)
// =========================================================================

export const PythonIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M63.38 2.05c-15.82 0-25.7 6.83-25.7 19.82v14.49h26.24v3.74H22.75C9.76 40.1 0 49.37 0 65.19c0 15.34 8.78 24.58 22.75 24.58h7.95v-11.4c0-15.8 13.56-24.87 29.38-24.87h26.47v-3.74H57.17V21.87c0-9.8 8.4-15.02 18.21-15.02 9.8 0 16.35 5.22 16.35 15.02v5.6h7.95V21.87c0-12.99-10.45-19.82-36.3-19.82zm-9.33 7.47a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"
      fill="#387EB8"
    />
    <path
      d="M64.62 125.95c15.82 0 25.7-6.83 25.7-19.82V91.64H64.08V87.9h41.17c12.99 0 22.75-9.27 22.75-25.09 0-15.34-8.78-24.58-22.75-24.58h-7.95v11.4c0 15.8-13.56 24.87-29.38 24.87H41.45v3.74h29.38v27.89c0 9.8-8.4 15.02-18.21 15.02-9.8 0-16.35-5.22-16.35-15.02v-5.6h-7.95v5.6c0 12.99 10.45 19.82 36.3 19.82zm9.33-7.47a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0-8.4z"
      fill="#FFE052"
    />
  </svg>
);

export const JavaIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M48.2 92.5s-6.6 3.6 4.7 4.9c13.7 1.6 20.8 1.4 36.1-1.6 0 0 5.4 3.4 13 6.1-38.3 16.5-74.9-2.9-53.8-9.4zM44.4 78.4s-7.6 4.6 4 6.1c15.1 1.9 25.7 1.9 44.8-2 0 0 3.8 2.5 9.1 4.5-44.6 13.9-80.6 1-57.9-8.6z"
      fill="#E76F00"
    />
    <path
      d="M71.7 54.4c6.1 7 4.1 13.3-3.6 20.6 0 0 16-8.2 8.7-20.9-6.3-10.9-11.8-16.2 15.9-33.3-27.1 9.9-29.5 24.9-21 33.6z"
      fill="#5382A1"
    />
    <path
      d="M87.8 89.2c20.1-10.4 10.8-20.4 4.3-19.1-1.6.3-2.3.6-2.3.6s.6-.9 1.8-1.5c8.6-4.5 15.2 6.8-4.5 19.7 0 0 .6.2.7.3zM53.1 63.8c-14.7 10.7-3.2 21.7 14.5 20.9 22.9-1.1 36.6-9.1 36.6-9.1s-1.8 1.4-4.5 2.5c-20.3 8.3-43.2 5.1-49.3-.5-7.3-6.6 2.7-13.8 2.7-13.8z"
      fill="#E76F00"
    />
    <path
      d="M80.8 21.4c9.7 11.2-4.5 21.7-4.5 21.7s12.5-6.8 6.5-16.6c-5.7-9.3-17.1-13.9-38.9-8.3 26.6-4.4 31.8.8 36.9 3.2zM36.1 106.5c22.6 1.7 58.7.9 76.7-5.9 0 0-4.6 3.6-11.3 5.4-23.7 6.4-56.1 4.8-70.5-2.1 0 0 1.9 1.6 5.1 2.6z"
      fill="#5382A1"
    />
  </svg>
);

export const JavaScriptIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path
      d="M67.3 103.5c3.2 5.5 8.1 9.4 16.3 9.4 7 0 11.6-3.5 11.6-8.4 0-5.8-4.7-7.9-12.5-11.3l-4.3-1.8c-12.4-5.3-20.6-11.9-20.6-25.9 0-13 10-22.9 25.6-22.9 11.1 0 19.1 4.1 24.3 13.5l-10.9 7c-2.4-4.3-5.5-6.2-12.8-6.2-5.4 0-9.2 3.4-9.2 7.6 0 5.3 3.6 7.4 11.4 10.7l4.3 1.9c14.6 6.3 22.1 12.8 22.1 26.9 0 15.3-12 24.1-28.5 24.1-16 0-25.6-7.8-29.8-17.7l13-6.9zM26.3 102.3l12.4-7.5c2.7 4.5 5.2 8.3 10.5 8.3 5.4 0 8.9-2.2 8.9-10.7V43.8h15.2v48.8c0 17-10 24.7-24.1 24.7-12.9 0-20.3-6.8-22.9-15z"
      fill="#000000"
    />
  </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="128" height="128" rx="16" fill="#3178C6" />
    <path
      d="M58.7 54.3H43.9v48.2h-11.8V54.3H17.3V44.2h41.4v10.1zm52.4 21.3c0 14.4-8.9 27.9-28.6 27.9-10.4 0-19.1-3.6-23.6-7.8l6.3-8.8c4.1 3.5 9.7 6.3 16.9 6.3 9.4 0 16.7-5.5 16.7-14.3 0-8.2-5.4-11.9-15.3-16.1-13.7-5.7-22.3-11.7-22.3-24.1 0-13.2 10.4-25.2 26.9-25.2 9.5 0 16.5 2.8 20.9 6.1l-5.6 8.9c-3.6-2.6-8.7-4.8-15.3-4.8-8.7 0-14.8 5.6-14.8 13.5 0 7.8 5.1 11.2 14.8 15.3 15.5 6.4 23 12.8 23 23.2z"
      fill="#FFFFFF"
    />
  </svg>
);

export const CppIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="128" height="128" rx="16" fill="#00599C" />
    <path
      d="M62.6 30.5c-19.1 0-34.6 15.5-34.6 34.6s15.5 34.6 34.6 34.6c13.7 0 25.6-7.9 31.2-19.4l-11.5-6.6c-3.7 7.7-11.6 13-20.7 13-12.7 0-23-10.3-23-23s10.3-23 23-23c9.1 0 17 5.3 20.7 13l11.5-6.6c-5.6-11.8-17.5-19.6-31.2-19.6z"
      fill="#FFFFFF"
    />
    <path
      d="M87.5 56.5h4v6.5h6.5v4h-6.5v6.5h-4V67H81v-4h6.5v-6.5zm16 0h4v6.5h6.5v4h-6.5v6.5h-4V67h-6.5v-4h6.5v-6.5z"
      fill="#004482"
    />
  </svg>
);

export const ReactIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="-11.5 -10.23174 23 20.46348"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const NodeJsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M63.7 3.5a9.5 9.5 0 0 0-4.8 1.3L12.5 31.6A9.6 9.6 0 0 0 7.7 40v54.8a9.6 9.6 0 0 0 4.8 8.3l46.4 26.8a9.6 9.6 0 0 0 9.6 0l46.4-26.8a9.6 9.6 0 0 0 4.8-8.3V40a9.6 9.6 0 0 0-4.8-8.3L82.5 4.8a9.5 9.5 0 0 0-4.8-1.3H63.7z"
      fill="#339933"
    />
    <path
      d="M64 22.8c-1.8 0-3.6.5-5.1 1.4L29.3 41.3c-3.1 1.8-5.1 5.2-5.1 8.8v34.4c0 3.6 1.9 7 5.1 8.8l29.6 17.1c1.5.9 3.3 1.4 5.1 1.4 1.8 0 3.6-.5 5.1-1.4l29.6-17.1c3.1-1.8 5.1-5.2 5.1-8.8V50.1c0-3.6-1.9-7-5.1-8.8L74.2 24.2a10.1 10.1 0 0 0-5.1-1.4H64z"
      fill="#026E00"
    />
    <path
      d="M64 36c-.9 0-1.8.2-2.5.7L44.4 46.8a5 5 0 0 0-2.5 4.3v19.7c0 1.8 1 3.5 2.5 4.3l17.1 9.9c.8.5 1.7.7 2.5.7.9 0 1.8-.2 2.5-.7l17.1-9.9c1.5-.9 2.5-2.5 2.5-4.3V51.1c0-1.8-1-3.5-2.5-4.3L66.5 36.7c-.8-.5-1.7-.7-2.5-.7z"
      fill="#FFFFFF"
    />
  </svg>
);

export const DockerIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M125.7 54.3c-2.7-1.9-8.4-3.1-12.8-2.3-.6-3.8-3.4-11.8-12.2-16.8l-3.3 3.6c6.2 4.3 8.3 10.4 8.7 13.4-5.3 3.3-14.8 3.8-20.5 1.5l-2.4 4.5c5.3 2.8 14.8 3.4 21.6.4 1 3.8 3.6 10.8 10.6 16.3l3.6-3.3c-5.4-4.8-7.3-10.4-8-13.8 5.7.5 10.5 0 13.3-1.6l-1.6-1.9zM74.9 59.9H60.2V45.2h14.7v14.7zm-18.4 0H41.8V45.2h14.7v14.7zm-18.4 0H23.4V45.2h14.7v14.7zm36.8-18.4H60.2V26.8h14.7v14.7zm-18.4 0H41.8V26.8h14.7v14.7zm36.8 0H78.6V26.8h14.7v14.7zm0 18.4H78.6V45.2h14.7v14.7zm-55.2 0H5V45.2h14.7v14.7z"
      fill="#2496ED"
    />
    <path
      d="M115.1 66.8c-2.2-.4-8.8-1.4-16.7 3.2-6.5-3.8-14.5-4.5-22.5-4.5H5.8c-2.3 8.3-1.7 24.3 6.9 33.7 11.2 12.3 30.5 13.9 52.8 13.9 37.1 0 54.3-16.6 59.8-35.1 2.2-.6 6.3-2.1 7.2-6.4l-17.4-4.8z"
      fill="#2496ED"
    />
  </svg>
);

export const LinuxIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M64 5.3C52.7 5.3 43.5 14.5 43.5 25.8c0 5.4 2.1 10.3 5.5 13.9-3.2 4.4-5.2 9.8-5.2 15.6 0 2.2.3 4.4.9 6.4-13.8 6.4-23.4 20.3-23.4 36.5 0 4.1.6 8 1.8 11.7 4.1 12.4 15.8 21.3 29.6 21.3 2.8 0 5.6-.4 8.2-1.1 7.1 3.5 15.1 5.4 23.5 5.4 8.4 0 16.4-1.9 23.5-5.4 2.6.7 5.4 1.1 8.2 1.1 13.8 0 25.5-8.9 29.6-21.3 1.2-3.7 1.8-7.6 1.8-11.7 0-16.2-9.6-30.1-23.4-36.5.6-2 .9-4.2.9-6.4 0-5.8-2-11.2-5.2-15.6 3.4-3.6 5.5-8.5 5.5-13.9C84.5 14.5 75.3 5.3 64 5.3z"
      fill="#FCC624"
    />
    <path
      d="M64 12c-7.6 0-13.8 6.2-13.8 13.8 0 4.1 1.8 7.7 4.7 10.3 2.5 2.2 5.7 3.5 9.1 3.5s6.6-1.3 9.1-3.5c2.9-2.6 4.7-6.2 4.7-10.3C77.8 18.2 71.6 12 64 12zm-3.5 13.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm7 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      fill="#000000"
    />
  </svg>
);

export const GitIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M125.1 58.7L69.3 2.9c-3.9-3.9-10.2-3.9-14.1 0L38.4 19.7l17.8 17.8c4.2-1.4 9.1-.5 12.5 2.9 3.4 3.4 4.3 8.3 2.9 12.5l17.2 17.2c4.2-1.4 9.1-.5 12.5 2.9 4.8 4.8 4.8 12.6 0 17.4-4.8 4.8-12.6 4.8-17.4 0-3.6-3.6-4.4-8.9-2.5-13.3L72.2 57.9v35.3c1.4.7 2.7 1.8 3.7 2.8 4.8 4.8 4.8 12.6 0 17.4-4.8 4.8-12.6 4.8-17.4 0-4.8-4.8-4.8-12.6 0-17.4 1.3-1.3 2.9-2.2 4.6-2.8V56.8c-1.7-.6-3.3-1.5-4.6-2.8-3.6-3.6-4.4-8.9-2.5-13.3L38.2 22.9 2.9 58.2c-3.9 3.9-3.9 10.2 0 14.1l55.8 55.8c3.9 3.9 10.2 3.9 14.1 0l52.3-55.3c3.9-3.9 3.9-10.2 0-14.1z"
      fill="#F05032"
    />
  </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M64 5.1C29.7 5.1 2 32.8 2 67.1c0 27.5 17.8 50.8 42.5 59 3.1.6 4.2-1.3 4.2-3 0-1.5-.1-6.4-.1-11.7-17.2 3.7-20.9-7.3-20.9-7.3-2.8-7.1-6.9-9-6.9-9-5.6-3.8.4-3.8.4-3.8 6.2.4 9.5 6.4 9.5 6.4 5.5 9.5 14.5 6.7 18 5.1 0.6-4 2.2-6.7 3.9-8.3-13.8-1.6-28.2-6.9-28.2-30.6 0-6.8 2.4-12.3 6.4-16.6-.6-1.6-2.8-7.9.6-16.4 0 0 5.2-1.7 17 6.3 5-1.4 10.3-2.1 15.6-2.1 5.3 0 10.6.7 15.6 2.1 11.8-8 17-6.3 17-6.3 3.4 8.5 1.3 14.8.6 16.4 4 4.3 6.4 9.8 6.4 16.6 0 23.8-14.5 29-28.3 30.5 2.2 1.9 4.2 5.7 4.2 11.5 0 8.3-.1 15-.1 17.1 0 1.7 1.1 3.7 4.3 3 24.6-8.2 42.4-31.5 42.4-59C126 32.8 98.3 5.1 64 5.1z"
    />
  </svg>
);

export const FirebaseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2 92.5l26.4-50.5c1.6-3.1 5.9-3.7 8.3-1.1l13.5 14.6-34.9 37h-13.3zm87.6 0L86.5 52.8c-1.7-3.2-6.3-3.3-8.2-.3L65.4 72.8l29.1 27.2c2.4-2.2 13.3-7.5 13.3-7.5z"
      fill="#FFA000"
    />
    <path
      d="M68.5 73.5L52.8 43.7c-1.5-2.9-5.4-3.5-7.7-1.2L18.4 90.7l42.4 23.8c2.2 1.2 4.9 1.2 7.1 0l41.7-23.8-41.1-17.2z"
      fill="#F57C00"
    />
    <path
      d="M48.2 21.2c-1.8-3.4-6.8-3.4-8.6 0L19.4 60.1l28.8-38.9z"
      fill="#FFCA28"
    />
  </svg>
);

export const MongoIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M64 3.7c-1.8 1.4-25.2 27.6-25.2 56.6 0 25.1 17.5 45.4 24.3 52.4v11.6c.3.5.6.7.9.7s.6-.2.9-.7v-11.6c6.8-7 24.3-27.3 24.3-52.4 0-29-23.4-55.2-25.2-56.6zm-1.8 98.7V17.9c13.7 13.8 22.4 34.6 22.4 42.4 0 20.3-13.2 36.9-22.4 42.1z"
      fill="#47A248"
    />
  </svg>
);

export const VsCodeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M98.6 5.8l-54.8 50.8L20.5 38.8c-2.4-1.9-5.9-1.5-7.9.9l-8.4 10.3c-1.8 2.2-1.5 5.5.7 7.3l27.1 21.9L4.9 101.1c-2.2 1.8-2.5 5.1-.7 7.3l8.4 10.3c2 2.4 5.5 2.8 7.9.9l23.3-17.8 54.8 50.8c3.2 3 8.3 1.8 10-2.3L127 10.4c1.6-4.1-1.7-8.4-6-7.8L98.6 5.8z"
      fill="#007ACC"
    />
    <path
      d="M98.6 5.8l-54.8 50.8 54.8 50.8 22.4-11.2V17L98.6 5.8z"
      fill="#1F8AD2"
    />
  </svg>
);

export const ViteIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M125.1 18.7L67.7 122.9c-1.5 2.7-5.5 2.7-7 0L3.3 18.7c-1.6-2.9.9-6.3 4.1-5.6l55.8 11.6c.5.1 1.1.1 1.6 0L121 13.1c3.2-.7 5.7 2.7 4.1 5.6z"
      fill="url(#viteGrad)"
    />
    <path
      d="M86.7 8.3L45.4 67.8l20.8-3.8L53.7 104l46.2-61.9-20.9 3.8 7.7-37.6z"
      fill="#FFD62E"
    />
    <defs>
      <linearGradient id="viteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#41D1FF" />
        <stop offset="100%" stopColor="#BD34FE" />
      </linearGradient>
    </defs>
  </svg>
);

export const PostmanIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="64" cy="64" r="60" fill="#FF6C37" />
    <path
      d="M93.3 54.7c-2.4-7.2-7.8-12.7-15.1-15.1-5.1-1.7-10.7-1.7-15.8 0L37.1 48.2c-2.1.7-3.5 2.7-3.5 4.9 0 2.2 1.4 4.2 3.5 4.9l12.7 4.2v16.3c0 2.9 2.4 5.3 5.3 5.3 2.9 0 5.3-2.4 5.3-5.3V65.8l12.7 4.2c2.5.8 5.2 1.3 7.9 1.3 7.8 0 15.2-4.1 18.9-11 2.2-4.1 2.7-8.8 1.4-13.3-1.3-4.5-4.4-8.2-8.6-10.4 3.7 1.8 6.5 4.9 7.7 8.8 1.1 3.9.7 8-1.2 11.5z"
      fill="#FFFFFF"
    />
  </svg>
);

export const FastApiIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="64" cy="64" r="60" fill="#059669" />
    <path
      d="M72 20L36 68h24l-8 40 36-48H64l8-40z"
      fill="#FFFFFF"
    />
  </svg>
);

export const FlaskIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M76 16V36.7L97.5 79.8C103.5 91.8 94.8 106 81.4 106H46.6C33.2 106 24.5 91.8 30.5 79.8L52 36.7V16H46V8H82V16H76ZM60 16V40.2L42.2 75.8C39.2 81.8 43.6 89 50.3 89H77.7C84.4 89 88.8 81.8 85.8 75.8L68 40.2V16H60Z"
    />
  </svg>
);

export const KubernetesIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M64 4.5l51.5 29.8v59.5L64 123.5 12.5 93.8V34.3L64 4.5z"
      fill="#326CE5"
    />
    <path
      d="M64 26.8l32.2 18.6v37.2L64 101.2 31.8 82.6V45.4L64 26.8z"
      fill="#FFFFFF"
    />
    <circle cx="64" cy="64" r="14" fill="#326CE5" />
  </svg>
);

export const UbuntuIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 128 128"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="64" cy="64" r="60" fill="#E95420" />
    <circle cx="64" cy="64" r="32" fill="none" stroke="#FFFFFF" strokeWidth="12" />
    <circle cx="28" cy="64" r="9" fill="#E95420" />
    <circle cx="28" cy="64" r="6" fill="#FFFFFF" />
    <circle cx="82" cy="33" r="9" fill="#E95420" />
    <circle cx="82" cy="33" r="6" fill="#FFFFFF" />
    <circle cx="82" cy="95" r="9" fill="#E95420" />
    <circle cx="82" cy="95" r="6" fill="#FFFFFF" />
  </svg>
);

// =========================================================================
// CONSISTENT UNIFIED SYSTEM ICONS (IDENTICAL STROKE & OPTICAL WEIGHT)
// For domains without a corporate logo (e.g. Forensics, Pentest, ML Models)
// =========================================================================

export const SystemShieldIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>
);

export const SystemTargetIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
  </svg>
);

export const SystemLockIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

export const SystemRadarIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 10 10" />
    <path d="M12 6a6 6 0 0 1 6 6" />
    <line x1="12" y1="12" x2="19" y2="5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export const SystemSearchAuditIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const SystemCryptoKeyIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="M10.8 12.2L20 3" />
    <path d="M16 7l2 2" />
    <path d="M18 5l2 2" />
  </svg>
);

export const SystemBrainAiIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
  </svg>
);

export const SystemVisionIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M7 3L3 7" />
    <path d="M17 3l4 4" />
    <path d="M7 21l-4-4" />
    <path d="M17 21l4-4" />
  </svg>
);

export const SystemNeuralNetworkIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="6" r="2.5" />
    <circle cx="5" cy="18" r="2.5" />
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="19" cy="6" r="2.5" />
    <circle cx="19" cy="18" r="2.5" />
    <line x1="7.5" y1="6" x2="9.5" y2="12" />
    <line x1="7.5" y1="18" x2="9.5" y2="12" />
    <line x1="14.5" y1="12" x2="16.5" y2="6" />
    <line x1="14.5" y1="12" x2="16.5" y2="18" />
  </svg>
);

export const SystemDatabaseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

export const SystemCloudIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

export const SystemServerStackIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="5" rx="1" />
    <rect x="2" y="10" width="20" height="5" rx="1" />
    <rect x="2" y="17" width="20" height="5" rx="1" />
    <line x1="6" y1="5.5" x2="6.01" y2="5.5" strokeWidth="2.5" />
    <line x1="6" y1="12.5" x2="6.01" y2="12.5" strokeWidth="2.5" />
    <line x1="6" y1="19.5" x2="6.01" y2="19.5" strokeWidth="2.5" />
  </svg>
);

export const SystemTerminalIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const SystemNetworkIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <path d="M5 16v-4h14v4" />
    <path d="M12 8v4" />
  </svg>
);

export const SystemVmIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M6 8h4" />
    <path d="M6 12h8" />
  </svg>
);

export const SystemApiIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" fill="currentColor" />
  </svg>
);

// =========================================================================
// INTELLIGENT DISPATCHER: GET ACCURATE ICON FOR EVERY VERIFIED SKILL
// =========================================================================

export const getSkillIcon = (
  name: string,
  category?: string,
  className = 'w-7 h-7'
): React.ReactNode => {
  const lower = name.toLowerCase();

  // 1. Precise Language & Tool Match
  if (lower.includes('python')) return <PythonIcon className={className} />;
  if (lower.includes('java') && !lower.includes('script')) return <JavaIcon className={className} />;
  if (lower.includes('javascript')) return <JavaScriptIcon className={className} />;
  if (lower.includes('typescript')) return <TypeScriptIcon className={className} />;
  if (lower.includes('c / c++') || lower === 'cpp' || lower === 'c++') return <CppIcon className={className} />;
  if (lower.includes('react')) return <ReactIcon className={className} />;
  if (lower.includes('node')) return <NodeJsIcon className={className} />;
  if (lower.includes('docker')) return <DockerIcon className={className} />;
  if (lower.includes('git') && !lower.includes('hub')) return <GitIcon className={className} />;
  if (lower.includes('github')) return <GitHubIcon className={className} />;
  if (lower.includes('firebase')) return <FirebaseIcon className={className} />;
  if (lower.includes('mongo')) return <MongoIcon className={className} />;
  if (lower.includes('vscode') || lower.includes('vs code')) return <VsCodeIcon className={className} />;
  if (lower.includes('vite')) return <ViteIcon className={className} />;
  if (lower.includes('postman')) return <PostmanIcon className={className} />;
  if (lower.includes('fastapi')) return <FastApiIcon className={className} />;
  if (lower.includes('flask')) return <FlaskIcon className={className} />;
  if (lower.includes('kubernetes') || lower === 'k8s') return <KubernetesIcon className={className} />;
  if (lower.includes('ubuntu')) return <UbuntuIcon className={className} />;
  if (lower.includes('linux')) return <LinuxIcon className={className} />;

  // 2. Specialized Database & Cloud Match
  if (lower.includes('sql') || lower.includes('firestore') || lower.includes('database')) {
    return <SystemDatabaseIcon className={className} />;
  }
  if (lower.includes('cloud')) return <SystemCloudIcon className={className} />;
  if (lower.includes('virtual') || lower.includes('vm')) return <SystemVmIcon className={className} />;
  if (lower.includes('network')) return <SystemNetworkIcon className={className} />;
  if (lower.includes('api') || lower.includes('rest')) return <SystemApiIcon className={className} />;
  if (lower.includes('backend') || lower.includes('server')) return <SystemServerStackIcon className={className} />;

  // 3. Specialized AI / ML Match
  if (lower.includes('vision') || lower.includes('opencv')) return <SystemVisionIcon className={className} />;
  if (lower.includes('deep') || lower.includes('neural')) return <SystemNeuralNetworkIcon className={className} />;
  if (lower.includes('machine') || lower.includes('ai') || lower.includes('nlp')) {
    return <SystemBrainAiIcon className={className} />;
  }

  // 4. Specialized Cybersecurity Match
  if (lower.includes('pen') || lower.includes('target') || lower.includes('exploit')) {
    return <SystemTargetIcon className={className} />;
  }
  if (lower.includes('crypto') || lower.includes('key')) return <SystemCryptoKeyIcon className={className} />;
  if (lower.includes('vuln') || lower.includes('forensics') || lower.includes('audit')) {
    return <SystemSearchAuditIcon className={className} />;
  }
  if (lower.includes('threat') || lower.includes('radar') || lower.includes('incident')) {
    return <SystemRadarIcon className={className} />;
  }
  if (lower.includes('security') || lower.includes('lock') || lower.includes('owasp')) {
    return <SystemShieldIcon className={className} />;
  }

  // 5. Fallback based on Category
  const catLower = (category || '').toLowerCase();
  if (catLower.includes('security')) return <SystemShieldIcon className={className} />;
  if (catLower.includes('ai') || catLower.includes('machine')) return <SystemBrainAiIcon className={className} />;
  if (catLower.includes('database')) return <SystemDatabaseIcon className={className} />;
  if (catLower.includes('cloud')) return <SystemCloudIcon className={className} />;
  if (catLower.includes('tool')) return <SystemTerminalIcon className={className} />;

  return <SystemTerminalIcon className={className} />;
};
