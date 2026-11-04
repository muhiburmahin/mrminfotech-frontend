'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Code2, FolderGit2 } from 'lucide-react';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

interface ProjectData {
  title?: string;
  name?: string;
  slug: string;
  summary?: string;
  description?: string;
  category?: string;
  industry?: string;
  caseStudy?: {
    slug?: string;
    clientName?: string;
    industry?: string;
    frontendRepoUrl?: string;
    backendRepoUrl?: string;
    liveUrl?: string;
    techStack?: string[];
    tags?: string[];
  };
  liveUrl?: string;
  techStack?: string[];
  tags?: string[];
}

interface FeaturedProjectsProps {
  projects?: ProjectData[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const hasProjects = Boolean(projects && projects.length > 0);

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>LIVE ENGINEERING PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#15243A] dark:text-white tracking-tight">
              Featured Systems & Deployments
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Explore enterprise applications, high-concurrency portals, and mission-critical software built by our engineering teams.
            </p>
          </div>

          {hasProjects && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:gap-3 transition-all"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects!.slice(0, 3).map((item) => {
              const title = item.title || item.name || 'Enterprise Project';
              const slug = item.slug || item.caseStudy?.slug || '';
              const summary = item.summary || item.description || '';
              const liveUrl = item.liveUrl || item.caseStudy?.liveUrl;
              const tech = item.techStack || item.caseStudy?.techStack || ['Full-Stack', 'Cloud'];
              const category = item.category || item.industry || item.caseStudy?.industry || 'Enterprise Solution';

              return (
                <div
                  key={slug || title}
                  className="liquid-glass-card rounded-2xl p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5] px-2.5 py-0.5 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15">
                        {category}
                      </span>
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#66758A] hover:text-[#087FC4] dark:text-slate-400 dark:hover:text-[#20B8D5] transition-colors p-1"
                          title="Visit Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#66758A] dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-[#07162C] text-[#15243A] dark:text-slate-300 border border-slate-200 dark:border-[#1E3557]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                    <Link
                      href={`/projects/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:gap-2.5 transition-all"
                    >
                      <span>View Technical Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Code2 className="w-4 h-4 text-slate-400 group-hover:text-[#087FC4] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <GlassEmptyState
            badge="Live Database Connected"
            title="No Portfolio Projects Published Yet"
            description="Our engineering portfolio is connected directly to the live MRM InfoTech CMS. When projects are published from the Admin Dashboard, they will automatically appear here."
            adminHref="/admin/dashboard/projects"
            adminLabel="Add Project in Admin CMS"
            publicHref="/start-project"
            publicLabel="Start a Project With Us"
          />
        )}
      </div>
    </section>
  );
}
