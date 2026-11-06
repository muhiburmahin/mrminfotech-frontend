import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductsFinalCta() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--theme-bg-canvas)] border-t border-[var(--theme-border-glass)] relative overflow-hidden transition-colors duration-150">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Onboarding & Custom Deployment</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight max-w-3xl mx-auto leading-tight">
          Have a Challenge That Needs a{' '}
          <span className="text-[var(--theme-accent)]">Better Digital Solution?</span>
        </h2>

        <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Whether you need to automate institutional administration, streamline clinical workflows, or govern an entire multi-campus network, our engineering team is ready to deploy.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact?subject=Product%20Demo%20Request"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_25px_var(--theme-accent-glow)] hover:opacity-90 transition-all cursor-pointer"
          >
            <span>Request a Product Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all"
          >
            <span>Discuss Custom Software</span>
            <MessageSquare className="w-4 h-4 text-[var(--theme-text-muted)]" />
          </Link>
        </div>

        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-[var(--theme-text-muted)]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Data Sovereignty
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--theme-border-glass)]" />
          <span>Multi-Tenant Cloud</span>
          <span className="w-1 h-1 rounded-full bg-[var(--theme-border-glass)]" />
          <span>Direct Developer Support</span>
        </div>
      </div>
    </section>
  );
}
