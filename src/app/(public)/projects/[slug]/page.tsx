import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Layers,
  Cpu,
  Database,
  Sparkles,
  Server,
  Cloud,
  FileCode,
  Calendar,
  Building2,
} from 'lucide-react';
import { GithubIcon } from '@/components/public/shared/SocialIcons';
import { PublicApiService } from '@/services/public-api.service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const project: any = await PublicApiService.getProjectBySlug(cleanSlug, 'en');

  if (!project) {
    return { title: 'Project Not Found | MRM InfoTech' };
  }

  const title = project.seoTitle || `${project.title} | Case Study | MRM InfoTech`;
  const description =
    project.seoDescription ||
    project.summary ||
    'Read the complete technical case study and system architecture by MRM InfoTech.';

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/projects/${cleanSlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug);
  const cleanSlug = rawSlug.trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  if (rawSlug !== cleanSlug) {
    redirect(`/projects/${cleanSlug}`);
  }

  const project: any = await PublicApiService.getProjectBySlug(cleanSlug, 'en');

  if (!project) {
    notFound();
  }

  const title = project.title || project.name || 'Enterprise Project';
  const summary = project.summary || project.challenge || '';
  const caseStudy = project.caseStudy || project;

  const clientName = project.clientName || caseStudy.clientName;
  const liveUrl = project.liveUrl || caseStudy.liveUrl;
  const frontendRepoUrl = project.frontendRepoUrl || (caseStudy.showFrontendRepo ? caseStudy.frontendRepoUrl : null);
  const backendRepoUrl = project.backendRepoUrl || (caseStudy.showBackendRepo ? caseStudy.backendRepoUrl : null);

  const frontendTech: string[] =
    project.frontendTechSummary ||
    (Array.isArray(caseStudy.frontendTechStack) && caseStudy.frontendTechStack.length > 0
      ? caseStudy.frontendTechStack
      : ['Next.js 16', 'TypeScript', 'Tailwind CSS v4']);

  const backendTech: string[] =
    project.backendTechSummary ||
    (Array.isArray(caseStudy.backendTechStack) && caseStudy.backendTechStack.length > 0
      ? caseStudy.backendTechStack
      : ['NestJS 11', 'PostgreSQL', 'Prisma ORM']);

  const dbTools: string[] =
    project.dbToolsSummary ||
    (Array.isArray(caseStudy.dbToolsSummary) ? caseStudy.dbToolsSummary : ['PostgreSQL 16', 'Redis', 'Docker Compose']);

  const metrics: Array<{ label: string; value: string }> =
    project.metrics && project.metrics.length > 0
      ? project.metrics
      : [
          { label: 'Uptime SLA', value: '99.95%' },
          { label: 'Architecture', value: 'Cloud-Native' },
          { label: 'Security Verification', value: 'RBAC Audited' },
          { label: 'Performance', value: '< 100ms P95' },
        ];

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200">
      {/* ──────────────────────── Top Breadcrumb & Hero ──────────────────────── */}
      <section className="relative pt-24 pb-20 border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/3 w-96 h-96 rounded-full bg-[var(--theme-accent)]/10 blur-[100px]"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Deployments</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{project.projectWorkStatus || 'COMPLETED & VERIFIED'}</span>
            </span>

            {project.service?.name && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]">
                {project.service.name}
              </span>
            )}

            {clientName && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--theme-bg-surface)] text-[var(--theme-text-muted)] border border-[var(--theme-border-glass)] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Sector: {clientName}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14] max-w-4xl">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
            {summary}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {frontendRepoUrl && (
              <a
                href={frontendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Frontend Repository</span>
              </a>
            )}

            {backendRepoUrl && (
              <a
                href={backendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Backend Repository</span>
              </a>
            )}

            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] transition-colors"
            >
              <span>Request Similar Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Verified Metrics 4-Grid ──────────────────────── */}
      <section className="py-12 bg-[var(--theme-bg-surface)]/40 border-b border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-md space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-black text-[var(--theme-accent)] font-mono">
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-[var(--theme-text-muted)]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── Case Study Narrative & Architecture ──────────────────────── */}
      <section className="py-16 md:py-24 bg-[var(--theme-bg-canvas)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Case Study Article Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 3-Pillar Breakdown: Challenge, Solution, Result */}
            {(project.challenge || project.solution || project.result) && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-[var(--theme-text-primary)] tracking-tight">
                  Project Execution Breakdown
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.challenge && (
                    <div className="p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                        The Challenge
                      </div>
                      <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-[var(--theme-accent)]">
                        The Solution
                      </div>
                      <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  {project.result && (
                    <div className="p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                        The Result
                      </div>
                      <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                        {project.result}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* In-Depth Architectural Narrative */}
            {project.body && (
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[var(--theme-text-primary)] tracking-tight">
                  Architecture &amp; Implementation Details
                </h2>

                <div className="p-8 sm:p-10 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] prose prose-invert max-w-none text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed whitespace-pre-line space-y-4">
                  {project.body}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column: Tech Stack & System Specifications */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Matrix */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Full Technology Matrix</span>
              </div>

              {/* Frontend Stack */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[var(--theme-text-primary)] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Frontend Architecture</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {frontendTech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Stack */}
              <div className="space-y-2 pt-2 border-t border-[var(--theme-border-glass)]">
                <div className="text-xs font-bold text-[var(--theme-text-primary)] flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Backend &amp; Microservices</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {backendTech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database & Cloud Tools */}
              <div className="space-y-2 pt-2 border-t border-[var(--theme-border-glass)]">
                <div className="text-xs font-bold text-[var(--theme-text-primary)] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Data &amp; Cloud Infrastructure</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dbTools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Product or Service Banner */}
            {project.product && (
              <div className="p-6 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] space-y-3">
                <div className="text-[11px] font-bold text-[var(--theme-accent)] uppercase tracking-wider">
                  Associated Product Platform
                </div>
                <h4 className="text-base font-bold text-[var(--theme-text-primary)]">
                  {project.product.name}
                </h4>
                <p className="text-xs text-[var(--theme-text-secondary)]">
                  This deployment is powered by our proprietary product platform.
                </p>
                <Link
                  href={`/products/${project.product.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] hover:gap-2.5 transition-all"
                >
                  <span>Explore Product Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Quick Consultation Card */}
            <div className="p-6 rounded-3xl bg-linear-to-br from-[var(--theme-bg-surface)] to-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] space-y-4">
              <h4 className="text-base font-bold text-[var(--theme-text-primary)]">
                Ready to Deploy a Similar System?
              </h4>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Connect directly with our lead solution architects to review your technical requirements and receive a structured implementation plan.
              </p>
              <Link
                href="/start-project"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
              >
                <span>Initiate Project Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
