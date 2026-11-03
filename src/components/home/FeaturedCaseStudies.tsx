'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { CaseStudyItem } from '@/lib/api/types';

interface FeaturedCaseStudiesProps {
  caseStudies?: CaseStudyItem[];
}

export function FeaturedCaseStudies({ caseStudies }: FeaturedCaseStudiesProps) {
  const defaultCaseStudies = [
    {
      slug: 'edumanage-cloud-architecture',
      title: 'Scaling EduManage BD for High-Concurrency School Admissions',
      client: 'Educational Consortia',
      problem: 'Legacy system crashed under 10k simultaneous student admission applications.',
      approach: 'Decoupled monolithic DB into micro-services with Redis caching and queue workers.',
      solution: 'Re-architected on NestJS, PostgreSQL read-replicas, and Next.js ISR frontends.',
      outcome: '100% uptime during admission peak; 400ms average response time.',
    },
    {
      slug: 'medisheba-diagnostic-management',
      title: 'Automating Lab Diagnostic Workflows & Report Security',
      client: 'Clinical Diagnostic Centers',
      problem: 'Manual report entry caused sample mix-ups and slow 24hr turnaround times.',
      approach: 'Introduced direct machine analyzer barcode scanning and automated PDF generation.',
      solution: 'Custom NestJS backend with MQTT machine connectors and encrypted digital records.',
      outcome: 'Reduced report turnaround from 24h to 2h; eliminated manual clerical errors.',
    },
  ];

  const list = caseStudies && caseStudies.length >= 2 ? caseStudies.slice(0, 2).map((cs, idx) => ({
    ...defaultCaseStudies[idx],
    slug: cs.slug,
    title: cs.title,
    client: cs.clientName || defaultCaseStudies[idx].client,
    problem: cs.challenge || defaultCaseStudies[idx].problem,
    solution: cs.solution || defaultCaseStudies[idx].solution,
    outcome: cs.results || defaultCaseStudies[idx].outcome,
  })) : defaultCaseStudies;

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>REAL-WORLD IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Behind the Solutions
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              How we approach complex engineering bottlenecks, transform legacy systems, and deliver measurable operational outcomes.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white group self-start md:self-end transition-colors"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {list.map((cs) => (
            <div
              key={cs.slug}
              className="p-8 rounded-2xl bg-[#F4F8FC] dark:bg-[#0A1F3F] border border-[#E3EAF2] dark:border-[#1E3557] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider block mb-2">
                  Case Study • {cs.client}
                </span>
                <h3 className="text-xl font-bold text-[#071A35] dark:text-white mb-4">
                  {cs.title}
                </h3>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <span className="font-bold text-red-500 block mb-0.5">Problem:</span>
                    <span className="text-[#66758A] dark:text-slate-300">{cs.problem}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <span className="font-bold text-[#087FC4] dark:text-[#20B8D5] block mb-0.5">Approach & Solution:</span>
                    <span className="text-[#66758A] dark:text-slate-300">{cs.solution}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#20B8D5]/10 dark:bg-[#20B8D5]/15 border border-[#20B8D5]/30">
                    <span className="font-bold text-[#071A35] dark:text-white block mb-0.5 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#087FC4] dark:text-[#20B8D5]" />
                      Outcome:
                    </span>
                    <span className="text-[#103B68] dark:text-[#20B8D5] font-medium">{cs.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3EAF2] dark:border-[#1E3557]">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
