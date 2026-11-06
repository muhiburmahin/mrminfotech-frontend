/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers,
  GraduationCap,
  HeartPulse,
  Building2,
} from 'lucide-react';
import type { ProductRecord } from '@/types/product.types';

interface FeaturedProductSpotlightProps {
  product: ProductRecord | null;
}

export default function FeaturedProductSpotlight({ product }: FeaturedProductSpotlightProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!product) return null;

  // Extract images from mediaItems or fallback to images
  const mediaList =
    product.mediaItems && product.mediaItems.length > 0
      ? product.mediaItems
      : (product.images || []).map((url, i) => ({
          id: `img-${i}`,
          url,
          title: product.title,
          caption: product.tagline || '',
          altText: product.title,
          mediaType: 'SCREENSHOT' as const,
          isPrimary: i === 0,
          displayOrder: i + 1,
        }));

  const currentMedia = mediaList[activeImgIdx] || mediaList[0];
  const totalImages = mediaList.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImgIdx((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImgIdx((prev) => (prev + 1) % totalImages);
  };

  const getProductIcon = () => {
    const slug = product.slug?.toLowerCase() || '';
    if (slug.includes('edumanage')) return <GraduationCap className="w-6 h-6" />;
    if (slug.includes('medisheba')) return <HeartPulse className="w-6 h-6" />;
    return <Building2 className="w-6 h-6" />;
  };

  const keyFeatures =
    product.features && product.features.length > 0
      ? product.features.slice(0, 4)
      : [];

  return (
    <section className="py-16 sm:py-24 border-b border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/40 relative overflow-hidden transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Product Spotlight</span>
          </div>
          <span className="h-px flex-1 bg-[var(--theme-border-glass)]" />
        </div>

        {/* 2-Column Spotlight Container */}
        <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Subtle Ambient Background Flare */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-accent)]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Column: Product Info & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]">
                {product.categoryName || product.productType || 'Enterprise SaaS'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {product.stage || 'LIVE IN PRODUCTION'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/30 shadow-inner">
                  {getProductIcon()}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
                  {product.title}
                </h2>
              </div>
              {product.tagline && (
                <p className="text-sm font-semibold text-[var(--theme-accent)] pt-1">
                  {product.tagline}
                </p>
              )}
              <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed pt-1">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Key Feature Highlights */}
            {keyFeatures.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Core Architecture Capabilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {keyFeatures.map((feat) => (
                    <div key={feat.id} className="flex items-start gap-2.5 text-xs text-[var(--theme-text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[var(--theme-text-primary)] block">
                          {feat.title}
                        </span>
                        {feat.shortDescription && (
                          <span className="text-[11px] text-[var(--theme-text-muted)] line-clamp-1">
                            {feat.shortDescription}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--theme-border-glass)]">
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_20px_var(--theme-accent-glow)] hover:opacity-90 transition-all"
              >
                <span>Explore Full Product</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Live Demo</span>
                </a>
              )}

              <Link
                href={`/contact?subject=Demo%20Request%3A%20${encodeURIComponent(product.title)}`}
                className="text-xs font-bold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors"
              >
                Request Custom Walkthrough →
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Interface Showcase with Gallery Switcher */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl p-4 sm:p-5 border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/90 shadow-2xl relative overflow-hidden group">
              {/* Mockup Header Strip */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--theme-border-glass)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-[var(--theme-text-muted)] ml-2">
                    {product.slug}.mrminfotech.com
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20">
                    {currentMedia?.mediaType || 'SCREENSHOT'}
                  </span>
                  {totalImages > 1 && (
                    <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                      {activeImgIdx + 1}/{totalImages}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Screenshot Container */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black/40 border border-[var(--theme-border-glass)]">
                {currentMedia?.url ? (
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.altText || `${product.title} screenshot`}
                    className="w-full h-full object-cover object-top transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[var(--theme-text-muted)]">
                    <Layers className="w-10 h-10 mb-2 opacity-50 text-[var(--theme-accent)]" />
                    <p className="text-xs">Live production interface</p>
                  </div>
                )}

                {/* Left/Right Switcher Controls */}
                {totalImages > 1 && (
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/90 transition-all pointer-events-auto"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/90 transition-all pointer-events-auto"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption & Thumbnail Dots */}
              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-xs text-[var(--theme-text-muted)] truncate">
                  {currentMedia?.caption || currentMedia?.title || product.tagline}
                </p>

                {totalImages > 1 && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {mediaList.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImgIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeImgIdx
                            ? 'w-6 bg-[var(--theme-accent)]'
                            : 'w-2 bg-[var(--theme-border-glass)] hover:bg-[var(--theme-text-muted)]'
                        }`}
                        aria-label={`Jump to screenshot ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
