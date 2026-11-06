/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import type { ProductRecord } from '@/types/product.types';

interface ProductPreviewModalProps {
  product: ProductRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductPreviewModal({ product, isOpen, onClose }: ProductPreviewModalProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen || !product) return null;

  const viewportWidth =
    viewport === 'mobile'
      ? 'max-w-[390px]'
      : viewport === 'tablet'
      ? 'max-w-[768px]'
      : 'max-w-[1200px]';

  const primaryCover =
    product.mediaItems?.find((m) => m.isPrimary)?.url ||
    product.mediaItems?.[0]?.url ||
    product.images?.[0] ||
    product.thumbnailUrl ||
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150">
      {/* Top Preview Control Bar */}
      <header className="h-16 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Admin Draft Preview
          </span>
          <h2 className="text-sm font-bold text-white truncate max-w-xs">{product.title}</h2>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            /products/{product.slug}
          </span>
        </div>

        {/* Viewport Switcher Controls */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700/80">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'desktop'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'tablet'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Preview Viewport Canvas */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-slate-950">
        <div
          className={`w-full ${viewportWidth} bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col`}
        >
          {/* Mock Public Hero Header */}
          <section className="relative px-6 py-12 md:py-20 border-b border-[var(--theme-border-glass)] overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                  {product.category?.name || product.categoryName || 'Software Product'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/15">
                  {product.stage || 'LIVE'}
                </span>
                {product.version && (
                  <span className="text-xs text-[var(--theme-text-secondary)] font-mono">
                    v{product.version}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {product.title}
              </h1>

              {product.tagline && (
                <p className="text-lg sm:text-xl font-medium text-[var(--theme-accent)]">
                  {product.tagline}
                </p>
              )}

              <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] max-w-2xl leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] font-bold text-sm shadow-lg shadow-[var(--theme-accent-glow)] inline-flex items-center gap-2"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <span className="px-5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] text-white font-bold text-sm bg-white/5 inline-flex items-center gap-2">
                  <span>Request a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Hero Cover Mockup */}
            {primaryCover && (
              <div className="max-w-4xl mx-auto mt-10 rounded-2xl overflow-hidden border border-[var(--theme-border-glass)] shadow-2xl bg-black/40">
                <img
                  src={primaryCover}
                  alt={product.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}
          </section>

          {/* Key Features Preview */}
          {product.richFeatures && product.richFeatures.length > 0 && (
            <section className="px-6 py-12 border-b border-[var(--theme-border-glass)]">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] mb-2">
                  Key Capabilities
                </h3>
                <h2 className="text-2xl font-black text-white mb-8">Architected for Real Impact</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.richFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] space-y-2"
                    >
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)]">
                        {feat.categoryName || 'Feature'}
                      </span>
                      <h4 className="text-base font-bold text-white">{feat.title}</h4>
                      <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                        {feat.shortDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Value Benefits Preview */}
          {product.benefits && product.benefits.length > 0 && (
            <section className="px-6 py-12 border-b border-[var(--theme-border-glass)]">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] mb-2">
                  Practical Advantages
                </h3>
                <h2 className="text-2xl font-black text-white mb-8">Measurable Value Delivery</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{b.title}</h4>
                        <p className="text-xs text-[var(--theme-text-secondary)] mt-1 leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Demonstration Preview */}
          {product.demonstrations && product.demonstrations.length > 0 && (
            <section className="px-6 py-12 border-b border-[var(--theme-border-glass)]">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] mb-2">
                  Demonstrations
                </h3>
                <h2 className="text-2xl font-black text-white mb-6">Interactive Interface Walkthrough</h2>

                <div className="space-y-6">
                  {product.demonstrations.map((demo, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border border-[var(--theme-border-glass)] bg-slate-900/60"
                    >
                      <img
                        src={demo.mediaUrl}
                        alt={demo.title}
                        className="w-full h-auto object-cover max-h-80"
                      />
                      <div className="p-4">
                        <h4 className="text-sm font-bold text-white">{demo.title}</h4>
                        {demo.description && (
                          <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                            {demo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Product FAQs */}
          {product.productFaqs && product.productFaqs.length > 0 && (
            <section className="px-6 py-12">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--theme-accent)] mb-2">
                  Frequently Asked Questions
                </h3>
                <h2 className="text-2xl font-black text-white mb-6">Common Inquiries</h2>

                <div className="space-y-3">
                  {product.productFaqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)]"
                    >
                      <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                      <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
