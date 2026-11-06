import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ShieldCheck, Zap, Server, Globe } from 'lucide-react';

interface ProductsCatalogHeroProps {
  totalProducts: number;
}

export default function ProductsCatalogHero({ totalProducts }: ProductsCatalogHeroProps) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-[var(--theme-border-glass)] overflow-hidden bg-[var(--theme-bg-canvas)] transition-colors duration-150">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
            <Zap className="w-3.5 h-3.5" />
            <span>Proprietary Cloud Platforms</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--theme-text-primary)] leading-[1.1]">
            Software Products Built to{' '}
            <span className="text-[var(--theme-accent)]">Make a Difference.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
            Discover purpose-built digital platforms designed to simplify operations, empower organizations, and solve real-world challenges with high security and reliability.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#product-portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_20px_var(--theme-accent-glow)] hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all"
            >
              <span>Request Custom Solution</span>
              <ArrowRight className="w-4 h-4 text-[var(--theme-text-muted)]" />
            </Link>
          </div>
        </div>

        {/* Real Dynamic Statistics Strip */}
        <div className="mt-14 pt-10 border-t border-[var(--theme-border-glass)] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--theme-text-primary)]">
              {totalProducts > 0 ? `${totalProducts} Production` : 'Enterprise'}
            </span>
            <p className="text-xs text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Active Cloud Products
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--theme-accent)]">
              100% Cloud
            </span>
            <p className="text-xs text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Multi-Tenant SaaS
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--theme-text-primary)]">
              256-Bit
            </span>
            <p className="text-xs text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> End-to-End Encryption
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--theme-text-primary)]">
              99.9%
            </span>
            <p className="text-xs text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Production SLA Uptime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

