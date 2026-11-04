'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Layers } from 'lucide-react';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

interface CaseStudyData {
  title?: string;
  slug: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  clientName?: string;
  caseStudy?: {
    slug?: string;
    clientName?: string;
    industry?: string;
  };
}

interface FeaturedCaseStudiesProps {
  caseStudies?: CaseStudyData[];
}

export function FeaturedCaseStudies({ caseStudies }: FeaturedCaseStudiesProps) {
  const hasCaseStudies = Boolean(caseStudies && caseStudies.length > 0);

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>REAL-WORLD IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#15243A] dark:text-white tracking-tight">
              Enterprise Case Studies
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Examining real-world challenges, systems architecture, and verified business outcomes delivered by our teams.
            </p>
          </div>

          {hasCaseStudies && (
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:gap-3 transition-all"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasCaseStudies ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies!.slice(0, 2).map((item) => {
              const slug = item.slug || item.caseStudy?.slug || '';
              const title = item.title || 'Case Study';
              const client = item.clientName || item.caseStudy?.clientName || 'Enterprise Partner';
              const summary = item.summary || item.challenge || '';
              const solution = item.solution || '';
              const results = item.results || '';

              return (
                <div
                  key={slug || title}
                  className="liquid-glass-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5] px-2.5 py-0.5 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15">
                        Client: {client}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors leading-tight">
                      {title}
                    </h3>

                    {summary && (
                      <div className="text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white block mb-1">Challenge & Context:</strong>
                        {summary}
                      </div>
                    )}

                    {solution && (
                      <div className="text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white block mb-1">Engineered Architecture:</strong>
                        {solution}
                      </div>
                    )}

                    {results && (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 shrink-0 text-emerald-500" />
                        <span>Outcome: {results}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-[#1E3557]/60">
                    <Link
                      href={`/case-studies/${slug}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:gap-3 transition-all"
                    >
                      <span>Read Complete Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <GlassEmptyState
            badge="Case Studies"
            title="Case Studies Coming Soon"
            description="Our technical impact reports and system architecture case studies are managed through the live CMS. Once published, complete breakdowns will appear here."
            adminHref="/admin/dashboard/projects"
            adminLabel="Publish Case Study in Admin CMS"
            publicHref="/contact"
            publicLabel="Discuss Your Engineering Needs"
          />
        )}
      </div>
    </section>
  );
}
