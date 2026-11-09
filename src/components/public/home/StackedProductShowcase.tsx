/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight, GraduationCap, HeartPulse, Building2, CheckCircle2, ShieldCheck, Maximize2, Lock } from 'lucide-react';
import { CTAButton } from '@/components/ui/design-system/CTAButton';

export interface ProductShowcaseItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  features?: string[];
  techTags?: string[];
  integrations?: string[];
  images?: string[];
  liveUrl?: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  stage?: string;
  ctaLabel?: string;
  isFeatured?: boolean;
  sortOrder?: number;
}

interface StackedProductShowcaseProps {
  products: ProductShowcaseItem[];
}

// Curated high-fidelity UI screenshots for each flagship product
const PRODUCT_SCREENSHOTS: Record<
  string,
  Array<{ url: string; title: string; subtitle: string }>
> = {
  'edumanage-bd': [
    {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
      title: 'ERP Dashboard Cockpit',
      subtitle: 'Real-time attendance & live school statistics',
    },
    {
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
      title: 'Digital Gradebook & Results',
      subtitle: 'Automated GPA calculation & marksheet generator',
    },
    {
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
      title: 'Digital Fee Collection',
      subtitle: 'Instant bKash, Nagad & card auto-reconciliation',
    },
    {
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
      title: 'Guardian Mobile Portal',
      subtitle: 'Live SMS alerts & attendance tracking on phone',
    },
  ],
  'medisheba-bd': [
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      title: 'Diagnostic Lab Management',
      subtitle: 'Integrated pathology & clinical test workflows',
    },
    {
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
      title: 'Barcode Specimen Tracking',
      subtitle: 'Zero sample mix-up with automated thermal printing',
    },
    {
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
      title: 'Digital Doctor Prescription',
      subtitle: 'Watermarked PDF reports & encrypted doctor signatures',
    },
    {
      url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop',
      title: 'Patient SMS Report Portal',
      subtitle: 'Online patient reports accessed via secure SMS link',
    },
  ],
  'multi-institution-platform': [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      title: 'Multi-Tenant Governance',
      subtitle: 'Centralized control across 50+ institutional portals',
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      title: '1-Click Portal Deployer',
      subtitle: 'Automated SSL, DNS routing & custom domain binding',
    },
    {
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
      title: 'Notice Broadcast Engine',
      subtitle: 'Single broadcast updates circulars on all network sites',
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      title: 'Cloud Infrastructure Telemetry',
      subtitle: '99.98% high availability with zero-trust RBAC auditing',
    },
  ],
};

function ProductCardImageCarousel({
  slug,
  title,
  backendImages,
}: {
  slug: string;
  title: string;
  backendImages?: string[];
}) {
  const curated = PRODUCT_SCREENSHOTS[slug] || PRODUCT_SCREENSHOTS['edumanage-bd'];
  const allImages =
    backendImages && backendImages.length > 0
      ? backendImages.map((url, i) => ({
          url,
          title: `${title} - Screenshot ${i + 1}`,
          subtitle: 'Live verified production screen',
        }))
      : curated;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto-rotate every 2.8 seconds unless hovered
  useEffect(() => {
    if (isHovered || allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  const activeImage = allImages[currentIndex] || allImages[0];

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div
        className="rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/95 shadow-2xl overflow-hidden relative group/carousel transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* macOS Style Sleek Window Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--theme-bg-surface)]/90 border-b border-[var(--theme-border-glass)] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <div className="flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-md bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[10px] font-mono text-[var(--theme-text-muted)]">
              <Lock className="w-2.5 h-2.5 text-emerald-400" />
              <span>{slug}.mrminfotech.com</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20">
              SLIDE {currentIndex + 1}/{allImages.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="p-1 rounded-md text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.08] transition-colors"
              title="Full screen view"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Screenshot Viewport with Smooth Animated Crossfade */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.url}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Screenshot Overlay Caption */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-end justify-between pointer-events-none">
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow-md block">
                {activeImage.title}
              </span>
              <span className="text-[11px] text-white/80 drop-shadow-sm block">
                {activeImage.subtitle}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE UI
            </div>
          </div>

          {/* Left / Right Carousel Controls */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110 z-20 cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110 z-20 cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Carousel Thumbnail Dots & Auto-Cycle Progress Indicator */}
        <div className="px-4 py-2.5 bg-[var(--theme-bg-surface)] border-t border-[var(--theme-border-glass)] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {allImages.map((img, idx) => (
              <button
                key={img.url + idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-1.5 bg-[var(--theme-accent)] shadow-[0_0_8px_var(--theme-accent-glow)]'
                    : 'w-1.5 h-1.5 bg-[var(--theme-text-muted)]/40 hover:bg-[var(--theme-text-secondary)]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--theme-text-secondary)]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[var(--theme-accent)]" />
              ISO 27001 Security
            </span>
            <span>•</span>
            <span className="text-[var(--theme-accent)] font-bold">2.8s Auto</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="max-w-4xl w-full bg-[var(--theme-bg-surface)] rounded-2xl border border-[var(--theme-border-glass)] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[var(--theme-border-glass)] flex items-center justify-between">
              <div className="font-bold text-sm text-[var(--theme-text-primary)]">
                {activeImage.title}
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="px-3 py-1 rounded-md bg-white/[0.08] text-xs font-bold text-white hover:bg-white/[0.15] transition-colors"
              >
                Close ✕
              </button>
            </div>
            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function StackedProductShowcase({ products }: StackedProductShowcaseProps) {
  return (
    <div className="relative pb-28 sm:pb-36 lg:pb-48">
      {/* 
        Sticky Card Stacking Deck:
        Each card is sticky with progressive top offset.
        As the user scrolls, Card 1 stays pinned, Card 2 slides up directly over it,
        and Card 3 slides up over Card 2. This drastically compresses page scroll.
      */}
      <div className="relative space-y-12 sm:space-y-16 lg:space-y-24">
        {products.map((product, index) => {
          const serial = String(index + 1).padStart(2, '0');
          const isEduManage = product.slug.includes('edumanage');
          const isMediSheba = product.slug.includes('medisheba');

          const icon = isEduManage ? (
            <GraduationCap className="w-5 h-5" />
          ) : isMediSheba ? (
            <HeartPulse className="w-5 h-5" />
          ) : (
            <Building2 className="w-5 h-5" />
          );

          const defaultFeatures = isEduManage
            ? [
                'Biometric RFID attendance sync with instant guardian SMS alerts',
                'Automated grading engine & marksheet print for Board standards',
                'Digital fee collection via mobile banking & auto-reconciliation',
                'Role-based dashboards for Principal, Teachers, Accounts & Guardians',
              ]
            : isMediSheba
            ? [
                'Barcode test tube tracking ensuring zero specimen cross-contamination',
                'Automated pathology reporting with normal range reference validation',
                'Encrypted doctor digital signatures & watermarked PDF verification',
                'Online patient report portal with instant SMS link & OTP access',
              ]
            : [
                'Multi-tenant database isolation & custom domain routing with auto-SSL',
                'Unified control cockpit deploying institutional sites in 1-click',
                'Centralized notice engine broadcasting circulars across 50+ websites',
                'Granular RBAC security compliance and zero-trust administrative logs',
              ];

          const features =
            product.features && product.features.length > 0
              ? product.features.slice(0, 4)
              : defaultFeatures;

          const defaultTech = isEduManage
            ? ['Next.js 14', 'NestJS', 'PostgreSQL', 'Tailwind CSS', 'Redis Queue']
            : isMediSheba
            ? ['React', 'Node.js', 'PostgreSQL', 'Thermal Printer API', 'SMS Gateway']
            : ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cloudflare CDN'];

          const techTags =
            product.techTags && product.techTags.length > 0
              ? product.techTags.slice(0, 5)
              : product.integrations && product.integrations.length > 0
              ? product.integrations.slice(0, 5)
              : defaultTech;

          return (
            <div
              key={product.slug}
              className="sticky rounded-3xl p-6 sm:p-9 lg:p-11 border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/80 bg-[var(--theme-bg-surface)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] transition-all duration-300"
              style={{
                top: `calc(84px + ${index * 26}px)`,
                zIndex: 10 + index,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Product Information, Highlights, Stack & Actions */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono font-black text-[var(--theme-accent)] px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30">
                      PLATE {serial} • {product.category || 'ENTERPRISE SAAS'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {product.stage || 'LIVE IN PRODUCTION'}
                    </span>
                    {product.isFeatured && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-accent-text)]">
                        ★ FEATURED
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/30">
                        {icon}
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed pt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Capabilities Checklist */}
                  <div className="space-y-2.5 pt-1">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">
                      Core Enterprise Capabilities
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-start gap-2 text-xs text-[var(--theme-text-secondary)]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    {techTags.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <CTAButton
                      href={`/products/${product.slug}`}
                      size="md"
                      className="shadow-[0_0_20px_var(--theme-accent-glow)]"
                    >
                      {product.ctaLabel || 'Explore Product'}{' '}
                      <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                    </CTAButton>

                    {product.liveUrl && (
                      <a
                        href={product.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-text-primary)] px-4 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/60 hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}

                    <Link
                      href="/start-project"
                      className="text-xs font-bold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors inline-flex items-center gap-1"
                    >
                      Request Custom Demo →
                    </Link>
                  </div>
                </div>

                {/* Right Column: Live Auto-Rotating Product Screenshot Carousel */}
                <div className="lg:col-span-5">
                  <ProductCardImageCarousel
                    slug={product.slug}
                    title={product.title}
                    backendImages={product.images}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
