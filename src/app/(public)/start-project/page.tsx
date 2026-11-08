import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Loader2 } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { StartProjectForm } from '@/components/public/contact/StartProjectForm';

export const metadata: Metadata = {
  title: 'Start a Project | MRM InfoTech',
  description:
    'Initiate a new software project or SaaS onboarding with MRM InfoTech. Receive an architectural proposal within 48 hours.',
  alternates: {
    canonical: 'https://mrminfotech.com/start-project',
  },
};

export default async function StartProjectPage() {
  const services = await PublicApiService.getServices('en');

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <section className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] pt-20 pb-16 border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
              Project Onboarding
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--theme-text-primary)]">
              Start a Project with MRM InfoTech
            </h1>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)]">
              Tell us about your organizational goals, timeline, and scope. Our lead architects will review your requirements and provide a preliminary scope and proposal within 48 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--theme-bg-canvas)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="rounded-2xl p-12 flex flex-col items-center justify-center min-h-[300px] bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]">
                <Loader2 className="w-8 h-8 text-[var(--theme-accent)] animate-spin mb-3" />
                <span className="text-xs text-[var(--theme-text-muted)]">Loading project intake engine...</span>
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
