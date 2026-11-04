/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Mail, Users, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';
import { TiltCard } from '@/components/ui/animations/TiltCard';
import { ScrollReveal } from '@/components/ui/animations/ScrollReveal';

export interface PublicTeamMemberItem {
  id?: string;
  slug?: string;
  name?: string;
  role?: string;
  roleTitle?: string;
  photo?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  department?: string | null;
  order?: number;
  sortOrder?: number;
  isActive?: boolean;
  translations?: Array<{
    name?: string;
    roleTitle?: string;
    bio?: string;
  }>;
}

interface TeamGridProps {
  members: PublicTeamMemberItem[];
}

export function TeamGrid({ members }: TeamGridProps) {
  if (!members || members.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] flex items-center justify-center mx-auto mb-4 text-[#087FC4] dark:text-[#20B8D5]">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Team Profiles Coming Soon
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          Our engineering leadership and team profiles are being updated. Check back soon!
        </p>
      </div>
    );
  }

  // Sort by order rank (lowest number = #1 top priority)
  const sortedMembers = [...members].sort((a, b) => {
    const orderA = a.order ?? a.sortOrder ?? 999;
    const orderB = b.order ?? b.sortOrder ?? 999;
    return orderA - orderB;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
      {sortedMembers.map((member, idx) => {
        const name = member.name || member.translations?.[0]?.name || member.slug || 'Team Member';
        const role = member.role || member.roleTitle || member.translations?.[0]?.roleTitle || 'Specialist';
        const photo = member.photo || member.photoUrl || null;
        const dept = member.department || 'Engineering';
        const bio = member.bio || member.translations?.[0]?.bio || null;

        return (
          <ScrollReveal key={member.id || member.slug || idx} delay={idx * 0.08} direction="up">
            <TiltCard maxTilt={8} className="h-full">
              <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between items-center text-center h-full relative group transition-all duration-300 hover:border-[#087FC4]/40 hover:shadow-xl hover:shadow-[#087FC4]/10">
                {/* Department Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] border border-[#087FC4]/20 dark:border-[#20B8D5]/25">
                    {dept}
                  </span>
                </div>

                {/* Circular Photo with Gradient Border */}
                <div className="mt-2 mb-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#087FC4] via-[#109AD7] to-[#20B8D5] shadow-lg shadow-[#087FC4]/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#07162C] flex items-center justify-center">
                      {photo ? (
                        <img
                          src={photo}
                          alt={name}
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-[#087FC4] to-[#20B8D5]">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Identity & Role */}
                <div className="space-y-1.5 w-full flex-1 flex flex-col justify-start">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
                    {role}
                  </p>

                  {bio && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3 line-clamp-3">
                      {bio}
                    </p>
                  )}
                </div>

                {/* Social Connects / Email */}
                <div className="pt-5 mt-4 w-full border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center justify-center gap-4">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all cursor-pointer"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}

                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer"
                      title={`Email: ${member.email}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
