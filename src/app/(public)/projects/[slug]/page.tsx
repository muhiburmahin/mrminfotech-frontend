import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/public/shared/SocialIcons';
import { PublicApiService } from '@/services/public-api.service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await PublicApiService.getProjectBySlug(slug, 'en');
  if (!project) {
    return { title: 'Project Not Found | MRM InfoTech' };
  }
  const title = project.title || project.name || 'Project';
  return {
    title: `${title} | MRM InfoTech Deployments`,
    description: project.summary || project.challenge,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await PublicApiService.getProjectBySlug(slug, 'en');

  if (!project) {
    notFound();
  }

  const title = project.title || project.name || 'Enterprise Project';
  const summary = project.summary || project.challenge || '';
  const caseStudy = project.caseStudy || project;

  const clientName = caseStudy.clientName;
  const liveUrl = caseStudy.liveUrl;
  const frontendRepoUrl = caseStudy.showFrontendRepo ? caseStudy.frontendRepoUrl : null;
  const backendRepoUrl = caseStudy.showBackendRepo ? caseStudy.backendRepoUrl : null;

  // Frontend and Backend Tech summaries
  const frontendTech: string[] =
    Array.isArray(caseStudy.frontendTechStack) && caseStudy.frontendTechStack.length > 0
      ? caseStudy.frontendTechStack
      : (caseStudy.frontendTechSummary as { frameworks?: string[] })?.frameworks || ['Next.js', 'TypeScript', 'Tailwind CSS'];

  const backendTech: string[] =
    Array.isArray(caseStudy.backendTechStack) && caseStudy.backendTechStack.length > 0
      ? caseStudy.backendTechStack
      : (caseStudy.backendTechSummary as { frameworks?: string[] })?.frameworks || ['NestJS', 'PostgreSQL', 'Prisma ORM'];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] relative transition-colors duration-150 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#087FC4]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#20B8D5]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {caseStudy.projectWorkStatus || 'COMPLETED'}
              </span>
              {clientName && (
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  Client: {clientName}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold liquid-glass-card text-slate-800 dark:text-slate-200 transition-colors text-sm"
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold liquid-glass-card text-slate-800 dark:text-slate-200 transition-colors text-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Backend Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Breakdown */}
      <section className="py-20 bg-white dark:bg-[#07162C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Tech */}
            <div className="liquid-glass-card rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Frontend Architecture & Tech Stack
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Responsive UI layers engineered for high accessibility, server rendering, and fast first-contentful paint.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {frontendTech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#0B1E3B] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1E3557]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Tech */}
            <div className="liquid-glass-card rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Backend Microservices & DB Foundation
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scalable service architecture, connection pooling, and multi-tenant security layers.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {backendTech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#0B1E3B] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1E3557]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
