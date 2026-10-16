export interface VerifiedSkill {
  id: string;
  name: string;
  category: string;
  categoryId?: string;
  focus: string;
  tag?: string;
  verified?: boolean;
  description?: string;
  coreAreas?: string[];
  architectureRole?: string;
  relatedSkills?: string[];
  tools?: string[];
}

export const matchCategory = (skill: VerifiedSkill, categoryId: string): boolean => {
  if (categoryId === 'all') return true;
  if (skill.categoryId) return skill.categoryId === categoryId;
  const cat = (skill.category || '').toLowerCase();
  switch (categoryId) {
    case 'programming':
      return cat.includes('program');
    case 'cybersecurity':
      return cat.includes('secur');
    case 'ai-ml':
      return cat.includes('ai') || cat.includes('machine');
    case 'fullstack':
      return cat.includes('full-stack') || cat.includes('fullstack');
    case 'databases':
      return cat.includes('database');
    case 'cloud-devops':
      return cat.includes('cloud') || cat.includes('devops');
    case 'tools':
      return cat.includes('tool');
    default:
      return true;
  }
};

export interface SkillCategoryGroup {
  id: string;
  title: string;
  shortName: string;
  description: string;
  color: string; // Tailwind color token or hex
  borderColor: string;
  glowColor: string;
  badgeBg: string;
  badgeText: string;
  iconName: 'Terminal' | 'Shield' | 'Cpu' | 'Layers' | 'Database' | 'Cloud' | 'Wrench';
  skills: VerifiedSkill[];
}

export const SKILLS_CATEGORIES: SkillCategoryGroup[] = [
  {
    id: 'programming',
    title: 'PROGRAMMING',
    shortName: 'LANGUAGES',
    description: 'Core programming and scripting languages for systems, algorithms, and application backends.',
    color: 'text-pink-400',
    borderColor: 'border-pink-500/50 hover:border-pink-400',
    glowColor: 'shadow-[0_0_18px_rgba(236,0,140,0.25)]',
    badgeBg: 'bg-pink-950/80',
    badgeText: 'text-pink-300',
    iconName: 'Terminal',
    skills: [
      {
        id: 'py',
        name: 'Python',
        category: 'PROGRAMMING',
        focus: 'AI/ML pipelines, OpenCV vision, automation, security scanners, FastAPI, Flask',
        tag: 'Primary Core',
      },
      {
        id: 'java',
        name: 'Java',
        category: 'PROGRAMMING',
        focus: 'OOP architecture, multithreading, Spring Boot, JDBC, algorithms & data structures',
        tag: 'Enterprise Core',
      },
      {
        id: 'js',
        name: 'JavaScript',
        category: 'PROGRAMMING',
        focus: 'Modern ES6+, asynchronous event loop, browser APIs, full-stack web runtime',
        tag: 'Web Standard',
      },
      {
        id: 'ts',
        name: 'TypeScript',
        category: 'PROGRAMMING',
        focus: 'Static type contracts, generics, strict interface validation, modern tooling',
        tag: 'Strict Typing',
      },
      {
        id: 'cpp',
        name: 'C / C++',
        category: 'PROGRAMMING',
        focus: 'Computer science core, object-oriented concepts, memory management, data structures',
        tag: 'CS Systems',
      },
      {
        id: 'sql',
        name: 'SQL',
        category: 'PROGRAMMING',
        focus: 'Structured relational querying, table joins, transactions, constraints & schema design',
        tag: 'Relational',
      },
      {
        id: 'bash',
        name: 'Bash',
        category: 'PROGRAMMING',
        focus: 'Shell automation scripts, CLI utilities, environment configs, terminal workflows',
        tag: 'CLI Automation',
      },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'CYBERSECURITY',
    shortName: 'SECURITY',
    description: 'Offensive and defensive security practices, vulnerability assessment, cryptography, and digital forensics.',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/50 hover:border-rose-400',
    glowColor: 'shadow-[0_0_18px_rgba(244,63,94,0.25)]',
    badgeBg: 'bg-rose-950/80',
    badgeText: 'text-rose-300',
    iconName: 'Shield',
    skills: [
      {
        id: 'cybersec',
        name: 'Cybersecurity',
        category: 'CYBERSECURITY',
        focus: 'Information security principles, CIA triad, security hardening, perimeter defense',
        tag: 'Defense',
      },
      {
        id: 'web-sec',
        name: 'Web Security',
        category: 'CYBERSECURITY',
        focus: 'OWASP Top 10 mitigation, SQL injection, XSS defense, CSRF protection, secure headers',
        tag: 'OWASP Top 10',
      },
      {
        id: 'vuln-assess',
        name: 'Vulnerability Assessment',
        category: 'CYBERSECURITY',
        focus: 'Automated vulnerability scanning, misconfiguration discovery, remediation verification',
        tag: 'Audit',
      },
      {
        id: 'pen-test',
        name: 'Penetration Testing',
        category: 'CYBERSECURITY',
        focus: 'Non-destructive exploit testing, reconnaissance, attack vector analysis, security reporting',
        tag: 'Ethical Hacking',
      },
      {
        id: 'email-sec',
        name: 'Email Security',
        category: 'CYBERSECURITY',
        focus: 'SPF / DKIM validation, phishing link sanitization, homoglyph domain attacks, threat filters',
        tag: 'Phish Defense',
      },
      {
        id: 'threat-anal',
        name: 'Threat Analysis',
        category: 'CYBERSECURITY',
        focus: 'Indicator of Compromise (IoC) evaluation, behavioral heuristics, anomaly detection',
        tag: 'Threat Intel',
      },
      {
        id: 'inc-resp',
        name: 'Incident Response',
        category: 'CYBERSECURITY',
        focus: 'Triage methodology, containment workflows, root cause investigation, security playbooks',
        tag: 'Operations',
      },
      {
        id: 'forensics',
        name: 'Digital Forensics',
        category: 'CYBERSECURITY',
        focus: 'Artifact inspection, audit log timeline reconstruction, integrity validation',
        tag: 'Investigation',
      },
      {
        id: 'crypto',
        name: 'Applied Cryptography',
        category: 'CYBERSECURITY',
        focus: 'AES-256 symmetric encryption, RSA public-key crypto, HMAC signatures, multi-authority keys',
        tag: 'Encryption',
      },
      {
        id: 'sec-fund',
        name: 'Security Fundamentals',
        category: 'CYBERSECURITY',
        focus: 'Access control matrices, principle of least privilege, zero-trust mindset, authentication',
        tag: 'Core Discipline',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / MACHINE LEARNING',
    shortName: 'AI & ML',
    description: 'Intelligent systems, deep neural architectures, computer vision pipelines, and model evaluation.',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/50 hover:border-purple-400',
    glowColor: 'shadow-[0_0_18px_rgba(168,85,247,0.25)]',
    badgeBg: 'bg-purple-950/80',
    badgeText: 'text-purple-300',
    iconName: 'Cpu',
    skills: [
      {
        id: 'ml',
        name: 'Machine Learning',
        category: 'AI / MACHINE LEARNING',
        focus: 'Supervised & unsupervised learning, classification, regression, ensemble models, clustering',
        tag: 'Predictive Models',
      },
      {
        id: 'dl',
        name: 'Deep Learning',
        category: 'AI / MACHINE LEARNING',
        focus: 'Convolutional neural networks (CNNs), multi-layer perceptrons, transfer learning',
        tag: 'Neural Networks',
      },
      {
        id: 'cv',
        name: 'Computer Vision',
        category: 'AI / MACHINE LEARNING',
        focus: 'OpenCV image filtering, feature extraction, edge detection, defect identification, YOLOv8',
        tag: 'Vision Processing',
      },
      {
        id: 'aiml',
        name: 'AI/ML Systems',
        category: 'AI / MACHINE LEARNING',
        focus: 'End-to-end ML deployment workflows, inference REST endpoints, data preprocessing pipelines',
        tag: 'Pipelines',
      },
      {
        id: 'nlp',
        name: 'Natural Language Processing',
        category: 'AI / MACHINE LEARNING',
        focus: 'Tokenization, lexical parsing, TF-IDF vectorization, text sanitization, heuristic scoring',
        tag: 'Text Heuristics',
      },
      {
        id: 'model-exp',
        name: 'Model Experimentation',
        category: 'AI / MACHINE LEARNING',
        focus: 'Precision/recall tuning, confusion matrix evaluation, hyperparameter calibration',
        tag: 'Evaluation',
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'FULL-STACK DEVELOPMENT',
    shortName: 'FULL-STACK',
    description: 'Modern frontend engineering, server-side frameworks, microservices, and distributed web applications.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50 hover:border-cyan-400',
    glowColor: 'shadow-[0_0_18px_rgba(6,182,212,0.25)]',
    badgeBg: 'bg-cyan-950/80',
    badgeText: 'text-cyan-300',
    iconName: 'Layers',
    skills: [
      {
        id: 'react',
        name: 'React',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'React 18+, hooks, state machines, component hierarchy, Context API, responsive UI',
        tag: 'SPA Architecture',
      },
      {
        id: 'flask',
        name: 'Flask',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Lightweight Python microservices, routing, blueprint architecture, ML model serving',
        tag: 'Micro-Framework',
      },
      {
        id: 'fastapi',
        name: 'FastAPI',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Asynchronous API endpoints, Pydantic type validation, high-throughput model inferencing',
        tag: 'Async Backend',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Firestore client SDK, Firebase Authentication, cloud hosting, real-time listeners',
        tag: 'BaaS / Real-Time',
      },
      {
        id: 'nodejs',
        name: 'Node.js & Express',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Server runtime, middleware pipelines, CORS, JSON routing, request authentication',
        tag: 'Node Runtime',
      },
      {
        id: 'frontend',
        name: 'Frontend Development',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Tailwind CSS utility styling, HTML5 Canvas graphics, Web Audio API, responsive viewports',
        tag: 'Client Systems',
      },
      {
        id: 'backend',
        name: 'Backend Development',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Business logic layers, data validation, database connection pooling, error boundaries',
        tag: 'Server Logic',
      },
      {
        id: 'rest-api',
        name: 'REST APIs',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'HTTP verb semantics, status codes, query pagination, JSON payloads, contract design',
        tag: 'API Standards',
      },
      {
        id: 'webapp-dev',
        name: 'Web Application Development',
        category: 'FULL-STACK DEVELOPMENT',
        focus: 'Complete lifecycle engineering: design, prototyping, state modeling, deployment',
        tag: 'Full Lifecycle',
      },
    ],
  },
  {
    id: 'databases',
    title: 'DATABASES',
    shortName: 'DATABASES',
    description: 'Relational and NoSQL persistence layers, transactional consistency, and schema modeling.',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/50 hover:border-amber-400',
    glowColor: 'shadow-[0_0_18px_rgba(245,158,11,0.25)]',
    badgeBg: 'bg-amber-950/80',
    badgeText: 'text-amber-300',
    iconName: 'Database',
    skills: [
      {
        id: 'db-sql',
        name: 'SQL (Relational)',
        category: 'DATABASES',
        focus: 'MySQL / PostgreSQL, relational constraints, foreign keys, normalization, indexes',
        tag: 'RDBMS',
      },
      {
        id: 'db-firestore',
        name: 'Firestore',
        category: 'DATABASES',
        focus: 'NoSQL document collections, real-time client subscriptions, offline persistence cache',
        tag: 'NoSQL Cloud',
      },
      {
        id: 'db-mgmt',
        name: 'Database Management',
        category: 'DATABASES',
        focus: 'Data integrity rules, ACID transactional consistency, backup schemas, query tuning',
        tag: 'Architecture',
      },
      {
        id: 'db-mongo',
        name: 'MongoDB',
        category: 'DATABASES',
        focus: 'BSON document modeling, flexible aggregation pipelines, dynamic schemas',
        tag: 'Document Store',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'CLOUD / DEVOPS / SYSTEMS',
    shortName: 'CLOUD & SYSTEMS',
    description: 'Operating systems, containerization, cloud infrastructure, and network protocols.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50 hover:border-emerald-400',
    glowColor: 'shadow-[0_0_18px_rgba(16,185,129,0.25)]',
    badgeBg: 'bg-emerald-950/80',
    badgeText: 'text-emerald-300',
    iconName: 'Cloud',
    skills: [
      {
        id: 'linux',
        name: 'Linux',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'Kernel architecture, system processes, cron daemons, package management, permissions',
        tag: 'OS Kernel',
      },
      {
        id: 'ubuntu',
        name: 'Ubuntu',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'Server environment configuration, systemd services, SSH remote management, firewalls',
        tag: 'Server Distro',
      },
      {
        id: 'docker',
        name: 'Docker',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'Dockerfile configurations, container isolation, port bindings, reproducible runs',
        tag: 'Containers',
      },
      {
        id: 'k8s',
        name: 'Kubernetes Basics',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'Cluster concepts, Pod lifecycle, service discovery, container orchestration fundamentals',
        tag: 'Orchestration',
      },
      {
        id: 'cloud-fund',
        name: 'Cloud Fundamentals',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'Oracle Cloud Infrastructure (OCI Certified AI Foundation), compute, cloud storage',
        tag: 'OCI & Cloud',
      },
      {
        id: 'vm',
        name: 'Virtual Machines',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'Hypervisor virtualization, sandbox environments for security testing, network isolation',
        tag: 'Virtualization',
      },
      {
        id: 'networking',
        name: 'Networking Fundamentals',
        category: 'CLOUD / DEVOPS / SYSTEMS',
        focus: 'TCP/IP model, HTTP/HTTPS protocols, DNS resolution, port routing, packet sniffing',
        tag: 'Protocols',
      },
    ],
  },
  {
    id: 'tools',
    title: 'DEVELOPMENT TOOLS',
    shortName: 'TOOLS',
    description: 'Version control systems, code editors, API development consoles, and terminal tools.',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/50 hover:border-sky-400',
    glowColor: 'shadow-[0_0_18px_rgba(14,165,233,0.25)]',
    badgeBg: 'bg-sky-950/80',
    badgeText: 'text-sky-300',
    iconName: 'Wrench',
    skills: [
      {
        id: 'git',
        name: 'Git',
        category: 'DEVELOPMENT TOOLS',
        focus: 'Distributed version control, branch management, merge conflict resolution, commits',
        tag: 'VCS',
      },
      {
        id: 'github',
        name: 'GitHub',
        category: 'DEVELOPMENT TOOLS',
        focus: 'Multi-repository governance (25+ repos), release tags, collaborative code review',
        tag: 'Collaboration',
      },
      {
        id: 'vscode',
        name: 'VS Code',
        category: 'DEVELOPMENT TOOLS',
        focus: 'Workspace debugging, extension ecosystems, linting configs, multi-root workspaces',
        tag: 'IDE',
      },
      {
        id: 'cli',
        name: 'Command Line Interface',
        category: 'DEVELOPMENT TOOLS',
        focus: 'Terminal navigation, stream piping, grep/awk text filtering, environment flags',
        tag: 'Terminal',
      },
      {
        id: 'postman',
        name: 'Postman',
        category: 'DEVELOPMENT TOOLS',
        focus: 'REST endpoint testing, header inspection, authorization token testing, payloads',
        tag: 'API Tool',
      },
      {
        id: 'vite',
        name: 'Vite',
        category: 'DEVELOPMENT TOOLS',
        focus: 'Lightning fast frontend bundling, modern ES module resolution, build optimization',
        tag: 'Bundler',
      },
    ],
  },
];

export const TOTAL_VERIFIED_SKILLS_COUNT = SKILLS_CATEGORIES.reduce(
  (acc, cat) => acc + cat.skills.length,
  0
);

// Comprehensive dictionary providing rich dossier metadata for all technical competencies
const SKILL_DOSSIER_DATABASE: Record<
  string,
  {
    description: string;
    coreAreas: string[];
    architectureRole: string;
    relatedSkills: string[];
  }
> = {
  python: {
    description:
      'A high-level programming language widely used in software development, automation, data science, and AI/ML workflows.',
    coreAreas: ['Scripting', 'Automation', 'Data Analysis', 'AI/ML', 'Web Development'],
    architectureRole: 'Algorithm Implementation • Tool Development',
    relatedSkills: ['FastAPI', 'Flask', 'OpenCV', 'Bash', 'Docker'],
  },
  java: {
    description:
      'Enterprise-grade object-oriented language engineered for robust backend services, multi-threaded pipelines, and scalable distributed architectures.',
    coreAreas: ['OOP Architecture', 'Multithreading', 'Spring Boot', 'Data Structures', 'JDBC'],
    architectureRole: 'Enterprise Services • Backend Architecture',
    relatedSkills: ['SQL', 'Docker', 'Linux', 'REST APIs'],
  },
  javascript: {
    description:
      'Dynamic, asynchronous language powering the interactive web ecosystem, event-driven services, and client-side browser runtimes.',
    coreAreas: ['ES6+ Syntaxes', 'Event Loop', 'Async/Await', 'Browser APIs', 'Full-Stack Runtime'],
    architectureRole: 'Client-Side Interaction • Async Event Handling',
    relatedSkills: ['TypeScript', 'React', 'Node.js', 'Vite'],
  },
  typescript: {
    description:
      'A statically typed superset of JavaScript adding compile-time type safety, structured contracts, and enterprise scalability to modern codebases.',
    coreAreas: ['Static Typing', 'Generics', 'Type Inference', 'Interface Contracts', 'Strict Mode'],
    architectureRole: 'Type Contract Definition • API Interface Safety',
    relatedSkills: ['JavaScript', 'React', 'Node.js', 'REST APIs'],
  },
  'c / c++': {
    description:
      'High-performance systems programming language providing low-level memory control, deterministic execution, and foundational data structures.',
    coreAreas: ['Memory Management', 'Pointers', 'Data Structures', 'OOP Paradigm', 'Algorithmic Speed'],
    architectureRole: 'Low-Level Systems • Algorithmic Foundation',
    relatedSkills: ['Python', 'Bash', 'Linux', 'Systems Core'],
  },
  sql: {
    description:
      'Standard language for relational database management, schema design, complex query execution, table joins, and transactional consistency.',
    coreAreas: ['Complex Joins', 'Indexing', 'Schema Design', 'ACID Transactions', 'Aggregations'],
    architectureRole: 'Relational Query Engine • Data Integrity',
    relatedSkills: ['PostgreSQL', 'MySQL', 'Firestore', 'Database Management'],
  },
  bash: {
    description:
      'Unix shell command scripting environment used for server automation, devops pipelines, system maintenance, and CLI tooling.',
    coreAreas: ['Shell Automation', 'Stream Piping', 'Cron Scheduling', 'Environment Configs', 'Terminal Workflows'],
    architectureRole: 'Infrastructure Automation • Pipeline Scripting',
    relatedSkills: ['Linux', 'Ubuntu', 'Git', 'Docker'],
  },
  'machine learning': {
    description:
      'Predictive computational algorithms and mathematical modeling for pattern recognition, feature classification, and regression analysis.',
    coreAreas: ['Supervised Learning', 'Ensemble Models', 'Feature Engineering', 'Clustering', 'Scikit-Learn'],
    architectureRole: 'Predictive Inference Engine • Analytical Modeling',
    relatedSkills: ['Deep Learning', 'Python', 'Computer Vision', 'Model Evaluation'],
  },
  'deep learning': {
    description:
      'Multi-layer artificial neural networks and convolutional architectures designed to learn complex abstract representations from high-dimensional data.',
    coreAreas: ['CNN Architectures', 'Backpropagation', 'Transfer Learning', 'PyTorch / TensorFlow', 'Neural Weights'],
    architectureRole: 'Deep Representation Learning • Computer Vision Backend',
    relatedSkills: ['Computer Vision', 'Machine Learning', 'AI Systems', 'Python'],
  },
  'computer vision': {
    description:
      'Digital image processing and perceptual intelligence pipelines for object detection, morphological filtering, and spatial defect identification.',
    coreAreas: ['OpenCV Filtering', 'Edge Detection', 'Feature Extraction', 'YOLOv8 Detection', 'Morphological Transforms'],
    architectureRole: 'Real-Time Visual Processing • Optical Defect Identification',
    relatedSkills: ['Deep Learning', 'Python', 'Machine Learning', 'Model Evaluation'],
  },
  nlp: {
    description:
      'Algorithmic processing of human language including tokenization, semantic vectorization, lexical parsing, and sentiment heuristics.',
    coreAreas: ['Tokenization', 'TF-IDF Vectors', 'Lexical Parsing', 'Heuristic Scoring', 'Text Sanitization'],
    architectureRole: 'Text Analysis Engine • Linguistic Parsing Pipeline',
    relatedSkills: ['Machine Learning', 'Python', 'Deep Learning', 'AI Systems'],
  },
  'natural language processing': {
    description:
      'Algorithmic processing of human language including tokenization, semantic vectorization, lexical parsing, and sentiment heuristics.',
    coreAreas: ['Tokenization', 'TF-IDF Vectors', 'Lexical Parsing', 'Heuristic Scoring', 'Text Sanitization'],
    architectureRole: 'Text Analysis Engine • Linguistic Parsing Pipeline',
    relatedSkills: ['Machine Learning', 'Python', 'Deep Learning', 'AI Systems'],
  },
  'model evaluation': {
    description:
      'Rigorous quantitative benchmarking of machine learning models via confusion matrices, ROC-AUC curves, and cross-validation metrics.',
    coreAreas: ['Precision & Recall', 'F1-Score Calibration', 'Confusion Matrices', 'ROC-AUC Curves', 'Cross-Validation'],
    architectureRole: 'Model Validation • Quality Assurance Assurance',
    relatedSkills: ['Machine Learning', 'Deep Learning', 'AI Systems', 'Python'],
  },
  'model experimentation': {
    description:
      'Rigorous quantitative benchmarking of machine learning models via confusion matrices, ROC-AUC curves, and cross-validation metrics.',
    coreAreas: ['Precision & Recall', 'F1-Score Calibration', 'Confusion Matrices', 'ROC-AUC Curves', 'Hyperparameter Tuning'],
    architectureRole: 'Model Validation • Quality Assurance Assurance',
    relatedSkills: ['Machine Learning', 'Deep Learning', 'AI Systems', 'Python'],
  },
  'ai systems': {
    description:
      'End-to-end production pipelines integrating data preprocessing, model inference APIs, monitoring telemetry, and automated deployment.',
    coreAreas: ['Inference Pipelines', 'REST Model Endpoints', 'Preprocessing Queues', 'Latency Optimization', 'Production Serving'],
    architectureRole: 'AI Microservice Orchestration • Pipeline Lifecycle',
    relatedSkills: ['FastAPI', 'Docker', 'Python', 'Machine Learning'],
  },
  'ai/ml systems': {
    description:
      'End-to-end production pipelines integrating data preprocessing, model inference APIs, monitoring telemetry, and automated deployment.',
    coreAreas: ['Inference Pipelines', 'REST Model Endpoints', 'Preprocessing Queues', 'Latency Optimization', 'Production Serving'],
    architectureRole: 'AI Microservice Orchestration • Pipeline Lifecycle',
    relatedSkills: ['FastAPI', 'Docker', 'Python', 'Machine Learning'],
  },
  'web security': {
    description:
      'Proactive identification and mitigation of attack vectors, OWASP Top 10 vulnerabilities, and browser-facing perimeter threats.',
    coreAreas: ['OWASP Top 10', 'SQLi Mitigation', 'XSS Sanitization', 'CSRF Protection', 'Secure HTTP Headers'],
    architectureRole: 'Application Perimeter Defense • Vulnerability Remediation',
    relatedSkills: ['Penetration Testing', 'Cybersecurity', 'Threat Analysis', 'Cryptography'],
  },
  'penetration testing': {
    description:
      'Methodical security assessment utilizing simulated cyberattacks to locate vulnerabilities before malicious adversaries can exploit them.',
    coreAreas: ['Reconnaissance', 'Exploitation Testing', 'Burp Suite Proxies', 'Network Scanning', 'Security Reporting'],
    architectureRole: 'Offensive Security Audit • Attack Surface Mapping',
    relatedSkills: ['Web Security', 'Wireshark', 'Nmap', 'Cybersecurity'],
  },
  'threat analysis': {
    description:
      'Continuous evaluation of indicators of compromise (IoCs), attacker tactics, behavioral heuristics, and anomalous system events.',
    coreAreas: ['IoC Extraction', 'Behavioral Heuristics', 'MITRE ATT&CK Mapping', 'Log Correlation', 'Threat Intel'],
    architectureRole: 'Threat Intelligence • Proactive Risk Mitigation',
    relatedSkills: ['Digital Forensics', 'Incident Response', 'Cybersecurity', 'Web Security'],
  },
  'digital forensics': {
    description:
      'Investigative preservation, extraction, and forensic timeline reconstruction of digital artifacts following security incidents.',
    coreAreas: ['Artifact Extraction', 'Timeline Reconstruction', 'File Carving', 'Memory Forensics', 'Chain of Custody'],
    architectureRole: 'Post-Breach Investigation • Forensic Evidence Integrity',
    relatedSkills: ['Threat Analysis', 'Cybersecurity', 'Incident Response', 'Linux'],
  },
  'email security': {
    description:
      'Defense protocols designed to detect malicious phishing campaigns, spoofed sender headers, suspicious links, and deceptive attachments.',
    coreAreas: ['SPF / DKIM / DMARC', 'Phishing Link Analysis', 'Homoglyph Detection', 'Header Inspection', 'Gateway Filters'],
    architectureRole: 'Communications Security • Phishing Vector Neutralization',
    relatedSkills: ['Cybersecurity', 'Threat Analysis', 'Web Security', 'Networking'],
  },
  cryptography: {
    description:
      'Mathematical cryptographic primitives, symmetric and asymmetric ciphers, hash digests, and secure key lifecycle management.',
    coreAreas: ['AES-256 Symmetric', 'RSA Key Pairs', 'SHA-256 Hashing', 'HMAC Authentication', 'Key Management'],
    architectureRole: 'Data Confidentiality • Cryptographic Integrity',
    relatedSkills: ['Web Security', 'Cybersecurity', 'Python', 'Security Fundamentals'],
  },
  'applied cryptography': {
    description:
      'Mathematical cryptographic primitives, symmetric and asymmetric ciphers, hash digests, and secure key lifecycle management.',
    coreAreas: ['AES-256 Symmetric', 'RSA Key Pairs', 'SHA-256 Hashing', 'HMAC Authentication', 'Key Management'],
    architectureRole: 'Data Confidentiality • Cryptographic Integrity',
    relatedSkills: ['Web Security', 'Cybersecurity', 'Python', 'Security Fundamentals'],
  },
  cybersecurity: {
    description:
      'Holistic defensive and offensive information security engineering protecting confidentiality, integrity, and availability.',
    coreAreas: ['CIA Triad', 'Zero Trust Architecture', 'Security Hardening', 'Access Control', 'Defense in Depth'],
    architectureRole: 'Holistic Security Governance • System Hardening',
    relatedSkills: ['Web Security', 'Penetration Testing', 'Applied Cryptography', 'Linux'],
  },
  react: {
    description:
      'A declarative, component-driven frontend library for building highly interactive, stateful web user interfaces and single-page applications.',
    coreAreas: ['Component Lifecycle', 'State Management', 'Virtual DOM', 'Custom Hooks', 'Context API'],
    architectureRole: 'Client Presentation Layer • Interactive UI Engine',
    relatedSkills: ['TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite'],
  },
  'node.js': {
    description:
      'Asynchronous, non-blocking JavaScript runtime engineered to execute scalable server-side networking applications and microservices.',
    coreAreas: ['Event-Driven I/O', 'Express Framework', 'Middleware Chains', 'REST Routing', 'NPM Ecosystem'],
    architectureRole: 'API Gateway Runtime • Microservice Backend',
    relatedSkills: ['Express', 'TypeScript', 'REST APIs', 'MongoDB'],
  },
  'node.js & express': {
    description:
      'Asynchronous, non-blocking JavaScript runtime engineered to execute scalable server-side networking applications and microservices.',
    coreAreas: ['Event-Driven I/O', 'Express Framework', 'Middleware Chains', 'REST Routing', 'NPM Ecosystem'],
    architectureRole: 'API Gateway Runtime • Microservice Backend',
    relatedSkills: ['TypeScript', 'REST APIs', 'MongoDB', 'JavaScript'],
  },
  'rest apis': {
    description:
      'Architectural style for web services utilizing standard HTTP methods, JSON payloads, stateless communications, and predictable endpoint contracts.',
    coreAreas: ['HTTP Semantics', 'JSON Contracts', 'Status Codes', 'Pagination & Filtering', 'Authentication Headers'],
    architectureRole: 'Inter-Service Communication • Client-Server Contracts',
    relatedSkills: ['FastAPI', 'Node.js', 'Flask', 'Postman'],
  },
  firebase: {
    description:
      'Cloud platform offering managed serverless databases, real-time reactive sync, managed user authentication, and edge hosting.',
    coreAreas: ['Firestore NoSQL', 'Real-Time Sync', 'Firebase Auth', 'Security Rules', 'Cloud Hosting'],
    architectureRole: 'Backend-as-a-Service • Real-Time Data Layer',
    relatedSkills: ['React', 'TypeScript', 'Firestore', 'REST APIs'],
  },
  'tailwind css': {
    description:
      'Utility-first CSS framework enabling rapid, highly customized responsive interface design directly within component markup.',
    coreAreas: ['Utility Classes', 'Responsive Breakpoints', 'Custom Design Systems', 'Flexbox & CSS Grid', 'Pseudo-Class States'],
    architectureRole: 'Styling Architecture • Responsive Design System',
    relatedSkills: ['React', 'Frontend Development', 'TypeScript', 'Vite'],
  },
  docker: {
    description:
      'Containerization platform packaging software into lightweight, isolated, and portable container environments for reliable execution.',
    coreAreas: ['Container Images', 'Dockerfiles', 'Port Mapping', 'Volume Persistence', 'Multi-Stage Builds'],
    architectureRole: 'Application Containerization • Environment Parity',
    relatedSkills: ['Linux', 'Ubuntu', 'Kubernetes Basics', 'Git'],
  },
  linux: {
    description:
      'Open-source Unix-like operating system kernel forming the bedrock of modern server infrastructure, cloud computing, and cybersecurity tooling.',
    coreAreas: ['Kernel Architecture', 'Process Management', 'Permissions & Ownership', 'Shell Utilities', 'Cron Daemons'],
    architectureRole: 'Infrastructure Operating System • System Automation',
    relatedSkills: ['Ubuntu', 'Bash', 'Docker', 'Networking Fundamentals'],
  },
  git: {
    description:
      'Distributed version control system tracking source code modifications, branch merges, and collaborative software history.',
    coreAreas: ['Distributed VCS', 'Branching & Merging', 'Commit History', 'Rebase & Conflict Resolution', 'Git Hooks'],
    architectureRole: 'Source Code Governance • Version Management',
    relatedSkills: ['GitHub', 'VS Code', 'CLI', 'Vite'],
  },
  github: {
    description:
      'Cloud-based git repository hosting and developer platform managing code collaboration, issue tracking, CI/CD actions, and portfolio projects.',
    coreAreas: ['Remote Repositories', 'Pull Requests', 'Code Reviews', 'GitHub Actions', 'Release Management'],
    architectureRole: 'Collaborative Code Hub • Repository Hosting',
    relatedSkills: ['Git', 'VS Code', 'CLI', 'Docker'],
  },
};

export const getSkillDossier = (skill: VerifiedSkill): VerifiedSkill => {
  const key = skill.name.toLowerCase().trim();
  const entry =
    SKILL_DOSSIER_DATABASE[key] ||
    SKILL_DOSSIER_DATABASE[skill.id.toLowerCase()] ||
    Object.entries(SKILL_DOSSIER_DATABASE).find(([k]) => key.includes(k))?.[1];

  if (entry) {
    return {
      ...skill,
      verified: true,
      description: skill.description || entry.description,
      coreAreas: skill.coreAreas || entry.coreAreas,
      architectureRole: skill.architectureRole || entry.architectureRole,
      relatedSkills: skill.relatedSkills || entry.relatedSkills,
      tools: skill.tools || (entry.relatedSkills ? entry.relatedSkills.slice(0, 4) : ['VS Code', 'Git', 'CLI', 'Docker']),
    };
  }

  // Sensible high-tech fallback derived from focus & category
  const areas = skill.focus
    ? skill.focus
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .slice(0, 5)
    : ['System Architecture', 'Core Implementation', 'Performance Tuning'];

  return {
    ...skill,
    verified: true,
    description:
      skill.description ||
      `Enterprise-grade competency in ${skill.name}, focusing on ${skill.focus || 'advanced technical implementation and system architecture'}.`,
    coreAreas: skill.coreAreas || areas,
    architectureRole:
      skill.architectureRole ||
      `${skill.category.split('/')[0].trim()} Engineering • System Optimization`,
    relatedSkills: skill.relatedSkills || ['Python', 'TypeScript', 'Docker', 'Linux'],
    tools: skill.tools || ['VS Code', 'Git', 'CLI', 'Terminal'],
  };
};

export const ALL_VERIFIED_SKILLS: VerifiedSkill[] = SKILLS_CATEGORIES.flatMap((c) =>
  c.skills.map((skill) =>
    getSkillDossier({
      ...skill,
      categoryId: c.id,
    })
  )
);

