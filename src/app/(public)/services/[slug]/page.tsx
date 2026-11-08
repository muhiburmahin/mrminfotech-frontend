/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Compass,
  FileText,
  Layers,
  GraduationCap,
  HeartPulse,
  Building2,
  Lock,
  Globe,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Cpu,
  Smartphone,
  Palette,
  Search,
  Megaphone,
  Code2,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import type { ServiceRecord } from '@/types/service.types';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const service: ServiceRecord | null = await PublicApiService.getServiceBySlug(cleanSlug, 'en');

  if (!service) {
    return {
      title: 'Service Not Found | MRM InfoTech',
      description: 'The requested enterprise software service could not be found.',
    };
  }

  const title =
    service.seoTitle ||
    service.seo?.seoTitle ||
    `${service.title || service.name} | MRM InfoTech`;
  const desc =
    service.seoDescription ||
    service.seo?.seoDescription ||
    service.shortDescription ||
    service.tagline ||
    'High-craft enterprise software architecture, cloud platforms, and bespoke digital solutions in Bangladesh.';
  const canonical =
    service.canonicalUrl ||
    service.seo?.canonicalUrl ||
    `https://mrminfotech.com/services/${service.slug}`;
  const ogImg =
    service.coverImage ||
    service.mediaItems?.[0]?.url ||
    'https://mrminfotech.com/og-default.png';

  return {
    title,
    description: desc.slice(0, 160),
    alternates: {
      canonical,
    },
    robots: {
      index: !service.noIndex,
      follow: !service.noIndex,
      googleBot: {
        index: !service.noIndex,
        follow: !service.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      title,
      description: desc.slice(0, 160),
      url: canonical,
      siteName: 'MRM InfoTech',
      images: [{ url: ogImg, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc.slice(0, 160),
      images: [ogImg],
    },
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === 'true';
  const cleanSlug = decodeURIComponent(slug).trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  const [service, allServices] = await Promise.all([
    PublicApiService.getServiceBySlug<ServiceRecord>(cleanSlug, 'en', isPreview),
    PublicApiService.getServices<ServiceRecord[]>({ placement: 'catalog' }),
  ]);

  if (!service || (service.allowPublicDetail === false && !isPreview)) {
    notFound();
  }

  const title = service.title || service.name || service.slug;
  const tagline = service.tagline || 'High-performance digital engineering engineered for scale.';
  const shortDesc = service.shortDescription || service.summary || '';
  const fullDesc = service.description || '';
  const offerings = service.offerings || [];
  const benefits = service.benefits || [];
  const processSteps = service.processSteps || [];
  const technologies = service.technologies || [];
  const mediaItems = service.mediaItems || [];
  const faqs = service.faqs || [];

  // Related services excluding current
  const relatedServices = (Array.isArray(allServices) ? allServices : [])
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const getIcon = (iconName?: string | null) => {
    const s = (iconName || '').toLowerCase();
    if (s.includes('web') || s.includes('globe')) return <Globe className="w-5 h-5" />;
    if (s.includes('software') || s.includes('cpu')) return <Cpu className="w-5 h-5" />;
    if (s.includes('mobile') || s.includes('smartphone')) return <Smartphone className="w-5 h-5" />;
    if (s.includes('ui') || s.includes('ux') || s.includes('palette')) return <Palette className="w-5 h-5" />;
    if (s.includes('seo') || s.includes('search')) return <Search className="w-5 h-5" />;
    if (s.includes('marketing') || s.includes('megaphone')) return <Megaphone className="w-5 h-5" />;
    return <Code2 className="w-5 h-5" />;
  };

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200 overflow-x-hidden selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* =====================================================================
          SECTION 01: HERO BANNER
          ===================================================================== */}
      <section className="relative pt-28 pb-20 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Subtle Ambient Light Orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[350px] rounded-full bg-[var(--theme-accent)]/10 blur-[120px]"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--theme-text-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--theme-text-muted)]" />
            <Link href="/services" className="hover:text-[var(--theme-text-primary)] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--theme-text-muted)]" />
            <span className="text-[var(--theme-accent)] font-semibold truncate max-w-[200px]">
              {title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 flex-wrap">
                {service.category?.name && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 uppercase tracking-wider">
                    {service.category.name}
                  </span>
                )}
                {service.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    ★ Featured Discipline
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                {title}
              </h1>

              <p className="text-base sm:text-lg text-[var(--theme-accent)] font-medium leading-relaxed">
                {tagline}
              </p>

              {shortDesc && (
                <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed max-w-2xl">
                  {shortDesc}
                </p>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?subject=Service+Inquiry:+${encodeURIComponent(title)}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 shadow-lg shadow-[var(--theme-accent-glow)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start a {title} Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="px-5 py-3.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] font-bold text-xs uppercase tracking-wider hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
                >
                  Request Architecture Call
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md"
                    style={{ backgroundColor: service.primaryColor || '#2563EB' }}
                  >
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider font-bold">
                    ENTERPRISE GRADE
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">
                    Service Blueprint Telemetry
                  </h3>
                  <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                    Verified scope guaranteed under non-disclosure and strict intellectual property agreements.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[var(--theme-border-glass)] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--theme-text-muted)]">Codebase Ownership:</span>
                    <span className="font-bold text-[var(--theme-text-primary)]">100% Client Owned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--theme-text-muted)]">Sprint Velocity:</span>
                    <span className="font-bold text-[var(--theme-text-primary)]">Bi-Weekly Slices</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--theme-text-muted)]">Architecture Standard:</span>
                    <span className="font-bold text-[var(--theme-text-primary)]">Zero Technical Debt</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--theme-text-muted)]">SLA Telemetry:</span>
                    <span className="font-bold text-[var(--theme-accent)]">99.98% Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: OVERVIEW & ARCHITECTURAL SCOPE
          ===================================================================== */}
      {fullDesc && (
        <section className="py-20 bg-[var(--theme-bg-surface)]/30 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <FileText className="w-3.5 h-3.5" />
              <span>OVERVIEW &amp; SCOPE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Engineering Strategy &amp; Problem Solving
            </h2>

            <div className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed whitespace-pre-line space-y-4">
              {fullDesc}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 03: WHAT WE OFFER (GRANULAR OFFERINGS GRID)
          ===================================================================== */}
      {offerings.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <Layers className="w-3.5 h-3.5" />
                <span>WHAT WE OFFER</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Specialized Service Offerings
              </h2>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Every discipline is structured around clear scopes, rigorous deliverables, and verified execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((offering, idx) => (
                <div
                  key={offering.id || idx}
                  className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {offering.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                      {offering.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 04: VALUE PROPOSITIONS & GUARANTEES
          ===================================================================== */}
      {benefits.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KEY VALUE PROPOSITIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Concrete Business Value &amp; ROI
              </h2>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Why organizations entrust their mission-critical systems to MRM InfoTech.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <div
                  key={benefit.id || idx}
                  className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 05: METHODOLOGY & WORKING PROCESS
          ===================================================================== */}
      {processSteps.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <span>EXECUTION LIFECYCLE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Our Delivery Methodology
              </h2>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Structured sprint cycles ensuring predictable milestones and verifiable acceptance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={step.id || idx}
                  className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all space-y-3 group"
                >
                  <span className="font-mono text-2xl font-black text-[var(--theme-accent)] block">
                    {String(step.stepNumber || idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 06: TECHNOLOGIES & TOOLING
          ===================================================================== */}
      {technologies.length > 0 && (
        <section className="py-16 bg-[var(--theme-bg-surface)]/30 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--theme-accent)]">
              TECHNOLOGIES &amp; FRAMEWORKS
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {technologies.map((tech: any, idx: number) => {
                const label = typeof tech === 'string' ? tech : tech?.name || tech?.slug || '';
                return (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-xs font-mono font-bold text-[var(--theme-text-primary)] shadow-sm"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 07: MEDIA GALLERY / SCREENSHOTS
          ===================================================================== */}
      {mediaItems.length > 0 && (
        <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <span>MEDIA &amp; INTERFACES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Deliverables &amp; Artifact Showcase
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] overflow-hidden shadow-xl group"
                >
                  <div className="aspect-video overflow-hidden bg-slate-900 relative">
                    <img
                      src={item.url}
                      alt={item.title || `${title} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  {item.title && (
                    <div className="p-4">
                      <p className="text-xs font-bold text-[var(--theme-text-primary)] truncate">
                        {item.title}
                      </p>
                      {item.caption && (
                        <p className="text-[11px] text-[var(--theme-text-secondary)] mt-1 truncate">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 08: SERVICE-SPECIFIC FAQS
          ===================================================================== */}
      {faqs.length > 0 && (
        <section className="py-20 bg-[var(--theme-bg-surface)]/30 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] uppercase tracking-widest border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Questions About {title}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq: any, idx: number) => (
                <details
                  key={faq.id || idx}
                  className="group p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] open:border-[var(--theme-accent)]/50 transition-all shadow-md"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 text-[var(--theme-text-muted)] group-open:rotate-180 transition-transform shrink-0 ml-3" />
                  </summary>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-4 leading-relaxed pt-3 border-t border-[var(--theme-border-glass)]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 09: RELATED SERVICES
          ===================================================================== */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--theme-accent)] uppercase tracking-wider block">
                  CROSS-DISCIPLINE CAPABILITIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] tracking-tight mt-1">
                  Related Engineering Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-[var(--theme-accent)] hover:underline flex items-center gap-1"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-6 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="font-bold text-base text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {rel.title || rel.name}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2">
                      {rel.shortDescription || rel.summary || rel.tagline}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--theme-accent)] mt-4">
                    <span>Explore Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 10: CONVERSION CTA
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] transition-colors duration-200 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-2xl text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Ready to Build Your {title} Solution?
            </h2>
            <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] max-w-xl mx-auto leading-relaxed">
              Schedule an architecture discovery session with MRM InfoTech senior engineers today.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/contact?subject=Service+Inquiry:+${encodeURIComponent(title)}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 shadow-lg shadow-[var(--theme-accent-glow)] transition-all"
              >
                <span>Inquire for {title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] font-bold text-xs uppercase tracking-wider hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
              >
                ← Back to All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
