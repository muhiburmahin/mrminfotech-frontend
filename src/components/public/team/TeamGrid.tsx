'use client';

import React from 'react';
import {
  ExecutiveTeamShowcase,
  TeamMemberData,
} from '@/components/public/team/ExecutiveTeamShowcase';

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
  tags?: string[];
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
  // Normalize PublicTeamMemberItem into TeamMemberData for ExecutiveTeamShowcase
  const normalizedMembers: TeamMemberData[] = (members || []).map((m) => ({
    id: m.id,
    slug: m.slug,
    name: m.name || m.translations?.[0]?.name || m.slug || 'Team Member',
    role: m.role || m.roleTitle || m.translations?.[0]?.roleTitle || 'Specialist',
    department: m.department || 'Engineering',
    photo: m.photo || m.photoUrl || null,
    photoUrl: m.photoUrl || m.photo || null,
    bio: m.bio || m.translations?.[0]?.bio || null,
    email: m.email || null,
    linkedinUrl: m.linkedinUrl || null,
    githubUrl: m.githubUrl || null,
    tags: m.tags,
  }));

  return <ExecutiveTeamShowcase members={normalizedMembers} variant="full" />;
}
