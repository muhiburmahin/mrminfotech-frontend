'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Mail,
  Users,
  Code2,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  Globe2,
} from 'lucide-react';
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

      {/* Grid of Balanced, Proportional Portrait Cards (Crisp, Natural & Sharp) */}
      <motion.div
        layout
        className={
          filteredMembers.length === 1
            ? 'max-w-sm mx-auto'
            : filteredMembers.length === 2
            ? 'max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6'
            : filteredMembers.length === 3
            ? 'max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'
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
                className="group relative rounded-2xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/70 bg-[var(--theme-bg-surface)] overflow-hidden shadow-md hover:border-[var(--theme-accent)] hover:shadow-xl hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12),0_0_25px_var(--theme-accent-glow)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* PROPORTIONAL PORTRAIT FRAME (Crystal Clear & Crisp — No blurring overlay) */}
                  <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[var(--theme-bg-canvas)]">
                    {photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={photo}
                        alt={memberName}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--theme-accent)]/15 via-[var(--theme-bg-surface)] to-[var(--theme-bg-canvas)] text-[var(--theme-accent)]">
                        <span className="text-5xl font-black">{memberName.charAt(0).toUpperCase()}</span>
                        <span className="text-[10px] font-mono font-bold mt-2 text-[var(--theme-text-muted)]">MRM INFOTECH</span>
                      </div>
                    )}

                    {/* Floating Department Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                        {member.department || 'ENGINEERING'}
                      </span>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="p-5 space-y-2 relative z-10">
                    <div>
                      <h3 className="text-lg font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors">
                        {memberName}
                      </h3>
                      <p className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider mt-0.5">
                        {memberRole}
                      </p>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {/* Domain & Skill Tags */}
                    {member.tags && member.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
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
                </div>

                {/* Bottom Card Footer */}
                <div className="px-5 pb-4 pt-3 border-t border-[var(--theme-border-glass)] flex items-center justify-between relative z-10 mt-auto">
                  <div className="flex items-center gap-2">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)]"
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
                        className="w-7 h-7 rounded-lg bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)]"
                        aria-label={`${memberName} GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-7 h-7 rounded-lg bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)]"
                        aria-label={`Email ${memberName}`}
                      >
                        <Mail className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--theme-text-muted)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
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
