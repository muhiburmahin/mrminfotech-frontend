import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Cpu,
  TrendingUp,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export const metadata: Metadata = {
  title: 'Careers & Engineering Culture',
  description:
    'Join MRM InfoTech. Build high-concurrency SaaS platforms, clean software architectures, and mission-critical digital systems in Bangladesh.',
  alternates: {
    canonical: '/careers',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function CareersPage() {
  const jobs = await PublicApiService.getCareers('en');
  const hasJobs = Boolean(jobs && jobs.length > 0);

  const perks = [
    {
      title: 'Architectural Autonomy',
      desc: 'Work with clean code, NestJS, Next.js, and modern cloud stacks without legacy technical debt.',
      icon: Cpu,
    },
    {
      title: 'Competitive Compensation',
      desc: 'Market-leading salaries, performance bonuses, and transparent annual merit review cycles.',
      icon: TrendingUp,
    },
    {
      title: 'Professional Growth',
      desc: 'Dedicated budget for professional certifications, books, and international software engineering events.',
      icon: GraduationCap,
    },
    {
      title: 'Sovereign Impact',
      desc: 'Build software platforms that directly empower schools, clinics, and businesses nationwide.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200 overflow-x-hidden selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* =====================================================================
          1. CAREERS HERO BANNER
          ===================================================================== */}
      <section className="relative pt-24 pb-20 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Subtle Ambient Light Orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[var(--theme-accent)]/10 blur-[100px]"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>CAREERS AT MRM INFOTECH • ENGINEERING CULTURE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14]">
              Build Systems That Define{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Digital Infrastructure
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              We are assembling world-class software engineers, product designers, and systems architects
              who value engineering craftsmanship, clean architecture, and meaningful impact over shortcuts.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--theme-text-muted)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>Zero Technical Debt</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>Modern Cloud Stacks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>High Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CULTURE & PERKS GRID
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/30 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span>WHY WORK AT MRM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Why Engineers Choose MRM InfoTech
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              A disciplined work environment built for deep technical focus, continuous learning, and measurable pride in shipped code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_30px_var(--theme-accent-subtle)] transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CURRENT OPEN POSITIONS
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] transition-colors duration-200">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <Briefcase className="w-3.5 h-3.5" />
              <span>LIVE RECRUITMENT PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Current Open Positions
            </h2>
            <p className="text-sm text-[var(--theme-text-secondary)]">
              Positions are fetched dynamically from our verified database.
            </p>
          </div>

          {hasJobs ? (
            <div className="space-y-4">
              {jobs.map((job: { slug: string; title?: string; type?: string; location?: string; department?: string }) => {
                const title = job.title || 'Engineering Role';
                const type = job.type || 'FULL_TIME';
                const location = job.location || 'Dhaka, Bangladesh';
                const dept = job.department || 'Engineering';

                return (
                  <div
                    key={job.slug}
                    className="p-6 sm:p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                          {type}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--theme-text-muted)] uppercase">
                          {dept}
                        </span>
                        <span className="text-xs text-[var(--theme-text-secondary)] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                          {location}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                        {title}
                      </h3>
                    </div>

                    <Link
                      href={`/contact?subject=Application+for+${encodeURIComponent(title)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 shadow-lg shadow-[var(--theme-accent-glow)] transition-all self-start sm:self-auto shrink-0"
                    >
                      <span>Apply for Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <GlassEmptyState
              badge="Recruitment Pipeline Active"
              title="No Open Positions Right Now"
              description="We are not actively hiring for published roles at this moment, but our engineering directors are always eager to meet exceptional full-stack architects, product creators, and distributed systems engineers."
              adminHref="/admin/dashboard"
              adminLabel="View Admin CMS"
              publicHref="/contact"
              publicLabel="Submit General Application"
            />
          )}

          {/* Open Application Card */}
          <div className="p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-black text-[var(--theme-text-primary)]">
                Don&apos;t see a matching position?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] max-w-xl">
                We always make room for remarkable talent. Send your GitHub profile, portfolio, and engineering philosophy to our talent team.
              </p>
            </div>
            <Link
              href="/contact?subject=Open+Engineering+Application"
              className="px-6 py-3.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] font-bold text-xs hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all shrink-0"
            >
              Send Open Application →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
