import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/api/public';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Client Deployments & Projects | MRM InfoTech Ltd.',
  description:
    'Explore verified enterprise systems and software applications designed and deployed by MRM InfoTech Ltd.',
};

export default async function ProjectsPage() {
  const projects = await getProjects('en');

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              Proven Delivery
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Enterprise Projects & System Implementations
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Review our live systems in logistics, telemedicine, microfinance, and enterprise
              resource planning.
            </p>
          </div>
        </div>
      </section>

      <FeaturedProjects projects={projects} />
    </div>
  );
}

