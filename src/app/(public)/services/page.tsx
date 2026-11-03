import React from 'react';
import type { Metadata } from 'next';
import { getServices } from '@/lib/api/public';
import { ServicesOverview } from '@/components/home/ServicesOverview';

export const metadata: Metadata = {
  title: 'Specialized Enterprise Services | MRM InfoTech Ltd.',
  description:
    'Explore MRM InfoTech’s 14 specialized software engineering, cloud architecture, AI solutions, and digital transformation capabilities.',
};

export default async function ServicesPage() {
  const services = await getServices('en');

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              Engineering Disciplines
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Enterprise Software Services & Technical Advisory
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Full-lifecycle engineering built with strict NestJS and PostgreSQL architectural
              principles. From rapid microservices to national cloud migrations.
            </p>
          </div>
        </div>
      </section>

      <ServicesOverview services={services} />
    </div>
  );
}
