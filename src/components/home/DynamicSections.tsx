"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2, Calendar, ChevronRight } from "lucide-react";

/* ============================================================================
   SECTION 07 — FEATURED PROJECTS (Image-led portfolio layout)
   Auto-hides if projects is empty.
   ============================================================================ */
export function FeaturedProjectsSection({
  projects,
}: {
  projects?: Array<Record<string, unknown>>;
}) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
              SELECTED WORK
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Ideas in Action. Solutions in Practice.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Explore selected digital projects that reflect our approach to design, development, and practical problem-solving.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
            style={{ color: "var(--brand-blue)" }}
          >
            <span>Explore All Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const title = (project.title as string) || "Digital Project";
            const slug = (project.slug as string) || "";
            const summary = (project.summary as string) || "";
            const category = (project.category as string) || "Client Engineering";
            const liveUrl = project.liveUrl as string | undefined;

            return (
              <article
                key={slug}
                className="mrm-solid-card rounded-2xl overflow-hidden p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "rgba(8, 127, 196, 0.1)", color: "var(--brand-blue)" }}
                    >
                      {category}
                    </span>
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold inline-flex items-center gap-1 hover:underline"
                        style={{ color: "var(--brand-cyan)" }}
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
                  <Link
                    href={`/projects/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 10 — CASE STUDIES (Editorial Architecture Breakdown)
   Auto-hides if caseStudies is empty.
   ============================================================================ */
export function CaseStudiesSection({
  caseStudies,
}: {
  caseStudies?: Array<Record<string, unknown>>;
}) {
  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
              BEHIND THE SOLUTIONS
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Understanding Challenges. Creating Meaningful Solutions.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Explore the thinking, decisions, and problem-solving behind selected projects—from understanding the challenge to delivering a practical solution.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
            style={{ color: "var(--brand-blue)" }}
          >
            <span>All Case Studies</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.slice(0, 3).map((cs) => {
            const title = (cs.title as string) || "Case Study";
            const slug = (cs.slug as string) || "";
            const summary = (cs.summary as string) || "";

            return (
              <article
                key={slug}
                className="mrm-solid-card rounded-2xl p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--brand-blue)" }}>
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Technical Architecture</span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {summary}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <Link
                    href={`/case-studies/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    <span>Read Architecture Breakdown</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 11 — OUR TEAM (Clean Profile Layout)
   Auto-hides if team is empty.
   ============================================================================ */
export function TeamSection({
  team,
}: {
  team?: Array<Record<string, unknown>>;
}) {
  if (!team || team.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
            THE PEOPLE BEHIND THE WORK
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Driven by Ideas. United by a Vision.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Meet the people contributing their skills, creativity, and dedication to building thoughtful digital solutions and meaningful software products.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => {
            const name = (member.name as string) || "Team Member";
            const role = (member.roleTitle as string) || (member.designation as string) || "Engineer";
            const initials = name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={name}
                className="mrm-solid-card rounded-2xl p-6 text-center space-y-4"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center font-bold text-lg text-white shadow-md"
                  style={{ background: "linear-gradient(135deg, #087FC4 0%, #20B8D5 100%)" }}
                >
                  {initials}
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                    {name}
                  </h3>
                  <p className="text-xs font-semibold mt-1" style={{ color: "var(--brand-blue)" }}>
                    {role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 12 — BLOG & INSIGHTS (Editorial Article Cards)
   Auto-hides if posts is empty.
   ============================================================================ */
export function BlogSection({
  posts,
}: {
  posts?: Array<Record<string, unknown>>;
}) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
              THOUGHTS & PERSPECTIVES
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Ideas Worth Exploring. Knowledge Worth Sharing.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Discover our perspectives on software development, digital innovation, technology, and the ideas shaping modern businesses.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
            style={{ color: "var(--brand-blue)" }}
          >
            <span>Explore All Insights</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => {
            const title = (post.title as string) || "Article";
            const slug = (post.slug as string) || "";
            const summary = (post.summary as string) || "";
            const publishedAt = (post.publishedAt as string) || "";

            return (
              <article
                key={slug}
                className="mrm-solid-card rounded-2xl p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {publishedAt && (
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {summary}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 13 — FAQ (Accessible Accordion)
   ============================================================================ */
const DEFAULT_FAQS = [
  {
    question: "What software products does MRM InfoTech build?",
    answer:
      "MRM InfoTech develops proprietary software platforms built around real-world industry requirements, including EduManage BD (comprehensive school, college, and university management ERP), MediSheba BD (clinical diagnostic and healthcare operations suite), and the Multi-Institution Website Platform.",
  },
  {
    question: "Does MRM InfoTech provide custom software development for external clients?",
    answer:
      "Yes. In addition to our proprietary products, our Client Solutions division engineers custom web applications, SaaS platforms, enterprise systems, and business automation software tailored specifically to your organizational workflows and performance requirements.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We focus on modern, maintainable, and type-safe architectures: React, Next.js, TypeScript, and Tailwind CSS on the frontend; NestJS, Node.js, PostgreSQL, and Prisma on the backend; deployed on production-ready cloud infrastructure.",
  },
  {
    question: "How do you handle project requirements, timelines, and communication?",
    answer:
      "We follow a 5-step structured process: Discover, Plan, Design & Build, Test & Refine, and Launch & Support. Every engagement starts with a thorough architectural scoping session and clear milestone commitments.",
  },
  {
    question: "How can we initiate a new project or request a proposal?",
    answer:
      "You can submit an inquiry through our Start a Project page or Contact Us page. An engineering director will review your specifications and schedule a discovery consultation within 24 to 48 business hours.",
  },
];

export function FaqSection({
  faqs,
}: {
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-20 md:py-28 border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--brand-blue)" }}>
            COMMON QUESTIONS
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Questions Before We Get Started?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Find answers to common questions about our products, services, development approach, and working with MRM InfoTech.
          </p>
        </div>

        <div className="mt-12 max-w-3xl space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="mrm-solid-card rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                    {item.question}
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-90 text-[#087FC4]" : "text-slate-400"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-6 pb-6 pt-1 text-sm leading-relaxed border-t"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

