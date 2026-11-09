'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FolderGit2, ExternalLink, ArrowRight, Search, X } from 'lucide-react';
import { GithubIcon } from '@/components/public/shared/SocialIcons';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export interface ProjectItem {
  slug: string;
  title: string;
  summary: string;
  cover?: string | { url: string; alt?: string; width?: number | null; height?: number | null } | null;
  liveUrl?: string | null;
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
  industry?: { slug: string; name?: string | null } | null;
  product?: { slug: string; name?: string | null } | null;
  clientName?: string | null;
  metrics?: Array<{ label: string; value: string }>;
}

interface ProjectsShowcaseClientProps {
  initialProjects: ProjectItem[];
}

const asList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && v.trim() !== '') : [];

export const projectTech = (p: ProjectItem): string[] =>
  Array.from(new Set([...asList(p.frontendTechSummary), ...asList(p.backendTechSummary), ...asList(p.dbToolsSummary)]));

export const projectCategory = (p: ProjectItem): string =>
  p.product?.name || p.service?.name || p.industry?.name || 'Custom Software';

const coverOf = (p: ProjectItem): { url: string; alt: string } | null => {
  if (!p.cover) return null;
  if (typeof p.cover === 'string') return { url: p.cover, alt: `${p.title} interface preview` };
  return p.cover.url ? { url: p.cover.url, alt: p.cover.alt || `${p.title} interface preview` } : null;
};

/** Real cover image when one exists; otherwise a neutral themed tile (never a stock photo). */
function ProjectVisual({ project, priority = false }: { project: ProjectItem; priority?: boolean }) {
  const cover = coverOf(project);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.url}
          alt={cover.alt}
          width={1200}
          height={750}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--theme-accent)]/15 to-transparent"
        >
          <FolderGit2 className="h-9 w-9 text-[var(--theme-accent)]" />
          <span className="px-6 text-center text-xs font-bold uppercase tracking-widest text-[var(--theme-text-muted)]">
            {projectCategory(project)}
          </span>
        </div>
      )}
    </div>
  );
}

function ActionLinks({ project, size = 'sm' }: { project: ProjectItem; size?: 'sm' | 'lg' }) {
  const pad = size === 'lg' ? 'px-6 py-3' : 'px-4 py-2.5';
  const base = `inline-flex items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-accent)] ${pad}`;
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href={`/projects/${project.slug}`}
        className={`${base} bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)]`}
      >
        <span>View Case Study</span>
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </Link>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]`}
        >
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 text-[var(--theme-accent)]" />
          <span>Live Preview</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {project.frontendRepoUrl && size === 'lg' && (
        <a
          href={project.frontendRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]`}
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>Source</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function TechBadges({ tech, max }: { tech: string[]; max: number }) {
  if (tech.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center gap-1.5" aria-label="Technology stack">
      {tech.slice(0, max).map((t) => (
        <li
          key={t}
          className="rounded-md border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--theme-text-secondary)]"
        >
          {t}
        </li>
      ))}
      {tech.length > max && (
        <li className="font-mono text-[11px] text-[var(--theme-text-muted)]">+{tech.length - max}</li>
      )}
    </ul>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  allLabel,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
}) {
  if (options.length === 0) return null;
  return (
    <div role="group" aria-label={label} className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">{label}</span>
      {['all', ...options].map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`shrink-0 whitespace-nowrap rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)] ${
              active
                ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)] text-[var(--theme-accent-text)]'
                : 'border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
            }`}
          >
            {opt === 'all' ? allLabel : opt}
          </button>
        );
      })}
    </div>
  );
}

export default function ProjectsShowcaseClient({ initialProjects }: ProjectsShowcaseClientProps) {
  const [category, setCategory] = useState('all');
  const [technology, setTechnology] = useState('all');
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(initialProjects.map(projectCategory))).sort(),
    [initialProjects],
  );

  // Most-used technologies first, capped so the filter row stays one tidy line.
  const technologies = useMemo(() => {
    const counts = new Map<string, number>();
    initialProjects.forEach((p) => projectTech(p).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([t]) => t);
  }, [initialProjects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProjects.filter((p) => {
      if (category !== 'all' && projectCategory(p) !== category) return false;
      if (technology !== 'all' && !projectTech(p).includes(technology)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.summary || '').toLowerCase().includes(q) ||
        projectTech(p).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [initialProjects, category, technology, query]);

  const isFiltering = category !== 'all' || technology !== 'all' || query.trim() !== '';
  const spotlight = !isFiltering ? filtered.find((p) => p.isFeatured) : undefined;
  const grid = spotlight ? filtered.filter((p) => p.slug !== spotlight.slug) : filtered;

  const reset = () => {
    setCategory('all');
    setTechnology('all');
    setQuery('');
  };

  return (
    <div className="flex w-full flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)]">
      {/* Hero + filters */}
      <section className="relative overflow-hidden border-b border-[var(--theme-border-glass)] pb-12 pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--theme-accent)]/10 blur-[130px]"
        />
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">
              <FolderGit2 aria-hidden="true" className="h-3.5 w-3.5" />
              Portfolio &amp; Case Studies
            </p>
            <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Software we have built,{' '}
              <span className="font-serif font-normal italic text-[var(--theme-accent)]">and the results it delivers.</span>
            </h1>
            <p className="text-base leading-relaxed text-[var(--theme-text-secondary)] sm:text-lg">
              Production platforms and client projects from MRM InfoTech. Open any case study for the business problem,
              our technical solution, key features and measurable outcomes.
            </p>
          </div>

          <div className="mt-10 space-y-4 border-t border-[var(--theme-border-glass)] pt-6">
            <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
              <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} allLabel="All" />
              <div className="relative w-full md:w-72 md:shrink-0">
                <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects or technology"
                  aria-label="Search projects"
                  className="w-full rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] py-2 pl-9 pr-9 text-xs text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:border-[var(--theme-accent)] focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                  >
                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
            <FilterGroup label="Technology" options={technologies} value={technology} onChange={setTechnology} allLabel="All" />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[var(--theme-bg-surface)]/20 py-14 md:py-20" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-[1240px] space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 id="projects-heading" className="text-xl font-black tracking-tight">
              {isFiltering ? 'Matching projects' : 'All projects'}
            </h2>
            <p role="status" aria-live="polite" className="text-xs font-medium text-[var(--theme-text-muted)]">
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
              {isFiltering && (
                <button type="button" onClick={reset} className="ml-3 font-bold text-[var(--theme-accent)] hover:underline">
                  Reset filters
                </button>
              )}
            </p>
          </div>

          {filtered.length === 0 ? (
            <GlassEmptyState
              badge="Portfolio Filters"
              title="No projects match these filters"
              description="Try a different category or technology, or clear the search."
              adminHref="/admin/dashboard/projects"
              adminLabel="Manage Projects in CMS"
              publicHref="/start-project"
              publicLabel="Start a Project"
            />
          ) : (
            <>
              {spotlight && (
                <article className="group overflow-hidden rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-xl transition-colors hover:border-[var(--theme-accent)]/50">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="space-y-5 p-8 sm:p-10 lg:col-span-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--theme-accent)] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[var(--theme-accent-text)]">
                          Featured
                        </span>
                        <span className="rounded-full border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] px-3 py-1 text-[11px] font-semibold text-[var(--theme-text-secondary)]">
                          {projectCategory(spotlight)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                        <Link href={`/projects/${spotlight.slug}`} className="hover:text-[var(--theme-accent)]">
                          {spotlight.title}
                        </Link>
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--theme-text-secondary)] sm:text-base">{spotlight.summary}</p>
                      <TechBadges tech={projectTech(spotlight)} max={8} />
                      {spotlight.metrics && spotlight.metrics.length > 0 && (
                        <dl className="grid grid-cols-2 gap-3">
                          {spotlight.metrics.slice(0, 4).map((m) => (
                            <div key={m.label} className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] p-3">
                              <dd className="font-mono text-lg font-black text-[var(--theme-accent)]">{m.value}</dd>
                              <dt className="truncate text-[11px] text-[var(--theme-text-muted)]">{m.label}</dt>
                            </div>
                          ))}
                        </dl>
                      )}
                      <ActionLinks project={spotlight} size="lg" />
                    </div>
                    <div className="lg:col-span-6 lg:border-l lg:border-[var(--theme-border-glass)] [&>div]:h-full [&>div]:border-b-0 [&>div]:aspect-auto min-h-[260px]">
                      <ProjectVisual project={spotlight} priority />
                    </div>
                  </div>
                </article>
              )}

              {grid.length > 0 && (
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {grid.map((project, i) => {
                    const tech = projectTech(project);
                    return (
                      <li key={project.slug} className="flex">
                        <article className="group flex w-full flex-col overflow-hidden rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-lg transition-colors hover:border-[var(--theme-accent)]/50">
                          <ProjectVisual project={project} priority={i < 2 && !spotlight} />
                          <div className="flex flex-1 flex-col gap-4 p-6">
                            <span className="w-fit rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                              {projectCategory(project)}
                            </span>
                            <div className="space-y-2">
                              <h3 className="text-lg font-black leading-snug">
                                <Link href={`/projects/${project.slug}`} className="hover:text-[var(--theme-accent)]">
                                  {project.title}
                                </Link>
                              </h3>
                              <p className="line-clamp-3 text-sm leading-relaxed text-[var(--theme-text-secondary)]">{project.summary}</p>
                            </div>
                            <TechBadges tech={tech} max={4} />
                            {project.metrics && project.metrics[0] && (
                              <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] px-3 py-2">
                                <span className="truncate text-[11px] text-[var(--theme-text-muted)]">{project.metrics[0].label}</span>
                                <span className="font-mono text-xs font-bold text-[var(--theme-accent)]">{project.metrics[0].value}</span>
                              </div>
                            )}
                            <div className="mt-auto border-t border-[var(--theme-border-glass)] pt-4">
                              <ActionLinks project={project} />
                            </div>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}

          {/* CTA */}
          <div className="relative space-y-4 overflow-hidden rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-8 text-center sm:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-[var(--theme-accent)]/15 blur-[100px]" />
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Planning a similar system?</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[var(--theme-text-secondary)]">
              Tell us about your requirements and we will respond with a structured technical proposal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/start-project"
                className="rounded-xl bg-[var(--theme-accent)] px-6 py-3 text-xs font-bold text-[var(--theme-accent-text)] transition-all hover:shadow-lg hover:shadow-[var(--theme-accent-glow)]"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] px-6 py-3 text-xs font-bold transition-colors hover:border-[var(--theme-accent)]"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
