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
  GraduationCap,
  HeartPulse,
  Building2,
} from 'lucide-react';

export interface HomeProductItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  images?: string[];
  liveUrl?: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  stage?: string;
  ctaLabel?: string;
}

interface HomeProductsSectionProps {
  products: HomeProductItem[];
}

export default function HomeProductsSection({ products }: HomeProductsSectionProps) {
  // Track active image index for each product
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

  if (!products || products.length === 0) return null;

  return (
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
              We are building focused technology products that help organizations manage their operations, connect with people, and create better digital experiences.
            </p>
          </div>
          <Link
            className="px-5 py-3 rounded-[10px] mrm-glass-pill font-bold text-sm text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-2 shrink-0 self-start md:self-auto group/all"
            href="/products"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
          </Link>
        </div>

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
                  {/* Image Switcher / Slider Preview */}
                  {images.length > 0 ? (
                    <div className="relative h-52 w-full bg-slate-900 overflow-hidden group/img">
                      <img
                        src={images[currentImgIdx]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                      {/* Gradient overlay for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                      {/* Stage Badge on top of image */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                            stage === 'LIVE'
                              ? 'bg-emerald-500/80 text-white'
                              : stage === 'BETA'
                              ? 'bg-cyan-500/80 text-white'
                              : 'bg-amber-500/80 text-white'
                          }`}
                        >
                          {stage}
                        </span>
                      </div>

                      {/* Multi-image indicator and switcher */}
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => handlePrevImage(product.slug, images.length, e)}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer shadow-md"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleNextImage(product.slug, images.length, e)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer shadow-md"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
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
                                  i === currentImgIdx ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
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
                        {product.category || 'SaaS Platform'}
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 pb-4">
                    {images.length > 0 && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5] block mb-1">
                        {product.category || 'SaaS Platform'}
                      </span>
                    )}

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                      {product.description || product.category}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 sm:px-8 py-5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4 mt-auto">
                  <Link
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline group/cta"
                    href={`/products/${product.slug}`}
                  >
                    <span>{product.ctaLabel || 'Explore Product'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-2.5">
                    {product.isSourcePrivate ? (
                      <span
                        className="text-[11px] font-semibold text-amber-500 dark:text-amber-400 inline-flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md"
                        title="Source Code is Private IP"
                      >
                        <Lock className="w-3 h-3" /> Private
                      </span>
                    ) : product.sourceCodeUrl ? (
                      <a
                        href={product.sourceCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-1 hover:underline"
                        title="View Public Source Code"
                      >
                        <Code2 className="w-3 h-3" /> Code
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
      </div>
    </section>
  );
}
