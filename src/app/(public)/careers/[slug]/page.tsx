import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${title} | Careers at MRM InfoTech`,
    description: `Career opportunity for ${title} at MRM InfoTech Ltd. in Dhaka, Bangladesh.`,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#00C2FF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Careers</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0052CC]/10 text-[#087FC4] dark:text-[#00C2FF] border border-[#087FC4]/30 dark:border-[#00C2FF]/30">
              Full-Time
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#087FC4] dark:text-[#00C2FF]" />
              Dhaka, Bangladesh
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Join MRM InfoTech’s engineering team to build scalable architectures and sovereign cloud
            platforms.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Role Overview & Responsibilities</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We are seeking a talented professional to contribute directly to our high-throughput
              SaaS platforms (EduManage BD, MediSheba BD) and custom enterprise solutions. You will
              work closely with lead architects, participating in system design, agile sprints, and
              production deployments.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">How to Apply</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Please email your resume, GitHub profile, and a brief summary of your technical
              experience to{' '}
              <a href="mailto:careers@mrminfotech.com" className="text-[#087FC4] dark:text-[#00C2FF] font-bold">
                careers@mrminfotech.com
              </a>{' '}
              with the subject line: <strong>Application: {title}</strong>.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:careers@mrminfotech.com?subject=Application: ${encodeURIComponent(title)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
              >
                <span>Apply via Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
