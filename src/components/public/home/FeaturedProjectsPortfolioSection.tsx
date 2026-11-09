'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, ExternalLink } from 'lucide-react';

export interface PortfolioProjectItem {
  id?: string;
  slug: string;
  title?: string;
  summary?: string;
  projectWorkStatus?: string;
  frontendTechSummary?: string[];
  backendTechSummary?: string[];
  dbToolsSummary?: string[];
  liveUrl?: string | null;
  service?: { slug: string; name?: string | null } | null;
  product?: { slug: string; name?: string | null } | null;
  translations?: Array<{
    title?: string;
    summary?: string;
  }>;
}

interface FeaturedProjectsPortfolioSectionProps {
  projects: PortfolioProjectItem[];
}

export function FeaturedProjectsPortfolioSection({
  projects,
}: FeaturedProjectsPortfolioSectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      {/* Background Subtle Gradient Orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[350px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ENGINEERED PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
              Featured Client Work &amp;{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Software Systems.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              Explore custom web platforms, institutional software, and telemetry engines engineered by MRM InfoTech for production scale.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-sm font-bold text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all shrink-0 self-start md:self-auto group"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const rawTitle = project.title || project.translations?.[0]?.title || project.slug;
            const rawSummary = project.summary || project.translations?.[0]?.summary || '';
            const frontendTech = project.frontendTechSummary || [];
            const backendTech = project.backendTechSummary || [];
            const allTech = [...frontendTech, ...backendTech].slice(0, 4);
            const serial = String(idx + 1).padStart(2, '0');
            const category = project.service?.name || project.product?.name || 'Custom Engineering';

            return (
              <motion.div
                key={project.id || project.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/80 bg-[var(--theme-bg-surface)] p-7 sm:p-8 flex flex-col justify-between shadow-lg hover:border-[var(--theme-accent)] hover:shadow-2xl hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.15),0_0_25px_var(--theme-accent-glow)] transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Mockup Header Bar with Status Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border-glass)]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 px-2.5 py-0.5 rounded-full border border-[var(--theme-accent)]/20">
                        {category}
                      </span>
                      <span className="text-xs font-mono font-bold text-[var(--theme-text-muted)] bg-[var(--theme-bg-canvas)] px-2 py-0.5 rounded-md border border-[var(--theme-border-glass)]">
                        #{serial}
                      </span>
                    </div>
                  </div>

                  {/* Project Title & Category */}
                  <div>
                    <h3 className="text-2xl font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors line-clamp-1">
                      {rawTitle}
                    </h3>
                    <p className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{project.projectWorkStatus || 'COMPLETED & LIVE'}</span>
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed line-clamp-3">
                    {rawSummary}
                  </p>

                  {/* Live URL Bar if available */}
                  {project.liveUrl && (
                    <div className="flex items-center justify-between text-xs text-[var(--theme-text-muted)] bg-[var(--theme-bg-canvas)] px-3.5 py-2 rounded-xl border border-[var(--theme-border-glass)]">
                      <span className="truncate max-w-[220px] font-mono text-[11px]">
                        {project.liveUrl.replace(/^https?:\/\//, '')}
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--theme-accent)] hover:underline shrink-0 ml-2"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {/* Technologies Used */}
                  {allTech.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {allTech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[10px] font-mono text-[var(--theme-text-secondary)] group-hover:border-[var(--theme-accent)]/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider group-hover:gap-3 transition-all"
                  >
                    <span>View Architecture &amp; Case</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">
                    Production Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

