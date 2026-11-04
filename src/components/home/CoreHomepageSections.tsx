"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Code2, Boxes } from "lucide-react";
import { DEFAULT_HOMEPAGE_COPY } from "@/config/homepage.default-copy";

export interface ProductItem {
  id?: string;
  slug: string;
  name: string;
  category?: string;
  shortDescription?: string;
  summary?: string;
  description?: string;
  logoUrl?: string | null;
  liveUrl?: string | null;
}

export interface ServiceItem {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  summary?: string;
  shortDescription?: string;
  description?: string;
}

/* ============================================================================
   SECTION 02 — COMPANY INTRODUCTION (Editorial Split Layout)
   ============================================================================ */
export function CompanyIntroSection() {
  const { companyIntro } = DEFAULT_HOMEPAGE_COPY;

  return (
    <section className="py-20 md:py-28 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
              {companyIntro.eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              {companyIntro.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {companyIntro.description}
            </p>
            <div className="pt-2">
              <Link
                href={companyIntro.ctaHref}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--brand-blue)" }}
              >
                <span>{companyIntro.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Abstract Architectural Composition */}
          <div className="lg:col-span-6">
            <div
              className="rounded-2xl p-8 sm:p-10 border relative overflow-hidden"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <div className="mrm-solid-card rounded-xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-blue)" }}>
                    01 / Thoughtful Design
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    User-centered interfaces built for clarity, accessibility, and operational simplicity.
                  </p>
                </div>
                <div className="mrm-solid-card rounded-xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-cyan)" }}>
                    02 / Practical Engineering
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Clean, maintainable Next.js, NestJS, and PostgreSQL architectures built for real needs.
                  </p>
                </div>
              </div>
              <div className="mt-6 mrm-glass-panel rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
                    Core Philosophy
                  </p>
                  <p className="text-sm font-bold mt-1" style={{ color: "var(--text-primary)" }}>
                    Solving real business problems without unnecessary complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 03 — BUSINESS AREAS (Two Large Contrasting Feature Panels)
   ============================================================================ */
export function BusinessAreasSection() {
  const { businessAreas } = DEFAULT_HOMEPAGE_COPY;

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
            {businessAreas.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            {businessAreas.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {businessAreas.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Panel A: Software Products (Deep Navy Contrasting Panel) */}
          <div
            className="rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between"
            style={{
              background: "linear-gradient(145deg, #071A35 0%, #103B68 100%)",
            }}
          >
            <div className="space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-[#20B8D5]">
                <Boxes className="h-3.5 w-3.5" />
                <span>{businessAreas.areas[0].badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">{businessAreas.areas[0].title}</h3>
              <p className="text-slate-200 text-base leading-relaxed">
                {businessAreas.areas[0].description}
              </p>
              <ul className="space-y-2.5 pt-2">
                {businessAreas.areas[0].highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#20B8D5] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8 relative z-10">
              <Link
                href={businessAreas.areas[0].href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#20B8D5] hover:underline"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Panel B: Client Solutions (Clean Surface Panel) */}
          <div className="mrm-solid-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold"
                style={{ backgroundColor: "rgba(8, 127, 196, 0.1)", color: "var(--brand-blue)" }}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>{businessAreas.areas[1].badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                {businessAreas.areas[1].title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {businessAreas.areas[1].description}
              </p>
              <ul className="space-y-2.5 pt-2">
                {businessAreas.areas[1].highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--brand-blue)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8">
              <Link
                href={businessAreas.areas[1].href}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                style={{ color: "var(--brand-blue)" }}
              >
                <span>{businessAreas.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 04 — SOFTWARE PRODUCTS (Selective Glass Surface + Real Logos)
   ============================================================================ */
export function ProductsShowcaseSection({ products }: { products?: ProductItem[] }) {
  const { productsSection } = DEFAULT_HOMEPAGE_COPY;
  const displayList: ProductItem[] =
    products && products.length > 0 ? products : productsSection.fallbackProducts;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
              {productsSection.eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              {productsSection.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {productsSection.description}
            </p>
          </div>
          <Link
            href={productsSection.ctaHref}
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
            style={{ color: "var(--brand-blue)" }}
          >
            <span>{productsSection.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {displayList.map((product) => {
            const desc = product.shortDescription || product.summary || product.description;
            return (
              <article
                key={product.slug}
                className="mrm-glass-panel rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#20B8D5]/50"
              >
                <div className="space-y-4">
                  {/* Real Product Logo from CMS if present, otherwise clean monogram badge */}
                  <div className="flex items-center justify-between gap-4">
                    {product.logoUrl ? (
                      <div className="relative h-10 w-32">
                        <Image
                          src={product.logoUrl}
                          alt={`${product.name} official logo`}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    ) : (
                      <span
                        className="inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: "rgba(8, 127, 196, 0.12)", color: "var(--brand-blue)" }}
                      >
                        {product.category || "Software Platform"}
                      </span>
                    )}
                  </div>

                  {product.logoUrl && product.category && (
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-blue)" }}>
                      {product.category}
                    </p>
                  )}

                  <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {product.name}
                  </h3>

                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    <span>
                      {product.slug.includes("platform") ? "Explore Platform" : "Explore Product"}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 05 — SERVICES (10 Structured Service Cards)
   ============================================================================ */
export function ServicesGridSection({ services }: { services?: ServiceItem[] }) {
  const { servicesSection } = DEFAULT_HOMEPAGE_COPY;
  const list = services && services.length > 0 ? services.slice(0, 10) : servicesSection.items;

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
              {servicesSection.eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              {servicesSection.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {servicesSection.description}
            </p>
          </div>
          <Link
            href={servicesSection.ctaHref}
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
            style={{ color: "var(--brand-blue)" }}
          >
            <span>{servicesSection.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {list.map((service, idx) => {
            const item = service as Record<string, string | undefined>;
            const title = item.title || item.name || "Digital Service";
            const desc = item.shortDescription || item.summary || item.description || "";
            return (
              <div key={title} className="mrm-solid-card rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold" style={{ color: "var(--brand-cyan)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-bold" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 06 — WHY CHOOSE MRM INFOTECH (6 Editorial Value Cards)
   ============================================================================ */
export function WhyChooseUsSection() {
  const { whyChooseUs } = DEFAULT_HOMEPAGE_COPY;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
            {whyChooseUs.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            {whyChooseUs.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {whyChooseUs.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.cards.map((card, index) => (
            <div key={card.title} className="mrm-solid-card rounded-2xl p-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--brand-blue)" }}>
                  Principle 0{index + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand-cyan)" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 08 — HOW WE WORK (5-Step Process Sequence)
   ============================================================================ */
export function WorkProcessSection() {
  const { workProcess } = DEFAULT_HOMEPAGE_COPY;

  return (
    <section className="py-20 md:py-28 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
            {workProcess.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            {workProcess.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {workProcess.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-5">
          {workProcess.steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl p-6 border"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <span
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: "var(--brand-cyan)" }}
              >
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 09 — TECHNOLOGY EXPERTISE (Glass Badges, No Infinite Marquee)
   ============================================================================ */
export function TechExpertiseSection() {
  const { technology } = DEFAULT_HOMEPAGE_COPY;

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
            {technology.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            {technology.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {technology.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3.5">
          {technology.stack.map((tech) => (
            <div
              key={tech.name}
              className="mrm-glass-badge rounded-full px-5 py-3 flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--brand-cyan)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {tech.name}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 14 — FINAL CTA (Deep Navy + Large Glass Panel)
   ============================================================================ */
export function FinalCtaSection() {
  const { finalCta } = DEFAULT_HOMEPAGE_COPY;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl rounded-3xl p-8 sm:p-14 lg:p-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #071A35 0%, #103B68 60%, #087FC4 100%)",
        }}
      >
        {/* Cyan Ambient Highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full blur-[100px]"
          style={{ backgroundColor: "rgba(32, 184, 213, 0.35)" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 sm:p-12 space-y-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#20B8D5]">
            {finalCta.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {finalCta.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            {finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={finalCta.primaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#20B8D5] px-8 py-4 text-sm font-bold text-[#071A35] transition-transform hover:-translate-y-0.5"
            >
              <span>{finalCta.primaryCtaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={finalCta.secondaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <span>{finalCta.secondaryCtaLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

