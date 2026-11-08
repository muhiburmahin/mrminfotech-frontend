/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Cpu,
  Code2,
  Sparkles,
  ShieldCheck,
  Compass,
  Zap,
  Users,
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Building2,
  CheckCircle2,
  Lock,
  Globe,
  Terminal,
  Activity,
  Workflow,
  BookOpen,
  Cloud,
  Database,
  Smartphone,
  Palette,
  Briefcase,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import HomeFaqAccordion from '@/components/public/home/HomeFaqAccordion';
import StackedProductShowcase from '@/components/public/home/StackedProductShowcase';
import { ModernServicesSection } from '@/components/public/home/ModernServicesSection';
import { MrmHeroShowcaseTriad } from '@/components/public/home/MrmHeroShowcaseTriad';
import { CompanyIntroductionSection } from '@/components/public/home/CompanyIntroductionSection';
import { HorizontalWhatWeSolveSection } from '@/components/public/home/HorizontalWhatWeSolveSection';
import { WhyChooseMrmSection } from '@/components/public/home/WhyChooseMrmSection';
import { FeaturedProjectsPortfolioSection } from '@/components/public/home/FeaturedProjectsPortfolioSection';
import { HorizontalWorkflowSection } from '@/components/public/home/HorizontalWorkflowSection';
import { TechnologyLogoWallSection } from '@/components/public/home/TechnologyLogoWallSection';
import { InsightsEditorialSection } from '@/components/public/home/InsightsEditorialSection';
import { ExecutiveTeamShowcase } from '@/components/public/team/ExecutiveTeamShowcase';
import { AmbientSection } from '@/components/ui/AmbientSection';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { GlassCard } from '@/components/ui/design-system/GlassCard';
import { MasonryGrid } from '@/components/ui/design-system/MasonryGrid';
import { CTAButton } from '@/components/ui/design-system/CTAButton';
import {
  ScrollReveal,
  CountUp,
  TiltCard,
  MagneticButton,
  InfiniteMarquee,
  TextReveal,
  AnimatedBackground,
} from '@/components/ui/animations';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';

export const metadata: Metadata = {
  title: 'Custom Software & Web Development Company',
  description:
    'MRM InfoTech is a global custom software and web development company. We engineer high-performance cloud SaaS platforms, web applications, and enterprise digital solutions.',
  alternates: {
    canonical: 'https://mrminfotech.com',
  },
  openGraph: {
    title: 'MRM InfoTech | Custom Software & Web Development Company',
    description:
      'Global custom software and web development company engineering scalable SaaS products, web applications, and enterprise digital solutions.',
    url: 'https://mrminfotech.com',
    siteName: 'MRM InfoTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MRM InfoTech | Custom Software & Web Development Company',
    description:
      'Global custom software and web development company engineering scalable SaaS products and enterprise solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const revalidate = 60;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api/v1';

interface PublishedProductRaw {
  slug: string;
  title?: string;
  name?: string;
  tagline?: string;
  description?: string;
  summary?: string;
  shortDescription?: string;
  categoryName?: string;
  productType?: string;
  images?: string[];
  mediaItems?: Array<{ url: string; title?: string; isPrimary?: boolean }>;
  features?: Array<{ title: string; shortDescription?: string }>;
  integrations?: string[];
  liveUrl?: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  stage?: string;
  sortOrder?: number;
  homepageOrder?: number;
  displayOrder?: number;
  isFeatured?: boolean;
  translations?: Array<{
    title?: string;
    name?: string;
    tagline?: string;
    description?: string;
    summary?: string;
  }>;
}

interface ProductItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  images?: string[];
  features?: string[];
  integrations?: string[];
  liveUrl: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  stage?: string;
  ctaLabel: string;
  sortOrder?: number;
  isFeatured?: boolean;
}

interface PublishedServiceRaw {
  slug: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  icon?: string | null;
  sortOrder?: number;
  order?: number;
  homepageOrder?: number;
  displayOrder?: number;
  translations?: Array<{
    name?: string;
    title?: string;
    summary?: string;
    description?: string;
  }>;
}

interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  sortOrder?: number;
  order?: number;
  icon?: string | null;
}

interface PublishedProject {
  id?: string;
  slug: string;
  title?: string;
  summary?: string;
  projectWorkStatus?: string;
  frontendTechSummary?: string[];
  backendTechSummary?: string[];
  liveUrl?: string | null;
  translations?: Array<{
    title?: string;
    summary?: string;
  }>;
}

interface PublishedCaseStudy {
  id?: string;
  slug: string;
  title?: string;
  challenge?: string;
  summary?: string;
  translations?: Array<{
    title?: string;
    challenge?: string;
    summary?: string;
  }>;
}

interface PublishedTeamMember {
  id?: string;
  slug?: string;
  name?: string;
  role?: string;
  photo?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  order?: number;
  sortOrder?: number;
  department?: string;
  isActive?: boolean;
  translations?: Array<{
    name?: string;
    role?: string;
  }>;
}

interface PublishedBlogPost {
  id?: string;
  slug: string;
  title?: string;
  excerpt?: string;
  translations?: Array<{
    title?: string;
    excerpt?: string;
  }>;
}

interface PublishedFaq {
  id?: string;
  question: string;
  answer: string;
  category?: string | null;
}

async function fetchBackendList<T = unknown>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60, tags: ['homepage', endpoint.split('?')[0].replace('/', '')] },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const unwrapped =
      json && typeof json === 'object' && 'success' in json && 'data' in json
        ? json.data
        : json;
    if (Array.isArray(unwrapped)) return unwrapped as T[];
    if (unwrapped && typeof unwrapped === 'object') {
      const obj = unwrapped as Record<string, unknown>;
      if (Array.isArray(obj.items)) return obj.items as T[];
      if (Array.isArray(obj.data)) return obj.data as T[];
    }
    return [];
  } catch {
    return [];
  }
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    slug: 'edumanage-bd',
    title: 'EduManage BD',
    category: 'Education Management Software',
    description:
      'Cloud-native educational management ecosystem designed for Bangladeshi schools, colleges, and universities with grading, biometric attendance & fees.',
    ctaLabel: 'Explore Product',
    liveUrl: null,
    stage: 'LIVE',
  },
  {
    slug: 'medisheba-bd',
    title: 'MediSheba BD',
    category: 'Healthcare & Diagnostic Management',
    description:
      'Clinical, diagnostic, and pharmacy automation system with automated barcode report dispatching and secure patient records.',
    ctaLabel: 'Explore Product',
    liveUrl: null,
    stage: 'LIVE',
  },
  {
    slug: 'multi-institution-platform',
    title: 'Multi-Institution Website Platform',
    category: 'Institutional SaaS Infrastructure',
    description:
      'Centralized multi-tenant management portal allowing educational clusters and chain organizations to manage individual institutional websites.',
    ctaLabel: 'Explore Platform',
    liveUrl: null,
    stage: 'ENTERPRISE',
  },
];

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    summary: 'Tailor-made software solutions designed to solve complex business problems.',
    sortOrder: 1,
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    summary: 'High-performance, secure, and scalable web apps built with modern tech stacks.',
    sortOrder: 2,
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    summary: 'Native and cross-platform mobile apps for iOS and Android devices.',
    sortOrder: 3,
  },
  {
    slug: 'enterprise-erp-solutions',
    title: 'Enterprise ERP Solutions',
    summary: 'Modular, integrated ERP software streamlining organizational operations.',
    sortOrder: 4,
  },
  {
    slug: 'cloud-devops-infrastructure',
    title: 'Cloud & DevOps Infrastructure',
    summary: 'Resilient cloud architecture, CI/CD automation, and Kubernetes orchestration.',
    sortOrder: 5,
  },
  {
    slug: 'ai-machine-learning-solutions',
    title: 'AI & Machine Learning Solutions',
    summary: 'Intelligent automation, predictive models, and LLM integrations.',
    sortOrder: 6,
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    summary: 'User-centric product design, wireframing, and interactive digital interfaces.',
    sortOrder: 7,
  },
  {
    slug: 'cybersecurity-compliance',
    title: 'Cybersecurity & Compliance',
    summary: 'Vulnerability assessment, penetration testing, and security auditing.',
    sortOrder: 8,
  },
  {
    slug: 'database-architecture-migration',
    title: 'Database Architecture & Migration',
    summary: 'High-availability database design, optimization, and seamless cloud migration.',
    sortOrder: 9,
  },
];

const WORK_PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your goals, operational challenges, and system requirements.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We define the project scope, technical architecture, and implementation roadmap.',
  },
  {
    number: '03',
    title: 'Design & Build',
    description: 'We turn architectural designs into high-velocity, reliable software solutions.',
  },
  {
    number: '04',
    title: 'Test & Refine',
    description: 'We rigorously audit functionality, security, concurrency, and usability before delivery.',
  },
  {
    number: '05',
    title: 'Launch & Support',
    description: 'We deploy to resilient cloud infrastructure with active telemetry and ongoing SLA.',
  },
];

const APPROVED_TECHNOLOGIES = [
  { name: 'React', role: 'Frontend UI' },
  { name: 'Next.js 16', role: 'Full-Stack Framework' },
  { name: 'TypeScript', role: 'Strict Type Safety' },
  { name: 'Node.js', role: 'Server Runtime' },
  { name: 'NestJS', role: 'Modular Backend' },
  { name: 'PostgreSQL', role: 'ACID Relational DB' },
  { name: 'Prisma ORM', role: 'Type-Safe Data Layer' },
  { name: 'Redis Cache', role: 'In-Memory Caching' },
  { name: 'Tailwind CSS', role: 'Design Tokens' },
  { name: 'Docker Swarm', role: 'Container Orchestration' },
  { name: 'Cloudflare', role: 'Edge CDN & Security' },
];

interface EnterpriseMarqueeItem {
  label: string;
  isBrand?: boolean;
}

const ENTERPRISE_MARQUEE_ITEMS: EnterpriseMarqueeItem[] = [
  { label: '✦ MRM INFOTECH', isBrand: true },
  { label: 'Next.js 16 Enterprise', isBrand: false },
  { label: '✦ IDEAS • PRODUCTS • IMPACT', isBrand: true },
  { label: 'NestJS Modular Architecture', isBrand: false },
  { label: '✦ MRM INFOTECH CLOUD', isBrand: true },
  { label: 'PostgreSQL ACID Compliant', isBrand: false },
  { label: '✦ SOVEREIGN CLOUD & SAAS', isBrand: true },
  { label: 'Cloudflare Edge Acceleration', isBrand: false },
  { label: '✦ EDUMANAGE BD & MEDISHEBA BD', isBrand: true },
  { label: 'Docker & Containerized Pods', isBrand: false },
  { label: '✦ ENTERPRISE SYSTEMS', isBrand: true },
  { label: 'TypeScript Strict Protocol', isBrand: false },
  { label: 'Redis Ultra-Fast Cache', isBrand: false },
  { label: 'OWASP Top 10 Hardened Security', isBrand: false },
];

export default async function HomePage() {
  const [
    apiProducts,
    apiServices,
    apiProjects,
    apiCaseStudies,
    apiTeam,
    apiBlogPosts,
    apiFaqs,
  ] = await Promise.all([
    fetchBackendList<PublishedProductRaw>('/products?placement=homepage'),
    fetchBackendList<PublishedServiceRaw>('/services?placement=homepage'),
    fetchBackendList<PublishedProject>('/projects?locale=en'),
    fetchBackendList<PublishedCaseStudy>('/case-studies?locale=en'),
    fetchBackendList<PublishedTeamMember>('/team?locale=en'),
    fetchBackendList<PublishedBlogPost>('/blog?locale=en'),
    fetchBackendList<PublishedFaq>('/faqs'),
  ]);

  const sortedApiProducts = [...apiProducts].sort(
    (a, b) =>
      (a.homepageOrder ?? a.displayOrder ?? a.sortOrder ?? 999) -
      (b.homepageOrder ?? b.displayOrder ?? b.sortOrder ?? 999)
  );

  const products: ProductItem[] =
    sortedApiProducts.length > 0
      ? sortedApiProducts.map((p) => ({
          slug: p.slug,
          title:
            p.title ||
            p.name ||
            p.translations?.[0]?.name ||
            p.translations?.[0]?.title ||
            p.slug,
          category:
            p.categoryName ||
            p.productType ||
            p.tagline ||
            p.translations?.[0]?.tagline ||
            'Software Product',
          description:
            p.shortDescription ||
            p.description ||
            p.summary ||
            p.translations?.[0]?.description ||
            p.translations?.[0]?.summary ||
            '',
          images:
            Array.isArray(p.images) && p.images.length > 0
              ? p.images
              : Array.isArray(p.mediaItems)
              ? p.mediaItems.map((m) => m.url)
              : [],
          features: Array.isArray(p.features) ? p.features.map((f) => f.title) : [],
          integrations: Array.isArray(p.integrations) ? p.integrations : [],
          liveUrl: p.liveUrl || null,
          caseStudy: p.caseStudy || null,
          sourceCodeUrl: p.sourceCodeUrl || null,
          isSourcePrivate: Boolean(p.isSourcePrivate),
          stage: p.stage || 'LIVE',
          ctaLabel:
            p.slug === 'multi-institution-platform'
              ? 'Explore Platform'
              : 'Explore Product',
          sortOrder: p.homepageOrder ?? p.displayOrder ?? p.sortOrder,
          isFeatured: Boolean(p.isFeatured),
        }))
      : FALLBACK_PRODUCTS;

  const sortedApiServices = [...apiServices].sort((a, b) => {
    const orderA = a.homepageOrder ?? a.displayOrder ?? a.sortOrder ?? a.order ?? 999;
    const orderB = b.homepageOrder ?? b.displayOrder ?? b.sortOrder ?? b.order ?? 999;
    return orderA - orderB;
  });

  const services: ServiceItem[] =
    sortedApiServices.length > 0
      ? sortedApiServices.map((s, index) => {
          const rawTitle =
            s.title ||
            s.name ||
            s.translations?.[0]?.name ||
            s.translations?.[0]?.title ||
            s.slug
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          const rawSummary =
            s.summary ||
            s.translations?.[0]?.summary ||
            s.description ||
            '';
          const finalOrder =
            typeof s.sortOrder === 'number'
              ? s.sortOrder
              : typeof s.order === 'number'
              ? s.order
              : index + 1;
          return {
            slug: s.slug,
            title: rawTitle,
            summary: rawSummary,
            sortOrder: finalOrder,
            order: finalOrder,
            icon: s.icon,
          };
        })
      : FALLBACK_SERVICES;

  const featuredProjects: PublishedProject[] = apiProjects.slice(0, 6);
  const featuredCaseStudies: PublishedCaseStudy[] = apiCaseStudies.slice(0, 3);
  const activeTeam: PublishedTeamMember[] = [...apiTeam]
    .filter((m) => m.isActive !== false)
    .sort((a, b) => (a.order ?? a.sortOrder ?? 999) - (b.order ?? b.sortOrder ?? 999))
    .slice(0, 4);
  const latestPosts: PublishedBlogPost[] = apiBlogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] overflow-x-clip selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* Schema.org Organization, WebSite & ProfessionalService Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://mrminfotech.com/#organization',
                name: 'MRM InfoTech',
                url: 'https://mrminfotech.com',
                logo: 'https://mrminfotech.com/logo.png',
                description:
                  'Global custom software and web development company engineering scalable cloud SaaS platforms, web applications, and enterprise digital solutions.',
                email: 'contact.mrminfotech@gmail.com',
                sameAs: [
                  'https://linkedin.com/company/mrminfotech',
                  'https://github.com/mrminfotech',
                  'https://facebook.com/mrminfotech',
                ],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://mrminfotech.com/#website',
                url: 'https://mrminfotech.com',
                name: 'MRM InfoTech',
                publisher: { '@id': 'https://mrminfotech.com/#organization' },
                inLanguage: 'en-US',
              },
              {
                '@type': 'ProfessionalService',
                '@id': 'https://mrminfotech.com/#service',
                name: 'MRM InfoTech Software & Web Development',
                url: 'https://mrminfotech.com/services',
                parentOrganization: { '@id': 'https://mrminfotech.com/#organization' },
                serviceType: [
                  'Custom Software Development',
                  'Web Development',
                  'SaaS Development',
                  'Full Stack Engineering',
                ],
                areaServed: ['United States', 'United Kingdom', 'Australia', 'Bangladesh'],
              },
            ],
          }),
        }}
      />
      {/* =====================================================================
          SECTION 01 — HERO (ORIGINAL MRM CONTENT WITH LUMINOUS AURORA BEAM & TRIAD)
          - Original 2-column structure & data preserved with 100% precision
          - Radiant volumetric light beam (.hero-aurora-beam) & cyber rays (.hero-light-rays)
          - Clear frosted glassmorphic cards (clear-glass & clear-glass-card)
          - 3 Luminous interactive showcase cards (MrmHeroShowcaseTriad)
          - Fully dynamic theme tokens: --theme-bg-canvas, --theme-accent, etc.
          ===================================================================== */}
      <AmbientSection id="hero" variant="hero-rays" className="pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Volumetric Aurora Beam (Intense vertical glow from bottom up) */}
        <div
          aria-hidden="true"
          className="hero-aurora-beam pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] h-[580px] rounded-full z-0 opacity-95"
        />

        {/* Cyber Light Rays Texture (Vertical light rays shooting upward) */}
        <div
          aria-hidden="true"
          className="hero-light-rays pointer-events-none absolute inset-0 z-0 opacity-85"
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top 2-Column Hero: Left Editorial Copy & Right Ecosystem Glass Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Original Editorial Copy & Actions */}
            <ScrollReveal direction="up" delay={0.08} duration={0.65} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full clear-glass-pill text-xs font-extrabold tracking-widest uppercase text-[var(--theme-text-primary)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                <span>SOFTWARE PRODUCTS &amp; DIGITAL SOLUTIONS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[var(--theme-text-primary)]">
                We Turn Ideas Into <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                  Technology{' '}
                </span>
                That Moves Businesses Forward.
              </h1>

              <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] max-w-2xl leading-relaxed">
                We build innovative software products and deliver custom digital
                solutions that help businesses and organizations simplify
                operations, solve real-world challenges, and grow with technology.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <CTAButton
                  size="lg"
                  href="/start-project"
                  className="shadow-[0_0_24px_var(--theme-accent-glow)]"
                >
                  Start a Project <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                </CTAButton>

                <Link
                  href="#products"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm sm:text-base font-bold text-[var(--theme-text-primary)] border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  Explore Our Products
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.22em] uppercase text-[var(--theme-text-secondary)]/60">
                <span className="text-[var(--theme-text-primary)]">IDEAS</span>
                <span className="text-[var(--theme-accent)] font-black">•</span>
                <span className="text-[var(--theme-text-primary)]">PRODUCTS</span>
                <span className="text-[var(--theme-accent)] font-black">•</span>
                <span className="text-[var(--theme-text-primary)]">IMPACT</span>
              </div>
            </ScrollReveal>

            {/* Right Column: Original MRM Ecosystem Floating Card (Refined with Clear Frosted Glass) */}
            <div className="lg:col-span-5 relative">
              <TiltCard maxTilt={5} glareEffect={true}>
                <div className="clear-glass rounded-3xl p-6 sm:p-7 relative z-10 animate-mrm-float shadow-2xl">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
                        MRM InfoTech Ecosystem
                      </span>
                      <h2 className="text-lg font-extrabold text-[var(--theme-text-primary)] mt-0.5">
                        Products &amp; Custom Engineering
                      </h2>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] flex items-center justify-center font-black text-lg shadow-md shadow-[var(--theme-accent-glow)]">
                      M
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="clear-glass-card rounded-2xl p-4 flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-white/10 text-[var(--theme-text-primary)] shrink-0">
                        <Layers className="w-5 h-5 text-[var(--theme-accent)]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">Education Platforms</h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                            EduManage BD
                          </span>
                        </div>
                        <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                          Academic operations &amp; Multi-Institution Website Platform.
                        </p>
                      </div>
                    </div>

                    <div className="clear-glass-card rounded-2xl p-4 flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-white/10 text-[var(--theme-text-primary)] shrink-0">
                        <Cpu className="w-5 h-5 text-[var(--theme-accent)]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">Healthcare Systems</h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                            MediSheba BD
                          </span>
                        </div>
                        <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                          Diagnostic centre &amp; healthcare service management software.
                        </p>
                      </div>
                    </div>

                    <div className="clear-glass-card rounded-2xl p-4 flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-white/10 text-[var(--theme-text-primary)] shrink-0">
                        <Code2 className="w-5 h-5 text-[var(--theme-accent)]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">Client Digital Solutions</h3>
                        <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                          Custom software, web applications, SaaS &amp; digital marketing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[var(--theme-text-secondary)]">
                    <span>Architecture &amp; Security</span>
                    <span className="text-[var(--theme-accent)] font-bold font-mono">
                      PostgreSQL • NestJS • Next.js
                    </span>
                  </div>
                </div>
              </TiltCard>

              {/* Floating Secondary Clear Glass Badge */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 z-20 clear-glass-pill rounded-2xl px-4 py-3 flex items-center gap-3 animate-mrm-float-delayed shadow-xl">
                <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[var(--theme-text-primary)]">
                    SaaS Products + Client Solutions
                  </p>
                  <p className="text-[11px] text-[var(--theme-text-secondary)]">
                    Engineered for real-world business impact
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Hero: The 3 Radiant Showcase Glass Cards (Sitting inside the glowing light beam) */}
          <MrmHeroShowcaseTriad />
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 02 — ENTERPRISE TELEMETRY & TECH MARQUEE
          ===================================================================== */}
      <AmbientSection variant="horizon" className="py-14 z-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pb-10 border-b border-[var(--theme-border)]/50">
            <div className="p-6 rounded-3xl bg-[var(--theme-bg-surface)]/70 backdrop-blur-2xl border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all group">
              <div className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] font-mono">
                <CountUp end={99.9} decimals={1} suffix="%" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mt-2">
                Uptime SLA
              </p>
              <p className="text-[11px] text-[var(--theme-text-secondary)]/70 mt-0.5">Enterprise resilience guaranteed</p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--theme-bg-surface)]/70 backdrop-blur-2xl border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all group">
              <div className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] font-mono">
                <CountUp end={14} suffix="+" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mt-2">
                Disciplines
              </p>
              <p className="text-[11px] text-[var(--theme-text-secondary)]/70 mt-0.5">Full-stack software engineering</p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--theme-bg-surface)]/70 backdrop-blur-2xl border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all group">
              <div className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] font-mono">
                <CountUp end={100} suffix="%" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mt-2">
                Verified Code
              </p>
              <p className="text-[11px] text-[var(--theme-text-secondary)]/70 mt-0.5">Security &amp; audit compliant</p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--theme-bg-surface)]/70 backdrop-blur-2xl border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all group">
              <div className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] font-mono">
                24/7
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mt-2">
                System Telemetry
              </p>
              <p className="text-[11px] text-[var(--theme-text-secondary)]/70 mt-0.5">Active cloud observability</p>
            </div>
          </div>

          <div className="pt-8">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--theme-text-secondary)]/60 mb-5 text-center">
              ENGINEERED WITH MODERN ENTERPRISE TECH STACKS &amp; STANDARDS
            </div>
            <InfiniteMarquee speed={32}>
              {ENTERPRISE_MARQUEE_ITEMS.map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full shrink-0 transition-all ${
                    item.isBrand
                      ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] font-black shadow-[0_0_16px_var(--theme-accent-glow)] border border-[var(--theme-accent)]'
                      : 'clear-glass-pill text-[var(--theme-text-primary)]/90 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_14px_var(--theme-accent-subtle)]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.isBrand ? 'bg-white animate-pulse' : 'bg-[var(--theme-accent)]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 02 — COMPANY INTRODUCTION (EDITORIAL / ASYMMETRIC LAYOUT)
          ===================================================================== */}
      <CompanyIntroductionSection />

      {/* =====================================================================
          SECTION 03 — WHAT WE SOLVE (HORIZONTAL FEATURE BLOCKS)
          ===================================================================== */}
      <HorizontalWhatWeSolveSection />

      {/* =====================================================================
          SECTION 04 — OUR PRODUCTS (PRESERVED: STICKY STACKING PLATE CARDS)
          Sticky Overlapping / Stacking Plate Cards System
          ===================================================================== */}
      <AmbientSection id="products" variant="dual-side" overflow="visible" className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-text-primary)] tracking-widest uppercase border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                PROPRIETARY SAAS ECOSYSTEM
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Our Flagship{' '}
                <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                  Software Products
                </span>
              </h2>
              <p className="text-base text-[var(--theme-text-secondary)]">
                Purpose-built digital platforms solving real-world challenges in education, healthcare, and multi-institutional governance.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:gap-3 transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sticky Stacking Plate Cards Container with Live Screenshot Carousel */}
          <StackedProductShowcase products={products} />
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 05 — OUR SERVICES (#services)
          Strictly first 6 services as requested, followed by prominent CTA banner
          ===================================================================== */}
      <AmbientSection id="services" variant="top-spotlight" className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-text-primary)] tracking-widest uppercase border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                OUR SERVICES
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
                From Digital Ideas to{' '}
                <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                  Fully Built
                </span>{' '}
                Solutions.
              </h2>
              <p className="text-base text-[var(--theme-text-secondary)]">
                Whether you need a modern website, custom software, a scalable web application, or support for your digital growth, we turn your requirements into practical solutions.
              </p>
            </div>

            <CTAButton
              href="/services"
              className="shrink-0 shadow-[0_0_20px_var(--theme-accent-glow)]"
            >
              Explore All Services <ArrowRight className="w-4 h-4 ml-1 inline-block" />
            </CTAButton>
          </div>

          {/* Modern Interactive Services Bento Grid with Bespoke Micro-Graphics */}
          <ModernServicesSection services={services} />
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 06 — WHY CHOOSE MRM INFOTECH (SPLIT LAYOUT WITH FEATURE LIST)
          ===================================================================== */}
      <WhyChooseMrmSection />

      {/* =====================================================================
          SECTION 07 — FEATURED PROJECTS / EDITORIAL PORTFOLIO GRID
          ===================================================================== */}
      <FeaturedProjectsPortfolioSection projects={featuredProjects} />

      {/* =====================================================================
          SECTION 08 — HOW WE WORK (6-STEP SEQUENTIAL TIMELINE)
          ===================================================================== */}
      <HorizontalWorkflowSection />

      {/* =====================================================================
          SECTION 09 — TECHNOLOGY & EXPERTISE (MINIMAL TECHNOLOGY LOGO WALL)
          ===================================================================== */}
      <TechnologyLogoWallSection />

      {/* =====================================================================
          SECTION 10 — OUR TEAM & LEADERSHIP
          First 4 real team members, rank-ordered, with link to full roster
          ===================================================================== */}
      {activeTeam && activeTeam.length > 0 && (
        <AmbientSection id="team" variant="dual-side" className="py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-text-primary)] tracking-widest uppercase border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                  THE MINDS BEHIND THE CODE
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
                  Driven by Ideas.{' '}
                  <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                    United by Vision.
                  </span>
                </h2>
                <p className="text-base text-[var(--theme-text-secondary)]">
                  Meet the engineers, architects, and product builders driving MRM InfoTech.
                </p>
              </div>

              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-accent)] hover:underline shrink-0"
              >
                <span>View Full Team Roster</span>
                <ArrowRight className="w-4 h-4 ml-1 inline-block" />
              </Link>
            </div>

            <ExecutiveTeamShowcase members={activeTeam.slice(0, 4)} variant="home" />
          </div>
        </AmbientSection>
      )}

      {/* =====================================================================
          SECTION 11 — INSIGHTS & UPDATES (EDITORIAL BLOG LAYOUT)
          ===================================================================== */}
      <InsightsEditorialSection posts={latestPosts} />

      {/* =====================================================================
          COMMON QUESTIONS ACCORDION
          ===================================================================== */}
      {apiFaqs && apiFaqs.length > 0 && (
        <AmbientSection variant="center-orb" className="py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-text-primary)] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                COMMON QUESTIONS
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Questions Before We{' '}
                <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                  Get Started?
                </span>
              </h2>
              <p className="text-base text-[var(--theme-text-secondary)]">
                Find answers to common questions about our products, services, development approach, and working with MRM InfoTech.
              </p>
            </div>

            <HomeFaqAccordion items={apiFaqs} />
          </div>
        </AmbientSection>
      )}

      {/* =====================================================================
          SECTION 11 — FINAL CALL TO ACTION (FULL-WIDTH PREMIUM CTA)
          ===================================================================== */}
      <AmbientSection variant="dual-side" className="py-24 sm:py-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl p-8 sm:p-16 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full clear-glass-pill text-[var(--theme-accent)] text-xs font-extrabold uppercase tracking-widest">
              LET&apos;S CREATE SOMETHING MEANINGFUL
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
              Have a Project in Mind? <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Let&apos;s Build It Together.
              </span>
            </h2>

            <p className="text-[var(--theme-text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Let&apos;s build something meaningful together. Turn your ideas into powerful digital solutions with MRM InfoTech.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <CTAButton
                size="lg"
                href="/start-project"
                className="shadow-[0_0_32px_var(--theme-accent-glow)]"
              >
                Start a Project <ArrowRight className="w-4 h-4 ml-1 inline-block" />
              </CTAButton>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-bold text-[var(--theme-text-primary)] border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Enterprise Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[var(--theme-text-secondary)] border-t border-[var(--theme-border-glass)]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
                <Zap className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> 24hr Direct Architect Response
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Strict Enterprise NDA &amp; IP Protection
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Sovereign BD Infrastructure
              </span>
            </div>
          </div>
        </div>
      </AmbientSection>
    </div>
  );
}
