'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
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
import GlassEmptyState from '@/components/ui/GlassEmptyState';

interface ServiceData {
  slug: string;
  name?: string;
  title?: string;
  summary?: string;
  icon?: string | null;
}

interface ServicesOverviewProps {
  services?: ServiceData[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
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
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#15243A] dark:text-white tracking-tight">
              Enterprise Engineering Services
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              End-to-end technical capabilities from custom software architecture and cloud infrastructure to digital marketing.
            </p>
          </div>

          {hasServices && (
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:gap-3 transition-all"
            >
              <span>View All 14 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services!.slice(0, 6).map((item) => {
              const name = item.name || item.title || 'Engineering Service';
              const slug = item.slug;
              const summary = item.summary || 'Enterprise digital engineering and software services.';
              const Icon = getServiceIcon(slug);

              return (
                <div
                  key={slug}
                  className="liquid-glass-card rounded-2xl p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                        {name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed line-clamp-3">
                        {summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                    <Link
                      href={`/services/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:gap-2.5 transition-all"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/start-project?service=${slug}`}
                      className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
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
  );
}
