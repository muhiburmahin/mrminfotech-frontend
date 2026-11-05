'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, TrendingUp } from 'lucide-react';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { GlassCard } from '@/components/ui/design-system/GlassCard';
import { MasonryGrid } from '@/components/ui/design-system/MasonryGrid';

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
    <section className="py-24 bg-[#0B0B0C] border-b border-white/10 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>REAL-WORLD IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight">
              Enterprise Case Studies
            </h2>
            <p className="mt-3 text-base text-white/70">
              Examining real-world challenges, systems architecture, and verified business outcomes delivered by our engineering teams.
            </p>
          </div>

          {hasCaseStudies && (
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white hover:gap-3 transition-all"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasCaseStudies ? (
          <MasonryGrid category="Case Studies">
            {caseStudies!.slice(0, 3).map((item) => {
              const slug = item.slug || item.caseStudy?.slug || '';
              const title = item.title || 'Enterprise Engineering Case Study';
              const client = item.clientName || item.caseStudy?.clientName || 'Partner';
              const summary = item.summary || item.challenge || '';
              const results = item.results || '';

              return (
                <GlassCard
                  key={slug || title}
                  title={title}
                  subtitle={`Client: ${client}`}
                  description={summary}
                  tag="Verified Outcome"
                  icon={<TrendingUp className="w-5 h-5 text-white" />}
                  ctaText="Read Case Study"
                  ctaHref={`/case-studies/${slug}`}
                  metaInfo={
                    results ? (
                      <span className="text-white/80 font-bold truncate block max-w-[200px]">
                        {results}
                      </span>
                    ) : undefined
                  }
                />
              );
            })}
          </MasonryGrid>
        ) : (
          <GlassEmptyState
            badge="Real-World Impact"
            title="Case Studies Coming Soon"
            description="Our architecture deep-dives and client transformation stories are managed dynamically through the CMS."
            adminHref="/admin/dashboard"
            adminLabel="View Admin CMS"
            publicHref="/contact"
            publicLabel="Start a Consultation"
          />
        )}
      </div>
    </section>
  );
}
