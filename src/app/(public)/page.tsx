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
  BookOpen,
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Building2,
  ShoppingCart,
  TrendingUp,
  Smartphone,
  Cloud,
} from 'lucide-react';
import HomeFaqAccordion from '@/components/public/home/HomeFaqAccordion';
import ProblemsWeSolveSection from '@/components/public/home/ProblemsWeSolveSection';
import AlternatingProductShowcase from '@/components/public/home/AlternatingProductShowcase';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export const metadata: Metadata = {
  title: 'MRM InfoTech | Software Products & Digital Solutions Company',
  description:
    'We Turn Ideas Into Technology That Moves Businesses Forward. Explore EduManage BD, MediSheba BD, Multi-Institution Website Platform, and custom software engineering.',
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
      'A digital platform designed to simplify educational institution management and support connected academic operations.',
    ctaLabel: 'Explore Product',
    liveUrl: null,
  },
  {
    slug: 'medisheba-bd',
    title: 'MediSheba BD',
    category: 'Healthcare & Diagnostic Management',
    description:
      'A healthcare technology platform designed to support diagnostic centres and healthcare service operations.',
    ctaLabel: 'Explore Product',
    liveUrl: null,
  },
  {
    slug: 'multi-institution-platform',
    title: 'Multi-Institution Website Platform',
    category: 'Institutional Website Management',
    description:
      'A platform designed to help educational institutions manage their own professional websites and digital presence.',
    ctaLabel: 'Explore Platform',
    liveUrl: null,
  },
];

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    summary:
      'Modern, responsive websites designed to communicate your brand and support your business goals.',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    summary:
      'Tailored software solutions built around your unique workflows and operational requirements.',
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    summary:
      'Interactive, reliable web applications designed for real-world business use.',
  },
  {
    slug: 'saas-development',
    title: 'SaaS Development',
    summary:
      'Scalable software platforms that turn ideas into usable digital products.',
  },
  {
    slug: 'ecommerce-development',
    title: 'E-commerce Development',
    summary:
      'Online shopping experiences designed to help businesses sell and manage products digitally.',
  },
  {
    slug: 'api-development-integration',
    title: 'API Development & Integration',
    summary:
      'Reliable APIs and integrations that help different systems work together.',
  },
  {
    slug: 'business-automation-solutions',
    title: 'Business Automation',
    summary:
      'Practical automation solutions that simplify repetitive work and improve efficiency.',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    summary:
      'User-centered interfaces designed for clarity, usability, and engaging experiences.',
  },
  {
    slug: 'seo-digital-marketing',
    title: 'SEO & Digital Marketing',
    summary:
      'Digital strategies that help businesses improve online visibility and reach relevant audiences.',
  },
  {
    slug: 'website-maintenance-support',
    title: 'Website Maintenance',
    summary:
      'Ongoing website support, updates, and improvements to keep digital experiences reliable.',
  },
];

const WHY_CHOOSE_VALUES = [
  {
    title: 'Purpose-Driven Thinking',
    description:
      'We start by understanding the real problem before choosing the technology.',
    icon: Compass,
  },
  {
    title: 'Quality-Focused Development',
    description:
      'We value clean implementation, usability, and dependable results.',
    icon: ShieldCheck,
  },
  {
    title: 'Modern Technology',
    description:
      'We use suitable modern tools and technologies to build maintainable solutions.',
    icon: Cpu,
  },
  {
    title: 'Client-Centered Approach',
    description:
      'We value clear communication and solutions shaped around actual requirements.',
    icon: Users,
  },
  {
    title: 'Long-Term Perspective',
    description:
      'We consider maintainability, adaptability, and future growth.',
    icon: Layers,
  },
  {
    title: 'Continuous Improvement',
    description:
      'We keep learning, refining, and improving the way we build.',
    icon: Zap,
  },
];

const WORK_PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your goals, challenges, and requirements.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We define the project scope, priorities, and suitable approach.',
  },
  {
    number: '03',
    title: 'Design & Build',
    description: 'We turn the plan into a functional and thoughtful digital solution.',
  },
  {
    number: '04',
    title: 'Test & Refine',
    description: 'We review functionality, usability, and quality before delivery.',
  },
  {
    number: '05',
    title: 'Launch & Support',
    description: 'We deliver the solution and provide agreed ongoing support.',
  },
];

const APPROVED_TECHNOLOGIES = [
  { name: 'React', role: 'Frontend UI' },
  { name: 'Next.js', role: 'Full-Stack Framework' },
  { name: 'TypeScript', role: 'Type Safety' },
  { name: 'Node.js', role: 'Server Runtime' },
  { name: 'NestJS', role: 'Modular Backend' },
  { name: 'PostgreSQL', role: 'Relational Database' },
  { name: 'Prisma', role: 'Database ORM' },
  { name: 'Tailwind CSS', role: 'Design System' },
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

  const sortedApiProducts = [...apiProducts].sort((a, b) => ((a.sortOrder ?? 999) - (b.sortOrder ?? 999)));
  const products: ProductItem[] =
    sortedApiProducts.length > 0
      ? sortedApiProducts.map((p) => ({
          slug: p.slug,
          title: p.title || p.name || p.translations?.[0]?.name || p.translations?.[0]?.title || p.slug,
          category:
            p.tagline || p.translations?.[0]?.tagline || 'Software Product',
          description:
            p.description || p.summary || p.translations?.[0]?.description || p.translations?.[0]?.summary || '',
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
        }))
      : FALLBACK_PRODUCTS;

  const sortedApiServices = [...apiServices].sort((a, b) => {
    const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : (typeof a.order === 'number' ? a.order : 999);
    const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : (typeof b.order === 'number' ? b.order : 999);
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
          const finalOrder = typeof s.sortOrder === 'number' ? s.sortOrder : (typeof s.order === 'number' ? s.order : index + 1);
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
  const activeTeam: PublishedTeamMember[] = apiTeam.filter((m) => m.isActive !== false).slice(0, 4);
  const latestPosts: PublishedBlogPost[] = apiBlogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* =====================================================================
          SECTION 01 — HERO (Strong Liquid Glass Floating Composition)
          ===================================================================== */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-[var(--border-subtle)] bg-gradient-to-b from-[#EFF5FB] via-[var(--bg-primary)] to-[var(--bg-primary)] dark:from-[#071A35] dark:via-[#071321] dark:to-[#071321]">
        {/* Ambient Cyan & Blue Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-1/4 w-[480px] h-[480px] rounded-full bg-[#20B8D5]/20 dark:bg-[#20B8D5]/15 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-8 w-[380px] h-[380px] rounded-full bg-[#087FC4]/15 dark:bg-[#087FC4]/20 blur-[110px]"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Main Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mrm-glass-pill text-xs font-extrabold tracking-widest uppercase text-[#087FC4] dark:text-[#20B8D5]">
              <span className="w-2 h-2 rounded-full bg-[#20B8D5]" />
              SOFTWARE PRODUCTS &amp; DIGITAL SOLUTIONS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12]">
              We Turn Ideas Into Technology That Moves Businesses Forward.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              We build innovative software products and deliver custom digital
              solutions that help businesses and organizations simplify
              operations, solve real-world challenges, and grow with technology.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                className="px-7 py-3.5 rounded-[10px] bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#087FC4]/30 hover:opacity-95 transition-all inline-flex items-center gap-2"
                href="/services"
              >
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                className="px-7 py-3.5 rounded-[10px] mrm-glass-strong text-[var(--text-primary)] font-bold text-sm sm:text-base hover:border-[#20B8D5] transition-all inline-flex items-center gap-2"
                href="/products"
              >
                Discover Our Products
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.22em] uppercase text-[var(--text-muted)]">
              <span>IDEAS</span>
              <span className="text-[#20B8D5]">•</span>
              <span>PRODUCTS</span>
              <span className="text-[#20B8D5]">•</span>
              <span>IMPACT</span>
            </div>
          </div>

          {/* Right: Strong Liquid Glass Floating Panels */}
          <div className="lg:col-span-5 relative">
            <div className="mrm-glass-strong rounded-3xl p-6 sm:p-7 relative z-10 animate-mrm-float">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                    MRM InfoTech Ecosystem
                  </span>
                  <h2 className="text-lg font-extrabold mt-0.5">
                    Products &amp; Custom Engineering
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center font-black text-base shadow-md">
                  M
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="mrm-glass-card rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#087FC4]/15 text-[#087FC4] dark:text-[#20B8D5] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold">Education Platforms</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#087FC4]/15 text-[#087FC4] dark:text-[#20B8D5]">
                        EduManage BD
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Academic operations &amp; Multi-Institution Website Platform.
                    </p>
                  </div>
                </div>

                <div className="mrm-glass-card rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold">Healthcare Systems</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                        MediSheba BD
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Diagnostic centre &amp; healthcare service management software.
                    </p>
                  </div>
                </div>

                <div className="mrm-glass-card rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#103B68]/15 dark:bg-white/10 text-[#087FC4] dark:text-[#20B8D5] shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Client Digital Solutions</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Custom software, web applications, SaaS &amp; digital marketing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Secondary Glass Badge */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 z-20 mrm-glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 animate-mrm-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-[#20B8D5]/20 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold">
                  SaaS Products + Client Solutions
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Engineered for real-world business impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 — COMPANY INTRODUCTION (Editorial Split Layout)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Technology With Purpose. Solutions With Impact.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              MRM InfoTech is a technology company focused on building software
              products and delivering digital solutions for modern businesses and
              organizations. From our own industry-focused platforms to custom
              digital experiences, we bring ideas to life through thoughtful
              design, practical technology, and a commitment to meaningful
              results.
            </p>
            <div className="pt-2">
              <Link
                className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                href="/about"
              >
                Discover MRM InfoTech <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3 Glass-Accented Pillar Boxes */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="mrm-glass-card rounded-2xl p-6 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                01 • IDEAS
              </span>
              <h3 className="font-bold text-base">Problem-First Discovery</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Every product and client solution starts by understanding real operational needs.
              </p>
            </div>
            <div className="mrm-glass-card rounded-2xl p-6 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                02 • PRODUCTS
              </span>
              <h3 className="font-bold text-base">Thoughtful Engineering</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Clean architecture, scalable databases, and intuitive interfaces built to last.
              </p>
            </div>
            <div className="mrm-glass-card rounded-2xl p-6 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                03 • IMPACT
              </span>
              <h3 className="font-bold text-base">Measurable Value</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Digital systems that simplify daily workflows and support long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProblemsWeSolveSection />

      {/* =====================================================================
          SECTION 03 — OUR BUSINESS AREAS (Two Contrasting Feature Panels)
          ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              Two Areas of Focus. One Vision for Better Technology.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              We create technology that serves real needs. Through our own
              software products and client-focused digital services, we help
              organizations embrace better ways of working and growing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Block 1: Software Products (Deep Navy Liquid Glass Executive Panel) */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#071A35] via-[#0B2548] to-[#103B68] text-white border border-[#20B8D5]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#20B8D5]/60 transition-all duration-300">
              {/* Subtle ambient cyan glow in background */}
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#20B8D5]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#20B8D5]/15 border border-[#20B8D5]/30 text-[#20B8D5] text-xs font-bold uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" /> Focus Area 01
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#20B8D5] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Proprietary SaaS
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Software Products
                  </h3>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed mt-2">
                    We develop industry-focused software platforms designed to
                    simplify operations and solve practical challenges.
                  </p>
                </div>

                {/* Rich interactive product cards */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/products/edumanage-bd"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-[#20B8D5]/50 transition-all group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#087FC4]/40 flex items-center justify-center text-[#20B8D5] shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover/item:text-[#20B8D5] transition-colors">
                          EduManage BD
                        </h4>
                        <p className="text-[11px] text-slate-300">
                          Education ERP &amp; Institutional Operations Platform
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/item:text-[#20B8D5] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
                  </Link>

                  <Link
                    href="/products/medisheba-bd"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-[#20B8D5]/50 transition-all group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#20B8D5]/30 flex items-center justify-center text-[#20B8D5] shrink-0">
                        <HeartPulse className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover/item:text-[#20B8D5] transition-colors">
                          MediSheba BD
                        </h4>
                        <p className="text-[11px] text-slate-300">
                          Diagnostic Centre &amp; Healthcare Management
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/item:text-[#20B8D5] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
                  </Link>

                  <Link
                    href="/products/multi-institution-platform"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-[#20B8D5]/50 transition-all group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#103B68]/60 flex items-center justify-center text-[#20B8D5] shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover/item:text-[#20B8D5] transition-colors">
                          Multi-Institution Platform
                        </h4>
                        <p className="text-[11px] text-slate-300">
                          Multi-Tenant Centralized Portal for Chain Schools
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/item:text-[#20B8D5] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0" />
                  </Link>
                </div>
              </div>

              <div className="pt-6 relative z-10 border-t border-white/10 mt-6">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#20B8D5] hover:text-white transition-colors group/cta"
                  href="/products"
                >
                  <span>Explore Software Products</span>
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Block 2: Client Solutions (Selective Glass Card with Rich Services Grid) */}
            <div className="mrm-glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all duration-300 shadow-xl">
              {/* Subtle ambient light in background */}
              <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5] text-xs font-bold uppercase tracking-wider">
                    <Code2 className="w-3.5 h-3.5" /> Focus Area 02
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#087FC4] dark:text-[#20B8D5] mrm-glass-pill px-2.5 py-0.5 rounded-full">
                    Custom Engineering
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Client Solutions
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mt-2">
                    We deliver websites, custom software, web applications, and
                    digital solutions shaped around business needs.
                  </p>
                </div>

                {/* 6 Core Client Services:
                    1. Web Development (ওয়েব ডেভেলপমেন্ট)
                    2. E-Commerce Development (ই-কমার্স ডেভেলপমেন্ট)
                    3. Custom Software Development (কাস্টম সফটওয়্যার ডেভেলপমেন্ট)
                    4. SaaS & Cloud Applications (সফটওয়্যার ডেভেলপমেন্ট)
                    5. SEO & Digital Marketing (মার্কেটিং)
                    6. Mobile App Development
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <Link
                    href="/services/web-development"
                    className="p-3 rounded-2xl bg-white/70 dark:bg-[#103B68]/30 hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/60 border border-slate-200/80 dark:border-white/10 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all flex items-start gap-3 group/svc"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5 group-hover/svc:scale-110 transition-transform">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#10243B] dark:text-white group-hover/svc:text-[#087FC4] dark:group-hover/svc:text-[#20B8D5] transition-colors truncate">
                        Web Development
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        High-performance responsive web applications
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services"
                    className="p-3 rounded-2xl bg-white/70 dark:bg-[#103B68]/30 hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/60 border border-slate-200/80 dark:border-white/10 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all flex items-start gap-3 group/svc"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5 group-hover/svc:scale-110 transition-transform">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#10243B] dark:text-white group-hover/svc:text-[#087FC4] dark:group-hover/svc:text-[#20B8D5] transition-colors truncate">
                        E-Commerce Solutions
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        Modern online stores &amp; payment gateways
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/custom-software-development"
                    className="p-3 rounded-2xl bg-white/70 dark:bg-[#103B68]/30 hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/60 border border-slate-200/80 dark:border-white/10 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all flex items-start gap-3 group/svc"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5 group-hover/svc:scale-110 transition-transform">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#10243B] dark:text-white group-hover/svc:text-[#087FC4] dark:group-hover/svc:text-[#20B8D5] transition-colors truncate">
                        Custom Software Dev
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        Tailored business automation systems
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/saas-development"
                    className="p-3 rounded-2xl bg-white/70 dark:bg-[#103B68]/30 hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/60 border border-slate-200/80 dark:border-white/10 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all flex items-start gap-3 group/svc"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5 group-hover/svc:scale-110 transition-transform">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#10243B] dark:text-white group-hover/svc:text-[#087FC4] dark:group-hover/svc:text-[#20B8D5] transition-colors truncate">
                        SaaS &amp; Cloud Platforms
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        Multi-tenant architectures &amp; cloud scaling
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services"
                    className="p-3 rounded-2xl bg-white/70 dark:bg-[#103B68]/30 hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/60 border border-slate-200/80 dark:border-white/10 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all flex items-start gap-3 group/svc"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5 group-hover/svc:scale-110 transition-transform">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#10243B] dark:text-white group-hover/svc:text-[#087FC4] dark:group-hover/svc:text-[#20B8D5] transition-colors truncate">
                        SEO &amp; Digital Marketing
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        Brand growth, audience reach &amp; analytics
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services/mobile-apps"
                    className="p-3 rounded-2xl bg-white/70 dark:bg-[#103B68]/30 hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/60 border border-slate-200/80 dark:border-white/10 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all flex items-start gap-3 group/svc"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5 group-hover/svc:scale-110 transition-transform">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#10243B] dark:text-white group-hover/svc:text-[#087FC4] dark:group-hover/svc:text-[#20B8D5] transition-colors truncate">
                        Mobile App Development
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        Native &amp; cross-platform iOS and Android
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)] mt-6">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline group/cta"
                  href="/services"
                >
                  <span>Explore What We Do</span>
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04 — OUR PRODUCTS (Selective Liquid Glass Cards & Interactive Image Switcher)
          ===================================================================== */}
      <AlternatingProductShowcase products={products} />

      {/* =====================================================================
          SECTION 05 — SERVICES (Structured Solid Cards for High Readability)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                OUR SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                From Digital Ideas to Fully Built Solutions.
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Whether you need a modern website, custom software, a scalable
                web application, or support for your digital growth, we work to
                turn your requirements into practical solutions.
              </p>
            </div>
            <Link
              className="px-6 py-3 rounded-[10px] bg-[#087FC4] hover:bg-[#087FC4]/90 text-white font-bold text-sm inline-flex items-center gap-2 shrink-0 self-start md:self-auto shadow-md"
              href="/services"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const displayNum = String(service.order || service.sortOrder || index + 1).padStart(2, '0');
              return (
                <Link
                  key={service.slug || index}
                  className="mrm-solid-card rounded-3xl p-8 flex flex-col justify-between group hover:border-[#087FC4] dark:hover:border-[#20B8D5] transition-all duration-300 transform hover:-translate-y-1.5 shadow-md hover:shadow-2xl relative overflow-hidden"
                  href={`/services/${service.slug}`}
                >
                  {/* Subtle Glow Effect on Hover */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/10 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5]">
                        {displayNum}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-[#087FC4] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-[var(--text-primary)] group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 06 — WHY CHOOSE MRM INFOTECH (6 Value Cards)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              WHY WORK WITH US
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              Built With Purpose. Driven by Quality. Focused on Impact.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Good technology starts with understanding the problem. We focus on
              clear requirements, thoughtful planning, quality development, and
              solutions that serve meaningful business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_VALUES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="mrm-glass-card rounded-2xl p-7 space-y-3 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07 — FEATURED PROJECTS (Live Database Records or Glass Empty State)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                SELECTED WORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                Ideas in Action. Solutions in Practice.
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Explore selected digital projects that reflect our approach to
                design, development, and practical problem-solving.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
              href="/projects"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <GlassEmptyState
              badge="Live Portfolio Feed"
              title="No Portfolio Projects Published Yet"
              description="This section is connected directly to the live MRM InfoTech database. Add and publish projects from the Admin Dashboard to showcase them here."
              adminHref="/admin/dashboard/projects"
              adminLabel="Add Project in Admin CMS"
              publicHref="/start-project"
              publicLabel="Start Your Project"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => {
                const title =
                  project.title ||
                  project.translations?.[0]?.title ||
                  project.slug;
                const summary =
                  project.summary ||
                  project.translations?.[0]?.summary ||
                  '';
                const frontendTech: string[] = Array.isArray(
                  project.frontendTechSummary,
                )
                  ? project.frontendTechSummary
                  : [];
                const backendTech: string[] = Array.isArray(
                  project.backendTechSummary,
                )
                  ? project.backendTechSummary
                  : [];

                return (
                  <div
                    key={project.id || project.slug}
                    className="mrm-glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                  >
                    <div className="p-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                        {project.projectWorkStatus || 'PUBLISHED'}
                      </span>
                      <h3 className="text-xl font-extrabold mt-1 mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                        {summary}
                      </p>
                      {(frontendTech.length > 0 || backendTech.length > 0) && (
                        <div className="pt-4 flex flex-wrap gap-1.5">
                          {[...frontendTech.slice(0, 3), ...backendTech.slice(0, 3)].map(
                            (tech) => (
                              <span
                                key={tech}
                                className="text-[11px] px-2.5 py-0.5 rounded-md mrm-glass-pill font-medium"
                              >
                                {tech}
                              </span>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                    <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <Link
                        className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline inline-flex items-center gap-1"
                        href={`/projects/${project.slug}`}
                      >
                        Project Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-[var(--text-muted)] hover:text-[#087FC4] inline-flex items-center gap-1"
                        >
                          Live Preview <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 08 — HOW WE WORK (5-Step Sequential Timeline)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              OUR APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              A Thoughtful Process. From First Conversation to Final Delivery.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Every successful solution begins with a clear understanding of the
              goal. Our process helps turn requirements into carefully planned,
              tested, and usable digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {WORK_PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="mrm-glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <span className="inline-block text-2xl font-black text-[#087FC4] dark:text-[#20B8D5] font-mono mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-extrabold mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#087FC4] to-[#20B8D5]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 09 — TECHNOLOGY EXPERTISE (Liquid Glass Badges)
          ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              OUR TECHNOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              The Right Tools. Thoughtfully Applied.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              We work with modern development technologies and tools, selecting
              the right combination for each project&apos;s needs, performance
              requirements, and long-term maintainability.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {APPROVED_TECHNOLOGIES.map((tech) => (
              <div
                key={tech.name}
                className="mrm-glass-pill px-6 py-4 rounded-2xl flex items-center gap-3.5"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#087FC4] to-[#20B8D5]" />
                <div className="text-left">
                  <p className="font-extrabold text-sm sm:text-base leading-none">
                    {tech.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {tech.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10, 11, 12 — CASE STUDIES, TEAM & BLOG (Shown When Published)
          ===================================================================== */}
      {featuredCaseStudies.length > 0 && (
        <section className="py-20 bg-[var(--bg-primary)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              BEHIND THE SOLUTIONS
            </span>
            <h2 className="text-3xl font-extrabold mt-2 mb-8">
              Understanding Challenges. Creating Meaningful Solutions.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCaseStudies.map((study) => (
                <Link
                  key={study.id || study.slug}
                  className="mrm-glass-card rounded-2xl p-7 block transition-all duration-300"
                  href={`/case-studies/${study.slug}`}
                >
                  <h3 className="text-xl font-extrabold mb-2">
                    {study.title || study.translations?.[0]?.title || study.slug}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
                    {study.summary || study.translations?.[0]?.summary || ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTeam.length > 0 && (
        <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              THE PEOPLE BEHIND THE WORK
            </span>
            <h2 className="text-3xl font-extrabold mt-2 mb-8">
              Driven by Ideas. United by a Vision.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeTeam.map((member) => {
                const name =
                  member.name || member.translations?.[0]?.name || member.slug;
                const role =
                  member.role ||
                  member.translations?.[0]?.role ||
                  'Team Member';
                return (
                  <div
                    key={member.id || member.slug}
                    className="mrm-glass-card rounded-2xl p-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                      {String(name).charAt(0).toUpperCase()}
                    </div>
                    <h3 className="font-extrabold text-base">{name}</h3>
                    <p className="text-xs text-[#087FC4] dark:text-[#20B8D5] mt-1">
                      {role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              THOUGHTS &amp; PERSPECTIVES
            </span>
            <h2 className="text-3xl font-extrabold mt-2 mb-8">
              Ideas Worth Exploring. Knowledge Worth Sharing.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.id || post.slug}
                  className="mrm-glass-card rounded-2xl p-7 block transition-all duration-300"
                  href={`/blog/${post.slug}`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-2">
                    <BookOpen className="w-3.5 h-3.5" /> Article
                  </div>
                  <h3 className="text-xl font-extrabold mb-2">
                    {post.title || post.translations?.[0]?.title || post.slug}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
                    {post.excerpt || post.translations?.[0]?.excerpt || ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 13 — FAQ (Clean Solid Accordion)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-primary)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              Questions Before We Get Started?
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Find answers to common questions about our products, services,
              development approach, and working with MRM InfoTech.
            </p>
          </div>

          <HomeFaqAccordion items={apiFaqs} />
        </div>
      </section>

      {/* =====================================================================
          SECTION 14 — FINAL CTA (Large Immersive Liquid Glass Panel)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[#071A35] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#20B8D5]/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#087FC4]/25 blur-[120px]"
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mrm-glass-cta rounded-3xl p-8 sm:p-14 lg:p-16 text-center max-w-4xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#20B8D5]/15 border border-[#20B8D5]/30 text-[#20B8D5] text-xs font-extrabold uppercase tracking-widest mb-4">
              LET&apos;S CREATE SOMETHING MEANINGFUL
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Have an Idea? Let&apos;s Turn It Into Something Real.
            </h2>
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto mb-9 leading-relaxed">
              Whether you&apos;re planning a new digital product, need a custom
              software solution, or want to strengthen your online presence,
              we&apos;d love to hear what you&apos;re working on.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                className="px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#087FC4]/30 hover:opacity-95 transition-all inline-flex items-center gap-2"
                href="/start-project"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                className="px-8 py-4 rounded-[10px] bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base transition-all"
                href="/contact"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
