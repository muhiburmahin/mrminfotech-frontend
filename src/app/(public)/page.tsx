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
} from 'lucide-react';
import HomeFaqAccordion from '@/components/public/home/HomeFaqAccordion';
import ProblemsWeSolveSection from '@/components/public/home/ProblemsWeSolveSection';
import { MrmHeroShowcaseTriad } from '@/components/public/home/MrmHeroShowcaseTriad';
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
  title: 'MRM InfoTech | Software Products & Enterprise Digital Solutions',
  description:
    'We Turn Ideas Into Technology That Moves Businesses Forward. Explore EduManage BD, MediSheba BD, Multi-Institution Website Platform, and enterprise software engineering.',
};

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
  images?: string[];
  liveUrl?: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  stage?: string;
  sortOrder?: number;
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
  liveUrl: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  stage?: string;
  ctaLabel: string;
  sortOrder?: number;
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
      cache: 'no-store',
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
  { name: 'TypeScript', role: 'Type Safety' },
  { name: 'Node.js', role: 'Server Runtime' },
  { name: 'NestJS', role: 'Modular Backend' },
  { name: 'PostgreSQL', role: 'ACID Database' },
  { name: 'Prisma & Redis', role: 'High-Speed Cache' },
  { name: 'Tailwind CSS', role: 'Design System' },
];

const ENTERPRISE_STACKS = [
  'Next.js 16 Enterprise',
  'NestJS Modular Architecture',
  'PostgreSQL ACID Compliant',
  'Cloudflare Edge Acceleration',
  'Docker & Containerized Pods',
  'TypeScript Strict Protocol',
  'Redis Ultra-Fast Cache',
  'Tailwind CSS 4 Design Tokens',
  'GraphQL & RESTful Webhooks',
  'OWASP Top 10 Hardened Security',
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
    fetchBackendList<PublishedProductRaw>('/products?locale=en&sortBy=sortOrder&order=asc'),
    fetchBackendList<PublishedServiceRaw>('/services?locale=en&limit=50&sort=sortOrder&order=asc'),
    fetchBackendList<PublishedProject>('/projects?locale=en'),
    fetchBackendList<PublishedCaseStudy>('/case-studies?locale=en'),
    fetchBackendList<PublishedTeamMember>('/team?locale=en'),
    fetchBackendList<PublishedBlogPost>('/blog?locale=en'),
    fetchBackendList<PublishedFaq>('/faqs'),
  ]);

  const sortedApiProducts = [...apiProducts].sort(
    (a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999)
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
            p.tagline || p.translations?.[0]?.tagline || 'Software Product',
          description:
            p.description ||
            p.summary ||
            p.translations?.[0]?.description ||
            p.translations?.[0]?.summary ||
            '',
          images: Array.isArray(p.images) ? p.images : [],
          liveUrl: p.liveUrl || null,
          caseStudy: p.caseStudy || null,
          sourceCodeUrl: p.sourceCodeUrl || null,
          isSourcePrivate: Boolean(p.isSourcePrivate),
          stage: p.stage || 'LIVE',
          ctaLabel:
            p.slug === 'multi-institution-platform'
              ? 'Explore Platform'
              : 'Explore Product',
          sortOrder: p.sortOrder,
        }))
      : FALLBACK_PRODUCTS;

  const sortedApiServices = [...apiServices].sort((a, b) => {
    const orderA =
      typeof a.sortOrder === 'number'
        ? a.sortOrder
        : typeof a.order === 'number'
        ? a.order
        : 999;
    const orderB =
      typeof b.sortOrder === 'number'
        ? b.sortOrder
        : typeof b.order === 'number'
        ? b.order
        : 999;
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
    .slice(0, 8);
  const latestPosts: PublishedBlogPost[] = apiBlogPosts.slice(0, 3);

  const getProductIcon = (slug: string) => {
    if (slug.includes('edumanage') || slug.includes('school')) return <GraduationCap className="w-5 h-5 text-[#C6F432]" />;
    if (slug.includes('medisheba') || slug.includes('health')) return <HeartPulse className="w-5 h-5 text-[#C6F432]" />;
    return <Building2 className="w-5 h-5 text-[#C6F432]" />;
  };

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'custom-software-development':
        return <Code2 className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'web-application-development':
        return <Globe className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'mobile-app-development':
        return <Smartphone className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'enterprise-erp-solutions':
        return <Layers className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'cloud-devops-infrastructure':
        return <Cloud className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'ai-machine-learning-solutions':
        return <Cpu className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'ui-ux-design':
        return <Palette className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'cybersecurity-compliance':
        return <ShieldCheck className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'database-architecture-migration':
        return <Database className="w-5 h-5 text-[var(--theme-accent)]" />;
      default:
        return <Zap className="w-5 h-5 text-[var(--theme-accent)]" />;
    }
  };

  const formatServiceTitle = (title: string, slug?: string): string => {
    if (title && !title.includes('-')) return title;
    const raw = title || slug || '';
    return raw
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] overflow-x-hidden selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* =====================================================================
          SECTION 01 — HERO (ORIGINAL MRM CONTENT WITH LUMINOUS AURORA BEAM & TRIAD)
          - Original 2-column structure & data preserved with 100% precision
          - Radiant volumetric light beam (.hero-aurora-beam) & cyber rays (.hero-light-rays)
          - Clear frosted glassmorphic cards (clear-glass & clear-glass-card)
          - 3 Luminous interactive showcase cards (MrmHeroShowcaseTriad)
          - Fully dynamic theme tokens: --theme-bg-canvas, --theme-accent, etc.
          ===================================================================== */}
      <AmbientSection variant="hero-rays" className="pt-12 pb-20 lg:pt-16 lg:pb-28">
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
                  href="/services"
                  className="shadow-[0_0_24px_var(--theme-accent-glow)]"
                >
                  Explore Our Services <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                </CTAButton>

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm sm:text-base font-bold text-[var(--theme-text-primary)] border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  Discover Our Products
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
              {ENTERPRISE_STACKS.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text-primary)]/90 px-4 py-2 rounded-full clear-glass-pill shrink-0 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_14px_var(--theme-accent-subtle)] transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                  <span>{tech}</span>
                </div>
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 03 — WHO WE ARE & 3 CLEAR GLASS PILLARS
          ===================================================================== */}
      <AmbientSection variant="center-orb" className="py-20 lg:py-28">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              WHO WE ARE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--theme-text-primary)] leading-tight">
              Technology With Purpose. <br />
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Solutions With Impact.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              MRM InfoTech is a technology company focused on building software
              products and delivering digital solutions for modern businesses and
              organizations. From our own industry-focused platforms to custom
              digital experiences, we bring ideas to life through thoughtful
              design, practical technology, and a commitment to meaningful
              results.
            </p>
            <div className="pt-2">
              <Link
                className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-[var(--theme-accent)] hover:gap-3 transition-all"
                href="/about"
              >
                <span>Discover MRM InfoTech</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* 3 Clear Frosted Glass Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ScrollReveal direction="up" delay={0.15}>
              <div className="bg-[var(--theme-bg-surface)]/75 backdrop-blur-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] rounded-3xl p-6 space-y-3 h-full hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_30px_var(--theme-accent-glow)] transition-all relative overflow-hidden group">
                <span className="text-[52px] font-mono font-black text-[var(--theme-text-secondary)]/[0.07] absolute -bottom-2 -right-1 select-none pointer-events-none">
                  01
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] font-mono">
                  01 • IDEAS
                </span>
                <h3 className="font-black text-lg text-[var(--theme-text-primary)]">Problem-First Discovery</h3>
                <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Every product and client solution starts by understanding real operational needs.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="bg-[var(--theme-bg-surface)]/75 backdrop-blur-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] rounded-3xl p-6 space-y-3 h-full hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_30px_var(--theme-accent-glow)] transition-all relative overflow-hidden group">
                <span className="text-[52px] font-mono font-black text-[var(--theme-text-secondary)]/[0.07] absolute -bottom-2 -right-1 select-none pointer-events-none">
                  02
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] font-mono">
                  02 • PRODUCTS
                </span>
                <h3 className="font-black text-lg text-[var(--theme-text-primary)]">Thoughtful Engineering</h3>
                <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Clean architecture, scalable databases, and intuitive interfaces built to last.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <div className="bg-[var(--theme-bg-surface)]/75 backdrop-blur-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] rounded-3xl p-6 space-y-3 h-full hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_30px_var(--theme-accent-glow)] transition-all relative overflow-hidden group">
                <span className="text-[52px] font-mono font-black text-[var(--theme-text-secondary)]/[0.07] absolute -bottom-2 -right-1 select-none pointer-events-none">
                  03
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] font-mono">
                  03 • IMPACT
                </span>
                <h3 className="font-black text-lg text-[var(--theme-text-primary)]">Measurable Value</h3>
                <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                  Digital systems that simplify daily workflows and support long-term growth.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 04 — FLAGSHIP SOFTWARE PRODUCTS (#products)
          ===================================================================== */}
      <AmbientSection id="products" variant="dual-side" className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-text-primary)] tracking-widest uppercase border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/60">
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

          <MasonryGrid category="Products">
            {products.map((product) => {
              const icon = getProductIcon(product.slug);
              const previewImg = product.images?.[0] || null;

              return (
                <GlassCard
                  key={product.slug}
                  title={product.title}
                  subtitle={product.category}
                  description={product.description}
                  tag={product.stage || 'LIVE'}
                  icon={icon}
                  imageUrl={previewImg || undefined}
                  ctaText={product.ctaLabel || 'Explore Product'}
                  ctaHref={`/products/${product.slug}`}
                  metaInfo={
                    <div className="flex items-center gap-3">
                      {product.liveUrl && (
                        <a
                          href={product.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--theme-accent)] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> Live Demo
                        </a>
                      )}
                      {product.isSourcePrivate ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[var(--theme-text-secondary)]/50">
                          <Lock className="w-3 h-3" /> Private IP
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[var(--theme-text-secondary)]/50">
                          <Code2 className="w-3 h-3" /> Open Core
                        </span>
                      )}
                    </div>
                  }
                />
              );
            })}
          </MasonryGrid>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 05 — OUR SERVICES (#services)
          Honoring Admin Serial Number Priority (01, 02, 03...)
          Transformed into Northline-Grade Radiant Frosted Glass Cards
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
              className="shrink-0"
            >
              Explore All Services <ArrowRight className="w-4 h-4 ml-1 inline-block" />
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const displayOrder = typeof service.order === 'number'
                ? service.order
                : typeof service.sortOrder === 'number'
                ? service.sortOrder
                : index + 1;
              const formattedSerial = String(displayOrder).padStart(2, '0');

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="bg-[var(--theme-bg-surface)]/75 backdrop-blur-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] rounded-3xl p-7 flex flex-col justify-between group hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_35px_var(--theme-accent-glow)] transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-2xl font-black text-[var(--theme-text-secondary)]/30 group-hover:text-[var(--theme-accent)] transition-colors">
                        {formattedSerial}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shadow-sm group-hover:scale-110 transition-transform">
                        {getServiceIcon(service.slug)}
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[var(--theme-text-secondary)]/40 group-hover:text-[var(--theme-accent)] transition-colors" />
                    </div>

                    <h3 className="text-xl font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors">
                      {formatServiceTitle(service.title, service.slug)}
                    </h3>

                    <p className="mt-2.5 text-sm text-[var(--theme-text-secondary)] line-clamp-3 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[var(--theme-border)]/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--theme-accent)] tracking-wider uppercase inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[var(--theme-text-secondary)]/50 uppercase">
                      #{formattedSerial} PRIORITY
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 06 — PROBLEMS WE SOLVE
          ===================================================================== */}
      <ProblemsWeSolveSection />

      {/* =====================================================================
          SECTION 07 — CLIENT WORK / PROJECTS
          ===================================================================== */}
      {featuredProjects.length > 0 && (
        <AmbientSection id="projects" variant="horizon" className="py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-white tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                  CLIENT WORK
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Tailored Software for{' '}
                  <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                    Real Business Needs.
                  </span>
                </h2>
                <p className="text-base text-white/70">
                  A selection of custom systems, portals, and digital products engineered for our enterprise partners.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-[#C6F432] hover:gap-3 transition-all"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => {
                const title =
                  project.title || project.translations?.[0]?.title || project.slug;
                const summary =
                  project.summary || project.translations?.[0]?.summary || '';
                const frontendTech = project.frontendTechSummary || [];
                const backendTech = project.backendTechSummary || [];

                return (
                  <GlassCard
                    key={project.id || project.slug}
                    title={title}
                    tag={project.projectWorkStatus || 'COMPLETED'}
                    description={summary}
                    ctaText="Project Details"
                    ctaHref={`/projects/${project.slug}`}
                    metaInfo={
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-white/70 hover:text-[#C6F432] inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Live
                          </a>
                        )}
                        <span className="text-[11px] text-[#C6F432] font-mono">
                          {[...frontendTech, ...backendTech].slice(0, 2).join(' • ')}
                        </span>
                      </div>
                    }
                  />
                );
              })}
            </div>
          </div>
        </AmbientSection>
      )}

      {/* =====================================================================
          SECTION 08 — HOW WE WORK (5-Step Sequential Timeline)
          ===================================================================== */}
      <AmbientSection variant="bento-grid" className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-white tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
              OUR APPROACH
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              A Thoughtful Process.{' '}
              <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                From Conversation to Delivery.
              </span>
            </h2>
            <p className="text-base text-white/70">
              Every successful digital solution begins with a clear understanding of the goal. Our process turns requirements into carefully engineered, tested, and usable systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {WORK_PROCESS_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} direction="up" delay={index * 0.08} className="h-full">
                <TiltCard maxTilt={4} className="h-full">
                  <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.1] border-t-2 border-t-lime-400/40 rounded-3xl p-6 flex flex-col justify-between h-full group hover:border-lime-400/50 hover:shadow-[0_0_30px_rgba(198,244,50,0.15)] transition-all">
                    <div>
                      <span className="inline-block text-2xl font-black text-[#C6F432] font-mono mb-4">
                        {step.number}
                      </span>
                      <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="mt-6 h-1 w-10 rounded-full bg-[#C6F432] shadow-[0_0_10px_#C6F432]" />
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 09 — TECHNOLOGY EXPERTISE (Clear Glass Pills)
          ===================================================================== */}
      <AmbientSection variant="center-orb" className="py-24 text-center">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-white tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
              OUR TECHNOLOGY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Right Tools.{' '}
              <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                Thoughtfully Applied.
              </span>
            </h2>
            <p className="text-base text-white/70">
              We work with modern development technologies and tools, selecting the right combination for each project&apos;s performance, concurrency, and maintainability.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {APPROVED_TECHNOLOGIES.map((tech) => (
              <div
                key={tech.name}
                className="bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-lime-400/40 px-6 py-4 rounded-2xl flex items-center gap-3.5 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#C6F432] shadow-[0_0_8px_#C6F432]" />
                <div className="text-left">
                  <p className="font-black text-sm sm:text-base text-white leading-none">
                    {tech.name}
                  </p>
                  <p className="text-[11px] text-white/50 mt-1">
                    {tech.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 10 — CASE STUDIES & TEAM ROSTER
          ===================================================================== */}
      {featuredCaseStudies.length > 0 && (
        <AmbientSection variant="dual-side" className="py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-white tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                  BEHIND THE SOLUTIONS
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Understanding Challenges.{' '}
                  <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                    Creating Meaningful Solutions.
                  </span>
                </h2>
                <p className="text-base text-white/70">
                  Case studies showcasing deep technical problem-solving and architectural execution.
                </p>
              </div>

              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-[#C6F432] hover:gap-3 transition-all"
              >
                <span>All Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCaseStudies.map((study) => (
                <GlassCard
                  key={study.id || study.slug}
                  title={study.title || study.translations?.[0]?.title || study.slug}
                  tag="CASE STUDY"
                  description={study.summary || study.translations?.[0]?.summary || ''}
                  ctaText="Read Case Study"
                  ctaHref={`/case-studies/${study.slug}`}
                />
              ))}
            </div>
          </div>
        </AmbientSection>
      )}

      {/* Team Roster with Circular Photo Avatars */}
      {activeTeam.length > 0 && (
        <AmbientSection id="team" variant="dual-side" className="py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-white tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                  THE PEOPLE BEHIND THE WORK
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Driven by Ideas.{' '}
                  <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                    United by Vision.
                  </span>
                </h2>
                <p className="text-base text-white/70">
                  Meet the engineers, architects, and product builders driving MRM InfoTech.
                </p>
              </div>

              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-[#C6F432] hover:gap-3 transition-all"
              >
                <span>Full Team Roster</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeTeam.map((member) => {
                const name =
                  member.name || member.translations?.[0]?.name || member.slug || 'Team Member';
                const role =
                  member.role || member.translations?.[0]?.role || 'Specialist';
                const photo = member.photo || member.photoUrl || null;

                return (
                  <div
                    key={member.id || member.slug}
                    className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.1] border-t-2 border-t-lime-400/40 rounded-3xl p-7 text-center transition-all duration-300 hover:scale-[1.03] hover:border-lime-400/50 hover:shadow-[0_0_35px_rgba(198,244,50,0.18)] flex flex-col items-center justify-between group"
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Circular Photo Avatar with Glowing Halo Ring */}
                      <div className="relative w-24 h-24 rounded-full ring-2 ring-[#C6F432] shadow-[0_0_24px_rgba(198,244,50,0.35)] p-1 mb-4">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {photo ? (
                            <img
                              src={photo}
                              alt={name}
                              className="w-full h-full object-cover rounded-full"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-white/15 text-white font-black text-xl flex items-center justify-center">
                              {String(name).charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="font-black text-lg text-white tracking-tight group-hover:text-[#C6F432] transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs font-bold text-[#C6F432] mt-1 uppercase tracking-wider">
                        {role}
                      </p>

                      {member.bio && (
                        <p className="text-xs text-white/60 mt-3 line-clamp-2 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {/* Social Handles */}
                    <div className="mt-5 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-3">
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full text-white/60 hover:text-[#C6F432] hover:bg-white/10 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.githubUrl && (
                        <a
                          href={member.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full text-white/60 hover:text-[#C6F432] hover:bg-white/10 transition-colors"
                          aria-label="GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AmbientSection>
      )}

      {/* =====================================================================
          SECTION 11 — FAQ ACCORDION
          ===================================================================== */}
      <AmbientSection variant="center-orb" className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-white tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
              COMMON QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Questions Before We{' '}
              <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                Get Started?
              </span>
            </h2>
            <p className="text-base text-white/70">
              Find answers to common questions about our products, services, development approach, and working with MRM InfoTech.
            </p>
          </div>

          <HomeFaqAccordion items={apiFaqs} />
        </div>
      </AmbientSection>

      {/* =====================================================================
          SECTION 12 — FINAL HIGH-CONVERSION CTA BANNER
          Featuring the 10% Lime Green (#C6F432) Conversion Button
          ===================================================================== */}
      <AmbientSection variant="dual-side" className="py-24 sm:py-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl p-8 sm:p-16 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full clear-glass-pill text-[#C6F432] text-xs font-extrabold uppercase tracking-widest">
              LET&apos;S CREATE SOMETHING MEANINGFUL
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Have an Idea? Let&apos;s Turn It <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                Into Something Real.
              </span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re planning a new digital product, need a custom software solution, or want to strengthen your online presence, we&apos;d love to hear what you&apos;re working on.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <CTAButton
                size="lg"
                href="/start-project"
                className="shadow-[0_0_32px_rgba(198,244,50,0.45)]"
              >
                Start a Project <ArrowRight className="w-4 h-4 ml-1 inline-block" />
              </CTAButton>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-bold text-white border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </AmbientSection>
    </div>
  );
}
