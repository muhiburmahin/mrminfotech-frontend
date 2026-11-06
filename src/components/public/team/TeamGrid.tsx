/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Mail, Users } from 'lucide-react';
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
        <div className="w-16 h-16 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex items-center justify-center mx-auto mb-4 text-[var(--theme-accent)]">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
          Team Profiles Coming Soon
        </h3>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-2 max-w-md mx-auto">
          Our engineering leadership and team profiles are being synchronized from the verified database.
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
              <div className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between items-center text-center h-full relative group transition-all duration-300 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 hover:shadow-[0_0_30px_var(--theme-accent-subtle)] shadow-xl">
                {/* Department Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                    {dept}
                  </span>
                </div>

                {/* Circular Photo with Dynamic Accent Ring */}
                <div className="mt-2 mb-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 ring-2 ring-[var(--theme-accent)] shadow-lg shadow-[var(--theme-accent-glow)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[var(--theme-bg-canvas)] flex items-center justify-center">
                      {photo ? (
                        <img
                          src={photo}
                          alt={name}
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl font-black text-[var(--theme-accent)]">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Identity & Role */}
                <div className="space-y-1.5 w-full flex-1 flex flex-col justify-start">
                  <h3 className="text-lg sm:text-xl font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs font-bold text-[var(--theme-accent)]">
                    {role}
                  </p>

                  {bio && (
                    <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mt-3 line-clamp-3">
                      {bio}
                    </p>
                  )}
                </div>

                {/* Social Connects / Email */}
                <div className="pt-5 mt-4 w-full border-t border-[var(--theme-border-glass)] flex items-center justify-center gap-3">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-all cursor-pointer"
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
                      className="p-2 rounded-xl text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-all cursor-pointer"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-xl text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-all cursor-pointer"
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
