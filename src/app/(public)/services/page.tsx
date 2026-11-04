import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  Cpu,
  Layers,
  BarChart3,
  Layout,
  ArrowRight,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Workflow,
  Compass,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export const metadata: Metadata = {
  title: 'Specialized Enterprise Services | MRM InfoTech Ltd.',
  description:
    'Explore MRM InfoTech’s 14 specialized software engineering, cloud architecture, AI solutions, and digital transformation capabilities.',
};

export default async function ServicesPage() {
  const services = await PublicApiService.getServices('en');
  const hasServices = Boolean(services && services.length > 0);

  const getServiceIcon = (slug: string) => {
    if (slug.includes('web') || slug.includes('frontend')) return Code2;
    if (slug.includes('custom') || slug.includes('software')) return Cpu;
    if (slug.includes('saas') || slug.includes('cloud')) return Cloud;
    if (slug.includes('auto') || slug.includes('work')) return Workflow;
    if (slug.includes('seo') || slug.includes('market')) return BarChart3;
    if (slug.includes('ui') || slug.includes('ux') || slug.includes('design')) return Layout;
    if (slug.includes('mobile') || slug.includes('app')) return Smartphone;
    if (slug.includes('data') || slug.includes('db')) return Database;
    if (slug.includes('sec') || slug.includes('audit')) return Shield;
    if (slug.includes('consult')) return Compass;
    return Layers;
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Engineering Disciplines
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Enterprise Software Services & Technical Advisory
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Full-lifecycle engineering built with strict NestJS and PostgreSQL architectural principles. From rapid microservices to national cloud migrations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-[#07162C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasServices ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: { slug: string; name?: string; summary?: string }) => {
                const Icon = getServiceIcon(service.slug);
                const name = service.name || 'Engineering Discipline';
                const summary = service.summary || 'Enterprise digital engineering and software services.';

                return (
                  <div
                    key={service.slug}
                    className="liquid-glass-card rounded-2xl p-7 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <h2 className="text-xl font-black text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                          {name}
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed line-clamp-3">
                          {summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:gap-2.5 transition-all"
                      >
                        <span>Detailed Scope</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/start-project?service=${service.slug}`}
                        className="text-[11px] font-semibold text-[#0052CC] dark:text-[#20B8D5] hover:underline"
                      >
                        Request Quote &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <GlassEmptyState
              badge="Core Disciplines"
              title="No Services Published Yet"
              description="Our service catalogue is connected directly to the database. All published software engineering disciplines will appear here."
              adminHref="/admin/dashboard/services"
              adminLabel="Manage Services in Admin CMS"
              publicHref="/start-project"
              publicLabel="Start a Custom Project"
            />
          )}
        </div>
      </section>
    </div>
  );
}
