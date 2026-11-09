import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import { TeamGrid, PublicTeamMemberItem } from '@/components/public/team/TeamGrid';
import { Users, ShieldCheck, Cpu, Code2, Terminal } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Our Team & Leadership",
  description:
    "Meet the engineers, architects and product leaders behind MRM InfoTech.",
  path: "/team",
});

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

          {/* Enterprise Engineering Trust Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[var(--theme-border-glass)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--theme-text-primary)]">100% In-House</p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">Zero Outsourcing</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--theme-text-primary)]">Modern Tech Stack</p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">Next.js 16 &amp; NestJS</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--theme-text-primary)]">Enterprise Security</p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">OWASP &amp; ISO 27001</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--theme-text-primary)]">Direct Architect Access</p>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">24/7 SLA Backed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="py-16 lg:py-24 bg-[var(--theme-bg-surface)]/30 transition-colors duration-200 flex-1">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TeamGrid members={teamMembers} />
        </div>
      </section>
    </div>
  );
}
