import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';

// The 5 Brand-New Distinct Art-Directed Components
import WhoWeAre from '@/components/public/about/WhoWeAre';
import WhatWeDo from '@/components/public/about/WhatWeDo';
import OurMission from '@/components/public/about/OurMission';
import OurVision from '@/components/public/about/OurVision';
import CoreValues from '@/components/public/about/CoreValues';

export const metadata: Metadata = {
  title: 'About Us | MRM InfoTech — IDEAS • PRODUCTS • IMPACT',
  description:
    'Learn about MRM InfoTech: our story, dual-engine technology vision, mission, long-term vision, core values, proprietary SaaS platforms, and dedicated software engineering team.',
};

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

  const hasTeam = Boolean(team && team.length > 0);

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all">
              <span className="text-xs font-mono font-bold text-[var(--theme-accent)] block mb-3">
                01 • DISCOVERY
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2">
                Deep Operational Discovery
              </h3>
              <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                We spend time deeply understanding your real institutional bottlenecks before writing a single line of code.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all">
              <span className="text-xs font-mono font-bold text-[var(--theme-accent)] block mb-3">
                02 • ARCHITECTURE
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2">
                Type-Safe Scalable Stacks
              </h3>
              <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                Strict TypeScript, documented API contracts, and automated tests ensure extreme stability under pressure.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] shadow-xl hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_25px_var(--theme-accent-subtle)] transition-all">
              <span className="text-xs font-mono font-bold text-[var(--theme-accent)] block mb-3">
                03 • PARTNERSHIP
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2">
                Durable Technical Ownership
              </h3>
              <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                We back our deliveries with active monitoring, responsive support, automated backups, and proactive roadmap evolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. LEADERSHIP & TALENT TEAM
          ===================================================================== */}
      <section id="team" className="py-20 lg:py-28 bg-[var(--theme-bg-surface)]/40 border-t border-[var(--theme-border-glass)] transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <span>LEADERSHIP &amp; TALENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-base text-[var(--theme-text-secondary)]">
              The engineers, architects, and product designers driving MRM InfoTech’s technology forward.
            </p>
          </div>

          {hasTeam ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] flex items-center justify-center font-black text-lg shadow-md shadow-[var(--theme-accent-glow)] group-hover:scale-105 transition-transform">
                          {initials}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                            {member.name}
                          </h3>
                          <p className="text-xs font-semibold text-[var(--theme-accent)]">
                            {role}
                          </p>
                          <span className="text-[11px] text-[var(--theme-text-muted)] font-mono">
                            {dept}
                          </span>
                        </div>
                      </div>

                      {member.bio && (
                        <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mb-6">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[var(--theme-border-glass)] flex items-center gap-2.5">
                      {member.socialLinks?.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-xl bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-colors border border-[var(--theme-border-glass)]"
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
                          className="w-8 h-8 rounded-xl bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] text-[var(--theme-text-secondary)] flex items-center justify-center transition-colors border border-[var(--theme-border-glass)]"
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
