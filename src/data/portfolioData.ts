import {
  ProfileData,
  SkillCategory,
  ProjectItem,
  ExperienceItem,
  LeadershipItem,
  ResearchPublication,
  AchievementItem,
  CertificationItem,
  EducationItem,
} from '../types';

export const summaryStats = {
  repositories: '25+',
  certifications: '17',
  publications: '4',
  virtualInternships: '3',
  studentsVirtualLab: '150+',
  studentsJavaPlatform: '200+',
  studentsLeadership: '500+',
  cgpa: '8.6 / 10.0',
};

export const profileData: ProfileData = {
  name: 'BOLNIDI MANIKANTA',
  title: 'Full Stack Developer • AI / ML Engineer • Cybersecurity Specialist',
  alias: 'MANI',
  location: 'LOS SANTOS // INDIA',
  status: 'AVAILABLE FOR IMMEDIATE OPPORTUNITIES',
  bioIntro:
    'I am Bolnidi Manikanta, a technology-focused developer and researcher with deep hands-on expertise across software engineering, artificial intelligence, cybersecurity threat detection, and full-stack cloud applications.',
  bioFull:
    'I engineer mission-critical systems fusing machine learning, offensive/defensive cybersecurity, and hardened distributed architecture. With 25+ public repositories, 4 peer-reviewed research publications (including IEEE Xplore), 17 verified technical certifications, and platforms serving hundreds of active learners, I build software that solves tangible real-world problems.',
  specializations: [
    'Artificial Intelligence & Deep Learning',
    'Full Stack Software Engineering',
    'Cybersecurity & Threat Detection',
    'Applied Cryptography & Cloud Security',
    'Educational Platforms & Simulation Rigs',
  ],
  stats: {
    coding: 98,
    aiMl: 95,
    cybersecurity: 96,
    softwareEng: 97,
    stamina: 100,
    stealth: 94,
    rep: 99,
  },
  socialLinks: {
    github: 'https://github.com/BolnidiManikanta',
    linkedin: 'https://www.linkedin.com/in/bolnidi-manikanta/',
    email: 'massmanikanta70@gmail.com',
  },
};

export const educationData: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
  institution: 'Kalasalingam Academy of Research and Education (KARE)',
  period: '2022 – 2026',
  location: 'Tamil Nadu / India',
  gpaOrScore: 'CGPA: 8.6 / 10.0',
  highlights: [
    'Academic performance of 8.6 / 10.0 CGPA throughout the Computer Science curriculum.',
    'Published IEEE conference paper on the Servify ecosystem (DOI: 10.1109/icsft67370.2026.11566098).',
    'Finalist & Grand Finale participant in the IEEE Smart KARE Hackathon 2025.',
    'Built Virtual Lab cryptography simulator adopted by 150+ students for practical coursework.',
    'Engineered Interactive Java Learning Platform engaging 200+ students.',
    'Served as Web Developer and Event Coordinator for Microsoft Learn Student Club (MLSC) & ACM KARE.',
  ],
  courses: [
    'Design and Analysis of Algorithms',
    'Database Management Systems (DBMS)',
    'Cryptography & Network Security',
    'Artificial Intelligence & Machine Learning',
    'Operating Systems & Linux Architecture',
    'Object-Oriented Programming (Java / C++)',
    'Web Technologies & Cloud Computing',
  ],
};

/* =========================================================================
   PUBLICATIONS & RESEARCH (ALL 4 VERIFIED PAPERS)
========================================================================= */
export const researchPublicationsData: ResearchPublication[] = [
  {
    id: 'res-1',
    title: 'Servify: An Innovative Multi-Domain Service Platform',
    status: 'PUBLISHED',
    year: '2026',
    venue: '2026 International Conference on Sustainable and Futuristic Technologies (ICSFT 2026)',
    authors: ['Bolnidi Manikanta', 'Faculty Advisors & Co-Authors'],
    doi: '10.1109/icsft67370.2026.11566098',
    ieeeUrl: 'https://ieeexplore.ieee.org/document/11566098',
    abstract:
      'Presents the architecture, design, and real-time execution protocols of the Servify multi-domain service platform, unifying dispatching, lifecycle tracking, and client-technician synchronization across distributed service sectors.',
    researchDomain: 'Distributed Systems & Multi-Domain Platforms',
    methodApproach:
      'Modular client-vendor separation, WebSocket real-time event streaming, role-based access control, and asynchronous job queuing.',
    relatedProjectIds: ['proj-servify-apps', 'proj-servify-connect'],
    relatedSkills: ['React.js', 'Node.js', 'WebSockets', 'REST APIs', 'System Architecture'],
  },
  {
    id: 'res-2',
    title: 'Secure Cloud Storage Based on Multi Authority Authentication and Encryption',
    status: 'ACCEPTED — MAJOR REVISION',
    year: '2025',
    venue: 'International Conference on Innovative Computing and Robotic and Control Automation (ICIRCA 2025)',
    authors: ['Bolnidi Manikanta', 'Research Collaborators'],
    acceptanceNote: 'Official Acceptance Notice received for ICIRCA 2025 (Status: Accepted — Major Revision).',
    abstract:
      'Investigates decentralized multi-authority cryptographic key delegation and hybrid ciphertext encryption to eliminate single-point-of-compromise vulnerabilities in public cloud storage architectures.',
    researchDomain: 'Cloud Security & Applied Cryptography',
    methodApproach:
      'Multi-authority key distribution matrices, client-side AES-256 GCM encryption before upload, and threshold cryptographic access verification.',
    relatedProjectIds: ['proj-secure-cloud'],
    relatedSkills: ['Cryptography', 'Cloud Security', 'Python', 'Access Control', 'Authentication'],
  },
  {
    id: 'res-3',
    title: 'Phishing Email Detection using ClamAV & VirusTotal',
    status: 'ACCEPTED FOR PRESENTATION',
    year: '2024',
    venue: 'ICMLAS IEEE Conference',
    authors: ['Bolnidi Manikanta', 'Collaborators'],
    abstract:
      'Proposes a dual-layer threat verification pipeline combining ClamAV antivirus signature heuristics with automated VirusTotal threat intelligence API aggregation to detect weaponized phishing attachments and deceptive hyperlinks.',
    researchDomain: 'Cybersecurity & Threat Detection',
    methodApproach:
      'Header parsing, lexical URL tokenization, ClamAV local daemon analysis, and automated multi-engine VirusTotal reputational scoring.',
    relatedProjectIds: ['proj-phishalert'],
    relatedSkills: ['Phishing Detection', 'Vulnerability Assessment', 'Python', 'Threat Intelligence'],
  },
  {
    id: 'res-4',
    title: 'Sustainable Biomedical Waste Reuse',
    status: 'PUBLISHED',
    year: '2025',
    venue: 'INSDAM Conference Proceedings',
    authors: ['Bolnidi Manikanta', 'Research Team'],
    abstract:
      'Analyzes machine learning-assisted waste segregation protocols and sustainable recycling pipelines for non-infectious biomedical plastics and municipal waste items to minimize ecological footprint.',
    researchDomain: 'AI & Sustainable Environmental Systems',
    methodApproach:
      'Computer vision classification of waste streams combined with environmental safety categorization criteria.',
    relatedProjectIds: ['proj-smart-waste'],
    relatedSkills: ['Computer Vision', 'Machine Learning', 'Python', 'Environmental AI'],
  },
];

/* =========================================================================
   EXPERIENCE (VERIFIED INDUSTRY & RESEARCH ROLES)
========================================================================= */
export const experienceData: ExperienceItem[] = [
  {
    role: 'Cybersecurity Analyst Virtual Intern',
    organization: 'Tata Group',
    period: 'VIRTUAL INTERNSHIP / FORAGE',
    mission: 'ENTERPRISE PERIMETER RECON & THREAT MITIGATION',
    responsibilities: [
      'Performed detailed email threat analysis, decoding encoded headers and isolating phishing indicators.',
      'Conducted security risk assessments and vulnerability scanning across simulated enterprise infrastructure.',
      'Drafted technical remediation blueprints adhering to industry cybersecurity best practices and compliance standards.',
      'Simulated defense mechanisms against multi-stage phishing campaigns and credential harvesting attacks.',
    ],
    technologies: ['Threat Analysis', 'Email Security', 'Vulnerability Assessment', 'Incident Response', 'Network Security'],
    outcome: 'Successfully mitigated simulated enterprise attack vectors and earned official Tata cybersecurity credential.',
    badge: 'CYBER DEFENDER',
    type: 'INTERNSHIP',
  },
  {
    role: 'Software Engineering Virtual Experience',
    organization: 'JPMorgan Chase & Co.',
    period: 'VIRTUAL INTERNSHIP / FORAGE',
    mission: 'HIGH-FREQUENCY FINANCIAL DATA INTEGRATION & UI',
    responsibilities: [
      'Integrated real-time financial market data feeds into an interactive trader analytics perspective dashboard.',
      'Utilized JPMorgan Chase internal visualization tooling and Perspective streaming charts to analyze asset ratios.',
      'Constructed algorithmic price-ratio calculations to detect market anomalies and trigger automated trading signals.',
      'Executed rigorous unit tests verifying data integrity across streaming intervals.',
    ],
    technologies: ['Python', 'TypeScript', 'React', 'Financial Data Feeds', 'Perspective UI'],
    outcome: 'Engineered high-throughput financial data visualizers matching institutional trading desk specifications.',
    badge: 'QUANT DEV',
    type: 'INTERNSHIP',
  },
  {
    role: 'Technology Consulting Virtual Experience',
    organization: 'Deloitte',
    period: 'VIRTUAL INTERNSHIP / FORAGE',
    mission: 'ENTERPRISE CLOUD STRATEGY & CODE AUDIT',
    responsibilities: [
      'Analyzed client cloud infrastructure modernization requirements and formulated migration risk models.',
      'Audited legacy software components for architectural bottlenecks and security vulnerabilities.',
      'Synthesized structured technology roadmaps aligning cloud microservices with business continuity targets.',
    ],
    technologies: ['Cloud Architecture', 'System Auditing', 'Technology Roadmapping', 'Enterprise IT'],
    outcome: 'Formulated actionable cloud transformation blueprints evaluated against enterprise SLA benchmarks.',
    badge: 'TECH ADVISOR',
    type: 'INTERNSHIP',
  },
  {
    role: 'Research Student',
    organization: 'Infoziant Security',
    period: 'RESEARCH & SECURITY ENGAGEMENT',
    mission: 'APPLIED THREAT RESEARCH & VULNERABILITY MAPPING',
    responsibilities: [
      'Investigated emerging web threat vectors, SQL injection methodologies, and cross-site scripting attack surfaces.',
      'Collaborated on practical cryptographic encryption models and defensive web application shields.',
      'Researched automated testing frameworks for detecting vulnerabilities in client-server interfaces.',
    ],
    technologies: ['Vulnerability Research', 'Ethical Hacking', 'Applied Cryptography', 'OWASP Top 10'],
    outcome: 'Contributed structured findings toward hardened threat detection architectures.',
    badge: 'RESEARCH FELLOW',
    type: 'RESEARCH',
  },
];

/* =========================================================================
   LEADERSHIP
========================================================================= */
export const leadershipData: LeadershipItem[] = [
  {
    id: 'lead-1',
    role: 'Web Developer & Event Coordinator',
    organization: 'Microsoft Learn Student Club (MLSC) & ACM – KARE',
    period: '2023 – 2025',
    location: 'Kalasalingam Academy of Research and Education',
    responsibilities: [
      'Designed and deployed responsive event portals, registration systems, and live competition dashboards for campus technology symposiums.',
      'Organized and coordinated technical hackathons, hands-on coding workshops, and expert webinars reaching over 500+ student participants.',
      'Mentored junior computer science students in Git/GitHub workflows, web development fundamentals, and competitive programming.',
      'Managed end-to-end technical logistics for flagship club events and coding contests.',
    ],
    verifiedImpact: '500+ Students Reached across Workshops, Hackathons & Tech Events',
    technologies: ['Web Development', 'React', 'Event Dashboards', 'Technical Mentorship', 'Community Building'],
  },
];

/* =========================================================================
   CERTIFICATIONS (EXPANDED & ACCREDITED)
========================================================================= */
export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate',
    issuer: 'Oracle',
    date: 'December 2025',
    issueDate: 'December 2025',
    expiryDate: 'December 2027',
    category: 'CLOUD',
    categoryGroup: 'CLOUD',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Cloud Infrastructure', 'Deep Learning'],
    relatedSkills: ['Artificial Intelligence', 'Machine Learning', 'Cloud Infrastructure', 'Deep Learning'],
    relatedProjects: ['proj-cogniva', 'proj-mobile-defect'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://catalog-education.oracle.com/',
  },
  {
    id: 'cert-2',
    title: 'Certified in Python Programming',
    issuer: 'GeeksforGeeks',
    date: 'January 2026',
    issueDate: 'January 2026',
    category: 'PROGRAMMING',
    categoryGroup: 'PROGRAMMING',
    skills: ['Python', 'Data Structures', 'OOP', 'Algorithm Design', 'Automation'],
    relatedSkills: ['Python', 'Data Structures', 'OOP', 'Algorithm Design', 'Automation'],
    relatedProjects: ['proj-phishalert', 'proj-vuln-scanner', 'proj-multi-disorder'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://media.geeksforgeeks.org/courses/certificates/',
  },
  {
    id: 'cert-3',
    title: 'Java Programming',
    issuer: 'GeeksforGeeks',
    date: 'December 2025',
    issueDate: 'December 2025',
    category: 'PROGRAMMING',
    categoryGroup: 'PROGRAMMING',
    skills: ['Java', 'Object-Oriented Programming', 'Multithreading', 'Collections Framework'],
    relatedSkills: ['Java', 'Object-Oriented Programming', 'Multithreading', 'Collections Framework'],
    relatedProjects: ['proj-java-learning', 'proj-virtual-lab'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://media.geeksforgeeks.org/courses/certificates/',
  },
  {
    id: 'cert-4',
    title: 'SQL and Relational Databases 101',
    issuer: 'IBM SkillsBuild',
    date: 'October 2025',
    issueDate: 'October 2025',
    credentialId: '69b3925eed5a411d976d3f823a4cbc57',
    credentialUrl: 'https://skillsbuild.org/badges/69b3925eed5a411d976d3f823a4cbc57',
    verificationUrl: 'https://skillsbuild.org/badges/69b3925eed5a411d976d3f823a4cbc57',
    category: 'DATABASE',
    categoryGroup: 'DATABASE',
    skills: ['SQL', 'Relational Databases', 'Database Design', 'Query Optimization', 'Data Integrity'],
    relatedSkills: ['SQL', 'Relational Databases', 'Database Design', 'Query Optimization', 'Data Integrity'],
    relatedProjects: ['proj-servify-apps', 'proj-blood-donation'],
    verificationStatus: 'CREDENTIAL_ID_AVAILABLE',
  },
  {
    id: 'cert-5',
    title: 'Cyber Security',
    issuer: 'Tech Mahindra / Skill India Digital Hub',
    date: 'September 2022',
    issueDate: 'September 2022',
    category: 'CYBERSECURITY',
    categoryGroup: 'CYBERSECURITY',
    skills: ['Cyber Security', 'Threat Assessment', 'Network Defense', 'Information Security'],
    relatedSkills: ['Cyber Security', 'Threat Assessment', 'Network Defense', 'Information Security'],
    relatedProjects: ['proj-phishalert', 'proj-vuln-scanner'],
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'cert-6',
    title: 'JP Morgan Chase & Co Virtual Internship',
    issuer: 'JP Morgan Chase & Co',
    date: 'September 2025',
    issueDate: 'September 2025',
    category: 'SOFTWARE',
    categoryGroup: 'SOFTWARE',
    skills: ['Python', 'TypeScript', 'React', 'Financial Engineering', 'Perspective UI', 'Data Feeds'],
    relatedSkills: ['Python', 'TypeScript', 'React', 'Financial Engineering', 'Perspective UI', 'Data Feeds'],
    relatedProjects: ['proj-servify-apps', 'proj-servify-connect'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.theforage.com/simulations/jpmorgan/software-engineering',
  },
  {
    id: 'cert-7',
    title: 'Tata - Cybersecurity Analyst Job Simulation',
    issuer: 'Forage',
    date: 'September 2025',
    issueDate: 'September 2025',
    credentialId: '3WD7wiGYRKxiyBDRi',
    credentialUrl: 'https://www.theforage.com/certificates/3WD7wiGYRKxiyBDRi',
    verificationUrl: 'https://www.theforage.com/certificates/3WD7wiGYRKxiyBDRi',
    category: 'CYBERSECURITY',
    categoryGroup: 'CYBERSECURITY',
    skills: ['Email Security', 'Phishing Analysis', 'Risk Assessment', 'IAM Governance', 'Incident Response'],
    relatedSkills: ['Email Security', 'Phishing Analysis', 'Risk Assessment', 'IAM Governance', 'Incident Response'],
    relatedProjects: ['proj-phishalert', 'proj-vuln-scanner'],
    verificationStatus: 'CREDENTIAL_ID_AVAILABLE',
  },
  {
    id: 'cert-8',
    title: 'Full Stack Developer Bootcamp - Master Frontend to Backend',
    issuer: 'GeeksforGeeks',
    date: 'June 2025',
    issueDate: 'June 2025',
    category: 'SOFTWARE',
    categoryGroup: 'SOFTWARE',
    skills: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'Tailwind CSS', 'Full Stack Architecture'],
    relatedSkills: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'Tailwind CSS', 'Full Stack Architecture'],
    relatedProjects: ['proj-servify-apps', 'proj-servify-connect', 'proj-maison-market'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://media.geeksforgeeks.org/courses/certificates/',
  },
  {
    id: 'cert-9',
    title: 'Certificate of Participation in Grand Finale of IEEE Smart KARE Hackathon',
    issuer: 'Unstop',
    date: 'April 2025',
    issueDate: 'April 2025',
    credentialId: '20edb3b3-6152-47a3-87d3-036b87269dec',
    credentialUrl: 'https://unstop.com/certificate-preview/20edb3b3-6152-47a3-87d3-036b87269dec',
    verificationUrl: 'https://unstop.com/certificate-preview/20edb3b3-6152-47a3-87d3-036b87269dec',
    category: 'ACHIEVEMENTS',
    categoryGroup: 'ACHIEVEMENTS',
    skills: ['Rapid Prototyping', 'AI/ML Healthcare Systems', 'Team Leadership', 'Competitive Hacking'],
    relatedSkills: ['Rapid Prototyping', 'AI/ML Healthcare Systems', 'Team Leadership', 'Competitive Hacking'],
    relatedProjects: ['proj-multi-disorder', 'proj-mobile-defect'],
    verificationStatus: 'CREDENTIAL_ID_AVAILABLE',
  },
  {
    id: 'cert-10',
    title: 'Design and Analysis of Algorithms',
    issuer: 'CodeChef',
    date: 'November 2024',
    issueDate: 'November 2024',
    category: 'PROGRAMMING',
    categoryGroup: 'PROGRAMMING',
    skills: ['Algorithm Design', 'Time Complexity Analysis', 'Data Structures', 'Dynamic Programming', 'Graph Theory'],
    relatedSkills: ['Algorithm Design', 'Time Complexity Analysis', 'Data Structures', 'Dynamic Programming', 'Graph Theory'],
    relatedProjects: ['proj-java-learning', 'proj-virtual-lab'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.codechef.com/certificates/',
  },
  {
    id: 'cert-11',
    title: 'Penetration Testing, Incident Response and Forensics',
    issuer: 'Coursera',
    date: 'March 2024',
    issueDate: 'March 2024',
    category: 'CYBERSECURITY',
    categoryGroup: 'CYBERSECURITY',
    skills: ['Penetration Testing', 'Incident Response', 'Cyber Forensics', 'Log Auditing', 'Threat Mitigation'],
    relatedSkills: ['Penetration Testing', 'Incident Response', 'Cyber Forensics', 'Log Auditing', 'Threat Mitigation'],
    relatedProjects: ['proj-vuln-scanner', 'proj-phishalert'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.coursera.org/verify/',
  },
  {
    id: 'cert-12',
    title: 'Java',
    issuer: 'CodeChef',
    date: 'September 2023',
    issueDate: 'September 2023',
    category: 'PROGRAMMING',
    categoryGroup: 'PROGRAMMING',
    skills: ['Java', 'Object-Oriented Programming', 'Console I/O', 'Logic Formulation'],
    relatedSkills: ['Java', 'Object-Oriented Programming', 'Console I/O', 'Logic Formulation'],
    relatedProjects: ['proj-java-learning'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.codechef.com/certificates/',
  },
  {
    id: 'cert-13',
    title: 'DATABASE MANAGEMENT SYSTEMS',
    issuer: 'CodeChef',
    date: 'March 2024',
    issueDate: 'March 2024',
    category: 'DATABASE',
    categoryGroup: 'DATABASE',
    skills: ['DBMS', 'SQL', 'Relational Schemas', 'Normalization', 'ACID Transactions'],
    relatedSkills: ['DBMS', 'SQL', 'Relational Schemas', 'Normalization', 'ACID Transactions'],
    relatedProjects: ['proj-servify-apps', 'proj-blood-donation'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.codechef.com/certificates/',
  },
  {
    id: 'cert-14',
    title: 'Command Line Interface (CLI) With Golang From Infosys',
    issuer: 'Coursera',
    date: 'January 2024',
    issueDate: 'January 2024',
    category: 'SOFTWARE',
    categoryGroup: 'SOFTWARE',
    skills: ['Go (Golang)', 'CLI Development', 'Concurrency', 'Systems Programming', 'Terminal Tooling'],
    relatedSkills: ['Go (Golang)', 'CLI Development', 'Concurrency', 'Systems Programming', 'Terminal Tooling'],
    relatedProjects: ['proj-vuln-scanner'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.coursera.org/verify/',
  },
  {
    id: 'cert-15',
    title: 'Foundation of Cybersecurity',
    issuer: 'Coursera',
    date: 'September 2024',
    issueDate: 'September 2024',
    category: 'CYBERSECURITY',
    categoryGroup: 'CYBERSECURITY',
    skills: ['Security Principles', 'Threat Models', 'Incident Response', 'Network Defense', 'Risk Mitigation'],
    relatedSkills: ['Security Principles', 'Threat Models', 'Incident Response', 'Network Defense', 'Risk Mitigation'],
    relatedProjects: ['proj-phishalert', 'proj-secure-cloud'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.coursera.org/verify/',
  },
  {
    id: 'cert-16',
    title: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    date: 'October 2024',
    issueDate: 'October 2024',
    category: 'CYBERSECURITY',
    categoryGroup: 'CYBERSECURITY',
    skills: ['Ethical Hacking', 'Reconnaissance', 'Penetration Testing', 'Network Security', 'Vulnerability Assessment'],
    relatedSkills: ['Ethical Hacking', 'Reconnaissance', 'Penetration Testing', 'Network Security', 'Vulnerability Assessment'],
    relatedProjects: ['proj-vuln-scanner', 'proj-phishalert'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.credly.com/organizations/cisco/',
  },
  {
    id: 'cert-17',
    title: 'Technology Job Simulation',
    issuer: 'Deloitte / Forage',
    date: 'June 2024',
    issueDate: 'June 2024',
    category: 'SOFTWARE',
    categoryGroup: 'SOFTWARE',
    skills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'Code Auditing', 'Technology Consulting'],
    relatedSkills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'Code Auditing', 'Technology Consulting'],
    relatedProjects: ['proj-servify-apps', 'proj-secure-cloud'],
    verificationStatus: 'VERIFIED',
    verificationUrl: 'https://www.theforage.com/simulations/deloitte/technology',
  },
];

/* =========================================================================
   ACHIEVEMENTS (DISTINCT FROM CERTIFICATES)
========================================================================= */
export const achievementsData: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'IEEE Smart KARE Hackathon — Grand Finale Finalist',
    date: 'April 2025',
    category: 'HACKATHONS',
    achievementType: 'HACKATHON',
    description:
      'Selected for and competed in the prestigious Grand Finale of the IEEE Smart KARE Hackathon, delivering an AI-assisted healthcare anomaly detection system under strict time constraints.',
    status: 'UNLOCKED',
    xp: '+5,000 XP',
    icon: 'Trophy',
    credentialId: '20edb3b3-6152-47a3-87d3-036b87269dec',
    verifiedMetric: 'Grand Finale Competitor',
  },
  {
    id: 'ach-2',
    title: 'Published Author at IEEE ICSFT 2026',
    date: 'February 2026',
    category: 'RESEARCH',
    achievementType: 'RESEARCH',
    description:
      'Co-authored and published research paper titled "Servify: An Innovative Multi-Domain Service Platform" in IEEE Xplore (DOI: 10.1109/icsft67370.2026.11566098).',
    status: 'UNLOCKED',
    xp: '+6,000 XP',
    icon: 'BookOpen',
    verifiedMetric: 'IEEE Xplore Indexed',
  },
  {
    id: 'ach-3',
    title: 'Paper Accepted at ICIRCA 2025 Conference',
    date: '2025',
    category: 'RESEARCH',
    achievementType: 'RESEARCH',
    description:
      'Research paper on multi-authority authentication and cryptographic access control for cloud storage accepted with major revision at ICIRCA 2025.',
    status: 'UNLOCKED',
    xp: '+4,500 XP',
    icon: 'Award',
    verifiedMetric: 'Accepted — Major Revision',
  },
  {
    id: 'ach-4',
    title: 'Virtual Lab Cryptography Simulator Adoption',
    date: '2024 – 2025',
    category: 'ACADEMIC',
    achievementType: 'ACADEMIC',
    description:
      'Built an interactive cryptography and network security simulation lab adopted by 150+ students for hands-on cryptographic experimentation.',
    status: 'UNLOCKED',
    xp: '+4,000 XP',
    icon: 'GraduationCap',
    verifiedMetric: '150+ Student Users',
  },
  {
    id: 'ach-5',
    title: 'Interactive Java Learning Platform Scale',
    date: '2024 – 2025',
    category: 'ACADEMIC',
    achievementType: 'ACADEMIC',
    description:
      'Architected gamified Java mastery web application featuring real-time authentication, coding quizzes, and analytics used by 200+ learners.',
    status: 'UNLOCKED',
    xp: '+4,200 XP',
    icon: 'Code',
    verifiedMetric: '200+ Active Learners',
  },
  {
    id: 'ach-6',
    title: 'Microsoft Learn Student Club & ACM Leadership',
    date: '2023 – 2025',
    category: 'LEADERSHIP',
    achievementType: 'LEADERSHIP',
    description:
      'Served as Web Developer & Event Coordinator, deploying event management web systems and organizing workshops that engaged 500+ participants.',
    status: 'UNLOCKED',
    xp: '+3,800 XP',
    icon: 'Users',
    verifiedMetric: '500+ Students Reached',
  },
  {
    id: 'ach-7',
    title: 'Oracle Certified AI Foundation Associate',
    date: 'December 2025',
    category: 'CERTIFICATIONS',
    achievementType: 'CERTIFICATION',
    description:
      'Earned worldwide recognition from Oracle Cloud Infrastructure validating mastery over machine learning workflows, neural networks, and generative AI models.',
    status: 'UNLOCKED',
    xp: '+4,500 XP',
    icon: 'ShieldCheck',
    verifiedMetric: 'Global Oracle Credential',
  },
  {
    id: 'ach-8',
    title: 'Cisco Certified Ethical Hacker',
    date: 'October 2024',
    category: 'SECURITY & CTF',
    achievementType: 'SECURITY',
    description:
      'Achieved Cisco Networking Academy Ethical Hacker qualification spanning reconnaissance, network penetration testing, and countermeasure implementation.',
    status: 'UNLOCKED',
    xp: '+4,000 XP',
    icon: 'Shield',
    verifiedMetric: 'Cisco Verified',
  },
  {
    id: 'ach-9',
    title: 'Tata Cybersecurity Simulation Specialist',
    date: '2024',
    category: 'SECURITY & CTF',
    achievementType: 'SECURITY',
    description:
      'Earned Top Defender recognition from Tata Group for analyzing enterprise email threat vectors and constructing actionable mitigation roadmaps.',
    status: 'UNLOCKED',
    xp: '+3,500 XP',
    icon: 'Flame',
    verifiedMetric: 'Tata Group Credential',
  },
  {
    id: 'ach-10',
    title: 'CodeChef Algorithmic Milestone (DAA & DBMS)',
    date: '2023 – 2024',
    category: 'ACADEMIC',
    achievementType: 'ACADEMIC',
    description:
      'Demonstrated high-tier algorithm implementation skills across Design & Analysis of Algorithms, Java paradigms, and Database Management Systems on CodeChef.',
    status: 'UNLOCKED',
    xp: '+3,600 XP',
    icon: 'Sparkles',
    verifiedMetric: 'CodeChef Multi-Track',
  },
];

/* =========================================================================
   PROJECTS (ALL 25 GITHUB REPOSITORIES AUDITED & CLASSIFIED)
========================================================================= */
export const projectsData: ProjectItem[] = [
  /* -------------------------------------------------------------
     1. FLAGSHIP: Mobile Defect Analysis / Multi-Disorder
  ------------------------------------------------------------- */
  {
    id: 'proj-mobile-defect',
    title: 'Mobile Defect Analysis',
    slug: 'mobile-defect-analysis',
    category: 'COMPUTER VISION / AI',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024',
    status: 'COMPLETED',
    bounty: '$210,000',
    difficulty: 'EXTREME',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Mobile-defect-Analysisi',
    shortDescription:
      'Deep learning and computer vision inspection system detecting physical display hairline cracks, chassis scratches, and manufacturing flaws.',
    description:
      'High-precision automated hardware inspection system utilizing computer vision edge filters and deep learning classification to detect hairline fractures, panel discolorations, and physical manufacturing defects on mobile devices.',
    problem:
      'Manual quality control inspection in refurbished electronics and assembly lines is error-prone, slow, and subjective, allowing micro-cracks and glass fractures to escape into retail circulation.',
    targetUsers:
      'Refurbished electronics testing hubs, mobile repair centers, manufacturing quality assurance teams.',
    solution:
      'Engineered an automated optical inspection pipeline combining morphological edge enhancement, contour detection, and a convolutional neural network to classify defect categories and report surface severity.',
    architecture:
      'High-resolution frame input → OpenCV contrast/edge enhancement → Region of Interest (ROI) segmenter → CNN inference layer → Defect bounding and severity scoring dashboard.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'NumPy', 'Matplotlib'],
    keyFeatures: [
      'Automated hairline fracture & screen crack detection',
      'Panel discoloration & dead pixel mapping',
      'Severity assessment & surface defect heatmaps',
      'Lightweight web dashboard for immediate technician review',
    ],
    engineeringDecisions: [
      'Applied morphological dilation and Sobel edge filtering prior to inference to isolate high-contrast hairline defects independent of screen wallpaper.',
      'Containerized inference endpoint using Flask for low-latency image ingestion.',
    ],
    challenges:
      'Handling ambient specular reflections on tempered glass screens without falsely classifying light glares as surface fractures.',
    outcomes:
      'Achieved robust defect isolation under varied lighting conditions with immediate bounding box telemetry.',
    verifiedMetrics: 'Validated on multi-device defect image batches',
    relatedSkills: ['Computer Vision', 'Deep Learning', 'Python', 'Machine Learning'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate', 'Python Programming Specialized Course'],
  },

  /* -------------------------------------------------------------
     2. FLAGSHIP: Multi-Disorder Detection System
  ------------------------------------------------------------- */
  {
    id: 'proj-multi-disorder',
    title: 'Multi-Disorder Detection System',
    slug: 'multi-disorder-detection-system',
    category: 'HEALTHCARE AI / ML',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024 – 2025',
    status: 'COMPLETED',
    bounty: '$225,000',
    difficulty: 'EXTREME',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Mutli-Disorder-Detection-System-',
    shortDescription:
      'Clinical machine learning diagnostic platform trained on heterogeneous clinical markers to assist medical professionals in early classification.',
    description:
      'Intelligent clinical diagnostic platform trained on heterogeneous medical biometric markers to assist medical professionals in early multi-condition screening and risk stratification.',
    problem:
      'Early detection of neurological and systemic disorders is often delayed due to siloed diagnostic tests, high consultation costs, and lack of integrated predictive screening tools.',
    targetUsers:
      'Clinicians, diagnostic lab technicians, preventive healthcare screening researchers.',
    solution:
      'Developed a multi-model ensemble system standardizing patient vitals, biometric parameters, and lab results to output probabilistic risk vectors across multiple targeted disorder classifications.',
    architecture:
      'Patient Biometric Ingestion → Standardized Feature Scaler → Multi-class Classification Model → Probabilistic Confidence Scoring → Interactive Clinical UI.',
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Streamlit', 'Joblib'],
    keyFeatures: [
      'Multi-marker health indicator ingestion pipeline',
      'Probabilistic confidence metrics for clinical transparency',
      'Explainable risk factor highlights for physicians',
      'Real-time interactive diagnostic dashboard',
    ],
    engineeringDecisions: [
      'Implemented robust data imputation and standard quantile scaling to prevent biased inferences caused by missing patient laboratory readings.',
      'Selected ensemble random forest and gradient boosted estimators for maximum feature interpretability.',
    ],
    challenges:
      'Balancing class distributions across imbalanced disorder datasets without overfitting rare pathological markers.',
    outcomes:
      'Delivered an interactive clinical screening prototype providing transparent feature importance rankings.',
    verifiedMetrics: 'Multi-disorder screening engine with feature attribution',
    relatedSkills: ['Machine Learning', 'Artificial Intelligence', 'Python'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
  },

  /* -------------------------------------------------------------
     3. FLAGSHIP: Servify Apps (Ecosystem Part 1)
  ------------------------------------------------------------- */
  {
    id: 'proj-servify-apps',
    title: 'Servify Apps',
    slug: 'servify-apps',
    category: 'FULL STACK ECOSYSTEM',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024 – 2026',
    status: 'COMPLETED',
    bounty: '$240,000',
    difficulty: 'HARD',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/servify-apps',
    shortDescription:
      'Enterprise service booking and lifecycle platform connected to IEEE publication (DOI: 10.1109/icsft67370.2026.11566098).',
    description:
      'Enterprise service booking and lifecycle management suite enabling client requests, technician assignment, real-time status dispatch, and automated billing. Backed by published research at IEEE ICSFT 2026.',
    problem:
      'Fragmented on-demand service platforms suffer from high latency in contractor dispatching, lack of verifiable job tracking, and opaque invoicing for end consumers.',
    targetUsers:
      'Service contractors, enterprise field technicians, multi-sector service consumers.',
    solution:
      'Designed an end-to-end multi-domain platform unifying service requests, automated scheduling algorithms, role-based workflows, and digital payment confirmations.',
    architecture:
      'React SPA Client → Express REST Gateway & JWT Authentication → MongoDB Document Store → Real-time Event Queue → Unified Admin Dispatch Console.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    keyFeatures: [
      'Multi-domain service category selector & dynamic pricing',
      'Role-based portals (Customer, Technician, Admin Controller)',
      'Automated dispatch scheduler & status tracking',
      'End-to-end booking lifecycle audit logging',
    ],
    engineeringDecisions: [
      'Separated core application logic from the real-time notification layer (Servify Connect) for independent scalability.',
      'Published architectural findings in peer-reviewed IEEE conference proceedings (ICSFT 2026).',
    ],
    challenges:
      'Synchronizing multi-state booking transitions across asynchronous client and provider interactions.',
    outcomes:
      'Full product suite published in IEEE Xplore: "Servify: An Innovative Multi-Domain Service Platform".',
    verifiedMetrics: 'IEEE Xplore Indexed (DOI: 10.1109/icsft67370.2026.11566098)',
    relatedSkills: ['Full Stack Development', 'React.js', 'Node.js', 'Express.js', 'REST APIs'],
    relatedCertifications: ['Full Stack Developer Bootcamp – Master Frontend to Backend'],
    relatedResearch: ['res-1'],
  },

  /* -------------------------------------------------------------
     4. FLAGSHIP: Servify Connect (Ecosystem Part 2)
  ------------------------------------------------------------- */
  {
    id: 'proj-servify-connect',
    title: 'Servify Connect',
    slug: 'servify-connect',
    category: 'REAL-TIME COMMUNICATIONS',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024 – 2026',
    status: 'COMPLETED',
    bounty: '$180,000',
    difficulty: 'HARD',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/servify-connect',
    shortDescription:
      'Real-time communication bridge for the Servify ecosystem connecting clients, customer service, and field technicians.',
    description:
      'Sub-second messaging and notification hub bridging customers, customer service agents, and remote field engineers with audit logging, presence indicators, and event notifications.',
    problem:
      'Field technicians and customers often experience miscommunication during active dispatches, resulting in missed appointments and disputed job specs.',
    targetUsers:
      'Active customers, dispatched field engineers, operations support agents.',
    solution:
      'Engineered an event-driven messaging service using WebSockets and Socket.io with persistent message storage and typing indicators.',
    architecture:
      'WebSocket Handshake → Room-based Dispatch Channels → Socket.io Event Bus → MongoDB Message Store → Notification Triggers.',
    technologies: ['WebSockets', 'Socket.io', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    keyFeatures: [
      'Sub-second room-based dispatch communications',
      'Real-time presence and delivery acknowledgments',
      'Attachment sharing for site photos and service quotes',
      'Direct integration with Servify Apps core booking database',
    ],
    engineeringDecisions: [
      'Implemented room-based channel isolation tied to active booking IDs to guarantee customer privacy.',
    ],
    challenges:
      'Handling socket reconnections gracefully on unstable mobile networks for technicians in the field.',
    outcomes:
      'Forms the real-time communication backbone of the published Servify IEEE platform.',
    verifiedMetrics: 'Sub-second real-time event streaming',
    relatedSkills: ['WebSockets', 'Node.js', 'React.js', 'Full Stack Development'],
    relatedCertifications: ['Full Stack Developer Bootcamp – Master Frontend to Backend'],
    relatedResearch: ['res-1'],
  },

  /* -------------------------------------------------------------
     5. FLAGSHIP: PhishAlert — Email Threat Detection System
  ------------------------------------------------------------- */
  {
    id: 'proj-phishalert',
    title: 'PhishAlert — Email Threat Detection System',
    slug: 'phishalert-email-threat-detection',
    category: 'CYBERSECURITY & THREAT DETECTION',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024',
    status: 'COMPLETED',
    bounty: '$215,000',
    difficulty: 'HARD',
    alternateName: 'Email Security System',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/PhishAlert-Email-Threat-Detection-System',
    shortDescription:
      'Email threat detection engine analyzing headers, suspicious attachments, and deceptive hyperlinks to block phishing vectors.',
    description:
      'Real-time phishing website and malicious email threat detection engine utilizing lexical URL parsing, SPF/DKIM header inspection, and heuristic parsing to identify zero-day credential harvesters. Connected to ICMLAS IEEE research work.',
    problem:
      'Deceptive spear-phishing emails bypass basic domain blocklists by employing homoglyphs, brand spoofing, and temporary link shorteners, endangering enterprise credentials.',
    targetUsers:
      'Enterprise security operations centers (SOC), email server administrators, general web users.',
    solution:
      'Built a multi-stage security pipeline extracting header metadata, resolving redirected URLs, inspecting SSL certificate validity, and scoring textual urgency cues.',
    architecture:
      'Email / URL Ingestion → Header & Authentication Parser (SPF/DKIM) → Lexical URL Feature Extractor → ML Threat Classifier → Risk Warning & Quarantine Recommendation.',
    technologies: ['Python', 'Scikit-Learn', 'BeautifulSoup', 'Flask', 'Regex', 'ClamAV / VirusTotal Concepts'],
    keyFeatures: [
      'Automated email header decomposition & sender verification',
      'Lexical URL analysis for homoglyph and deceptive domain attacks',
      'Heuristic urgency and credential-harvesting NLP flags',
      'Exportable threat dossier with risk factor breakdown',
    ],
    engineeringDecisions: [
      'Extracted over 20 lexical features (presence of IP in URL, @ symbols, sub-domain depth, HTTPS discrepancies) to detect deceptive domains without external DNS query latency.',
    ],
    challenges:
      'Preventing false positives on legitimate marketing emails containing multi-redirect tracking links.',
    outcomes:
      'Accepted for presentation at ICMLAS IEEE Conference under title "Phishing Email Detection using ClamAV & VirusTotal".',
    verifiedMetrics: '20+ lexical feature extractor; peer-reviewed research accepted',
    relatedSkills: ['Phishing Detection', 'Vulnerability Assessment', 'Ethical Hacking', 'Python'],
    relatedCertifications: ['Ethical Hacker (Cisco)', 'Foundation of Cybersecurity (Coursera)', 'Tata Cybersecurity Simulation'],
    relatedResearch: ['res-3'],
    relatedExperience: ['Tata Group Cybersecurity Virtual Internship'],
  },

  /* -------------------------------------------------------------
     6. FLAGSHIP: Automated Web Application Vulnerability Scanner
  ------------------------------------------------------------- */
  {
    id: 'proj-vuln-scanner',
    title: 'Automated Web Application Vulnerability Scanner',
    slug: 'automated-web-vulnerability-scanner',
    category: 'OFFENSIVE CYBERSECURITY',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024',
    status: 'COMPLETED',
    bounty: '$250,000',
    difficulty: 'EXTREME',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Automated-Web-Application-Vulnerability-Scanner',
    shortDescription:
      'Automated web reconnaissance and testing suite detecting SQL injection, reflected XSS, and missing security headers.',
    description:
      'Tactical penetration testing suite crawling target web endpoints to identify SQL injection vulnerabilities, reflected Cross-Site Scripting (XSS) vectors, parameter tampering risks, and missing security headers.',
    problem:
      'Web applications frequently deploy with subtle injection vulnerabilities and unhardened HTTP headers due to manual, expensive, or delayed security audits.',
    targetUsers:
      'Security researchers, DevSecOps engineers, web application developers.',
    solution:
      'Designed an asynchronous crawler and fuzzing engine that injects non-destructive test payloads, inspects HTTP response reflection, and compiles structured audit reports.',
    architecture:
      'Target URL Input → Endpoint & Form Crawler → Payload Dispatcher (SQLi / XSS probes) → Response Reflection & Error Analyzer → Structured Vulnerability Audit Report.',
    technologies: ['Python', 'Requests', 'Asyncio', 'BeautifulSoup', 'CLI / Rich', 'OWASP Top 10 Standards'],
    keyFeatures: [
      'Automated crawling and form input discovery',
      'SQL Injection error-based & boolean-based probe detection',
      'Cross-Site Scripting (XSS) script-reflection testing',
      'Security headers audit (CSP, X-Frame-Options, HSTS, X-Content-Type)',
    ],
    engineeringDecisions: [
      'Employed asynchronous HTTP concurrency via asyncio to complete multi-endpoint crawls in a fraction of standard sequential scan times.',
      'Designed strictly non-destructive payloads to ensure safe testing against authorized environments.',
    ],
    challenges:
      'Filtering out false positives triggered by generic web application error pages while ensuring nuanced SQL error fragments are flagged.',
    outcomes:
      'Engineered an audit tool providing structured CVSS-aligned severity ratings.',
    verifiedMetrics: 'OWASP Top 10 coverage (SQLi, XSS, Security Headers)',
    relatedSkills: ['Vulnerability Assessment', 'Web Application Security', 'Ethical Hacking', 'Penetration Testing'],
    relatedCertifications: ['Ethical Hacker (Cisco)', 'Penetration Testing, Incident Response and Forensics (Coursera)'],
    relatedExperience: ['Infoziant Security Research Student'],
  },

  /* -------------------------------------------------------------
     7. FLAGSHIP: Secure Cloud Storage – Multi Authority Authentication and Encryption
  ------------------------------------------------------------- */
  {
    id: 'proj-secure-cloud',
    title: 'Secure Cloud Storage – Multi Authority Authentication and Encryption',
    slug: 'secure-cloud-storage-multi-authority',
    category: 'CYBERSECURITY / CLOUD',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024 – 2025',
    status: 'COMPLETED',
    bounty: '$260,000',
    difficulty: 'EXTREME',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Secure-cloud-storage-Multi-authority-access-and-Encryption',
    shortDescription:
      'Zero-knowledge multi-authority encryption system for cloud storage. Connected to ICIRCA 2025 accepted research paper.',
    description:
      'Decentralized cryptographic storage repository eliminating single-point-of-compromise vulnerabilities through multi-authority key generation, AES-256 ciphertext encryption, and fine-grained access policies.',
    problem:
      'Standard cloud storage relies on centralized key management, where a single compromised master key or malicious storage provider can expose sensitive enterprise documents.',
    targetUsers:
      'Enterprise data compliance officers, privacy-focused cloud users, healthcare records custodians.',
    solution:
      'Implemented a multi-authority authentication scheme where private keys are generated collaboratively across distributed authorities, ensuring no single entity can unilaterally decrypt stored assets.',
    architecture:
      'Client Plaintext → Multi-Authority Key Exchange → AES-256 Symmetric Encryption → Ciphertext Cloud Storage → Authority Threshold Verification on Decrypt.',
    technologies: ['Python', 'Applied Cryptography', 'Flask', 'SQLite / MySQL', 'Hashlib', 'HMAC'],
    keyFeatures: [
      'Multi-authority collaborative key generation protocol',
      'Client-side AES-256 GCM encryption prior to network transmission',
      'Role-based attribute access control matrices',
      'Cryptographic tamper-detection via HMAC signatures',
    ],
    engineeringDecisions: [
      'Adopted threshold cryptography principles to require authorization from M-of-N authorities before key regeneration.',
      'Paper submitted and received acceptance notice (Accepted — Major Revision) at ICIRCA 2025.',
    ],
    challenges:
      'Managing authority communication latency during decryption without compromising security guarantees.',
    outcomes:
      'Research paper accepted at ICIRCA 2025 conference; full functional prototype deployed.',
    verifiedMetrics: 'Accepted at ICIRCA 2025 (Accepted — Major Revision)',
    relatedSkills: ['Cryptography', 'Secure Cloud Systems', 'Web Application Security', 'Python'],
    relatedCertifications: ['Foundation of Cybersecurity', 'Ethical Hacker'],
    relatedResearch: ['res-2'],
  },

  /* -------------------------------------------------------------
     8. FLAGSHIP: Interactive Java Learning Platform
  ------------------------------------------------------------- */
  {
    id: 'proj-java-learning',
    title: 'Interactive Java Learning Platform',
    slug: 'interactive-java-learning-platform',
    category: 'EDUCATION & FULL STACK',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024 – 2025',
    status: 'COMPLETED',
    bounty: '$190,000',
    difficulty: 'MEDIUM',
    alternateName: 'Java-Course',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Java-Course',
    shortDescription:
      'Gamified Java programming portal with Firebase authentication, interactive quizzes, and analytics used by 200+ learners.',
    description:
      'Full-stack gamified educational web application providing structured Java programming curriculums, interactive code exercises, real-time Firebase authentication, protected route guards, and learner progress tracking. Used by 200+ students.',
    problem:
      'Beginner programmers struggle with abstract Java OOP concepts (inheritance, encapsulation, polymorphism) without immediate hands-on feedback and structured milestone reinforcement.',
    targetUsers:
      'Computer science undergraduates, self-taught developers, competitive programming students.',
    solution:
      'Engineered an engaging interactive platform featuring modular topic breakdown, live quiz validation, interactive code sandboxes, and personal progress metrics.',
    architecture:
      'React + TypeScript SPA (Vite) → Context API State Management → Firebase Auth & Firestore Real-Time DB → Tailwind CSS UI Engine.',
    technologies: ['React.js', 'TypeScript', 'Vite', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'React Query'],
    keyFeatures: [
      'Comprehensive Java syllabus: Core Syntax, OOP, Data Structures, Algorithms',
      'Firebase Auth with role guards and session persistence',
      'Real-time learner progress synchronization and quiz scorecards',
      'Analytics dashboard tracking completed modules and streak counts',
    ],
    engineeringDecisions: [
      'Utilized Firebase Firestore onSnapshot listeners to synchronize learner module progress instantly across desktop and mobile browsers.',
      'Adopted TypeScript interfaces for all curriculum objects to ensure type safety across 50+ learning modules.',
    ],
    challenges:
      'Designing an intuitive state management system for multi-step quizzes without causing extraneous re-renders.',
    outcomes:
      'Successfully adopted by 200+ students with verified engagement and course completion.',
    verifiedMetrics: '200+ Learners / Students active on platform',
    relatedSkills: ['React.js', 'TypeScript', 'Java', 'Firebase', 'Full Stack Development'],
    relatedCertifications: ['Java Programming (CodeChef)', 'Full Stack Developer Bootcamp (GeeksforGeeks)'],
  },

  /* -------------------------------------------------------------
     9. FLAGSHIP: Virtual Lab – Cryptography Learning Platform
  ------------------------------------------------------------- */
  {
    id: 'proj-virtual-lab',
    title: 'Virtual Lab – Cryptography Learning Platform',
    slug: 'virtual-lab-cryptography',
    category: 'EDTECH & CRYPTOGRAPHY',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024',
    status: 'COMPLETED',
    bounty: '$170,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Virtual-Lab',
    shortDescription:
      'Interactive cryptography laboratory used by 150+ students for cipher visual simulations and step-by-step cryptographic learning.',
    description:
      'Interactive web-based cryptography experimentation platform providing students with visual cipher simulations (Caesar, Playfair, Hill, DES, RSA, AES), step-by-step mathematical breakdowns, and guided walkthroughs. Adopted by 150+ students.',
    problem:
      'Traditional cryptography courses teach complex mathematical transformations via static textbook equations, leaving students without intuitive understanding of substitution, permutation, and key scheduling.',
    targetUsers:
      'Undergraduate cryptography students, cybersecurity learners, university lab instructors.',
    solution:
      'Created an interactive browser simulation lab where students enter plaintext, visualize matrix transformations, manipulate key schedules, and observe ciphertext outputs in real-time.',
    architecture:
      'Client Simulation Canvas → Pure Cryptographic Algorithm Modules (Pure JS/TS) → Step Visualizer Engine → Interactive Quiz & Verification Suite.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Crypto Algorithms'],
    keyFeatures: [
      'Multi-cipher visual simulations (Classical & Modern Ciphers)',
      'Step-by-step substitution-permutation network breakdown',
      'Interactive key generation and matrix calculation visualizers',
      'Self-assessment quizzes with automated solution checks',
    ],
    engineeringDecisions: [
      'Implemented classical ciphers and modern block cipher steps in pure client-side JavaScript to guarantee zero server latency and offline capability.',
    ],
    challenges:
      'Translating multi-round matrix operations (like Hill cipher inverse modular arithmetic) into clear visual steps.',
    outcomes:
      'Formally utilized by 150+ students for practical academic lab exercises.',
    verifiedMetrics: '150+ Students used platform for academic coursework',
    relatedSkills: ['Cryptography', 'Web Development', 'JavaScript', 'Cybersecurity'],
    relatedCertifications: ['Foundation of Cybersecurity', 'Ethical Hacker'],
  },

  /* -------------------------------------------------------------
     10. FLAGSHIP: Deepfake Detection
  ------------------------------------------------------------- */
  {
    id: 'proj-deepfake-detect',
    title: 'Deepfake Detection',
    slug: 'deepfake-detection',
    category: 'DEEP LEARNING / FORENSICS',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024',
    status: 'COMPLETED',
    bounty: '$235,000',
    difficulty: 'EXTREME',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Deepfake-Detection',
    shortDescription:
      'Forensic deep learning model analyzing facial landmark consistency and frame discrepancies to detect AI-synthesized media.',
    description:
      'Temporal frequency analysis and facial landmark consistency model detecting synthetic media, facial reenactments, and generative deepfake manipulations in video streams.',
    problem:
      'The rapid emergence of hyper-realistic generative facial synthesis tools facilitates identity fraud, digital impersonation, and disinformation campaigns.',
    targetUsers:
      'Digital forensics investigators, media verification organizations, identity authentication platforms.',
    solution:
      'Engineered a multi-frame video extraction pipeline evaluating micro-level facial landmark jitter, eye-blinking irregularities, and frequency domain anomalies.',
    architecture:
      'Video Input → FFmpeg Frame Extraction → MTCNN / FaceNet Facial Bounding → ResNet/LSTM Temporal Feature Classifier → Real vs. Synthetic Confidence Score.',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'FFmpeg', 'FaceNet', 'Flask API'],
    keyFeatures: [
      'Automated facial crop and alignment from video frames',
      'Inter-frame optical consistency and frequency analysis',
      'Deepfake probability confidence score with frame heatmaps',
      'REST API endpoint for batch video forensics submission',
    ],
    engineeringDecisions: [
      'Combined spatial CNN feature extractors with temporal LSTM sequence layers to detect temporal flickering between synthetic frames.',
    ],
    challenges:
      'Maintaining high detection accuracy on heavily compressed social media video uploads.',
    outcomes:
      'Constructed a functional deepfake detection prototype exposing synthetic frame artifacts.',
    verifiedMetrics: 'Temporal video frame analysis pipeline',
    relatedSkills: ['Deep Learning', 'Computer Vision', 'Python', 'Machine Learning'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
  },

  /* -------------------------------------------------------------
     11. FLAGSHIP: AI Human Content Checker
  ------------------------------------------------------------- */
  {
    id: 'proj-ai-checker',
    title: 'AI Human Content Checker',
    slug: 'ai-human-content-checker',
    category: 'NATURAL LANGUAGE PROCESSING',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024',
    status: 'COMPLETED',
    bounty: '$185,000',
    difficulty: 'HARD',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Ai-Human-content-checker',
    shortDescription:
      'Stylometric and perplexity-based NLP classifier evaluating syntactical variance to distinguish human-authored prose from LLMs.',
    description:
      'Stylometric and perplexity-based NLP classifier evaluating syntactical variance, burstiness, and entropy to distinguish authentic human-authored prose from LLM-generated text.',
    problem:
      'With the widespread proliferation of generative AI text, academic institutions and publishers require reliable tools to verify author authenticity.',
    targetUsers:
      'Academic reviewers, educators, digital publishers, content moderators.',
    solution:
      'Constructed a multi-metric text analyzer measuring linguistic burstiness, perplexity distributions, and vocabulary repetition patterns.',
    architecture:
      'Text Ingestion → Tokenization & Lexical Metric Extraction → Perplexity & Burstiness Engine → Classification Model → Percentage Human vs. AI Score.',
    technologies: ['Python', 'Transformers', 'HuggingFace', 'FastAPI', 'React.js', 'NLTK'],
    keyFeatures: [
      'Real-time text tokenization & perplexity scoring',
      'Burstiness analysis mapping sentence length variance',
      'Interactive text highlighter marking likely AI-generated phrases',
      'Dual probability metric (Human Authentic vs. Machine Generated)',
    ],
    engineeringDecisions: [
      'Used lightweight Transformer tokenizers in FastAPI backend to keep inference times below 1.5 seconds per document.',
    ],
    challenges:
      'Distinguishing between formal human academic writing and high-temperature LLM outputs.',
    outcomes:
      'Delivered a web interface providing transparent linguistic scorecards.',
    verifiedMetrics: 'Perplexity & burstiness dual-engine classification',
    relatedSkills: ['Natural Language Processing (NLP)', 'Machine Learning', 'Python'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
  },

  /* -------------------------------------------------------------
     12. FLAGSHIP: Smart Waste Classifier
  ------------------------------------------------------------- */
  {
    id: 'proj-smart-waste',
    title: 'Smart Waste Classifier',
    slug: 'smart-waste-classifier',
    category: 'AI / COMPUTER VISION & IOT',
    classification: 'FLAGSHIP',
    isFlagship: true,
    year: '2024 – 2025',
    status: 'COMPLETED',
    bounty: '$175,000',
    difficulty: 'MEDIUM',
    alternateName: 'Predicting Biodegradable and Non-Biodegradable Waste Using AI',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Smart-Waste-Classifier-Predicting-Biodegradable-and-Non-Biodegradable-Waste-Using-AI',
    shortDescription:
      'Computer vision classification system categorizing waste into biodegradable and non-biodegradable classes. Connected to INSDAM 2025 publication.',
    description:
      'Computer vision and deep learning image classifier sorting waste items into biodegradable and non-biodegradable categories to automate municipal recycling sorting. Connected to published INSDAM research on sustainable waste reuse.',
    problem:
      'Inefficient manual waste segregation results in recyclable materials ending in landfills and hazardous items contaminating municipal compost facilities.',
    targetUsers:
      'Municipal recycling centers, smart waste bin manufacturers, sustainability organizations.',
    solution:
      'Trained a convolutional neural network on diverse waste item datasets to identify plastic, paper, organic food scraps, glass, and metals with real-time classification.',
    architecture:
      'Camera Input → Image Preprocessing & Augmentation → CNN / Transfer Learning Model → Material Category Output & Recyclability Action.',
    technologies: ['Python', 'TensorFlow / Keras', 'OpenCV', 'Streamlit', 'NumPy'],
    keyFeatures: [
      'Instant image classification: Biodegradable vs. Non-Biodegradable',
      'Detailed sub-category tagging (Plastic, Paper, Organic, Metal)',
      'Web camera live feed classification interface',
      'Recyclability recommendation guidelines',
    ],
    engineeringDecisions: [
      'Employed MobileNet transfer learning backbone to enable deployment on resource-constrained embedded systems.',
    ],
    challenges:
      'Accurately identifying crumpled, soiled, or overlapping waste items under irregular shadows.',
    outcomes:
      'Research connected to published paper "Sustainable Biomedical Waste Reuse" at INSDAM 2025.',
    verifiedMetrics: 'Multi-category waste classification engine',
    relatedSkills: ['Computer Vision', 'Machine Learning', 'Python'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
    relatedResearch: ['res-4'],
  },

  /* -------------------------------------------------------------
     13. MAJOR: Student Dropout Prediction System Using Machine Learning
  ------------------------------------------------------------- */
  {
    id: 'proj-dropout-predict',
    title: 'Student Dropout Prediction System Using Machine Learning',
    slug: 'student-dropout-prediction',
    category: 'PREDICTIVE ANALYTICS',
    classification: 'MAJOR',
    year: '2024',
    status: 'COMPLETED',
    bounty: '$165,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Student-Dropout-Prediction-System-Using-Machine-Learning',
    shortDescription:
      'Early intervention analytics dashboard evaluating attendance, grades, and demographic metrics to forecast at-risk student attrition.',
    description:
      'Early intervention analytics platform analyzing academic milestones, semester attendance vectors, and socio-demographic indicators to forecast at-risk student attrition with actionable early-warning insights.',
    problem:
      'Educational institutions often detect student disengagement too late in the academic cycle, missing opportunities for academic counseling.',
    targetUsers:
      'University academic advisors, department heads, student counseling personnel.',
    solution:
      'Constructed a predictive modeling pipeline using XGBoost and Random Forest algorithms to generate individualized student risk scores.',
    architecture:
      'Student Academic Record Ingestion → Feature Engineering & Standardization → Predictive ML Pipeline → Risk Tier Classification & Advisor Dashboard.',
    technologies: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Plotly', 'Streamlit'],
    keyFeatures: [
      'Multi-factor student risk profile generator',
      'Visual attendance vs. performance correlation graphs',
      'Interactive what-if intervention simulator for advisors',
      'CSV batch report generation for department faculties',
    ],
    engineeringDecisions: [
      'Calculated SHAP feature importance values to explain exactly which factors (e.g. attendance dips, prerequisite fails) drive each risk score.',
    ],
    challenges:
      'Addressing class imbalance where dropouts represent a small percentage of total student records.',
    outcomes:
      'Delivered an intuitive dashboard enabling timely student academic counseling.',
    verifiedMetrics: 'Feature-weighted early warning scoring model',
    relatedSkills: ['Machine Learning', 'Predictive Modeling', 'Python'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
  },

  /* -------------------------------------------------------------
     14. MAJOR: Spam Detection System
  ------------------------------------------------------------- */
  {
    id: 'proj-spam-detection',
    title: 'Spam Detection System',
    slug: 'spam-detection-system',
    category: 'NLP & MACHINE LEARNING',
    classification: 'MAJOR',
    year: '2023 – 2024',
    status: 'COMPLETED',
    bounty: '$135,000',
    difficulty: 'EASY',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Spam-Detection-System',
    shortDescription:
      'Text classification filter providing high-throughput sanitization of incoming customer messages and email blasts.',
    description:
      'Robust Naive Bayes and TF-IDF text classification filter providing automated high-throughput sanitization of incoming SMS messages and emails, blocking fraudulent lottery spam and phishing links.',
    problem:
      'Spam messages degrade user trust and overload communication channels with phishing schemes and deceptive promotions.',
    targetUsers:
      'Messaging platforms, email users, customer service intake queues.',
    solution:
      'Trained Multinomial Naive Bayes model on SMS and email corpora using TF-IDF token weighting to classify incoming text.',
    architecture:
      'Message Text → Preprocessing (Stopwords, Stemming) → TF-IDF Vectorization → Multinomial Naive Bayes Classifier → Spam / Ham Verdict.',
    technologies: ['Python', 'NLTK', 'Scikit-Learn', 'Flask', 'HTML5', 'CSS3'],
    keyFeatures: [
      'Fast text tokenization, punctuation removal, and stemming',
      'High-confidence spam vs. legitimate message filtering',
      'Lightweight Flask web interface for instant verification',
      'Low memory footprint suitable for edge API microservices',
    ],
    engineeringDecisions: [
      'Chosen TF-IDF with sublinear term-frequency scaling to dampen the impact of repeated spam keywords.',
    ],
    challenges:
      'Minimizing false positives on legitimate transaction notifications containing numeric codes.',
    outcomes:
      'Produced a dependable text classification microservice with low latency.',
    verifiedMetrics: 'TF-IDF vectorized SMS / email classifier',
    relatedSkills: ['Natural Language Processing (NLP)', 'Machine Learning', 'Python'],
    relatedCertifications: ['Python Programming Specialized Course'],
  },

  /* -------------------------------------------------------------
     15. FULL-STACK: Blood Donation System
  ------------------------------------------------------------- */
  {
    id: 'proj-blood-donation',
    title: 'Blood Donation System',
    slug: 'blood-donation-system',
    category: 'HEALTHCARE NETWORK',
    classification: 'FULL_STACK',
    year: '2023',
    status: 'COMPLETED',
    bounty: '$150,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/blood-Donation-System',
    shortDescription:
      'Emergency response matching portal connecting hospital blood requirements with verified regional donors.',
    description:
      'Emergency response matching portal connecting urgent hospital blood requirements with verified regional donors, featuring blood-group inventory tracking, donor eligibility checks, and request management.',
    problem:
      'Hospital blood banks often face sudden shortages during emergencies due to delayed communication with eligible regional donors.',
    targetUsers:
      'Hospitals, blood bank administrators, voluntary blood donors.',
    solution:
      'Engineered a centralized database-backed portal facilitating blood group filtering, donor registration, and request dispatch.',
    architecture:
      'JSP/Servlet & Spring Controller Layer → MySQL Relational Database → Bootstrap UI → Role Authentication.',
    technologies: ['Java', 'MySQL', 'JSP / Servlets', 'REST APIs', 'Bootstrap', 'HTML5'],
    keyFeatures: [
      'Blood stock level monitoring across A+, B+, O+, AB+ groups',
      'Donor registration and health eligibility logging',
      'Hospital emergency blood request dispatch module',
      'Administrative approval and donor history audit trail',
    ],
    engineeringDecisions: [
      'Enforced relational foreign key constraints and transactional consistency across blood inventory updates to prevent double allocation.',
    ],
    challenges:
      'Designing an intuitive interface accessible for urgent hospital staff during emergency blood requests.',
    outcomes:
      'Constructed a reliable hospital blood inventory and donor linkage application.',
    verifiedMetrics: 'Relational DBMS schema with inventory synchronization',
    relatedSkills: ['Java', 'SQL', 'Databases (SQL & NoSQL)', 'Full Stack Development'],
    relatedCertifications: ['Java Programming (CodeChef)', 'Database Management Systems (CodeChef)'],
  },

  /* -------------------------------------------------------------
     16. MAJOR: Cogniva
  ------------------------------------------------------------- */
  {
    id: 'proj-cogniva',
    title: 'Cogniva',
    slug: 'cogniva',
    category: 'AI & KNOWLEDGE SYSTEMS',
    classification: 'AI_ML',
    year: '2024',
    status: 'COMPLETED',
    bounty: '$160,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Cogniva',
    shortDescription:
      'AI cognitive platform and productivity assistant providing intelligent workflow assistance and search.',
    description:
      'AI cognitive intelligence platform and knowledge engine providing structured research synthesis, intelligent document querying, and automated conceptual breakdowns.',
    technologies: ['Python', 'FastAPI', 'React.js', 'NLP', 'Vector Embeddings'],
    keyFeatures: [
      'Intelligent conceptual retrieval and query synthesis',
      'Structured research document digestion',
      'Modern conversational interface with responsive feedback',
    ],
    verifiedMetrics: 'AI-assisted research synthesis prototype',
    relatedSkills: ['Artificial Intelligence', 'Natural Language Processing (NLP)', 'Python'],
    relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
  },

  /* -------------------------------------------------------------
     17. FULL-STACK: Maison Market
  ------------------------------------------------------------- */
  {
    id: 'proj-maison-market',
    title: 'Maison Market',
    slug: 'maison-market',
    category: 'FULL STACK E-COMMERCE',
    classification: 'FULL_STACK',
    year: '2024',
    status: 'COMPLETED',
    bounty: '$145,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/maison-market',
    shortDescription:
      'Modern e-commerce storefront with product cataloging, category filtering, cart management, and checkout UI.',
    description:
      'Full-stack digital storefront and retail catalog platform featuring responsive product galleries, real-time cart persistence, multi-criteria filtering, and checkout flows.',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js'],
    keyFeatures: [
      'Interactive catalog with faceted search & category filters',
      'Local storage cart state persistence',
      'Responsive mobile-first shopping experience',
    ],
    verifiedMetrics: 'Full product discovery & cart checkout pipeline',
    relatedSkills: ['React.js', 'Full Stack Development', 'Web Applications'],
    relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
  },

  /* -------------------------------------------------------------
     18. FULL-STACK: Still House Website
  ------------------------------------------------------------- */
  {
    id: 'proj-still-house',
    title: 'Still House Website',
    slug: 'still-house-website',
    category: 'WEB DEVELOPMENT',
    classification: 'FULL_STACK',
    year: '2024',
    status: 'COMPLETED',
    bounty: '$130,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Still-House-Website',
    shortDescription:
      'Commercial hospitality web portal with menu showcases, venue reservations, and interactive location tours.',
    description:
      'Bespoke digital presence and reservation portal for the Still House hospitality brand, featuring interactive food and beverage menus, atmosphere galleries, and event booking inquiry forms.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
    keyFeatures: [
      'Interactive menu showcase with dietary filtering',
      'Event and table reservation request engine',
      'High-resolution visual galleries with smooth transitions',
    ],
    verifiedMetrics: 'Production-ready brand web portal',
    relatedSkills: ['Web Applications', 'JavaScript / TypeScript', 'Full Stack Development'],
    relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
  },

  /* -------------------------------------------------------------
     19. FULL-STACK: Stillhouse Review System
  ------------------------------------------------------------- */
  {
    id: 'proj-stillhouse-review',
    title: 'Stillhouse Review System',
    slug: 'stillhouse-review-system',
    category: 'WEB DEVELOPMENT',
    classification: 'FULL_STACK',
    year: '2024',
    status: 'COMPLETED',
    bounty: '$120,000',
    difficulty: 'EASY',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/stillhouse-reveiw',
    shortDescription:
      'Customer feedback, rating, and testimonial moderation web application with rating aggregations.',
    description:
      'Dedicated guest experience feedback platform allowing patrons to submit star ratings, category reviews, and service remarks with automated moderation and rating analytics.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage / API', 'Tailwind CSS'],
    keyFeatures: [
      'Star rating and qualitative feedback capture',
      'Client-side sentiment and score aggregation',
      'Moderation view for hospitality management',
    ],
    verifiedMetrics: 'Guest feedback capture and score reporting',
    relatedSkills: ['Web Applications', 'JavaScript / TypeScript'],
  },

  /* -------------------------------------------------------------
     20. PORTFOLIO: Photography Website
  ------------------------------------------------------------- */
  {
    id: 'proj-photography-website',
    title: 'Photography Website',
    slug: 'photography-website',
    category: 'CREATIVE FRONTEND',
    classification: 'PORTFOLIO',
    year: '2023 – 2024',
    status: 'COMPLETED',
    bounty: '$110,000',
    difficulty: 'EASY',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/photography-website',
    shortDescription:
      'Visual portfolio showcase featuring lightbox galleries, masonry layouts, and responsive media presentations.',
    description:
      'High-impact visual showcase tailored for photographers and visual artists, utilizing lazy-loaded masonry grids, full-screen lightbox previews, and adaptive resolution scaling.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Lightbox JS', 'Responsive Layout'],
    keyFeatures: [
      'Masonry photo layout with aspect-ratio preservation',
      'Touch-friendly full-screen image lightbox modal',
      'EXIF metadata tags and photo category sorting',
    ],
    verifiedMetrics: 'Responsive visual media showcase',
    relatedSkills: ['Web Applications', 'JavaScript / TypeScript'],
  },

  /* -------------------------------------------------------------
     21. EXPERIMENT: Singh Login Page
  ------------------------------------------------------------- */
  {
    id: 'proj-singh-login',
    title: 'Singh Login Page',
    slug: 'singh-login-page',
    category: 'AUTHENTICATION UI',
    classification: 'EXPERIMENT',
    year: '2023',
    status: 'COMPLETED',
    bounty: '$95,000',
    difficulty: 'EASY',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/singh-login-page',
    shortDescription:
      'Modern authentication interface exploring form validation, floating labels, and security UI patterns.',
    description:
      'Modern user authentication interface exploring responsive form layouts, client-side input validation, password visibility toggling, and accessible focus states.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Form Validation'],
    keyFeatures: [
      'Client-side email and password regex validation',
      'Animated focus states and input floating indicators',
      'Mobile-responsive centered auth card layout',
    ],
    verifiedMetrics: 'Accessible authentication UI prototype',
    relatedSkills: ['Web Applications', 'JavaScript / TypeScript'],
  },

  /* -------------------------------------------------------------
     22. PORTFOLIO: GTA Version Portfolio
  ------------------------------------------------------------- */
  {
    id: 'proj-gta-portfolio',
    title: 'GTA Version Portfolio',
    slug: 'gta-version-portfolio',
    category: 'CINEMATIC WEB EXPERIENCE',
    classification: 'PORTFOLIO',
    year: '2025 – 2026',
    status: 'COMPLETED',
    bounty: '$300,000',
    difficulty: 'EXTREME',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=85',
    github: 'https://github.com/BolnidiManikanta/Gta-version-Portfolio',
    demo: 'https://gta-portfolio-bolnidi-manikanta.ai.studio',
    shortDescription:
      'Interactive GTA Vice City inspired cinematic game menu and 3D district world showcase for Bolnidi Manikanta.',
    description:
      'Vice City-inspired digital game universe turning a software engineering portfolio into an immersive interactive experience complete with 7 navigable districts, GTA audio engine, contextual HUD, tactical GPS map, and in-game comms smartphone.',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React', 'Web Audio API'],
    keyFeatures: [
      '7 distinct navigable Vice City locations (Player HQ, AI Lab, Cyber District, Dev District, etc.)',
      'Cinematic walking character compositor with camera alignment controls',
      'In-game smartphone comms modal with interactive contact terminal',
      'Dual-mode experience: 3D GTA world + instant fast Recruiter Mode',
    ],
    verifiedMetrics: 'Production deployed interactive GTA experience',
    relatedSkills: ['React.js', 'TypeScript', 'Web Applications', 'Full Stack Development'],
    relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
  },

  /* -------------------------------------------------------------
     23. PORTFOLIO: Cinematic Portfolio
  ------------------------------------------------------------- */
  {
    id: 'proj-cinematic-portfolio',
    title: 'Cinematic Portfolio',
    slug: 'cinematic-portfolio',
    category: 'CREATIVE FRONTEND',
    classification: 'PORTFOLIO',
    year: '2025',
    status: 'COMPLETED',
    bounty: '$200,000',
    difficulty: 'HARD',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/cinematic-portfolio',
    shortDescription:
      'Cinematic interactive portfolio exploring immersive visual storytelling and ambient soundscapes.',
    description:
      'Experimental interactive portfolio exploring atmospheric visual storytelling, smooth camera traveling transitions, audio cues, and modern creative web layouts.',
    technologies: ['React.js', 'JavaScript', 'CSS3', 'Web Animations'],
    keyFeatures: [
      'Atmospheric ambient soundscape integration',
      'High-contrast typography with cinematic transitions',
      'Modular project showcase and skill breakdown',
    ],
    verifiedMetrics: 'Creative web storytelling prototype',
    relatedSkills: ['React.js', 'JavaScript / TypeScript', 'Web Applications'],
  },

  /* -------------------------------------------------------------
     24. PORTFOLIO: Manikant Portfolio
  ------------------------------------------------------------- */
  {
    id: 'proj-manikant-portfolio',
    title: 'Manikant Portfolio',
    slug: 'manikant-portfolio',
    category: 'PERSONAL PORTFOLIO',
    classification: 'PORTFOLIO',
    year: '2024',
    status: 'COMPLETED',
    bounty: '$150,000',
    difficulty: 'MEDIUM',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/Manikant-portfolio',
    shortDescription:
      'Personal web development portfolio showcasing software projects, skill taxonomy, and developer bio.',
    description:
      'Comprehensive developer web portfolio showcasing full-stack projects, programming skills, research interests, and academic credentials in a clean accessible format.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    keyFeatures: [
      'Project showcase with direct source code links',
      'Categorized technical skill meters',
      'Contact form integration and social link badges',
    ],
    verifiedMetrics: 'Personal developer showcase website',
    relatedSkills: ['Web Applications', 'JavaScript / TypeScript'],
  },

  /* -------------------------------------------------------------
     25. OTHER: BolnidiManikanta Profile Repository
  ------------------------------------------------------------- */
  {
    id: 'proj-profile-readme',
    title: 'BolnidiManikanta Profile Repository',
    slug: 'bolnidi-manikanta-github-profile',
    category: 'GITHUB ARCHITECTURE',
    classification: 'OTHER',
    year: '2023 – 2026',
    status: 'COMPLETED',
    bounty: '$100,000',
    difficulty: 'EASY',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=800&auto=format&fit=crop&q=80',
    github: 'https://github.com/BolnidiManikanta/BolnidiManikanta',
    shortDescription:
      'Central GitHub special profile configuration and developer documentation matrix.',
    description:
      'Special GitHub profile configuration and documentation hub detailing Bolnidi Manikanta technical competencies, repository directories, research links, and GitHub activity metrics.',
    technologies: ['Markdown', 'GitHub Actions', 'SVG Badges', 'Repository Orchestration'],
    keyFeatures: [
      'Dynamic GitHub statistics badges and language distribution meters',
      'Structured index of flagship machine learning and security projects',
      'Direct social connection points and research publication links',
    ],
    verifiedMetrics: 'Central hub for 25 public repositories',
    relatedSkills: ['Git & GitHub', 'Tools & DevOps'],
  },
];

/* =========================================================================
   SKILLS UNIVERSE & SKILL PROOF SYSTEM
========================================================================= */
export const skillsData: SkillCategory[] = [
  {
    id: 'programming',
    name: 'PROGRAMMING LANGUAGES',
    iconName: 'Terminal',
    skills: [
      {
        name: 'Python',
        level: 98,
        tag: 'CORE ARSENAL',
        description: 'AI/ML pipelines, computer vision with OpenCV, automated security scanners, FastAPI, Flask, backend scripts.',
        provenByProjects: [
          'Mobile Defect Analysis',
          'PhishAlert — Email Threat Detection',
          'Automated Web Application Vulnerability Scanner',
          'Secure Cloud Storage',
          'AI Human Content Checker',
          'Deepfake Detection',
          'Smart Waste Classifier',
          'Student Dropout Prediction',
        ],
        relatedCertifications: [
          'Python Programming Specialized Course (GeeksforGeeks)',
          'Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate',
        ],
        relatedExperience: ['Tata Group Cybersecurity Virtual Internship', 'JPMorgan Chase Software Engineering'],
      },
      {
        name: 'Java',
        level: 96,
        tag: 'ENTERPRISE HEAVY',
        description: 'Object-Oriented Architecture, multithreading, Spring Boot, JSP/Servlets, JDBC, data structures & algorithms.',
        provenByProjects: [
          'Interactive Java Learning Platform',
          'Blood Donation System',
        ],
        relatedCertifications: [
          'Java Programming (CodeChef)',
          'Full Stack Developer Bootcamp (GeeksforGeeks)',
        ],
        relatedExperience: ['Interactive Java Course Creator (200+ Learners)'],
      },
      {
        name: 'JavaScript / TypeScript',
        level: 97,
        tag: 'RAPID STRIKE',
        description: 'Modern ES6+, TypeScript type safety, React.js, Node.js, asynchronous event systems, interactive Canvas.',
        provenByProjects: [
          'GTA Version Portfolio',
          'Servify Apps & Servify Connect',
          'Interactive Java Learning Platform',
          'Virtual Lab – Cryptography',
          'Maison Market',
        ],
        relatedCertifications: [
          'Full Stack Developer Bootcamp (GeeksforGeeks)',
        ],
        relatedExperience: ['JPMorgan Chase Virtual Experience', 'MLSC Web Developer'],
      },
      {
        name: 'SQL',
        level: 93,
        tag: 'DATA VAULT',
        description: 'Relational database schema design, complex JOINs, normalization, transactions, query performance tuning.',
        provenByProjects: [
          'Blood Donation System',
          'Interactive Java Learning Platform',
          'Automated Web Application Vulnerability Scanner (SQLi testing)',
        ],
        relatedCertifications: [
          'Database Management Systems (CodeChef)',
          'Relational Databases and SQL (IBM)',
        ],
      },
      {
        name: 'Go (Golang)',
        level: 88,
        tag: 'HIGH VELOCITY',
        description: 'Concurrency with goroutines, command line tools, micro-utilities, high-throughput systems.',
        provenByProjects: ['CLI Tools & Micro-utilities'],
        relatedCertifications: ['Command Line Interface (CLI) With Golang From Infosys (Coursera)'],
      },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI, MACHINE LEARNING & CV',
    iconName: 'Cpu',
    skills: [
      {
        name: 'Artificial Intelligence & ML',
        level: 95,
        tag: 'NEURAL CORE',
        description: 'Supervised & unsupervised learning, classification, regression, clustering, ensemble models (Random Forest, XGBoost).',
        provenByProjects: [
          'Multi-Disorder Detection System',
          'Student Dropout Prediction System',
          'Spam Detection System',
        ],
        relatedCertifications: [
          'Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate',
        ],
      },
      {
        name: 'Computer Vision & Deep Learning',
        level: 94,
        tag: 'OPTICAL RECON',
        description: 'OpenCV image filtering, CNNs, YOLOv8 object recognition, transfer learning, facial landmark detection.',
        provenByProjects: [
          'Mobile Defect Analysis',
          'Smart Waste Classifier',
          'Deepfake Detection',
        ],
        relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
      },
      {
        name: 'Natural Language Processing (NLP)',
        level: 92,
        tag: 'LINGUISTIC MATRIX',
        description: 'Tokenization, TF-IDF, N-grams, perplexity & burstiness analysis, transformer embeddings, text sanitization.',
        provenByProjects: [
          'AI Human Content Checker',
          'Spam Detection System',
          'PhishAlert (Heuristic Lexical Parsing)',
          'Cogniva',
        ],
        relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
      },
      {
        name: 'Anomaly & Threat Detection',
        level: 96,
        tag: 'THREAT RADAR',
        description: 'Identifying outlier vectors, multi-disorder clinical anomalies, deceptive URL tokens, zero-day threat patterns.',
        provenByProjects: [
          'PhishAlert — Email Threat Detection System',
          'Automated Web Application Vulnerability Scanner',
          'Multi-Disorder Detection System',
        ],
        relatedCertifications: ['Cyber Security Analyst (Tech Mahindra / Skill India)', 'Ethical Hacker (Cisco)'],
        relatedExperience: ['Tata Group Cybersecurity Virtual Internship'],
      },
    ],
  },
  {
    id: 'cybersecurity',
    name: 'CYBERSECURITY & APPLICATION SECURITY',
    iconName: 'ShieldAlert',
    skills: [
      {
        name: 'Vulnerability Assessment & OWASP Top 10',
        level: 96,
        tag: 'DEFENSE AUDIT',
        description: 'SQL Injection, Cross-Site Scripting (XSS), CSRF, security header configurations, parameter fuzzing.',
        provenByProjects: [
          'Automated Web Application Vulnerability Scanner',
          'PhishAlert — Email Threat Detection System',
        ],
        relatedCertifications: [
          'Ethical Hacker (Cisco Networking Academy)',
          'Penetration Testing, Incident Response and Forensics (Coursera)',
        ],
        relatedExperience: ['Infoziant Security Research Student', 'Tata Group Simulation'],
      },
      {
        name: 'Phishing & Email Threat Detection',
        level: 97,
        tag: 'PERIMETER SHIELD',
        description: 'Email header inspection, SPF/DKIM validation, homoglyph domain attacks, weaponized link sanitization.',
        provenByProjects: [
          'PhishAlert — Email Threat Detection System',
        ],
        relatedCertifications: [
          'Foundation of Cybersecurity (Coursera)',
          'Cybersecurity Simulation Experience (Tata Group)',
        ],
        relatedResearch: ['res-3 (ICMLAS IEEE Accepted Paper)'],
        relatedExperience: ['Tata Group Cybersecurity Virtual Internship'],
      },
      {
        name: 'Cryptography & Encryption Protocols',
        level: 95,
        tag: 'AIRGAP VAULT',
        description: 'AES-256 GCM, RSA public-key crypto, multi-authority threshold keys, HMAC signatures, visual cipher algorithms.',
        provenByProjects: [
          'Secure Cloud Storage – Multi Authority Authentication and Encryption',
          'Virtual Lab – Cryptography Learning Platform',
        ],
        relatedCertifications: ['Foundation of Cybersecurity (Coursera)'],
        relatedResearch: ['res-2 (ICIRCA 2025 Accepted Paper)'],
      },
      {
        name: 'Ethical Hacking Concepts',
        level: 94,
        tag: 'TACTICAL PROBE',
        description: 'Reconnaissance, port and endpoint mapping, non-destructive exploit testing, defense hardening.',
        provenByProjects: [
          'Automated Web Application Vulnerability Scanner',
        ],
        relatedCertifications: [
          'Ethical Hacker (Cisco Networking Academy)',
          'Cyber Security Analyst (Skill India / Tech Mahindra)',
        ],
      },
    ],
  },
  {
    id: 'frontend',
    name: 'FRONTEND DEVELOPMENT',
    iconName: 'LayoutGrid',
    skills: [
      {
        name: 'React.js',
        level: 98,
        tag: 'REACTIVE ENGINE',
        description: 'React 18+, functional components, hooks, Context API, state management, SPA architecture, performance optimization.',
        provenByProjects: [
          'GTA Version Portfolio',
          'Servify Apps & Servify Connect',
          'Interactive Java Learning Platform',
          'Maison Market',
        ],
        relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
      },
      {
        name: 'TypeScript',
        level: 95,
        tag: 'TYPE DEFENSE',
        description: 'Strict typing, generic interfaces, union types, discriminated unions, complete architectural refactoring.',
        provenByProjects: [
          'GTA Version Portfolio',
          'Interactive Java Learning Platform',
          'Maison Market',
        ],
        relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
      },
      {
        name: 'Tailwind CSS',
        level: 98,
        tag: 'STYLING MATRIX',
        description: 'Utility-first styling, custom theme configurations, responsive breakpoints, accessible focus states, dark themes.',
        provenByProjects: [
          'GTA Version Portfolio',
          'Servify Apps',
          'Interactive Java Learning Platform',
        ],
      },
      {
        name: 'HTML5 Canvas & Web Audio',
        level: 92,
        tag: 'INTERACTIVE MEDIA',
        description: 'Canvas pixel manipulation, Web Audio API sound synthesizers, real-time compositor pipelines.',
        provenByProjects: [
          'GTA Version Portfolio',
          'Virtual Lab – Cryptography Learning Platform',
        ],
      },
    ],
  },
  {
    id: 'backend',
    name: 'BACKEND & DATABASES',
    iconName: 'Server',
    skills: [
      {
        name: 'Node.js & Express.js',
        level: 96,
        tag: 'SERVER RUNTIME',
        description: 'RESTful API endpoints, middleware pipelines, JWT auth, rate limiting, asynchronous event handling.',
        provenByProjects: [
          'Servify Apps',
          'Servify Connect',
          'Maison Market',
        ],
        relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
      },
      {
        name: 'Spring Boot & Java Backend',
        level: 91,
        tag: 'ENTERPRISE CORE',
        description: 'REST controllers, dependency injection, service layers, entity mapping, database connections.',
        provenByProjects: ['Blood Donation System'],
        relatedCertifications: ['Java Programming (CodeChef)'],
      },
      {
        name: 'Flask & FastAPI',
        level: 95,
        tag: 'MICROSERVICES',
        description: 'Lightweight Python microservices, ML model inference endpoints, asynchronous routing, Swagger documentation.',
        provenByProjects: [
          'Mobile Defect Analysis',
          'PhishAlert',
          'AI Human Content Checker',
          'Deepfake Detection',
        ],
        relatedCertifications: ['Python Programming Specialized Course (GeeksforGeeks)'],
      },
      {
        name: 'Databases (MySQL, Firestore, MongoDB)',
        level: 94,
        tag: 'PERSISTENCE',
        description: 'Relational MySQL schemas, real-time NoSQL Firebase Firestore synchronization, MongoDB document stores.',
        provenByProjects: [
          'Interactive Java Learning Platform (Firestore)',
          'Blood Donation System (MySQL)',
          'Servify Apps (MongoDB)',
        ],
        relatedCertifications: ['Database Management Systems (CodeChef)', 'Relational Databases and SQL (IBM)'],
      },
    ],
  },
  {
    id: 'tools-devops',
    name: 'TOOLS, CLOUD & WORKFLOWS',
    iconName: 'Wrench',
    skills: [
      {
        name: 'Git & GitHub',
        level: 98,
        tag: 'VERSION MATRIX',
        description: 'Branching, multi-repo management across 25+ public repositories, pull requests, collaborative version control.',
        provenByProjects: ['All 25 GitHub Repositories'],
        relatedCertifications: ['Full Stack Developer Bootcamp (GeeksforGeeks)'],
        relatedExperience: ['MLSC & ACM Web Developer & Mentor'],
      },
      {
        name: 'Linux / Ubuntu & Bash',
        level: 94,
        tag: 'KERNEL ACCESS',
        description: 'Command line utilities, shell scripting, service management, file permissions, server configuration.',
        provenByProjects: [
          'Automated Web Application Vulnerability Scanner',
          'PhishAlert',
        ],
        relatedCertifications: ['Command Line Interface (CLI) With Golang From Infosys (Coursera)'],
      },
      {
        name: 'Cloud Technologies & OCI',
        level: 91,
        tag: 'HYPERSCALE',
        description: 'Oracle Cloud Infrastructure AI services, Firebase cloud backends, containerization concepts.',
        provenByProjects: ['Interactive Java Learning Platform', 'Secure Cloud Storage'],
        relatedCertifications: ['Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate'],
      },
      {
        name: 'Development & Security Tools',
        level: 95,
        tag: 'TACTICAL TOOLSET',
        description: 'Postman API testing, Vite bundler, Wireshark packet capture, Burp Suite testing concepts, VS Code.',
        provenByProjects: [
          'Automated Web Application Vulnerability Scanner',
          'Servify Apps',
        ],
        relatedCertifications: ['Ethical Hacker (Cisco)', 'Penetration Testing (Coursera)'],
      },
    ],
  },
];

/* =========================================================================
   CENTRAL PORTFOLIO DATA HUB
   Single source of truth containing all portfolio dimensions
========================================================================= */
export const portfolioData = {
  profile: profileData,
  education: educationData,
  projects: projectsData,
  skills: skillsData,
  certifications: certificationsData,
  research: researchPublicationsData,
  experience: experienceData,
  leadership: leadershipData,
  achievements: achievementsData,
};

