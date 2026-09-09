export type SectionId = 
  | 'start'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'achievements'
  | 'academy'
  | 'contact'
  | 'exit';

export type DistrictId =
  | 'player_hq'        // Location 01: Player HQ / About / Attributes
  | 'ai_lab'           // Location 02: AI Lab (Computer Vision, Detection Systems)
  | 'cyber_district'   // Location 03: Cyber District (Security, Vulnerability Scanning)
  | 'dev_district'     // Location 04: Dev District (Full Stack, Web Apps)
  | 'achievement_hq'   // Location 05: Achievement HQ (Trophies, Certifications)
  | 'career_district'  // Location 06: Career District (Field Operations, Experience)
  | 'comms_center';    // Location 07: Communication Center (In-Game Phone, Terminal)

export type TimeOfDay = 'day' | 'sunset' | 'dusk' | 'night';

export type AppMode = 'game' | 'quick_portfolio';

export interface DistrictInfo {
  id: DistrictId;
  code: string;
  name: string;
  subtitle: string;
  location: string;
  description: string;
  icon: string;
  color: string;
  accentColor: string;
  interactableObject: {
    name: string;
    prompt: string;
    actionKey: string;
  };
  mapCoordinates: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'CLASSIFIED';
  bounty: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: {
    name: string;
    level: number;
    tag: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  mission: string;
  responsibilities: string[];
  technologies: string[];
  outcome: string;
  badge: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  status: 'UNLOCKED' | 'COMPLETED';
  xp: string;
  icon: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  category: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpaOrScore?: string;
  highlights: string[];
  courses: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  alias: string;
  location: string;
  status: string;
  bioIntro: string;
  bioFull: string;
  specializations: string[];
  stats: {
    coding: number;
    aiMl: number;
    cybersecurity: number;
    softwareEng: number;
    stamina: number;
    stealth: number;
    rep: number;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}
