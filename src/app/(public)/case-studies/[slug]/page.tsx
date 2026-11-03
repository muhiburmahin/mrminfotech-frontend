import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { getProjectBySlug } from '@/lib/api/public';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, 'en');
  if (!project) {
    return { title: 'Case Study Not Found | MRM InfoTech' };
  }
  return {
    title: `Case Study: ${project.title} | MRM InfoTech`,
    description: project.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await getProjectBySlug(slug, 'en');

  if (!cs) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Architectural Case Study</span>
            {cs.clientName && (
              <>
                <span>•</span>
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{cs.clientName}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {cs.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {cs.summary}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Measured Impact */}
          {cs.metrics && cs.metrics.length > 0 && (
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Measured System Impact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cs.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-black text-[#087FC4] dark:text-[#00C2FF]">{m.value}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep-Dive Narrative */}
          <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Technical Challenge</h2>
            <p>
              The client faced significant concurrency bottlenecks during peak operational hours,
              resulting in transaction lockups, delayed reporting reconciliation, and heightened
              infrastructure overhead. Prior attempts with non-typed microservices had led to data
              desynchronization and fragile database schemas.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">Our Architectural Solution</h2>
            <p>
              MRM InfoTech restructured the system into decoupled domain modules powered by
              NestJS, applying strict PostgreSQL constraints, atomic transaction isolation, and
              Redis caching with proactive invalidation. By shifting complex validation logic to the
              database and API gateways, system latency was reduced significantly while eliminating
              data corruption risks.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">Key Takeaways & Lessons</h2>
            <p>
              Investing in domain-driven schema design and automated end-to-end integration tests
              ensured immediate operational stability, allowing the client to scale without further
              architectural restructuring.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
            <Link
              href="/case-studies"
              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#00C2FF] transition-colors"
            >
              ← Back to all case studies
            </Link>
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
            >
              <span>Build Similar Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
