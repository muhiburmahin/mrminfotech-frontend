'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import type { CompanyProfile } from '@/lib/api/types';

interface HomeCtaProps {
  company?: CompanyProfile | null;
}

export function HomeCta({ company }: HomeCtaProps) {
  const contactEmail = company?.email || 'contact@mrminfotech.com';

  return (
    <section className="py-20 bg-[#071A35] text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(32,184,213,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-dark-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103B68] border border-[#20B8D5]/30 text-xs font-bold text-[#20B8D5]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LET&apos;S WORK TOGETHER</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Have an Idea? Let&apos;s Build It Together.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s discuss your next software, website, or digital transformation project. Our engineering team is ready to help you architect, launch, and scale your vision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/start-project"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#087FC4] hover:bg-[#20B8D5] shadow-lg shadow-[#087FC4]/25 active:scale-[0.98] transition-all duration-200"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#103B68] hover:bg-[#103B68]/80 border border-[#20B8D5]/30 active:scale-[0.98] transition-all duration-200"
          >
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-[#103B68] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#20B8D5]" />
            <span>{contactEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B8D5]" />
            <span>HQ: Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
