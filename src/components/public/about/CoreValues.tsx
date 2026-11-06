import React from 'react';
import {
  Zap,
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function CoreValues() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border-t border-[var(--theme-border-glass)] transition-colors duration-200 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR GUIDING PRINCIPLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            The Core Values That <br />
            <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
              Drive Everything
            </span>{' '}
            We Build.
          </h2>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
            These are not marketing slogans. They are the non-negotiable architectural standards
            governing our code, our database design, and our client partnerships.
          </p>
        </div>

        {/* Asymmetric Bento Showcase Grid (7+5, 4+8, 6+6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* =================================================================
              VALUE 01 — INNOVATION (Spotlight Hero Plate: lg:col-span-7)
              ================================================================= */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)] bg-[var(--theme-bg-surface)] shadow-2xl relative overflow-hidden group hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_35px_var(--theme-accent-glow)] transition-all duration-300 flex flex-col justify-between">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[var(--theme-accent)]/10 blur-3xl group-hover:bg-[var(--theme-accent)]/20 transition-all"
            />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all duration-300">
                  <Zap className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-black text-[var(--theme-accent)] px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                  01 / PRIMARY ENGINE
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--theme-accent)]">
                  INNOVATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] tracking-tight mt-1">
                  Continuously exploring better ways to solve problems.
                </h3>
                <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed mt-3">
                  We don’t build technology for the sake of buzzwords. We innovate by finding simpler,
                  faster, and more durable digital solutions that replace clunky manual routines and eliminate operational friction.
                </p>
              </div>

              {/* Practical Innovation Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-[var(--theme-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Real-world practical utility</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--theme-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Modern reactive tech stacks</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)] relative z-10">
              <span>PROBLEM-FIRST THINKING</span>
              <span className="text-[var(--theme-accent)] font-bold">CORE VALUE #1</span>
            </div>
          </div>

          {/* =================================================================
              VALUE 02 — QUALITY (Spotlight Complementary: lg:col-span-5)
              ================================================================= */}
          <div className="lg:col-span-5 p-8 rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/70 bg-[var(--theme-bg-surface)] shadow-xl relative overflow-hidden group hover:border-[var(--theme-accent)]/60 hover:shadow-[0_0_30px_var(--theme-accent-subtle)] transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 flex items-center justify-center group-hover:scale-110 transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[var(--theme-text-muted)]">
                  02 / STANDARD
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--theme-accent)]">
                  QUALITY
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--theme-text-primary)] tracking-tight mt-1">
                  Maintaining uncompromising standards in design &amp; code.
                </h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed mt-2.5">
                  Type-safe TypeScript, strict OWASP security guidelines, unit tests, and accessible UI patterns. We write code built to stand up to heavy daily usage.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)] relative z-10">
              <span>ZERO TECHNICAL DEBT</span>
              <span className="text-[var(--theme-accent)] font-bold">100% VERIFIED</span>
            </div>
          </div>

          {/* =================================================================
              VALUE 03 — INTEGRITY (lg:col-span-4)
              ================================================================= */}
          <div className="lg:col-span-4 p-7 rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-lg hover:border-[var(--theme-accent)]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">03</span>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--theme-accent)]">
                  INTEGRITY
                </span>
                <h3 className="text-lg font-black text-[var(--theme-text-primary)] mt-1">
                  Honesty &amp; Responsibility
                </h3>
                <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mt-2">
                  Building lasting trust through transparent scopes, honest timelines, zero hidden costs, and responsible data guardianship.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--theme-border-glass)] text-[11px] font-mono text-[var(--theme-text-muted)]">
              TRANSPARENT PARTNERSHIP
            </div>
          </div>

          {/* =================================================================
              VALUE 04 — USER-CENTRIC THINKING (Wide Feature: lg:col-span-8)
              ================================================================= */}
          <div className="lg:col-span-8 p-8 rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/60 bg-[var(--theme-bg-surface)] shadow-xl hover:border-[var(--theme-accent)]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[var(--theme-accent)]">
                  04 / ERGONOMICS
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--theme-accent)]">
                  USER-CENTRIC THINKING
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--theme-text-primary)] mt-1">
                  Prioritizing real user needs in every architectural choice.
                </h3>
                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed mt-2.5 max-w-2xl">
                  Technology exists to serve human beings—not to confuse them. We obsess over intuitive micro-interactions, responsive typography, and frictionless task completion for teachers, doctors, administrators, and daily end-users.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[var(--theme-border-glass)] flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)]">
              <span>FRICTIONLESS EXPERIENCES</span>
              <span className="text-[var(--theme-accent)] font-bold">HUMAN-FIRST</span>
            </div>
          </div>

          {/* =================================================================
              VALUE 05 — SCALABILITY (lg:col-span-6)
              ================================================================= */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-lg hover:border-[var(--theme-accent)]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">05</span>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--theme-accent)]">
                  SCALABILITY
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[var(--theme-text-primary)] mt-1">
                  Building solutions designed for future growth.
                </h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed mt-2">
                  From multi-tenant databases to containerized cloud clusters, we build systems capable of handling 10x traffic surges without architectural rewrites.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--theme-border-glass)] text-[11px] font-mono text-[var(--theme-text-muted)]">
              ELASTIC ARCHITECTURE
            </div>
          </div>

          {/* =================================================================
              VALUE 06 — COLLABORATION (lg:col-span-6)
              ================================================================= */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-lg hover:border-[var(--theme-accent)]/50 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[var(--theme-text-muted)]">06</span>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--theme-accent)]">
                  COLLABORATION
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[var(--theme-text-primary)] mt-1">
                  Working together to create meaningful outcomes.
                </h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed mt-2">
                  Great software is born through tight teamwork. We collaborate intimately with client stakeholders, iterating rapidly and communicating transparently at every stage.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--theme-border-glass)] text-[11px] font-mono text-[var(--theme-text-muted)]">
              COLLECTIVE EXCELLENCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
