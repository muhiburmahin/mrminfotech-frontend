import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import ProjectsShowcaseClient, { type ProjectItem } from '@/components/public/projects/ProjectsShowcaseClient';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrminfotech.com').replace(/\/$/, '');
const TITLE = 'Portfolio & Case Studies | MRM InfoTech';
const DESCRIPTION =
  'Production software, SaaS platforms and client projects built by MRM InfoTech, with the business problem, technical solution and measurable results for each.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/projects', type: 'website', siteName: 'MRM InfoTech' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const raw = await PublicApiService.getProjects<unknown>('en');
  const projects: ProjectItem[] = Array.isArray(raw)
    ? (raw as ProjectItem[])
    : Array.isArray((raw as { data?: unknown })?.data)
      ? ((raw as { data: ProjectItem[] }).data)
      : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/projects/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ProjectsShowcaseClient initialProjects={projects} />
    </>
  );
}
