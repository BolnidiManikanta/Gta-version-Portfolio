export const PROJECT_CATEGORY_TABS = [
  'ALL PROJECTS',
  'AI / MACHINE LEARNING',
  'CYBERSECURITY',
  'FULL-STACK / WEB DEVELOPMENT',
  'EDUCATION / LEARNING PLATFORMS',
  'RESEARCH / INNOVATION PROJECTS',
  'TOOLS / EXPERIMENTS',
  'PORTFOLIO / CREATIVE PROJECTS',
] as const;

export type ProjectCategoryTab = (typeof PROJECT_CATEGORY_TABS)[number];

export const PROJECT_CATEGORIES_MAP: Record<string, ProjectCategoryTab[]> = {
  // 1. Mobile Defect Analysis
  'proj-mobile-defect': ['AI / MACHINE LEARNING', 'RESEARCH / INNOVATION PROJECTS'],
  // 2. Multi-Disorder Detection System
  'proj-multi-disorder': ['AI / MACHINE LEARNING', 'RESEARCH / INNOVATION PROJECTS'],
  // 3. Servify Apps
  'proj-servify-apps': ['FULL-STACK / WEB DEVELOPMENT', 'RESEARCH / INNOVATION PROJECTS'],
  // 4. Servify Connect
  'proj-servify-connect': ['FULL-STACK / WEB DEVELOPMENT', 'RESEARCH / INNOVATION PROJECTS'],
  // 5. PhishAlert — Email Threat Detection System
  'proj-phishalert': ['CYBERSECURITY', 'AI / MACHINE LEARNING', 'RESEARCH / INNOVATION PROJECTS'],
  // 6. Automated Web Application Vulnerability Scanner
  'proj-vuln-scanner': ['CYBERSECURITY', 'TOOLS / EXPERIMENTS'],
  // 7. Secure Cloud Storage – Multi Authority Authentication and Encryption
  'proj-secure-cloud': ['CYBERSECURITY', 'RESEARCH / INNOVATION PROJECTS'],
  // 8. Interactive Java Learning Platform
  'proj-java-learning': ['EDUCATION / LEARNING PLATFORMS', 'FULL-STACK / WEB DEVELOPMENT'],
  // 9. Virtual Lab – Cryptography Learning Platform
  'proj-virtual-lab': ['EDUCATION / LEARNING PLATFORMS', 'CYBERSECURITY'],
  // 10. Deepfake Detection
  'proj-deepfake-detect': ['AI / MACHINE LEARNING', 'CYBERSECURITY', 'RESEARCH / INNOVATION PROJECTS'],
  // 11. AI Human Content Checker
  'proj-ai-checker': ['AI / MACHINE LEARNING', 'TOOLS / EXPERIMENTS'],
  // 12. Smart Waste Classifier
  'proj-smart-waste': ['AI / MACHINE LEARNING', 'RESEARCH / INNOVATION PROJECTS'],
  // 13. Student Dropout Prediction System Using Machine Learning
  'proj-dropout-predict': ['AI / MACHINE LEARNING', 'EDUCATION / LEARNING PLATFORMS'],
  // 14. Spam Detection System
  'proj-spam-detection': ['AI / MACHINE LEARNING', 'CYBERSECURITY'],
  // 15. Blood Donation System
  'proj-blood-donation': ['FULL-STACK / WEB DEVELOPMENT'],
  // 16. Cogniva
  'proj-cogniva': ['AI / MACHINE LEARNING', 'TOOLS / EXPERIMENTS'],
  // 17. Maison Market
  'proj-maison-market': ['FULL-STACK / WEB DEVELOPMENT'],
  // 18. Still House Website
  'proj-still-house': ['FULL-STACK / WEB DEVELOPMENT'],
  // 19. Stillhouse Review System
  'proj-stillhouse-review': ['FULL-STACK / WEB DEVELOPMENT', 'TOOLS / EXPERIMENTS'],
  // 20. Photography Website
  'proj-photography-website': ['FULL-STACK / WEB DEVELOPMENT', 'PORTFOLIO / CREATIVE PROJECTS'],
  // 21. Singh Login Page
  'proj-singh-login': ['FULL-STACK / WEB DEVELOPMENT', 'TOOLS / EXPERIMENTS'],
  // 22. GTA Version Portfolio
  'proj-gta-portfolio': ['PORTFOLIO / CREATIVE PROJECTS', 'FULL-STACK / WEB DEVELOPMENT'],
  // 23. Cinematic Portfolio
  'proj-cinematic-portfolio': ['PORTFOLIO / CREATIVE PROJECTS', 'FULL-STACK / WEB DEVELOPMENT'],
  // 24. Manikant Portfolio
  'proj-manikant-portfolio': ['PORTFOLIO / CREATIVE PROJECTS', 'FULL-STACK / WEB DEVELOPMENT'],
  // 25. BolnidiManikanta Profile Repository
  'proj-profile-readme': ['TOOLS / EXPERIMENTS', 'PORTFOLIO / CREATIVE PROJECTS'],
};

export function getProjectCategories(project: { id: string; projectCategories?: string[] }): ProjectCategoryTab[] {
  if (project.projectCategories && project.projectCategories.length > 0) {
    return project.projectCategories as ProjectCategoryTab[];
  }
  return PROJECT_CATEGORIES_MAP[project.id] || [];
}
