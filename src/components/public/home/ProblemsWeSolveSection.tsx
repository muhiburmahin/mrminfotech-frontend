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
  accentColor: string;
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
    accentColor: '#087FC4',
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
    accentColor: '#20B8D5',
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
    accentColor: '#087FC4',
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
    accentColor: '#20B8D5',
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
    accentColor: '#087FC4',
  },
];

export default function ProblemsWeSolveSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] relative overflow-hidden">
      {/* Background radial radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] mrm-glow-blue pointer-events-none blur-3xl opacity-60" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5] text-xs font-bold uppercase tracking-wider mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Real-World Engineering Focus</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Problems We Solve. Software That Serves Real Needs.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              We don&apos;t build technology for the sake of buzzwords. Every software product and custom solution we engineer directly eliminates operational friction, paper chaos, and system disconnects.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline group/more shrink-0 self-start md:self-auto"
          >
            <span>Explore Engineering Solutions</span>
            <ArrowRight className="w-4 h-4 group-hover/more:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Problem Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.slice(0, 3).map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="mrm-glass-card rounded-2xl p-7 flex flex-col justify-between group hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: problem.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--text-muted)] bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md">
                      {problem.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-2.5 group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-subtle)]">
                  <Link
                    href={problem.solvedBy.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline group/link"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{problem.solvedBy.label}</span>
                    <ArrowRight className="w-3 h-3 group-link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Row 2: Two wider cards for balanced 5-item grid on lg screens */}
          {PROBLEMS.slice(3, 5).map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="mrm-glass-card rounded-2xl p-7 flex flex-col justify-between group hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all duration-300 md:col-span-1 lg:col-span-1.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: problem.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--text-muted)] bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md">
                      {problem.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-2.5 group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-subtle)]">
                  <Link
                    href={problem.solvedBy.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline group/link"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{problem.solvedBy.label}</span>
                    <ArrowRight className="w-3 h-3 group-link:translate-x-0.5 transition-transform" />
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
