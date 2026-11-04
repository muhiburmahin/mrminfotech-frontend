import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, ArrowRight, MapPin, Clock } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export const metadata: Metadata = {
  title: 'Careers & Engineering Culture | MRM InfoTech Ltd.',
  description:
    'Join MRM InfoTech Ltd. Build high-concurrency SaaS products and enterprise architectures in Dhaka, Bangladesh.',
};

export default async function CareersPage() {
  const jobs = await PublicApiService.getCareers('en');
  const hasJobs = Boolean(jobs && jobs.length > 0);

  const perks = [
    { title: 'Architectural Autonomy', desc: 'Work with clean code, NestJS, Next.js, and modern tools without legacy technical debt.' },
    { title: 'Competitive Compensation', desc: 'Market-leading salaries, performance bonuses, and annual review cycles.' },
    { title: 'Professional Growth', desc: 'Dedicated budget for certifications, books, and international developer conferences.' },
    { title: 'Sovereign Impact', desc: 'Build software that directly improves schools, clinics, and enterprises across Bangladesh.' },
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* Banner */}
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Careers at MRM InfoTech
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Build Systems That Define South Asia’s Digital Infrastructure
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              We are assembling world-class engineers, product designers, and systems architects who value craftsmanship over shortcuts.
            </p>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Engineers Choose MRM InfoTech
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              A work environment built for deep technical focus, continuous learning, and measurable pride in shipped code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => (
              <div key={idx} className="liquid-glass-card rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-slate-50 dark:bg-[#040D1A] transition-colors duration-150">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Current Open Positions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Positions are fetched directly from our recruitment management database.
            </p>
          </div>

          {hasJobs ? (
            <div className="space-y-4">
              {jobs.map((job: { slug: string; title?: string; type?: string; location?: string; department?: string }) => {
                const title = job.title || 'Engineering Role';
                const type = job.type || 'FULL_TIME';
                const location = job.location || 'Dhaka, Bangladesh';

                return (
                  <div
                    key={job.slug}
                    className="liquid-glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                          {type}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {location}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {title}
                      </h3>
                    </div>

                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors self-start sm:self-auto"
                    >
                      <span>View Role & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <GlassEmptyState
              badge="Recruitment Database Connected"
              title="No Open Positions Right Now"
              description="We are not actively hiring for new roles today, but we are always open to hearing from exceptional systems architects and engineers."
              adminHref="/admin/dashboard"
              adminLabel="View Admin CMS"
              publicHref="/contact"
              publicLabel="Send General Inquiries"
            />
          )}
        </div>
      </section>
    </div>
  );
}
