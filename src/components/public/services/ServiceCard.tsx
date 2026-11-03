import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';
import type { ServiceItem } from '@/lib/api/types';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0052CC] shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div>
        <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-blue-50 w-fit transition-colors mb-4">
          <Code2 className="w-5 h-5 text-[#0052CC]" />
        </div>
        <h3 className="text-base font-bold text-[#07162C] group-hover:text-[#0052CC] transition-colors leading-snug">
          {service.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">
          {service.summary}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0052CC] group-hover:text-[#0040A8]">
        <span>Explore capability</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
