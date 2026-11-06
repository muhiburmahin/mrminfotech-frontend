import React from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react';

interface ProductsCaseStudiesSectionProps {
  caseStudies: any[];
}

export default function ProductsCaseStudiesSection({ caseStudies }: ProductsCaseStudiesSectionProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/30 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
              Proven Production Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-3">
              Case Studies & Enterprise Deployments
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              Explore how real educational institutions, healthcare centers, and groups streamline operations with MRM InfoTech platforms.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all self-start md:self-auto"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => {
            const metrics = study.metrics || study.impactMetrics || [];

            return (
              <div
                key={study.id || study.slug || idx}
                className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[var(--theme-accent)]/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[var(--theme-bg-canvas)] text-[var(--theme-accent)] border border-[var(--theme-border-glass)]">
                      {study.clientName || study.industry || 'Case Study'}
                    </span>
                    <Trophy className="w-4 h-4 text-[var(--theme-accent)] opacity-70" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors line-clamp-2">
                      {study.title}
                    </h3>
                    {study.summary && (
                      <p className="text-xs text-[var(--theme-text-secondary)] mt-2 line-clamp-3 leading-relaxed">
                        {study.summary}
                      </p>
                    )}
                  </div>

                  {/* Verified Metrics Strip if Available */}
                  {Array.isArray(metrics) && metrics.length > 0 && (
                    <div className="pt-2 grid grid-cols-2 gap-2 border-t border-[var(--theme-border-glass)]">
                      {metrics.slice(0, 2).map((m: any, mIdx: number) => (
                        <div key={mIdx} className="p-2 rounded-xl bg-[var(--theme-bg-canvas)]">
                          <span className="text-sm font-black text-[var(--theme-accent)] font-mono block">
                            {m.value || m.metric}
                          </span>
                          <span className="text-[10px] text-[var(--theme-text-muted)] line-clamp-1">
                            {m.label || m.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-[var(--theme-border-glass)]">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

