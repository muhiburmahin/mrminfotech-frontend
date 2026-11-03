'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Target, Compass } from 'lucide-react';
import type { CompanyProfile } from '@/lib/api/types';

interface CompanyIntroProps {
  company?: CompanyProfile | null;
}

export function CompanyIntro({ company }: CompanyIntroProps) {
  return (
    <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
            <span>WHO WE ARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight leading-tight">
            Technology Built Around Real-World Needs.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#66758A] dark:text-slate-300 leading-relaxed">
            {company?.description ||
              'We are MRM InfoTech, a technology company focused on developing software products and delivering practical digital solutions for businesses and organizations.'}
          </p>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#07162C] p-7 rounded-2xl border border-[#E3EAF2] dark:border-[#1E3557] shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F4F8FC] dark:bg-[#103B68]/40 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">Who We Are</h3>
            <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed">
              A team of passionate software engineers, product architects, and technology strategists driven by solving real societal and enterprise problems.
            </p>
          </div>

          <div className="bg-white dark:bg-[#07162C] p-7 rounded-2xl border border-[#E3EAF2] dark:border-[#1E3557] shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F4F8FC] dark:bg-[#103B68]/40 text-[#20B8D5] flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">What We Do</h3>
            <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed">
              We operate a dual engine: engineering high-impact proprietary SaaS products while building bespoke, production-ready systems for ambitious clients.
            </p>
          </div>

          <div className="bg-white dark:bg-[#07162C] p-7 rounded-2xl border border-[#E3EAF2] dark:border-[#1E3557] shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F4F8FC] dark:bg-[#103B68]/40 text-[#103B68] dark:text-[#20B8D5] flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">Our Approach</h3>
            <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed">
              We prioritize sustainable architecture, rigorous automated testing, and transparent collaboration over hype, delivering lasting value from day one.
            </p>
          </div>
        </div>

        {/* Bottom Link */}
        <div className="mt-10 flex items-center justify-start">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] hover:text-[#103B68] group transition-colors"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
