'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="space-y-4 max-w-3xl mx-auto">
      {list.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={faq.id || idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-xl border-lime-400/40 shadow-[0_0_25px_rgba(198,244,50,0.12)]'
                : 'bg-white/[0.03] backdrop-blur-md border-white/[0.08] hover:border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F432] cursor-pointer"
            >
              <span className="font-bold text-base sm:text-lg text-white">
                {faq.question}
              </span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-[#C6F432] text-[#0B0B0C] border-[#C6F432] shadow-sm'
                    : 'text-white/60 border-white/15 bg-white/[0.05]'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/[0.08]">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
