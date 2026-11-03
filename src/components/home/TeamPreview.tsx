'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';
import type { TeamMember } from '@/lib/api/types';

interface TeamPreviewProps {
  team?: TeamMember[];
}

export function TeamPreview({ team }: TeamPreviewProps) {
  const defaultTeam = [
    {
      name: 'Shohanur Rahman',
      designation: 'Founder & Chief Architect',
      department: 'Leadership & Architecture',
      bio: 'Full-stack software architect specializing in distributed NestJS microservices and Next.js platforms.',
      linkedin: 'https://linkedin.com/in/shohanur-rahman',
      github: 'https://github.com/shohan-mrm',
      initials: 'SR',
    },
    {
      name: 'Engineering Lead',
      designation: 'Lead Backend Engineer',
      department: 'Core Infrastructure',
      bio: 'Directs cloud infrastructure, high-concurrency database indexing, and API security protocols.',
      linkedin: 'https://linkedin.com/company/mrminfotech',
      github: 'https://github.com/mrminfotech',
      initials: 'EL',
    },
    {
      name: 'Product & UI Lead',
      designation: 'Lead Product Designer',
      department: 'UI/UX & Experience',
      bio: 'Shapes human-centered interfaces, accessible design systems, and seamless user experiences.',
      linkedin: 'https://linkedin.com/company/mrminfotech',
      github: 'https://github.com/mrminfotech',
      initials: 'PL',
    },
  ];

  const list = team && team.length >= 3 ? team.slice(0, 3).map((t, idx) => ({
    ...defaultTeam[idx],
    name: t.name,
    role: t.roleTitle,
    bio: t.bio || defaultTeam[idx].bio,
  })) : defaultTeam;

  return (
    <section id="team-preview" className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>OUR PEOPLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Meet the People Behind MRM
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Experienced engineers, software architects, and product strategists focused on building software that empowers institutions.
            </p>
          </div>
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white group self-start md:self-end transition-colors"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((member) => (
            <div
              key={member.name}
              className="p-7 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Avatar with Initials */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#087FC4] to-[#20B8D5] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#071A35] dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5]">
                      {member.designation}
                    </p>
                    <span className="text-[11px] text-[#66758A] dark:text-slate-400">
                      {member.department}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#66758A] dark:text-slate-400 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Socials */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#1E3557] flex items-center gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#F4F8FC] dark:bg-[#103B68]/40 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] text-[#66758A] dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#F4F8FC] dark:bg-[#103B68]/40 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] text-[#66758A] dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
