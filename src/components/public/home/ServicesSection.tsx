import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Globe,
  Smartphone,
  Layers,
  Cloud,
  Cpu,
  Palette,
  ShieldCheck,
  Database,
  CreditCard,
  Network,
  GraduationCap,
  HeartPulse,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import type { ServiceItem } from '@/lib/api/types';

interface ServicesOverviewProps {
  services: ServiceItem[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'custom-software-development':
        return <Code2 className="w-5 h-5 text-[#0052CC]" />;
      case 'web-application-development':
        return <Globe className="w-5 h-5 text-[#00C2FF]" />;
      case 'mobile-app-development':
        return <Smartphone className="w-5 h-5 text-indigo-500" />;
      case 'enterprise-erp-solutions':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'cloud-devops-infrastructure':
        return <Cloud className="w-5 h-5 text-cyan-600" />;
      case 'ai-machine-learning-solutions':
        return <Cpu className="w-5 h-5 text-violet-500" />;
      case 'ui-ux-design':
        return <Palette className="w-5 h-5 text-pink-500" />;
      case 'cybersecurity-compliance':
        return <ShieldCheck className="w-5 h-5 text-rose-500" />;
      case 'database-architecture-migration':
        return <Database className="w-5 h-5 text-amber-500" />;
      case 'ecommerce-fintech-platforms':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'api-microservices-architecture':
        return <Network className="w-5 h-5 text-sky-500" />;
      case 'edtech-academic-systems':
        return <GraduationCap className="w-5 h-5 text-teal-500" />;
      case 'healthcare-telemedicine-systems':
        return <HeartPulse className="w-5 h-5 text-red-500" />;
      case 'it-consulting-digital-transformation':
      default:
        return <Briefcase className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0052CC] text-xs font-bold uppercase tracking-wider">
              <span>Enterprise Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07162C] tracking-tight">
              14 Specialized Technology Services
            </h2>
            <p className="text-slate-600 text-base">
              End-to-end software development, cloud infrastructure, and technical consulting
              tailored to complex business requirements and strict enterprise SLAs.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 14 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0052CC] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-blue-50 w-fit transition-colors mb-4">
                  {getIcon(svc.slug)}
                </div>
                <h3 className="text-base font-bold text-[#07162C] group-hover:text-[#0052CC] transition-colors leading-snug">
                  {svc.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">
                  {svc.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0052CC] group-hover:text-[#0040A8]">
                <span>Explore capability</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

