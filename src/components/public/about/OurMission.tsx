import React from 'react';
import { Target, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function OurMission() {
  const missionPillars = [
    {
      num: '01',
      title: 'Eliminate Operational Chaos',
      desc: 'Replacing fragmented paper systems and unstable legacy software with unified cloud software.',
    },
    {
      num: '02',
      title: 'Champion Long-Term Durability',
      desc: 'Architecting modular, future-proof codebases that scale cleanly alongside business expansion.',
    },
    {
      num: '03',
      title: 'Deliver Measurable Value',
      desc: 'Engineering systems with concrete operational ROI—saving thousands of hours across institutions.',
    },
  ];

  return (
    <section className="py-24 lg:py-36 bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border-t border-[var(--theme-border-glass)] transition-colors duration-200 relative overflow-hidden">
      {/* Central Volumetric Light Orb & Cyber Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--theme-accent)]/8 blur-[120px]"
      />
      
      {/* Subtle Background Geometric Circuit Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(var(--theme-accent)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Floating Emblem */}
        <div className="inline-flex items-center justify-center mb-8 relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-3xl bg-[var(--theme-accent)]/20 blur-xl animate-pulse"
          />
          <div className="w-16 h-16 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-[var(--theme-accent)] flex items-center justify-center shadow-2xl relative z-10">
            <Target className="w-8 h-8" />
          </div>
        </div>

        {/* Section Pill Label */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-[var(--theme-accent)] text-xs font-mono font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            OUR MISSION STATEMENT
          </span>
        </div>

        {/* The Hero Mission Statement */}
        <div className="relative max-w-4xl mx-auto my-6">
          {/* Subtle Decorative Quotation Watermark */}
          <span
            aria-hidden="true"
            className="absolute -top-12 -left-6 text-7xl sm:text-9xl font-serif text-[var(--theme-accent)]/10 select-none pointer-events-none font-bold"
          >
            “
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.22] font-sans">
            &ldquo;Our mission is to simplify complex challenges through innovative technology, building
            meaningful digital solutions that{' '}
            <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
              empower businesses and improve the way people work
            </span>
            .&rdquo;
          </h2>

          <span
            aria-hidden="true"
            className="absolute -bottom-16 -right-6 text-7xl sm:text-9xl font-serif text-[var(--theme-accent)]/10 select-none pointer-events-none font-bold"
          >
            ”
          </span>
        </div>

        {/* 3 Supporting Mission Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto text-left">
          {missionPillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 rounded-2xl bg-[var(--theme-bg-surface)]/80 backdrop-blur-xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/70 hover:border-[var(--theme-accent)] hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black text-[var(--theme-accent)]">
                  {pillar.num} • PURPOSE
                </span>
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mt-2">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="pt-12">
          <Link
            href="/about#technology"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors group"
          >
            <span>Learn How Our Engineering Process Fulfills This Mission</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
