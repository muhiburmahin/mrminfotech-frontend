'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Layers, Cloud, Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, Lock, Zap, Activity, Terminal, ShieldCheck, Check, Globe2 } from 'lucide-react';
import { CTAButton } from '@/components/ui/design-system/CTAButton';

export interface HomeServiceCardItem {
  slug: string;
  title?: string;
  name?: string;
  summary?: string;
  description?: string;
  sortOrder?: number;
  order?: number;
  icon?: string | null;
}

interface ModernServicesSectionProps {
  services: HomeServiceCardItem[];
}

export function ModernServicesSection({ services }: ModernServicesSectionProps) {
  const topServices = services.slice(0, 6);

  const getServiceMetadata = (slug: string, index: number) => {
    switch (slug) {
      case 'web-application-development':
        return {
          serial: '01',
          category: 'CLOUD & WEB PLATFORMS',
          accentColor: '#3B82F6',
          icon: Globe2,
          metric: '⚡ 99.8% Lighthouse Performance Score',
          highlights: [
            'Next.js 16 & React 19 server-side rendering',
            'Fluid responsiveness across all device viewports',
            'Global low-latency CDN edge caching',
          ],
          pills: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Edge CDN'],
          renderGraphic: () => (
            <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/80 p-3.5 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--theme-border-glass)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[var(--theme-text-muted)] bg-[var(--theme-bg-surface)] px-2.5 py-0.5 rounded-md border border-[var(--theme-border-glass)]">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="truncate max-w-[140px]">app.mrminfotech.com</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--theme-text-secondary)]">Edge Latency:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> 14ms (Singapore Edge)
                </span>
              </div>
              <div className="w-full bg-[var(--theme-border-glass)] h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-[96%]" />
              </div>
            </div>
          ),
        };

      case 'custom-software-development':
        return {
          serial: '02',
          category: 'ENTERPRISE ARCHITECTURE',
          accentColor: '#6366F1',
          icon: Cpu,
          metric: '⚡ High-Concurrency REST & gRPC Engine',
          highlights: [
            'Bespoke domain logic tailored to business flows',
            'Zero-trust role-based authorization (RBAC)',
            'PostgreSQL pooled transaction isolation',
          ],
          pills: ['NestJS', 'PostgreSQL', 'Docker', 'Redis Queue'],
          renderGraphic: () => (
            <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/80 p-3.5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--theme-border-glass)] text-[10px] text-[var(--theme-text-muted)]">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-[var(--theme-accent)]" /> API Gateway
                </span>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
              <div className="text-[11px] space-y-1 text-[var(--theme-text-secondary)]">
                <div className="flex items-center justify-between">
                  <span className="text-blue-400">POST /api/v1/dispatch</span>
                  <span className="text-[10px] text-[var(--theme-text-muted)]">12ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400">GET /api/v1/telemetry</span>
                  <span className="text-[10px] text-[var(--theme-text-muted)]">8ms</span>
                </div>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-[var(--theme-text-muted)] border-t border-[var(--theme-border-glass)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Pool: 32 Connections Active</span>
              </div>
            </div>
          ),
        };

      case 'mobile-app-development':
        return {
          serial: '03',
          category: 'CROSS-PLATFORM MOBILE',
          accentColor: '#8B5CF6',
          icon: Smartphone,
          metric: '⚡ 60 FPS Native Performance',
          highlights: [
            'Single clean codebase for iOS and Android',
            'Offline SQLite database synchronization',
            'Instant push alerts & biometric authentication',
          ],
          pills: ['Flutter', 'React Native', 'SQLite Sync', 'Push Engine'],
          renderGraphic: () => (
            <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/80 p-3.5 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-[var(--theme-text-muted)] pb-1.5 border-b border-[var(--theme-border-glass)]">
                <span>iOS 18 • Android 15</span>
                <span className="text-emerald-400 font-bold">Native Build</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--theme-text-secondary)]">Frame Rate:</span>
                <span className="text-[var(--theme-accent)] font-bold">60.0 FPS Steady</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--theme-text-secondary)]">Offline Sync:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Synced
                </span>
              </div>
            </div>
          ),
        };

      case 'enterprise-erp-solutions':
        return {
          serial: '04',
          category: 'INSTITUTIONAL SAAS & ERP',
          accentColor: '#10B981',
          icon: Layers,
          metric: '⚡ Automated Double-Entry Ledger',
          highlights: [
            'Multi-branch central operations & inventory sync',
            'Dynamic role permissions for accounts & audit',
            'Automated invoice generation & tax reconciliation',
          ],
          pills: ['Multi-Branch', 'Automated Ledger', 'Custom RBAC', 'Audit Logs'],
          renderGraphic: () => (
            <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/80 p-3.5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--theme-border-glass)] text-[10px] text-[var(--theme-text-muted)]">
                <span>Enterprise Ledger</span>
                <span className="text-emerald-400 font-bold">100% Balanced</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-1.5 rounded bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
                  <span className="text-[var(--theme-text-muted)] block">Branches</span>
                  <span className="font-bold text-[var(--theme-text-primary)]">12 Online</span>
                </div>
                <div className="p-1.5 rounded bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
                  <span className="text-[var(--theme-text-muted)] block">Daily Sync</span>
                  <span className="font-bold text-emerald-400">Automated</span>
                </div>
              </div>
            </div>
          ),
        };

      case 'cloud-devops-infrastructure':
        return {
          serial: '05',
          category: 'DEVOPS & CLOUD INFRASTRUCTURE',
          accentColor: '#06B6D4',
          icon: Cloud,
          metric: '⚡ 99.99% Guaranteed Cloud SLA',
          highlights: [
            'Automated zero-downtime CI/CD deployment pipelines',
            'Containerized Docker & Kubernetes clustering',
            'Automated daily off-site backups & disaster recovery',
          ],
          pills: ['Docker', 'Cloudflare', 'PostgreSQL Pooling', 'CI/CD Pipelines'],
          renderGraphic: () => (
            <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/80 p-3.5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--theme-border-glass)] text-[10px] text-[var(--theme-text-muted)]">
                <span>Pipeline Stage</span>
                <span className="text-emerald-400 font-bold">Passed (42s)</span>
              </div>
              <div className="flex items-center justify-between gap-1 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/25">Build</span>
                <span className="text-[var(--theme-text-muted)]">➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">Test</span>
                <span className="text-[var(--theme-text-muted)]">➔</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/25">Deploy</span>
              </div>
              <div className="text-[10px] text-emerald-400 pt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Downtime Deployment Verified</span>
              </div>
            </div>
          ),
        };

      case 'ai-machine-learning-solutions':
      default:
        return {
          serial: String(index + 1).padStart(2, '0'),
          category: 'INTELLIGENT AI AUTOMATION',
          accentColor: '#EC4899',
          icon: Sparkles,
          metric: '⚡ Vector Embeddings & LLM Pipelines',
          highlights: [
            'Domain-specific RAG architectures on sovereign data',
            'Automated data extraction & document processing',
            'Strict enterprise privacy & zero data retention',
          ],
          pills: ['LLM Pipelines', 'RAG Engine', 'Vector DB', 'Automation'],
          renderGraphic: () => (
            <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/80 p-3.5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--theme-border-glass)] text-[10px] text-[var(--theme-text-muted)]">
                <span>Inference Stream</span>
                <span className="text-emerald-400 font-bold">0.18s Latency</span>
              </div>
              <div className="text-[11px] text-[var(--theme-text-secondary)] bg-[var(--theme-bg-surface)] p-2 rounded-lg border border-[var(--theme-border-glass)] flex items-center justify-between">
                <span className="truncate">Embedding Vector: 1,536 Dim</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-1" />
              </div>
              <div className="text-[10px] text-[var(--theme-text-muted)] flex items-center gap-1">
                <Activity className="w-3 h-3 text-[var(--theme-accent)]" />
                <span>Strict Enterprise Privacy Guardrails</span>
              </div>
            </div>
          ),
        };
    }
  };

  const formatTitle = (title?: string, slug?: string): string => {
    if (title && !title.includes('-')) return title;
    const raw = title || slug || '';
    return raw
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-16">
      {/* 6 High-Craft Eye-Catching Service Cards (3x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {topServices.map((service, index) => {
          const meta = getServiceMetadata(service.slug, index);
          const Icon = meta.icon;

          return (
            <motion.div
              key={service.slug}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/80 bg-[var(--theme-bg-surface)] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.65)] hover:border-[var(--theme-accent)] hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15),0_0_35px_var(--theme-accent-glow)] transition-all duration-300 overflow-hidden"
            >
              {/* Subtle Ambient Radial Glow on Hover */}
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-44 h-44 bg-[var(--theme-accent)]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-150 group-hover:opacity-100 transition-all duration-500 opacity-60"
              />

              <div className="space-y-5 relative z-10">
                {/* Header: Serial Badge, Category Tag & Interactive Icon */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-[var(--theme-accent)] px-2.5 py-1 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30">
                      #{meta.serial}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[var(--theme-text-muted)] tracking-wider uppercase">
                      {meta.category}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shadow-sm group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Service Title & Summary */}
                <div>
                  <h3 className="text-xl font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors">
                    {formatTitle(service.title, service.slug)}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-secondary)] line-clamp-2 leading-relaxed">
                    {service.summary || service.description || 'Enterprise software architecture and tailored digital engineering.'}
                  </p>
                </div>

                {/* Eye-Catching Bespoke Micro-Graphic Visual */}
                <div className="pt-1">
                  {meta.renderGraphic()}
                </div>

                {/* Key Deliverables Checklist */}
                <div className="space-y-2 pt-1 border-t border-[var(--theme-border-glass)]">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
                    Engineering Deliverables
                  </p>
                  <div className="space-y-1.5">
                    {meta.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-[var(--theme-text-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {meta.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] group-hover:border-[var(--theme-accent)]/30 transition-colors"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer: Action Link */}
              <div className="mt-6 pt-4 border-t border-[var(--theme-border-glass)] flex items-center justify-between relative z-10">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-[var(--theme-accent)] tracking-wider uppercase inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <ArrowUpRight className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prominent High-Visibility Services CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-xs font-extrabold uppercase tracking-widest border border-[var(--theme-accent)]/20">
            <span>LOOKING FOR BESPOKE ENGINEERING?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--theme-text-primary)]">
            Explore Our Complete Engineering &amp; Software Catalog
          </h3>
          <p className="text-sm text-[var(--theme-text-secondary)] max-w-2xl">
            From high-throughput APIs and mobile platforms to institutional ERP ecosystems and sovereign AI pipelines, discover how MRM InfoTech turns your vision into reality.
          </p>
        </div>
        <div className="shrink-0">
          <CTAButton href="/services" size="lg" className="shadow-[0_0_24px_var(--theme-accent-glow)]">
            View All Services (12+ Solutions) <ArrowRight className="w-4 h-4 ml-1 inline-block" />
          </CTAButton>
        </div>
      </div>
    </div>
  );
}