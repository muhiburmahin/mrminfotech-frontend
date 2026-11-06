import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import { TeamGrid, PublicTeamMemberItem } from '@/components/public/team/TeamGrid';
import { Users, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team & Leadership',
  description:
    'Meet the engineering leaders, systems architects, and product creators behind MRM InfoTech Ltd. in Dhaka, Bangladesh.',
  alternates: {
    canonical: '/team',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function TeamPage() {
  const rawTeam = await PublicApiService.getTeamMembers('en');
  const teamMembers: PublicTeamMemberItem[] = Array.isArray(rawTeam)
    ? rawTeam
    : Array.isArray((rawTeam as unknown as { data: PublicTeamMemberItem[] })?.data)
    ? (rawTeam as unknown as { data: PublicTeamMemberItem[] }).data
    : [];

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200 min-h-screen overflow-x-hidden selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* Header Banner */}
      <section className="relative pt-24 pb-16 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/3 w-96 h-96 rounded-full bg-[var(--theme-accent)]/10 blur-[100px]"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <Users className="w-3.5 h-3.5" />
              <span>THE MINDS BEHIND THE CODE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14]">
              The Architects &amp; Engineers{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Behind MRM InfoTech
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              Experienced systems architects, developers, and product creators committed to engineering excellence,
              robust databases, and mission-critical software solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/30 transition-colors duration-200 flex-1">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TeamGrid members={teamMembers} />
        </div>
      </section>
    </div>
  );
}
