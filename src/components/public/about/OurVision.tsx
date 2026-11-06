import React from 'react';
import { Compass, Sparkles, ShieldCheck, Globe2, Radio, Check } from 'lucide-react';
import Link from 'next/link';

export default function OurVision() {
  const visionMilestones = [
    {
      label: 'Multi-Tenant Cloud Ecosystems',
      description: 'Scaling centralized software architectures that power hundreds of simultaneous institutions without friction.',
    },
    {
      label: 'AI-Enhanced Operational Workflows',
      description: 'Embedding automated diagnostics, intelligent grading, and predictive telemetry across all platforms.',
    },
    {
      label: 'Regional to Global Reach',
      description: 'Exporting durable Bangladesh-engineered software products to global emerging markets.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 text-[var(--theme-text-primary)] border-t border-[var(--theme-border-glass)] transition-colors duration-200 relative overflow-hidden">
      {/* Background Soft Accent Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[500px] h-[300px] rounded-full bg-[var(--theme-accent)]/8 blur-[100px]"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/95 backdrop-blur-2xl shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)]">
          {/* Ambient Inner Gradient Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-80"
          />

          {/* Left Column: Vision Statement & Strategic Horizons (8 cols) */}
          <div className="lg:col-span-8 space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-[var(--theme-accent)] text-xs font-mono font-bold uppercase tracking-widest">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>LONG-TERM STRATEGIC VISION • 2026 &amp; BEYOND</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.18]">
              To become a trusted technology company that creates{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                impactful digital products
              </span>{' '}
              and scalable solutions.
            </h2>

            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-3xl">
              Helping businesses, educational institutions, healthcare providers, and communities move
              confidently toward a smarter, more connected future through reliable engineering and continuous innovation.
            </p>

            {/* 3 Vision Strategic Horizons */}
            <div className="space-y-3 pt-2">
              {visionMilestones.map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 rounded-2xl bg-[var(--theme-bg-canvas)]/70 border border-[var(--theme-border-glass)] flex items-start gap-3.5 hover:border-[var(--theme-accent)]/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--theme-text-primary)]">
                      {item.label}
                    </h3>
                    <p className="text-xs text-[var(--theme-text-secondary)] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--theme-accent)] hover:underline"
              >
                <span>Discover the SaaS Platforms Building This Vision</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Holographic Orbital Tech Radar / Monogram Hub (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center select-none">
              {/* Outer Pulsing Aura Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-[var(--theme-accent)]/20 animate-ping opacity-25"
                style={{ animationDuration: '4s' }}
              />

              {/* Middle Rotating Geometric Radar Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full border-2 border-dashed border-[var(--theme-accent)]/40 animate-spin-slow"
                style={{ animationDuration: '24s' }}
              />

              {/* Orbital Nodes */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--theme-accent)] shadow-[0_0_12px_var(--theme-accent-glow)] animate-pulse" />
              <div className="absolute bottom-4 right-8 w-2.5 h-2.5 rounded-full bg-[var(--theme-accent)]/80 shadow-[0_0_8px_var(--theme-accent-glow)]" />
              <div className="absolute left-6 top-1/3 w-2 h-2 rounded-full bg-[var(--theme-accent)]/60" />

              {/* Central Monogram Plate */}
              <div className="w-32 h-32 rounded-3xl bg-[var(--theme-bg-surface)] border-2 border-[var(--theme-border-glass)] shadow-2xl flex flex-col items-center justify-center relative z-10 group hover:border-[var(--theme-accent)] transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] flex items-center justify-center font-black text-xl shadow-lg shadow-[var(--theme-accent-glow)]">
                  M
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-[var(--theme-text-primary)] mt-2">
                  MRM 2030
                </span>
                <span className="text-[9px] font-mono font-extrabold text-[var(--theme-accent)] uppercase">
                  HORIZON
                </span>
              </div>
            </div>

            {/* Radar Telemetry Footer Tag */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                ACTIVE ENGINEERING ROADMAP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

