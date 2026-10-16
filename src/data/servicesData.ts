export interface SimpleService {
  id: string;
  number: string;
  order: number;
  title: string;
  categoryGroup: 'WEB' | 'MOBILE' | 'AI_AUTOMATION' | 'BUSINESS' | 'STARTUP';
  description: string;
  whatYouGet: string[];
  ctaText?: string;
  isConfidential?: boolean;
  badge?: string;
}

export const servicesData: SimpleService[] = [
  {
    id: 'static-websites',
    number: '01',
    order: 1,
    title: 'STATIC WEBSITES',
    categoryGroup: 'WEB',
    description:
      'Clean, fast and responsive websites for individuals, brands and businesses that need a strong online presence.',
    whatYouGet: [
      'Landing pages',
      'Portfolio websites',
      'Personal websites',
      'Informational websites',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'dynamic-websites',
    number: '02',
    order: 2,
    title: 'DYNAMIC WEBSITES',
    categoryGroup: 'WEB',
    description:
      'Interactive websites that go beyond static pages and support real users, data and business workflows.',
    whatYouGet: [
      'User accounts',
      'Database-powered content',
      'Admin dashboards',
      'Interactive features',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'business-websites',
    number: '03',
    order: 3,
    title: 'PROFESSIONAL BUSINESS WEBSITES',
    categoryGroup: 'WEB',
    description:
      'Modern and professional websites designed to present your business clearly and build trust with your customers.',
    whatYouGet: [
      'Company websites',
      'Startup websites',
      'Agency websites',
      'Professional brand websites',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'web-applications',
    number: '04',
    order: 4,
    title: 'WEB APPLICATIONS',
    categoryGroup: 'WEB',
    description:
      'Custom web applications built around the way your users or business actually work.',
    whatYouGet: [
      'Custom dashboards',
      'Customer portals',
      'Management systems',
      'Business applications',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'mobile-applications',
    number: '05',
    order: 5,
    title: 'MOBILE APPLICATIONS',
    categoryGroup: 'MOBILE',
    description:
      'Custom mobile applications designed for services, businesses, education and other real-world use cases.',
    whatYouGet: [
      'Business applications',
      'Service applications',
      'Education applications',
      'Custom mobile solutions',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'whatsapp-automation',
    number: '06',
    order: 6,
    title: 'WHATSAPP AUTOMATION',
    categoryGroup: 'AI_AUTOMATION',
    description:
      'Automate repetitive customer communication and make your business easier to manage through WhatsApp.',
    whatYouGet: [
      'Automated replies',
      'Lead collection',
      'Booking notifications',
      'Customer follow-ups',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'ai-calling-agents',
    number: '07',
    order: 7,
    title: 'AI CALLING AGENTS',
    categoryGroup: 'AI_AUTOMATION',
    description:
      'AI-powered voice agents that can handle repetitive calling and customer communication workflows.',
    whatYouGet: [
      'Customer calls',
      'Appointment calls',
      'Lead qualification',
      'Follow-up calls',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'ai-chatbots-integration',
    number: '08',
    order: 8,
    title: 'AI CHATBOTS & AI INTEGRATION',
    categoryGroup: 'AI_AUTOMATION',
    description:
      'Add practical AI capabilities to websites and applications to make information and customer interactions more intelligent.',
    whatYouGet: [
      'Website AI assistants',
      'Customer-support chatbots',
      'AI-powered workflows',
      'AI API integrations',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'business-automation',
    number: '09',
    order: 9,
    title: 'BUSINESS AUTOMATION',
    categoryGroup: 'AI_AUTOMATION',
    description:
      'Connect repetitive business tasks into simple automated workflows that save time and reduce manual work.',
    whatYouGet: [
      'Lead automation',
      'Form automation',
      'Email workflows',
      'Business process automation',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'custom-software-solutions',
    number: '10',
    order: 10,
    title: 'CUSTOM SOFTWARE SOLUTIONS',
    categoryGroup: 'BUSINESS',
    description:
      'Purpose-built software for businesses and organizations with specific requirements that standard tools cannot easily solve.',
    whatYouGet: [
      'Management systems',
      'Booking systems',
      'Internal tools',
      'Custom business software',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'website-maintenance-optimization',
    number: '11',
    order: 11,
    title: 'WEBSITE MAINTENANCE & OPTIMIZATION',
    categoryGroup: 'BUSINESS',
    description:
      'Improve an existing website, fix problems and keep it reliable, responsive and up to date.',
    whatYouGet: [
      'Bug fixing',
      'Performance improvements',
      'Website updates',
      'Feature improvements',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'startup-mvp-development',
    number: '12',
    order: 12,
    title: 'STARTUP & MVP DEVELOPMENT',
    categoryGroup: 'STARTUP',
    description:
      'Turn an early-stage idea into a working prototype or MVP that can be tested, demonstrated and improved.',
    whatYouGet: [
      'MVP development',
      'Product prototypes',
      'Startup websites',
      'Early-stage applications',
    ],
    ctaText: 'INQUIRE ABOUT THIS SERVICE →',
  },
  {
    id: 'confidential-product-development',
    number: '13',
    order: 13,
    title: 'CONFIDENTIAL PRODUCT DEVELOPMENT',
    categoryGroup: 'STARTUP',
    description:
      'Have an unreleased application, startup idea or private product? Confidential discussions and NDA-based collaboration are available upon request.',
    whatYouGet: [
      'Confidential discussions',
      'NDA-based collaboration',
      'Private application previews',
      'Confidential prototype development',
    ],
    badge: 'NDA AVAILABLE',
    isConfidential: true,
    ctaText: 'DISCUSS CONFIDENTIAL PROJECT →',
  },
];

// Alias for compatibility if needed
export type ServiceOffering = SimpleService;
