'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Layers,
  Database,
  Cloud,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

interface TechCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  stacks: Array<{ name: string; tag: string }>;
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    name: 'Frontend Development',
    icon: Layers,
    stacks: [
      { name: 'Next.js 16', tag: 'SSR & App Router' },
      { name: 'React 19', tag: 'Reactive Components' },
      { name: 'TypeScript', tag: 'Strict Typing' },
      { name: 'Tailwind CSS 4', tag: 'Design Tokens' },
      { name: 'Framer Motion', tag: 'Smooth Motion' },
    ],
  },
  {
    name: 'Backend & Microservices',
    icon: Cpu,
    stacks: [
      { name: 'NestJS 11', tag: 'Enterprise Framework' },
      { name: 'Node.js', tag: 'Async Runtime' },
      { name: 'REST & GraphQL', tag: 'Type-Safe APIs' },
      { name: 'BullMQ', tag: 'Redis Job Queues' },
      { name: 'JWT & 2FA TOTP', tag: 'Zero-Trust Auth' },
    ],
  },
  {
    name: 'Database & Storage',
    icon: Database,
    stacks: [
      { name: 'PostgreSQL 16', tag: 'ACID Transactions' },
      { name: 'Neon Serverless', tag: 'Auto-Scaling DB' },
      { name: 'Redis Cache', tag: 'Sub-Millisecond In-Memory' },
      { name: 'Prisma ORM', tag: 'Type-Safe Schemas' },
      { name: 'Cloudinary CDN', tag: 'Optimized Media' },
    ],
  },
  {
    name: 'Cloud & Infrastructure',
    icon: Cloud,
    stacks: [
      { name: 'Cloudflare Edge', tag: 'WAF & Global CDN' },
      { name: 'Docker Pods', tag: 'Containerization' },
      { name: 'Railway Cloud', tag: 'Scalable Microservices' },
      { name: 'Vercel Edge', tag: 'Serverless Frontend' },
      { name: 'SSL & DNSSEC', tag: 'Enterprise Encryption' },
    ],
  },
  {
    name: 'Development & Quality Tools',
    icon: Terminal,
    stacks: [
      { name: 'Jest Automation', tag: 'Unit Test Suites' },
      { name: 'Supertest', tag: 'E2E Regression Testing' },
      { name: 'GitHub Actions', tag: 'Automated CI/CD' },
      { name: 'Postman & Swagger', tag: 'OpenAPI Contracts' },
      { name: 'ESLint & Prettier', tag: 'Code Quality Standard' },
    ],
  },
];

export function TechnologyLogoWallSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNOLOGY &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
            The Right Tools.{' '}
            <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
              Engineered with Precision.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)]">
            We select modern, battle-tested technologies based on performance, type safety, concurrency, and sovereign data security.
          </p>
        </div>

        {/* Minimal Category Rows */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {TECH_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[var(--theme-accent)]/40 transition-colors"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 md:w-64 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/20">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--theme-text-primary)]">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  {category.stacks.map((tech) => (
                    <div
                      key={tech.name}
                      className="px-3 py-1.5 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 hover:bg-[var(--theme-bg-surface)] transition-all flex items-center gap-2 group cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] group-hover:scale-125 transition-transform" />
                      <span className="text-xs font-bold text-[var(--theme-text-primary)] font-mono">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-[var(--theme-text-muted)] hidden sm:inline">
                        • {tech.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

