import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProjectBySlug } from '@/lib/api/public';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, 'en');
  if (!project) {
    return { title: 'Project Not Found | MRM InfoTech' };
  }
  return {
    title: `${project.title} | MRM InfoTech Deployments`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, 'en');

  if (!project) {
    notFound();
  }

  const frontendTech =
    (project.frontendTechSummary as { frameworks?: string[] })?.frameworks || [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS',
    ];
  const backendTech =
    (project.backendTechSummary as { frameworks?: string[] })?.frameworks || [
      'NestJS',
      'PostgreSQL',
      'Prisma ORM',
    ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {project.projectWorkStatus || 'COMPLETED'}
              </span>
              {project.clientName && (
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  Client: {project.clientName}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">System Architecture & Scope</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Engineered with an emphasis on high-throughput database operations, horizontal
                  scaling, and strict data partitioning. The system incorporates enterprise-grade
                  telemetry, automated caching invalidation, and resilient failover mechanics.
                </p>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Production Metrics & Impact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                        <div className="text-xl font-bold text-[#087FC4] dark:text-[#00C2FF]">{m.value}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 bg-slate-50 dark:bg-[#0B1E3B] p-6 rounded-2xl border border-slate-200 dark:border-[#1E3557] space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technology Stack</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Frontend Architecture
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {frontendTech.map((t, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] font-semibold text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Backend Architecture
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {backendTech.map((t, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] font-semibold text-[#087FC4] dark:text-[#00C2FF]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-[#1E3557]">
                <Link
                  href="/start-project"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
