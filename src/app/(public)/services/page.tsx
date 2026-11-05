import React from 'react';
import type { Metadata } from 'next';
import {
  Code2,
  Cpu,
  Layers,
  BarChart3,
  Layout,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Workflow,
  Compass,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { GlassCard } from '@/components/ui/design-system/GlassCard';
import { MasonryGrid } from '@/components/ui/design-system/MasonryGrid';

export const metadata: Metadata = {
  title: 'Specialized Enterprise Services | MRM InfoTech Ltd.',
  description:
    'Explore MRM InfoTech’s 14 specialized software engineering, cloud architecture, AI solutions, and digital transformation capabilities.',
};

export default async function ServicesPage() {
  const rawServices = await PublicApiService.getServices('en');
  const servicesList = Array.isArray(rawServices)
    ? rawServices
    : (rawServices as unknown as { data?: unknown[] })?.data || [];
  
  const sortedServices = [...(servicesList as Array<{ slug: string; name?: string; title?: string; summary?: string; sortOrder?: number; order?: number }>)].sort((a, b) => {
    const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : (typeof a.order === 'number' ? a.order : 999);
    const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : (typeof b.order === 'number' ? b.order : 999);
    return orderA - orderB;
  });

  const hasServices = sortedServices.length > 0;

  const getServiceIcon = (slug: string) => {
    if (slug.includes('web') || slug.includes('frontend')) return <Code2 className="w-5 h-5 text-white" />;
    if (slug.includes('custom') || slug.includes('software')) return <Cpu className="w-5 h-5 text-white" />;
    if (slug.includes('saas') || slug.includes('cloud')) return <Cloud className="w-5 h-5 text-white" />;
    if (slug.includes('auto') || slug.includes('work')) return <Workflow className="w-5 h-5 text-white" />;
    if (slug.includes('seo') || slug.includes('market')) return <BarChart3 className="w-5 h-5 text-white" />;
    if (slug.includes('ui') || slug.includes('ux') || slug.includes('design')) return <Layout className="w-5 h-5 text-white" />;
    if (slug.includes('mobile') || slug.includes('app')) return <Smartphone className="w-5 h-5 text-white" />;
    if (slug.includes('data') || slug.includes('db')) return <Database className="w-5 h-5 text-white" />;
    if (slug.includes('sec') || slug.includes('audit')) return <Shield className="w-5 h-5 text-white" />;
    if (slug.includes('consult')) return <Compass className="w-5 h-5 text-white" />;
    return <Layers className="w-5 h-5 text-white" />;
  };

  return (
    <div className="w-full flex flex-col bg-[#0B0B0C] text-[#FFFFFF] transition-colors duration-150 min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0B0B0C] text-white pt-24 pb-16 border-b border-white/10 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/15">
              Engineering Disciplines
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#FFFFFF]">
              Enterprise Software Services &amp; Technical Advisory
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Full-lifecycle engineering built with strict NestJS and PostgreSQL architectural principles. From rapid microservices to national cloud migrations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0B0B0C] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasServices ? (
            <MasonryGrid category="Services">
              {sortedServices.map((service, index) => {
                const icon = getServiceIcon(service.slug);
                const name =
                  service.name ||
                  service.title ||
                  service.slug
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ');
                const summary = service.summary || 'Enterprise digital engineering and software services.';
                const displayNum = String(service.order || service.sortOrder || index + 1).padStart(2, '0');

                return (
                  <GlassCard
                    key={service.slug}
                    title={name}
                    subtitle={`Service #${displayNum}`}
                    description={summary}
                    tag={`#${displayNum}`}
                    icon={icon}
                    ctaText="Detailed Scope"
                    ctaHref={`/services/${service.slug}`}
                    metaInfo={
                      <span className="text-white/60 text-xs font-mono">
                        {service.slug}
                      </span>
                    }
                  />
                );
              })}
            </MasonryGrid>
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
