'use client';

import React from 'react';
import {
  Code,
  Layers,
  Database,
  Cpu,
  Server,
  Cloud,
  FileCode2,
  Terminal,
} from 'lucide-react';

export function TechExpertise() {
  const technologies = [
    { name: 'TypeScript', category: 'Language', icon: FileCode2, highlight: '#3178C6' },
    { name: 'JavaScript', category: 'Language', icon: Code, highlight: '#F7DF1E' },
    { name: 'React', category: 'Frontend', icon: Layers, highlight: '#61DAFB' },
    { name: 'Next.js', category: 'Framework', icon: Terminal, highlight: '#000000' },
    { name: 'NestJS', category: 'Backend Engine', icon: Server, highlight: '#E0234E' },
    { name: 'Node.js', category: 'Runtime', icon: Cpu, highlight: '#339933' },
    { name: 'PostgreSQL', category: 'Database', icon: Database, highlight: '#4169E1' },
    { name: 'Prisma ORM', category: 'Data Layer', icon: Database, highlight: '#2D3748' },
    { name: 'Tailwind CSS', category: 'Styling', icon: Layers, highlight: '#06B6D4' },
    { name: 'Docker', category: 'DevOps & Cloud', icon: Cloud, highlight: '#2496ED' },
  ];

  return (
    <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
            <span>ENGINEERING STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
            Our Technology Expertise
          </h2>
          <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
            We rely on battle-tested, high-concurrency modern technologies to deliver robust, scalable software with zero technical compromises.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {technologies.map((t) => {
            const IconComp = t.icon;
            return (
              <div
                key={t.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F4F8FC] dark:bg-[#103B68]/40 text-[#087FC4] dark:text-[#20B8D5] group-hover:bg-[#087FC4]/10 flex items-center justify-center flex-shrink-0 transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors leading-tight">
                    {t.name}
                  </h4>
                  <span className="text-[11px] text-[#66758A] dark:text-slate-400">
                    {t.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
