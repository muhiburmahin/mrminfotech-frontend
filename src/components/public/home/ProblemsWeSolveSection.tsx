'use client';

import React from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  Unplug,
  Clock,
  BarChart3,
  Globe2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ProblemItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  solvedBy: {
    label: string;
    href: string;
  };
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'manual-ops',
    icon: ClipboardList,
    title: 'Manual Business Operations',
    subtitle: 'হাতে হাতে অনেক কাজ করতে হয়',
    description:
      'Paper files, repetitive recordkeeping, and manual fee/billing collections create human errors, misplaced records, and huge administrative overhead.',
    solvedBy: {
      label: 'Solved by EduManage BD & Custom ERPs',
      href: '/products/edumanage-bd',
    },
  },
  {
    id: 'disconnected-systems',
    icon: Unplug,
    title: 'Disconnected Information Systems',
    subtitle: 'তথ্য বিভিন্ন জায়গায় ছড়িয়ে থাকে',
    description:
      'Branches, clinics, and academic departments running isolated tools result in data duplication, zero synchronization, and severe audit blind spots.',
    solvedBy: {
      label: 'Solved by Multi-Institution Platform',
      href: '/products/multi-institution-platform',
    },
  },
  {
    id: 'inefficient-workflows',
    icon: Clock,
    title: 'Inefficient Daily Workflows',
    subtitle: 'দৈনন্দিন কাজ পরিচালনায় সময় বেশি লাগে',
    description:
      'Patient diagnostic bottlenecks, slow lab report approvals, and paper attendance exhaust staff and frustrate customers and guardians.',
    solvedBy: {
      label: 'Solved by MediSheba BD',
      href: '/products/medisheba-bd',
    },
  },
  {
    id: 'limited-visibility',
    icon: BarChart3,
    title: 'Limited Operational Visibility',
    subtitle: 'প্রয়োজনীয় রিপোর্ট ও তথ্য সহজে পাওয়া যায় না',
    description:
      'Decision-makers wait days or weeks for financial summaries, enrollment counts, and inventory telemetry instead of having real-time analytics.',
    solvedBy: {
      label: 'Solved by Real-Time Analytics SaaS',
      href: '/products',
    },
  },
  {
    id: 'digital-presence',
    icon: Globe2,
    title: 'Weak Digital Presence & Security',
    subtitle: 'প্রতিষ্ঠানের অনলাইন উপস্থিতি দুর্বল',
    description:
      'Outdated static sites with broken mobile views, vulnerable portals, and missing self-service portals weaken public trust and engagement.',
    solvedBy: {
      label: 'Solved by Modern Web & Cloud Platforms',
      href: '/services/web-development',
    },
  },
];

export default function ProblemsWeSolveSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden text-[var(--theme-text-primary)] transition-colors duration-150">
      {/* Volumetric Center Ambient Orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--theme-border-glass)_1px,transparent_1px)] [background-size:28px_28px] opacity-40 z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Real-World Engineering Focus</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--theme-text-primary)] leading-tight">
              Problems We Solve.{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Software That Serves Real Needs.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              We don&apos;t build technology for the sake of buzzwords. Every software product and custom solution we engineer directly eliminates operational friction, paper chaos, and system disconnects.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-sm font-bold text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all shrink-0 self-start md:self-auto group"
          >
            <span>Explore Engineering Solutions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Problem Cards Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* First Row: 3 Cards */}
          {PROBLEMS.slice(0, 3).map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/60 bg-[var(--theme-bg-surface)]/90 backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[var(--theme-accent)]/70 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8),0_0_30px_var(--theme-accent-glow)] hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] shadow-inner group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--theme-text-muted)] bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] px-3 py-1 rounded-full truncate max-w-[190px]">
                      {problem.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)]">
                  <Link
                    href={problem.solvedBy.href}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--theme-accent)] bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:bg-[var(--theme-accent)]/10 transition-all group/link"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                    <span className="truncate">{problem.solvedBy.label}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Second Row: 2 Wider Cards for balanced 5-item aesthetic on larger screens */}
          {PROBLEMS.slice(3, 5).map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/60 bg-[var(--theme-bg-surface)]/90 backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[var(--theme-accent)]/70 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.8),0_0_30px_var(--theme-accent-glow)] hover:-translate-y-1.5 transition-all duration-300 group md:col-span-1 lg:col-span-1 md:last:col-span-2 lg:last:col-span-2"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] shadow-inner group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--theme-text-muted)] bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] px-3 py-1 rounded-full truncate max-w-[240px]">
                      {problem.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)]">
                  <Link
                    href={problem.solvedBy.href}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--theme-accent)] bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:bg-[var(--theme-accent)]/10 transition-all group/link"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                    <span className="truncate">{problem.solvedBy.label}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
