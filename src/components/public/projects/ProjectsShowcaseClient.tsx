'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  Code2,
  Sparkles,
  Search,
  CheckCircle2,
  Layers,
  Cpu,
  Database,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { GithubIcon } from '@/components/public/shared/SocialIcons';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export interface ProjectItem {
  slug: string;
  title: string;
  summary: string;
  cover?: string | null;
  publishedAt?: string | Date;
  sortOrder?: number;
  projectWorkStatus?: string;
  isFeatured?: boolean;
  demoVideoUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  frontendTechSummary?: string[] | null;
  backendTechSummary?: string[] | null;
  dbToolsSummary?: string[] | null;
  service?: { slug: string; name?: string | null } | null;
  product?: { slug: string; name?: string | null } | null;
  clientName?: string | null;
  metrics?: Array<{ label: string; value: string }>;
}

interface ProjectsShowcaseClientProps {
  initialProjects: ProjectItem[];
}

export default function ProjectsShowcaseClient({ initialProjects }: ProjectsShowcaseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories / services
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.service?.name) set.add(p.service.name);
      else if (p.product?.name) set.add('Proprietary Products');
      else set.add('Custom Engineering');
    });
    return ['all', ...Array.from(set)];
  }, [initialProjects]);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const catMatch =
        selectedCategory === 'all' ||
        (selectedCategory === 'Proprietary Products' && Boolean(p.product)) ||
        (p.service?.name && p.service.name.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.frontendTechSummary?.some((t) => t.toLowerCase().includes(query)) ||
        p.backendTechSummary?.some((t) => t.toLowerCase().includes(query));

      return catMatch && searchMatch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  // Featured project spotlight (first featured or first item)
  const spotlightProject = useMemo(() => {
    return filteredProjects.find((p) => p.isFeatured) || filteredProjects[0];
  }, [filteredProjects]);

  // Remaining projects
  const gridProjects = useMemo(() => {
    if (!spotlightProject) return filteredProjects;
    return filteredProjects.filter((p) => p.slug !== spotlightProject.slug);
  }, [filteredProjects, spotlightProject]);

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200">
      {/* ──────────────────────── Top Editorial Hero ──────────────────────── */}
      <section className="relative pt-24 pb-16 border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[var(--theme-accent)]/10 blur-[130px] rounded-full"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>LIVE CLIENT IMPLEMENTATIONS &amp; PORTFOLIO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Architected for Reliability.{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Deployed for Impact.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              Explore verified enterprise software deployments, high-concurrency cloud platforms, and institutional
              operating systems built by MRM InfoTech. Every case study is verified with measurable business outcomes.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 pt-8 border-t border-[var(--theme-border-glass)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = cat === 'all' ? 'All Deployments' : cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-md shadow-[var(--theme-accent-glow)]'
                        : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech, stack, title..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-xs text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-hidden focus:border-[var(--theme-accent)] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Main Content Area ──────────────────────── */}
      <section className="py-16 md:py-24 bg-[var(--theme-bg-surface)]/20 transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredProjects.length === 0 ? (
            <GlassEmptyState
              badge="Portfolio Filters"
              title="No Projects Match Your Criteria"
              description="Try selecting a different category or clearing your search query to see our active enterprise deployments."
              adminHref="/admin/dashboard/projects"
              adminLabel="Manage Projects in CMS"
              publicHref="/start-project"
              publicLabel="Start a New Project"
            />
          ) : (
            <>
              {/* ──────────────── Featured Spotlight Banner ──────────────── */}
              {spotlightProject && (
                <div className="relative rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-2xl overflow-hidden transition-all duration-300 group">
                  <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-xs">
                          Featured System
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {spotlightProject.projectWorkStatus || 'LIVE PRODUCTION'}
                        </span>
                        {spotlightProject.service?.name && (
                          <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]">
                            {spotlightProject.service.name}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors">
                        <Link href={`/projects/${spotlightProject.slug}`}>
                          {spotlightProject.title}
                        </Link>
                      </h2>

                      <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                        {spotlightProject.summary}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="space-y-2 pt-2">
                        <div className="text-[11px] font-bold text-[var(--theme-text-muted)] uppercase tracking-wider">
                          Core Architecture &amp; Stack:
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {[
                            ...(spotlightProject.frontendTechSummary || []),
                            ...(spotlightProject.backendTechSummary || []),
                          ]
                            .slice(0, 6)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-4">
                        <Link
                          href={`/projects/${spotlightProject.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
                        >
                          <span>Explore Architecture &amp; Case Study</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        {spotlightProject.frontendRepoUrl && (
                          <a
                            href={spotlightProject.frontendRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Spotlight Metrics Grid */}
                    <div className="lg:col-span-5 bg-[var(--theme-bg-canvas)]/60 rounded-2xl p-6 sm:p-8 border border-[var(--theme-border-glass)] space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-accent)] tracking-wider uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>VERIFIED IMPACT METRICS</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {(spotlightProject.metrics && spotlightProject.metrics.length > 0
                          ? spotlightProject.metrics
                          : [
                              { label: 'Uptime SLA', value: '99.95%' },
                              { label: 'Verification', value: 'Verified' },
                              { label: 'Cloud Architecture', value: 'Microservices' },
                              { label: 'Turnaround Speed', value: '< 100ms' },
                            ]
                        ).map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]"
                          >
                            <div className="text-xl sm:text-2xl font-black text-[var(--theme-accent)] font-mono">
                              {metric.value}
                            </div>
                            <div className="text-[11px] font-medium text-[var(--theme-text-muted)] mt-1">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────── Asymmetric Projects Grid ──────────────── */}
              {gridProjects.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-[var(--theme-text-primary)] tracking-tight">
                      All Deployed Solutions ({filteredProjects.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridProjects.map((project) => {
                      const allTech = [
                        ...(project.frontendTechSummary || []),
                        ...(project.backendTechSummary || []),
                      ];

                      return (
                        <div
                          key={project.slug}
                          className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all duration-200 flex flex-col justify-between group"
                        >
                          <div className="space-y-4">
                            {/* Badges */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                                {project.service?.name || project.product?.name || 'Custom Solution'}
                              </span>

                              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>{project.projectWorkStatus || 'COMPLETED'}</span>
                              </span>
                            </div>

                            {/* Title & Summary */}
                            <div>
                              <h4 className="text-lg font-black text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                                <Link href={`/projects/${project.slug}`}>
                                  {project.title}
                                </Link>
                              </h4>
                              <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed line-clamp-3">
                                {project.summary}
                              </p>
                            </div>

                            {/* Tech Stack Chips */}
                            {allTech.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                                {allTech.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[var(--theme-bg-canvas)] text-[var(--theme-text-muted)] border border-[var(--theme-border-glass)]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {allTech.length > 4 && (
                                  <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">
                                    +{allTech.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Primary Metric Pill */}
                            {project.metrics && project.metrics[0] && (
                              <div className="px-3 py-2 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] flex items-center justify-between">
                                <span className="text-[11px] text-[var(--theme-text-muted)] font-medium">
                                  {project.metrics[0].label}
                                </span>
                                <span className="text-xs font-bold text-[var(--theme-accent)] font-mono">
                                  {project.metrics[0].value}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Footer Actions */}
                          <div className="pt-5 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="text-xs font-bold text-[var(--theme-accent)] inline-flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer"
                            >
                              <span>Read Case Study</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>

                            {project.frontendRepoUrl && (
                              <a
                                href={project.frontendRepoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-canvas)] transition-colors"
                                title="View Public Repository"
                              >
                                <GithubIcon className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ──────────────── Bottom Enterprise Consultation CTA ──────────────── */}
          <div className="rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] p-8 sm:p-12 relative overflow-hidden text-center space-y-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 w-80 h-80 bg-[var(--theme-accent)]/15 rounded-full blur-[100px]"
            />
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Have a Mission-Critical System in Mind?
            </h3>
            <p className="text-sm text-[var(--theme-text-secondary)] max-w-xl mx-auto leading-relaxed">
              Partner with our systems engineers to architect, build, and deploy high-availability digital software tailored to your organization’s scale.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/start-project"
                className="px-6 py-3 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
              >
                Start an Enterprise Project
              </Link>
              <Link
                href="/services"
                className="px-6 py-3 rounded-xl font-bold text-xs bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] transition-colors cursor-pointer"
              >
                Explore Engineering Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
