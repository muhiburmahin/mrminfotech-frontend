import React from 'react';

export function StatsSection() {
  const stats = [
    { value: '14', label: 'Engineering Disciplines', sub: 'Custom software to DevOps' },
    { value: '3', label: 'Flagship SaaS Engines', sub: 'Education, Health, Enterprise' },
    { value: '99.98%', label: 'Production Uptime SLA', sub: 'Contractually guaranteed' },
    { value: '40K+', label: 'Daily Peak Operations', sub: 'Real-time telemetry verified' },
    { value: '100%', label: 'Data Sovereignty', sub: 'Fully compliant cloud hosting' },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-gradient-to-b dark:from-[#07162C] dark:to-[#040D1A] text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-[#1E3557]">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={`space-y-2 px-4 ${
                idx === 4 ? 'col-span-2 lg:col-span-1 pt-6 lg:pt-0' : ''
              }`}
            >
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#087FC4] to-[#20B8D5] dark:from-[#00C2FF] dark:to-blue-400 tracking-tight">
                {s.value}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">{s.label}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

