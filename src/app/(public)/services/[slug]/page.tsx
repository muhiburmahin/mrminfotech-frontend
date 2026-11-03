import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getServiceBySlug } from '@/lib/api/public';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug, 'en');
  if (!service) {
    return { title: 'Service Not Found | MRM InfoTech' };
  }
  return {
    title: `${service.name} | MRM InfoTech Engineering`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug, 'en');

  if (!service) {
    notFound();
  }

  const technicalDeliverables = [
    'Complete system architecture blueprint and ERD database design.',
    'Test-driven NestJS/Next.js implementation with 90%+ branch coverage.',
    'Automated CI/CD deployment pipelines with zero-downtime rolling updates.',
    'OWASP Top 10 security verification and penetration testing report.',
    'Comprehensive OpenAPI/Swagger documentation and post-launch SLA support.',
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-[#0B1E3B] border border-[#087FC4]/30 dark:border-[#00C2FF]/30 text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              <span>Enterprise Capability</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">{service.name}</h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.summary}
            </p>
            <div className="pt-2">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
              >
                <span>Engage Our Architects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Engineering Methodology & Quality Assurance
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                When engaging MRM InfoTech for {service.name.toLowerCase()}, your organization
                works directly with senior architects who specialize in robust, maintainable
                engineering. We prioritize clean architecture, predictable sprint delivery, and
                uncompromising reliability under load.
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deliverables Included:</h3>
                {technicalDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-[#087FC4] dark:text-[#00C2FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 dark:bg-[#0B1E3B] p-8 rounded-2xl border border-slate-200 dark:border-[#1E3557] space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Engagement Snapshot</h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-[#1E3557]">
                  <dt className="text-slate-500 dark:text-slate-400">Service Category</dt>
                  <dd className="font-bold text-slate-900 dark:text-white">Enterprise Engineering</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-[#1E3557]">
                  <dt className="text-slate-500 dark:text-slate-400">Methodology</dt>
                  <dd className="font-bold text-slate-900 dark:text-white">Agile / 2-Week Sprints</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-[#1E3557]">
                  <dt className="text-slate-500 dark:text-slate-400">Architecture</dt>
                  <dd className="font-bold text-[#087FC4] dark:text-[#00C2FF]">NestJS + Next.js + Neon DB</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-slate-500 dark:text-slate-400">SLA Availability</dt>
                  <dd className="font-bold text-emerald-600 dark:text-emerald-400">24/7 Dedicated Support</dd>
                </div>
              </dl>
              <Link
                href="/start-project"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
              >
                <span>Request Technical Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
