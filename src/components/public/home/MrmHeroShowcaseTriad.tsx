'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  Code2,
  CheckCircle2,
  Sparkles,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface EcosystemItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeStyle: 'live' | 'ready' | 'enterprise' | 'active';
  icon: React.ReactNode;
  href: string;
}

const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    id: 'eco-1',
    name: 'EduManage BD',
    category: 'School & University ERP',
    badge: 'LIVE ERP',
    badgeStyle: 'live',
    icon: <GraduationCap className="w-3.5 h-3.5 text-[#C6F432]" />,
    href: '/products/edumanage-bd',
  },
  {
    id: 'eco-2',
    name: 'MediSheba BD',
    category: 'Diagnostic & Clinic ERP',
    badge: 'Healthcare',
    badgeStyle: 'ready',
    icon: <HeartPulse className="w-3.5 h-3.5 text-[#C6F432]" />,
    href: '/products/medisheba-bd',
  },
  {
    id: 'eco-3',
    name: 'Multi-Institution Platform',
    category: 'Cluster SaaS Infrastructure',
    badge: 'Enterprise',
    badgeStyle: 'enterprise',
    icon: <Building2 className="w-3.5 h-3.5 text-white" />,
    href: '/products/multi-institution-platform',
  },
  {
    id: 'eco-4',
    name: 'Client Custom Cloud',
    category: 'Bespoke Software & APIs',
    badge: 'Active SLA',
    badgeStyle: 'active',
    icon: <Code2 className="w-3.5 h-3.5 text-white/70" />,
    href: '/services',
  },
];

export function MrmHeroShowcaseTriad() {
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('eco-1');

  return (
    <div className="w-full mt-14 sm:mt-20 relative z-10">
      {/* 3 Interactive Radiant Glass Cards (Sitting directly inside the green beam) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Live Products & Platforms */}
        <div className="rounded-3xl border border-white/15 bg-[#0B0B0C]/80 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/35 hover:scale-[1.02] neon-card-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span className="uppercase tracking-wider">Live SaaS Ecosystem</span>
              </div>
              <span className="text-[10px] font-mono text-[#C6F432] font-bold">4 Active</span>
            </div>

            <div className="space-y-2.5">
              {ECOSYSTEM_ITEMS.map((item) => {
                const isSelected = activeItem === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveItem(item.id)}
                    className={`flex items-center justify-between gap-3 p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-white/30 shadow-lg'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                        {item.icon}
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-xs font-bold text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-white/50 truncate">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {item.badgeStyle === 'live' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#C6F432] text-[#0B0B0C] shadow-[0_0_10px_rgba(198,244,50,0.4)]">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeStyle === 'ready' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#C6F432]/60 text-[#C6F432] bg-[#C6F432]/10">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeStyle === 'enterprise' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white/80 bg-white/10 border border-white/15">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeStyle === 'active' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/50 bg-white/5">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span>Multi-tenant cloud</span>
            <span className="text-[#C6F432] font-semibold">Instant provisioning</span>
          </div>
        </div>

        {/* Card 2: System Velocity & Health Score (Upward Glowing Chart) */}
        <div className="rounded-3xl border border-white/15 bg-[#0B0B0C]/80 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/35 hover:scale-[1.02] neon-card-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
                <span className="uppercase tracking-wider">System Health Score</span>
              </div>
              <Activity className="w-3.5 h-3.5 text-[#C6F432]" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  99.4
                </span>
                <span className="text-xs text-white/50">/ 100 enterprise SLA</span>
              </div>

              <button
                type="button"
                onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                  autoSyncEnabled
                    ? 'border-[#C6F432] text-[#C6F432] bg-[#C6F432]/15 shadow-[0_0_14px_rgba(198,244,50,0.25)]'
                    : 'border-white/20 text-white/50 bg-white/5'
                }`}
              >
                {autoSyncEnabled ? 'Auto-sync on' : 'Auto-sync off'}
              </button>
            </div>

            {/* Neon Lime Green Upward Trend Chart with Luminous Gradient Fill */}
            <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 p-2">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 240 80"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="limeAuroraGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C6F432" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#C6F432" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path
                  d="M 0,65 L 30,55 L 60,60 L 90,45 L 120,48 L 150,30 L 180,28 L 210,18 L 240,8 L 240,80 L 0,80 Z"
                  fill="url(#limeAuroraGradient)"
                />
                {/* Glowing Neon Stroke */}
                <path
                  d="M 0,65 L 30,55 L 60,60 L 90,45 L 120,48 L 150,30 L 180,28 L 210,18 L 240,8"
                  stroke="#C6F432"
                  strokeWidth="2.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_8px_#C6F432]"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span>Execution velocity</span>
            <span className="text-[#C6F432] font-mono font-bold">+24.8% throughput</span>
          </div>
        </div>

        {/* Card 3: Cloud Deployment Timeline */}
        <div className="rounded-3xl border border-white/15 bg-[#0B0B0C]/80 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/35 hover:scale-[1.02] neon-card-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
                <span className="uppercase tracking-wider">Deployment Pipeline</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">Live CI/CD</span>
            </div>

            {/* Timeline Gantt Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-3 px-1">
              <span>09:00</span>
              <span>10:00</span>
              <span className="text-[#C6F432] font-bold">11:00</span>
              <span>12:00</span>
            </div>

            {/* Gantt Bars Composition */}
            <div className="relative h-28 w-full rounded-2xl bg-white/[0.02] border border-white/10 p-3 flex flex-col justify-around overflow-hidden">
              {/* Vertical Neon Tracker Needle */}
              <div className="absolute top-0 bottom-0 left-[58%] w-[1.5px] bg-[#C6F432] shadow-[0_0_10px_#C6F432] z-20" />

              {/* Track 1: Next.js Edge Pod */}
              <div className="relative h-4 w-full rounded-md bg-white/5 flex items-center">
                <div className="absolute left-[35%] w-[42%] h-3.5 rounded bg-[#C6F432] shadow-[0_0_12px_rgba(198,244,50,0.5)] flex items-center px-2">
                  <span className="text-[8px] font-black text-[#0B0B0C] tracking-tight truncate">
                    Next.js Edge
                  </span>
                </div>
              </div>

              {/* Track 2: NestJS Modular API */}
              <div className="relative h-4 w-full rounded-md bg-white/5 flex items-center">
                <div className="absolute left-[8%] w-[35%] h-3.5 rounded bg-white/20 flex items-center px-2">
                  <span className="text-[8px] font-bold text-white/90 truncate">
                    NestJS API
                  </span>
                </div>
                <div className="absolute left-[60%] w-[32%] h-3.5 rounded bg-[#C6F432]/60 flex items-center px-2">
                  <span className="text-[8px] font-bold text-[#0B0B0C] truncate">
                    Sync
                  </span>
                </div>
              </div>

              {/* Track 3: PostgreSQL ACID DB */}
              <div className="relative h-4 w-full rounded-md bg-white/5 flex items-center">
                <div className="absolute left-[44%] w-[48%] h-3.5 rounded bg-[#C6F432] shadow-[0_0_12px_rgba(198,244,50,0.5)] flex items-center px-2">
                  <span className="text-[8px] font-black text-[#0B0B0C] tracking-tight truncate">
                    PostgreSQL ACID
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span>Deploy pipeline</span>
            <span className="text-[#C6F432] font-semibold">Zero-downtime rolling</span>
          </div>
        </div>
      </div>
    </div>
  );
}

