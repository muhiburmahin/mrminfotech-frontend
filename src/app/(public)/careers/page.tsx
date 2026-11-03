import React from 'react';
import type { Metadata } from 'next';
import { Briefcase, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers & Engineering Culture | MRM InfoTech Ltd.',
  description:
    'Join MRM InfoTech Ltd. Build high-concurrency SaaS products and enterprise architectures in Dhaka, Bangladesh.',
};

export default function CareersPage() {
  const perks = [
    { title: 'Architectural Autonomy', desc: 'Work with clean code, NestJS, Next.js, and modern tools without legacy technical debt.' },
    { title: 'Competitive Compensation', desc: 'Market-leading salaries, performance bonuses, and annual review cycles.' },
    { title: 'Professional Growth', desc: 'Dedicated budget for certifications, books, and international developer conferences.' },
    { title: 'Sovereign Impact', desc: 'Build software that directly improves schools, clinics, and enterprises across Bangladesh.' },
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              Careers at MRM InfoTech
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Build Systems That Define South Asia’s Digital Infrastructure
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              We are assembling world-class engineers, product designers, and systems architects
              who value craftsmanship over shortcuts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Why Engineers Choose MRM InfoTech</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              A work environment built for deep technical focus, continuous learning, and measurable pride in shipped code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-[#040E1C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-sm space-y-4">
            <Briefcase className="w-8 h-8 text-[#087FC4] dark:text-[#00C2FF] mx-auto" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Open Positions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              We are currently accepting spontaneous applications from Senior NestJS Backend
              Engineers, Next.js Frontend Architects, and Cloud DevOps Specialists.
            </p>
            <div className="pt-2">
              <a
                href="mailto:careers@mrminfotech.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
              >
                <span>Send Resume to careers@mrminfotech.com</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
