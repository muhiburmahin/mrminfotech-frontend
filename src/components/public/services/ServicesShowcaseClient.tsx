'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Globe,
  Smartphone,
  Palette,
  Search,
  Megaphone,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import type { ServiceRecord, ServiceCategory } from '@/types/service.types';

interface ServicesShowcaseClientProps {
  initialServices: ServiceRecord[];
  categories: ServiceCategory[];
}

export function ServicesShowcaseClient({
  initialServices,
  categories,
}: ServicesShowcaseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const getIcon = (iconName?: string | null, slug?: string) => {
    const s = (iconName || slug || '').toLowerCase();
    if (s.includes('web') || s.includes('globe')) return <Globe className="w-5 h-5" />;
    if (s.includes('software') || s.includes('cpu')) return <Cpu className="w-5 h-5" />;
    if (s.includes('mobile') || s.includes('smartphone') || s.includes('app'))
      return <Smartphone className="w-5 h-5" />;
    if (s.includes('ui') || s.includes('ux') || s.includes('design') || s.includes('palette'))
      return <Palette className="w-5 h-5" />;
    if (s.includes('seo') || s.includes('search')) return <Search className="w-5 h-5" />;
    if (s.includes('marketing') || s.includes('megaphone'))
      return <Megaphone className="w-5 h-5" />;
    return <Code2 className="w-5 h-5" />;
  };

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'ALL') return initialServices;
    return initialServices.filter(
      (s) => s.categoryId === selectedCategory || s.category?.slug === selectedCategory
    );
  }, [initialServices, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        <button
          type="button"
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            selectedCategory === 'ALL'
              ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-lg shadow-[var(--theme-accent-glow)]'
              : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/40'
          }`}
        >
          All Services ({initialServices.length})
        </button>

        {categories.map((cat) => {
          const count = initialServices.filter(
            (s) => s.categoryId === cat.id || s.category?.slug === cat.slug
          ).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-lg shadow-[var(--theme-accent-glow)]'
                  : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/40'
              }`}
            >
              {cat.name} {count > 0 ? `(${count})` : ''}
            </button>
          );
        })}
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        {filteredServices.map((service, index) => {
          const title = service.title || service.name || service.slug;
          const tagline = service.tagline || 'Engineered for high performance and durability.';
          const summary =
            service.shortDescription ||
            service.summary ||
            service.description ||
            'Full-cycle engineering and development.';
          const offeringsList = service.offerings || [];
          const isFeaturedSpan = service.isFeatured || index === 0;

          return (
            <div
              key={service.id || service.slug}
              className={`p-7 sm:p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_35px_var(--theme-accent-subtle)] transition-all flex flex-col justify-between group relative overflow-hidden ${
                isFeaturedSpan ? 'lg:col-span-8' : 'lg:col-span-4'
              }`}
            >
              {/* Corner Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--theme-accent)]/10 blur-3xl group-hover:bg-[var(--theme-accent)]/20 transition-all"
              />

              <div className="space-y-5 relative z-10">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30 group-hover:scale-110 transition-transform">
                    {getIcon(service.icon, service.slug)}
                  </div>

                  {service.category?.name && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/25">
                      {service.category.name}
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors tracking-tight">
                    {title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--theme-accent)] mt-1">
                    {tagline}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  {summary}
                </p>

                {/* Granular Offerings Pills */}
                {offeringsList.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] block">
                      Core Offerings &amp; Scope:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {offeringsList.slice(0, isFeaturedSpan ? 6 : 4).map((offering, idx) => (
                        <span
                          key={offering.id || idx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] group-hover:border-[var(--theme-accent)]/30 transition-colors"
                        >
                          {offering.title}
                        </span>
                      ))}
                      {offeringsList.length > (isFeaturedSpan ? 6 : 4) && (
                        <span className="text-[10px] font-mono self-center text-[var(--theme-text-muted)]">
                          +{offeringsList.length - (isFeaturedSpan ? 6 : 4)} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between gap-3 relative z-10">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore Service Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/contact?subject=Service+Inquiry:+${encodeURIComponent(title)}`}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                >
                  Inquire
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 px-4 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
          <p className="text-base font-bold text-[var(--theme-text-primary)]">
            No services in this category yet
          </p>
          <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
            Try selecting &quot;All Services&quot; or check back shortly.
          </p>
        </div>
      )}
    </div>
  );
}
