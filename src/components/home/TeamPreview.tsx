'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

interface TeamMemberData {
  name: string;
  roleTitle?: string;
  designation?: string;
  department?: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface TeamPreviewProps {
  team?: TeamMemberData[];
}

export function TeamPreview({ team }: TeamPreviewProps) {
  const hasTeam = Boolean(team && team.length > 0);

  return (
    <section className="py-20 bg-[#F8FAFC] dark:bg-[#040D1A] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3 shadow-xs">
              <Users className="w-3.5 h-3.5" />
              <span>THE MINDS BEHIND THE CODE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#15243A] dark:text-white tracking-tight">
              Leadership & Engineering Talent
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Experienced architects, systems developers, and product creators committed to engineering excellence.
            </p>
          </div>

          {hasTeam && (
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:gap-3 transition-all"
            >
              <span>View All Team Members</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasTeam ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team!.slice(0, 3).map((member, idx) => {
              const name = member.name || 'Engineer';
              const role = member.roleTitle || member.designation || 'Specialist';
              const dept = member.department || 'Engineering';
              const bio = member.bio || '';
              const initials = name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={idx}
                  className="liquid-glass-card rounded-2xl p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0052CC] to-[#087FC4] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#0052CC]/20">
                        {initials}
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                        {dept}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#15243A] dark:text-white">
                        {name}
                      </h3>
                      <p className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mt-0.5">
                        {role}
                      </p>
                      {bio && (
                        <p className="mt-3 text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed line-clamp-3">
                          {bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center gap-3">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <GlassEmptyState
            badge="Engineering & Leadership"
            title="Team Profiles Coming Soon"
            description="Our team member profiles are managed through the live database. Published engineering and leadership profiles will appear here."
            adminHref="/admin/dashboard"
            adminLabel="View Admin CMS"
            publicHref="/careers"
            publicLabel="Explore Open Careers"
          />
        )}
      </div>
    </section>
  );
}
