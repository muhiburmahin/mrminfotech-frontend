import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Layers } from 'lucide-react';

export default function WhoWeAre() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200">
      {/* Subtle Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[var(--theme-accent)]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[var(--theme-accent)]/5 blur-3xl"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline, Story & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/80 text-[var(--theme-accent)] text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>ABOUT MRM INFOTECH • DUAL-ENGINE ARCHITECTURE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12]">
              Technology With Purpose. <br />
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Innovation With Impact.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-2xl">
              MRM InfoTech is a technology company focused on building innovative software products
              and delivering reliable digital solutions that help businesses grow and operate smarter.
              We combine in-house product incubation with bespoke enterprise software engineering.
            </p>

            {/* Architecture Telemetry Micro-Row */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y border-[var(--theme-border-glass)]">
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                  Full
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                  IP Ownership
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] hidden sm:block">
                  Proprietary codebase
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                  CI/CD
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                  Delivery Pipeline
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] hidden sm:block">
                  Automated releases
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] block">
                  Zero
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)] block mt-0.5">
                  Tech Shortcuts
                </span>
                <span className="text-[11px] text-[var(--theme-text-muted)] hidden sm:block">
                  Strict type safety
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/start-project"
                className="px-7 py-3.5 rounded-xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] font-black text-sm shadow-lg shadow-[var(--theme-accent-glow)] hover:brightness-110 active:scale-[0.98] transition-all inline-flex items-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="px-6 py-3.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/60 text-[var(--theme-text-primary)] font-bold text-sm hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
              >
                Discover Our Products
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Visual Composition & Core Philosophy Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow Border */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--theme-accent)]/20 to-transparent blur-xl opacity-70"
              />

              <div className="p-7 sm:p-9 rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/95 backdrop-blur-2xl shadow-2xl relative z-10 space-y-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between border-b border-[var(--theme-border-glass)] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--theme-text-secondary)]">
                      Core Engineering Philosophy
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 font-bold">
                    EST. 2024
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Philosophy 1 */}
                  <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)]/70 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 transition-colors group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center">
                          <Layers className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                          Product-Driven Thinking
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                        PROPRIETARY IP
                      </span>
                    </div>
                    <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed pl-9">
                      Creating scalable cloud platforms like EduManage BD and MediSheba BD that eliminate daily operational chaos.
                    </p>
                  </div>

                  {/* Philosophy 2 */}
                  <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)]/70 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 transition-colors group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                          Engineering Excellence
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                        ZERO-TRUST
                      </span>
                    </div>
                    <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed pl-9">
                      Clean architecture, automated testing, scalable database schemas, and future-proof enterprise tech stacks.
                    </p>
                  </div>

                  {/* Philosophy 3 */}
                  <div className="p-4 rounded-2xl bg-[var(--theme-bg-canvas)]/70 border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 transition-colors group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                          Durable Partnerships
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                        RELIABILITY
                      </span>
                    </div>
                    <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed pl-9">
                      Taking full technical ownership with transparent communication, predictable delivery, and continuous support.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--theme-border-glass)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)]">
                  <span>IDEAS • PRODUCTS • IMPACT</span>
                  <span className="text-[var(--theme-accent)] font-bold">MRM ECOSYSTEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

