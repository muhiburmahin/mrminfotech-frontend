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
    if (slug.includes('edu') || slug.includes('school')) return GraduationCap;
    if (slug.includes('med') || slug.includes('health')) return HeartPulse;
    return Building2;
  };

  return (
    <section className="py-20 bg-[#F8FAFC] dark:bg-[#040D1A] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3 shadow-xs">
              <Package className="w-3.5 h-3.5" />
              <span>PROPRIETARY SAAS ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#15243A] dark:text-white tracking-tight">
              Our Flagship Software Products
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Purpose-built digital platforms solving real-world challenges in education, healthcare, and multi-institutional governance.
            </p>
          </div>

          {hasProducts && (
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:gap-3 transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products!.map((item) => {
              const translation = item.translations?.[0];
              const name = item.name || translation?.name || 'SaaS Product';
              const tagline = item.tagline || translation?.tagline || '';
              const summary = item.summary || translation?.summary || item.description || translation?.description || '';
              const slug = item.slug;
              const stage = item.stage || 'LIVE';
              const Icon = getProductIcon(slug);
              const color = item.brandColor || '#087FC4';

              // Normalize features
              const rawFeatures = item.features || translation?.features || [];
              const features = rawFeatures.map((f) => (typeof f === 'string' ? f : f.title)).slice(0, 4);

              return (
                <div
                  key={slug || item.id}
                  className="liquid-glass-card rounded-2xl p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {stage}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                        {name}
                      </h3>
                      {tagline && (
                        <p className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mt-0.5">
                          {tagline}
                        </p>
                      )}
                      {summary && (
                        <p className="mt-2.5 text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed line-clamp-3">
                          {summary}
                        </p>
                      )}
                    </div>

                    {features.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1E3557]/60">
                        {features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                    <Link
                      href={`/products/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:gap-2.5 transition-all"
                    >
                      <span>Explore Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {item.productSiteUrl && (
                      <a
                        href={item.productSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors p-1"
                        title="Open Product Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
