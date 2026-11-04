"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Cpu, Sparkles } from "lucide-react";
import { DEFAULT_HOMEPAGE_COPY } from "@/config/homepage.default-copy";

interface HeroProps {
  cmsData?: Partial<typeof DEFAULT_HOMEPAGE_COPY.hero>;
}

export function HeroSection({ cmsData }: HeroProps) {
  const content = { ...DEFAULT_HOMEPAGE_COPY.hero, ...cmsData };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
    >
      {/* Ambient Background Lighting (Blue & Cyan) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full blur-[110px] animate-ambient-slow"
        style={{ background: "var(--ambient-glow-blue)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 h-[360px] w-[360px] rounded-full blur-[100px] animate-ambient-slow"
        style={{ background: "var(--ambient-glow-cyan)", animationDelay: "4s" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 backdrop-blur-xl bg-white/70 dark:bg-white/[0.08] border border-white/80 dark:border-white/15 shadow-xs transition-colors">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--brand-cyan)" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.16em] uppercase"
                style={{ color: "var(--brand-blue)" }}
              >
                {content.eyebrow}
              </span>
            </div>

            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]"
              style={{ color: "var(--text-primary)" }}
            >
              {content.heading}
            </h1>

            <p
              className="max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {content.description}
            </p>

            {/* CTA Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <Link
                href={content.primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #087FC4 0%, #103B68 100%)",
                }}
              >
                <span>{content.primaryCtaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={content.secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold backdrop-blur-xl bg-white/75 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200/80 dark:border-white/20 shadow-xs transition-all duration-200 hover:-translate-y-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                <span>{content.secondaryCtaLabel}</span>
              </Link>
            </div>

            {/* Official Tagline Footnote */}
            <div className="pt-4 flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
              <span>IDEAS</span>
              <span style={{ color: "var(--brand-cyan)" }}>•</span>
              <span>PRODUCTS</span>
              <span style={{ color: "var(--brand-cyan)" }}>•</span>
              <span>IMPACT</span>
            </div>
          </div>

          {/* Right Column: Abstract Layered Glass Composition (No Fake Dashboard Stats) */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none min-h-[420px] flex items-center justify-center">
              {/* Central Architectural Core Panel */}
              <div className="relative z-10 w-full rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl md:backdrop-blur-2xl bg-white/70 dark:bg-[#0B1D31]/75 border border-white/80 dark:border-white/15 shadow-xl shadow-[#071A35]/5 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border-subtle)" }}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--brand-cyan)" }}>
                      MRM InfoTech Architecture
                    </p>
                    <h2 className="text-lg font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
                      Dual-Engine Technology Model
                    </h2>
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    <Layers className="h-5 w-5" />
                  </div>
                </div>

                {/* 3 Real Domain Identities */}
                <div className="space-y-3">
                  <div className="rounded-xl p-3.5 backdrop-blur-md bg-white/60 dark:bg-white/[0.05] border border-white/70 dark:border-white/10 shadow-xs transition-all duration-200 hover:border-[#087FC4]/30 dark:hover:border-[#20B8D5]/30">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#087FC4]" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          Education Technology Platforms
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          EduManage BD & Multi-Institution Portals
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl p-3.5 backdrop-blur-md bg-white/60 dark:bg-white/[0.05] border border-white/70 dark:border-white/10 shadow-xs transition-all duration-200 hover:border-[#20B8D5]/30 dark:hover:border-[#20B8D5]/30">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#20B8D5]" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          Healthcare & Diagnostic Systems
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          MediSheba BD Operational Suite
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl p-3.5 backdrop-blur-md bg-white/60 dark:bg-white/[0.05] border border-white/70 dark:border-white/10 shadow-xs transition-all duration-200 hover:border-[#103B68]/30 dark:hover:border-sky-400/30">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#103B68] dark:bg-sky-400" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          Custom Client Digital Solutions
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          Web Apps, SaaS, APIs & Business Automation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Pillar Footer */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-lg border border-slate-200/70 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-white/[0.04] p-3 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--brand-blue)" }}>
                      <Cpu className="h-3.5 w-3.5" />
                      <span>SaaS Products</span>
                    </div>
                    <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      Built for long-term industry scale
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200/70 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-white/[0.04] p-3 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--brand-cyan)" }}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Client Engineering</span>
                    </div>
                    <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      Tailored to exact workflows
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Top-Right Glass Pill */}
              <div className="animate-float-subtle hidden sm:flex items-center gap-2.5 rounded-xl px-4 py-2.5 absolute -top-5 -right-4 z-20 backdrop-blur-xl md:backdrop-blur-2xl bg-white/80 dark:bg-[#10243B]/80 border border-white/90 dark:border-white/20 shadow-lg shadow-[#071A35]/8 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/10">
                <Sparkles className="h-4 w-4" style={{ color: "var(--brand-cyan)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  Production-Grade Architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
