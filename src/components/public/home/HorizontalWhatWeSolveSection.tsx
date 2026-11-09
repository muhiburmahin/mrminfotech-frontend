'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Clock, Globe2, Database, TrendingUp, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProblemSolutionItem {
  id: string;
  serial: string;
  problemBadge: string;
  problemTitle: string;
  problemDescription: string;
  solutionBadge: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionHref: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROBLEMS_DATA: ProblemSolutionItem[] = [
  {
    id: 'manual-ops',
    serial: '01',
    problemBadge: 'OPERATIONAL FRICTION',
    problemTitle: 'Manual Business Operations & Paper Chaos',
    problemDescription:
      'Paper ledgers, manual admissions, and physical billing registers create human errors, misplaced records, and hours of repetitive administrative paperwork.',
    solutionBadge: 'AUTOMATED ERP ECOSYSTEM',
    solutionTitle: 'Eliminated with EduManage BD & Custom Cloud ERPs',
    solutionDescription:
      'Centralized student/staff lifecycles, automated biometric RFID attendance, and instant bKash/Nagad fee reconciliation.',
    solutionHref: '/products/edumanage-bd',
    icon: FileText,
  },
  {
    id: 'workflow-lag',
    serial: '02',
    problemBadge: 'PROCESS BOTTLENECK',
    problemTitle: 'Inefficient Daily Workflows & Diagnostic Delays',
    problemDescription:
      'Diagnostic clinics and healthcare providers suffer from patient queues, specimen mix-ups, delayed doctor test validations, and slow report deliveries.',
    solutionBadge: 'CLINICAL OPERATING SYSTEM',
    solutionTitle: 'Streamlined with MediSheba BD Diagnostic OS',
    solutionDescription:
      'Thermal barcode specimen routing, digital pathology reporting, encrypted doctor signatures, and automated patient SMS report portals.',
    solutionHref: '/products/medisheba-bd',
    icon: Clock,
  },
  {
    id: 'digital-infra',
    serial: '03',
    problemBadge: 'INFRASTRUCTURE GAP',
    problemTitle: 'Lack of Modern Digital Infrastructure & Portals',
    problemDescription:
      'Organizations running outdated static web pages fail to offer self-service inquiries, customer accounts, or responsive mobile accessibility.',
    solutionBadge: 'ENTERPRISE WEB PLATFORMS',
    solutionTitle: 'Solved with High-Performance Reactive Web Platforms',
    solutionDescription:
      'Next.js 16 and Tailwind CSS engineering with sub-100ms global edge delivery, accessibility compliance, and interactive portals.',
    solutionHref: '/services/web-development',
    icon: Globe2,
  },
  {
    id: 'fragmented-systems',
    serial: '04',
    problemBadge: 'DATA SILOS',
    problemTitle: 'Poor Management Systems Across Branches & Clusters',
    problemDescription:
      'Institutions operating multiple branches or schools struggle with siloed spreadsheets, duplicate data entry, and zero central oversight.',
    solutionBadge: 'MULTI-TENANT GOVERNANCE',
    solutionTitle: 'Resolved with Multi-Institution Governance Platform',
    solutionDescription:
      'A unified administrative cockpit managing independent sub-brand websites, central staff rosters, and cluster-wide audit reports.',
    solutionHref: '/products/multi-institution-platform',
    icon: Database,
  },
  {
    id: 'scaling-bottlenecks',
    serial: '05',
    problemBadge: 'SCALABILITY LIMITS',
    problemTitle: 'Difficulties Scaling Business Operations & Databases',
    problemDescription:
      'Legacy software crashes during peak traffic spikes, admissions rushes, or high-volume transactions due to unoptimized database locks.',
    solutionBadge: 'HIGH-CONCURRENCY ARCHITECTURE',
    solutionTitle: 'Overcome with NestJS Microservices & PostgreSQL Pooling',
    solutionDescription:
      'Connection pooling, caching, transaction isolation, and containerized Docker architecture designed to scale with demand.',
    solutionHref: '/services/custom-software-development',
    icon: TrendingUp,
  },
];

export function HorizontalWhatWeSolveSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--theme-border-glass)_1px,transparent_1px)] [background-size:28px_28px] opacity-30 z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>REAL-WORLD PROBLEM RESOLUTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--theme-text-primary)] leading-tight">
              What We Solve.{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                From Friction to Flow.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              We do not build software for the sake of buzzwords. Every platform and custom system we engineer directly eliminates operational friction, paper chaos, and system disconnects.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-sm font-bold text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all shrink-0 self-start md:self-auto group"
          >
            <span>Explore Engineering Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal Feature Blocks */}
        <div className="space-y-4">
          {PROBLEMS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="group relative rounded-2xl sm:rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 sm:p-7 hover:border-[var(--theme-accent)]/70 hover:shadow-xl hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1),0_0_20px_var(--theme-accent-glow)] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Problem Definition */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                        {item.problemBadge}
                      </span>
                      <span className="text-xs font-mono font-bold text-[var(--theme-text-muted)] ml-auto lg:hidden">
                        #{item.serial}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {item.problemTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                      {item.problemDescription}
                    </p>
                  </div>

                  {/* Middle Column: Arrow / Connection Divider */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center items-center text-[var(--theme-accent)]/40 group-hover:text-[var(--theme-accent)] transition-colors">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Right Column: Solution Value & Direct Action */}
                  <div className="lg:col-span-6 rounded-2xl bg-[var(--theme-bg-canvas)]/80 p-4 sm:p-5 border border-[var(--theme-border-glass)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{item.solutionBadge}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--theme-text-primary)]">
                        {item.solutionTitle}
                      </h4>
                      <p className="text-xs text-[var(--theme-text-secondary)] leading-snug">
                        {item.solutionDescription}
                      </p>
                    </div>

                    <Link
                      href={item.solutionHref}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--theme-accent)] bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] transition-all shrink-0 inline-flex items-center gap-1.5 self-start sm:self-center"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

