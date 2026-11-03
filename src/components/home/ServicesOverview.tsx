'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  Layout,
  ArrowRight,
} from 'lucide-react';
import type { ServiceItem } from '@/lib/api/types';

interface ServicesOverviewProps {
  services?: ServiceItem[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const defaultServices = [
    {
      title: 'Web Development',
      slug: 'web-development',
      icon: Code2,
      desc: 'High-performance corporate websites, portals, and web platforms built with Next.js and TypeScript.',
    },
    {
      title: 'Custom Software Development',
      slug: 'custom-software-development',
      icon: Cpu,
      desc: 'Bespoke enterprise backend systems, ERPs, and APIs engineered with NestJS and PostgreSQL.',
    },
    {
      title: 'SaaS & Web Applications',
      slug: 'saas-development',
      icon: Layers,
      desc: 'End-to-end multi-tenant SaaS products engineered for high scalability, security, and subscription billing.',
    },
    {
      title: 'Business Automation',
      slug: 'business-automation',
      icon: Sparkles,
      desc: 'Workflow automation, third-party API integrations, and customized internal tooling to streamline operations.',
    },
    {
      title: 'SEO & Digital Marketing',
      slug: 'digital-marketing',
      icon: BarChart3,
      desc: 'Data-driven search engine optimization, Google Ads, and targeted campaigns that yield measurable ROI.',
    },
    {
      title: 'UI/UX & Digital Experience',
      slug: 'ui-ux-design',
      icon: Layout,
      desc: 'Intuitive, research-backed interface design and digital brand identity systems that convert users.',
    },
  ];

  const list = services && services.length >= 6 ? services.slice(0, 6).map((s, idx) => ({
    ...defaultServices[idx],
    title: s.name,
    slug: s.slug,
    desc: s.summary || defaultServices[idx].desc,
  })) : defaultServices;

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>OUR SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              What We Do
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Full-cycle engineering, modern product design, and digital growth services tailored to help your organization outpace competition.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white group self-start md:self-end transition-colors"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.slug}
                className="flex flex-col justify-between p-7 rounded-2xl bg-white dark:bg-[#0A1F3F] border border-[#E3EAF2] dark:border-[#1E3557] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4F8FC] dark:bg-[#103B68]/50 group-hover:bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center mb-5 transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#071A35] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1E3557]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:text-[#103B68] dark:group-hover:text-white transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
