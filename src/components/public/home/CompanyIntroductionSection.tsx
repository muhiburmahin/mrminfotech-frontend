'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Cpu,
  Globe2,
  CheckCircle2,
} from 'lucide-react';

export function CompanyIntroductionSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--theme-accent)]/10 rounded-full blur-[140px] z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetric Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Asymmetric Statement & Brand Definition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span>COMPANY INTRODUCTION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--theme-text-primary)] tracking-tight leading-[1.12]">
              Engineering With Purpose.{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Built For Real-World Impact.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-2xl">
              MRM InfoTech is a modern software engineering and digital solutions company headquartered in Dhaka, Bangladesh. We operate on a unique <span className="text-[var(--theme-text-primary)] font-semibold">Dual-Engine Model</span>: engineering our own proprietary cloud SaaS platforms while designing and delivering mission-critical custom digital solutions for ambitious organizations.
            </p>

            {/* Vision and Mission Editorial Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--theme-border-glass)]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                  <Compass className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                  Sovereign Cloud Leadership
                </h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  To establish Bangladesh as a hub of high-craft software engineering by building dependable digital ecosystems that simplify everyday operations.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                  High-Availability Engineering
                </h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  To eliminate operational friction, paper chaos, and system disconnects through robust architectures, strict security, and long-term technical ownership.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-accent)] hover:gap-3 transition-all group"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Visual Cockpit */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-7 sm:p-8 shadow-2xl space-y-6 overflow-hidden">
              {/* Radial Top Glow */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-44 h-44 bg-[var(--theme-accent)]/15 rounded-full blur-3xl pointer-events-none"
              />

              <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border-glass)]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-accent)]">
                    OPERATIONAL PILLARS
                  </span>
                  <h4 className="text-base font-black text-[var(--theme-text-primary)] mt-0.5">
                    How MRM InfoTech Delivers
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center font-mono text-xs font-bold border border-[var(--theme-accent)]/20">
                  MRM
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[var(--theme-text-primary)]">
                      Dual-Engine Innovation
                    </h5>
                    <p className="text-[11px] text-[var(--theme-text-secondary)] mt-0.5 leading-relaxed">
                      Real feedback from EduManage BD and MediSheba BD directly enhances our bespoke client solutions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[var(--theme-text-primary)]">
                      100% In-House Engineering
                    </h5>
                    <p className="text-[11px] text-[var(--theme-text-secondary)] mt-0.5 leading-relaxed">
                      Every line of code is designed and reviewed in-house. Zero unvetted third-party outsourcing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[var(--theme-text-primary)]">
                      Sovereign Infrastructure
                    </h5>
                    <p className="text-[11px] text-[var(--theme-text-secondary)] mt-0.5 leading-relaxed">
                      Encrypted database storage, localized edge routing, and automated disaster recovery protocols.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Bar */}
              <div className="pt-3 border-t border-[var(--theme-border-glass)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Ready</span>
                </span>
                <span className="text-[var(--theme-accent)] font-bold">24/7 Monitored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

