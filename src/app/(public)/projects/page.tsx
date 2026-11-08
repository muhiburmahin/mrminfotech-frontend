import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import ProjectsShowcaseClient, { ProjectItem } from '@/components/public/projects/ProjectsShowcaseClient';

export const metadata: Metadata = {
  title: 'Client Deployments & Projects | MRM InfoTech',
  description:
    'Explore verified enterprise systems, cloud platforms, and institutional software applications architected and deployed by MRM InfoTech.',
  alternates: {
    canonical: '/projects',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const rawProjects = await PublicApiService.getProjects<any>('en');

  const projects: ProjectItem[] = Array.isArray(rawProjects)
    ? rawProjects
    : Array.isArray(rawProjects?.data)
    ? rawProjects.data
    : [];

  return <ProjectsShowcaseClient initialProjects={projects} />;
}
