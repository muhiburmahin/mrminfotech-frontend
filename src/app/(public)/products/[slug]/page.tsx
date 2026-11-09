/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ExternalLink, ChevronRight, CheckCircle2, Users, Target, Compass, Layers, GraduationCap, HeartPulse, Building2, BookOpen, Smartphone, Globe, Sparkles } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import type { ProductRecord } from '@/types/product.types';
import ProductInteractiveGallery from '@/components/public/products/ProductInteractiveGallery';
import ProductFeaturesView from '@/components/public/products/ProductFeaturesView';
import ProductDemoTabs from '@/components/public/products/ProductDemoTabs';
import ProductFaqAccordion from '@/components/public/products/ProductFaqAccordion';
import ProductsCaseStudiesSection from '@/components/public/products/ProductsCaseStudiesSection';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const product: ProductRecord | null = await PublicApiService.getProductBySlug(cleanSlug, 'en');

  if (!product) {
    return {
      title: 'Product Not Found | MRM InfoTech',
      description: 'The requested software product platform could not be found.',
    };
  }

  const title = product.seoTitle || `${product.title} | Cloud SaaS Platform | MRM InfoTech`;
  let rawDesc = product.seoDescription || product.shortDescription || product.description || '';
  if (rawDesc.length > 155) {
    rawDesc = rawDesc.slice(0, 152) + '...';
  }

  const canonicalUrl = product.canonicalUrl || `https://mrminfotech.com/products/${slug}`;
  const ogImg = product.ogImage || product.thumbnailUrl || product.images?.[0] || '/logo.png';

  return {
    title,
    description: rawDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: product.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: product.ogTitle || title,
      description: product.ogDescription || rawDesc,
      url: canonicalUrl,
      type: 'website',
      images: [{ url: ogImg }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.ogTitle || title,
      description: product.ogDescription || rawDesc,
      images: [product.twitterImage || ogImg],
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === 'true';
  const rawSlug = decodeURIComponent(slug);
  const cleanSlug = rawSlug.trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  if (rawSlug !== cleanSlug) {
    redirect(`/products/${cleanSlug}`);
  }

  const [product, allProducts] = await Promise.all([
    PublicApiService.getProductBySlug<ProductRecord>(cleanSlug, 'en', isPreview),
    PublicApiService.getProducts<ProductRecord[]>({ placement: 'catalog' }),
  ]);

  if (!product || (product.allowPublicDetail === false && !isPreview)) {
    notFound();
  }

  // Related products excluding current
  const relatedProducts = (Array.isArray(allProducts) ? allProducts : []).filter(
    (p) => p.slug !== product.slug
  );

  const getProductIcon = () => {
    const s = product.slug?.toLowerCase() || '';
    if (s.includes('edumanage')) return <GraduationCap className="w-8 h-8" />;
    if (s.includes('medisheba')) return <HeartPulse className="w-8 h-8" />;
    return <Building2 className="w-8 h-8" />;
  };

  const primaryImage =
    product.mediaItems?.find((m) => m.isPrimary)?.url ||
    product.thumbnailUrl ||
    product.images?.[0];

  // Secondary links
  const visibleLinks = (product.links || []).filter((l) => l.isVisible && l.url);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      {/* Schema.org SoftwareApplication Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.title,
            description: product.seoDescription || product.shortDescription || product.description,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Cloud, Web Browser, Mobile',
            url: `https://mrminfotech.com/products/${product.slug}`,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'BDT',
            },
            author: {
              '@type': 'Organization',
              name: 'MRM InfoTech',
              url: 'https://mrminfotech.com',
            },
          }),
        }}
      />
      {/* Admin Preview Watermark Banner */}
      {isPreview && (
        <div className="bg-amber-500 text-black px-4 py-2 text-center text-xs font-bold tracking-wide sticky top-20 z-50 shadow-md">
          ADMIN DRAFT PREVIEW MODE &bull; Live changes from the Admin Builder will be rendered here.
        </div>
      )}

      {/* =========================================================================
          01. HERO SECTION
         ========================================================================= */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-[var(--theme-border-glass)] overflow-hidden bg-[var(--theme-bg-canvas)]">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Strip */}
          <nav className="flex items-center gap-2 text-xs text-[var(--theme-text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--theme-text-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-[var(--theme-text-primary)] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--theme-accent)] font-semibold truncate">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Product Info & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]">
                  {product.categoryName || product.productType}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {product.stage || 'LIVE IN PRODUCTION'}
                </span>
                {product.version && (
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[var(--theme-bg-surface)] text-[var(--theme-text-muted)] border border-[var(--theme-border-glass)]">
                    {product.version}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 border border-[var(--theme-accent)]/30 shadow-inner">
                    {getProductIcon()}
                  </div>
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
                      {product.title}
                    </h1>
                  </div>
                </div>

                {product.tagline && (
                  <p className="text-lg sm:text-xl font-semibold text-[var(--theme-accent)] pt-1">
                    {product.tagline}
                  </p>
                )}

                <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
                  {product.shortDescription || product.description}
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--theme-border-glass)]">
                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_25px_var(--theme-accent-glow)] hover:opacity-90 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Production Demo</span>
                  </a>
                )}

                <Link
                  href={`/contact?subject=Demo%20Request%3A%20${encodeURIComponent(product.title)}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all cursor-pointer"
                >
                  <span>Request Custom Demo</span>
                  <ArrowRight className="w-4 h-4 text-[var(--theme-accent)]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Cover Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-4 sm:p-5 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--theme-border-glass)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-[var(--theme-text-muted)] ml-2">
                      {product.slug}.mrminfotech.com
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20">
                    SECURE CLOUD
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden aspect-[16/11] bg-black/50 border border-[var(--theme-border-glass)]">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={product.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[var(--theme-text-muted)]">
                      <Layers className="w-12 h-12 mb-2 opacity-50 text-[var(--theme-accent)]" />
                      <p className="text-xs">Live Cloud Platform</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. OVERVIEW & PROBLEM / SOLUTION
         ========================================================================= */}
      {(product.targetAudience || product.problemsAddressed || product.mainPurpose) && (
        <section className="py-16 sm:py-24 border-b border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/20 transition-colors duration-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
                Strategic Focus & Value Proposition
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-3">
                Why We Built {product.title}
              </h2>
              <p className="text-base text-[var(--theme-text-secondary)]">
                Engineered specifically to solve real organizational bottlenecks and establish digital trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Target Audience */}
              {product.targetAudience && (
                <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-7 space-y-4 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
                    Target Users & Organizations
                  </h3>
                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {product.targetAudience}
                  </p>
                </div>
              )}

              {/* Problems Addressed */}
              {product.problemsAddressed && (
                <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-7 space-y-4 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
                    Operational Problems Solved
                  </h3>
                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {product.problemsAddressed}
                  </p>
                </div>
              )}

              {/* Main Purpose */}
              {product.mainPurpose && (
                <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-7 space-y-4 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
                    Core Platform Mission
                  </h3>
                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {product.mainPurpose}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          03. INTERACTIVE LIGHTBOX GALLERY
         ========================================================================= */}
      {product.enableGallery &&
        ((product.mediaItems && product.mediaItems.length > 0) ||
          (product.images && product.images.length > 0)) && (
          <section className="py-16 sm:py-24 border-b border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] transition-colors duration-150">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
                  Interface Visuals & Telemetry
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-3">
                  Production Software Gallery
                </h2>
                <p className="text-base text-[var(--theme-text-secondary)]">
                  Browse authentic dashboards, workflows, and administrative telemetry screens.
                </p>
              </div>

              <ProductInteractiveGallery
                mediaItems={product.mediaItems}
                images={product.images}
                title={product.title}
                stage={product.stage}
              />
            </div>
          </section>
        )}

      {/* =========================================================================
          04. CATEGORIZED KEY FEATURES
         ========================================================================= */}
      {product.features && product.features.length > 0 && (
        <ProductFeaturesView features={product.features} productTitle={product.title} />
      )}

      {/* =========================================================================
          05. PRACTICAL VALUE-PROPOSITION BENEFITS
         ========================================================================= */}
      {product.benefits && product.benefits.length > 0 && (
        <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] transition-colors duration-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
                Quantifiable Advantages
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-3">
                Measurable Value for Your Organization
              </h2>
              <p className="text-base text-[var(--theme-text-secondary)]">
                Tangible efficiency gains experienced by administrators, clients, and team members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.benefits.map((benefit, idx) => (
                <div
                  key={benefit.id || idx}
                  className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 space-y-3 shadow-md hover:shadow-xl hover:border-[var(--theme-accent)]/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          06. PRODUCT DEMONSTRATIONS & WALKTHROUGHS
         ========================================================================= */}
      {product.enableDemos && product.demonstrations && product.demonstrations.length > 0 && (
        <ProductDemoTabs demos={product.demonstrations} productTitle={product.title} />
      )}

      {/* =========================================================================
          07. RELATED CASE STUDIES
         ========================================================================= */}
      {product.enableCaseStudies && product.caseStudies && product.caseStudies.length > 0 && (
        <ProductsCaseStudiesSection caseStudies={product.caseStudies} />
      )}

      {/* =========================================================================
          08. INTEGRATIONS & RESOURCES & LINKS
         ========================================================================= */}
      {((product.integrations && product.integrations.length > 0) || visibleLinks.length > 0) && (
        <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/20 transition-colors duration-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Integrations */}
            {product.integrations && product.integrations.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Supported Integrations & Ecosystem
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {product.integrations.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] shadow-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verified External Links & Download Ports */}
            {visibleLinks.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[var(--theme-border-glass)]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Official Resources & Portals
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.openInNewTab ? '_blank' : '_self'}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="p-4 rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] hover:border-[var(--theme-accent)]/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] flex items-center justify-center">
                          {link.linkType === 'DOCUMENTATION' ? (
                            <BookOpen className="w-4 h-4" />
                          ) : link.linkType === 'ANDROID_APP' || link.linkType === 'IOS_APP' ? (
                            <Smartphone className="w-4 h-4" />
                          ) : (
                            <Globe className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors block">
                            {link.title}
                          </span>
                          <span className="text-[10px] text-[var(--theme-text-muted)]">
                            {link.linkType.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          09. PRODUCT-SPECIFIC FAQS
         ========================================================================= */}
      {product.enableFaq && product.faqs && product.faqs.length > 0 && (
        <ProductFaqAccordion faqs={product.faqs} productTitle={product.title} />
      )}

      {/* =========================================================================
          10. RELATED PRODUCTS CATALOG
         ========================================================================= */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] transition-colors duration-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
                  More From MRM InfoTech
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-2">
                  Explore Other Cloud Solutions
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-accent)] hover:opacity-80 transition-opacity"
              >
                <span>View Full Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProducts.slice(0, 2).map((rel) => (
                <div
                  key={rel.slug}
                  className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[var(--theme-accent)]/50 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]">
                        {rel.categoryName || rel.productType}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">
                        {rel.stage || 'LIVE'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                      {rel.title}
                    </h3>

                    <p className="text-sm text-[var(--theme-text-secondary)] line-clamp-2 leading-relaxed">
                      {rel.shortDescription || rel.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[var(--theme-border-glass)] flex items-center justify-between">
                    <Link
                      href={`/products/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] hover:opacity-80 transition-opacity"
                    >
                      <span>Explore Product</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          11. FINAL PRODUCT CTA
         ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[var(--theme-bg-canvas)] border-t border-[var(--theme-border-glass)] relative overflow-hidden transition-colors duration-150 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Onboarding</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
            Ready to Deploy {product.title}?
          </h2>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Schedule a dedicated walkthrough with our product architects and discuss how we can tailor this platform for your operational scale.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?subject=Enterprise%20Deployment%3A%20${encodeURIComponent(product.title)}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_25px_var(--theme-accent-glow)] hover:opacity-90 transition-all"
            >
              <span>Schedule Product Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all"
            >
              <span>Discuss Custom Feature Set</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
