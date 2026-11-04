import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Loader2 } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { StartProjectForm } from '@/components/public/contact/StartProjectForm';

export const metadata: Metadata = {
  title: 'Start a Project | MRM InfoTech Ltd.',
  description:
    'Initiate a new software project or SaaS onboarding with MRM InfoTech Ltd. Receive an architectural proposal within 48 hours.',
};

export default async function StartProjectPage() {
  const services = await PublicApiService.getServices('en');

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Project Onboarding
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Start a Project with MRM InfoTech
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Tell us about your organizational goals, timeline, and scope. Our lead architects will review your requirements and provide a preliminary scope and proposal within 48 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="liquid-glass rounded-2xl p-12 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-8 h-8 text-[#087FC4] animate-spin mb-3" />
                <span className="text-xs text-slate-500">Loading project intake engine...</span>
              </div>
            }
          >
            <StartProjectForm services={services} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
