'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import type { ProductItem } from '@/lib/api/types';

interface FeaturedProductsProps {
  products?: ProductItem[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const defaultProducts = [
    {
      id: 'prod-1',
      slug: 'edumanage-bd',
      name: 'EduManage BD',
      category: 'Education SaaS Platform',
      tagline: 'Comprehensive School & University ERP',
      desc: 'An all-in-one educational ecosystem designed for Bangladeshi schools, colleges, and madrasahs. Features integrated digital attendance, gradebook automation, online admission, and bKash/Nagad fee collection.',
      icon: GraduationCap,
      color: '#087FC4',
      features: [
        'Automated Grading & Report Cards',
        'SMS & Mobile App Integration',
        'Online Fee Collection & Accounting',
        'Class Schedule & Exam Routine',
      ],
      productUrl: 'https://edumanage.mrminfotech.com',
      badge: 'Live Platform',
    },
    {
      id: 'prod-2',
      slug: 'medisheba-bd',
      name: 'MediSheba BD',
      category: 'Healthcare & Diagnostic SaaS',
      tagline: 'Integrated Clinical & Lab Management',
      desc: 'A modern medical operating system powering clinics and diagnostic labs. Delivers barcode-tracked sample management, secure doctor prescriptions, and instant SMS-based patient test reporting.',
      icon: HeartPulse,
      color: '#20B8D5',
      features: [
        'Diagnostic Test Billing & Barcode Labels',
        'Doctor Prescription & EMR History',
        'Automated Pathology Analyzer Sync',
        'Patient Portal & Digital PDF Reports',
      ],
      productUrl: 'https://medisheba.mrminfotech.com',
      badge: 'Live Platform',
    },
    {
      id: 'prod-3',
      slug: 'multi-institution-platform',
      name: 'Multi-Institution Website Platform',
      category: 'Institutional Web Governance',
      tagline: 'Multi-Tenant Portal for Chain Institutions',
      desc: 'A secure multi-tenant web platform designed for educational boards, institutional networks, and multi-branch schools to launch and manage individual high-speed websites with unified administrative control.',
      icon: Building2,
      color: '#103B68',
      features: [
        'Instant Sub-domain & Custom Domain Provisioning',
        'Dynamic Notice Board & Event Management',
        'Faculty Directory & Student Portals',
        'Unified Centralized Admin Oversight',
      ],
      productUrl: 'https://multi.mrminfotech.com',
      badge: 'Enterprise Platform',
    },
  ];

  const list = products && products.length > 0 && products.length === 3 ? products.map((p, idx) => ({
    ...defaultProducts[idx],
    name: p.name,
    desc: p.summary || defaultProducts[idx].desc,
    tagline: p.tagline || defaultProducts[idx].tagline,
  })) : defaultProducts;

  return (
    <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>OUR PROPRIETARY PLATFORMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Our Products
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Technology products designed to solve real problems. Cloud-native SaaS platforms architected, owned, and continuously maintained by MRM InfoTech.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white group self-start md:self-end transition-colors"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {list.map((product) => {
            const IconComp = product.icon;
            return (
              <div
                key={product.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: product.color }}
                    >
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#103B68] text-[#071A35] dark:text-slate-200 border border-[#E3EAF2] dark:border-[#1E3557]">
                      {product.badge}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <span className="text-xs font-bold text-[#20B8D5] uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-black text-[#071A35] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#103B68] dark:text-[#20B8D5] mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-sm text-[#66758A] dark:text-slate-400 leading-relaxed mb-6">
                    {product.desc}
                  </p>

                  {/* Key Feature Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-[#1E3557]">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#15243A] dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#20B8D5] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-[#1E3557] flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#087FC4] hover:bg-[#103B68] transition-colors shadow-sm"
                  >
                    <span>Explore Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#66758A] dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
