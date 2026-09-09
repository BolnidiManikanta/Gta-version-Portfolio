import { DistrictId, DistrictInfo } from '../types';

export const DISTRICTS_DATA: Record<DistrictId, DistrictInfo> = {
  player_hq: {
    id: 'player_hq',
    code: 'HQ',
    name: 'PLAYER HQ',
    subtitle: 'Ocean Beach Penthouse & Character Dossier',
    location: 'Ocean Drive • Suite 804',
    description:
      'The private safehouse of Bolnidi Manikanta. Houses the master dossier, core player attributes, equipment loadout, and tactical identity.',
    icon: 'User',
    color: '#ec008c',
    accentColor: '#f43f5e',
    interactableObject: {
      name: 'INFERNUS SPORTS CAR',
      prompt: 'INSPECT PLAYER DOSSIER & BIO',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 24,
      y: 76,
    },
  },
  ai_lab: {
    id: 'ai_lab',
    code: 'AI',
    name: 'AI & VISION LAB',
    subtitle: 'Deep Learning & Neural Detection Facility',
    location: 'Little Haiti • Sub-Level 3',
    description:
      'Underground skunkworks engineering high-precision neural networks, OpenCV edge inspection, and real-time medical & diagnostic vision systems.',
    icon: 'Brain',
    color: '#06b6d4',
    accentColor: '#0891b2',
    interactableObject: {
      name: 'HOLOGRAPHIC NEURAL RIG',
      prompt: 'ACCESS COMPUTER VISION MISSIONS',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 36,
      y: 42,
    },
  },
  cyber_district: {
    id: 'cyber_district',
    code: 'SEC',
    name: 'CYBERSECURITY ZONE',
    subtitle: 'Offensive Security & Zero-Knowledge Vault',
    location: 'Downtown Server Core • Sector 09',
    description:
      'Hardened digital armory focused on penetration testing, heuristic phishing neutralizers, encrypted cloud storage, and synthetic deepfake detection.',
    icon: 'Shield',
    color: '#10b981',
    accentColor: '#059669',
    interactableObject: {
      name: 'AIR-GAPPED SECURITY TERMINAL',
      prompt: 'RUN VULNERABILITY SCANNER & DEFENSE MISSIONS',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 62,
      y: 28,
    },
  },
  dev_district: {
    id: 'dev_district',
    code: 'DEV',
    name: 'DEV DISTRICT',
    subtitle: 'High-Throughput Full Stack Systems',
    location: 'Starfish Island • Silicon Dock',
    description:
      'High-velocity web development laboratory architecting distributed microservices, sub-second WebSocket communication hubs, and enterprise platforms.',
    icon: 'Code',
    color: '#3b82f6',
    accentColor: '#2563eb',
    interactableObject: {
      name: 'ENTERPRISE DUAL-MONITOR RIG',
      prompt: 'DEPLOY FULL STACK REPOSITORIES',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 52,
      y: 60,
    },
  },
  achievement_hq: {
    id: 'achievement_hq',
    code: 'TRO',
    name: 'ACHIEVEMENT HQ',
    subtitle: 'Vault of Accolades, XP & Certifications',
    location: 'Vice Point • The Trophy Mansion',
    description:
      'Trophy room holding unlocked milestones, national hackathon podiums, industry-recognized certificates, and verified technical badges.',
    icon: 'Trophy',
    color: '#f59e0b',
    accentColor: '#d97706',
    interactableObject: {
      name: 'GOLDEN TROPHY CABINET',
      prompt: 'INSPECT UNLOCKED XP & BADGES',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 78,
      y: 45,
    },
  },
  career_district: {
    id: 'career_district',
    code: 'EXP',
    name: 'CAREER DISTRICT',
    subtitle: 'Field Operations & Academic Foundations',
    location: 'Mulholland Highway Overpass',
    description:
      'Mission chronological record including JPMorgan Chase & Co. Cybersecurity Virtual Internship, enterprise software engagements, and computer science degree.',
    icon: 'Briefcase',
    color: '#a855f7',
    accentColor: '#9333ea',
    interactableObject: {
      name: 'TACTICAL CIPHER BRIEFCASE',
      prompt: 'DEBRIEF CAREER TIMELINE & ACADEMICS',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 68,
      y: 72,
    },
  },
  comms_center: {
    id: 'comms_center',
    code: 'COM',
    name: 'COMMUNICATION TOWER',
    subtitle: 'Maze Bank Rooftop Satellite Uplink',
    location: 'Maze Bank Spire • Helipad Deck',
    description:
      'High-altitude satellite transmission dish and encrypted phone dispatch. Initiate real-time communications via direct message, email, GitHub, or LinkedIn.',
    icon: 'Radio',
    color: '#ec008c',
    accentColor: '#db2777',
    interactableObject: {
      name: 'SATELLITE DISPATCH CONSOLE',
      prompt: 'TRANSMIT CONTRACT / CONTACT BOLNIDI',
      actionKey: 'E',
    },
    mapCoordinates: {
      x: 84,
      y: 20,
    },
  },
};

export const DISTRICT_LIST = Object.values(DISTRICTS_DATA);
