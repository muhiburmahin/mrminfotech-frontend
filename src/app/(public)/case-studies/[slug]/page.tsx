import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, FileText, TrendingUp } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { ClientTestimonials } from '@/components/home/ClientTestimonials';
import type { TestimonialItem } from '@/lib/api/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await PublicApiService.getCaseStudyBySlug(slug, 'en');
  if (!cs) {
    return { title: 'Case Study Not Found | MRM InfoTech' };
  }
  return {
    title: `Case Study: ${cs.title} | MRM InfoTech`,
    description: cs.summary || cs.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [cs, rawTestimonials] = await Promise.all([
    PublicApiService.getCaseStudyBySlug(slug, 'en'),
    PublicApiService.getTestimonials<TestimonialItem[]>({ locale: 'en', projectSlug: slug }),
  ]);

  const projectTestimonials = Array.isArray(rawTestimonials) ? rawTestimonials : [];

  if (!cs) {
    notFound();
  }

  const clientName = cs.clientName || cs.caseStudy?.clientName;
  const challenge = cs.challenge || cs.summary;
  const approach = cs.approach;
  const solution = cs.solution;
  const results = cs.results;

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Architectural Case Study</span>
            {clientName && (
              <>
                <span>&bull;</span>
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{clientName}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {cs.title}
          </h1>
          {challenge && (
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {challenge}
            </p>
          )}
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {approach && (
            <div className="liquid-glass-card rounded-2xl p-8 space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Technical Discovery & Approach
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {approach}
              </p>
            </div>
          )}

          {solution && (
            <div className="liquid-glass-card rounded-2xl p-8 space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Engineered Solution & Architecture
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {solution}
              </p>
            </div>
          )}

          {results && (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span>Verified Results & Business Outcome</span>
              </div>
              <p className="text-sm leading-relaxed">
                {results}
              </p>
            </div>
          )}

          {projectTestimonials && projectTestimonials.length > 0 && (
            <div className="pt-4">
              <ClientTestimonials
                variant="inline"
                id="case-study-testimonials"
                heading="Client feedback on this project"
                testimonials={projectTestimonials}
              />
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
            <Link
              href="/case-studies"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              &larr; Back to Case Studies
            </Link>
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors text-xs"
            >
              <span>Build a Similar System</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
