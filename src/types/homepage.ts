export type HeroMediaType = 'none' | 'image' | 'video' | 'image_overlay' | 'video_overlay';
export type TextAlignment = 'left' | 'center' | 'right';

export interface HeroSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  mediaType: HeroMediaType;
  mediaUrl?: string;
  posterUrl?: string;
  overlayOpacity: number; // 0 to 100
  textAlignment: TextAlignment;
  enableAnimation: boolean;
  enabled: boolean;
}

export interface CompanyIntroConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface ServicesSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface ProductsSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface WhyChoosePoint {
  title: string;
  desc: string;
}

export interface WhyChooseUsConfig {
  eyebrow: string;
  heading: string;
  description: string;
  points: WhyChoosePoint[];
  enabled: boolean;
}

export interface FeaturedProjectsConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface WorkProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface WorkProcessConfig {
  eyebrow: string;
  heading: string;
  description: string;
  steps: WorkProcessStep[];
  enabled: boolean;
}

export interface TechExpertiseConfig {
  eyebrow: string;
  heading: string;
  description: string;
  technologies: string[];
  enabled: boolean;
}

export interface CaseStudiesSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface TeamSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface BlogSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
}

export interface TestimonialsSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
  /** Maximum number of testimonials shown on the homepage (1-12). */
  maxItems: number;
  enabled: boolean;
}

export interface FinalCtaConfig {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  enabled: boolean;
}

export interface HomepageConfig {
  hero: HeroSectionConfig;
  companyIntro: CompanyIntroConfig;
  services: ServicesSectionConfig;
  products: ProductsSectionConfig;
  whyChooseUs: WhyChooseUsConfig;
  featuredProjects: FeaturedProjectsConfig;
  workProcess: WorkProcessConfig;
  techExpertise: TechExpertiseConfig;
  caseStudies: CaseStudiesSectionConfig;
  team: TeamSectionConfig;
  blog: BlogSectionConfig;
  testimonials: TestimonialsSectionConfig;
  finalCta: FinalCtaConfig;
}

export interface BrandAppearanceConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkNavy: string;
  lightBackground: string;
  darkBackground: string;
  mainText: string;
  mutedText: string;
  borderColor: string;
  defaultTheme: 'light' | 'dark' | 'system';
  allowModeToggle: boolean;
}

// ==========================================
// OFFICIAL HOMEPAGE INITIAL CMS SEED DATA
// ==========================================

export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    eyebrow: 'SOFTWARE PRODUCTS & DIGITAL SOLUTIONS',
    heading: 'Building Digital Solutions That Move Businesses Forward.',
    description:
      'We build innovative software products and deliver digital solutions that help businesses and organizations solve real-world challenges and grow with technology.',
    primaryCtaText: 'Explore Our Services',
    primaryCtaUrl: '/services',
    secondaryCtaText: 'Discover Our Products',
    secondaryCtaUrl: '/products',
    mediaType: 'none',
    mediaUrl: '',
    posterUrl: '',
    overlayOpacity: 40,
    textAlignment: 'left',
    enableAnimation: true,
    enabled: true,
  },
  companyIntro: {
    eyebrow: 'WHO WE ARE',
    heading: 'Turning Ideas Into Meaningful Technology.',
    description:
      'We are MRM InfoTech, a technology company focused on building software products and delivering practical digital solutions. Our work brings together technology, creativity, and problem-solving to help businesses and organizations move forward.',
    ctaText: 'Learn More About Us',
    ctaUrl: '/about',
    enabled: true,
  },
  services: {
    eyebrow: 'OUR EXPERTISE',
    heading: 'Digital Solutions for Modern Business Needs.',
    description:
      'From developing websites and custom software to building SaaS platforms and supporting digital growth, we help turn business needs into practical technology solutions.',
    ctaText: 'Explore All Services',
    ctaUrl: '/services',
    enabled: true,
  },
  products: {
    eyebrow: 'OUR PRODUCTS',
    heading: 'Software Products Built to Make a Difference.',
    description:
      'We develop technology products that address practical needs across different industries, helping organizations manage their operations and deliver better experiences.',
    ctaText: 'Explore All Products',
    ctaUrl: '/products',
    enabled: true,
  },
  whyChooseUs: {
    eyebrow: 'WHY MRM INFOTECH',
    heading: 'A Practical Approach to Better Digital Solutions.',
    description:
      'We focus on understanding real requirements, choosing suitable technologies, and building solutions that deliver practical value.',
    points: [
      {
        title: 'Purpose-Driven Solutions',
        desc: 'Built specifically around your core operational challenges.',
      },
      {
        title: 'Quality-Focused Development',
        desc: 'Clean code architecture, automated testing, and long-term maintainability.',
      },
      {
        title: 'Modern Technology',
        desc: 'Battle-tested TypeScript, Next.js, NestJS, and PostgreSQL.',
      },
      {
        title: 'Client-Focused Approach',
        desc: 'Transparent milestones, regular updates, and direct technical communication.',
      },
      {
        title: 'Scalable Thinking',
        desc: 'Engineered to support organizational growth without brittle rewrites.',
      },
      {
        title: 'Continuous Improvement',
        desc: 'Proactive maintenance, SLA guarantees, and ongoing support.',
      },
    ],
    enabled: true,
  },
  featuredProjects: {
    eyebrow: 'OUR WORK',
    heading: 'Selected Projects. Practical Solutions.',
    description:
      'Explore some of the digital products and projects developed by MRM InfoTech.',
    ctaText: 'View All Projects',
    ctaUrl: '/projects',
    enabled: true,
  },
  workProcess: {
    eyebrow: 'HOW WE WORK',
    heading: 'A Clear Process From Idea to Delivery.',
    description:
      'We follow a structured approach to understand requirements, plan carefully, develop thoughtfully, and deliver reliable digital solutions.',
    steps: [
      {
        num: '01',
        title: 'Discover',
        desc: 'Understand the business requirements, user needs, and operational constraints.',
      },
      {
        num: '02',
        title: 'Plan',
        desc: 'Define the architectural scope, technical stack, and milestone roadmaps.',
      },
      {
        num: '03',
        title: 'Design & Build',
        desc: 'Craft intuitive interfaces and develop resilient, type-safe software.',
      },
      {
        num: '04',
        title: 'Test',
        desc: 'Review functionality, code quality, security protocols, and performance.',
      },
      {
        num: '05',
        title: 'Launch & Improve',
        desc: 'Deploy seamlessly to cloud environments and provide dedicated ongoing support.',
      },
    ],
    enabled: true,
  },
  techExpertise: {
    eyebrow: 'OUR TECHNOLOGY',
    heading: 'Choosing the Right Technology for Every Solution.',
    description:
      'We work with modern technologies and tools to build maintainable, efficient, and scalable digital solutions.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Tailwind CSS',
      'Docker',
    ],
    enabled: true,
  },
  caseStudies: {
    eyebrow: 'CASE STUDIES',
    heading: 'The Thinking Behind the Solutions.',
    description:
      'Discover how we approach challenges, develop solutions, and create meaningful digital experiences.',
    ctaText: 'Explore Case Studies',
    ctaUrl: '/case-studies',
    enabled: true,
  },
  team: {
    eyebrow: 'OUR PEOPLE',
    heading: 'The People Behind the Ideas.',
    description:
      'Meet the people contributing their skills, creativity, and dedication to building MRM InfoTech.',
    ctaText: 'Meet Our Team',
    ctaUrl: '/about#team',
    enabled: true,
  },
  blog: {
    eyebrow: 'LATEST INSIGHTS',
    heading: 'Ideas, Knowledge & Updates.',
    description:
      'Explore our latest articles, perspectives, and updates on technology, software, and digital innovation.',
    ctaText: 'Explore All Articles',
    ctaUrl: '/blog',
    enabled: true,
  },
  testimonials: {
    eyebrow: 'CLIENT FEEDBACK',
    heading: 'What Our Clients Say About Working With Us.',
    description:
      'Verified feedback from clients we have built software and digital solutions for.',
    maxItems: 6,
    enabled: true,
  },
  finalCta: {
    eyebrow: "LET'S WORK TOGETHER",
    heading: "Have an Idea? Let's Build It Together.",
    description:
      "Have a project in mind or looking for the right technology partner? Let's talk about how we can help.",
    primaryCtaText: 'Start a Project',
    primaryCtaUrl: '/start-project',
    secondaryCtaText: 'Contact Us',
    secondaryCtaUrl: '/contact',
    enabled: true,
  },
};

export const DEFAULT_BRAND_APPEARANCE: BrandAppearanceConfig = {
  primaryColor: '#087FC4',
  secondaryColor: '#103B68',
  accentColor: '#20B8D5',
  darkNavy: '#071A35',
  lightBackground: '#FFFFFF',
  darkBackground: '#071A35',
  mainText: '#15243A',
  mutedText: '#66758A',
  borderColor: '#E3EAF2',
  defaultTheme: 'light',
  allowModeToggle: true,
};
