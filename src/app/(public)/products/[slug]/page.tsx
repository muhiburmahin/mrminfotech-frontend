import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await PublicApiService.getProductBySlug(slug, 'en');
  if (!product) {
    return { title: 'Product Not Found | MRM InfoTech' };
  }
  const name = product.name || product.translations?.[0]?.name || 'Product';
  const tagline = product.tagline || product.translations?.[0]?.tagline || 'Cloud SaaS';
  const summary = product.summary || product.translations?.[0]?.summary || 'Enterprise SaaS Platform engineered by MRM InfoTech Ltd.';

  return {
    title: `${name} — ${tagline} | MRM InfoTech`,
    description: summary,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await PublicApiService.getProductBySlug(slug, 'en');

  if (!product) {
    notFound();
  }

  const translation = product.translations?.[0];
  const name = product.name || translation?.name || 'SaaS Product';
  const tagline = product.tagline || translation?.tagline || '';
  const summary = product.summary || translation?.summary || product.description || translation?.description || '';
  const stage = product.stage || 'LIVE';
  const color = product.brandColor || '#087FC4';

  const rawFeatures = product.features || translation?.features || [];
  const features = rawFeatures.map((f: unknown) => {
    if (typeof f === 'string') return { title: f, description: '' };
    const obj = f as { title?: string; description?: string };
    return { title: obj.title || '', description: obj.description || '' };
  });

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* Product Banner */}
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] relative transition-colors duration-150 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#087FC4]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#20B8D5]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {stage}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                MRM InfoTech SaaS Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              {name}
            </h1>
            {tagline && (
              <p className="text-xl text-[#087FC4] dark:text-[#20B8D5] font-semibold">
                {tagline}
              </p>
            )}
            {summary && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {summary}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/start-project?service=${slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
              >
                <span>Request Enterprise License</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {product.productSiteUrl && (
                <a
                  href={product.productSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold liquid-glass-card text-slate-800 dark:text-slate-200 transition-colors text-sm"
                >
                  <span>Visit Product Website</span>
                  <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                </a>
              )}

              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold liquid-glass-card text-slate-800 dark:text-slate-200 transition-colors text-sm"
                >
                  <span>Interactive Demo</span>
                  <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Highlights & Core Features */}
      {features.length > 0 && (
        <section className="py-20 bg-white dark:bg-[#07162C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
                Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Platform Architecture & Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat: { title: string; description: string }, idx: number) => (
                <div key={idx} className="liquid-glass-card rounded-2xl p-6 space-y-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: color }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  {feat.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Box */}
      <section className="py-16 bg-[#F8FAFC] dark:bg-[#040D1A] border-t border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="liquid-glass rounded-2xl p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ready to Deploy {name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Our engineering team handles full white-label configuration, database migration, and cloud deployment.
            </p>
            <div className="pt-2">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
