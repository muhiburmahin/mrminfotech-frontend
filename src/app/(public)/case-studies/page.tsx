import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies';

export const metadata: Metadata = {
  title: 'Architectural Case Studies | MRM InfoTech Ltd.',
  description:
    'Deep-dive case studies examining bottlenecks, schema solutions, and measurable impact for enterprise clients.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await PublicApiService.getCaseStudies('en');

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Engineering Evidence
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Architectural Case Studies & Performance Impact
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Technical post-mortems and design decisions behind our most demanding enterprise deployments. Connected to the live CMS.
            </p>
          </div>
        </div>
      </section>

      <FeaturedCaseStudies caseStudies={caseStudies} />
    </div>
  );
}
