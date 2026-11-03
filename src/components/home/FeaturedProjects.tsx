'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import type { ProjectItem } from '@/lib/api/types';

interface FeaturedProjectsProps {
  projects?: ProjectItem[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const defaultProjects = [
    {
      title: 'EduManage Cloud Core',
      slug: 'edumanage-cloud-core',
      category: 'Education Platform',
      desc: 'Next-generation school management engine powering automatic grading, multi-term exams, and institutional finance.',
      tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind'],
      liveUrl: 'https://edumanage.mrminfotech.com',
      caseStudyUrl: '/case-studies/edumanage-cloud-architecture',
      accent: '#087FC4',
    },
    {
      title: 'MediSheba Diagnostics Lab Engine',
      slug: 'medisheba-diagnostics-lab',
      category: 'Healthcare Management',
      desc: 'High-throughput diagnostic center workflow platform supporting barcode routing and real-time report delivery.',
      tech: ['React', 'NestJS', 'PostgreSQL', 'Redis', 'Docker'],
      liveUrl: 'https://medisheba.mrminfotech.com',
      caseStudyUrl: '/case-studies/medisheba-diagnostic-management',
      accent: '#20B8D5',
    },
    {
      title: 'Institutional Multi-Tenant Portal',
      slug: 'institutional-multi-tenant-portal',
      category: 'Enterprise SaaS',
      desc: 'Centralized governance portal managing sub-institution websites, real-time notices, and admissions.',
      tech: ['Next.js 15', 'TypeScript', 'Tailwind', 'PostgreSQL'],
      liveUrl: 'https://multi.mrminfotech.com',
      caseStudyUrl: '/case-studies/multi-tenant-educational-portal',
      accent: '#103B68',
    },
  ];

  const list = projects && projects.length >= 3 ? projects.slice(0, 3).map((p, idx) => ({
    ...defaultProjects[idx],
    title: p.title,
    slug: p.slug,
    desc: p.summary || defaultProjects[idx].desc,
  })) : defaultProjects;

  return (
    <section className="py-20 bg-[#F4F8FC] dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>PORTFOLIO & CASEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Selected Work & Projects
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Real-world systems engineered with clean code, robust performance, and long-term business impact.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white group self-start md:self-end transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0A1F3F] border border-[#E3EAF2] dark:border-[#1E3557] overflow-hidden hover:shadow-xl hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all duration-300 group"
            >
              {/* Card Header Thumbnail / Abstract Visual */}
              <div
                className="h-44 p-6 flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: project.accent }}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    {project.category}
                  </span>
                  <Code2 className="w-5 h-5 text-white/70" />
                </div>
                <div className="z-10">
                  <h4 className="text-xl font-bold text-white drop-shadow-sm">
                    {project.title}
                  </h4>
                </div>
                <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-white/10 rounded-full blur-xl" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed mb-5">
                    {project.desc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F4F8FC] dark:bg-[#103B68]/40 text-[#15243A] dark:text-slate-200 border border-[#E3EAF2] dark:border-[#1E3557]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#1E3557] flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={project.caseStudyUrl}
                    className="text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white flex items-center gap-1 group/link transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#66758A] dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#20B8D5] flex items-center gap-1 transition-colors"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
