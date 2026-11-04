/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Code2,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
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
  const name = product.title || product.name || product.translations?.[0]?.name || 'Product';
  const tagline = product.tagline || product.translations?.[0]?.tagline || 'Cloud SaaS';
  const summary = product.description || product.summary || product.translations?.[0]?.summary || 'Enterprise SaaS Platform engineered by MRM InfoTech Ltd.';

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
  const name = product.title || product.name || translation?.name || 'SaaS Product';
  const tagline = product.tagline || translation?.tagline || '';
  const summary = product.description || product.summary || translation?.summary || translation?.description || '';
  const stage = product.stage || 'LIVE';
  const color = product.brandColor || '#087FC4';
  const liveUrl = product.liveUrl || product.productSiteUrl || product.demoUrl;
  const images: string[] = Array.isArray(product.images) ? product.images : [];
  const caseStudy: string | null = product.caseStudy || null;

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
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  stage === 'LIVE'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : stage === 'BETA'
                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}
              >
                {stage}
              </span>

              {product.isSourcePrivate ? (
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Lock className="w-3.5 h-3.5" /> Proprietary Intellectual Property (Private Code)
                </span>
              ) : product.sourceCodeUrl ? (
                <a
                  href={product.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] border border-[#087FC4]/20 hover:underline"
                >
                  <Code2 className="w-3.5 h-3.5" /> Open Source / Public Repository
                </a>
              ) : null}

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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 transition-all shadow-lg text-sm"
              >
                <span>Request Enterprise License</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold mrm-glass-card text-slate-800 dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors text-sm"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                </a>
              )}

              {product.demoUrl && product.demoUrl !== liveUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold mrm-glass-card text-slate-800 dark:text-slate-200 transition-colors text-sm"
                >
                  <span>Interactive Demo</span>
                  <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Screenshot Gallery Section (if images exist) */}
      {images.length > 0 && (
        <section className="py-16 bg-slate-50/50 dark:bg-[#0B1E3B]/40 border-b border-slate-200 dark:border-[#1E3557]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> Product Showcase
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Interface Screenshots &amp; Workflows
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {images.length} views
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((imgUrl, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E3557] bg-slate-900 shadow-md group relative aspect-video"
                >
                  <img
                    src={imgUrl}
                    alt={`${name} screenshot ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                    Screen #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Architecture Highlights & Core Features */}
      {features.length > 0 && (
        <section className="py-20 bg-white dark:bg-[#07162C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Platform Architecture &amp; Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat: { title: string; description: string }, idx: number) => (
                <div key={idx} className="mrm-glass-card rounded-2xl p-6 space-y-3">
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

      {/* Case Study & Technical Architecture Details (if provided) */}
      {caseStudy && (
        <section className="py-20 bg-slate-50 dark:bg-[#0B1E3B]/30 border-y border-slate-200 dark:border-[#1E3557]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Engineering &amp; Case Study
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Case Study &amp; Technical Architecture Overview
              </h2>
            </div>

            <div className="mrm-glass-card rounded-2xl p-8 sm:p-10 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {caseStudy}
            </div>
          </div>
        </section>
      )}

      {/* CTA Box */}
      <section className="py-16 bg-[#F8FAFC] dark:bg-[#040D1A] border-t border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mrm-glass-card rounded-2xl p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ready to Deploy {name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Our engineering team handles full white-label configuration, database migration, and cloud deployment.
            </p>
            <div className="pt-2">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 transition-colors shadow-lg text-sm"
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
