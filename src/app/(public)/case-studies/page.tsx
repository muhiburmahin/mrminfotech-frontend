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
    <div className="w-full flex flex-col bg-[#0B0B0C] text-[#FFFFFF] transition-colors duration-150 min-h-screen">
      <section className="bg-[#0B0B0C] text-white pt-24 pb-16 border-b border-white/10 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/15">
              Engineering Evidence
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#FFFFFF]">
              Architectural Case Studies &amp; Performance Impact
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Technical post-mortems and design decisions behind our most demanding enterprise deployments. Connected to the live CMS.
            </p>
          </div>
        </div>
      </section>

      <FeaturedCaseStudies caseStudies={caseStudies} />
    </div>
  );
}
