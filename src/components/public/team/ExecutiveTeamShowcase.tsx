'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Users } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';

export interface TeamMemberData {
  id?: string;
  slug?: string;
  name?: string;
  role?: string;
  roleTitle?: string;
  department?: string;
  photo?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  isFounder?: boolean;
  tags?: string[];
}

interface ExecutiveTeamShowcaseProps {
  members: TeamMemberData[];
  variant?: 'home' | 'full';
}

export function ExecutiveTeamShowcase({ members, variant = 'home' }: ExecutiveTeamShowcaseProps) {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  // Strictly render real database members added via Admin CMS
  const dbMembers: TeamMemberData[] = (members || []).map((m) => {
    const resolvedDept =
      m.department ||
      (m.role?.toLowerCase().includes('market') ? 'Sales & Marketing' : 'Software Engineering');

    return {
      ...m,
      name: m.name || 'Team Member',
      role: m.role || m.roleTitle || 'Specialist',
      photo: m.photo || m.photoUrl || null,
      department: resolvedDept,
      bio: m.bio || null,
      tags: m.tags && m.tags.length > 0 ? m.tags : undefined,
    };
  });

  const combinedMembers = variant === 'home' ? dbMembers.slice(0, 4) : dbMembers;

  // Department List covering all real corporate divisions
  const departments = [
    { id: 'ALL', label: 'All Roster' },
    { id: 'SALES_MARKETING', label: 'Sales & Marketing' },
    { id: 'EXECUTIVE', label: 'Executive & Leadership' },
    { id: 'ENGINEERING', label: 'Software Engineering' },
    { id: 'ARCHITECTURE', label: 'Systems & Cloud' },
    { id: 'PRODUCT', label: 'Product & Design' },
    { id: 'AI_ML', label: 'AI & ML' },
    { id: 'QA_SECURITY', label: 'QA & Security' },
    { id: 'OPERATIONS', label: 'Operations & Success' },
  ];

  const filteredMembers =
    selectedDept === 'ALL'
      ? combinedMembers
      : combinedMembers.filter((m) => {
          const dept = (m.department || '').toLowerCase();
          const role = (m.role || '').toLowerCase();
          if (selectedDept === 'SALES_MARKETING') {
            return (
              dept.includes('sale') ||
              dept.includes('market') ||
              dept.includes('growth') ||
              role.includes('market') ||
              role.includes('sale') ||
              role.includes('business')
            );
          }
          if (selectedDept === 'EXECUTIVE') {
            return m.isFounder || dept.includes('exec') || dept.includes('lead') || role.includes('chief') || role.includes('founder');
          }
          if (selectedDept === 'ENGINEERING') {
            return dept.includes('engineer') || role.includes('engineer') || role.includes('developer');
          }
          if (selectedDept === 'ARCHITECTURE') {
            return dept.includes('architect') || role.includes('architect') || dept.includes('cloud');
          }
          if (selectedDept === 'PRODUCT') {
            return dept.includes('product') || dept.includes('design') || role.includes('design') || role.includes('ui');
          }
          if (selectedDept === 'AI_ML') {
            return dept.includes('ai') || dept.includes('ml') || role.includes('machine') || role.includes('data');
          }
          if (selectedDept === 'QA_SECURITY') {
            return dept.includes('qa') || dept.includes('quality') || dept.includes('security') || role.includes('security') || role.includes('qa');
          }
          if (selectedDept === 'OPERATIONS') {
            return dept.includes('operat') || dept.includes('success') || dept.includes('client');
          }
          return dept.includes(selectedDept.toLowerCase());
        });

  if (combinedMembers.length === 0) {
    if (variant === 'home') return null;
    return (
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex items-center justify-center mx-auto mb-4 text-[var(--theme-accent)]">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
          Team Profiles Coming Soon
        </h3>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-2 max-w-md mx-auto">
          Our verified team member profiles are managed through the admin panel and will appear here once published.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Interactive Department Filter (Active on /team page or variant='full') */}
      {variant === 'full' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-[var(--theme-border-glass)]">
          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => {
              const isActive = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-[var(--theme-accent-text)] bg-[var(--theme-accent)] shadow-[0_0_16px_var(--theme-accent-glow)]'
                      : 'text-[var(--theme-text-secondary)] bg-[var(--theme-bg-surface)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-surface)]/80 border border-[var(--theme-border-glass)]'
                  }`}
                >
                  <span>{dept.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[var(--theme-text-muted)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
            <span>Showing {filteredMembers.length} Members</span>
          </div>
        </div>
      )}

      {/* Grid of Balanced, Circular Portrait Cards (4 Per Row on Desktop) */}
      <motion.div
        layout
        className={
          filteredMembers.length === 1
            ? 'max-w-xs mx-auto'
            : filteredMembers.length === 2
            ? 'max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5'
            : filteredMembers.length === 3
            ? 'max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
        }
      >
        <AnimatePresence>
          {filteredMembers.map((member, idx) => {
            const photo = member.photo || member.photoUrl;
            const memberName = member.name || 'Team Member';
            const memberRole = member.role || member.roleTitle || 'Specialist';

            return (
              <motion.div
                layout
                key={member.id || memberName + idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/80 bg-[var(--theme-bg-surface)] overflow-hidden shadow-md hover:border-[var(--theme-accent)] hover:shadow-xl hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12),0_0_25px_var(--theme-accent-glow)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="pt-6 pb-4 px-5 flex flex-col items-center text-center">
                  {/* Circular Avatar Frame with Expanded Radiant Glow & Precision Border */}
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[var(--theme-accent)] via-cyan-400 to-blue-500 opacity-40 blur-xs group-hover:opacity-90 group-hover:blur-sm transition-all duration-300"
                    />

                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1.5 bg-[var(--theme-bg-canvas)] ring-2 ring-[var(--theme-accent)]/80 shadow-lg shadow-[var(--theme-accent-glow)]/20">
                      {photo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={photo}
                          alt={memberName}
                          className="w-full h-full object-cover object-center rounded-full"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--theme-accent)]/20 via-[var(--theme-bg-surface)] to-[var(--theme-bg-canvas)] text-[var(--theme-accent)] font-black text-3xl">
                          {memberName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Active Engineer Pulse Indicator */}
                    <div
                      className="absolute bottom-1.5 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--theme-bg-surface)] shadow-xs"
                      title="Verified Engineer"
                    />
                  </div>

                  {/* Department Pill */}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                      {member.department || 'ENGINEERING'}
                    </span>
                  </div>

                  {/* Member Name & Role */}
                  <div className="mt-3 space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors">
                      {memberName}
                    </h3>
                    <p className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
                      {memberRole}
                    </p>
                  </div>

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2 leading-relaxed mt-2.5 px-1">
                      {member.bio}
                    </p>
                  )}

                  {/* Skill Tags */}
                  {member.tags && member.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 pt-2">
                      {member.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[var(--theme-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer: Verified Badge & Social Links */}
                <div className="px-5 py-3 border-t border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]/40 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)]"
                        aria-label={`${memberName} LinkedIn`}
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)]"
                        aria-label={`${memberName} GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-7 h-7 rounded-lg bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)]"
                        aria-label={`Email ${memberName}`}
                      >
                        <Mail className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
