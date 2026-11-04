import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await PublicApiService.getServiceBySlug(slug, 'en');
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
  const service = await PublicApiService.getServiceBySlug(slug, 'en');

  if (!service) {
    notFound();
  }

  const technicalDeliverables = [
    'Complete system architecture blueprint and ERD database design.',
    'Test-driven NestJS/Next.js implementation with high branch coverage.',
    'Automated CI/CD deployment pipelines with zero-downtime rolling updates.',
    'OWASP Top 10 security verification and penetration testing assurance.',
    'Comprehensive OpenAPI/Swagger documentation and post-launch SLA support.',
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] relative transition-colors duration-150 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#087FC4]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#20B8D5]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-[#0B1E3B] border border-[#087FC4]/30 dark:border-[#20B8D5]/30 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Capability</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              {service.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.summary}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={`/start-project?service=${slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
              >
                <span>Engage Our Architects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold liquid-glass-card text-slate-800 dark:text-slate-200 text-sm"
              >
                <span>Browse All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Deliverables */}
      <section className="py-20 bg-white dark:bg-[#07162C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
                  Deliverables & Standards
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  What You Receive with this Discipline
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every project executed under this discipline follows our strict NestJS and PostgreSQL architectural foundation, ensuring auditability, security, and scalability.
              </p>

              <div className="space-y-3 pt-2">
                {technicalDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="liquid-glass rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Direct Architect Consultation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Collaborate directly with senior engineers.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you require a dedicated sprint team, architecture review, or custom turnkey delivery, we tailor our engagement model to match your timeline.
              </p>

              <Link
                href={`/start-project?service=${slug}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
