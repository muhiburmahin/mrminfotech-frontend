/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { PlayCircle, Monitor, Smartphone, Workflow, Layers, ArrowRight } from 'lucide-react';
import type { ProductDemoItem } from '@/types/product.types';

interface ProductDemoTabsProps {
  demos: ProductDemoItem[];
  productTitle: string;
}

export default function ProductDemoTabs({ demos, productTitle }: ProductDemoTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!demos || demos.length === 0) return null;

  const currentDemo = demos[activeTab] || demos[0];

  const getDemoIcon = (demoType?: string) => {
    switch (demoType) {
      case 'MOBILE':
        return <Smartphone className="w-4 h-4" />;
      case 'VIDEO':
        return <PlayCircle className="w-4 h-4" />;
      case 'WALKTHROUGH':
        return <Workflow className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)]">
            Interactive Walkthroughs
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight mt-2 mb-3">
            How {productTitle} Works in Production
          </h2>
          <p className="text-base text-[var(--theme-text-secondary)]">
            Explore step-by-step user journeys, automated workflows, and administrative telemetry.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {demos.map((d, idx) => (
            <button
              key={d.id || idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_20px_var(--theme-accent-glow)]'
                  : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-text-primary)]'
              }`}
            >
              {getDemoIcon(d.demoType)}
              <span>
                {String(idx + 1).padStart(2, '0')}. {d.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Demo Panel */}
        <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-xs font-bold text-[var(--theme-accent)]">
              {getDemoIcon(currentDemo.demoType)}
              <span>{currentDemo.demoType || 'INTERACTIVE DEMO'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] tracking-tight">
              {currentDemo.title}
            </h3>

            {currentDemo.description && (
              <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed">
                {currentDemo.description}
              </p>
            )}

            {currentDemo.caption && (
              <p className="text-xs text-[var(--theme-text-muted)] italic pt-2 border-t border-[var(--theme-border-glass)]">
                &ldquo;{currentDemo.caption}&rdquo;
              </p>
            )}
          </div>

          {/* Right: Visual Preview */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--theme-border-glass)] bg-black/60 overflow-hidden shadow-xl aspect-[16/10] relative flex items-center justify-center">
              {currentDemo.mediaUrl ? (
                <img
                  src={currentDemo.mediaUrl}
                  alt={currentDemo.title}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-[var(--theme-text-muted)]">
                  <Layers className="w-10 h-10 mb-2 opacity-50 text-[var(--theme-accent)]" />
                  <p className="text-xs">Interactive Production Step</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

