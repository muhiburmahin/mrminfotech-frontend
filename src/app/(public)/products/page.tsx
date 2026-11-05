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
    <div className="w-full flex flex-col bg-[#0B0B0C] text-[#FFFFFF] transition-colors duration-150 min-h-screen">
      <section className="bg-[#0B0B0C] text-white pt-24 pb-16 border-b border-white/10 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/15">
              Proprietary Cloud Platforms
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#FFFFFF]">
              Software Products Built for Essential Bangladesh Industries
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Battle-tested multi-tenant platforms delivering automated workflows, local payment reconciliation, and sovereign data compliance.
            </p>
          </div>
        </div>
      </section>

      <FeaturedProducts products={products} />
    </div>
  );
}
