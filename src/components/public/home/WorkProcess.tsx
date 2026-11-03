import React from 'react';
import { Search, Compass, GitMerge, CheckSquare, Rocket, RefreshCw } from 'lucide-react';

export function WorkProcess() {
  const steps = [
    {
      num: '01',
      icon: <Search className="w-5 h-5 text-[#0052CC]" />,
      title: 'Discovery & Domain Modeling',
      desc: 'We unpack business goals, map entity relations, analyze regulations, and formalize exact system scope.',
    },
    {
      num: '02',
      icon: <Compass className="w-5 h-5 text-[#00C2FF]" />,
      title: 'Architecture & Tech Selection',
      desc: 'Database schemas, REST/GraphQL contracts, caching strategies, and security threat vectors are engineered before writing code.',
    },
    {
      num: '03',
      icon: <GitMerge className="w-5 h-5 text-indigo-500" />,
      title: 'Agile Sprint Engineering',
      desc: 'Bi-weekly sprint releases with strict TypeScript typing, peer code reviews, and automated CI quality checks.',
    },
    {
      num: '04',
      icon: <CheckSquare className="w-5 h-5 text-emerald-500" />,
      title: 'QA & Concurrency Testing',
      desc: 'Rigorous unit testing, E2E regression pipelines, and simulated stress tests to guarantee stability under peak loads.',
    },
    {
      num: '05',
      icon: <Rocket className="w-5 h-5 text-purple-500" />,
      title: 'Zero-Downtime Deployment',
      desc: 'Containerized deployment pipelines, cloud DB replication, database constraint enforcement, and CDN edge optimization.',
    },
    {
      num: '06',
      icon: <RefreshCw className="w-5 h-5 text-cyan-600" />,
      title: 'SLA Support & Continuous Evolution',
      desc: 'Proactive server telemetry, audit monitoring, automated database backups, and feature sprint roadmapping.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider">
            <span>Our Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07162C] tracking-tight">
            Predictable 6-Step Delivery Lifecycle
          </h2>
          <p className="text-slate-600 text-base">
            From initial problem definition to post-launch SLA governance, our disciplined process
            guarantees transparency, speed, and architectural longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((st) => (
            <div
              key={st.num}
              className="relative p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-slate-300 tracking-tight">
                  {st.num}
                </span>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  {st.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#07162C] mb-2">{st.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

