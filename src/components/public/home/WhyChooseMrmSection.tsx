'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Users,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Activity,
  Terminal,
  Lock,
} from 'lucide-react';
import { CTAButton } from '@/components/ui/design-system/CTAButton';

const WHY_CHOOSE_FEATURES = [
  {
    serial: '01',
    title: 'Client-Focused Bespoke Development',
    description:
      'We never force off-the-shelf templates. Every architecture is scoped around your actual institutional workflow, security protocols, and operational goals.',
    tag: 'TAILORED ENGINEERING',
  },
  {
    serial: '02',
    title: 'Modern & Battle-Tested Technologies',
    description:
      'Built with Next.js 16, NestJS, and PostgreSQL 16. We leverage strict TypeScript typing, connection pooling, and immutable data modeling for bulletproof stability.',
    tag: 'PRODUCTION HARDENED',
  },
  {
    serial: '03',
    title: 'Scalable High-Concurrency Architecture',
    description:
      'Engineered to handle sudden traffic surges, admissions rushes, and high-volume billing transactions without latency spikes or connection starvation.',
    tag: 'HIGH CONCURRENCY',
  },
  {
    serial: '04',
    title: 'Rigorous Automated Quality Assurance',
    description:
      'Our release pipeline executes comprehensive unit, integration, and end-to-end regression test suites with zero-defect gates before production release.',
    tag: 'ZERO-DEFECT STANDARD',
  },
  {
    serial: '05',
    title: 'Long-Term Technical Ownership & Support',
    description:
      'We stand behind our platforms with 24/7 telemetry monitoring, automated disaster-recovery backups, security patch audits, and direct architect communication.',
    tag: 'DURABLE PARTNERSHIP',
  },
];

export function WhyChooseMrmSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Architectural Cockpit */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-7 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
              {/* Radial Top Glow */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -left-16 w-48 h-48 bg-[var(--theme-accent)]/20 rounded-full blur-3xl pointer-events-none"
              />

              <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border-glass)]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--theme-text-primary)]">
                    ENTERPRISE SLA VERIFIED
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--theme-accent)] font-bold">MRM-SLA</span>
              </div>

              {/* SLA Metric Gauges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] space-y-1">
                  <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase">Uptime Commitment</span>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-[var(--theme-text-primary)]">99.9%</p>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Zero Downtime
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] space-y-1">
                  <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase">Median API Latency</span>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-[var(--theme-accent)]">&lt; 42ms</p>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Global Edge CDN
                  </p>
                </div>
              </div>

              {/* Security & Code Pledges */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-xs font-mono">
                  <span className="text-[var(--theme-text-secondary)] flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    OWASP Top 10 Hardened
                  </span>
                  <span className="text-emerald-400 font-bold">PASSED</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-xs font-mono">
                  <span className="text-[var(--theme-text-secondary)] flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    Strict TypeScript Typing
                  </span>
                  <span className="text-[var(--theme-accent)] font-bold">100% COVERAGE</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-xs font-mono">
                  <span className="text-[var(--theme-text-secondary)] flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    Automated Disaster Backups
                  </span>
                  <span className="text-[var(--theme-text-primary)] font-bold">DAILY CRON</span>
                </div>
              </div>

              <div className="pt-2">
                <CTAButton href="/start-project" size="md" className="w-full justify-center">
                  Partner With Us <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Feature List */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>WHY CHOOSE MRM INFOTECH</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
                Architectural Integrity.{' '}
                <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                  Enduring Reliability.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
                When you collaborate with MRM InfoTech, you work directly with experienced software architects and engineers who care deeply about your long-term success.
              </p>
            </div>

            {/* Features Accordion/List */}
            <div className="space-y-4">
              {WHY_CHOOSE_FEATURES.map((item, idx) => (
                <motion.div
                  key={item.serial}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  className="p-5 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/60 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 px-2 py-1 rounded-md shrink-0">
                      {item.serial}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--theme-text-muted)] bg-[var(--theme-bg-canvas)] px-2 py-0.5 rounded border border-[var(--theme-border-glass)]">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

