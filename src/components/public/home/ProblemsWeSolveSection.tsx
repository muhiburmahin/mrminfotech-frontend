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
    <section className="relative py-24 sm:py-28 bg-[#06080d] border-b border-white/[0.08] overflow-hidden text-white">
      {/* Volumetric Center Ambient Orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-lime-400/12 rounded-full blur-[140px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-[#C6F432] text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Real-World Engineering Focus</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Problems We Solve.{' '}
              <span className="font-serif italic font-normal text-[#C6F432] neon-text-glow">
                Software That Serves Real Needs.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              We don&apos;t build technology for the sake of buzzwords. Every software product and custom solution we engineer directly eliminates operational friction, paper chaos, and system disconnects.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-[#C6F432] hover:gap-3 transition-all shrink-0 self-start md:self-auto"
          >
            <span>Explore Engineering Solutions</span>
            <ArrowRight className="w-4 h-4 transition-transform" />
          </Link>
        </div>

        {/* 5 Problem Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.slice(0, 3).map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.1] border-t-2 border-t-lime-400/40 rounded-3xl p-7 flex flex-col justify-between group hover:border-lime-400/50 hover:shadow-[0_0_35px_rgba(198,244,50,0.18)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C6F432] shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-white/50 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">
                      {problem.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2.5 group-hover:text-[#C6F432] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={problem.solvedBy.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6F432] hover:underline group/link"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F432] shrink-0" />
                    <span>{problem.solvedBy.label}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
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
                className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.1] border-t-2 border-t-lime-400/40 rounded-3xl p-7 flex flex-col justify-between group hover:border-lime-400/50 hover:shadow-[0_0_35px_rgba(198,244,50,0.18)] transition-all duration-300 md:col-span-1 lg:col-span-1.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C6F432] shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-white/50 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">
                      {problem.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2.5 group-hover:text-[#C6F432] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={problem.solvedBy.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6F432] hover:underline group/link"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F432] shrink-0" />
                    <span>{problem.solvedBy.label}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
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
