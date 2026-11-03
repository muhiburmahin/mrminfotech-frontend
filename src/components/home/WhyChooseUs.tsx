'use client';

import React from 'react';
import {
  ShieldCheck,
  Briefcase,
  Terminal,
  HeartHandshake,
  TrendingUp,
  Headphones,
} from 'lucide-react';

export function WhyChooseUs() {
  const points = [
    {
      title: 'Quality-Focused Development',
      desc: 'We adhere to clean architecture, automated testing, and comprehensive code reviews to build bulletproof systems that last.',
      icon: ShieldCheck,
      color: '#087FC4',
    },
    {
      title: 'Practical Business Solutions',
      desc: 'We don’t build technology for the sake of buzzwords. Every line of code is structured around solving concrete organizational challenges.',
      icon: Briefcase,
      color: '#20B8D5',
    },
    {
      title: 'Modern Technology',
      desc: 'We leverage battle-tested modern tools: TypeScript, Next.js, NestJS, and PostgreSQL, avoiding brittle or obsolete technical debt.',
      icon: Terminal,
      color: '#103B68',
    },
    {
      title: 'Client-Centered Approach',
      desc: 'Transparent sprint updates, clear milestone tracking, and direct developer communication without middlemen or hidden costs.',
      icon: HeartHandshake,
      color: '#087FC4',
    },
    {
      title: 'Scalable Solutions',
      desc: 'Our modular architectures and schema designs ensure your application effortlessly scales from 1,000 to 1,000,000 active users.',
      icon: TrendingUp,
      color: '#20B8D5',
    },
    {
      title: 'Ongoing Support',
      desc: 'Beyond deployment, we provide proactive maintenance, SLA guarantees, security patches, and 24/7 critical system monitoring.',
      icon: Headphones,
      color: '#103B68',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
            <span>ENGINEERING PRINCIPLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
            Why Work With Us?
          </h2>
          <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
            We combine high-level software engineering with pragmatic execution. Here is why ambitious businesses and institutions trust MRM InfoTech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.title}
                className="p-7 rounded-2xl bg-[#F4F8FC] dark:bg-[#0A1F3F] border border-[#E3EAF2] dark:border-[#1E3557] hover:bg-white dark:hover:bg-[#0F2748] hover:border-[#087FC4]/30 dark:hover:border-[#20B8D5]/30 hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-sm"
                  style={{ backgroundColor: p.color }}
                >
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
