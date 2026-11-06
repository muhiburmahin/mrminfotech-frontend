'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import type { ProductFaqItem } from '@/types/product.types';

interface ProductFaqAccordionProps {
  faqs: ProductFaqItem[];
  productTitle: string;
}

export default function ProductFaqAccordion({ faqs, productTitle }: ProductFaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/30 transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight">
            Common Inquiries About {productTitle}
          </h2>
          <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] mt-2">
            Clear answers regarding architecture, deployment timelines, data security, and onboarding.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id || idx}
                className="rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--theme-bg-canvas)]/40 transition-colors"
                >
                  <span className="font-bold text-base sm:text-lg text-[var(--theme-text-primary)]">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[var(--theme-accent)] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[var(--theme-accent)] text-[var(--theme-accent-text)]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed border-t border-[var(--theme-border-glass)]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
