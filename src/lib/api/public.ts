import { fetchApi } from './client';
import type { HomepageConfig, BrandAppearanceConfig } from '@/types/homepage';
import { DEFAULT_HOMEPAGE_CONFIG, DEFAULT_BRAND_APPEARANCE } from '@/types/homepage';
import type {
  BlogPost,
  CompanyProfile,
  FaqItem,
  NavigationMenu,
  PageMeta,
  ProductItem,
  ProjectItem,
  ServiceItem,
  TeamMember,
  TestimonialItem,
  BlogCategory,
  BlogTag,
} from './types';

// ==========================================
// AUTHENTIC SEEDED MRM INFOTECH FALLBACKS
// ==========================================

export const FALLBACK_COMPANY_PROFILE: CompanyProfile = {
  name: 'MRM InfoTech',
  legalName: 'MRM InfoTech Ltd.',
  tagline: 'IDEAS • PRODUCTS • IMPACT',
  email: 'contact@mrminfotech.com',
  phone: '+8801700000000',
  website: 'https://mrminfotech.com',
  description:
    'Leading software architecture and enterprise technology provider delivering scalable digital products and custom engineering solutions.',
  headquarters: 'Dhaka, Bangladesh',
  address: 'Dhaka, Bangladesh',
  supportEmail: 'support@mrminfotech.com',
  whatsapp: '+8801700000000',
  foundedYear: 2024,
  facebookUrl: 'https://facebook.com/mrminfotech',
  linkedinUrl: 'https://linkedin.com/company/mrminfotech',
  instagramUrl: 'https://instagram.com/mrminfotech',
  githubUrl: 'https://github.com/mrminfotech',
  twitterUrl: 'https://x.com/mrminfotech',
  youtubeUrl: 'https://youtube.com/@mrminfotech',
  copyrightText: 'MRM InfoTech Ltd. All rights reserved.',
};

export const FALLBACK_HEADER_NAV: NavigationMenu = {
  id: 'menu-header',
  key: 'header',
  items: [
    {
      id: 'nav-1',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Home', bn: 'হোম' },
      href: '/',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 0,
      children: [],
    },
    {
      id: 'nav-2',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
      href: '/about',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 1,
      children: [],
    },
    {
      id: 'nav-3',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Services', bn: 'সেবাসমূহ' },
      href: '/services',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 2,
      children: [],
    },
    {
      id: 'nav-4',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Products', bn: 'প্রোডাক্টসমূহ' },
      href: '/products',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 3,
      children: [],
    },
    {
      id: 'nav-5',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Projects', bn: 'প্রকল্পসমূহ' },
      href: '/projects',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 4,
      children: [],
    },
    {
      id: 'nav-6',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Case Studies', bn: 'কেস স্টাডি' },
      href: '/case-studies',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 5,
      children: [],
    },
    {
      id: 'nav-7',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Blog', bn: 'ব্লগ' },
      href: '/blog',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 6,
      children: [],
    },
    {
      id: 'nav-8',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Careers', bn: 'ক্যারিয়ার' },
      href: '/careers',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 7,
      children: [],
    },
    {
      id: 'nav-9',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Contact', bn: 'যোগাযোগ' },
      href: '/contact',
      newTab: false,
      isButton: true,
      isVisible: true,
      sortOrder: 8,
      children: [],
    },
  ],
};

export const FALLBACK_FOOTER_COMPANY: NavigationMenu = {
  id: 'menu-footer-company',
  key: 'footer-company',
  items: [
    {
      id: 'fc-1',
      menuId: 'menu-footer-company',
      parentId: null,
      label: { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
      href: '/about',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 0,
      children: [],
    },
    {
      id: 'fc-2',
      menuId: 'menu-footer-company',
      parentId: null,
      label: { en: 'Services', bn: 'সেবাসমূহ' },
      href: '/services',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 1,
      children: [],
    },
    {
      id: 'fc-3',
      menuId: 'menu-footer-company',
      parentId: null,
      label: { en: 'Products', bn: 'প্রোডাক্টসমূহ' },
      href: '/products',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 2,
      children: [],
    },
    {
      id: 'fc-4',
      menuId: 'menu-footer-company',
      parentId: null,
      label: { en: 'Careers', bn: 'ক্যারিয়ার' },
      href: '/careers',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 3,
      children: [],
    },
    {
      id: 'fc-5',
      menuId: 'menu-footer-company',
      parentId: null,
      label: { en: 'Contact Us', bn: 'যোগাযোগ' },
      href: '/contact',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 4,
      children: [],
    },
  ],
};

export const FALLBACK_FOOTER_LEGAL: NavigationMenu = {
  id: 'menu-footer-legal',
  key: 'footer-legal',
  items: [
    {
      id: 'fl-1',
      menuId: 'menu-footer-legal',
      parentId: null,
      label: { en: 'Privacy Policy', bn: 'গোপনীয়তা নীতি' },
      href: '/privacy-policy',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 0,
      children: [],
    },
    {
      id: 'fl-2',
      menuId: 'menu-footer-legal',
      parentId: null,
      label: { en: 'Terms of Service', bn: 'ব্যবহারের শর্তাবলী' },
      href: '/terms',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 1,
      children: [],
    },
    {
      id: 'fl-3',
      menuId: 'menu-footer-legal',
      parentId: null,
      label: { en: 'Cookie Policy', bn: 'কুকি নীতি' },
      href: '/cookie-policy',
      newTab: false,
      isButton: false,
      isVisible: true,
      sortOrder: 2,
      children: [],
    },
  ],
};

export const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'edumanage-bd',
    stage: 'LIVE',
    name: 'EduManage BD',
    tagline: 'Comprehensive School & University ERP',
    summary:
      'Cloud-native educational management ecosystem designed for Bangladeshi schools, colleges, and universities with integrated grading, attendance, and tuition automation.',
    isFeatured: true,
    sortOrder: 1,
    brandColor: '#0052CC',
    productSiteUrl: 'https://edumanage.mrminfotech.com',
    demoUrl: 'https://demo.edumanage.mrminfotech.com',
  },
  {
    id: 'prod-2',
    slug: 'medisheba-bd',
    stage: 'LIVE',
    name: 'MediSheba BD',
    tagline: 'Integrated Clinical & Diagnostic Management',
    summary:
      'Secure healthcare management system connecting clinics, diagnostic centers, doctors, and patients with digital prescriptions and real-time lab reporting.',
    isFeatured: true,
    sortOrder: 2,
    brandColor: '#00C2FF',
    productSiteUrl: 'https://medisheba.mrminfotech.com',
    demoUrl: 'https://demo.medisheba.mrminfotech.com',
  },
  {
    id: 'prod-3',
    slug: 'multi-institution-platform',
    stage: 'BETA',
    name: 'Multi-Institution Platform',
    tagline: 'Enterprise Multi-Tenant SaaS Engine',
    summary:
      'Scalable multi-tenant governance platform engineered for chain institutions, enterprises, and conglomerates with isolated schema security and unified analytics.',
    isFeatured: true,
    sortOrder: 3,
    brandColor: '#07162C',
    productSiteUrl: 'https://multi.mrminfotech.com',
    demoUrl: 'https://demo.multi.mrminfotech.com',
  },
];

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    summary: 'Tailor-made software solutions designed to solve complex business problems.',
    sortOrder: 1,
    icon: 'Code2',
  },
  {
    slug: 'web-application-development',
    name: 'Web Application Development',
    summary: 'High-performance, secure, and scalable web apps built with modern tech stacks.',
    sortOrder: 2,
    icon: 'Globe',
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    summary: 'Native and cross-platform mobile apps for iOS and Android devices.',
    sortOrder: 3,
    icon: 'Smartphone',
  },
  {
    slug: 'enterprise-erp-solutions',
    name: 'Enterprise ERP Solutions',
    summary: 'Modular, integrated ERP software streamlining organizational operations.',
    sortOrder: 4,
    icon: 'Layers',
  },
  {
    slug: 'cloud-devops-infrastructure',
    name: 'Cloud & DevOps Infrastructure',
    summary: 'Resilient cloud architecture, CI/CD automation, and Kubernetes orchestration.',
    sortOrder: 5,
    icon: 'Cloud',
  },
  {
    slug: 'ai-machine-learning-solutions',
    name: 'AI & Machine Learning Solutions',
    summary: 'Intelligent automation, predictive models, and LLM integrations.',
    sortOrder: 6,
    icon: 'Cpu',
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design & Prototyping',
    summary: 'User-centric product design, wireframing, and interactive digital interfaces.',
    sortOrder: 7,
    icon: 'Palette',
  },
  {
    slug: 'cybersecurity-compliance',
    name: 'Cybersecurity & Compliance',
    summary: 'Vulnerability assessment, penetration testing, and security auditing.',
    sortOrder: 8,
    icon: 'ShieldCheck',
  },
  {
    slug: 'database-architecture-migration',
    name: 'Database Architecture & Migration',
    summary: 'High-availability database design, optimization, and seamless cloud migration.',
    sortOrder: 9,
    icon: 'Database',
  },
  {
    slug: 'ecommerce-fintech-platforms',
    name: 'E-Commerce & FinTech Platforms',
    summary: 'Secure payment gateway integrations, checkout engines, and commerce portals.',
    sortOrder: 10,
    icon: 'CreditCard',
  },
  {
    slug: 'api-microservices-architecture',
    name: 'API & Microservices Architecture',
    summary: 'Decoupled, event-driven microservices with robust REST & GraphQL APIs.',
    sortOrder: 11,
    icon: 'Network',
  },
  {
    slug: 'edtech-academic-systems',
    name: 'EdTech & Academic Systems',
    summary: 'Specialized portals and learning management systems for academic bodies.',
    sortOrder: 12,
    icon: 'GraduationCap',
  },
  {
    slug: 'healthcare-telemedicine-systems',
    name: 'Healthcare & Telemedicine Systems',
    summary: 'EMR, EHR, and telemedicine platforms compliant with health data standards.',
    sortOrder: 13,
    icon: 'HeartPulse',
  },
  {
    slug: 'it-consulting-digital-transformation',
    name: 'IT Consulting & Digital Transformation',
    summary: 'Strategic technology advisory guiding modernization and tech adoption.',
    sortOrder: 14,
    icon: 'Briefcase',
  },
];

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    slug: 'enterprise-supply-chain-erp',
    title: 'Enterprise Supply Chain & Logistics Engine',
    summary:
      'High-throughput warehouse and dispatch management platform processing 40,000+ daily orders with real-time GPS telemetry and barcode reconciliation.',
    sortOrder: 1,
    projectWorkStatus: 'COMPLETED',
    isFeatured: true,
    publishedAt: '2026-01-15T00:00:00Z',
    clientName: 'Apex Logistics Ltd.',
    frontendTechSummary: { frameworks: ['Next.js 16', 'Tailwind CSS', 'TanStack Query'] },
    backendTechSummary: { frameworks: ['NestJS', 'PostgreSQL', 'Redis', 'Kafka'] },
    dbToolsSummary: { primary: 'PostgreSQL Neon', cache: 'Redis cluster' },
    metrics: [
      { label: 'Daily Throughput', value: '40,000+ Orders' },
      { label: 'Latency Reduction', value: '64%' },
      { label: 'Uptime', value: '99.98%' },
    ],
  },
  {
    slug: 'national-telemedicine-hub',
    title: 'National Telemedicine & Diagnostic Portal',
    summary:
      'HIPAA-aligned telehealth portal enabling audio/video doctor consultations, prescription delivery, and digital lab reports across 32 regional clinics.',
    sortOrder: 2,
    projectWorkStatus: 'COMPLETED',
    isFeatured: true,
    publishedAt: '2026-02-10T00:00:00Z',
    clientName: 'CarePlus Health Network',
    frontendTechSummary: { frameworks: ['React 19', 'WebRTC', 'Tailwind CSS'] },
    backendTechSummary: { frameworks: ['Node.js', 'NestJS', 'Socket.io', 'PostgreSQL'] },
    dbToolsSummary: { primary: 'PostgreSQL', storage: 'S3 Encrypted' },
    metrics: [
      { label: 'Active Patients', value: '180,000+' },
      { label: 'Consultations', value: '25,000/mo' },
      { label: 'Report Dispatch', value: '< 2 mins' },
    ],
  },
  {
    slug: 'fintech-micro-lending-platform',
    title: 'Automated Micro-Lending & Credit Scoring Engine',
    summary:
      'Microfinance scoring platform using algorithm-driven credit assessment, bKash/Nagad gateway settlement, and automated regulatory reporting.',
    sortOrder: 3,
    projectWorkStatus: 'COMPLETED',
    isFeatured: true,
    publishedAt: '2026-03-01T00:00:00Z',
    clientName: 'Shomiti Financial Services',
    frontendTechSummary: { frameworks: ['Next.js App Router', 'TypeScript', 'Radix UI'] },
    backendTechSummary: { frameworks: ['NestJS', 'Prisma ORM', 'BullMQ Queue'] },
    dbToolsSummary: { primary: 'PostgreSQL', queuing: 'Redis' },
    metrics: [
      { label: 'Loan Processing', value: '< 30 seconds' },
      { label: 'Disbursement Total', value: '৳450M+' },
      { label: 'Default Rate Drop', value: '38%' },
    ],
  },
];

export const FALLBACK_TEAM: TeamMember[] = [
  {
    slug: 'md-shohanur-rahman',
    name: 'Md. Shohanur Rahman',
    roleTitle: 'Founder & Chief Architect',
    department: 'Executive Leadership',
    sortOrder: 1,
    bio: 'Enterprise systems architect specializing in high-throughput cloud platforms, multi-tenant SaaS architecture, and resilient distributed applications.',
    email: 'shohan@mrminfotech.com',
  },
  {
    slug: 'eng-tariqul-islam',
    name: 'Tariqul Islam',
    roleTitle: 'Lead Software Engineer',
    department: 'Engineering',
    sortOrder: 2,
    bio: 'Full-stack engineering lead with deep expertise in NestJS, Next.js, and high-concurrency database optimization.',
    email: 'tariqul@mrminfotech.com',
  },
  {
    slug: 'nusrat-jahan',
    name: 'Nusrat Jahan',
    roleTitle: 'Principal Product Designer',
    department: 'Design & UX',
    sortOrder: 3,
    bio: 'Product strategist and UX architect creating intuitive, accessible enterprise interfaces and streamlined business workflows.',
    email: 'nusrat@mrminfotech.com',
  },
];

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    authorName: 'Kazi Mahbubul Alam',
    authorRole: 'Managing Director',
    companyName: 'Apex Logistics Ltd.',
    quote:
      'MRM InfoTech transformed our entire logistical backend. The architecture handles peak sales days with zero hiccups, saving us hundreds of operational hours every month.',
    rating: 5,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'test-2',
    authorName: 'Dr. Rezwana Chowdhury',
    authorRole: 'Chief Medical Officer',
    companyName: 'CarePlus Health Network',
    quote:
      'The telemedicine platform developed by MRM InfoTech is lightning fast, reliable, and patient-friendly. Their engineering precision is exceptional.',
    rating: 5,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'test-3',
    authorName: 'Anisur Rahman FCA',
    authorRole: 'Head of Operations',
    companyName: 'Shomiti Financial Services',
    quote:
      'Security and compliance were our highest priorities for fintech micro-lending. MRM InfoTech delivered a bank-grade system that automated our loan workflows flawlessly.',
    rating: 5,
    isFeatured: true,
    isVerified: true,
  },
];

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'building-resilient-multi-tenant-saas-with-nestjs-and-postgresql',
    title: 'Building Resilient Multi-Tenant SaaS with NestJS & PostgreSQL',
    summary:
      'Architectural principles for row-level vs schema-level isolation in high-throughput multi-tenant SaaS applications.',
    category: 'Software Engineering',
    readingTimeMinutes: 7,
    publishedAt: '2026-03-20T00:00:00Z',
    tags: ['NestJS', 'PostgreSQL', 'Multi-Tenancy'],
  },
  {
    slug: 'optimizing-nextjs-16-turbopack-for-enterprise-dashboards',
    title: 'Optimizing Next.js 16 with Turbopack for Enterprise Dashboards',
    summary:
      'How server components, streaming SSR, and edge caching deliver sub-second response times for complex enterprise dashboards.',
    category: 'SaaS & Cloud',
    readingTimeMinutes: 5,
    publishedAt: '2026-03-12T00:00:00Z',
    tags: ['Next.js', 'Performance', 'React 19'],
  },
  {
    slug: 'modern-fintech-integrations-in-bangladesh-bkash-nagad-api',
    title: 'Modern FinTech Integrations in Bangladesh: bKash & Nagad API Architecture',
    summary:
      'A practical guide to idempotency, webhook security, and transaction reconciliation for Bangladeshi payment gateways.',
    category: 'Digital Transformation',
    readingTimeMinutes: 8,
    publishedAt: '2026-02-28T00:00:00Z',
    tags: ['FinTech', 'APIs', 'Bangladesh'],
  },
];

export const FALLBACK_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is MRM InfoTech’s core focus?',
    answer:
      'MRM InfoTech operates on a dual-engine model: we develop proprietary cloud SaaS products (such as EduManage BD and MediSheba BD) while engineering custom, mission-critical software solutions for enterprises.',
    category: 'General',
    sortOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'How do you ensure enterprise code security and data privacy?',
    answer:
      'We follow secure software development lifecycles (SSDLC) featuring role-based access control, cryptographic password hashing, automated audit logging, OWASP Top 10 mitigation, and database constraint enforcement.',
    category: 'Security',
    sortOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'Can MRM InfoTech customize products like EduManage BD or MediSheba BD for our organization?',
    answer:
      'Yes. Our SaaS platforms are modular and support specialized white-labeling, custom module engineering, local gateway integrations, and dedicated hosting for qualifying institutions.',
    category: 'Products',
    sortOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'What is your typical project engagement lifecycle?',
    answer:
      'Our 6-step lifecycle encompasses: 1) Requirements Discovery, 2) System Architecture & Tech Selection, 3) Agile Sprint Engineering, 4) QA & Penetration Testing, 5) Production Deployment, and 6) SLA Support & Continuous Evolution.',
    category: 'Process',
    sortOrder: 4,
  },
  {
    id: 'faq-5',
    question: 'How do we get started on a project with MRM InfoTech?',
    answer:
      'You can click "Start a Project" anywhere on our site or email contact@mrminfotech.com. Our solutions team conducts an initial architectural review and provides an actionable technical proposal within 48 hours.',
    category: 'Contact',
    sortOrder: 5,
  },
];

// ==========================================
// PUBLIC API CALLS WITH ROBUST FALLBACKS
// ==========================================

export async function getCompanyProfile(): Promise<CompanyProfile> {
  try {
    const data = await fetchApi<CompanyProfile>('/company');
    return data && data.name ? data : FALLBACK_COMPANY_PROFILE;
  } catch {
    return FALLBACK_COMPANY_PROFILE;
  }
}

export async function getNavigation(key: string): Promise<NavigationMenu> {
  try {
    const data = await fetchApi<NavigationMenu>(`/navigation/${key}`);
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      return data;
    }
  } catch {
    // backend offline or menu not found, return safe fallback
  }

  if (key === 'header') return FALLBACK_HEADER_NAV;
  if (key === 'footer-company') return FALLBACK_FOOTER_COMPANY;
  if (key === 'footer-legal') return FALLBACK_FOOTER_LEGAL;
  return { id: `menu-${key}`, key, items: [] };
}

export async function getProducts(locale = 'en'): Promise<ProductItem[]> {
  try {
    const res = await fetchApi<{ data: ProductItem[]; meta: PageMeta }>(
      `/products?locale=${locale}`
    );
    if (res && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductBySlug(
  slug: string,
  locale = 'en'
): Promise<ProductItem | null> {
  try {
    const data = await fetchApi<ProductItem>(`/products/${slug}?locale=${locale}`);
    return data || FALLBACK_PRODUCTS.find((p) => p.slug === slug) || null;
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function getServices(locale = 'en'): Promise<ServiceItem[]> {
  try {
    const res = await fetchApi<{ data: ServiceItem[]; meta: PageMeta }>(
      `/services?locale=${locale}`
    );
    if (res && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(
  slug: string,
  locale = 'en'
): Promise<ServiceItem | null> {
  try {
    const data = await fetchApi<ServiceItem>(`/services/${slug}?locale=${locale}`);
    return data || FALLBACK_SERVICES.find((s) => s.slug === slug) || null;
  } catch {
    return FALLBACK_SERVICES.find((s) => s.slug === slug) || null;
  }
}

export async function getProjects(locale = 'en'): Promise<ProjectItem[]> {
  try {
    const res = await fetchApi<{ data: ProjectItem[]; meta: PageMeta }>(
      `/projects?locale=${locale}`
    );
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getCaseStudies(locale = 'en'): Promise<ProjectItem[]> {
  try {
    const res = await fetchApi<{ data: ProjectItem[]; meta: PageMeta }>(
      `/case-studies?locale=${locale}`
    );
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
  locale = 'en'
): Promise<ProjectItem | null> {
  try {
    const data = await fetchApi<ProjectItem>(`/projects/${slug}?locale=${locale}`);
    return data || null;
  } catch {
    return null;
  }
}

export async function getTeam(locale = 'en'): Promise<TeamMember[]> {
  try {
    const res = await fetchApi<{ data: TeamMember[]; meta: PageMeta }>(
      `/team?locale=${locale}`
    );
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getTestimonials(locale = 'en'): Promise<TestimonialItem[]> {
  try {
    const res = await fetchApi<{ data: TestimonialItem[]; meta: PageMeta }>(
      `/testimonials?locale=${locale}`
    );
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getBlogPosts(locale = 'en'): Promise<BlogPost[]> {
  try {
    const res = await fetchApi<{ data: BlogPost[]; meta: PageMeta }>(
      `/blog?locale=${locale}`
    );
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const res = await fetchApi<{ data: BlogCategory[] }>('/blog/categories');
    return res && Array.isArray(res.data) ? res.data : [];
  } catch {
    return [
      { id: '1', slug: 'software-engineering', i18n: { en: { name: 'Software Engineering' } } },
      { id: '2', slug: 'saas-cloud', i18n: { en: { name: 'SaaS & Cloud' } } },
      { id: '3', slug: 'digital-transformation', i18n: { en: { name: 'Digital Transformation' } } },
      { id: '4', slug: 'company-news', i18n: { en: { name: 'Company News' } } },
    ];
  }
}

export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const res = await fetchApi<{ data: BlogTag[] }>('/blog/tags');
    return res && Array.isArray(res.data) ? res.data : [];
  } catch {
    return [
      { id: '1', slug: 'next-js', i18n: { en: { name: 'Next.js' } } },
      { id: '2', slug: 'nestjs', i18n: { en: { name: 'NestJS' } } },
      { id: '3', slug: 'saas', i18n: { en: { name: 'SaaS' } } },
      { id: '4', slug: 'bangladesh', i18n: { en: { name: 'Bangladesh' } } },
      { id: '5', slug: 'enterprise', i18n: { en: { name: 'Enterprise' } } },
    ];
  }
}

export async function getFaqs(locale = 'en'): Promise<FaqItem[]> {
  try {
    const res = await fetchApi<{ data: FaqItem[]; meta: PageMeta }>(
      `/faqs?locale=${locale}`
    );
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getHomepageConfig(): Promise<HomepageConfig> {
  try {
    const res = await fetchApi<{ data: Array<{ key: string; value: unknown }> }>('/site-settings');
    if (res && Array.isArray(res.data)) {
      const match = res.data.find((item) => item.key === 'homepage.sections');
      if (match && match.value && typeof match.value === 'object') {
        const val = match.value as Partial<HomepageConfig>;
        return {
          hero: { ...DEFAULT_HOMEPAGE_CONFIG.hero, ...(val.hero || {}) },
          companyIntro: { ...DEFAULT_HOMEPAGE_CONFIG.companyIntro, ...(val.companyIntro || {}) },
          services: { ...DEFAULT_HOMEPAGE_CONFIG.services, ...(val.services || {}) },
          products: { ...DEFAULT_HOMEPAGE_CONFIG.products, ...(val.products || {}) },
          whyChooseUs: {
            ...DEFAULT_HOMEPAGE_CONFIG.whyChooseUs,
            ...(val.whyChooseUs || {}),
            points: val.whyChooseUs?.points || DEFAULT_HOMEPAGE_CONFIG.whyChooseUs.points,
          },
          featuredProjects: {
            ...DEFAULT_HOMEPAGE_CONFIG.featuredProjects,
            ...(val.featuredProjects || {}),
          },
          workProcess: {
            ...DEFAULT_HOMEPAGE_CONFIG.workProcess,
            ...(val.workProcess || {}),
            steps: val.workProcess?.steps || DEFAULT_HOMEPAGE_CONFIG.workProcess.steps,
          },
          techExpertise: {
            ...DEFAULT_HOMEPAGE_CONFIG.techExpertise,
            ...(val.techExpertise || {}),
            technologies: val.techExpertise?.technologies || DEFAULT_HOMEPAGE_CONFIG.techExpertise.technologies,
          },
          caseStudies: { ...DEFAULT_HOMEPAGE_CONFIG.caseStudies, ...(val.caseStudies || {}) },
          team: { ...DEFAULT_HOMEPAGE_CONFIG.team, ...(val.team || {}) },
          blog: { ...DEFAULT_HOMEPAGE_CONFIG.blog, ...(val.blog || {}) },
          finalCta: { ...DEFAULT_HOMEPAGE_CONFIG.finalCta, ...(val.finalCta || {}) },
        };
      }
    }
    return DEFAULT_HOMEPAGE_CONFIG;
  } catch {
    return DEFAULT_HOMEPAGE_CONFIG;
  }
}

export async function getBrandAppearance(): Promise<BrandAppearanceConfig> {
  try {
    const res = await fetchApi<{ data: Array<{ key: string; value: unknown }> }>('/site-settings');
    if (res && Array.isArray(res.data)) {
      const match = res.data.find((item) => item.key === 'branding.appearance');
      if (match && match.value && typeof match.value === 'object') {
        return {
          ...DEFAULT_BRAND_APPEARANCE,
          ...(match.value as Partial<BrandAppearanceConfig>),
        };
      }
    }
    return DEFAULT_BRAND_APPEARANCE;
  } catch {
    return DEFAULT_BRAND_APPEARANCE;
  }
}
