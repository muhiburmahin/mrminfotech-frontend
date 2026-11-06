/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Building2,
  Layers,
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
  isFeatured?: boolean;
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
    const s = slug.toLowerCase();
    if (s.includes('edumanage')) return <GraduationCap className="w-6 h-6" />;
    if (s.includes('medisheba')) return <HeartPulse className="w-6 h-6" />;
    return <Building2 className="w-6 h-6" />;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] relative overflow-hidden transition-colors duration-150">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
              BUILT BY MRM INFOTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3 text-[var(--theme-text-primary)]">
              Our Products. Built Around Real-World Needs.
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              We are building focused technology products that help organizations manage their operations, connect with people, and create better digital experiences.
            </p>
          </div>
          <Link
            className="px-5 py-3 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] font-bold text-sm text-[var(--theme-accent)] inline-flex items-center gap-2 shrink-0 self-start md:self-auto hover:border-[var(--theme-accent)]/50 transition-all group/all"
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
                className="rounded-3xl overflow-hidden flex flex-col justify-between border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-lg hover:shadow-2xl hover:border-[var(--theme-accent)]/50 transition-all duration-300 group"
              >
                <div>
                  {/* Image Switcher / Slider Preview */}
                  {images.length > 0 ? (
                    <div className="relative h-52 w-full bg-black/60 overflow-hidden group/img border-b border-[var(--theme-border-glass)]">
                      <img
                        src={images[currentImgIdx]}
                        alt={product.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Stage Badge on top of image */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                          {stage}
                        </span>
                        {product.isFeatured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-accent-text)]">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Multi-image switcher */}
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => handlePrevImage(product.slug, images.length, e)}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer shadow-md"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleNextImage(product.slug, images.length, e)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer shadow-md"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-xs">
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
                                  i === currentImgIdx ? 'bg-[var(--theme-accent)] scale-110' : 'bg-white/40 hover:bg-white/70'
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
                      <div className="w-12 h-12 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shadow-md border border-[var(--theme-accent)]/30">
                        {getProductIcon(product.slug)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--theme-bg-canvas)] text-[var(--theme-accent)] border border-[var(--theme-border-glass)]">
                        {product.category || 'SaaS Platform'}
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[var(--theme-accent)] truncate">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-7 pt-4 border-t border-[var(--theme-border-glass)] flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] hover:opacity-80 transition-opacity"
                  >
                    <span>{product.ctaLabel || 'Explore Product'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {product.liveUrl && (
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all"
                    >
                      <ExternalLink className="w-3 h-3 text-[var(--theme-accent)]" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
