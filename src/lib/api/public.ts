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
  legalName: 'MRM InfoTech',
  tagline: 'IDEAS • PRODUCTS • IMPACT',
  email: 'contact.mrminfotech@gmail.com',
  phone: '+8801700000000',
  website: 'https://mrminfotech.com',
  description:
    'Leading software architecture and enterprise technology provider delivering scalable digital products and custom engineering solutions.',
  headquarters: 'Dhaka, Bangladesh',
  address: 'Dhaka, Bangladesh',
  supportEmail: 'contact.mrminfotech@gmail.com',
  whatsapp: '+8801700000000',
  foundedYear: 2024,
  facebookUrl: 'https://facebook.com/mrminfotech',
  linkedinUrl: 'https://linkedin.com/company/mrminfotech',
  instagramUrl: 'https://instagram.com/mrminfotech',
  githubUrl: 'https://github.com/mrminfotech',
  twitterUrl: 'https://x.com/mrminfotech',
  youtubeUrl: 'https://youtube.com/@mrminfotech',
  copyrightText: 'MRM InfoTech. All rights reserved.',
};

export const FALLBACK_HEADER_NAV: NavigationMenu = {
  id: 'menu-header',
  key: 'header',
  items: [
    {
      id: 'nav-1',
      menuId: 'menu-header',
      parentId: null,
      label: { en: 'Home', bn: '' },
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
      label: { en: 'About Us', bn: '' },
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
      label: { en: 'Services', bn: '' },
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
      label: { en: 'Products', bn: '' },
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
      label: { en: 'Projects', bn: '' },
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
      label: { en: 'Case Studies', bn: '' },
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
      label: { en: 'Blog', bn: '' },
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
      label: { en: 'Careers', bn: '' },
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
      label: { en: 'Contact', bn: '' },
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
      label: { en: 'About Us', bn: '' },
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
      label: { en: 'Services', bn: '' },
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
      label: { en: 'Products', bn: '' },
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
      label: { en: 'Careers', bn: '' },
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
      label: { en: 'Contact Us', bn: '' },
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
      label: { en: 'Privacy Policy', bn: '' },
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
      label: { en: 'Terms of Service', bn: '' },
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
      label: { en: 'Cookie Policy', bn: '' },
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

export async function getTestimonials(
  locale = 'en',
  options?: { serviceSlug?: string; projectSlug?: string; isFeatured?: boolean }
): Promise<TestimonialItem[]> {
  try {
    const params = new URLSearchParams({ locale });
    if (options?.serviceSlug) params.set('serviceSlug', options.serviceSlug);
    if (options?.projectSlug) params.set('projectSlug', options.projectSlug);
    if (options?.isFeatured !== undefined) params.set('isFeatured', String(options.isFeatured));

    const res = await fetchApi<{ data: TestimonialItem[]; meta: PageMeta }>(
      `/testimonials?${params.toString()}`
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
          testimonials: { ...DEFAULT_HOMEPAGE_CONFIG.testimonials, ...(val.testimonials || {}) },
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
