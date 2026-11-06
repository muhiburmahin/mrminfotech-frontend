/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  GraduationCap,
  HeartPulse,
  Building2,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import type { ProductRecord, ProductCategory } from '@/types/product.types';

interface ProductsCatalogClientProps {
  initialProducts: ProductRecord[];
  categories: ProductCategory[];
}

export default function ProductsCatalogClient({
  initialProducts,
  categories,
}: ProductsCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  // Collect unique category names
  const categoryOptions = useMemo(() => {
    const list: Array<{ label: string; value: string }> = [{ label: 'All Products', value: 'ALL' }];

    // If categories prop is available, use those
    if (categories && categories.length > 0) {
      categories.forEach((c) => {
        if (!list.some((item) => item.value === c.name)) {
          list.push({ label: c.name, value: c.name });
        }
      });
    }

    // Also collect from products to be 100% resilient
    initialProducts.forEach((p) => {
      const cat = p.categoryName || p.productType;
      if (cat && !list.some((item) => item.value === cat)) {
        list.push({ label: cat, value: cat });
      }
    });

    return list;
  }, [categories, initialProducts]);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        product.categoryName === selectedCategory ||
        product.productType === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q) ||
        (product.tagline && product.tagline.toLowerCase().includes(q)) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(q)) ||
        (product.features &&
          product.features.some((f) => f.title.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  const handlePrevImage = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[slug] || 0;
      return { ...prev, [slug]: (current - 1 + total) % total };
    });
  };

  const handleNextImage = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[slug] || 0;
      return { ...prev, [slug]: (current + 1) % total };
    });
  };

  const getProductIcon = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes('edumanage')) return <GraduationCap className="w-5 h-5" />;
    if (s.includes('medisheba')) return <HeartPulse className="w-5 h-5" />;
    return <Building2 className="w-5 h-5" />;
  };

  return (
    <section
      id="product-portfolio"
      className="py-16 sm:py-24 bg-[var(--theme-bg-canvas)] transition-colors duration-150 relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Subtitle */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
            Verified Cloud Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-3">
            Explore All Enterprise Platforms
          </h2>
          <p className="text-base text-[var(--theme-text-secondary)]">
            Each platform is engineered with modern architecture, automated workflows, and sovereign enterprise reliability.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--theme-border-glass)]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categoryOptions.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_15px_var(--theme-accent-glow)]'
                      : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-text-primary)]'
                  }`}
                >
                  {cat.label}
                  {cat.value === 'ALL' && ` (${initialProducts.length})`}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[260px] md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search products, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty Search Result State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/50 p-8">
            <Filter className="w-12 h-12 text-[var(--theme-accent)] mx-auto mb-4 opacity-60" />
            <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2">
              No products found
            </h3>
            <p className="text-sm text-[var(--theme-text-secondary)] max-w-md mx-auto mb-6">
              No software products match your current search query or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:opacity-90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid — Asymmetric / Responsive Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => {
              const mediaList =
                product.mediaItems && product.mediaItems.length > 0
                  ? product.mediaItems
                  : (product.images || []).map((url, i) => ({
                      id: `img-${i}`,
                      url,
                      title: product.title,
                      caption: '',
                      mediaType: 'SCREENSHOT' as const,
                      isPrimary: i === 0,
                      displayOrder: i + 1,
                    }));

              const totalImages = mediaList.length;
              const currentImgIdx = activeImageIndexes[product.slug] || 0;
              const currentImage = mediaList[currentImgIdx] || mediaList[0];
              const keyFeatures = (product.features || []).slice(0, 3);

              return (
                <div
                  key={product.slug || product.id || idx}
                  className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[var(--theme-accent)]/50 transition-all duration-300 group"
                >
                  {/* Top Card Visual: Screenshot Carousel */}
                  <div className="relative aspect-[16/10] bg-black/40 overflow-hidden border-b border-[var(--theme-border-glass)]">
                    {currentImage?.url ? (
                      <img
                        src={currentImage.url}
                        alt={currentImage.title || `${product.title} interface`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[var(--theme-text-muted)]">
                        <Layers className="w-8 h-8 mb-2 opacity-50 text-[var(--theme-accent)]" />
                        <p className="text-xs">Live Cloud Platform</p>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Stage Badge on Top Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {product.stage || 'LIVE'}
                      </span>
                      {product.isFeatured && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[var(--theme-accent)]/90 text-[var(--theme-accent-text)]">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    {/* Carousel Nav Buttons */}
                    {totalImages > 1 && (
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handlePrevImage(product.slug, totalImages, e)}
                          className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white border border-white/20 hover:bg-black transition-all cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(product.slug, totalImages, e)}
                          className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white border border-white/20 hover:bg-black transition-all cursor-pointer"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Category Label at bottom of image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-[11px] font-semibold text-white/90 drop-shadow-md truncate">
                        {product.categoryName || product.productType}
                      </span>
                      {totalImages > 1 && (
                        <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {currentImgIdx + 1}/{totalImages}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/30">
                          {getProductIcon(product.slug)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                            {product.title}
                          </h3>
                          {product.tagline && (
                            <p className="text-xs text-[var(--theme-text-muted)] line-clamp-1">
                              {product.tagline}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed line-clamp-3">
                        {product.shortDescription || product.description}
                      </p>

                      {/* Key Capabilities Pills */}
                      {keyFeatures.length > 0 && (
                        <div className="space-y-1.5 pt-2">
                          {keyFeatures.map((feat) => (
                            <div
                              key={feat.id}
                              className="flex items-center gap-2 text-xs text-[var(--theme-text-secondary)]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                              <span className="truncate">{feat.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-[var(--theme-border-glass)] flex items-center justify-between gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] hover:opacity-80 transition-opacity"
                      >
                        <span>Explore Product</span>
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

