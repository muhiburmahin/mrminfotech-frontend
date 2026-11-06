import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import type { ProductRecord, ProductCategory } from '@/types/product.types';
import ProductsCatalogHero from '@/components/public/products/ProductsCatalogHero';
import FeaturedProductSpotlight from '@/components/public/products/FeaturedProductSpotlight';
import ProductsCatalogClient from '@/components/public/products/ProductsCatalogClient';
import ProductsCaseStudiesSection from '@/components/public/products/ProductsCaseStudiesSection';
import ProductsFinalCta from '@/components/public/products/ProductsFinalCta';

export const metadata: Metadata = {
  title: 'Cloud SaaS Products & Digital Platforms | MRM InfoTech',
  description:
    'Discover MRM InfoTech’s proprietary cloud software platforms: EduManage BD for institutional education, MediSheba BD for healthcare, and Multi-Institution Platform.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Cloud SaaS Products & Digital Platforms | MRM InfoTech',
    description:
      'Purpose-built digital software platforms engineered for automated workflows, sovereign data security, and enterprise efficiency.',
    type: 'website',
  },
};

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function ProductsPage() {
  const [rawProducts, rawCategories, rawCaseStudies] = await Promise.all([
    PublicApiService.getProducts<ProductRecord[]>({ placement: 'catalog' }),
    PublicApiService.getProductCategories<ProductCategory[]>(),
    PublicApiService.getCaseStudies<any[]>('en'),
  ]);

  const products: ProductRecord[] = Array.isArray(rawProducts) ? rawProducts : [];
  const categories: ProductCategory[] = Array.isArray(rawCategories) ? rawCategories : [];
  const caseStudies: any[] = Array.isArray(rawCaseStudies) ? rawCaseStudies : [];

  // Pick highest-priority product marked as featured, or fallback to first
  const featuredProduct =
    products.find((p) => p.isFeatured) || (products.length > 0 ? products[0] : null);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      {/* 01. Products Hero Section */}
      <ProductsCatalogHero totalProducts={products.length} />

      {/* 02. Featured Product Spotlight */}
      <FeaturedProductSpotlight product={featuredProduct} />

      {/* 03 & 04. Category Filter Bar + Asymmetric Bento Showcase */}
      <ProductsCatalogClient initialProducts={products} categories={categories} />

      {/* 05. Associated Case Studies (Zero gap if none exist) */}
      <ProductsCaseStudiesSection caseStudies={caseStudies} />

      {/* 06. Final Enterprise Conversion CTA */}
      <ProductsFinalCta />
    </div>
  );
}
