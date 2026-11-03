import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { getProductBySlug } from '@/lib/api/public';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug, 'en');
  if (!product) {
    return { title: 'Product Not Found | MRM InfoTech' };
  }
  return {
    title: `${product.name} — ${product.tagline || 'Cloud SaaS'} | MRM InfoTech`,
    description: product.summary || 'Enterprise SaaS Platform engineered by MRM InfoTech Ltd.',
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug, 'en');

  if (!product) {
    notFound();
  }

  const features = product.features || [
    {
      title: 'Automated Workflows',
      description: 'Streamline administrative operations and reduce manual data entry errors.',
    },
    {
      title: 'Real-Time Telemetry & Reports',
      description: 'Instant statistical dashboards and regulatory report generation.',
    },
    {
      title: 'Multi-Role Access Control',
      description: 'Granular permissions safeguarding sensitive institutional information.',
    },
    {
      title: 'Local Gateway Integrations',
      description: 'Integrated bKash, Nagad, and SMS notification gateways out of the box.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* Product Banner */}
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] relative transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {product.stage}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                MRM InfoTech SaaS Ecosystem
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-xl text-[#087FC4] dark:text-[#00C2FF] font-semibold">
              {product.tagline}
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {product.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
              >
                <span>Request Institutional License</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0B1E3B] hover:bg-slate-100 dark:hover:bg-[#1E3557] hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-300 dark:border-[#1E3557] text-sm"
                >
                  <span>Explore Demo</span>
                  <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#00C2FF]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="py-24 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-16">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Engineered for Production Demands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] hover:border-[#087FC4] dark:hover:border-[#00C2FF] transition-all"
              >
                <div className="p-3 rounded-xl bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] w-fit mb-4 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#087FC4] dark:text-[#00C2FF]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment & Support CTA */}
      <section className="py-20 bg-slate-900 dark:bg-[#040E1C] text-white border-t border-slate-800 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to Onboard {product.name}?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Our deployment engineers provide end-to-end data migration, user training, and 24/7 SLA
            guarantees for all institutional partners.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
            >
              <span>Schedule Onboarding Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
