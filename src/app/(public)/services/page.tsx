import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Cpu, Layers, Sparkles, ArrowRight, ShieldCheck, Users, Zap, Globe, GraduationCap, HeartPulse, Building2, Lock, ChevronDown, HelpCircle } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import type { ServiceRecord, ServiceCategory } from '@/types/service.types';
import { ServicesShowcaseClient } from '@/components/public/services/ServicesShowcaseClient';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Custom Software & Web Development Services",
  description:
    "Custom software, web application, cloud and UI/UX services from MRM InfoTech: scalable SaaS platform engineering and enterprise web applications.",
  path: "/services",
});

export const revalidate = 60;

export default async function ServicesPage() {
  const [rawServices, rawCategories] = await Promise.all([
    PublicApiService.getServices<ServiceRecord[]>({ placement: 'catalog' }),
    PublicApiService.getServiceCategories<ServiceCategory[]>(),
  ]);

  const services: ServiceRecord[] = Array.isArray(rawServices) ? rawServices : [];
  const categories: ServiceCategory[] = Array.isArray(rawCategories) ? rawCategories : [];

  // Why Choose MRM - 6 Core Engineering Pillars
  const whyChooseUs = [
    {
      title: 'Architectural Autonomy',
      desc: 'Clean code built on NestJS, Next.js, and PostgreSQL without legacy technical debt or fragile third-party hacks.',
      icon: Cpu,
    },
    {
      title: 'Complete IP Ownership',
      desc: 'Full source code, database migrations, CI/CD pipelines, and intellectual property handed over upon delivery.',
      icon: ShieldCheck,
    },
    {
      title: 'High Concurrency & SLA',
      desc: 'Systems engineered for peak transactional throughput, caching, and resilient infrastructure design.',
      icon: Zap,
    },
    {
      title: 'Direct Engineering Access',
      desc: 'No non-technical layers. You collaborate directly with senior systems architects and full-stack creators.',
      icon: Users,
    },
    {
      title: 'Transparent Sprint Slices',
      desc: 'Bi-weekly demo deployments, automated regression tests, and verifiable milestone progress tracking.',
      icon: Layers,
    },
    {
      title: 'Sovereign Long-Term Support',
      desc: 'Post-launch SLA maintenance, security patch updates, and telemetry monitoring to minimise disruption.',
      icon: Lock,
    },
  ];

  // Industries We Serve
  const industries = [
    {
      name: 'Education & Academics',
      desc: 'Biometric student attendance, grade tabulation, online tuition fees, and multi-campus portals.',
      icon: GraduationCap,
    },
    {
      name: 'Healthcare & Diagnostics',
      desc: 'Barcode specimen tracking, doctor digital reports, patient registries, and clinic management.',
      icon: HeartPulse,
    },
    {
      name: 'Corporate & Institutions',
      desc: 'ERP workflows, institutional governance websites, digital portals, and automated reporting.',
      icon: Building2,
    },
    {
      name: 'E-Commerce & Retail',
      desc: 'High-conversion storefronts, automated bKash/Nagad checkout, inventory sync, and parcel tracking.',
      icon: Globe,
    },
    {
      name: 'Startups & SaaS Platforms',
      desc: 'Multi-tenant cloud architecture, subscription billing, interactive dashboards, and rapid MVPs.',
      icon: Sparkles,
    },
    {
      name: 'FinTech & Transactions',
      desc: 'Encrypted audit trails, automated ledger reconciliations, role-based controls, and security.',
      icon: Lock,
    },
  ];

  // 6-Step Connected Engineering Workflow
  const workflowSteps = [
    {
      num: '01',
      title: 'Discovery & Systems Audit',
      desc: 'We map operational bottlenecks, user journeys, data entity relationships, and SLA constraints.',
    },
    {
      num: '02',
      title: 'Architecture & UX Wireframing',
      desc: 'Interactive Figma design systems, relational schema drafting, and technical feasibility reviews.',
    },
    {
      num: '03',
      title: 'Sprint-Based Engineering',
      desc: 'Iterative sprint slices built with clean code, NestJS microservices, and reactive Next.js 16 UI.',
    },
    {
      num: '04',
      title: 'Security & QA Telemetry',
      desc: 'Rigorous database validation, automated integration tests, and Core Web Vitals optimization.',
    },
    {
      num: '05',
      title: 'Production Rollout',
      desc: 'Low-downtime deployment, database migrations, SSL hardening, and automated CI/CD setup.',
    },
    {
      num: '06',
      title: 'SLA Maintenance & Scaling',
      desc: 'Continuous uptime telemetry, database backups, performance monitoring, and iterative enhancements.',
    },
  ];

  // Service FAQs
  const serviceFaqs = [
    {
      q: 'How does MRM InfoTech estimate project timelines and milestones?',
      a: 'We break every project down into measurable bi-weekly sprint deliverables. During the discovery phase, you receive an architectural blueprint with fixed milestones and verifiable acceptance criteria.',
    },
    {
      q: 'Do you provide full source code and intellectual property ownership?',
      a: 'Yes. All of the developed code, database schemas, migration scripts, and documentation belong exclusively to your organization upon project completion.',
    },
    {
      q: 'Can MRM modernize or integrate with our existing legacy systems?',
      a: 'Absolutely. We specialize in non-destructive legacy modernizations—building clean REST/GraphQL APIs, background workers, or unified web portals on top of existing databases without operational downtime.',
    },
    {
      q: 'What ongoing maintenance and technical support options do you offer?',
      a: 'We offer structured Service Level Agreements (SLAs) encompassing server telemetry monitoring, security patches, database backups, and dedicated engineering hours for continuous feature improvements.',
    },
    {
      q: 'How do we initiate a project or request a detailed proposal?',
      a: 'Simply submit a project inquiry through our Start a Project portal or contact us directly. Our systems architects will schedule a discovery call within 24 hours to discuss your technical requirements.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200 overflow-x-hidden selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* =====================================================================
          SECTION 01: HERO BANNER
          ===================================================================== */}
      <section className="relative pt-28 pb-20 sm:pb-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Volumetric Accent Illumination Orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[var(--theme-accent)]/10 blur-[130px]"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>CLIENT DIGITAL SERVICES • ENTERPRISE ENGINEERING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] max-w-4xl mx-auto">
            High-Craft Engineering For{' '}
            <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
              Modern Businesses.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[var(--theme-text-secondary)] leading-relaxed max-w-3xl mx-auto mt-6">
            We deliver bespoke software architecture, reactive web applications, native mobile apps,
            and data-backed digital marketing. Engineered with strict standards, maintainable code,
            and measurable business impact.
          </p>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?subject=New+Project+Inquiry"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 shadow-lg shadow-[var(--theme-accent-glow)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#services-directory"
              className="px-6 py-3.5 rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] font-bold text-xs uppercase tracking-wider hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
            >
              Explore Services ↓
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-[var(--theme-border-glass)] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                Full
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                IP Ownership
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                CI/CD
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                Automated Delivery
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                Peer
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                Reviewed Code
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                Support
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                Maintenance Plans
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: ASYMMETRIC BENTO SHOWCASE & SERVICES DIRECTORY
          ===================================================================== */}
      <section
        id="services-directory"
        className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/30 border-b border-[var(--theme-border-glass)] transition-colors duration-200"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span>EXPLORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Our Digital Service Portfolio
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              Filter by capability area or browse our complete suite of specialized enterprise services.
            </p>
          </div>

          <ServicesShowcaseClient
            initialServices={services}
            categories={categories}
          />
        </div>
      </section>

      {/* =====================================================================
          SECTION 03: WHY CHOOSE MRM INFOTECH
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE MRM ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Why Forward-Thinking Businesses Choose MRM
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              We reject fragmented outsourcing and bloated agencies. We operate as your elite embedded software engineering unit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-2.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04: INDUSTRIES WE SERVE
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <Building2 className="w-3.5 h-3.5" />
              <span>INDUSTRY SPECIALIZATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Domain Expertise Across Critical Sectors
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              Tailored software architectures aligned with domain-specific regulatory and operational realities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 shadow-xl transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/20 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 05: CONNECTED 6-STEP ENGINEERING WORKFLOW
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Our 6-Step Engineering Workflow
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              From the initial architectural discovery to long-term telemetry maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[var(--theme-accent)]">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase tracking-wider">
                      PHASE {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07: FREQUENTLY ASKED QUESTIONS
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>TRANSPARENCY FIRST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[var(--theme-text-secondary)]">
              Clear answers regarding our contracts, engineering philosophy, and delivery standards.
            </p>
          </div>

          <div className="space-y-4">
            {serviceFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] open:border-[var(--theme-accent)]/50 transition-all shadow-md"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-[var(--theme-text-muted)] group-open:rotate-180 transition-transform shrink-0 ml-3" />
                </summary>
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-4 leading-relaxed pt-3 border-t border-[var(--theme-border-glass)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 08: FINAL CONVERSION BANNER
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] transition-colors duration-200 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[var(--theme-accent)]/10 blur-[120px]"
        />

        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET&apos;S BUILD TOGETHER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight max-w-2xl mx-auto leading-tight">
              Have a Mission-Critical Project in Mind?
            </h2>

            <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] max-w-xl mx-auto leading-relaxed">
              Our engineering directors will review your technical specifications, provide an architectural roadmap, and schedule a discovery consultation within 24 hours.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact?subject=New+Project+Inquiry"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 shadow-lg shadow-[var(--theme-accent-glow)] transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] font-bold text-xs uppercase tracking-wider hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
