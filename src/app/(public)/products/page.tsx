import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export const metadata: Metadata = {
  title: 'Cloud SaaS Products | MRM InfoTech Ltd.',
  description:
    'Discover MRM InfoTech’s proprietary cloud platforms: EduManage BD for educational institutions, MediSheba BD for healthcare automation, and Multi-Institution Platform.',
};

export default async function ProductsPage() {
  const products = await PublicApiService.getProducts('en');

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Proprietary Cloud Platforms
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Software Products Built for Essential Bangladesh Industries
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Battle-tested multi-tenant platforms delivering automated workflows, local payment reconciliation, and sovereign data compliance.
            </p>
          </div>
        </div>
      </section>

      <FeaturedProducts products={products} />
    </div>
  );
}
