'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItemData {
  id?: string;
  question: string;
  answer: string;
  category?: string | null;
}

const DEFAULT_FAQS: FaqItemData[] = [
  {
    id: 'faq-1',
    question: 'What areas of technology does MRM InfoTech specialize in?',
    answer:
      'MRM InfoTech operates across two primary areas: building our own industry-focused SaaS software products (EduManage BD, MediSheba BD, and the Multi-Institution Website Platform) and delivering custom software, web applications, websites, and digital growth solutions for clients.',
  },
  {
    id: 'faq-2',
    question: 'How does MRM InfoTech approach a new client software project?',
    answer:
      'We follow a structured five-stage engineering process: Discover (understanding your goals and operational requirements), Plan (defining scope and suitable architecture), Design & Build, Test & Refine, and Launch & Support.',
  },
  {
    id: 'faq-3',
    question: 'Can we request a walkthrough or customization for EduManage BD or MediSheba BD?',
    answer:
      'Yes. You can explore each product page or reach out through our Start a Project or Contact page to discuss institutional onboarding, product walkthroughs, or custom workflow requirements.',
  },
  {
    id: 'faq-4',
    question: 'Do you work with both local and international organizations?',
    answer:
      'Yes. We build software products and custom digital solutions for organizations in Bangladesh as well as international businesses seeking reliable long-term engineering partners.',
  },
];

export default function HomeFaqAccordion({ items }: { items?: FaqItemData[] }) {
  const list = items && items.length > 0 ? items : DEFAULT_FAQS;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto">
      {list.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={faq.id || idx} className="mrm-solid-card rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087FC4] cursor-pointer"
            >
              <span className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
                {faq.question}
              </span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'rotate-180 bg-[#087FC4] text-white'
                    : 'bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5]'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
