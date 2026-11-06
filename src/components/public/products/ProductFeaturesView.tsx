'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Users,
  Activity,
  CreditCard,
  Layers,
  Shield,
  Smartphone,
  Globe,
  Palette,
  FileText,
  Settings,
} from 'lucide-react';
import type { ProductFeatureItem } from '@/types/product.types';

interface ProductFeaturesViewProps {
  features: ProductFeatureItem[];
  productTitle: string;
}

export default function ProductFeaturesView({
  features,
  productTitle,
}: ProductFeaturesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const set = new Set<string>();
    features.forEach((f) => {
      if (f.categoryName) set.add(f.categoryName);
    });
    return ['ALL', ...Array.from(set)];
  }, [features]);

  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'ALL') return features;
    return features.filter((f) => f.categoryName === activeCategory);
  }, [features, activeCategory]);

  const getFeatureIcon = (iconName?: string) => {
    const name = iconName?.toLowerCase() || '';
    if (name.includes('user') || name.includes('people')) return <Users className="w-5 h-5" />;
    if (name.includes('activity') || name.includes('heart')) return <Activity className="w-5 h-5" />;
    if (name.includes('card') || name.includes('credit') || name.includes('cash')) return <CreditCard className="w-5 h-5" />;
    if (name.includes('shield') || name.includes('lock') || name.includes('security')) return <Shield className="w-5 h-5" />;
    if (name.includes('phone') || name.includes('mobile')) return <Smartphone className="w-5 h-5" />;
    if (name.includes('globe') || name.includes('web')) return <Globe className="w-5 h-5" />;
    if (name.includes('palette') || name.includes('brush')) return <Palette className="w-5 h-5" />;
    if (name.includes('doc') || name.includes('file') || name.includes('text')) return <FileText className="w-5 h-5" />;
    if (name.includes('setting') || name.includes('gear')) return <Settings className="w-5 h-5" />;
    return <Layers className="w-5 h-5" />;
  };

  if (!features || features.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/40 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
            Comprehensive System Features
          </h2>
          <p className="text-base text-[var(--theme-text-secondary)] mt-2">
            Every module in {productTitle} is designed to eliminate operational friction and ensure strict business compliance.
          </p>
        </div>

        {/* Feature Category Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_15px_var(--theme-accent-glow)]'
                    : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40'
                }`}
              >
                {cat === 'ALL' ? `All Modules (${features.length})` : cat}
              </button>
            ))}
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feat, idx) => (
            <div
              key={feat.id || idx}
              className="rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 space-y-3.5 shadow-md hover:shadow-xl hover:border-[var(--theme-accent)]/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/30 group-hover:scale-110 transition-transform">
                  {getFeatureIcon(feat.icon)}
                </div>
                {feat.isFeatured && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/25">
                    Core Module
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                  {feat.title}
                </h3>
                {feat.categoryName && (
                  <span className="text-[10px] font-semibold text-[var(--theme-text-muted)] block mt-0.5">
                    {feat.categoryName}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {feat.shortDescription}
              </p>

              {feat.detailedDescription && (
                <p className="text-xs text-[var(--theme-text-muted)] pt-1 border-t border-[var(--theme-border-glass)] leading-relaxed">
                  {feat.detailedDescription}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

