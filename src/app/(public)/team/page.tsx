import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import { TeamGrid, PublicTeamMemberItem } from '@/components/public/team/TeamGrid';
import { Users, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team & Leadership | MRM InfoTech Ltd.',
  description:
    'Meet the engineering leaders and software architects behind MRM InfoTech Ltd. in Dhaka, Bangladesh.',
};

export default async function TeamPage() {
  const rawTeam = await PublicApiService.getTeamMembers('en');
  const teamMembers: PublicTeamMemberItem[] = Array.isArray(rawTeam)
    ? rawTeam
    : Array.isArray((rawTeam as unknown as { data: PublicTeamMemberItem[] })?.data)
    ? (rawTeam as unknown as { data: PublicTeamMemberItem[] }).data
    : [];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] shadow-xs">
              <Users className="w-3.5 h-3.5" />
              <span>THE MINDS BEHIND THE CODE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              The Architects &amp; Engineers Behind MRM InfoTech
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Experienced systems architects, developers, and product creators committed to engineering excellence and mission-critical software solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="py-20 bg-[#F8FAFC] dark:bg-[#040D1A] transition-colors duration-150 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamGrid members={teamMembers} />
        </div>
      </section>
    </div>
  );
}
