import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Cpu,
  Globe,
  Code2,
  Sparkles,
  ShieldCheck,
  Compass,
  Zap,
  Users,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import HomeFaqAccordion from '@/components/public/home/HomeFaqAccordion';

export const metadata: Metadata = {
  title: 'MRM InfoTech | Software Products & Digital Solutions Company',
  description:
    'We build innovative software products (EduManage BD, MediSheba BD, Multi-Institution Platform) and deliver custom digital solutions that move businesses forward.',
  openGraph: {
    title: 'MRM InfoTech — IDEAS • PRODUCTS • IMPACT',
    description:
      'Innovative SaaS software products and custom digital engineering solutions for modern businesses and organizations.',
    url: 'https://mrminfotech.com',
    type: 'website',
  },
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api/v1';

interface PublishedProductRaw {
  slug: string;
  title?: string;
  tagline?: string;
  description?: string;
  liveUrl?: string | null;
  translations?: Array<{
    title?: string;
    tagline?: string;
    description?: string;
  }>;
}

interface ProductItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string | null;
  ctaLabel: string;
  iconType?: string;
}

interface PublishedServiceRaw {
  slug: string;
  title?: string;
  summary?: string;
  description?: string;
  translations?: Array<{
    title?: string;
    summary?: string;
    description?: string;
  }>;
}

interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
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

async function fetchPublishedList<T = unknown>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
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

// Approved Initial Seed Fallbacks for Products & Services (Used ONLY if API returns empty)
const INITIAL_PRODUCTS: ProductItem[] = [
  {
    slug: 'edumanage-bd',
    title: 'EduManage BD',
    category: 'Education Management Software',
    description:
      'A digital platform designed to simplify educational institution management and support connected academic operations.',
    ctaLabel: 'Explore Product',
    liveUrl: null,
    iconType: 'education',
  },
  {
    slug: 'medisheba-bd',
    title: 'MediSheba BD',
    category: 'Healthcare & Diagnostic Management',
    description:
      'A healthcare technology platform designed to support diagnostic centres and healthcare service operations.',
    ctaLabel: 'Explore Product',
    liveUrl: null,
    iconType: 'healthcare',
  },
  {
    slug: 'multi-institution-platform',
    title: 'MRM InfoTech Multi-Institution Website Platform',
    category: 'Institutional Website Management',
    description:
      'A platform designed to help educational institutions manage their own professional websites and digital presence.',
    ctaLabel: 'Explore Platform',
    liveUrl: null,
    iconType: 'platform',
  },
];

const INITIAL_SERVICES: ServiceItem[] = [
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
    description:
      'We turn the plan into a functional and thoughtful digital solution.',
  },
  {
    number: '04',
    title: 'Test & Refine',
    description:
      'We review functionality, usability, and quality before delivery.',
  },
  {
    number: '05',
    title: 'Launch & Support',
    description:
      'We deliver the solution and provide agreed ongoing support.',
  },
];

const APPROVED_TECHNOLOGIES = [
  { name: 'React', category: 'Frontend UI' },
  { name: 'Next.js', category: 'Full-Stack Framework' },
  { name: 'TypeScript', category: 'Type Safety' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'NestJS', category: 'Backend Architecture' },
  { name: 'PostgreSQL', category: 'Relational Database' },
  { name: 'Prisma', category: 'Database ORM' },
  { name: 'Tailwind CSS', category: 'Design System' },
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
    fetchPublishedList<PublishedProductRaw>('/products?locale=en'),
    fetchPublishedList<PublishedServiceRaw>('/services?locale=en'),
    fetchPublishedList<PublishedProject>('/projects?locale=en'),
    fetchPublishedList<PublishedCaseStudy>('/case-studies?locale=en'),
    fetchPublishedList<PublishedTeamMember>('/team?locale=en'),
    fetchPublishedList<PublishedBlogPost>('/blog?locale=en'),
    fetchPublishedList<PublishedFaq>('/faqs'),
  ]);

  const products: ProductItem[] =
    apiProducts.length > 0
      ? apiProducts.map((p) => ({
          slug: p.slug,
          title: p.title || p.translations?.[0]?.title || p.slug,
          category:
            p.tagline ||
            p.translations?.[0]?.tagline ||
            'Software Product',
          description:
            p.description ||
            p.translations?.[0]?.description ||
            '',
          liveUrl: p.liveUrl || null,
          ctaLabel:
            p.slug === 'multi-institution-platform'
              ? 'Explore Platform'
              : 'Explore Product',
        }))
      : INITIAL_PRODUCTS;

  const services: ServiceItem[] =
    apiServices.length > 0
      ? apiServices.slice(0, 10).map((s) => ({
          slug: s.slug,
          title: s.title || s.translations?.[0]?.title || s.slug,
          summary:
            s.summary ||
            s.translations?.[0]?.summary ||
            s.description ||
            '',
        }))
      : INITIAL_SERVICES;

  const featuredProjects = apiProjects.slice(0, 6);
  const featuredCaseStudies = apiCaseStudies.slice(0, 3);
  const activeTeam = apiTeam.filter((m) => m.isActive !== false).slice(0, 4);
  const latestPosts = apiBlogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* =====================================================================
          SECTION 01 — HERO (Asymmetric Split Layout + Strong Glassmorphism)
          ===================================================================== */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-[var(--border-subtle)] bg-gradient-to-b from-[#EFF5FB]/70 via-[var(--bg-primary)] to-[var(--bg-primary)] dark:from-[#071A35] dark:via-[#071321] dark:to-[#071321]">
        {/* Subtle Ambient Cyan & Blue Glows */}
        <div
          aria-hidden="true"
          className="animate-mrm-ambient pointer-events-none absolute -top-28 right-1/4 w-[460px] h-[460px] rounded-full bg-[#20B8D5]/15 dark:bg-[#20B8D5]/12 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="animate-mrm-ambient pointer-events-none absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full bg-[#087FC4]/12 dark:bg-[#087FC4]/15 blur-[100px]"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mrm-glass-pill text-xs font-bold tracking-widest uppercase text-[#087FC4] dark:text-[#20B8D5]">
              <span className="w-2 h-2 rounded-full bg-[#20B8D5]" />
              SOFTWARE PRODUCTS &amp; DIGITAL SOLUTIONS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[var(--text-primary)]">
              We Turn Ideas Into Technology That Moves Businesses Forward.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              We build innovative software products and deliver custom digital
              solutions that help businesses and organizations simplify
              operations, solve real-world challenges, and grow with technology.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                className="px-7 py-3.5 rounded-[10px] bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#087FC4]/25 hover:opacity-95 active:scale-[0.99] transition-all inline-flex items-center gap-2"
                href="/services"
              >
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                className="px-7 py-3.5 rounded-[10px] mrm-glass-strong text-[var(--text-primary)] font-bold text-sm sm:text-base hover:border-[#087FC4] dark:hover:border-[#20B8D5] transition-all inline-flex items-center gap-2"
                href="/products"
              >
                Discover Our Products
              </Link>
            </div>

            {/* Official Tagline Bar */}
            <div className="pt-4 flex items-center gap-3 text-xs font-extrabold tracking-[0.22em] uppercase text-[var(--text-muted)]">
              <span>IDEAS</span>
              <span className="text-[#20B8D5]">•</span>
              <span>PRODUCTS</span>
              <span className="text-[#20B8D5]">•</span>
              <span>IMPACT</span>
            </div>
          </div>

          {/* Right Column: Abstract Layered Glass Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Architectural Glass Panel */}
              <div className="mrm-glass-strong rounded-2xl p-6 sm:p-7 relative z-10 animate-mrm-float">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                      MRM InfoTech Architecture
                    </span>
                    <h2 className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">
                      Dual-Engine Technology Partner
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center font-black text-base shadow-md">
                    M
                  </div>
                </div>

                {/* 3 Real Domain Identities: Education, Healthcare, Digital Solutions */}
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)]/80 dark:bg-[#071A35]/70 border border-[var(--border-subtle)] flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#087FC4]/15 text-[#087FC4] dark:text-[#20B8D5] shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          Education Technology
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#087FC4]/15 text-[#087FC4] dark:text-[#20B8D5]">
                          EduManage BD
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Connected academic operations &amp; multi-institution web platforms.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)]/80 dark:bg-[#071A35]/70 border border-[var(--border-subtle)] flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          Healthcare Platforms
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                          MediSheba BD
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Diagnostic centre &amp; healthcare service management software.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)]/80 dark:bg-[#071A35]/70 border border-[var(--border-subtle)] flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#103B68]/15 dark:bg-white/10 text-[#087FC4] dark:text-[#20B8D5] shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        Custom Digital Solutions
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Web applications, custom software, SaaS &amp; digital growth for clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Accent Glass Pill */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 z-20 mrm-glass-strong rounded-xl px-4 py-3 flex items-center gap-3 animate-mrm-float-delayed">
                <div className="w-8 h-8 rounded-lg bg-[#20B8D5]/20 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[var(--text-primary)]">
                    Proprietary SaaS + Client Engineering
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Built for maintainability &amp; real-world impact
                  </p>
                </div>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
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

          <div className="lg:col-span-6">
            <div className="mrm-solid-card rounded-2xl p-8 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[var(--border-subtle)] pb-4 sm:pb-0 sm:pr-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                    01 • IDEAS
                  </span>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    Problem-First Discovery
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Every product and client engagement starts with clarity around real operational needs.
                  </p>
                </div>
                <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[var(--border-subtle)] pb-4 sm:pb-0 sm:pr-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                    02 • PRODUCTS
                  </span>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    Thoughtful Engineering
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Clean architecture, reliable databases, and intuitive interfaces built to last.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                    03 • IMPACT
                  </span>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    Measurable Value
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Technology that simplifies daily work and supports sustainable organizational growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03 — OUR BUSINESS AREAS (Two Contrasting Feature Panels)
          ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* Panel A: Software Products (Deep Navy Contrasting Executive Panel) */}
            <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#071A35] via-[#0B2548] to-[#103B68] text-white border border-[#20B8D5]/25 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20B8D5]/15 text-[#20B8D5] text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" /> Pillar 01 • Proprietary Platforms
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Software Products
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  We develop industry-focused software platforms designed to
                  simplify operations and solve practical challenges.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-lg bg-white/10 text-slate-100">
                    EduManage BD
                  </span>
                  <span className="text-xs px-3 py-1 rounded-lg bg-white/10 text-slate-100">
                    MediSheba BD
                  </span>
                  <span className="text-xs px-3 py-1 rounded-lg bg-white/10 text-slate-100">
                    Multi-Institution Platform
                  </span>
                </div>
              </div>
              <div className="pt-8">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#20B8D5] hover:underline"
                  href="/products"
                >
                  Explore Our Software Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Panel B: Client Solutions (Clean Surface Panel) */}
            <div className="mrm-solid-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] text-xs font-bold uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5" /> Pillar 02 • Custom Engineering
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  Client Solutions
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  We deliver websites, custom software, web applications, and
                  digital solutions shaped around business needs.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    Web &amp; Software Development
                  </span>
                  <span className="text-xs px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    SaaS &amp; Business Automation
                  </span>
                  <span className="text-xs px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    SEO &amp; Digital Marketing
                  </span>
                </div>
              </div>
              <div className="pt-8">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                  href="/services"
                >
                  Explore What We Do <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04 — OUR PRODUCTS (Selective Glass Cards)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                BUILT BY MRM INFOTECH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                Our Products. Built Around Real-World Needs.
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                We are building focused technology products that help
                organizations manage their operations, connect with people, and
                create better digital experiences.
              </p>
            </div>
            <Link
              className="px-5 py-3 rounded-[10px] mrm-glass-pill font-bold text-sm text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
              href="/products"
            >
              Explore All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div
                key={product.slug || idx}
                className="mrm-glass-card rounded-2xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center shadow-md">
                      {idx === 0 ? (
                        <Layers className="w-6 h-6" />
                      ) : idx === 1 ? (
                        <Cpu className="w-6 h-6" />
                      ) : (
                        <Globe className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5]">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3">
                    {product.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
                  <Link
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                    href={`/products/${product.slug}`}
                  >
                    {product.ctaLabel || 'Explore Product'}{' '}
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {product.liveUrl && (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-[#087FC4] inline-flex items-center gap-1"
                    >
                      Live Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 05 — SERVICES (Structured Solid Grid with Restrained Hover)
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
            {services.map((service, index) => (
              <Link
                key={service.slug || index}
                className="mrm-solid-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group"
                href={`/services/${service.slug}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#087FC4] dark:text-[#20B8D5]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)] group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {service.summary}
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[var(--border-subtle)] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 06 — WHY CHOOSE MRM INFOTECH (Editorial Feature Grid)
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
                  className="mrm-solid-card rounded-2xl p-7 space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
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
          SECTION 07 — FEATURED PROJECTS (Only Shown When Published Records Exist)
          ===================================================================== */}
      {featuredProjects.length > 0 && (
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
                    className="mrm-solid-card rounded-2xl overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      <div className="p-6 pb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                          {project.projectWorkStatus || 'COMPLETED'}
                        </span>
                        <h3 className="text-xl font-extrabold text-[var(--text-primary)] mt-1 mb-2">
                          {title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                          {summary}
                        </p>
                      </div>

                      {(frontendTech.length > 0 || backendTech.length > 0) && (
                        <div className="px-6 py-3 space-y-2">
                          {frontendTech.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {frontendTech.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {backendTech.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {backendTech.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <Link
                        className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline inline-flex items-center gap-1"
                        href={`/projects/${project.slug}`}
                      >
                        Case Study <ArrowRight className="w-3.5 h-3.5" />
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
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 08 — HOW WE WORK (5-Step Sequential Process Timeline)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
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
                className="mrm-solid-card rounded-2xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-2xl font-black text-[#087FC4] dark:text-[#20B8D5] font-mono mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">
                    {step.title}
                  </h3>
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
          SECTION 09 — TECHNOLOGY EXPERTISE (Selective Glass Badges)
          ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[var(--bg-primary)]">
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
                  <p className="font-extrabold text-sm sm:text-base text-[var(--text-primary)] leading-none">
                    {tech.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {tech.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10 — CASE STUDIES (Shown Only When Approved Records Exist)
          ===================================================================== */}
      {featuredCaseStudies.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                  BEHIND THE SOLUTIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                  Understanding Challenges. Creating Meaningful Solutions.
                </h2>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  Explore the thinking, decisions, and problem-solving behind
                  selected projects—from understanding the challenge to
                  delivering a practical solution.
                </p>
              </div>
              <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                href="/case-studies"
              >
                Explore All Case Studies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredCaseStudies.map((study) => {
                const title =
                  study.title || study.translations?.[0]?.title || study.slug;
                const challenge =
                  study.challenge ||
                  study.translations?.[0]?.challenge ||
                  study.summary ||
                  study.translations?.[0]?.summary ||
                  '';

                return (
                  <Link
                    key={study.id || study.slug}
                    className="mrm-solid-card rounded-2xl p-8 flex flex-col justify-between group"
                    href={`/case-studies/${study.slug}`}
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                        Case Study
                      </span>
                      <h3 className="text-xl font-extrabold text-[var(--text-primary)] mt-2 mb-3 group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                        {challenge}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-1.5">
                      Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 11 — OUR TEAM (Shown Only When Real Team Profiles Exist)
          ===================================================================== */}
      {activeTeam.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                  THE PEOPLE BEHIND THE WORK
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                  Driven by Ideas. United by a Vision.
                </h2>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  Meet the people contributing their skills, creativity, and
                  dedication to building thoughtful digital solutions and
                  meaningful software products.
                </p>
              </div>
              <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                href="/team"
              >
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeTeam.map((member) => {
                const name =
                  member.name || member.translations?.[0]?.name || member.slug;
                const role =
                  member.role ||
                  member.translations?.[0]?.role ||
                  member.department ||
                  'Team Member';

                return (
                  <div
                    key={member.id || member.slug}
                    className="mrm-solid-card rounded-2xl p-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4">
                      {String(name).charAt(0).toUpperCase()}
                    </div>
                    <h3 className="font-extrabold text-lg text-[var(--text-primary)]">
                      {name}
                    </h3>
                    <p className="text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5] mt-1">
                      {role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 12 — INSIGHTS & UPDATES (Latest 3 Published Blog Posts)
          ===================================================================== */}
      {latestPosts.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
                  THOUGHTS &amp; PERSPECTIVES
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                  Ideas Worth Exploring. Knowledge Worth Sharing.
                </h2>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  Discover our perspectives on software development, digital
                  innovation, technology, and the ideas shaping modern
                  businesses.
                </p>
              </div>
              <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                href="/blog"
              >
                Read All Insights <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => {
                const title =
                  post.title || post.translations?.[0]?.title || post.slug;
                const excerpt =
                  post.excerpt || post.translations?.[0]?.excerpt || '';
                return (
                  <Link
                    key={post.id || post.slug}
                    className="mrm-solid-card rounded-2xl p-7 flex flex-col justify-between group"
                    href={`/blog/${post.slug}`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5] mb-3">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Article</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-[var(--text-primary)] group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors mb-3">
                        {title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>
                    <div className="pt-5 mt-6 border-t border-[var(--border-subtle)] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-1">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 13 — FAQ (Accessible Accordion on Clean Surface)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
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
          SECTION 14 — FINAL CTA (Immersive Deep Navy + Large Glass Panel)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[#071A35] relative overflow-hidden">
        {/* Ambient Cyan & Tech Blue Glow */}
        <div
          aria-hidden="true"
          className="animate-mrm-ambient pointer-events-none absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-[#20B8D5]/20 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="animate-mrm-ambient pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#087FC4]/25 blur-[110px]"
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl p-8 sm:p-14 lg:p-16 bg-white/10 backdrop-blur-xl border border-[#20B8D5]/30 shadow-2xl text-center max-w-4xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#20B8D5]/15 text-[#20B8D5] text-xs font-extrabold uppercase tracking-widest mb-4">
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
