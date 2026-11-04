import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target,
  Compass,
  Lightbulb,
  ShieldCheck,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Building2,
  Code2,
  Layers,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';

export const metadata: Metadata = {
  title: 'About Us | MRM InfoTech — IDEAS • PRODUCTS • IMPACT',
  description:
    'Learn about MRM InfoTech: our story, mission, vision, core values, proprietary SaaS platforms, and dedicated software engineering team.',
};

export default async function AboutPage() {
  const team = await PublicApiService.getTeamMembers('en');

  const coreValues = [
    {
      title: 'Innovation',
      desc: 'Constantly seeking modern, efficient, and forward-looking ways to solve complex business challenges with software.',
      icon: Lightbulb,
      color: '#087FC4',
    },
    {
      title: 'Integrity',
      desc: 'Upholding strict ethical standards, transparent communication, and data honesty in every client and partner engagement.',
      icon: ShieldCheck,
      color: '#20B8D5',
    },
    {
      title: 'Quality',
      desc: 'Obsessed with clean code architecture, comprehensive testing, robust security, and lasting technical durability.',
      icon: Award,
      color: '#103B68',
    },
    {
      title: 'Customer Focus',
      desc: 'Designing products and engineering solutions around real user needs, delivering concrete, measurable operational value.',
      icon: Users,
      color: '#087FC4',
    },
    {
      title: 'Continuous Learning',
      desc: 'Embracing evolving technologies, best engineering practices, and emerging architectural standards to stay ahead.',
      icon: BookOpen,
      color: '#20B8D5',
    },
    {
      title: 'Responsibility',
      desc: 'Taking full ownership of our code, system uptime, client data confidentiality, and post-launch stability.',
      icon: CheckCircle2,
      color: '#103B68',
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Foundation of MRM InfoTech',
      desc: 'Founded with a clear vision: to develop scalable software products and deliver high-impact digital solutions for modern businesses.',
    },
    {
      year: '2024 - Q3',
      title: 'Launch of EduManage BD',
      desc: 'Rolled out EduManage BD, an all-in-one educational ERP tackling admissions, attendance, and tuition automation.',
    },
    {
      year: '2025 - Q1',
      title: 'Launch of MediSheba BD',
      desc: 'Engineered MediSheba BD, an integrated clinical and diagnostic lab operating system with barcode sample tracking.',
    },
    {
      year: '2025 - Q3',
      title: 'Full-Cycle Client Solutions Expansion',
      desc: 'Expanded bespoke engineering services: custom software development, SaaS architecture, web applications, and digital marketing.',
    },
    {
      year: '2026',
      title: 'Multi-Institution Website Platform',
      desc: 'Beta rollout of the Multi-Institution Website Governance Platform for educational networks and institutional chains.',
    },
  ];

  const hasTeam = Boolean(team && team.length > 0);

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* 1. About Hero */}
      <section className="relative py-20 lg:py-28 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-4">
              <span>ABOUT MRM INFOTECH</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#071A35] dark:text-white tracking-tight leading-[1.15]">
              Engineering Practical Software That Drives{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087FC4] to-[#20B8D5]">
                Real Business Growth.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#66758A] dark:text-slate-300 leading-relaxed">
              We are a software and digital solutions company driven by the belief that technology should be practical, sustainable, and built around real-world institutional needs.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-[#087FC4] dark:text-[#20B8D5] uppercase">
              <span>IDEAS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20B8D5]" />
              <span>PRODUCTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20B8D5]" />
              <span>IMPACT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company Overview */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider block">
                Company Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight leading-tight">
                Software Products & Digital Solutions for Modern Organizations.
              </h2>
              <p className="text-base text-[#66758A] dark:text-slate-300 leading-relaxed">
                MRM InfoTech was founded in Dhaka, Bangladesh, by passionate software engineers committed to building durable, enterprise-grade technology. We do not just build websites—we architect high-concurrency systems, launch specialized cloud SaaS platforms, and help organizations modernize their operational workflows.
              </p>
              <p className="text-base text-[#66758A] dark:text-slate-300 leading-relaxed">
                Our distinct dual-engine business model enables us to continuously refine our proprietary platforms—such as EduManage BD and MediSheba BD—while delivering bespoke custom engineering to external clients with unparalleled architectural depth.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                <span className="text-3xl font-black text-[#087FC4] dark:text-[#20B8D5] block mb-1">100%</span>
                <span className="text-sm font-bold text-[#071A35] dark:text-white block mb-1">Architecture Ownership</span>
                <p className="text-xs text-[#66758A] dark:text-slate-300">Proprietary intellectual property and continuous evolution.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                <span className="text-3xl font-black text-[#20B8D5] block mb-1">99.9%</span>
                <span className="text-sm font-bold text-[#071A35] dark:text-white block mb-1">Cloud Reliability</span>
                <p className="text-xs text-[#66758A] dark:text-slate-300">Uptime SLAs backed by automated monitoring.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                <span className="text-3xl font-black text-[#087FC4] dark:text-[#20B8D5] block mb-1">Dual-Engine</span>
                <span className="text-sm font-bold text-[#071A35] dark:text-white block mb-1">SaaS & Client Work</span>
                <p className="text-xs text-[#66758A] dark:text-slate-300">In-house platforms plus custom bespoke engineering.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                <span className="text-3xl font-black text-[#087FC4] dark:text-[#20B8D5] block mb-1">Zero</span>
                <span className="text-sm font-bold text-[#071A35] dark:text-white block mb-1">Technical Shortcuts</span>
                <p className="text-xs text-[#66758A] dark:text-slate-300">Strict OWASP security and type-safe code standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story */}
      <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
            <span>OUR STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
            How MRM InfoTech Began
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none text-[#66758A] dark:text-slate-300 leading-relaxed space-y-4 text-base">
            <p>
              For years, schools, colleges, clinics, and growing enterprises in our region struggled with fragmented, outdated software. Systems frequently crashed during peak admission periods, diagnostic patient reports were delayed, and external agency software often became unmaintainable shortly after launch.
            </p>
            <p>
              MRM InfoTech was founded to change that reality. We set out to establish an engineering culture rooted in clean code, robust database architecture, and honest partnerships. Rather than following passing design fads, we committed ourselves to building solutions that address tangible operational pain points.
            </p>
            <p>
              Today, that commitment is reflected in every product we ship and every client solution we architect—driving measurable impact for schools, hospitals, and growing businesses across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] relative">
              <div className="w-12 h-12 rounded-xl bg-[#087FC4] text-white flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider block mb-2">
                Our Purpose
              </span>
              <h3 className="text-2xl font-black text-[#071A35] dark:text-white mb-4">Our Mission</h3>
              <blockquote className="text-lg font-medium text-[#15243A] dark:text-slate-200 leading-relaxed italic border-l-4 border-[#087FC4] pl-4">
                &ldquo;To build meaningful technology solutions that solve real-world problems and create lasting value for businesses and organizations.&rdquo;
              </blockquote>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] relative">
              <div className="w-12 h-12 rounded-xl bg-[#20B8D5] text-white flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#20B8D5] uppercase tracking-wider block mb-2">
                Our Destination
              </span>
              <h3 className="text-2xl font-black text-[#071A35] dark:text-white mb-4">Our Vision</h3>
              <blockquote className="text-lg font-medium text-[#15243A] dark:text-slate-200 leading-relaxed italic border-l-4 border-[#20B8D5] pl-4">
                &ldquo;To become a trusted technology company recognized for building impactful software products and delivering innovative digital solutions globally.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>OUR CODE OF CONDUCT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              The six fundamental principles that guide our architecture, client relationships, and daily engineering decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-7 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-sm"
                    style={{ backgroundColor: v.color }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. What We Do */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
            <span>WHAT WE DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
            Comprehensive Digital Capabilities
          </h2>
          <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
            From developing self-sustaining SaaS platforms to engineering high-stakes software for private and public sector organizations.
          </p>
        </div>
      </section>

      {/* 7. Our Business Areas */}
      <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Block 1: Software Products */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider block mb-2">
                  Proprietary Platforms
                </span>
                <h3 className="text-2xl font-black text-[#071A35] dark:text-white mb-4">
                  Software Products
                </h3>
                <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed mb-6">
                  In-house cloud SaaS solutions architected to solve systemic challenges across education, healthcare, and enterprise governance:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <GraduationCap className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#071A35] dark:text-white">EduManage BD</h4>
                      <p className="text-xs text-[#66758A] dark:text-slate-300">Cloud School & University ERP with grading and mobile app sync.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <HeartPulse className="w-5 h-5 text-[#20B8D5] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#071A35] dark:text-white">MediSheba BD</h4>
                      <p className="text-xs text-[#66758A] dark:text-slate-300">Clinical and diagnostic lab ERP with barcode test sample routing.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <Building2 className="w-5 h-5 text-[#103B68] dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#071A35] dark:text-white">Multi-Institution Website Platform</h4>
                      <p className="text-xs text-[#66758A] dark:text-slate-300">Multi-tenant governance engine for chain schools and institutional networks.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#1E3557]">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white"
                >
                  <span>Explore All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Block 2: Client Solutions */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#20B8D5] uppercase tracking-wider block mb-2">
                  Bespoke Engineering
                </span>
                <h3 className="text-2xl font-black text-[#071A35] dark:text-white mb-4">
                  Client Solutions
                </h3>
                <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed mb-6">
                  Custom software development, UI/UX architecture, and digital growth services engineered to client specifications:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <Code2 className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#071A35] dark:text-white">Web & Software Development</h4>
                      <p className="text-xs text-[#66758A] dark:text-slate-300">Next.js web portals, corporate platforms, and NestJS APIs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <Layers className="w-5 h-5 text-[#20B8D5] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#071A35] dark:text-white">SaaS & Business Automation</h4>
                      <p className="text-xs text-[#66758A] dark:text-slate-300">Custom CRM, automated workflow routing, and multi-tenant systems.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557]">
                    <BarChart3 className="w-5 h-5 text-[#103B68] dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#071A35] dark:text-white">SEO & Digital Marketing</h4>
                      <p className="text-xs text-[#66758A] dark:text-slate-300">Targeted search optimization and high-conversion marketing funnels.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#1E3557]">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Journey & Milestones */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>OUR JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Company Milestones
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              A timeline of disciplined growth, product launches, and technological accomplishments.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-[#E3EAF2] dark:before:bg-[#1E3557]">
            {milestones.map((m) => (
              <div key={m.title} className="relative flex items-start gap-6 pl-2">
                <div className="w-7 h-7 rounded-full bg-[#087FC4] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-[#07162C] flex-shrink-0 shadow-sm z-10">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="p-6 rounded-2xl bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] flex-1">
                  <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] block mb-1">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">{m.title}</h3>
                  <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Our Approach */}
      <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              How We Deliver Value
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Our engineering philosophy ensures that projects are scoped properly, tested thoroughly, and deployed safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557]">
              <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">1. Deep Discovery</h3>
              <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">
                We spend time understanding your real operational bottlenecks before touching a single line of code.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557]">
              <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">2. Type-Safe Architecture</h3>
              <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">
                Strict TypeScript, documented API schemas, and automated tests ensure stability under pressure.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557]">
              <h3 className="text-lg font-bold text-[#071A35] dark:text-white mb-2">3. Long-Term Partnership</h3>
              <p className="text-sm text-[#66758A] dark:text-slate-300 leading-relaxed">
                We back our deliveries with active monitoring, responsive support, and proactive feature roadmapping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Meet Our Team */}
      <section id="team" className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>LEADERSHIP & TALENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Meet Our Team
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              The engineers, architects, and designers driving MRM InfoTech’s technology forward.
            </p>
          </div>

          {hasTeam ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member: { name: string; roleTitle?: string; designation?: string; department?: string; bio?: string; socialLinks?: { linkedin?: string; github?: string } }) => {
                const initials = member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);
                const role = member.roleTitle || member.designation || 'Specialist';
                const dept = member.department || 'Engineering';

                return (
                  <div
                    key={member.name}
                    className="liquid-glass-card rounded-2xl p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                          {initials}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#071A35] dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5]">
                            {role}
                          </p>
                          <span className="text-[11px] text-[#66758A] dark:text-slate-400">
                            {dept}
                          </span>
                        </div>
                      </div>

                      {member.bio && (
                        <p className="text-xs text-[#66758A] dark:text-slate-300 leading-relaxed mb-6">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#E3EAF2] dark:border-[#1E3557] flex items-center gap-3">
                      {member.socialLinks?.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-white dark:bg-[#07162C] hover:bg-[#087FC4] dark:hover:bg-[#087FC4] text-[#66758A] dark:text-slate-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-colors border border-[#E3EAF2] dark:border-[#1E3557]"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.socialLinks?.github && (
                        <a
                          href={member.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-white dark:bg-[#07162C] hover:bg-[#087FC4] dark:hover:bg-[#087FC4] text-[#66758A] dark:text-slate-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-colors border border-[#E3EAF2] dark:border-[#1E3557]"
                          aria-label={`${member.name} GitHub`}
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <GlassEmptyState
              badge="Leadership & Talent"
              title="Team Profiles Coming Soon"
              description="Our engineering leaders and platform architects are connected to the live database. Published member profiles will appear here."
              adminHref="/admin/dashboard"
              adminLabel="View Admin CMS"
              publicHref="/careers"
              publicLabel="Explore Open Careers"
            />
          )}
        </div>
      </section>

      {/* 11. Why MRM InfoTech */}
      <section className="py-20 bg-[#F4F8FC] dark:bg-[#0B1E3B] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
            <span>THE MRM DIFFERENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
            Why Partner With MRM InfoTech?
          </h2>
          <p className="text-base sm:text-lg text-[#66758A] dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Because we build software with the same care and architectural rigor we demand for our own proprietary products. No outsourced shortcuts, no bloated frameworks, and no unmaintained code.
          </p>
        </div>
      </section>

      {/* 12. Final CTA Banner */}
      <section className="py-20 bg-slate-900 dark:bg-[#040E1C] text-white text-center border-t border-slate-800 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Build Your Next Solution?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            Whether you want to deploy EduManage BD, MediSheba BD, or engineer custom digital software, our team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#087FC4] hover:bg-[#20B8D5] transition-colors"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#103B68] hover:bg-[#103B68]/80 border border-[#20B8D5]/30 transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
