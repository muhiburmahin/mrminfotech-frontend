'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  Workflow,
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    category: 'PHASE I',
    icon: Search,
    description:
      'We deeply unpack your operational bottlenecks, business objectives, institutional regulations, and user requirements.',
  },
  {
    number: '02',
    title: 'Planning',
    category: 'PHASE II',
    icon: Compass,
    description:
      'Technical architecture blueprints, relational database schema contracts, API specifications, and phased milestone roadmaps.',
  },
  {
    number: '03',
    title: 'UI/UX Design',
    category: 'PHASE III',
    icon: Palette,
    description:
      'Wireframing, interactive prototyping, WCAG 2.1 design token systems, and responsive user journeys crafted in Figma.',
  },
  {
    number: '04',
    title: 'Development',
    category: 'PHASE IV',
    icon: Code2,
    description:
      'Clean, modular full-stack engineering with Next.js 16, NestJS microservices, strict TypeScript, and continuous integration.',
  },
  {
    number: '05',
    title: 'Testing & QA',
    category: 'PHASE V',
    icon: CheckCircle2,
    description:
      'Multi-layer unit tests, integration suites, E2E regression runs, security scans, and concurrency load profiling.',
  },
  {
    number: '06',
    title: 'Delivery & Support',
    category: 'PHASE VI',
    icon: Rocket,
    description:
      'Staged deployments, edge caching, production monitoring, and automated backup routines.',
  },
];

export function HorizontalWorkflowSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase">
            <Workflow className="w-3.5 h-3.5" />
            <span>HOW WE WORK • 6-STEP PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
            A Disciplined Process.{' '}
            <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
              From Concept to Delivery.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
            Every successful software product begins with clarity. Our predictable 6-step engineering methodology transforms complex business needs into dependable, production-tested systems.
          </p>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative">
          {/* Subtle Horizontal Desktop Connecting Line */}
          <div
            aria-hidden="true"
            className="hidden xl:block absolute top-12 left-8 right-8 h-0.5 bg-gradient-to-r from-[var(--theme-accent)]/20 via-[var(--theme-accent)]/60 to-[var(--theme-accent)]/20 pointer-events-none z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 sm:gap-6 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/70 bg-[var(--theme-bg-surface)] p-5 sm:p-6 flex flex-col justify-between shadow-md hover:border-[var(--theme-accent)] hover:shadow-xl hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1),0_0_20px_var(--theme-accent-glow)] transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    {/* Step Number & Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-[var(--theme-accent)]">
                        {step.number}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[var(--theme-text-muted)] block uppercase tracking-wider">
                      {step.category}
                    </span>

                    <h3 className="text-base font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="mt-5 h-1 w-8 rounded-full bg-[var(--theme-accent)]/30 group-hover:w-full group-hover:bg-[var(--theme-accent)] transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

