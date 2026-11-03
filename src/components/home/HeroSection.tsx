'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-[#07162C] pt-14 pb-18 lg:pt-20 lg:pb-24 overflow-hidden border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-corporate-grid dark:opacity-20 opacity-60 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#20B8D5]/10 via-[#087FC4]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
              <span className="w-2 h-2 rounded-full bg-[#20B8D5] animate-pulse" />
              <span>SOFTWARE PRODUCTS & DIGITAL SOLUTIONS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#071A35] dark:text-white tracking-tight leading-[1.12]">
              Building Digital Solutions That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087FC4] via-[#20B8D5] to-[#103B68] dark:to-[#20B8D5]">
                Move Businesses Forward.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#66758A] dark:text-slate-300 leading-relaxed max-w-2xl">
              MRM InfoTech builds innovative software products and delivers modern digital
              solutions that help businesses and organizations grow, adapt, and succeed.
            </p>

            {/* Tagline Ribbon */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-[#087FC4] dark:text-[#20B8D5] uppercase">
              <span>IDEAS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20B8D5]" />
              <span>PRODUCTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20B8D5]" />
              <span>IMPACT</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-[#087FC4] hover:bg-[#103B68] shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-[#071A35] dark:text-white bg-[#F4F8FC] dark:bg-[#0B1E3B] hover:bg-slate-100 dark:hover:bg-[#103B68] border border-[#E3EAF2] dark:border-[#1E3557] hover:border-[#087FC4]/30 active:scale-[0.98] transition-all duration-200"
              >
                <span>Discover Our Products</span>
                <ChevronRight className="w-4 h-4 text-[#66758A] dark:text-slate-400" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#E3EAF2] dark:border-[#1E3557] flex flex-wrap items-center gap-6 text-xs font-semibold text-[#66758A] dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#20B8D5]" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#20B8D5]" />
                <span>Scalable Cloud SaaS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#20B8D5]" />
                <span>Full-Cycle Support</span>
              </div>
            </div>
          </div>

          {/* Right Column (Technology Visual Card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#071A35] text-white p-6 shadow-xl border border-[#103B68]">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#103B68]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-xs text-slate-400 font-mono ml-2">mrm-ecosystem.live</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#20B8D5]/10 text-[#20B8D5] border border-[#20B8D5]/30">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>99.9% Uptime</span>
                </div>
              </div>

              {/* Product Visual 1: EduManage BD */}
              <div className="mb-4 p-4 rounded-xl bg-[#103B68]/60 border border-[#103B68] hover:border-[#20B8D5]/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#087FC4] flex items-center justify-center text-white">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">EduManage BD</h4>
                      <p className="text-[10px] text-slate-300">Education ERP & Attendance</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#20B8D5] bg-[#20B8D5]/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#103B68]/80 text-center">
                  <div className="bg-[#071A35]/50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-400 block">Institutions</span>
                    <span className="text-xs font-bold text-white">50+</span>
                  </div>
                  <div className="bg-[#071A35]/50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-400 block">Students</span>
                    <span className="text-xs font-bold text-white">25k+</span>
                  </div>
                  <div className="bg-[#071A35]/50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-400 block">Reliability</span>
                    <span className="text-xs font-bold text-[#20B8D5]">100%</span>
                  </div>
                </div>
              </div>

              {/* Product Visual 2: MediSheba BD */}
              <div className="p-4 rounded-xl bg-[#103B68]/60 border border-[#103B68] hover:border-[#20B8D5]/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#20B8D5] flex items-center justify-center text-white">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">MediSheba BD</h4>
                      <p className="text-[10px] text-slate-300">Clinical & Diagnostic ERP</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#20B8D5] bg-[#20B8D5]/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#103B68]/80 text-center">
                  <div className="bg-[#071A35]/50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-400 block">Clinics</span>
                    <span className="text-xs font-bold text-white">20+</span>
                  </div>
                  <div className="bg-[#071A35]/50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-400 block">Reports</span>
                    <span className="text-xs font-bold text-white">100k+</span>
                  </div>
                  <div className="bg-[#071A35]/50 p-1.5 rounded">
                    <span className="text-[10px] text-slate-400 block">Security</span>
                    <span className="text-xs font-bold text-[#20B8D5]">HIPAA-Ready</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tech Bar */}
              <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>Architecture: NestJS • Next.js • PostgreSQL</span>
                <span className="text-[#20B8D5] font-semibold">Cloud Native</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
