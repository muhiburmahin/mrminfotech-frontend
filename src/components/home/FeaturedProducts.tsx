'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Package,
} from 'lucide-react';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { GlassCard } from '@/components/ui/design-system/GlassCard';
import { MasonryGrid } from '@/components/ui/design-system/MasonryGrid';

interface ProductItem {
  id: string;
  slug: string;
  stage?: string;
  brandColor?: string | null;
  productSiteUrl?: string | null;
  demoUrl?: string | null;
  isFeatured?: boolean;
  name?: string;
  tagline?: string | null;
  summary?: string | null;
  description?: string | null;
  features?: Array<{ title: string; description?: string } | string>;
  translations?: Array<{
    name?: string;
    tagline?: string | null;
    summary?: string | null;
    description?: string | null;
    features?: Array<{ title: string; description?: string } | string>;
  }>;
}

interface FeaturedProductsProps {
  products?: ProductItem[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const hasProducts = Boolean(products && products.length > 0);

  const getProductIcon = (slug: string) => {
    if (slug.includes('edu') || slug.includes('school')) return <GraduationCap className="w-5 h-5 text-white" />;
    if (slug.includes('med') || slug.includes('health')) return <HeartPulse className="w-5 h-5 text-white" />;
    return <Building2 className="w-5 h-5 text-white" />;
  };

  return (
    <section className="py-24 bg-[#0B0B0C] border-b border-white/10 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white mb-3 shadow-xs">
              <Package className="w-3.5 h-3.5" />
              <span>PROPRIETARY SAAS ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight">
              Our Flagship Software Products
            </h2>
            <p className="mt-3 text-base text-white/70">
              Purpose-built digital platforms solving real-world challenges in education, healthcare, and multi-institutional governance.
            </p>
          </div>

          {hasProducts && (
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white hover:gap-3 transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasProducts ? (
          <MasonryGrid category="Products">
            {products!.map((item) => {
              const translation = item.translations?.[0];
              const name = item.name || translation?.name || 'SaaS Product';
              const tagline = item.tagline || translation?.tagline || '';
              const summary = item.summary || translation?.summary || item.description || translation?.description || '';
              const slug = item.slug;
              const stage = item.stage || 'LIVE';
              const icon = getProductIcon(slug);

              // Normalize features
              const rawFeatures = item.features || translation?.features || [];
              const features = rawFeatures.map((f) => (typeof f === 'string' ? f : f.title)).slice(0, 3);

              return (
                <GlassCard
                  key={slug || item.id}
                  title={name}
                  subtitle={tagline || undefined}
                  description={summary}
                  tag={stage}
                  icon={icon}
                  ctaText="Explore Platform"
                  ctaHref={`/products/${slug}`}
                  metaInfo={
                    item.productSiteUrl ? (
                      <a
                        href={item.productSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : undefined
                  }
                >
                  {features.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      {features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/60 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </MasonryGrid>
        ) : (
          <GlassEmptyState
            badge="Proprietary SaaS"
            title="No Products Published Yet"
            description="Our flagship products (EduManage BD, MediSheba BD, and Multi-Institution Platform) are managed through the database."
            adminHref="/admin/dashboard/products"
            adminLabel="Manage Products in Admin CMS"
            publicHref="/contact"
            publicLabel="Inquire About Products"
          />
        )}
      </div>
    </section>
  );
}
