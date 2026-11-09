import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Code2,
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Building2,
  Globe,
  Smartphone,
  Palette,
  Search,
  Megaphone,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export default function WhatWeDo() {
  const proprietaryProducts = [
    {
      name: 'EduManage BD',
      category: 'Education ERP System',
      description: 'Unified academic operations, biometric attendance, and fee collection for schools and universities.',
      badge: 'Live SaaS',
      icon: GraduationCap,
      href: '/products/edumanage-bd',
    },
    {
      name: 'MediSheba BD',
      category: 'Healthcare & Diagnostic Lab ERP',
      description: 'End-to-end diagnostic workflow automation with barcode test sample routing and digital doctor reports.',
      badge: 'Live SaaS',
      icon: HeartPulse,
      href: '/products/medisheba-bd',
    },
    {
      name: 'MRM Multi-Institution Platform',
      category: 'Institutional Multi-Tenant SaaS',
      description: 'Centralized governance engine allowing educational chains and organizations to manage dozens of sites.',
      badge: 'Enterprise Platform',
      icon: Building2,
      href: '/products/multi-institution-platform',
    },
  ];

  const clientServices = [
    { name: 'Web Application Development', desc: 'Modern reactive web platforms & high-concurrency systems', icon: Globe },
    { name: 'Custom Software Development', desc: 'Tailor-made backend architecture & bespoke enterprise ERPs', icon: Cpu },
    { name: 'Mobile App Development', desc: 'Native & cross-platform iOS and Android applications', icon: Smartphone },
    { name: 'UI/UX & Product Design', desc: 'Design systems, wireframing, and intuitive digital interfaces', icon: Palette },
    { name: 'SEO Architecture & Optimization', desc: 'Technical SEO, Core Web Vitals audit, and organic search growth', icon: Search },
    { name: 'Digital Marketing & Growth', desc: 'High-conversion marketing funnels and data-backed analytics', icon: Megaphone },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 text-[var(--theme-text-primary)] border-t border-[var(--theme-border-glass)] transition-colors duration-200 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
            WHAT WE DO
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Two Areas of Expertise. <br />
            <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
              One Technology Vision.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
            We bridge the gap between in-house proprietary software incubation and bespoke enterprise
            engineering—delivering technology solutions engineered for real-world impact.
          </p>
        </div>

        {/* Dual Asymmetric Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* =================================================================
              COLUMN A — OUR OWN PROPRIETARY SAAS PRODUCTS (lg:col-span-6)
              Deep surface treatment, glowing edge highlight, product interface cards
              ================================================================= */}
          <div className="lg:col-span-6 p-7 sm:p-10 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Corner Accent Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--theme-accent)]/10 blur-3xl"
            />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                  PROPRIETARY SAAS SUITE
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--theme-text-primary)]">
                  Our Own Software Products
                </h3>
                <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                  We conceptualize, architect, and continuously operate specialized cloud SaaS platforms
                  built to resolve systemic operational bottlenecks in high-stake industries.
                </p>
              </div>

              {/* Software Interface Mini Previews */}
              <div className="space-y-3.5 pt-2">
                {proprietaryProducts.map((product) => {
                  const Icon = product.icon;
                  return (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="block p-4 rounded-2xl bg-[var(--theme-bg-canvas)]/80 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 hover:shadow-[0_0_20px_var(--theme-accent-subtle)] transition-all group/card"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5 border border-[var(--theme-accent)]/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-[var(--theme-text-primary)] group-hover/card:text-[var(--theme-accent)] transition-colors truncate">
                              {product.name}
                            </h4>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 shrink-0">
                              {product.badge}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[var(--theme-accent)] block mt-0.5">
                            {product.category}
                          </span>
                          <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between relative z-10">
              <span className="text-xs text-[var(--theme-text-muted)] font-mono">
                3 ENTERPRISE ECOSYSTEMS
              </span>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-accent)] hover:underline group/cta"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* =================================================================
              COLUMN B — CLIENT DIGITAL SOLUTIONS (lg:col-span-6)
              Architectural glass card, rich capability badges, full-stack spectrum
              ================================================================= */}
          <div className="lg:col-span-6 p-7 sm:p-10 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/60 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Secondary Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[var(--theme-accent)]/5 blur-3xl"
            />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center border border-[var(--theme-accent)]/30">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[var(--theme-bg-canvas)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)]">
                  BESPOKE CLIENT ENGINEERING
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--theme-text-primary)]">
                  Client Digital Solutions
                </h3>
                <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                  We partner with global institutions and ambitious companies to deliver tailored web platforms,
                  resilient cloud architectures, and user-centric applications from inception to scale.
                </p>
              </div>

              {/* Asymmetric Capability Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {clientServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.name}
                      className="p-3.5 rounded-2xl bg-[var(--theme-bg-canvas)]/70 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:bg-[var(--theme-accent)]/5 transition-all group/item"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-[var(--theme-text-primary)] group-hover/item:text-[var(--theme-accent)] transition-colors leading-tight">
                          {service.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[var(--theme-text-secondary)] pl-9 leading-relaxed line-clamp-2">
                        {service.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quality Guarantee Callout */}
              <div className="p-3.5 rounded-2xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)] shrink-0" />
                <p className="text-xs text-[var(--theme-text-secondary)] font-medium">
                  Backed by automated CI/CD pipelines, secure engineering practices, and clearly agreed service levels.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between relative z-10">
              <span className="text-xs text-[var(--theme-text-muted)] font-mono">
                FULL-CYCLE ENGINEERING
              </span>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--theme-accent)] hover:underline group/cta"
              >
                <span>Explore All Services</span>
                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

