'use client';

import React from 'react';
import {
  Search,
  MapPin,
  Code2,
  CheckCircle2,
  Rocket,
} from 'lucide-react';

export function WorkProcess() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Understanding',
      desc: 'We analyze your core business objectives, pain points, and user workflows to establish clear project success criteria.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Planning & Strategy',
      desc: 'We design technical specifications, database schemas, API contracts, milestones, and realistic sprint roadmaps.',
      icon: MapPin,
    },
    {
      num: '03',
      title: 'Design & Development',
      desc: 'Modern UI/UX prototyping combined with modular, type-safe full-stack software development in iterative sprints.',
      icon: Code2,
    },
    {
      num: '04',
      title: 'Testing & Quality Assurance',
      desc: 'Rigorous unit testing, integration testing, end-to-end security checks, and cross-browser responsiveness verification.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Launch & Support',
      desc: 'Seamless cloud deployment, zero-downtime database migration, and ongoing SLA-backed maintenance and monitoring.',
      icon: Rocket,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
            From Idea to Impact
          </h2>
          <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
            A disciplined, transparent delivery framework engineered to eliminate guesswork and ship reliable software on schedule.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="flex flex-col p-6 rounded-2xl bg-[#F4F8FC] dark:bg-[#0A1F3F] border border-[#E3EAF2] dark:border-[#1E3557] hover:bg-white dark:hover:bg-[#0F2748] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 hover:shadow-lg transition-all duration-200 group relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#087FC4]/40 dark:text-[#20B8D5]/40 group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] group-hover:border-[#087FC4]/40 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#071A35] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#66758A] dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
