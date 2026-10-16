export type SectionId = 
  | 'start'
  | 'about'
  | 'journey'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'research'
  | 'achievements'
  | 'services'
  | 'recruiter'
  | 'contact'
  | 'academy'
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

export type AppMode =
  | 'game'
  | 'quick_portfolio'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'achievements'
  | 'research'
  | 'about'
  | 'services'
  | 'contact';

export type HqHighlightMode = 'vivid' | 'cyber' | 'sunset' | 'panorama';

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

export type ProjectClassification =
  | 'FLAGSHIP'
  | 'MAJOR'
  | 'AI_ML'
  | 'CYBERSECURITY'
  | 'FULL_STACK'
  | 'EDUCATION'
  | 'EXPERIMENT'
  | 'PORTFOLIO'
  | 'OTHER';

export interface ProjectItem {
  id: string;
  title: string;
  slug?: string;
  category: string;
  projectCategories?: string[];
  classification?: ProjectClassification;
  year?: string;
  shortDescription?: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'CLASSIFIED';
  bounty: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';
  problem?: string;
  targetUsers?: string;
  solution?: string;
  architecture?: string;
  keyFeatures?: string[];
  engineeringDecisions?: string[];
  securityConsiderations?: string[];
  challenges?: string;
  outcomes?: string;
  verifiedMetrics?: string;
  relatedSkills?: string[];
  relatedCertifications?: string[];
  relatedResearch?: string[];
  relatedExperience?: string[];
  alternateName?: string;
  isFlagship?: boolean;
}

export interface SkillItem {
  name: string;
  level: number;
  tag: string;
  description: string;
  provenByProjects?: string[];
  relatedCertifications?: string[];
  relatedExperience?: string[];
  relatedResearch?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: SkillItem[];
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
  type?: 'INTERNSHIP' | 'SIMULATION' | 'RESEARCH' | 'LEADERSHIP';
  verifiedMetric?: string;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  responsibilities: string[];
  verifiedImpact: string;
  impact?: string;
  description?: string;
  technologies: string[];
}

export interface ResearchPublication {
  id: string;
  title: string;
  status: 'PUBLISHED' | 'ACCEPTED — MAJOR REVISION' | 'ACCEPTED FOR PRESENTATION';
  year: string;
  venue: string;
  authors: string[];
  doi?: string;
  ieeeUrl?: string;
  paperLink?: string;
  acceptanceNote?: string;
  statusNote?: string;
  abstract: string;
  description?: string;
  researchDomain: string;
  methodApproach: string;
  relatedProjectIds: string[];
  relatedSkills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  achievementType?: 'HACKATHON' | 'CERTIFICATION' | 'RESEARCH' | 'LEADERSHIP' | 'ACADEMIC' | 'SECURITY';
  description: string;
  status: 'UNLOCKED' | 'COMPLETED';
  xp: string;
  icon: string;
  credentialId?: string;
  verifiedMetric?: string;
}

export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  issueDate?: string;
  issuedDate?: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  credentialUrl?: string;
  category: string;
  categoryGroup?: string;
  skills?: string[];
  relatedSkills?: string[];
  relatedProjects?: string[];
  verificationStatus?: 'VERIFIED' | 'CREDENTIAL_ID_AVAILABLE' | 'INSTITUTIONAL';
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
