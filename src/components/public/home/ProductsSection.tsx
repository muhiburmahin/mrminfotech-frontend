import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import type { ProductItem } from '@/lib/api/types';

interface FeaturedProductsProps {
  products: ProductItem[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const getProductIcon = (slug: string) => {
    switch (slug) {
      case 'edumanage-bd':
        return <GraduationCap className="w-7 h-7 text-[#0052CC]" />;
      case 'medisheba-bd':
        return <HeartPulse className="w-7 h-7 text-[#00C2FF]" />;
      case 'multi-institution-platform':
      default:
        return <Building2 className="w-7 h-7 text-indigo-400" />;
    }
  };

  const getProductHighlights = (slug: string) => {
    switch (slug) {
      case 'edumanage-bd':
        return [
          'Full Student Information & Grading System (SIS)',
          'Automated Tuition Fees & bKash/Nagad Reconciliation',
          'Biometric & RFID Attendance Integration',
          'Parent Portal & SMS Notification Gateway',
        ];
      case 'medisheba-bd':
        return [
          'Digital Prescription & EMR / EHR Management',
          'Diagnostic Pathology & Radiology Lab Workflows',
          'Doctor Scheduling & Patient Queue Automation',
          'Encrypted Cloud Patient Portal & SMS Telemetry',
        ];
      case 'multi-institution-platform':
      default:
        return [
          'Dynamic Multi-Tenant Domain & Subdomain Routing',
          'Isolated Database Schema / Row-Level Governance',
          'Unified Super-Admin Institutional Analytics',
          'Enterprise RBAC with Granular Permission Sets',
        ];
    }
  };

  return (
    <section id="products" className="py-24 bg-[#07162C] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1E3B] border border-[#1E3557] text-xs font-bold text-[#00C2FF] uppercase tracking-wider">
            <span>Proprietary Cloud Platforms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Flagship SaaS Products Built for Critical Domains
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Engineered from the ground up for high reliability, zero data leakage, and
            comprehensive operational automation across Bangladesh.
          </p>
        </div>

        {/* 3 Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const highlights = getProductHighlights(product.slug);

            return (
              <div
                key={product.id || product.slug}
                className="flex flex-col justify-between rounded-2xl bg-[#0B1E3B] border border-[#1E3557] hover:border-[#00C2FF]/50 transition-all duration-300 p-8 shadow-xl hover:shadow-2xl hover:shadow-[#00C2FF]/10 group"
              >
                <div>
                  {/* Top Bar: Icon + Stage Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-[#07162C] border border-[#1E3557] shadow-inner group-hover:scale-105 transition-transform">
                      {getProductIcon(product.slug)}
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                        product.stage === 'LIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {product.stage}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#00C2FF] mt-1 tracking-wide uppercase">
                    {product.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed mt-4">
                    {product.summary}
                  </p>

                  {/* Feature Highlights */}
                  <div className="mt-6 pt-6 border-t border-[#1E3557]/80 space-y-2.5">
                    {highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 pt-6 border-t border-[#1E3557] flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#00C2FF] transition-colors"
                  >
                    <span>Product Overview</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-[#07162C] hover:bg-[#1E3557] hover:text-white transition-colors border border-[#1E3557]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#0B1E3B] via-[#07162C] to-[#0B1E3B] border border-[#1E3557] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#00C2FF] shrink-0" />
            <p className="text-sm text-slate-300">
              Need on-premise installation or custom institutional module integrations?
            </p>
          </div>
          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shrink-0"
          >
            <span>Request Institutional Licensing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
