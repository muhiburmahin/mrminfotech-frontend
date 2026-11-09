'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  Code2,
  Activity,
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
    icon: <GraduationCap className="w-3.5 h-3.5 text-[var(--theme-accent)]" />,
    href: '/products/edumanage-bd',
  },
  {
    id: 'eco-2',
    name: 'MediSheba BD',
    category: 'Diagnostic & Clinic ERP',
    badge: 'Healthcare',
    badgeStyle: 'ready',
    icon: <HeartPulse className="w-3.5 h-3.5 text-[var(--theme-accent)]" />,
    href: '/products/medisheba-bd',
  },
  {
    id: 'eco-3',
    name: 'Multi-Institution Platform',
    category: 'Cluster SaaS Infrastructure',
    badge: 'Enterprise',
    badgeStyle: 'enterprise',
    icon: <Building2 className="w-3.5 h-3.5 text-[var(--theme-text-primary)]" />,
    href: '/products/multi-institution-platform',
  },
  {
    id: 'eco-4',
    name: 'Client Custom Cloud',
    category: 'Bespoke Software & APIs',
    badge: 'Active',
    badgeStyle: 'active',
    icon: <Code2 className="w-3.5 h-3.5 text-[var(--theme-text-secondary)]" />,
    href: '/services',
  },
];

export function MrmHeroShowcaseTriad() {
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('eco-1');

  return (
    <div className="w-full mt-12 sm:mt-16 relative z-10">
      {/* 3 Interactive Radiant Glass Cards (Sitting directly inside the aurora beam) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Live Products & Platforms */}
        <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/85 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-[var(--theme-accent)]/50 hover:scale-[1.02] neon-card-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                <span className="uppercase tracking-wider">Live SaaS Ecosystem</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--theme-accent)] font-bold">4 Active</span>
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
                        ? 'bg-white/10 border-[var(--theme-accent)]/40 shadow-lg'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                        {item.icon}
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-xs font-bold text-[var(--theme-text-primary)] truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[var(--theme-text-secondary)] truncate">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {item.badgeStyle === 'live' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_10px_var(--theme-accent-glow)]">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeStyle === 'ready' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[var(--theme-accent)]/60 text-[var(--theme-accent)] bg-[var(--theme-accent)]/10">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeStyle === 'enterprise' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[var(--theme-text-primary)]/80 bg-white/10 border border-white/15">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeStyle === 'active' && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[var(--theme-text-secondary)] bg-white/5">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] text-[var(--theme-text-secondary)]">
            <span>Multi-tenant cloud</span>
            <span className="text-[var(--theme-accent)] font-semibold">Instant provisioning</span>
          </div>
        </div>

        {/* Card 2: System Velocity & Health Score (Upward Glowing Chart) */}
        <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/85 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-[var(--theme-accent)]/50 hover:scale-[1.02] neon-card-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
                <span className="uppercase tracking-wider">System Health Score</span>
              </div>
              <Activity className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[var(--theme-text-primary)] font-mono tracking-tight">
                  99.4
                </span>
                <span className="text-xs text-[var(--theme-text-secondary)]">/ 100 sample health score</span>
              </div>

              <button
                type="button"
                onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                  autoSyncEnabled
                    ? 'border-[var(--theme-accent)] text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 shadow-[0_0_14px_var(--theme-accent-glow)]'
                    : 'border-white/20 text-white/50 bg-white/5'
                }`}
              >
                {autoSyncEnabled ? 'Auto-sync on' : 'Auto-sync off'}
              </button>
            </div>

            {/* Glowing Trend Chart with Luminous Gradient Fill */}
            <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 p-2">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 240 80"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="themeAuroraGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path
                  d="M 0,65 L 30,55 L 60,60 L 90,45 L 120,48 L 150,30 L 180,28 L 210,18 L 240,8 L 240,80 L 0,80 Z"
                  fill="url(#themeAuroraGradient)"
                />
                {/* Glowing Neon Stroke */}
                <path
                  d="M 0,65 L 30,55 L 60,60 L 90,45 L 120,48 L 150,30 L 180,28 L 210,18 L 240,8"
                  stroke="var(--theme-accent)"
                  strokeWidth="2.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 8px var(--theme-accent))' }}
                />
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] text-[var(--theme-text-secondary)]">
            <span>Execution velocity</span>
            <span className="text-[var(--theme-accent)] font-mono font-bold">Sample data</span>
          </div>
        </div>

        {/* Card 3: Cloud Deployment Timeline */}
        <div className="rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/85 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-[var(--theme-accent)]/50 hover:scale-[1.02] neon-card-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
                <span className="uppercase tracking-wider">Deployment Pipeline</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--theme-text-secondary)]">Live CI/CD</span>
            </div>

            {/* Timeline Gantt Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--theme-text-secondary)] mb-3 px-1">
              <span>09:00</span>
              <span>10:00</span>
              <span className="text-[var(--theme-accent)] font-bold">11:00</span>
              <span>12:00</span>
            </div>

            {/* Gantt Bars Composition */}
            <div className="relative h-28 w-full rounded-2xl bg-white/[0.02] border border-white/10 p-3 flex flex-col justify-around overflow-hidden">
              {/* Vertical Neon Tracker Needle */}
              <div
                className="absolute top-0 bottom-0 left-[58%] w-[1.5px] bg-[var(--theme-accent)] z-20"
                style={{ boxShadow: '0 0 10px var(--theme-accent)' }}
              />

              {/* Track 1: Next.js Edge Pod */}
              <div className="relative h-4 w-full rounded-md bg-white/5 flex items-center">
                <div
                  className="absolute left-[35%] w-[42%] h-3.5 rounded bg-[var(--theme-accent)] flex items-center px-2"
                  style={{ boxShadow: '0 0 12px var(--theme-accent-glow)' }}
                >
                  <span className="text-[8px] font-black text-[var(--theme-accent-text)] tracking-tight truncate">
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
                <div className="absolute left-[60%] w-[32%] h-3.5 rounded bg-[var(--theme-accent)]/60 flex items-center px-2">
                  <span className="text-[8px] font-bold text-[var(--theme-accent-text)] truncate">
                    Sync
                  </span>
                </div>
              </div>

              {/* Track 3: PostgreSQL ACID DB */}
              <div className="relative h-4 w-full rounded-md bg-white/5 flex items-center">
                <div
                  className="absolute left-[44%] w-[48%] h-3.5 rounded bg-[var(--theme-accent)] flex items-center px-2"
                  style={{ boxShadow: '0 0 12px var(--theme-accent-glow)' }}
                >
                  <span className="text-[8px] font-black text-[var(--theme-accent-text)] tracking-tight truncate">
                    PostgreSQL ACID
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--theme-border)]/50 flex items-center justify-between text-[11px] text-[var(--theme-text-secondary)]">
            <span>Deploy pipeline</span>
            <span className="text-[var(--theme-accent)] font-semibold">Rolling deploys</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MrmHeroShowcaseTriad;
