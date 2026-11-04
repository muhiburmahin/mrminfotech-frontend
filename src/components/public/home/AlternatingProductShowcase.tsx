/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Lock,
  Code2,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  Building2,
  Sparkles,
  Layers,
  LayoutGrid,
} from 'lucide-react';
import { HomeProductItem } from './HomeProductsSection';

interface AlternatingProductShowcaseProps {
  products: HomeProductItem[];
}

export default function AlternatingProductShowcase({ products }: AlternatingProductShowcaseProps) {
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase');
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const handleNextImage = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[slug] || 0;
      return { ...prev, [slug]: (current + 1) % total };
    });
  };

  const handlePrevImage = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[slug] || 0;
      return { ...prev, [slug]: (current - 1 + total) % total };
    });
  };

  const getProductIcon = (slug: string) => {
    if (slug.includes('edumanage')) return <GraduationCap className="w-6 h-6" />;
    if (slug.includes('medisheba')) return <HeartPulse className="w-6 h-6" />;
    return <Building2 className="w-6 h-6" />;
  };

  const getProductCapabilities = (slug: string) => {
    if (slug.includes('edumanage')) {
      return [
        'Student Information & Guardian Portal',
        'Biometric & Automated Attendance Tracking',
        'Automated Tuition Fees & Mobile Payment Reconciliation',
        'Dynamic Exam Grading, Report Cards & SMS Telemetry',
      ];
    }
    if (slug.includes('medisheba')) {
      return [
        'Electronic Medical Records (EMR) & Digital Prescription',
        'Clinical Pathology & Radiology Diagnostic Automation',
        'Sample Barcoding & Online Patient Test Report Delivery',
        'Doctor OPD Scheduling & Real-Time Queue Management',
      ];
    }
    return [
      'Isolated Multi-Tenant Architecture & Institutional Governance',
      'Dynamic Domain, Subdomain & Custom URL Routing',
      'Unified Super-Admin Analytics & Multi-Campus Oversight',
      'Enterprise Role-Based Access Control (RBAC) & Audit Logs',
    ];
  };

  const getProductHeadline = (slug: string, fallback: string) => {
    if (slug.includes('edumanage')) {
      return 'Simplifying Education Management Through Modern Technology.';
    }
    if (slug.includes('medisheba')) {
      return 'Bringing Healthcare & Clinical Diagnostic Operations Into One Platform.';
    }
    if (slug.includes('multi-institution')) {
      return 'Professional Digital Governance for Educational Networks & Chains.';
    }
    return fallback;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-[var(--bg-primary)] relative overflow-hidden" id="products">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 mrm-glow-blue blur-3xl pointer-events-none opacity-50" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 mrm-glow-cyan blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built &amp; Maintained by MRM InfoTech</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Our Software Products. Built Around Real-World Needs.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              We design and operate proprietary, battle-tested cloud platforms that help Bangladeshi organizations automate administration, safeguard records, and deliver superior digital services.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
              <button
                type="button"
                onClick={() => setViewMode('showcase')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'showcase'
                    ? 'bg-[#087FC4] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Alternating Deep Dive View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#087FC4] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Compact Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            <Link
              href="/products"
              className="px-4 py-2.5 rounded-xl mrm-glass-pill font-bold text-xs text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-1.5"
            >
              <span>All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* MODE A: Alternating Sticky Stacking Cards Showcase */}
        {viewMode === 'showcase' && (
          <div className="relative space-y-10 lg:space-y-14 pb-8">
            {products.map((product, index) => {
              const isEven = index % 2 === 1; // 0 = Left text, 1 = Right text (Alternating!)
              const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [];
              const currentImgIdx = activeImageIndexes[product.slug] || 0;
              const capabilities = getProductCapabilities(product.slug);
              const headline = getProductHeadline(product.slug, product.title);
              const stage = product.stage || 'LIVE';
              const stickyTopOffset = 84 + index * 24;

              return (
                <div
                  key={product.slug}
                  style={{
                    top: `${stickyTopOffset}px`,
                    zIndex: index + 10,
                  }}
                  className="sticky mrm-glass-card rounded-3xl p-7 sm:p-10 lg:p-12 border border-white/40 dark:border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-300 will-change-transform bg-white/95 dark:bg-[#07162C]/95 overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Column A: Content (Left on odd, Right on even) */}
                    <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Monogram, Category & Stage */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center shadow-md">
                          {getProductIcon(product.slug)}
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5]">
                          {product.category}
                        </span>

                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            stage === 'LIVE'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {stage}
                        </span>

                        {product.isSourcePrivate ? (
                          <span className="text-[11px] font-semibold text-amber-500 dark:text-amber-400 inline-flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md">
                            <Lock className="w-3 h-3" /> Private IP
                          </span>
                        ) : product.sourceCodeUrl ? (
                          <a
                            href={product.sourceCodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-1 hover:underline"
                          >
                            <Code2 className="w-3 h-3" /> Public Repo
                          </a>
                        ) : null}
                      </div>

                      {/* Product Title & Dynamic Headline */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                          {product.title}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-[#087FC4] dark:text-[#20B8D5] mt-1.5">
                          {headline}
                        </p>
                      </div>

                      {/* Summary / Description */}
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                        {product.description}
                      </p>

                      {/* Key Capabilities List */}
                      <div className="space-y-2.5 pt-2 border-t border-[var(--border-subtle)]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                          Key Capabilities:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-primary)]">
                          {capabilities.map((cap, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-tight">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions & CTAs */}
                      <div className="flex flex-wrap items-center gap-3 pt-4">
                        <Link
                          href={`/products/${product.slug}`}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5 transition-all"
                        >
                          <span>Explore Product</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {product.liveUrl && (
                          <a
                            href={product.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl mrm-glass-pill text-slate-800 dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                          >
                            <span>Visit Platform</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <Link
                          href={`/start-project?service=${product.slug}`}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#087FC4] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          Request a Demo
                        </Link>
                      </div>
                    </div>

                    {/* Column B: Large Interactive Dashboard Preview (Right on odd, Left on even) */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E3557] bg-slate-900 shadow-2xl group/dash aspect-video sm:aspect-[16/10]">
                        {images.length > 0 ? (
                          <>
                            <img
                              src={images[currentImgIdx]}
                              alt={`${product.title} Dashboard Interface`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/dash:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                            {/* Image Navigation Controls */}
                            {images.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => handlePrevImage(product.slug, images.length, e)}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/dash:opacity-100 transition-opacity z-10 cursor-pointer shadow-lg"
                                  aria-label="Previous image"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleNextImage(product.slug, images.length, e)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/dash:opacity-100 transition-opacity z-10 cursor-pointer shadow-lg"
                                  aria-label="Next image"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md">
                                  {images.map((_, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveImageIndexes((prev) => ({ ...prev, [product.slug]: i }));
                                      }}
                                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                        i === currentImgIdx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                                      }`}
                                      aria-label={`Slide ${i + 1}`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}

                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                              View {currentImgIdx + 1} of {images.length}
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#071A35] via-[#0B2548] to-[#103B68] text-white">
                            <div className="w-16 h-16 rounded-2xl bg-[#087FC4]/20 border border-[#20B8D5]/30 flex items-center justify-center mb-3">
                              {getProductIcon(product.slug)}
                            </div>
                            <h4 className="text-lg font-bold">{product.title}</h4>
                            <p className="text-xs text-slate-300 mt-1 max-w-xs">
                              {product.category}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE B: Compact Grid Cards View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => {
              const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [];
              const currentImgIdx = activeImageIndexes[product.slug] || 0;
              const stage = product.stage || 'LIVE';

              return (
                <div
                  key={product.slug || idx}
                  className="mrm-glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div>
                    {images.length > 0 ? (
                      <div className="relative h-60 w-full bg-slate-900 overflow-hidden group/img">
                        <img
                          src={images[currentImgIdx]}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                              stage === 'LIVE' ? 'bg-emerald-500/80 text-white' : 'bg-cyan-500/80 text-white'
                            }`}
                          >
                            {stage}
                          </span>
                        </div>

                        {/* Interactive Navigation in Grid mode (Up to 10 Images) */}
                        {images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => handlePrevImage(product.slug, images.length, e)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleNextImage(product.slug, images.length, e)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs max-w-[90%] overflow-x-auto">
                              {images.map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setActiveImageIndexes((prev) => ({ ...prev, [product.slug]: i }));
                                  }}
                                  className={`rounded-full transition-all cursor-pointer ${
                                    i === currentImgIdx
                                      ? 'bg-[#20B8D5] w-3 h-1.5'
                                      : 'bg-white/40 hover:bg-white/70 w-1.5 h-1.5'
                                  }`}
                                  aria-label={`Slide ${i + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 pb-0 flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center shadow-md">
                          {getProductIcon(product.slug)}
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5]">
                          {product.category}
                        </span>
                      </div>
                    )}

                    <div className="p-6 sm:p-8 pb-4">
                      <p className="text-[11px] font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider mb-1.5">
                        {product.category}
                      </p>
                      <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4 mt-auto">
                    <Link
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline"
                      href={`/products/${product.slug}`}
                    >
                      <span>Explore Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {product.isSourcePrivate ? (
                        <span className="text-[11px] font-semibold text-amber-500 dark:text-amber-400 inline-flex items-center gap-1" title="Confidential / Private Source">
                          <Lock className="w-3.5 h-3.5" /> Private
                        </span>
                      ) : product.sourceCodeUrl ? (
                        <a
                          href={product.sourceCodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[#087FC4] inline-flex items-center gap-1"
                        >
                          <Code2 className="w-3.5 h-3.5" /> Code
                        </a>
                      ) : null}

                      {product.liveUrl && (
                        <a
                          href={product.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[#087FC4] dark:hover:text-[#20B8D5] inline-flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

