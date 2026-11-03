import React from 'react';
import Link from 'next/link';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import type { ProjectItem } from '@/lib/api/types';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-200 p-6 group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-white text-[#0052CC] shadow-sm">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-emerald-100 text-emerald-800">
            {project.projectWorkStatus || 'COMPLETED'}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#07162C] group-hover:text-[#0052CC] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC] hover:text-[#0040A8] transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
