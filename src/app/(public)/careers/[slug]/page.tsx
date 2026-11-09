import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { JobApplicationForm } from '@/components/public/careers/JobApplicationForm';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await PublicApiService.getCareerBySlug(slug, 'en');
  if (!job) {
    return buildMetadata({ title: 'Career Opportunity', description: 'This position is no longer available.', path: `/careers/${slug}`, noIndex: true });
  }
  return buildMetadata({
    title: `${job.title} — Careers`,
    description: `Join MRM InfoTech as ${job.title}. Based in Dhaka, Bangladesh.`,
    path: `/careers/${slug}`,
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await PublicApiService.getCareerBySlug(slug, 'en');

  if (!job) {
    notFound();
  }

  const title = job.title || 'Engineering Opportunity';
  const type = job.type || 'Full-Time';
  const location = job.location || 'Dhaka, Bangladesh';
  const body = job.body || job.description || 'We are seeking passionate systems engineers to build reliable digital platforms.';

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Careers</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0052CC]/10 text-[#087FC4] dark:text-[#20B8D5] border border-[#087FC4]/30">
              {type}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#087FC4] dark:text-[#20B8D5]" />
              {location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Join MRM InfoTech’s engineering team to build scalable architectures and sovereign cloud platforms.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Job Requirements & Overview */}
          <div className="liquid-glass-card rounded-2xl p-8 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#087FC4]" />
              <span>Role Overview & Expectations</span>
            </h2>
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {body}
            </div>
          </div>

          {/* Interactive Application Form */}
          <JobApplicationForm jobSlug={slug} jobTitle={title} />
        </div>
      </section>
    </div>
  );
}
