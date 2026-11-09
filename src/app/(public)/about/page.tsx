import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { ExecutiveTeamShowcase } from '@/components/public/team/ExecutiveTeamShowcase';

// The 5 Brand-New Distinct Art-Directed Components
import WhoWeAre from '@/components/public/about/WhoWeAre';
import WhatWeDo from '@/components/public/about/WhatWeDo';
import OurMission from '@/components/public/about/OurMission';
import OurVision from '@/components/public/about/OurVision';
import CoreValues from '@/components/public/about/CoreValues';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about MRM InfoTech: our story, engineering culture and how we build resilient enterprise software and cloud platforms for clients worldwide.",
  path: "/about",
});

export default async function AboutPage() {
  const team = await PublicApiService.getTeamMembers('en');

  const milestones = [
    {
      year: '2024',
      title: 'Foundation of MRM InfoTech',
      desc: 'Founded with a clear dual-engine vision: to develop scalable proprietary software products and deliver high-impact digital solutions for modern businesses.',
    },
    {
      year: '2024 - Q3',
      title: 'Launch of EduManage BD',
      desc: 'Rolled out EduManage BD, an all-in-one educational ERP tackling admissions, biometric RFID attendance, and automated tuition fee collection.',
    },
    {
      year: '2025 - Q1',
      title: 'Launch of MediSheba BD',
      desc: 'Engineered MediSheba BD, an integrated clinical and diagnostic lab operating system with barcode specimen routing and automated doctor reports.',
    },
    {
      year: '2025 - Q3',
      title: 'Full-Cycle Client Engineering Expansion',
      desc: 'Expanded bespoke engineering services: custom software development, cloud SaaS architecture, reactive web applications, and digital growth marketing.',
    },
    {
      year: '2026',
      title: 'Multi-Institution Website Platform',
      desc: 'Beta rollout of the Multi-Institution Website Governance Platform for educational networks, chains, and cluster organizations.',
    },
  ];


  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200 overflow-x-hidden selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)]">
      {/* =====================================================================
          1. COMPONENT 01 — WHO WE ARE (Premium Editorial Brand Introduction)
          ===================================================================== */}
      <WhoWeAre />

      {/* =====================================================================
          2. COMPONENT 02 — WHAT WE DO (Dual Expertise Showcase)
          ===================================================================== */}
      <WhatWeDo />

      {/* =====================================================================
          3. COMPONENT 03 — OUR MISSION (Statement-led Editorial Experience)
          ===================================================================== */}
      <OurMission />

      {/* =====================================================================
          4. COMPONENT 04 — OUR VISION (Future-focused Immersive Visual Experience)
          ===================================================================== */}
      <OurVision />

      {/* =====================================================================
          5. COMPONENT 05 — OUR CORE VALUES (Interactive Asymmetric Value Showcase)
          ===================================================================== */}
      <CoreValues />

      {/* =====================================================================
          6. COMPANY MILESTONES & JOURNEY (Fully Theme-Reactive Timeline)
          ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/30 border-t border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR JOURNEY &amp; EVOLUTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Disciplined Growth &amp; Milestones
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              A timeline of steady engineering accomplishments, proprietary product launches, and technological breakthroughs.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-[var(--theme-border-glass)]">
            {milestones.map((m) => (
              <div key={m.title} className="relative flex items-start gap-6 pl-2 group">
                <div className="w-8 h-8 rounded-full bg-[var(--theme-accent)] text-[var(--theme-accent-text)] flex items-center justify-center text-xs font-bold ring-4 ring-[var(--theme-bg-canvas)] shrink-0 shadow-lg shadow-[var(--theme-accent-glow)] z-10 group-hover:scale-110 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex-1 shadow-lg hover:border-[var(--theme-accent)]/50 transition-all">
                  <span className="text-xs font-mono font-bold text-[var(--theme-accent)] block mb-1">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. OUR ENGINEERING METHODOLOGY (3 Pillars)
          ===================================================================== */}
      <section id="process" className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] border-t border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span>METHODOLOGY &amp; STANDARDS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              How We Deliver Concrete Value
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              Our engineering philosophy ensures that every platform is scoped properly, tested thoroughly, and deployed safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="group p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/80 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.15),0_0_30px_var(--theme-accent-glow)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--theme-accent)] px-2.5 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                    STEP 01 • DISCOVERY
                  </span>
                  <span className="text-xs font-mono text-[var(--theme-text-muted)]">Phase I</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Deep Operational Discovery
                </h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  We spend time deeply understanding your real institutional bottlenecks, data workflows, and compliance demands before writing a single line of code.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border-glass)] flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>Requirements-First Architecture</span>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/80 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.15),0_0_30px_var(--theme-accent-glow)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--theme-accent)] px-2.5 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                    STEP 02 • ARCHITECTURE
                  </span>
                  <span className="text-xs font-mono text-[var(--theme-text-muted)]">Phase II</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Type-Safe Scalable Stacks
                </h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  Strict TypeScript, validated DTO boundaries, documented API contracts, and automated test suites ensure complete stability under real peak load.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border-glass)] flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>Reviewed, Tested Code</span>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/80 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.15),0_0_30px_var(--theme-accent-glow)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--theme-accent)] px-2.5 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                    STEP 03 • PARTNERSHIP
                  </span>
                  <span className="text-xs font-mono text-[var(--theme-text-muted)]">Phase III</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  Durable Technical Ownership
                </h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                  We back our deliveries with active uptime monitoring, automated disaster-recovery backups, and continuous roadmap upgrades.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border-glass)] flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>Continuous Cloud Lifecycle Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. LEADERSHIP & TALENT TEAM
          ===================================================================== */}
      <section id="team" className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 border-t border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
                <span>LEADERSHIP &amp; TALENT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Meet Our Leadership &amp; Team
              </h2>
              <p className="text-base text-[var(--theme-text-secondary)]">
                The engineers, architects, and product designers driving MRM InfoTech’s technology forward.
              </p>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-xs font-bold text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all shrink-0 group self-start md:self-auto"
            >
              <span>Full Team Roster</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ExecutiveTeamShowcase members={team} variant="home" />
        </div>
      </section>

      {/* =====================================================================
          9. FINAL CALL TO ACTION BANNER (Fully Theme-Reactive)
          ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border-t border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-[var(--theme-accent)] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S BUILD SOMETHING EXTRAORDINARY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--theme-text-primary)]">
            Ready to Build Your Next Solution?
          </h2>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Whether you want to deploy EduManage BD, MediSheba BD, or engineer custom digital software tailored to your workflows, our engineering team is ready to partner with you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-black text-[var(--theme-accent-text)] bg-[var(--theme-accent)] shadow-lg shadow-[var(--theme-accent-glow)] hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
